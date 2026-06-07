import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { validateReservationPayload } from "../_shared/reservation-validation.ts";

const allowedOrigins = new Set(
  (Deno.env.get("RESERVATION_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// Owner WhatsApp notification (Option A). Only active when both Cloud API
// secrets are present; otherwise the on-page wa.me deep-link fallback stays the
// notification path. Recipient defaults to the studio owner number.
const whatsappToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN") ?? "";
const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") ?? "";
const whatsappNotifyTo = Deno.env.get("RESERVATION_NOTIFY_WHATSAPP") ?? "966551606334";
const whatsappGraphVersion = Deno.env.get("WHATSAPP_GRAPH_VERSION") ?? "v21.0";

const supabase =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false }
      })
    : null;

const json = (body: Record<string, unknown>, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, no-store",
      "referrer-policy": "no-referrer",
      ...(origin ? corsHeaders(origin) : {})
    }
  });

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  if (!supabase || allowedOrigins.size === 0) {
    return json({ error: "service_not_configured" }, 503, null);
  }

  if (request.method === "OPTIONS") {
    if (!origin || !allowedOrigins.has(origin)) return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405, origin);
  }

  if (!origin || !allowedOrigins.has(origin)) {
    return json({ error: "forbidden_origin" }, 403, null);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(contentLength) || contentLength <= 0 || contentLength > 10_000) {
    return json({ error: "invalid_body_size" }, 413, origin);
  }

  const fingerprint = await fingerprintFromRequest(request);
  const limited = await isRateLimited(fingerprint);
  if (limited) {
    return json({ error: "rate_limited" }, 429, origin);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400, origin);
  }

  const validated = validateReservationPayload(body);
  if (!validated.ok) {
    return json({ error: "invalid_payload", details: validated.errors }, 400, origin);
  }

  const { data, error } = await supabase
    .from("reservations")
    .insert(validated.value)
    .select("id")
    .single();

  if (error) {
    return json({ error: "reservation_insert_failed" }, 500, origin);
  }

  // Best-effort owner push. The reservation is already durable, so a failed
  // WhatsApp send must never fail the request — the bride keeps the on-page
  // confirmation and the wa.me fallback regardless.
  if (whatsappToken && whatsappPhoneNumberId) {
    await notifyOwnerWhatsapp(validated.value).catch(() => {});
  }

  return json({ ok: true, id: data.id }, 201, origin);
});

async function notifyOwnerWhatsapp(reservation: {
  bride_name: string;
  phone: string;
  event_type: string;
  event_date: string;
  city: string;
  venue: string;
  package_name: string;
  guest_count: string | null;
  ceremony_time: string | null;
  needs_first_look: boolean;
  notes: string | null;
  source: string;
}) {
  const text = [
    "🎉 حجز جديد على Asmaa Studio",
    `👤 العروس: ${reservation.bride_name}`,
    `📱 الجوال: ${reservation.phone}`,
    `📦 الباقة: ${reservation.package_name}`,
    `🗓️ التاريخ: ${reservation.event_date}`,
    `💍 المناسبة: ${reservation.event_type}`,
    `📍 المدينة/القاعة: ${reservation.city} - ${reservation.venue}`,
    `👥 الحضور: ${reservation.guest_count ?? "-"}`,
    `⏰ وقت الزفة: ${reservation.ceremony_time ?? "-"}`,
    `📸 First Look: ${reservation.needs_first_look ? "نعم" : "لا"}`,
    `💬 ملاحظات: ${reservation.notes ?? "لا يوجد"}`,
    `🔗 المصدر: ${reservation.source}`
  ].join("\n");

  // Note: free-form text reaches the owner number when a WhatsApp session is
  // open; for guaranteed business-initiated delivery use an approved template.
  await fetch(`https://graph.facebook.com/${whatsappGraphVersion}/${whatsappPhoneNumberId}/messages`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${whatsappToken}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: whatsappNotifyTo,
      type: "text",
      text: { body: text }
    })
  });
}

function corsHeaders(origin: string) {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type, authorization, x-client-info",
    vary: "Origin"
  };
}

async function fingerprintFromRequest(request: Request) {
  const cfIp = request.headers.get("cf-connecting-ip");
  const ip = cfIp && /^[a-fA-F0-9:.]{3,45}$/.test(cfIp) ? cfIp : "unknown";
  const userAgent = request.headers.get("user-agent")?.slice(0, 80) ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${ip}:${userAgent}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

async function isRateLimited(fingerprint: string) {
  const windowMinutes = 60;
  const maxRequests = 5;
  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMinutes * 60_000).toISOString();

  const { data, error } = await supabase!.rpc("bump_reservation_rate_limit", {
    p_fingerprint: fingerprint,
    p_window_start: cutoff,
    p_max_requests: maxRequests
  });

  if (error) return true;
  return Boolean(data);
}

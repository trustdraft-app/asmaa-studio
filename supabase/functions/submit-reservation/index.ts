import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { validateReservationPayload } from "../_shared/reservation-validation.ts";

const allowedOrigins = new Set(
  (Deno.env.get("RESERVATION_ALLOWED_ORIGINS") ??
    "https://asmaa.video,https://www.asmaa.video,https://trustdraft-app.github.io,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

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

  const fingerprint = fingerprintFromRequest(request);
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

  return json({ ok: true, id: data.id }, 201, origin);
});

function corsHeaders(origin: string) {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type, authorization, x-client-info",
    vary: "Origin"
  };
}

function fingerprintFromRequest(request: Request) {
  const cfIp = request.headers.get("cf-connecting-ip");
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = cfIp && /^[a-fA-F0-9:.]{3,45}$/.test(cfIp) ? cfIp : forwarded ?? "unknown";
  return `${ip}:${request.headers.get("user-agent")?.slice(0, 80) ?? "unknown"}`;
}

async function isRateLimited(fingerprint: string) {
  const windowMinutes = 60;
  const maxRequests = 5;
  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMinutes * 60_000).toISOString();

  const { data } = await supabase
    .from("reservation_rate_limits")
    .select("window_start, request_count")
    .eq("fingerprint", fingerprint)
    .maybeSingle();

  if (!data || data.window_start < cutoff) {
    await supabase.from("reservation_rate_limits").upsert({
      fingerprint,
      window_start: now.toISOString(),
      request_count: 1,
      updated_at: now.toISOString()
    });
    return false;
  }

  if (data.request_count >= maxRequests) return true;

  await supabase
    .from("reservation_rate_limits")
    .update({
      request_count: data.request_count + 1,
      updated_at: now.toISOString()
    })
    .eq("fingerprint", fingerprint);

  return false;
}

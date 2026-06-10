import { packages, readableWhatsappSource, whatsappNumber } from "./content";

export type ReservationStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "deposit_paid"
  | "shot"
  | "delivered"
  | "cancelled";

export type ReservationInput = {
  brideName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  venue: string;
  packageId: string;
  guestCount: string;
  ceremonyTime: string;
  needsFirstLook: boolean;
  notes: string;
};

export type ReservationRecord = ReservationInput & {
  id: string;
  packageName: string;
  status: ReservationStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export const defaultReservation: ReservationInput = {
  brideName: "",
  phone: "",
  eventType: "زواج",
  eventDate: "",
  city: "الأحساء",
  venue: "",
  packageId: "04",
  guestCount: "",
  ceremonyTime: "",
  needsFirstLook: true,
  notes: ""
};

export const eventTypes = ["زواج", "خطوبة", "ملكة", "زفة فقط", "مناسبة عائلية"];
export const cityOptions = ["الأحساء", "الدمام", "الخبر", "القطيف", "الجبيل", "أخرى"];

export const reservationStatuses: Array<{
  value: ReservationStatus;
  label: string;
  tone: string;
}> = [
  { value: "new", label: "جديد", tone: "gold" },
  { value: "contacted", label: "تم التواصل", tone: "rose" },
  { value: "confirmed", label: "مؤكد", tone: "sage" },
  { value: "deposit_paid", label: "العربون وصل", tone: "gold" },
  { value: "shot", label: "تم التصوير", tone: "ivory" },
  { value: "delivered", label: "تم التسليم", tone: "sage" },
  { value: "cancelled", label: "ملغي", tone: "muted" }
];

export const reservationPackage = (packageId: string) =>
  packages.find((item) => item.id === packageId) ?? packages[3];

export function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "").trim();
}

export function validateReservation(input: ReservationInput) {
  const errors: Partial<Record<keyof ReservationInput, string>> = {};

  if (input.brideName.trim().length < 2) {
    errors.brideName = "اكتبي اسم العروس أو الاسم الذي تفضلين التواصل به.";
  }

  const phone = normalizePhone(input.phone);
  if (!/^(?:\+?966|0)?5\d{8}$/.test(phone)) {
    errors.phone = "اكتبي رقم جوال سعودي صحيح يبدأ بـ 05.";
  }

  if (!input.eventDate) {
    errors.eventDate = "اختاري تاريخ المناسبة.";
  }

  if (!input.city) {
    errors.city = "اختاري المدينة.";
  }

  if (!input.venue.trim()) {
    errors.venue = "اكتبي اسم القاعة أو الموقع التقريبي.";
  }

  if (!reservationPackage(input.packageId)) {
    errors.packageId = "اختاري الباقة المناسبة.";
  }

  return errors;
}

export function reservationWhatsappMessage(input: ReservationInput, source = "reserve-page") {
  const selectedPackage = reservationPackage(input.packageId);
  const firstLook = input.needsFirstLook ? "نعم، مهم" : "غير ضروري";

  return [
    "السلام عليكم، أرسلت تفاصيل الحجز من رابط Asmaa Video:",
    "",
    `مصدر الحجز: ${readableWhatsappSource(source)}`,
    `اسم العروس: ${input.brideName || "-"}`,
    `الجوال: ${input.phone || "-"}`,
    `نوع المناسبة: ${input.eventType}`,
    `التاريخ: ${input.eventDate || "-"}`,
    `المدينة: ${input.city || "-"}`,
    `القاعة/الموقع: ${input.venue || "-"}`,
    `الباقة المختارة: ${selectedPackage.name} - ${selectedPackage.price} ريال`,
    `عدد الحضور التقريبي: ${input.guestCount || "-"}`,
    `وقت الزفة/البداية: ${input.ceremonyTime || "-"}`,
    `First Look: ${firstLook}`,
    `ملاحظات: ${input.notes || "-"}`,
    "",
    "أرغب بتأكيد التوفر والخطوة التالية."
  ].join("\n");
}

export function reservationWhatsappUrl(input: ReservationInput, source = "reserve-page") {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(reservationWhatsappMessage(input, source))}`;
}

export function depositAmount(packageId: string) {
  const selected = reservationPackage(packageId);
  const price = Number.parseInt(selected.price, 10);
  if (!Number.isFinite(price) || price <= 0) return "";
  return String(Math.round(price / 2));
}

// Owner enables online card/mada deposit by setting NEXT_PUBLIC_PAYMENT_LINKS to a
// JSON map of packageId -> Moyasar hosted payment link, e.g. {"04":"https://..."}.
// A single NEXT_PUBLIC_PAYMENT_LINK acts as a catch-all. Until configured the flow
// falls back to the live bank-transfer + WhatsApp deposit path.
export function reservationPaymentLink(packageId: string) {
  const raw = process.env.NEXT_PUBLIC_PAYMENT_LINKS;
  if (raw) {
    try {
      const map = JSON.parse(raw) as Record<string, string>;
      const link = map[packageId];
      if (typeof link === "string" && link.startsWith("https://")) return link;
    } catch {
      // Malformed build-time config: fall back rather than break the page.
    }
  }
  const fallback = process.env.NEXT_PUBLIC_PAYMENT_LINK;
  return typeof fallback === "string" && fallback.startsWith("https://") ? fallback : "";
}

export function reservationEndpoint() {
  const explicit = process.env.NEXT_PUBLIC_RESERVATION_ENDPOINT;
  if (explicit) return explicit;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return "";

  return `${supabaseUrl.replace(/\/$/, "")}/functions/v1/submit-reservation`;
}

export function adminConfigReady() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

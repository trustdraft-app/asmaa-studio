export type ReservationPayload = {
  brideName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  venue: string;
  packageId: string;
  guestCount?: string;
  ceremonyTime?: string;
  needsFirstLook?: boolean;
  notes?: string;
  source?: string;
};

const packageNames: Record<string, string> = {
  "01": "بكج الزفة",
  "02": "بكج الزفة والكواليس",
  "03": "Royal Event",
  "04": "Full Day",
  "05": "بكج الخطوبة"
};

export function normalizeSaudiPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("9665") && digits.length === 12) return `+${digits}`;
  if (digits.startsWith("05") && digits.length === 10) return `+966${digits.slice(1)}`;
  if (digits.startsWith("5") && digits.length === 9) return `+966${digits}`;
  return value.trim();
}

export function validateReservationPayload(input: unknown) {
  const payload = input as Partial<ReservationPayload>;
  const errors: string[] = [];
  const phone = normalizeSaudiPhone(String(payload.phone ?? ""));
  const packageId = String(payload.packageId ?? "");

  if (String(payload.brideName ?? "").trim().length < 2) errors.push("invalid_bride_name");
  if (!/^\+9665\d{8}$/.test(phone)) errors.push("invalid_phone");
  if (!String(payload.eventType ?? "").trim()) errors.push("invalid_event_type");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(payload.eventDate ?? ""))) errors.push("invalid_event_date");
  if (!String(payload.city ?? "").trim()) errors.push("invalid_city");
  if (String(payload.venue ?? "").trim().length < 2) errors.push("invalid_venue");
  if (!packageNames[packageId]) errors.push("invalid_package_id");
  if (String(payload.notes ?? "").length > 1500) errors.push("notes_too_long");

  if (errors.length) {
    return { ok: false as const, errors };
  }

  return {
    ok: true as const,
    value: {
      bride_name: String(payload.brideName).trim().slice(0, 120),
      phone,
      event_type: String(payload.eventType).trim().slice(0, 60),
      event_date: String(payload.eventDate),
      city: String(payload.city).trim().slice(0, 60),
      venue: String(payload.venue).trim().slice(0, 160),
      package_id: packageId,
      package_name: packageNames[packageId],
      guest_count: String(payload.guestCount ?? "").trim().slice(0, 40) || null,
      ceremony_time: String(payload.ceremonyTime ?? "").trim().slice(0, 80) || null,
      needs_first_look: Boolean(payload.needsFirstLook),
      notes: String(payload.notes ?? "").trim().slice(0, 1500) || null,
      source: String(payload.source ?? "reserve-page").trim().slice(0, 80) || "reserve-page"
    }
  };
}

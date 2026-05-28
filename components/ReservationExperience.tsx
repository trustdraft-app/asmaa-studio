"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Loader2,
  MapPin,
  MessageCircle,
  Sparkles,
  Video
} from "lucide-react";
import { packages, whatsappLink } from "../lib/content";
import {
  cityOptions,
  defaultReservation,
  eventTypes,
  reservationEndpoint,
  reservationPackage,
  reservationWhatsappUrl,
  validateReservation,
  type ReservationInput
} from "../lib/reservations";

type SubmitState = "idle" | "saving" | "saved" | "fallback" | "error";

const steps = [
  { title: "المناسبة", text: "التاريخ والمدينة والقاعة" },
  { title: "الباقة", text: "اختيار حسب لحظات اليوم" },
  { title: "التأكيد", text: "تفاصيل جاهزة للمتابعة" }
];

const cityFromQuery: Record<string, string> = {
  alahsa: "الأحساء",
  dammam: "الدمام",
  khobar: "الخبر",
  "الأحساء": "الأحساء",
  "الدمام": "الدمام",
  "الخبر": "الخبر"
};

export function ReservationExperience() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ReservationInput>(defaultReservation);
  const [touched, setTouched] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const selectedPackage = useMemo(() => reservationPackage(form.packageId), [form.packageId]);
  const minEventDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const errors = validateReservation(form);
  const hasErrors = Object.keys(errors).length > 0;
  const endpoint = reservationEndpoint();

  useEffect(() => {
    const requestedCity = new URLSearchParams(window.location.search).get("city");
    const city = requestedCity ? cityFromQuery[requestedCity] : "";
    if (!city) return;

    const timeout = window.setTimeout(() => {
      setForm((current) => (current.city === city ? current : { ...current, city }));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  const update = <Key extends keyof ReservationInput>(key: Key, value: ReservationInput[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitState("idle");
  };

  const next = () => {
    setTouched(true);
    if (step === 0 && (errors.brideName || errors.phone || errors.eventDate || errors.city || errors.venue)) {
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submit = async () => {
    setTouched(true);
    if (hasErrors) {
      setStep(0);
      return;
    }

    if (!endpoint) {
      setSubmitState("fallback");
      window.open(reservationWhatsappUrl(form), "_blank", "noopener,noreferrer");
      setMessage("تم تجهيز رسالة واتساب بالتفاصيل. بعد إرسالها تصل المعلومات مباشرة لصاحبة العمل.");
      return;
    }

    setSubmitState("saving");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, source: "reserve-page" })
      });

      if (!response.ok) {
        throw new Error(`Reservation submit failed: ${response.status}`);
      }

      setSubmitState("saved");
      setMessage("وصل الطلب بنجاح. ستصلك رسالة واتساب لتأكيد التوفر والخطوة التالية.");
    } catch {
      setSubmitState("fallback");
      window.open(reservationWhatsappUrl(form), "_blank", "noopener,noreferrer");
      setMessage("لم يكتمل الحفظ الآلي، لذلك جهزنا رسالة واتساب بالتفاصيل حتى لا تضيع عليك الخطوة.");
    }
  };

  return (
    <main className="page-shell reserve-page" dir="rtl">
      <nav className="nav reserve-nav" aria-label="تنقل رابط العروس">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark" aria-hidden="true">
            <span>AS</span>
          </span>
          <span>
            <strong>Asmaa Studio</strong>
            <span>رابط العروس</span>
          </span>
        </Link>
        <a className="ghost-cta compact" href={whatsappLink("reserve-nav")} target="_blank" rel="noreferrer">
          <MessageCircle size={17} />
          واتساب
        </a>
      </nav>

      <section className="reserve-hero">
        <div className="reserve-copy">
          <span className="eyebrow">رابط العروس</span>
          <h1>اختاري باقة التصوير التي تشبه يومك بخطوات هادئة وواضحة.</h1>
          <p>
            شاهدي الباقات حسب لحظات المناسبة: الزفة، تفاصيل العروس، First Look، أو اليوم الكامل.
            اكتبي التاريخ والمدينة والقاعة، ثم نكمل المتابعة عبر واتساب.
          </p>
          <div className="trust-strip" aria-label="نقاط مساعدة قبل الحجز">
            <span>
              <Sparkles size={18} /> تصوير نسائي
            </span>
            <span>
              <CalendarDays size={18} /> فحص التوفر
            </span>
            <span>
              <HeartHandshake size={18} /> متابعة واتساب
            </span>
          </div>
        </div>

        <div className="reserve-card" aria-label="نموذج حجز العروس">
          <div className="stepper" aria-label="خطوات الحجز">
            {steps.map((item, index) => (
              <button
                aria-current={step === index ? "step" : undefined}
                className={index <= step ? "active" : ""}
                key={item.title}
                onClick={() => setStep(index)}
                type="button"
              >
                <span>{index + 1}</span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </button>
            ))}
          </div>

          {step === 0 && (
            <div className="form-scene">
              <div className="form-grid">
                <Field label="اسم العروس" error={touched ? errors.brideName : undefined}>
                  <input
                    autoComplete="name"
                    value={form.brideName}
                    onChange={(event) => update("brideName", event.target.value)}
                    placeholder="مثال: أسماء"
                  />
                </Field>
                <Field label="رقم الجوال" error={touched ? errors.phone : undefined}>
                  <input
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="05xxxxxxxx"
                  />
                </Field>
                <Field label="نوع المناسبة">
                  <select value={form.eventType} onChange={(event) => update("eventType", event.target.value)}>
                    {eventTypes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
                <Field label="تاريخ المناسبة" error={touched ? errors.eventDate : undefined}>
                  <input
                    min={minEventDate}
                    type="date"
                    value={form.eventDate}
                    onChange={(event) => update("eventDate", event.target.value)}
                  />
                </Field>
                <Field label="المدينة" error={touched ? errors.city : undefined}>
                  <select value={form.city} onChange={(event) => update("city", event.target.value)}>
                    {cityOptions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
                <Field label="القاعة أو الموقع" error={touched ? errors.venue : undefined}>
                  <input
                    value={form.venue}
                    onChange={(event) => update("venue", event.target.value)}
                    placeholder="اسم القاعة أو الحي"
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="package-picker">
              {packages.map((item) => (
                <button
                  aria-label={`اختيار ${item.name} بسعر ${item.price} ريال لمدة ${item.duration}`}
                  aria-pressed={form.packageId === item.id}
                  className={form.packageId === item.id ? "selected" : ""}
                  key={item.id}
                  onClick={() => update("packageId", item.id)}
                  type="button"
                >
                  <span>بكج {item.id}</span>
                  <strong>{item.name}</strong>
                  <em>{item.price} ريال</em>
                  <small>{item.duration}</small>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="form-scene">
              <div className="summary-panel">
                <div>
                  <span>الباقة المختارة</span>
                  <strong>{selectedPackage.name}</strong>
                  <small>
                    {selectedPackage.duration} · {selectedPackage.price} ريال
                  </small>
                </div>
                <div>
                  <span>المناسبة</span>
                  <strong>{form.eventType}</strong>
                  <small>
                    {form.eventDate || "بدون تاريخ"} · {form.city}
                  </small>
                </div>
                <div>
                  <span>الموقع</span>
                  <strong>{form.venue || "لم يكتب بعد"}</strong>
                  <small>{form.brideName || "اسم العروس"}</small>
                </div>
              </div>
              <div className="form-grid">
                <Field label="عدد الحضور التقريبي">
                  <input
                    inputMode="numeric"
                    value={form.guestCount}
                    onChange={(event) => update("guestCount", event.target.value)}
                    placeholder="مثال: 150"
                  />
                </Field>
                <Field label="وقت الزفة أو البداية">
                  <input
                    value={form.ceremonyTime}
                    onChange={(event) => update("ceremonyTime", event.target.value)}
                    placeholder="مثال: 9:30 مساء"
                  />
                </Field>
              </div>
              <label className="toggle-row">
                <input
                  checked={form.needsFirstLook}
                  onChange={(event) => update("needsFirstLook", event.target.checked)}
                  type="checkbox"
                />
                <span>
                  <strong>أرغب بتوثيق First Look أو لحظة مهمة قبل الزفة</strong>
                  <small>اختياري، لكنه يساعد على اختيار خطة التصوير المناسبة.</small>
                </span>
              </label>
              <Field label="ملاحظات للعروس أو العائلة">
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="أي تفاصيل مهمة: مدخل القاعة، وقت معين، لقطة لا تريدين أن تفوت، أو سؤال عن إضافة."
                />
              </Field>
            </div>
          )}

          {message && (
            <div className={`submission-message ${submitState}`}>
              <CheckCircle2 size={20} />
              <span>{message}</span>
            </div>
          )}

          <div className="form-actions">
            <button className="ghost-cta" disabled={step === 0 || submitState === "saving"} onClick={() => setStep(step - 1)} type="button">
              رجوع
            </button>
            {step < steps.length - 1 ? (
              <button className="cta" onClick={next} type="button">
                التالي <ArrowLeft size={17} />
              </button>
            ) : (
              <button className="cta" disabled={submitState === "saving"} onClick={submit} type="button">
                {submitState === "saving" ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
                إرسال التفاصيل
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="reserve-infographic" aria-label="شرح طريقة الحجز">
        <article>
          <Video size={28} />
          <h2>الاختيار أمامك</h2>
          <p>الباقة والسعر والمدة تظهر داخل الصفحة حتى تقارني بهدوء قبل إرسال التفاصيل.</p>
        </article>
        <article>
          <MapPin size={28} />
          <h2>مصمم للشرقية</h2>
          <p>الأحساء أولا، ثم الدمام والخبر، مع مجال لكتابة القاعة أو الحي بدقة.</p>
        </article>
        <article>
          <MessageCircle size={28} />
          <h2>واتساب يبقى سريع</h2>
          <p>إذا لم يكن الحفظ الآلي متاحا، تتحول التفاصيل إلى رسالة واتساب جاهزة.</p>
        </article>
      </section>
    </main>
  );
}

function Field({
  children,
  error,
  label
}: {
  children: React.ReactNode;
  error?: string;
  label: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <em>{error}</em>}
    </label>
  );
}

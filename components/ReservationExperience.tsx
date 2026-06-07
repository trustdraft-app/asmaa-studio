"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  HeartHandshake,
  Landmark,
  Loader2,
  MapPin,
  MessageCircle,
  Sparkles,
  Video
} from "lucide-react";
import { assetPath, packages, readableWhatsappSource, whatsappLink } from "../lib/content";
import { SiteFooter } from "./SiteFooter";
import {
  cityOptions,
  defaultReservation,
  depositAmount,
  eventTypes,
  reservationEndpoint,
  reservationPackage,
  reservationPaymentLink,
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

const packageIds = new Set(packages.map((item) => item.id));

export function ReservationExperience() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ReservationInput>(defaultReservation);
  const [touched, setTouched] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("reserve-direct");
  const selectedPackage = useMemo(() => reservationPackage(form.packageId), [form.packageId]);
  const minEventDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const errors = validateReservation(form);
  const hasErrors = Object.keys(errors).length > 0;
  const endpoint = reservationEndpoint();
  const deposit = useMemo(() => depositAmount(form.packageId), [form.packageId]);
  const paymentLink = useMemo(() => reservationPaymentLink(form.packageId), [form.packageId]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const requestedCity = query.get("city");
    const requestedPackage = query.get("package");
    const requestedSource = query.get("source") || query.get("src");
    const city = requestedCity ? cityFromQuery[requestedCity] : "";
    const packageId = requestedPackage && packageIds.has(requestedPackage) ? requestedPackage : "";
    const sourceLabel = requestedSource || inferReservationSource(document.referrer, requestedCity, packageId);

    const timeout = window.setTimeout(() => {
      setForm((current) => ({
        ...current,
        city: city || current.city,
        packageId: packageId || current.packageId
      }));
      setSource(sourceLabel);
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
      window.open(reservationWhatsappUrl(form, source), "_blank", "noopener,noreferrer");
      setMessage("جهزنا لك رسالة واتساب مرتبة بالتفاصيل. أرسليها ونكمل معك تأكيد التوفر والخطوة التالية.");
      return;
    }

    setSubmitState("saving");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, source })
      });

      if (!response.ok) {
        throw new Error(`Reservation submit failed: ${response.status}`);
      }

      setSubmitState("saved");
      setMessage("وصل الطلب بنجاح. ستصلك رسالة واتساب لتأكيد التوفر والخطوة التالية.");
    } catch {
      setSubmitState("fallback");
      window.open(reservationWhatsappUrl(form, source), "_blank", "noopener,noreferrer");
      setMessage("جهزنا لك رسالة واتساب مرتبة بالتفاصيل. أرسليها ونكمل معك تأكيد التوفر والخطوة التالية.");
    }
  };

  return (
    <main className="page-shell reserve-page" dir="rtl">
      <nav className="nav reserve-nav" aria-label="تنقل رابط العروس">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark" aria-hidden="true">
            <Image src={assetPath("/brand/asmaa-logo-square.png")} alt="" width={96} height={96} priority />
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
          <h1>اختاري تغطية تناسب يومك بوضوح وهدوء.</h1>
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
          <p className="reserve-source-note">مصدر الطلب الحالي: {readableWhatsappSource(source)}</p>
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
                  <span>مصدر الوصول</span>
                  <strong>{readableWhatsappSource(source)}</strong>
                  <small>سيظهر مع الطلب داخل المتابعة وداخل رسالة واتساب.</small>
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
              <Field label="ملاحظات مهمة للتصوير">
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="أي تفاصيل مهمة: مدخل القاعة، وقت معين، لقطة لا تريدين أن تفوت، أو سؤال عن إضافة."
                />
              </Field>

              <div className="reserve-deposit" aria-label="تأكيد الحجز ودفع العربون">
                <div className="reserve-deposit-head">
                  <strong>تثبيت التاريخ بعربون التأكيد</strong>
                  {deposit && (
                    <span className="reserve-deposit-amount">
                      {deposit} ريال
                      <em>نصف قيمة الباقة · المتبقي يوم المناسبة</em>
                    </span>
                  )}
                </div>
                {paymentLink ? (
                  <>
                    <a className="cta deposit-pay" href={paymentLink} target="_blank" rel="noreferrer">
                      <CreditCard size={18} />
                      ادفعي العربون الآن (مدى / بطاقة)
                    </a>
                    <p className="reserve-deposit-note">
                      دفع آمن عبر بوابة الدفع. بعد إتمام الدفع تصلك صفحة تأكيد، ونتواصل معك خلال ساعتين لترتيب التفاصيل.
                    </p>
                  </>
                ) : (
                  <p className="reserve-deposit-note">
                    <Landmark size={16} />
                    بعد إرسال التفاصيل نراجع التوفر، ثم نزوّدك برقم الحساب لتحويل العربون، وتُرسلين صورة الإيصال عبر واتساب لتثبيت
                    التاريخ.
                  </p>
                )}
              </div>
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
          <h2>ابدئي من شكل اليوم</h2>
          <p>اختاري بين الزفة، التفاصيل، First Look، أو التغطية الكاملة بدون ملف طويل.</p>
        </article>
        <article>
          <MapPin size={28} />
          <h2>المكان واضح من البداية</h2>
          <p>اكتبي المدينة والقاعة أو الحي حتى نراجع التوفر على تفاصيل مناسبة لك.</p>
        </article>
        <article>
          <MessageCircle size={28} />
          <h2>متابعة مرتبة في واتساب</h2>
          <p>تصل الرسالة وفيها الباقة والتاريخ والموقع، فتبدأ المحادثة من نقطة واضحة.</p>
        </article>
      </section>
      <SiteFooter />
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

function inferReservationSource(referrer: string, requestedCity: string | null, packageId: string) {
  const citySlug = requestedCity && cityFromQuery[requestedCity] ? requestedCity : "";

  const withIntent = (base: string) => {
    if (citySlug && packageId) return `${base}-${citySlug}-package-${packageId}`;
    if (citySlug) return `${base}-${citySlug}`;
    if (packageId) return `${base}-package-${packageId}`;
    return base;
  };

  if (!referrer) return withIntent("reserve-page");

  try {
    const url = new URL(referrer);
    if (url.hostname !== window.location.hostname) return withIntent("reserve-page");

    const pathname = url.pathname.replace(/\/$/, "") || "/";
    if (pathname === "/") return withIntent("home-hero");
    if (pathname === "/faq") return withIntent("faq-page");
    if (pathname === "/portfolio") return withIntent("portfolio-page");
    if (pathname === "/zaffa") return withIntent("zaffa-page");
    if (pathname === "/engagement") return withIntent("engagement-page");
    if (pathname === "/reviews") return withIntent("reviews-page");
    if (pathname === "/about") return withIntent("about-page");
    if (pathname === "/packages") return withIntent("packages-hero");

    const cityRoute = pathname.slice(1);
    if (cityRoute in cityFromQuery) return withIntent(cityRoute);
  } catch {
    return withIntent("reserve-page");
  }

  return withIntent("reserve-page");
}

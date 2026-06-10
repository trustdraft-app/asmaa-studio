"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Landmark,
  Loader2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Video
} from "lucide-react";
import {
  assetPath,
  packages,
  readableWhatsappSource,
  whatsappLink,
  whatsappNumber
} from "../lib/content";
import { SiteFooter } from "./SiteFooter";
import {
  cityOptions,
  defaultReservation,
  depositAmount,
  eventTypes,
  reservationEndpoint,
  reservationPackage,
  reservationPaymentLink,
  type ReservationInput
} from "../lib/reservations";

// ─── Brand token ────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.18)";
const GOLD_BORDER = "rgba(201,168,76,0.36)";
const GOLD_GLOW = "rgba(201,168,76,0.12)";
const IVORY = "rgba(255,248,236,0.92)";
const MUTED = "rgba(255,248,236,0.60)";
const SURFACE = "rgba(255,248,236,0.06)";
const INK = "#0c0a08";

// ─── 5 steps (order chosen so city select is at step 0 and packages at step 1
//     to satisfy the existing verify-launch.mjs prefill contract)
const STEPS = [
  { label: "التاريخ", sub: "المناسبة والمدينة" },
  { label: "الباقة",  sub: "اختيار التغطية" },
  { label: "الموقع",  sub: "القاعة والتفاصيل" },
  { label: "التواصل", sub: "بياناتك" },
  { label: "التأكيد", sub: "مراجعة وإرسال" }
];

// ─── Islamic geometric hero SVG ─────────────────────────────────────────────
function IslamicPattern() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="islamic-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={GOLD} strokeWidth="0.9">
            <polygon points="40,8 55,16 72,16 72,33 64,40 72,47 72,64 55,64 40,72 25,64 8,64 8,47 16,40 8,33 8,16 25,16" />
            <line x1="25" y1="16" x2="55" y2="64" />
            <line x1="55" y1="16" x2="25" y2="64" />
            <line x1="8"  y1="33" x2="72" y2="47" />
            <line x1="72" y1="33" x2="8"  y2="47" />
            <polygon points="40,24 56,40 40,56 24,40" />
          </g>
        </pattern>
        <linearGradient id="pattern-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="black" stopOpacity="1" />
          <stop offset="70%"  stopColor="black" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </linearGradient>
        <mask id="pattern-mask">
          <rect width="100%" height="100%" fill="url(#pattern-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-geo)" mask="url(#pattern-mask)" />
    </svg>
  );
}

// ─── Stepper nav (satisfies .stepper button selector used in verify-launch) ──
function Stepper({ current, onNavigate }: { current: number; onNavigate: (i: number) => void }) {
  return (
    <div
      className="stepper"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))`,
        gap: 6,
        marginBottom: 22,
        position: "relative",
        zIndex: 1
      }}
    >
      {STEPS.map((s, i) => (
        <button
          key={s.label}
          type="button"
          aria-current={i === current ? "step" : undefined}
          className={i <= current ? "active" : ""}
          onClick={() => onNavigate(i)}
          style={{
            background: i === current ? `linear-gradient(145deg,${GOLD_DIM},rgba(255,248,236,0.06))` : SURFACE,
            border: `1px solid ${i <= current ? GOLD_BORDER : "rgba(255,248,236,0.10)"}`,
            borderRadius: 8,
            color: i <= current ? IVORY : MUTED,
            cursor: "pointer",
            minHeight: 76,
            padding: "10px 8px",
            textAlign: "start",
            transition: "background 200ms ease, border-color 200ms ease"
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: i <= current ? GOLD_GLOW : "rgba(255,248,236,0.06)",
              border: `1px solid ${i <= current ? GOLD_BORDER : "rgba(255,248,236,0.12)"}`,
              color: i <= current ? GOLD : MUTED,
              fontSize: "0.78rem",
              fontWeight: 900,
              marginBottom: 8
            }}
          >
            {i + 1}
          </span>
          <strong style={{ display: "block", fontSize: "0.82rem", lineHeight: 1.3 }}>{s.label}</strong>
          <small style={{ display: "block", color: MUTED, fontSize: "0.7rem", marginTop: 3, lineHeight: 1.4 }}>{s.sub}</small>
        </button>
      ))}
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current }: { current: number }) {
  const pct = ((current + 1) / STEPS.length) * 100;
  return (
    <div style={{ marginBottom: 18, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: "0.78rem", color: MUTED }}>الخطوة {current + 1} من {STEPS.length}</span>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: GOLD }}>{STEPS[current].label}</span>
      </div>
      <div style={{ height: 3, borderRadius: 99, background: "rgba(255,248,236,0.10)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: `linear-gradient(90deg,${GOLD},#e6c96a)`, transition: "width 380ms cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type SubmitState = "idle" | "saving" | "saved" | "fallback" | "error";

const cityFromQuery: Record<string, string> = {
  alahsa: "الأحساء", dammam: "الدمام", khobar: "الخبر",
  "الأحساء": "الأحساء", "الدمام": "الدمام", "الخبر": "الخبر"
};
const packageIds = new Set(packages.map((p) => p.id));

// ─── Main component ───────────────────────────────────────────────────────────
export function ReservationExperience() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ReservationInput>(defaultReservation);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("reserve-direct");

  const selectedPackage = useMemo(() => reservationPackage(form.packageId), [form.packageId]);
  const minEventDate   = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const endpoint       = reservationEndpoint();
  const deposit        = useMemo(() => depositAmount(form.packageId), [form.packageId]);
  const paymentLink    = useMemo(() => reservationPaymentLink(form.packageId), [form.packageId]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const requestedCity    = query.get("city");
    const requestedPackage = query.get("package");
    const requestedSource  = query.get("source") || query.get("src");
    const city   = requestedCity ? (cityFromQuery[requestedCity] ?? "") : "";
    const pkgId  = requestedPackage && packageIds.has(requestedPackage) ? requestedPackage : "";
    const srcLabel = requestedSource || inferSource(document.referrer, requestedCity, pkgId);
    const t = window.setTimeout(() => {
      setForm((f) => ({ ...f, city: city || f.city, packageId: pkgId || f.packageId }));
      setSource(srcLabel);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  const update = <K extends keyof ReservationInput>(key: K, value: ReservationInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSubmitState("idle");
  };

  const canAdvance = () => {
    if (step === 0) return !!(form.city && form.eventDate);
    if (step === 1) return !!form.packageId;
    if (step === 2) return !!form.venue;
    if (step === 3) return !!(form.brideName.trim().length >= 2 && form.phone.trim().length >= 9);
    return true;
  };

  const next = () => {
    setTouched(true);
    if (!canAdvance()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    setTouched(false);
  };

  const back = () => { setStep((s) => Math.max(s - 1, 0)); setTouched(false); };

  const buildWhatsappUrl = () => {
    const lines = [
      "السلام عليكم، أرسلت تفاصيل الحجز من رابط Asmaa Studio:",
      "",
      `مصدر الحجز: ${readableWhatsappSource(source)}`,
      `اسم العروس: ${form.brideName || "-"}`,
      `الجوال: ${form.phone || "-"}`,
      email ? `البريد: ${email}` : "",
      `نوع المناسبة: ${form.eventType}`,
      `التاريخ: ${form.eventDate || "-"}`,
      `المدينة: ${form.city || "-"}`,
      `القاعة/الموقع: ${form.venue || "-"}`,
      `الباقة: ${selectedPackage.name} — ${selectedPackage.price} ريال`,
      form.guestCount ? `عدد الحضور: ${form.guestCount}` : "",
      form.ceremonyTime ? `وقت الزفة: ${form.ceremonyTime}` : "",
      form.notes ? `ملاحظات: ${form.notes}` : "",
      "",
      "أرغب بتأكيد التوفر والخطوة التالية."
    ].filter(Boolean).join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`;
  };

  const receiptWhatsappUrl = useMemo(() => {
    const lines = [
      "السلام عليكم أسماء ستوديو، أرغب بتثبيت الحجز بدفع العربون عبر تحويل بنكي:",
      "",
      `اسم العروس: ${form.brideName || "-"}`,
      `الجوال: ${form.phone || "-"}`,
      `الباقة: ${selectedPackage.name}`,
      deposit ? `قيمة العربون: ${deposit} ريال` : "",
      `التاريخ: ${form.eventDate || "-"}`,
      `المدينة: ${form.city || "-"}`,
      "",
      "أرجو تزويدي برقم الحساب (IBAN) لإتمام التحويل، وسأرفق صورة الإيصال هنا لتثبيت الموعد."
    ].filter(Boolean).join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`;
  }, [form, deposit, selectedPackage.name]);

  const submit = async () => {
    setTouched(true);
    if (!endpoint) {
      setSubmitState("fallback");
      window.open(buildWhatsappUrl(), "_blank", "noopener,noreferrer");
      setMessage("جهزنا لك رسالة واتساب مرتبة بالتفاصيل. أرسليها ونكمل معك تأكيد التوفر والخطوة التالية.");
      return;
    }
    setSubmitState("saving");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, source })
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setSubmitState("saved");
      setMessage("وصل الطلب بنجاح. ستصلك رسالة واتساب لتأكيد التوفر والخطوة التالية.");
    } catch {
      setSubmitState("fallback");
      window.open(buildWhatsappUrl(), "_blank", "noopener,noreferrer");
      setMessage("جهزنا لك رسالة واتساب مرتبة بالتفاصيل. أرسليها ونكمل معك تأكيد التوفر والخطوة التالية.");
    }
  };

  return (
    <main className="page-shell reserve-page" dir="rtl">
      {/* Nav */}
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
        <a className="ghost-cta compact" href={whatsappLink("reserve-nav")} target="_blank" rel="noreferrer"
           style={{ color: GOLD, borderColor: GOLD_BORDER }}>
          <MessageCircle size={17} />
          واتساب
        </a>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "calc(100svh - 96px)", display: "grid", alignItems: "center", padding: "40px clamp(18px,5vw,72px) 80px" }} aria-label="نموذج حجز العروس">
        <IslamicPattern />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 45% at 50% -10%,rgba(201,168,76,0.14),transparent),radial-gradient(ellipse 40% 30% at 80% 60%,rgba(201,168,76,0.08),transparent)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, display: "grid", gap: "clamp(28px,6vw,76px)", gridTemplateColumns: "minmax(0,0.72fr) minmax(340px,1fr)", maxWidth: 1240, margin: "0 auto", width: "100%" }}>

          {/* Copy */}
          <div className="reserve-copy">
            <div style={{ width: 48, height: 3, borderRadius: 99, background: GOLD, marginBottom: 20 }} />
            <span className="eyebrow" style={{ color: GOLD, fontWeight: 800, letterSpacing: "0.12em", fontSize: "0.78rem" }}>رابط العروس</span>
            <h1 style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.6rem,5vw,4.4rem)", lineHeight: 1.18, margin: "16px 0", textWrap: "balance", color: IVORY }}>
              يومك يستحق توثيقاً يليق به.
            </h1>
            <p style={{ color: MUTED, lineHeight: 1.9, fontSize: "1.06rem", margin: "0 0 28px" }}>
              اختاري الباقة المناسبة، حددي التاريخ والمكان، وأضيفي تفاصيل التواصل — ثم نرتب كل شيء عبر واتساب بخطوات واضحة.
            </p>
            <div className="trust-strip" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
              {[
                { icon: <Video size={16} />, text: "تصوير نسائي" },
                { icon: <CalendarDays size={16} />, text: "فحص التوفر" },
                { icon: <MessageCircle size={16} />, text: "متابعة واتساب" },
                { icon: <ShieldCheck size={16} />, text: "بيانات آمنة" }
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, border: `1px solid ${GOLD_BORDER}`, background: GOLD_GLOW, color: IVORY, fontSize: "0.85rem", fontWeight: 700 }}>
                  <span style={{ color: GOLD }}>{icon}</span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Booking card */}
          <div className="reserve-card" style={{ background: `linear-gradient(145deg,rgba(255,248,236,0.09),rgba(12,12,13,0.72))`, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, boxShadow: `0 32px 96px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,248,236,0.07)`, padding: "clamp(20px,3.5vw,32px)", position: "relative", overflow: "hidden" }}>
            {/* shimmer line */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, opacity: 0.7 }} />

            <ProgressBar current={step} />
            <Stepper current={step} onNavigate={(i) => setStep(i)} />

            {/* Step 0 — Date + City (city select visible here for URL prefill test) */}
            {step === 0 && (
              <div className="form-scene" style={{ position: "relative", zIndex: 1 }}>
                <StepHeading icon={<CalendarDays size={20} />} title="التاريخ والمدينة" subtitle="حددي تاريخ المناسبة ومدينتك في المنطقة الشرقية" />
                <div style={{ display: "grid", gap: 14 }}>
                  <GoldField label="نوع المناسبة">
                    <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} style={inputStyle()}>
                      {eventTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </GoldField>
                  <GoldField label="تاريخ المناسبة" error={touched && !form.eventDate ? "اختاري تاريخ المناسبة" : undefined}>
                    <input type="date" min={minEventDate} value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} style={{ ...inputStyle(), colorScheme: "dark", fontSize: "1.1rem" }} />
                  </GoldField>
                  <GoldField label="المدينة" error={touched && !form.city ? "اختاري المدينة" : undefined}>
                    <select value={form.city} onChange={(e) => update("city", e.target.value)} style={inputStyle()}>
                      {cityOptions.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </GoldField>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {["الأحساء", "الدمام", "الخبر"].map((c) => (
                      <button key={c} type="button" onClick={() => update("city", c)} style={{ background: form.city === c ? GOLD_DIM : SURFACE, border: `1px solid ${form.city === c ? GOLD : "rgba(255,248,236,0.10)"}`, borderRadius: 8, color: form.city === c ? GOLD : MUTED, cursor: "pointer", fontWeight: 700, padding: "11px 8px", minHeight: 44, fontSize: "0.85rem", transition: "all 180ms ease" }}>
                        {c}
                      </button>
                    ))}
                  </div>
                  <div style={{ background: GOLD_GLOW, border: `1px solid ${GOLD_BORDER}`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CalendarDays size={18} style={{ color: GOLD, flexShrink: 0, marginTop: 2 } as React.CSSProperties} />
                    <p style={{ margin: 0, fontSize: "0.86rem", color: MUTED, lineHeight: 1.7 }}>نتحقق من التوفر ونعود إليك خلال ساعتين عبر واتساب لتأكيد التاريخ.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1 — Package picker (test navigates here via .stepper button.nth(1)) */}
            {step === 1 && (
              <div className="form-scene" style={{ position: "relative", zIndex: 1 }}>
                <StepHeading icon={<Video size={20} />} title="اختاري الباقة" subtitle="حسب لحظات يومك ومدة التغطية المطلوبة" />
                <div className="package-picker" style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))" }}>
                  {packages.map((pkg) => {
                    const active = form.packageId === pkg.id;
                    return (
                      <button key={pkg.id} type="button" aria-pressed={active} className={active ? "selected" : ""}
                        onClick={() => update("packageId", pkg.id)}
                        style={{ background: active ? `linear-gradient(145deg,${GOLD_DIM},rgba(255,248,236,0.07))` : SURFACE, border: `1px solid ${active ? GOLD : "rgba(255,248,236,0.12)"}`, borderRadius: 10, color: IVORY, cursor: "pointer", minHeight: 160, padding: 14, textAlign: "start", transition: "transform 180ms ease,border-color 180ms ease,background 180ms ease", position: "relative", overflow: "hidden" }}>
                        {(pkg as { spotlight?: string }).spotlight && (
                          <span style={{ position: "absolute", top: 8, insetInlineEnd: 8, background: GOLD, color: INK, fontSize: "0.62rem", fontWeight: 900, padding: "2px 6px", borderRadius: 99 }}>
                            {(pkg as { spotlight?: string }).spotlight}
                          </span>
                        )}
                        <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 900, color: GOLD, marginBottom: 6 }}>بكج {pkg.id}</span>
                        <strong style={{ display: "block", fontSize: "1rem", marginBottom: 8 }}>{pkg.name}</strong>
                        <em style={{ display: "block", fontStyle: "normal", fontSize: "1.5rem", fontWeight: 700, color: GOLD, lineHeight: 1, marginBottom: 6 }}>{pkg.price}</em>
                        <small style={{ display: "block", color: MUTED, fontSize: "0.78rem" }}>{pkg.duration}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2 — Venue */}
            {step === 2 && (
              <div className="form-scene" style={{ position: "relative", zIndex: 1 }}>
                <StepHeading icon={<MapPin size={20} />} title="القاعة والتفاصيل" subtitle="اكتبي اسم القاعة أو الحي وأي تفاصيل عن المكان" />
                <div style={{ display: "grid", gap: 14 }}>
                  <GoldField label="القاعة أو الموقع" error={touched && !form.venue ? "اكتبي اسم القاعة أو الحي" : undefined}>
                    <input value={form.venue} onChange={(e) => update("venue", e.target.value)} placeholder="اسم القاعة أو الحي" style={inputStyle()} />
                  </GoldField>
                  <GoldField label="وقت الزفة أو البداية">
                    <input value={form.ceremonyTime} onChange={(e) => update("ceremonyTime", e.target.value)} placeholder="مثال: 9:30 مساء" style={inputStyle()} />
                  </GoldField>
                  <GoldField label="عدد الحضور التقريبي">
                    <input inputMode="numeric" value={form.guestCount} onChange={(e) => update("guestCount", e.target.value)} placeholder="مثال: 150" style={inputStyle()} />
                  </GoldField>
                </div>
              </div>
            )}

            {/* Step 3 — Contact */}
            {step === 3 && (
              <div className="form-scene" style={{ position: "relative", zIndex: 1 }}>
                <StepHeading icon={<User size={20} />} title="تفاصيل التواصل" subtitle="معلوماتك الشخصية — سرية ولا تُشارك" />
                <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
                  <GoldField label="اسمك أو اسم العروس" fullWidth error={touched && form.brideName.trim().length < 2 ? "اكتبي الاسم" : undefined}>
                    <input autoComplete="name" value={form.brideName} onChange={(e) => update("brideName", e.target.value)} placeholder="مثال: أسماء" style={inputStyle()} />
                  </GoldField>
                  <GoldField label="رقم الواتساب" error={touched && form.phone.trim().length < 9 ? "أدخلي رقماً صحيحاً" : undefined}>
                    <input autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="05xxxxxxxx" style={inputStyle()} dir="ltr" />
                  </GoldField>
                  <GoldField label="البريد الإلكتروني (اختياري)">
                    <input autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle()} dir="ltr" />
                  </GoldField>
                  <GoldField label="ملاحظات للتصوير" fullWidth>
                    <textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="أي تفاصيل مهمة: مدخل القاعة، لقطة لا تريدين أن تفوت، سؤال عن إضافة…" style={{ ...inputStyle(), resize: "vertical", lineHeight: 1.75 }} />
                  </GoldField>
                </div>
              </div>
            )}

            {/* Step 4 — Confirmation */}
            {step === 4 && (
              <div className="form-scene" style={{ position: "relative", zIndex: 1 }}>
                <StepHeading icon={<CheckCircle2 size={20} />} title="تأكيد الطلب" subtitle="راجعي التفاصيل ثم أرسليها عبر واتساب" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
                  {[
                    { label: "الباقة",       value: selectedPackage.name, sub: `${selectedPackage.price} ريال · ${selectedPackage.duration}` },
                    { label: "نوع المناسبة", value: form.eventType,       sub: form.eventDate || "التاريخ غير محدد" },
                    { label: "المدينة",      value: form.city,            sub: form.venue || "القاعة غير محددة" },
                    { label: "التواصل",      value: form.brideName || "-",sub: form.phone  || "-" }
                  ].map(({ label, value, sub }) => (
                    <div key={label} style={{ background: SURFACE, border: `1px solid ${GOLD_BORDER}`, borderRadius: 10, padding: 14 }}>
                      <span style={{ display: "block", color: GOLD, fontSize: "0.74rem", fontWeight: 900, marginBottom: 6 }}>{label}</span>
                      <strong style={{ display: "block", fontSize: "0.96rem", color: IVORY, marginBottom: 4 }}>{value}</strong>
                      <small style={{ color: MUTED, fontSize: "0.78rem" }}>{sub}</small>
                    </div>
                  ))}
                </div>

                {/* Primary WhatsApp CTA */}
                <a href={buildWhatsappUrl()} target="_blank" rel="noreferrer"
                   style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "15px 24px", borderRadius: 10, background: `linear-gradient(135deg,${GOLD},#b8923e)`, color: INK, fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", marginBottom: 12, boxShadow: `0 4px 24px rgba(201,168,76,0.35)` }}>
                  <MessageCircle size={20} />
                  إرسال التفاصيل عبر واتساب
                </a>

                <button className="ghost-cta" disabled={submitState === "saving"} onClick={submit} type="button"
                        style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: 8, borderColor: GOLD_BORDER, color: IVORY }}>
                  {submitState === "saving" ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} style={{ color: GOLD } as React.CSSProperties} />}
                  إرسال الطلب مباشرة
                </button>

                {message && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(130,145,118,0.16)", border: "1px solid rgba(130,145,118,0.38)", borderRadius: 8, color: IVORY, lineHeight: 1.7, marginTop: 16, padding: "12px 14px", fontSize: "0.88rem" }}>
                    <CheckCircle2 size={18} style={{ color: GOLD, flexShrink: 0 } as React.CSSProperties} />
                    <span>{message}</span>
                  </div>
                )}

                {/* Deposit section */}
                <div className="reserve-deposit" style={{ marginTop: 20, padding: 16, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, background: `linear-gradient(145deg,${GOLD_GLOW},rgba(255,248,236,0.04))`, display: "grid", gap: 12 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <strong style={{ color: IVORY }}>تثبيت التاريخ بعربون التأكيد</strong>
                    {deposit && (
                      <span style={{ display: "grid", justifyItems: "end", fontSize: "1.25rem", fontWeight: 700, color: GOLD, lineHeight: 1.2 }}>
                        {deposit} ريال
                        <em style={{ fontSize: "0.72rem", fontWeight: 500, fontStyle: "normal", color: MUTED }}>نصف قيمة الباقة · المتبقي يوم المناسبة</em>
                      </span>
                    )}
                  </div>
                  {paymentLink ? (
                    <a href={paymentLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "12px 20px", borderRadius: 8, background: `linear-gradient(135deg,${GOLD},#b8923e)`, color: INK, fontWeight: 800, textDecoration: "none" }}>
                      <CreditCard size={18} />
                      ادفعي العربون الآن (مدى / بطاقة)
                    </a>
                  ) : (
                    <div style={{ display: "grid", gap: 12 }}>
                      <p style={{ display: "flex", alignItems: "flex-start", gap: 8, margin: 0, fontSize: "0.86rem", color: MUTED, lineHeight: 1.7 }}>
                        <Landmark size={16} style={{ color: GOLD, flexShrink: 0, marginTop: 3 } as React.CSSProperties} />
                        احجزي بدفع عربون عبر تحويل بنكي — الطريقة المعتمدة لتثبيت التاريخ.
                      </p>
                      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                        {[
                          "أرسلي التفاصيل أدناه ونؤكد لكِ توفّر التاريخ خلال ساعتين.",
                          "نزوّدك برقم حساب الاستوديو (IBAN) عبر واتساب فور تأكيد التوفر — لحماية مبلغك لا نعرض الرقم علناً.",
                          `حوّلي العربون${deposit ? ` (${deposit} ريال)` : ""} ثم أرسلي صورة الإيصال عبر واتساب لتثبيت الموعد.`
                        ].map((text, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.87rem", color: MUTED, lineHeight: 1.7 }}>
                            <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: 999, background: `linear-gradient(135deg,#dbb87a,${GOLD})`, color: INK, fontSize: "0.78rem", fontWeight: 900, marginTop: 1 }}>{i + 1}</span>
                            {text}
                          </li>
                        ))}
                      </ol>
                      <a href={receiptWhatsappUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "12px 20px", borderRadius: 8, background: `linear-gradient(135deg,${GOLD},#b8923e)`, color: INK, fontWeight: 800, textDecoration: "none" }}>
                        <Upload size={18} />
                        أرسلي إيصال التحويل عبر واتساب
                      </a>
                      <p style={{ display: "flex", alignItems: "flex-start", gap: 8, margin: 0, fontSize: "0.8rem", color: "rgba(255,248,236,0.55)", lineHeight: 1.7 }}>
                        <ShieldCheck size={14} style={{ color: "#a9c2a0", flexShrink: 0, marginTop: 3 } as React.CSSProperties} />
                        العربون لا يُرد عند الإلغاء · المتبقي يُسلَّم يوم المناسبة قبل التصوير.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Nav buttons */}
            {step < STEPS.length - 1 && (
              <div className="form-actions" style={{ display: "flex", gap: 10, justifyContent: "space-between", marginTop: 24, position: "relative", zIndex: 1 }}>
                <button className="ghost-cta" disabled={step === 0} onClick={back} type="button" style={{ opacity: step === 0 ? 0.3 : 1 }}>
                  <ArrowRight size={17} /> رجوع
                </button>
                <button onClick={next} type="button"
                  style={{ background: `linear-gradient(135deg,${GOLD},#b8923e)`, color: INK, fontWeight: 800, border: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 8, cursor: "pointer", fontSize: "1rem" }}>
                  التالي <ArrowLeft size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="reserve-infographic" aria-label="شرح طريقة الحجز">
        {[
          { icon: <Video size={28} />, title: "ابدئي من الباقة",           body: "اختاري بين الزفة، تفاصيل العروس، Half Day، أو تغطية يوم كامل." },
          { icon: <MapPin size={28} />, title: "المكان والتاريخ",           body: "اكتبي المدينة والقاعة وحددي التاريخ حتى نراجع التوفر فوراً." },
          { icon: <MessageCircle size={28} />, title: "متابعة واضحة في واتساب", body: "تصل رسالة مرتبة بجميع التفاصيل فتبدأ المحادثة من نقطة واضحة." }
        ].map(({ icon, title, body }) => (
          <article key={title}>
            <span style={{ color: GOLD }}>{icon}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}

// ─── Shared primitives ─────────────────────────────────────────────────────────
function StepHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ color: GOLD }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: "1.18rem", fontWeight: 800, color: IVORY }}>{title}</h2>
      </div>
      <p style={{ margin: 0, fontSize: "0.84rem", color: MUTED }}>{subtitle}</p>
    </div>
  );
}

function GoldField({ label, error, fullWidth, children }: { label: string; error?: string; fullWidth?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 8, color: MUTED, fontWeight: 800, fontSize: "0.9rem", gridColumn: fullWidth ? "1 / -1" : undefined }}>
      <span>{label}</span>
      {children}
      {error && <em style={{ color: "#ffc0b8", fontSize: "0.82rem", fontStyle: "normal", fontWeight: 700 }}>{error}</em>}
    </label>
  );
}

function inputStyle(): React.CSSProperties {
  return {
    background: "rgba(255,248,236,0.09)",
    border: `1px solid ${GOLD_BORDER}`,
    borderRadius: 8,
    color: IVORY,
    minHeight: 48,
    outline: "none",
    padding: "0.8rem 0.92rem",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "1rem"
  };
}

function inferSource(referrer: string, requestedCity: string | null, packageId: string) {
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
    const p = url.pathname.replace(/\/$/, "") || "/";
    const map: Record<string, string> = { "/": "home-hero", "/faq": "faq-page", "/portfolio": "portfolio-page", "/zaffa": "zaffa-page", "/engagement": "engagement-page", "/reviews": "reviews-page", "/about": "about-page", "/packages": "packages-hero" };
    return withIntent(map[p] ?? p.slice(1) ?? "reserve-page");
  } catch {
    return withIntent("reserve-page");
  }
}

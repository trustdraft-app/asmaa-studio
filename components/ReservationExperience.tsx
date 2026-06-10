"use client";

import { useEffect, useState } from "react";
import { whatsappNumber } from "../lib/content";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const GOLD       = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const INK        = "#0c0a08";

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS = ["المناسبة", "المدينة", "الباقة", "التفاصيل", "التأكيد"];

// ─── Data ─────────────────────────────────────────────────────────────────────
const EVENT_TYPES = [
  { id: "زواج",  label: "حفل زفاف",    icon: "💒", desc: "توثيق كامل ليومكِ الكبير",  tint: "rgba(190,18,60,.14)" },
  { id: "خطوبة", label: "ملكة وخطوبة", icon: "💍", desc: "لحظات الفرح الأولى",        tint: "rgba(126,34,206,.14)" },
  { id: "نسائي", label: "تصوير نسائي", icon: "✨", desc: "جلسة تُعبّر عن شخصيتك",     tint: "rgba(219,39,119,.12)" },
  { id: "خاص",   label: "مناسبة خاصة", icon: "🌸", desc: "كل لحظة تستحق التوثيق",     tint: "rgba(217,119,6,.12)" },
];

const CITIES = [
  { id: "الخبر",   label: "الخبر",   tagline: "المدينة الساحلية الراقية" },
  { id: "الدمام",  label: "الدمام",  tagline: "قلب المنطقة الشرقية" },
  { id: "الأحساء", label: "الأحساء", tagline: "واحة التراث والجمال" },
  { id: "القطيف",  label: "القطيف",  tagline: "عبق الأصالة والتقاليد" },
];

const PACKAGES = [
  { id: "01", nameAr: "بكج الزفة",        icon: "🎞️", price: "600 ريال",      duration: "20 دقيقة",  bullets: ["لحظة الدخول", "مونتاج مختصر", "تسليم سريع"], popular: false },
  { id: "02", nameAr: "بكج الزفة المطور", icon: "🎬", price: "1,200 ريال",    duration: "ساعة",      bullets: ["الكوشة والكيك", "لقطات القاعة", "مونتاج سينمائي"], popular: false },
  { id: "03", nameAr: "الباقة الجزئية",   icon: "📸", price: "من 1,700 ريال", duration: "ساعتان",    bullets: ["200+ صورة محررة", "غرفة تجهيز", "تسليم خلال أسبوع"], popular: false },
  { id: "04", nameAr: "يوم كامل",         icon: "👑", price: "من 2,500 ريال", duration: "8 ساعات",   bullets: ["600+ صورة محررة", "فيلم الزفاف الكامل", "تغطية شاملة"], popular: true  },
  { id: "05", nameAr: "باقة الخطوبة",     icon: "💝", price: "من 1,500 ريال", duration: "ساعة ونصف", bullets: ["150+ صورة محررة", "فيديو قصير", "ألبوم رقمي"], popular: false },
];

// City-page slugs → wizard city ids. Every /{city} page links to
// /reserve?city={slug}; sub-areas fall back to their parent city.
const CITY_SLUG_TO_ID: Record<string, string> = {
  khobar: "الخبر",
  dammam: "الدمام",
  alahsa: "الأحساء",
  qatif: "القطيف",
  hofuf: "الأحساء",
  mubarraz: "الأحساء",
  alomran: "الأحساء",
  altarafiyya: "الأحساء",
  jubail: "الدمام"
};

// ─── Date helpers ─────────────────────────────────────────────────────────────
function formatDateArabic(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    const hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
      day: "numeric", month: "long", year: "numeric"
    }).format(d);
    const greg = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(d);
    return `${hijri} — ${greg}`;
  } catch {
    return iso;
  }
}

// ─── CSS (component-scoped; whatsapp-pulse + step-enter live in globals.css) ──
function GlobalStyles() {
  return (
    <style>{`
      @keyframes glow-drift {
        0%,100%{opacity:.06;transform:scale(1) rotate(0deg);}
        50%{opacity:.11;transform:scale(1.04) rotate(30deg);}
      }
      @keyframes float-in{from{opacity:0;transform:translateY(12px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
      @keyframes shimmer-sweep{0%{transform:translateX(-150%) skewX(-20deg);}100%{transform:translateX(350%) skewX(-20deg);}}
      .step-scene{animation:step-enter 380ms cubic-bezier(.22,1,.36,1) both;}
      .float-in{animation:float-in 320ms cubic-bezier(.22,1,.36,1) both;}
      .pulse-wa{animation:whatsapp-pulse 2s ease-out infinite;}
      .geo-bg{animation:glow-drift 60s linear infinite;}
      .card-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
      .sel-card{
        position:relative;cursor:pointer;overflow:hidden;
        background:rgba(255,255,255,.05);
        border:1.5px solid rgba(201,168,76,.2);
        border-radius:18px;padding:20px 12px;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        gap:8px;min-height:128px;text-align:center;
        transition:all 300ms ease;
        backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
      }
      .sel-card:hover{border-color:rgba(201,168,76,.55);background:rgba(255,255,255,.09);box-shadow:0 0 28px rgba(201,168,76,.25);transform:translateY(-2px);}
      .sel-card.selected{border-color:#C9A84C;background:rgba(201,168,76,.1);box-shadow:0 0 32px rgba(201,168,76,.35),inset 0 0 20px rgba(201,168,76,.05);}
      .sel-card .c-icon{font-size:30px;line-height:1;filter:drop-shadow(0 0 12px rgba(201,168,76,.35));}
      .sel-card .c-label{font-size:.86rem;font-weight:800;color:rgba(255,248,236,.88);line-height:1.3;}
      .sel-card .c-desc{font-size:.66rem;color:rgba(255,248,236,.45);line-height:1.45;}
      .sel-card.selected .c-label{color:#E8C96A;}
      .sel-card.selected .c-desc{color:rgba(255,248,236,.6);}
      .pkg-card{
        cursor:pointer;position:relative;overflow:hidden;
        background:rgba(255,255,255,.05);
        border:1.5px solid rgba(201,168,76,.2);
        border-radius:20px;padding:20px;
        transition:all 300ms ease;
        backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
      }
      .pkg-card:hover{border-color:rgba(201,168,76,.5);background:rgba(255,255,255,.08);box-shadow:0 0 30px rgba(201,168,76,.2);transform:translateY(-2px);}
      .pkg-card.selected{border-color:#C9A84C;background:rgba(201,168,76,.08);box-shadow:0 0 40px rgba(201,168,76,.35),inset 0 0 24px rgba(201,168,76,.06);}
      .pkg-card.popular{border-color:rgba(201,168,76,.45);}
      .pkg-card.popular::after{
        content:"";position:absolute;top:0;bottom:0;width:60px;
        background:linear-gradient(90deg,transparent,rgba(232,201,106,.07),transparent);
        animation:shimmer-sweep 3.2s ease-in-out infinite;pointer-events:none;
      }
      .input-field{
        width:100%;box-sizing:border-box;
        background:rgba(255,255,255,.05);
        border:1.5px solid rgba(255,248,236,.12);
        border-radius:16px;padding:16px;
        color:rgba(255,248,236,.92);font-size:1rem;
        text-align:right;direction:rtl;
        outline:none;transition:border-color 250ms ease,box-shadow 250ms ease,background 250ms ease;
        backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
        font-family:inherit;-webkit-appearance:none;resize:none;
      }
      .input-field:focus{border-color:rgba(201,168,76,.6);background:rgba(255,255,255,.08);box-shadow:0 0 30px rgba(201,168,76,.12);}
      .input-field::placeholder{color:rgba(255,248,236,.32);}
      .input-field::-webkit-calendar-picker-indicator{filter:invert(.7);}
      .input-ltr{direction:ltr;text-align:left;}
      .btn-next{
        background:linear-gradient(135deg,#C9A84C,#E8C96A);
        color:#0c0a08;font-weight:800;font-size:1rem;
        border:none;border-radius:16px;padding:16px 32px;
        cursor:pointer;width:100%;min-height:56px;
        box-shadow:0 0 30px rgba(201,168,76,.3);
        transition:transform 200ms ease,box-shadow 200ms ease,opacity 200ms ease;
      }
      .btn-next:hover{transform:translateY(-1px);box-shadow:0 6px 30px rgba(201,168,76,.5);}
      .btn-next:active{transform:scale(.98);}
      .btn-next:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none;background:rgba(255,255,255,.1);color:rgba(255,248,236,.35);}
      .btn-back{
        background:transparent;color:rgba(255,248,236,.7);font-weight:600;font-size:.95rem;
        border:1.5px solid rgba(201,168,76,.35);border-radius:16px;
        padding:14px 24px;cursor:pointer;flex:1;min-height:56px;
        transition:all 200ms ease;
      }
      .btn-back:hover{border-color:#C9A84C;color:#E8C96A;}
      .wa-cta{
        display:block;text-align:center;position:relative;overflow:hidden;
        background:linear-gradient(135deg,#25D366,#128C7E);
        color:#fff;font-weight:900;font-size:1.05rem;
        border-radius:16px;padding:18px 24px;text-decoration:none;
        box-shadow:0 0 40px rgba(37,211,102,.3);
        transition:transform 150ms ease;
      }
      .wa-cta:active{transform:scale(.98);}
      .confirm-row{
        display:flex;align-items:center;justify-content:space-between;gap:12px;
        padding:13px 4px;border-bottom:1px solid rgba(255,248,236,.06);
      }
      .badge-pop{
        display:inline-block;
        background:linear-gradient(90deg,#C9A84C,#E8C96A);
        color:#0c0a08;font-size:.65rem;font-weight:900;
        border-radius:999px;padding:3px 10px;letter-spacing:.02em;
        box-shadow:0 0 14px rgba(201,168,76,.4);
      }
      .step-dot{
        width:30px;height:30px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:.74rem;font-weight:900;
        transition:all 420ms ease;flex-shrink:0;position:relative;z-index:1;
      }
      .sel-dot{
        position:absolute;top:9px;left:9px;
        width:10px;height:10px;border-radius:50%;
        background:#C9A84C;box-shadow:0 0 10px #C9A84C;
      }
      @media(max-width:420px){
        .sel-card{min-height:112px;padding:16px 10px;}
        .sel-card .c-icon{font-size:26px;}
        .sel-card .c-label{font-size:.8rem;}
      }
      @media(prefers-reduced-motion:reduce){
        .step-scene,.float-in,.pulse-wa,.geo-bg,.pkg-card.popular::after{animation:none;}
      }
    `}</style>
  );
}

// ─── Islamic background ───────────────────────────────────────────────────────
function IslamicBg() {
  return (
    <div className="geo-bg" aria-hidden="true"
      style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden" }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
        style={{ position:"absolute",inset:0 }}
      >
        <defs>
          <pattern id="istar" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,8 61,35 90,35 68,53 76,80 50,63 24,80 32,53 10,35 39,35"
              fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.7"/>
            <polygon points="50,22 58,40 78,40 63,52 68,70 50,60 32,70 37,52 22,40 42,40"
              fill="none" stroke={GOLD} strokeWidth="0.4" opacity="0.45"/>
            <circle cx="50" cy="50" r="3.5" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4"/>
            <line x1="50" y1="8"  x2="50" y2="92" stroke={GOLD} strokeWidth="0.2" opacity="0.2"/>
            <line x1="8"  y1="50" x2="92" y2="50" stroke={GOLD} strokeWidth="0.2" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#istar)" opacity="0.08"/>
      </svg>
      <div style={{ position:"absolute",top:"-15%",left:"50%",transform:"translateX(-50%)",
        width:"min(800px,90vw)",height:400,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(201,168,76,.1) 0%,transparent 70%)",filter:"blur(60px)" }}/>
      <div style={{ position:"absolute",bottom:"-10%",right:"-10%",width:"45vw",height:"45vw",maxWidth:420,maxHeight:420,
        borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%)" }}/>
    </div>
  );
}

// ─── Gold location pin ────────────────────────────────────────────────────────
function PinIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ filter:"drop-shadow(0 0 10px rgba(201,168,76,.45))" }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke={GOLD} strokeWidth="1.5" fill="rgba(201,168,76,.12)"/>
      <circle cx="12" cy="9" r="2.5" stroke={GOLD_LIGHT} strokeWidth="1.4" fill="none"/>
    </svg>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ current }: { current: number }) {
  const progress = (current / (STEPS.length - 1)) * 100;
  return (
    <div style={{ position:"relative",marginBottom:28 }}>
      <div style={{ position:"absolute",top:14,right:15,left:15,height:2,
        background:"rgba(255,248,236,.10)",borderRadius:99 }}/>
      <div style={{ position:"absolute",top:14,right:15,
        width:`calc(${progress}% - 15px)`,height:2,
        background:`linear-gradient(90deg,${GOLD},${GOLD_LIGHT})`,borderRadius:99,
        boxShadow:"0 0 10px rgba(201,168,76,.5)",
        transition:"width 700ms cubic-bezier(.4,0,.2,1)" }}/>
      <div style={{ display:"flex",justifyContent:"space-between",position:"relative" }}>
        {STEPS.map((label, i) => {
          const done   = i < current;
          const active = i === current;
          return (
            <div key={label} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5,flex:1 }}>
              <div className="step-dot" style={{
                background: active ? `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})` : done ? "rgba(201,168,76,.25)" : "rgba(255,248,236,.06)",
                border:`2px solid ${active||done ? GOLD : "rgba(255,248,236,.15)"}`,
                color: active ? INK : done ? GOLD : "rgba(255,248,236,.45)",
                boxShadow: active ? "0 0 20px rgba(201,168,76,.55)" : "none",
              }}>
                {done ? "✓" : i+1}
              </div>
              <span style={{ fontSize:".62rem",fontWeight:800,textAlign:"center",lineHeight:1.1,
                color: active ? GOLD : done ? "rgba(255,248,236,.7)" : "rgba(255,248,236,.3)",
                transition:"color 300ms ease" }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step heading ─────────────────────────────────────────────────────────────
function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <>
      <h2 style={{ textAlign:"center",marginBottom:6,fontSize:"1.3rem",fontWeight:900,color:"rgba(255,248,236,.92)" }}>
        {title}
      </h2>
      <p style={{ textAlign:"center",color:"rgba(255,248,236,.5)",fontSize:".85rem",marginBottom:24 }}>
        {sub}
      </p>
    </>
  );
}

// ─── Step 0 — Event type ──────────────────────────────────────────────────────
function StepEvent({ eventType, setEventType }: { eventType: string; setEventType: (v: string) => void }) {
  return (
    <div className="step-scene" dir="rtl">
      <h1 style={{
        textAlign:"center",marginBottom:6,
        fontSize:"clamp(1.4rem,5vw,1.9rem)",fontWeight:900,lineHeight:1.2,
        background:`linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`,
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
      }}>احجزي موعدك</h1>
      <p style={{ textAlign:"center",color:"rgba(255,248,236,.5)",fontSize:".85rem",marginBottom:24 }}>
        اختاري نوع المناسبة للبدء
      </p>
      <div className="card-grid">
        {EVENT_TYPES.map((e, i) => (
          <div key={e.id}
            className={`sel-card float-in ${eventType===e.id ? "selected" : ""}`}
            onClick={() => setEventType(e.id)}
            role="button" tabIndex={0}
            onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setEventType(e.id); } }}
            style={{ animationDelay:`${i*60}ms`,
              backgroundImage:`linear-gradient(180deg,${e.tint},transparent 65%)` }}
          >
            <span className="c-icon">{e.icon}</span>
            <span className="c-label">{e.label}</span>
            <span className="c-desc">{e.desc}</span>
            {eventType===e.id && <div className="sel-dot"/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1 — City ────────────────────────────────────────────────────────────
function StepCity({ city, setCity }: { city: string; setCity: (v: string) => void }) {
  return (
    <div className="step-scene" dir="rtl">
      <StepHeading title="في أي مدينة؟" sub="نغطي المنطقة الشرقية بالكامل"/>
      <div className="card-grid">
        {CITIES.map((c, i) => (
          <div key={c.id}
            className={`sel-card float-in ${city===c.id ? "selected" : ""}`}
            onClick={() => setCity(c.id)}
            role="button" tabIndex={0}
            onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setCity(c.id); } }}
            style={{ animationDelay:`${i*60}ms` }}
          >
            <PinIcon/>
            <span className="c-label">{c.label}</span>
            <span className="c-desc">{c.tagline}</span>
            {city===c.id && <div className="sel-dot"/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2 — Package ─────────────────────────────────────────────────────────
function StepPackage({ pkgId, setPkgId }: { pkgId: string; setPkgId: (v: string) => void }) {
  return (
    <div className="step-scene" dir="rtl">
      <StepHeading title="اختاري باقتك" sub="كل باقة تشمل تصوير سينمائي احترافي"/>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        {PACKAGES.map((pkg, i) => (
          <div key={pkg.id}
            className={`pkg-card float-in ${pkgId===pkg.id ? "selected" : ""} ${pkg.popular ? "popular" : ""}`}
            onClick={() => setPkgId(pkg.id)}
            role="button" tabIndex={0}
            onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setPkgId(pkg.id); } }}
            style={{ animationDelay:`${i*70}ms` }}
          >
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" }}>
                <span style={{ fontSize:"1.2rem",lineHeight:1 }}>{pkg.icon}</span>
                <span style={{ fontSize:"1.05rem",fontWeight:900,color:"rgba(255,248,236,.92)" }}>{pkg.nameAr}</span>
                {pkg.popular && <span className="badge-pop">الأكثر طلباً</span>}
              </div>
              <div style={{ textAlign:"left",flexShrink:0 }}>
                <div style={{ fontSize:".88rem",fontWeight:900,color: pkgId===pkg.id ? GOLD_LIGHT : GOLD }}>
                  {pkg.price}
                </div>
                <div style={{ fontSize:".68rem",color:"rgba(255,248,236,.45)" }}>{pkg.duration}</div>
              </div>
            </div>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              {pkg.bullets.map((b) => (
                <span key={b} style={{
                  fontSize:".72rem",color:"rgba(255,248,236,.55)",
                  background:"rgba(255,255,255,.06)",borderRadius:999,
                  padding:"3px 10px",border:"1px solid rgba(255,248,236,.10)",
                }}>{b}</span>
              ))}
            </div>
            {pkgId===pkg.id && <div className="sel-dot" style={{ top:10,left:10 }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 3 — Details ─────────────────────────────────────────────────────────
function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display:"block",fontSize:".78rem",fontWeight:700,color:GOLD,marginBottom:8,textAlign:"right" }}>
        {label}{optional && <span style={{ color:"rgba(255,248,236,.4)",fontSize:".68rem",fontWeight:500 }}> (اختياري)</span>}
      </label>
      {children}
    </div>
  );
}

function StepDetails({ date, setDate, name, setName, phone, setPhone, notes, setNotes }: {
  date: string; setDate: (v: string) => void;
  name: string; setName: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  notes: string; setNotes: (v: string) => void;
}) {
  return (
    <div className="step-scene" dir="rtl">
      <StepHeading title="تفاصيل المناسبة" sub="خطوة أخيرة قبل التأكيد"/>
      <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
        <Field label="تاريخ المناسبة">
          <input className="input-field" type="date" value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
          {date && (
            <p style={{ marginTop:8,fontSize:".74rem",color:GOLD_LIGHT,textAlign:"right",opacity:.85 }}>
              ✦ {formatDateArabic(date)}
            </p>
          )}
        </Field>
        <Field label="اسمك الكريم">
          <input className="input-field" type="text" placeholder="مثال: نورة محمد"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field label="رقم الجوال" optional>
          <input className="input-field input-ltr" type="tel" inputMode="tel"
            placeholder="05xxxxxxxx" value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s]/g, ""))}
          />
        </Field>
        <Field label="ملاحظات" optional>
          <textarea className="input-field" rows={3}
            placeholder="أي تفاصيل أو طلبات خاصة..."
            value={notes} onChange={(e) => setNotes(e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

// ─── Step 4 — Confirm ─────────────────────────────────────────────────────────
function StepConfirm({ eventType, city, pkgId, date, name, phone, notes, waLink }: {
  eventType: string; city: string; pkgId: string;
  date: string; name: string; phone: string; notes: string; waLink: string;
}) {
  const ev  = EVENT_TYPES.find((e) => e.id === eventType);
  const pkg = PACKAGES.find((p) => p.id === pkgId);
  const rows = [
    { label:"المناسبة", value: ev?.label ?? eventType },
    { label:"المدينة",  value: city },
    { label:"الباقة",   value: pkg ? `${pkg.nameAr} — ${pkg.price}` : pkgId },
    { label:"التاريخ",  value: formatDateArabic(date) },
    { label:"الاسم",    value: name },
    ...(phone ? [{ label:"الجوال", value: phone }] : []),
    ...(notes.trim() ? [{ label:"ملاحظات", value: notes.trim() }] : []),
  ];
  return (
    <div className="step-scene" dir="rtl">
      <div style={{
        borderRadius:24,border:"1px solid rgba(201,168,76,.25)",
        background:"linear-gradient(180deg,rgba(255,255,255,.045),transparent)",
        padding:"24px 20px",
      }}>
        <div style={{ textAlign:"center",marginBottom:14 }}>
          <div style={{ fontSize:"2.2rem",marginBottom:6,color:GOLD,textShadow:"0 0 20px rgba(201,168,76,.5)" }}>✦</div>
          <h2 style={{ fontSize:"1.3rem",fontWeight:900,color:"rgba(255,248,236,.92)",marginBottom:4 }}>
            ملخص حجزك
          </h2>
          <p style={{ color:"rgba(255,248,236,.5)",fontSize:".82rem" }}>
            راجعي التفاصيل وأرسلي طلبك عبر واتساب
          </p>
        </div>
        <div>
          {rows.map(({ label, value }) => (
            <div key={label} className="confirm-row">
              <span style={{ color:GOLD,fontSize:".8rem",fontWeight:700,flexShrink:0 }}>{label}</span>
              <span style={{ fontSize:".88rem",fontWeight:700,color:"rgba(255,248,236,.92)",textAlign:"left" }}>
                {value || "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-cta pulse-wa"
        style={{ marginTop:20 }}>
        <span style={{ position:"relative",zIndex:1 }}>📲 تواصلي معنا عبر واتساب</span>
      </a>
      <p style={{ textAlign:"center",color:"rgba(255,248,236,.4)",fontSize:".7rem",marginTop:12 }}>
        سنرد خلال ساعات · التوثيق مخصص بالكامل لكِ
      </p>
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export function ReservationExperience() {
  const [step,      setStep]      = useState(0);
  const [eventType, setEventType] = useState("");
  const [city,      setCity]      = useState("");
  const [pkgId,     setPkgId]     = useState("");
  const [date,      setDate]      = useState("");
  const [name,      setName]      = useState("");
  const [phone,     setPhone]     = useState("");
  const [notes,     setNotes]     = useState("");
  const [prefill,   setPrefill]   = useState<{ city: string; pkg: string }>({ city: "", pkg: "" });

  // Restore city/package prefill from query params (?city=dammam&package=02) —
  // every city page and package card links here with these params so the bride
  // never re-answers a question she already answered on the page she came from.
  useEffect(() => {
    // One-time sync from an external system (the URL) — must run after mount
    // because the page is statically prerendered without query params, so a
    // lazy useState initializer would cause a hydration mismatch.
    const params = new URLSearchParams(window.location.search);
    const cityId = CITY_SLUG_TO_ID[params.get("city") ?? ""] ?? "";
    const pkgParam = (params.get("package") ?? "").padStart(2, "0");
    const pkgMatch = PACKAGES.find((p) => p.id === pkgParam)?.id ?? "";
    if (!cityId && !pkgMatch) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    if (cityId) setCity(cityId);
    if (pkgMatch) setPkgId(pkgMatch);
    setPrefill({ city: cityId, pkg: pkgMatch });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Scroll to top on step change so each scene opens from its heading.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const canNext = [!!eventType, !!city, !!pkgId, !!(date && name.trim()), true][step];
  const next    = () => { if (canNext) setStep((s) => Math.min(s+1, 4)); };
  const back    = () => setStep((s) => Math.max(s-1, 0));

  function buildWA() {
    const ev  = EVENT_TYPES.find((e) => e.id === eventType);
    const pkg = PACKAGES.find((p) => p.id === pkgId);
    const msg = [
      "مرحباً 👋 أود الحجز",
      `المناسبة: ${ev?.label ?? eventType}`,
      `المدينة: ${city}`,
      `الباقة: ${pkg ? `${pkg.nameAr} — ${pkg.price}` : pkgId}`,
      date ? `التاريخ: ${formatDateArabic(date)}` : "",
      name ? `الاسم: ${name}` : "",
      phone ? `الجوال: ${phone}` : "",
      notes.trim() ? `ملاحظات: ${notes.trim()}` : "",
    ].filter(Boolean).join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  function renderStep() {
    switch (step) {
      case 0: return <StepEvent   eventType={eventType} setEventType={setEventType} />;
      case 1: return <StepCity    city={city}           setCity={setCity} />;
      case 2: return <StepPackage pkgId={pkgId}         setPkgId={setPkgId} />;
      case 3: return <StepDetails date={date} setDate={setDate} name={name} setName={setName}
                       phone={phone} setPhone={setPhone} notes={notes} setNotes={setNotes} />;
      case 4: return <StepConfirm eventType={eventType} city={city} pkgId={pkgId}
                       date={date} name={name} phone={phone} notes={notes} waLink={buildWA()} />;
      default: return null;
    }
  }

  return (
    <>
      <GlobalStyles/>
      <IslamicBg/>
      <div dir="rtl" data-reserve-root
        data-prefill-city={prefill.city || undefined}
        data-prefill-package={prefill.pkg || undefined}
        style={{
        minHeight:"100dvh",background:"#050505",
        display:"flex",flexDirection:"column",
        alignItems:"center",position:"relative",
      }}>
        {/* Top gold bar */}
        <div style={{
          width:"100%",height:2,flexShrink:0,
          background:`linear-gradient(90deg,transparent,${GOLD},${GOLD_LIGHT},${GOLD},transparent)`,
          opacity:.6,
        }}/>

        <div style={{
          width:"100%",maxWidth:480,
          padding:"28px 20px 130px",
          position:"relative",zIndex:1,
          flex:1,display:"flex",flexDirection:"column",
        }}>
          {/* Brand mark */}
          <div style={{ textAlign:"center",marginBottom:20 }}>
            <span style={{ fontSize:".72rem",fontWeight:900,letterSpacing:".25em",color:GOLD,textTransform:"uppercase",opacity:.8 }}>
              Asmaa Studio ✦
            </span>
            <div style={{ fontSize:".62rem",color:"rgba(255,248,236,.35)",marginTop:4,letterSpacing:".08em" }}>
              أسماء ستوديو · المنطقة الشرقية
            </div>
          </div>

          <Stepper current={step}/>

          <div style={{ flex:1 }}>{renderStep()}</div>

          <p style={{ textAlign:"center",fontSize:".65rem",color:"rgba(255,248,236,.2)",marginTop:24 }}>
            © {new Date().getFullYear()} Asmaa Studio · المنطقة الشرقية
          </p>
        </div>

        {/* Fixed bottom navigation */}
        <div style={{
          position:"fixed",bottom:0,insetInline:0,zIndex:5,
          padding:"32px 16px 16px",
          background:"linear-gradient(to top,#050505 55%,rgba(5,5,5,.95) 75%,transparent)",
        }}>
          <div style={{ display:"flex",gap:12,maxWidth:480,margin:"0 auto" }} dir="rtl">
            {step > 0 && step < 4 && <button className="btn-back" onClick={back}>← رجوع</button>}
            {step < 4 ? (
              <button className="btn-next" onClick={next} disabled={!canNext}
                style={{ flex: step>0 ? 3 : undefined }}>
                {step===3 ? "مراجعة الطلب ✦" : "التالي →"}
              </button>
            ) : (
              <button className="btn-back" onClick={back} style={{ width:"100%" }}>← تعديل التفاصيل</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

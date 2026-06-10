"use client";

import { useState } from "react";
import { whatsappNumber } from "../lib/content";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const GOLD       = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const INK        = "#0c0a08";

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS = ["المناسبة", "المدينة", "الباقة", "التفاصيل", "التأكيد"];

// ─── Data ─────────────────────────────────────────────────────────────────────
const EVENT_TYPES = [
  { id: "زواج",  label: "حفل زفاف",    icon: "💒" },
  { id: "خطوبة", label: "جلسة خطوبة",  icon: "💍" },
  { id: "نسائي", label: "تصوير نسائي", icon: "📸" },
  { id: "خاص",   label: "مناسبة خاصة", icon: "✨" },
];

const CITIES = [
  { id: "الخبر",   label: "الخبر" },
  { id: "الدمام",  label: "الدمام" },
  { id: "الأحساء", label: "الأحساء" },
  { id: "القطيف",  label: "القطيف" },
];

const PACKAGES = [
  { id: "03", nameAr: "الباقة الجزئية", price: "من 1,700 ريال", bullets: ["ساعتان", "200+ صورة", "غرفة تجهيز"], popular: false },
  { id: "04", nameAr: "يوم كامل",       price: "من 2,500 ريال", bullets: ["8 ساعات", "600+ صورة", "فيلم كامل"],    popular: true  },
  { id: "05", nameAr: "باقة الخطوبة",  price: "من 1,500 ريال", bullets: ["ساعة ونصف", "150+ صورة", "فيديو قصير"], popular: false },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @keyframes glow-drift {
        0%,100%{opacity:.06;transform:scale(1) rotate(0deg);}
        50%{opacity:.11;transform:scale(1.04) rotate(30deg);}
      }
      @keyframes pulse-gold {
        0%,100%{box-shadow:0 0 20px rgba(201,168,76,.3),0 0 40px rgba(201,168,76,.15);}
        50%{box-shadow:0 0 60px rgba(201,168,76,.7),0 0 100px rgba(201,168,76,.4);}
      }
      @keyframes step-enter{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
      @keyframes float-in{from{opacity:0;transform:translateY(10px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
      .step-scene{animation:step-enter 380ms cubic-bezier(.22,1,.36,1) both;}
      .float-in{animation:float-in 300ms cubic-bezier(.22,1,.36,1) both;}
      .pulse-wa{animation:pulse-gold 2s ease-in-out infinite;}
      .geo-bg{animation:glow-drift 60s linear infinite;}
      .card-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
      .sel-card{
        position:relative;cursor:pointer;
        background:rgba(255,255,255,.05);
        border:1.5px solid rgba(201,168,76,.2);
        border-radius:16px;padding:20px 12px;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        gap:10px;min-height:110px;text-align:center;
        transition:all 300ms ease;
        backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
      }
      .sel-card:hover{border-color:rgba(201,168,76,.55);background:rgba(255,255,255,.09);box-shadow:0 0 28px rgba(201,168,76,.25);}
      .sel-card.selected{border-color:#C9A84C;background:rgba(201,168,76,.1);box-shadow:0 0 32px rgba(201,168,76,.35),inset 0 0 20px rgba(201,168,76,.05);}
      .sel-card .c-icon{font-size:28px;line-height:1;}
      .sel-card .c-label{font-size:.82rem;font-weight:700;color:rgba(255,248,236,.85);line-height:1.3;}
      .sel-card.selected .c-label{color:#E8C96A;}
      .pkg-card{
        cursor:pointer;position:relative;
        background:rgba(255,255,255,.05);
        border:1.5px solid rgba(201,168,76,.2);
        border-radius:18px;padding:20px;
        transition:all 300ms ease;
        backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
      }
      .pkg-card:hover{border-color:rgba(201,168,76,.5);background:rgba(255,255,255,.08);box-shadow:0 0 30px rgba(201,168,76,.2);}
      .pkg-card.selected{border-color:#C9A84C;background:rgba(201,168,76,.08);box-shadow:0 0 40px rgba(201,168,76,.35),inset 0 0 24px rgba(201,168,76,.06);}
      .input-field{
        width:100%;box-sizing:border-box;
        background:rgba(255,255,255,.05);
        border:1.5px solid rgba(255,248,236,.12);
        border-radius:14px;padding:16px;
        color:rgba(255,248,236,.92);font-size:1rem;
        text-align:right;direction:rtl;
        outline:none;transition:border-color 250ms ease;
        backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
        font-family:inherit;-webkit-appearance:none;
      }
      .input-field:focus{border-color:rgba(201,168,76,.55);}
      .input-field::placeholder{color:rgba(255,248,236,.35);}
      .input-field::-webkit-calendar-picker-indicator{filter:invert(.7);}
      .btn-next{
        background:linear-gradient(135deg,#C9A84C,#E8C96A);
        color:#0c0a08;font-weight:800;font-size:1rem;
        border:none;border-radius:14px;padding:16px 32px;
        cursor:pointer;width:100%;
        transition:transform 200ms ease,box-shadow 200ms ease;
      }
      .btn-next:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(201,168,76,.45);}
      .btn-next:active{transform:translateY(0);}
      .btn-next:disabled{opacity:.45;cursor:not-allowed;transform:none;}
      .btn-back{
        background:transparent;color:rgba(255,248,236,.7);font-weight:600;font-size:.95rem;
        border:1.5px solid rgba(201,168,76,.35);border-radius:14px;
        padding:14px 24px;cursor:pointer;flex:1;
        transition:all 200ms ease;
      }
      .btn-back:hover{border-color:#C9A84C;color:#E8C96A;}
      .confirm-row{
        display:flex;align-items:center;gap:12px;
        padding:14px 16px;border-radius:12px;
        background:rgba(255,255,255,.04);
        border:1px solid rgba(201,168,76,.15);
      }
      .badge-pop{
        display:inline-block;
        background:linear-gradient(90deg,#C9A84C,#E8C96A);
        color:#0c0a08;font-size:.65rem;font-weight:900;
        border-radius:999px;padding:3px 10px;letter-spacing:.02em;
      }
      .step-dot{
        width:28px;height:28px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:.72rem;font-weight:900;
        transition:all 320ms ease;flex-shrink:0;position:relative;z-index:1;
      }
      .sel-dot{
        position:absolute;top:8px;left:8px;
        width:10px;height:10px;border-radius:50%;
        background:#C9A84C;box-shadow:0 0 8px #C9A84C;
      }
      @media(max-width:420px){
        .sel-card{min-height:95px;padding:16px 10px;}
        .sel-card .c-icon{font-size:24px;}
        .sel-card .c-label{font-size:.78rem;}
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
      <div style={{ position:"absolute",top:"-10%",left:"-10%",width:"60vw",height:"60vw",maxWidth:600,maxHeight:600,
        borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",bottom:"-10%",right:"-10%",width:"45vw",height:"45vw",maxWidth:420,maxHeight:420,
        borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%)",pointerEvents:"none" }}/>
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ current }: { current: number }) {
  const progress = (current / (STEPS.length - 1)) * 100;
  return (
    <div style={{ position:"relative",marginBottom:28 }}>
      <div style={{ position:"absolute",top:13,right:14,left:14,height:2,
        background:"rgba(255,248,236,.10)",borderRadius:99 }}/>
      <div style={{ position:"absolute",top:13,right:14,
        width:`calc(${progress}% - 14px)`,height:2,
        background:`linear-gradient(90deg,${GOLD},${GOLD_LIGHT})`,borderRadius:99,
        transition:"width 420ms cubic-bezier(.4,0,.2,1)" }}/>
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
                boxShadow: active ? `0 0 14px rgba(201,168,76,.6)` : "none",
              }}>
                {done ? "✓" : i+1}
              </div>
              <span style={{ fontSize:".62rem",fontWeight:800,textAlign:"center",lineHeight:1.1,
                color: active ? GOLD : done ? "rgba(255,248,236,.7)" : "rgba(255,248,236,.35)",
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

// ─── Step props type ──────────────────────────────────────────────────────────
type StepProps = {
  eventType: string; setEventType: (v: string) => void;
  city: string;      setCity:      (v: string) => void;
  pkgId: string;     setPkgId:     (v: string) => void;
  date: string;      setDate:      (v: string) => void;
  name: string;      setName:      (v: string) => void;
};

// ─── Step 0 — Event type (OUTSIDE main component) ────────────────────────────
function StepEvent({ eventType, setEventType }: Pick<StepProps, "eventType"|"setEventType">) {
  return (
    <div className="step-scene" dir="rtl">
      <h1 style={{
        textAlign:"center",marginBottom:6,
        fontSize:"clamp(1.4rem,5vw,1.9rem)",fontWeight:900,lineHeight:1.2,
        background:`linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`,
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
      }}>احجزي جلستك الآن</h1>
      <p style={{ textAlign:"center",color:"rgba(255,248,236,.5)",fontSize:".85rem",marginBottom:24 }}>
        اختاري نوع المناسبة للبدء
      </p>
      <div className="card-grid">
        {EVENT_TYPES.map((e, i) => (
          <div key={e.id}
            className={`sel-card float-in ${eventType===e.id ? "selected" : ""}`}
            onClick={() => setEventType(e.id)}
            style={{ animationDelay:`${i*60}ms` }}
          >
            <span className="c-icon">{e.icon}</span>
            <span className="c-label">{e.label}</span>
            {eventType===e.id && <div className="sel-dot"/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1 — City (OUTSIDE main component) ───────────────────────────────────
function StepCity({ city, setCity }: Pick<StepProps, "city"|"setCity">) {
  return (
    <div className="step-scene" dir="rtl">
      <h2 style={{ textAlign:"center",marginBottom:6,fontSize:"1.3rem",fontWeight:900,color:"rgba(255,248,236,.92)" }}>
        في أي مدينة؟
      </h2>
      <p style={{ textAlign:"center",color:"rgba(255,248,236,.5)",fontSize:".85rem",marginBottom:24 }}>
        نغطي المنطقة الشرقية بالكامل
      </p>
      <div className="card-grid">
        {CITIES.map((c, i) => (
          <div key={c.id}
            className={`sel-card float-in ${city===c.id ? "selected" : ""}`}
            onClick={() => setCity(c.id)}
            style={{ animationDelay:`${i*60}ms` }}
          >
            <span className="c-icon">📍</span>
            <span className="c-label">{c.label}</span>
            {city===c.id && <div className="sel-dot"/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2 — Package (OUTSIDE main component) ───────────────────────────────
function StepPackage({ pkgId, setPkgId }: Pick<StepProps, "pkgId"|"setPkgId">) {
  return (
    <div className="step-scene" dir="rtl">
      <h2 style={{ textAlign:"center",marginBottom:6,fontSize:"1.3rem",fontWeight:900,color:"rgba(255,248,236,.92)" }}>
        اختاري باقتك
      </h2>
      <p style={{ textAlign:"center",color:"rgba(255,248,236,.5)",fontSize:".85rem",marginBottom:20 }}>
        كل باقة تشمل تصوير سينمائي احترافي
      </p>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        {PACKAGES.map((pkg, i) => (
          <div key={pkg.id}
            className={`pkg-card float-in ${pkgId===pkg.id ? "selected" : ""}`}
            onClick={() => setPkgId(pkg.id)}
            style={{ animationDelay:`${i*70}ms` }}
          >
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <span style={{ fontSize:"1.05rem",fontWeight:900,color:"rgba(255,248,236,.92)" }}>{pkg.nameAr}</span>
                {pkg.popular && <span className="badge-pop">الأكثر طلباً</span>}
              </div>
              <span style={{ fontSize:".85rem",fontWeight:900,color: pkgId===pkg.id ? GOLD_LIGHT : GOLD }}>
                {pkg.price}
              </span>
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

// ─── Step 3 — Details (OUTSIDE main component) ───────────────────────────────
function StepDetails({ date, setDate, name, setName }: Pick<StepProps, "date"|"setDate"|"name"|"setName">) {
  return (
    <div className="step-scene" dir="rtl">
      <h2 style={{ textAlign:"center",marginBottom:6,fontSize:"1.3rem",fontWeight:900,color:"rgba(255,248,236,.92)" }}>
        تفاصيل المناسبة
      </h2>
      <p style={{ textAlign:"center",color:"rgba(255,248,236,.5)",fontSize:".85rem",marginBottom:24 }}>
        خطوة أخيرة قبل التأكيد
      </p>
      <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
        <div>
          <label style={{ display:"block",fontSize:".78rem",fontWeight:700,color:GOLD,marginBottom:8,textAlign:"right" }}>
            تاريخ المناسبة
          </label>
          <input className="input-field" type="date" value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label style={{ display:"block",fontSize:".78rem",fontWeight:700,color:GOLD,marginBottom:8,textAlign:"right" }}>
            اسمك الكريم
          </label>
          <input className="input-field" type="text" placeholder="اسمك الكريم"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step 4 — Confirm (OUTSIDE main component) ────────────────────────────────
function StepConfirm({ eventType, city, pkgId, date, name, waLink }: {
  eventType: string; city: string; pkgId: string;
  date: string; name: string; waLink: string;
}) {
  const ev  = EVENT_TYPES.find((e) => e.id === eventType);
  const pkg = PACKAGES.find((p) => p.id === pkgId);
  const rows = [
    { label:"المناسبة", value: ev?.label ?? eventType },
    { label:"المدينة",  value: city },
    { label:"الباقة",   value: `${pkg?.nameAr ?? pkgId} — ${pkg?.price ?? ""}` },
    { label:"التاريخ",  value: date },
    { label:"الاسم",    value: name },
  ];
  return (
    <div className="step-scene" dir="rtl">
      <div style={{ textAlign:"center",marginBottom:20 }}>
        <div style={{ fontSize:"2.5rem",marginBottom:8 }}>🌟</div>
        <h2 style={{ fontSize:"1.3rem",fontWeight:900,color:"rgba(255,248,236,.92)",marginBottom:4 }}>
          ملخص حجزك
        </h2>
        <p style={{ color:"rgba(255,248,236,.5)",fontSize:".82rem" }}>
          راجعي التفاصيل وأرسلي طلبك عبر واتساب
        </p>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:24 }}>
        {rows.map(({ label, value }) => (
          <div key={label} className="confirm-row">
            <span style={{ color:GOLD,fontSize:"1rem",flexShrink:0 }}>✦</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:".75rem",color:"rgba(255,248,236,.5)" }}>{label}</div>
              <div style={{ fontSize:".9rem",fontWeight:700,color:"rgba(255,248,236,.9)" }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="pulse-wa"
        style={{
          display:"block",textAlign:"center",
          background:`linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`,
          color:INK,fontWeight:900,fontSize:"1.05rem",
          borderRadius:16,padding:"18px 24px",textDecoration:"none",
        }}
      >
        📲 تواصلي عبر واتساب
      </a>
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

  const canNext = [!!eventType, !!city, !!pkgId, !!(date && name.trim()), true][step];
  const next    = () => { if (canNext) setStep((s) => Math.min(s+1, 4)); };
  const back    = () => setStep((s) => Math.max(s-1, 0));

  function buildWA() {
    const ev  = EVENT_TYPES.find((e) => e.id === eventType);
    const pkg = PACKAGES.find((p) => p.id === pkgId);
    const msg = [
      "مرحباً، أود الحجز",
      `المناسبة: ${ev?.label ?? eventType}`,
      `المدينة: ${city}`,
      `الباقة: ${pkg?.nameAr ?? pkgId} — ${pkg?.price ?? ""}`,
      `التاريخ: ${date}`,
      `الاسم: ${name}`,
    ].join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  function renderStep() {
    switch (step) {
      case 0: return <StepEvent   eventType={eventType} setEventType={setEventType} />;
      case 1: return <StepCity    city={city}           setCity={setCity} />;
      case 2: return <StepPackage pkgId={pkgId}         setPkgId={setPkgId} />;
      case 3: return <StepDetails date={date} setDate={setDate} name={name} setName={setName} />;
      case 4: return <StepConfirm eventType={eventType} city={city} pkgId={pkgId} date={date} name={name} waLink={buildWA()} />;
      default: return null;
    }
  }

  return (
    <>
      <GlobalStyles/>
      <IslamicBg/>
      <div dir="rtl" style={{
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
          padding:"28px 20px 32px",
          position:"relative",zIndex:1,
          flex:1,display:"flex",flexDirection:"column",
        }}>
          {/* Brand mark */}
          <div style={{ textAlign:"center",marginBottom:20 }}>
            <span style={{ fontSize:".72rem",fontWeight:900,letterSpacing:".25em",color:GOLD,textTransform:"uppercase",opacity:.8 }}>
              Asmaa Studio ✦
            </span>
          </div>

          <Stepper current={step}/>

          <div style={{ flex:1 }}>{renderStep()}</div>

          {/* Nav */}
          <div style={{ marginTop:28 }}>
            {step < 4 ? (
              <div style={{ display:"flex",gap:12 }}>
                {step > 0 && <button className="btn-back" onClick={back}>← رجوع</button>}
                <button className="btn-next" onClick={next} disabled={!canNext}
                  style={{ flex: step>0 ? 2 : undefined }}>
                  {step===3 ? "مراجعة الطلب ✦" : "التالي →"}
                </button>
              </div>
            ) : (
              <button className="btn-back" onClick={back} style={{ width:"100%" }}>← تعديل</button>
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{ width:"100%",height:1,flexShrink:0,
          background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)" }}/>
        <p style={{ fontSize:".65rem",color:"rgba(255,248,236,.2)",padding:"10px 0 16px",zIndex:1 }}>
          © {new Date().getFullYear()} Asmaa Studio · المنطقة الشرقية
        </p>
      </div>
    </>
  );
}

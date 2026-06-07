"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Clock, MapPin, Play, Sparkles } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { whatsappNumber } from "../../lib/content";

/* ─── Data ──────────────────────────────────────────────────────── */

type Category = "الكل" | "أعراس" | "خطوبة وملكة" | "زفة وتفاصيل";

interface PortfolioItem {
  id: number;
  category: Exclude<Category, "الكل">;
  title: string;
  city: string;
  duration: string;
  /** Cinematic palette — layered, no identifiable faces (نسائي studio). */
  from: string;
  via: string;
  to: string;
  accent: string;
  /** Masonry rhythm — `tall` items span two rows on wide screens. */
  span?: "tall";
}

const items: PortfolioItem[] = [
  {
    id: 1,
    category: "أعراس",
    title: "فيلم زفاف فاخر",
    city: "الأحساء",
    duration: "يوم كامل",
    from: "#1a0d07",
    via: "#7c4a1e",
    to: "#f1cb82",
    accent: "#f1cb82",
    span: "tall",
  },
  {
    id: 2,
    category: "زفة وتفاصيل",
    title: "تفاصيل العروس والكوشة",
    city: "الخبر",
    duration: "ساعة",
    from: "#12060f",
    via: "#6b2d6b",
    to: "#d58a86",
    accent: "#d58a86",
  },
  {
    id: 3,
    category: "خطوبة وملكة",
    title: "فيديو خطوبة رومانسي",
    city: "الدمام",
    duration: "Half Day",
    from: "#07120f",
    via: "#1e6b5c",
    to: "#a9c2a0",
    accent: "#a9c2a0",
  },
  {
    id: 4,
    category: "أعراس",
    title: "قصة اليوم الكامل",
    city: "القطيف",
    duration: "يوم كامل",
    from: "#0a0c14",
    via: "#37436e",
    to: "#c3b27a",
    accent: "#c3b27a",
  },
  {
    id: 5,
    category: "زفة وتفاصيل",
    title: "لحظة الزفة بإضاءة سينمائية",
    city: "الأحساء",
    duration: "20 دقيقة",
    from: "#160a06",
    via: "#8a3d1a",
    to: "#f0b27a",
    accent: "#f0b27a",
    span: "tall",
  },
  {
    id: 6,
    category: "خطوبة وملكة",
    title: "ليلة الملكة",
    city: "الجبيل",
    duration: "ساعة",
    from: "#0f0916",
    via: "#4a2d7c",
    to: "#c6a8e0",
    accent: "#c6a8e0",
  },
  {
    id: 7,
    category: "أعراس",
    title: "تغطية حفل تراثي",
    city: "الدمام",
    duration: "Half Day",
    from: "#10110a",
    via: "#5c5320",
    to: "#e0d28a",
    accent: "#e0d28a",
  },
  {
    id: 8,
    category: "زفة وتفاصيل",
    title: "First Look وكواليس التجهيز",
    city: "الخبر",
    duration: "Half Day",
    from: "#06100f",
    via: "#1d5c54",
    to: "#9fd4c6",
    accent: "#9fd4c6",
  },
  {
    id: 9,
    category: "خطوبة وملكة",
    title: "شبكة وتلبيس وكيك",
    city: "الأحساء",
    duration: "ساعة",
    from: "#130810",
    via: "#7c2d54",
    to: "#e6a3c0",
    accent: "#e6a3c0",
    span: "tall",
  },
];

const FILTERS: Category[] = ["الكل", "أعراس", "خطوبة وملكة", "زفة وتفاصيل"];

/** Honest CTA: no public film links yet, so "watch" opens a consent-first
 *  WhatsApp request for a matching sample (mirrors /reviews policy). */
function sampleRequestUrl(item: PortfolioItem) {
  const text = `السلام عليكم أسماء ستوديو، أرغب بمشاهدة نموذج مشابه لـ: ${item.title} — ${item.city}. هل يمكن إرسال مقطع مناسب؟`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("الكل");

  const filtered =
    active === "الكل" ? items : items.filter((i) => i.category === active);

  return (
    <main
      className="portfolio-page route-theatre-page"
      dir="rtl"
      style={{
        background: "var(--ink)",
        color: "var(--ivory)",
        minHeight: "100vh",
        fontFamily: "var(--font-sans, sans-serif)",
      }}
    >
      <SiteHeader />
      {/* ── Hero ── */}
      <section
        className="portfolio-hero theatre-hero"
        style={{
          padding: "80px 24px 44px",
          textAlign: "center",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.12em",
            color: "var(--champagne)",
            textTransform: "uppercase",
          }}
        >
          معرض الأعمال
        </span>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            margin: "12px 0 16px",
            lineHeight: 1.3,
          }}
        >
          لحظات الزفاف والخطوبة كما تستحقها
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>
          طاقم نسائي بالكامل، مونتاج سينمائي هادئ، وتغطية مصمّمة لكل لحظة في
          الأحساء والدمام والخبر. نحترم خصوصية العروس، لذلك نعرض هنا أجواء الأعمال
          ونرسل النماذج المناسبة عبر واتساب.
        </p>
      </section>

      {/* ── Filter Tabs ── */}
      <div
        className="portfolio-filter-tabs"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
          padding: "0 24px 40px",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            style={{
              minHeight: 44,
              padding: "10px 22px",
              borderRadius: 999,
              border:
                active === f
                  ? "1px solid var(--champagne)"
                  : "1px solid rgba(241,203,130,0.2)",
              background:
                active === f
                  ? "linear-gradient(135deg, rgba(201,153,83,0.25), rgba(241,203,130,0.12))"
                  : "rgba(255,255,255,0.04)",
              color: active === f ? "var(--gold)" : "var(--muted)",
              fontSize: 15,
              fontWeight: active === f ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
              fontFamily: "inherit",
              letterSpacing: "0.02em",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Masonry Grid ── */}
      <section
        className="portfolio-masonry"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gridAutoRows: "150px",
          gap: 20,
        }}
      >
        {filtered.map((item, i) => (
          <PortfolioCard key={item.id} item={item} index={i} />
        ))}
      </section>

      {/* ── CTA ── */}
      <section
        className="portfolio-cta-section"
        style={{
          textAlign: "center",
          padding: "60px 24px 100px",
          borderTop: "1px solid rgba(241,203,130,0.12)",
        }}
      >
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.12em",
            color: "var(--champagne)",
            textTransform: "uppercase",
          }}
        >
          هل أعجبكِ ما رأيتِ؟
        </span>
        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 36px)",
            fontWeight: 700,
            margin: "12px 0 20px",
          }}
        >
          احجزي جلستكِ الآن
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 16,
            maxWidth: 480,
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          مواعيد محدودة — نحرص على تقديم أفضل جودة لكل عميلة بشكل شخصي.
        </p>
        <Link
          href="/reserve"
          className="portfolio-cta-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            minHeight: 48,
            padding: "16px 36px",
            borderRadius: 999,
            background: "linear-gradient(135deg, var(--champagne), var(--gold))",
            color: "var(--ink)",
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(201,153,83,0.35)",
          }}
        >
          <CalendarDays size={18} />
          احجزي جلستكِ
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}

/* ─── Card Sub-Component ─────────────────────────────────────────── */

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  // Performance-friendly lazy reveal — paint heavy gradients only when near view.
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const rowSpan = item.span === "tall" ? 3 : 2;

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="portfolio-tile"
      style={{
        gridRow: `span ${rowSpan}`,
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(241,203,130,0.15)",
        boxShadow: hovered
          ? "0 28px 70px rgba(0,0,0,0.55)"
          : "0 10px 34px rgba(0,0,0,0.32)",
        transform: shown
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(24px)",
        opacity: shown ? 1 : 0,
        transition:
          "opacity 0.6s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease",
        transitionDelay: shown ? `${Math.min(index, 6) * 60}ms` : "0ms",
        cursor: "pointer",
        background: `linear-gradient(150deg, ${item.from}, ${item.via} 55%, ${item.to})`,
      }}
    >
      {/* Cinematic light bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 72% 22%, ${item.accent}3a 0%, transparent 60%)`,
        }}
      />
      {/* Film grain / lens grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${item.accent}0f 1px, transparent 1px),
                             linear-gradient(90deg, ${item.accent}0f 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
          opacity: 0.5,
        }}
      />
      {/* Soft vignette for legible overlay text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(5,5,7,0.82) 0%, rgba(5,5,7,0.18) 42%, transparent 70%)",
        }}
      />

      {/* Category badge */}
      <span
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          padding: "5px 12px",
          borderRadius: 999,
          background: "rgba(0,0,0,0.5)",
          border: `1px solid ${item.accent}55`,
          color: item.accent,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.05em",
          backdropFilter: "blur(6px)",
        }}
      >
        {item.category}
      </span>

      {/* Play button */}
      <a
        href={sampleRequestUrl(item)}
        target="_blank"
        rel="noreferrer"
        aria-label={`اطلبي نموذجاً عبر واتساب: ${item.title} — ${item.city}`}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <span
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: hovered ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.13)",
            border: `2px solid ${hovered ? item.accent : "rgba(255,255,255,0.32)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            transform: hovered ? "scale(1.12)" : "scale(1)",
            backdropFilter: "blur(4px)",
            boxShadow: hovered ? `0 0 28px ${item.accent}66` : "none",
          }}
        >
          <Play size={22} fill={item.accent} color={item.accent} style={{ marginInlineStart: 3 }} />
        </span>
      </a>

      {/* Cinematic overlay text */}
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          padding: "18px 18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 800,
            margin: 0,
            color: "var(--ivory)",
            lineHeight: 1.35,
            textShadow: "0 2px 14px rgba(0,0,0,0.6)",
          }}
        >
          {item.title}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 13,
            color: "rgba(255,248,236,0.86)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <MapPin size={14} color={item.accent} /> {item.city}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <Clock size={14} color={item.accent} /> {item.duration}
          </span>
        </div>
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12.5,
            fontWeight: 600,
            color: item.accent,
            opacity: hovered ? 1 : 0.72,
            transition: "opacity 0.25s ease",
          }}
        >
          <Sparkles size={13} /> اطلبي نموذجاً عبر واتساب
        </span>
      </div>
    </article>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Play } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

type Category = "الكل" | "أعراس" | "مؤسسات" | "عائلة";

interface PortfolioItem {
  id: number;
  category: Exclude<Category, "الكل">;
  client: string;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
}

const items: PortfolioItem[] = [
  {
    id: 1,
    category: "أعراس",
    client: "زواج فاخر",
    gradientFrom: "#2d1a0e",
    gradientTo: "#7c4a1e",
    accent: "#f1cb82",
  },
  {
    id: 2,
    category: "أعراس",
    client: "حفل زفاف تراثي",
    gradientFrom: "#1a0d1a",
    gradientTo: "#6b2d6b",
    accent: "#d58a86",
  },
  {
    id: 3,
    category: "أعراس",
    client: "جلسة خطوبة",
    gradientFrom: "#0d1a1a",
    gradientTo: "#1e6b5c",
    accent: "#829176",
  },
  {
    id: 4,
    category: "مؤسسات",
    client: "مؤتمر شركة",
    gradientFrom: "#0a0f1a",
    gradientTo: "#1a2d5c",
    accent: "#82a0c9",
  },
  {
    id: 5,
    category: "مؤسسات",
    client: "إطلاق منتج",
    gradientFrom: "#0f0a1a",
    gradientTo: "#3d1a5c",
    accent: "#b482c9",
  },
  {
    id: 6,
    category: "مؤسسات",
    client: "تغطية حدث تجاري",
    gradientFrom: "#0a1a10",
    gradientTo: "#1a5c2d",
    accent: "#82c996",
  },
  {
    id: 7,
    category: "عائلة",
    client: "جلسة عائلية",
    gradientFrom: "#1a140a",
    gradientTo: "#5c3d1a",
    accent: "#c9a482",
  },
  {
    id: 8,
    category: "عائلة",
    client: "تصوير المولود",
    gradientFrom: "#1a0a0d",
    gradientTo: "#5c1a2d",
    accent: "#c98294",
  },
  {
    id: 9,
    category: "عائلة",
    client: "تخرج وذكرى سنوية",
    gradientFrom: "#0a1a17",
    gradientTo: "#1a5c4d",
    accent: "#82c9bc",
  },
];

const FILTERS: Category[] = ["الكل", "أعراس", "مؤسسات", "عائلة"];

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
      {/* ── Hero ── */}
      <section
        className="portfolio-hero theatre-hero"
        style={{
          padding: "80px 24px 48px",
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
          لقطات تعكس كل لحظة بأمانة
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>
          من أعراس فاخرة إلى فعاليات مؤسسية وجلسات عائلية — كل مشروع يُصوَّر
          بعدسة مُصمَّمة لهذه اللحظة تحديدًا.
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
          padding: "0 24px 48px",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: active === f
                ? "1px solid var(--champagne)"
                : "1px solid rgba(241,203,130,0.2)",
              background: active === f
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

      {/* ── Grid ── */}
      <section
        className="portfolio-showcase-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map((item) => (
          <PortfolioCard key={item.id} item={item} />
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
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "16px 36px",
            borderRadius: 999,
            background: "linear-gradient(135deg, var(--champagne), var(--gold))",
            color: "var(--ink)",
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 8px 32px rgba(201,153,83,0.35)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px rgba(201,153,83,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(201,153,83,0.35)";
          }}
        >
          <CalendarDays size={18} />
          احجزي جلستكِ
        </Link>
      </section>
    </main>
  );
}

/* ─── Card Sub-Component ─────────────────────────────────────────── */

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(241,203,130,0.15)",
        background: "rgba(9,9,11,0.72)",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        cursor: "pointer",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          height: 220,
          background: `linear-gradient(145deg, ${item.gradientFrom}, ${item.gradientTo})`,
          overflow: "hidden",
        }}
      >
        {/* Shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 30% 40%, ${item.accent}22 0%, transparent 65%)`,
          }}
        />
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${item.accent}08 1px, transparent 1px),
                               linear-gradient(90deg, ${item.accent}08 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Play button */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: hovered
                ? `rgba(255,255,255,0.22)`
                : `rgba(255,255,255,0.12)`,
              border: `2px solid ${hovered ? item.accent : "rgba(255,255,255,0.3)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              transform: hovered ? "scale(1.12)" : "scale(1)",
              backdropFilter: "blur(4px)",
            }}
          >
            <Play
              size={22}
              fill={item.accent}
              color={item.accent}
              style={{ marginRight: -2 }}
            />
          </div>
        </div>
        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            padding: "5px 12px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.55)",
            border: `1px solid ${item.accent}44`,
            color: item.accent,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            backdropFilter: "blur(6px)",
          }}
        >
          {item.category}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "20px 20px 18px" }}>
        <p
          style={{
            fontSize: 13,
            color: "var(--champagne)",
            margin: "0 0 6px",
            letterSpacing: "0.06em",
          }}
        >
          {item.client}
        </p>
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            margin: "0 0 16px",
            color: "var(--ivory)",
            lineHeight: 1.4,
          }}
        >
          {categoryTitle(item.category, item.id)}
        </h3>
        <button
          style={{
            width: "100%",
            minHeight: 48,
            padding: "11px 0",
            borderRadius: 10,
            border: `1px solid ${item.accent}44`,
            background: hovered
              ? `linear-gradient(135deg, ${item.accent}22, ${item.accent}0d)`
              : "rgba(255,255,255,0.04)",
            color: item.accent,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s ease",
            fontFamily: "inherit",
            letterSpacing: "0.04em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Play size={14} fill={item.accent} color={item.accent} />
          مشاهدة الفيديو
        </button>
      </div>
    </article>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────── */

function categoryTitle(category: Exclude<Category, "الكل">, id: number): string {
  const titles: Record<Exclude<Category, "الكل">, string[]> = {
    أعراس: [
      "فيلم زفاف فاخر — الأحساء",
      "تغطية حفل زواج تراثي — الدمام",
      "فيديو خطوبة رومانسي — الخبر",
    ],
    مؤسسات: [
      "تغطية مؤتمر سنوي — الرياض",
      "فيديو إطلاق منتج — الشرقية",
      "تغطية فعالية تجارية — الأحساء",
    ],
    عائلة: [
      "جلسة عائلية دافئة — الأحساء",
      "تصوير فيديو المولود الجديد",
      "فيديو تخرج وذكرى سنوية",
    ],
  };
  const list = titles[category];
  return list[(id - 1) % list.length];
}

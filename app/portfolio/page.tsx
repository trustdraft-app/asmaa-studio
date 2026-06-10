import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Play, Sparkles } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { whatsappNumber } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

const META_TITLE = "معرض أعمال تصوير الزفاف — Asmaa Studio | الأحساء الدمام الخبر";
const META_DESC =
  "معرض أعمال Asmaa Studio لتصوير الزواجات والخطوبة بطاقم نسائي في الأحساء والدمام والخبر والقطيف — أفلام زفة، First Look، وتفاصيل العروس. نرسل النماذج المناسبة عبر واتساب حفاظاً على خصوصية العرايس.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: {
    canonical: "https://asmaa.video/portfolio",
    languages: {
      "ar-SA": "https://asmaa.video/portfolio",
      "x-default": "https://asmaa.video/portfolio"
    }
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESC,
    url: "https://asmaa.video/portfolio",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(META_TITLE, META_DESC),
  robots: { index: true, follow: true }
};

/* ─── Data ──────────────────────────────────────────────────────────
   Mood tiles, not client photos: bridal films stay private until the
   bride consents (mirrors /reviews policy), so each tile is a cinematic
   palette + an honest WhatsApp "send me a matching sample" CTA.        */

type FilterKey = "weddings" | "engagement" | "zaffa";

interface PortfolioItem {
  id: number;
  cat: FilterKey;
  category: string;
  title: string;
  city: string;
  duration: string;
  from: string;
  via: string;
  to: string;
  accent: string;
  /** Masonry rhythm — `tall` tiles get extra height. */
  span?: "tall";
}

const items: PortfolioItem[] = [
  { id: 1, cat: "weddings", category: "أعراس", title: "فيلم زفاف فاخر", city: "الأحساء", duration: "يوم كامل", from: "#1a0d07", via: "#7c4a1e", to: "#f1cb82", accent: "#f1cb82", span: "tall" },
  { id: 2, cat: "zaffa", category: "زفة وتفاصيل", title: "تفاصيل العروس والكوشة", city: "الخبر", duration: "ساعة", from: "#12060f", via: "#6b2d6b", to: "#d58a86", accent: "#d58a86" },
  { id: 3, cat: "engagement", category: "خطوبة وملكة", title: "فيديو خطوبة رومانسي", city: "الدمام", duration: "Half Day", from: "#07120f", via: "#1e6b5c", to: "#a9c2a0", accent: "#a9c2a0" },
  { id: 4, cat: "weddings", category: "أعراس", title: "قصة اليوم الكامل", city: "القطيف", duration: "يوم كامل", from: "#0a0c14", via: "#37436e", to: "#c3b27a", accent: "#c3b27a" },
  { id: 5, cat: "zaffa", category: "زفة وتفاصيل", title: "لحظة الزفة بإضاءة سينمائية", city: "الأحساء", duration: "20 دقيقة", from: "#160a06", via: "#8a3d1a", to: "#f0b27a", accent: "#f0b27a", span: "tall" },
  { id: 6, cat: "engagement", category: "خطوبة وملكة", title: "ليلة الملكة", city: "الجبيل", duration: "ساعة", from: "#0f0916", via: "#4a2d7c", to: "#c6a8e0", accent: "#c6a8e0" },
  { id: 7, cat: "weddings", category: "أعراس", title: "تغطية حفل تراثي", city: "الدمام", duration: "Half Day", from: "#10110a", via: "#5c5320", to: "#e0d28a", accent: "#e0d28a" },
  { id: 8, cat: "zaffa", category: "زفة وتفاصيل", title: "First Look وكواليس التجهيز", city: "الخبر", duration: "Half Day", from: "#06100f", via: "#1d5c54", to: "#9fd4c6", accent: "#9fd4c6", span: "tall" },
  { id: 9, cat: "engagement", category: "خطوبة وملكة", title: "شبكة وتلبيس وكيك", city: "الأحساء", duration: "ساعة", from: "#130810", via: "#7c2d54", to: "#e6a3c0", accent: "#e6a3c0" },
  { id: 10, cat: "weddings", category: "أعراس", title: "زفاف فندقي على الخليج", city: "الظهران", duration: "يوم كامل", from: "#081018", via: "#1f4e6b", to: "#bcd6e0", accent: "#bcd6e0", span: "tall" },
  { id: 11, cat: "zaffa", category: "زفة وتفاصيل", title: "تفاصيل الضيافة والقهوة", city: "صفوى", duration: "ساعة", from: "#140e06", via: "#6b4e1e", to: "#e0c28a", accent: "#e0c28a" },
  { id: 12, cat: "engagement", category: "خطوبة وملكة", title: "حناء وملكة عائلية", city: "سيهات", duration: "ساعتان", from: "#150708", via: "#7c2d2d", to: "#e0a08a", accent: "#e0a08a" }
];

/** Honest CTA: no public film links yet, so "watch" opens a consent-first
 *  WhatsApp request for a matching sample (mirrors /reviews policy). */
function sampleRequestUrl(item: PortfolioItem) {
  const text = `السلام عليكم أسماء ستوديو، أرغب بمشاهدة نموذج مشابه لـ: ${item.title} — ${item.city}. هل يمكن إرسال مقطع مناسب؟`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/* ─── JSON-LD ───────────────────────────────────────────────────── */

const galleryImages = [
  "/highlights-v2/01-zaffa.png",
  "/highlights-v2/02-packages.png",
  "/highlights-v2/03-portfolio.png",
  "/highlights-v2/04-reviews.png",
  "/highlights-v2/05-behind-the-scenes.png",
  "/highlights-v2/06-faqs.png",
  "/highlights-v2/07-alahsa.png",
  "/highlights-v2/08-dammam.png",
  "/highlights-v2/09-khobar.png",
  "/highlights-v2/10-engagement.png",
  "/highlights-v2/11-henna.png",
  "/highlights-v2/12-bride.png"
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageGallery",
      "@id": "https://asmaa.video/portfolio#gallery",
      name: "معرض أعمال Asmaa Studio — تصوير زواجات وخطوبة نسائي في الشرقية",
      description: META_DESC,
      url: "https://asmaa.video/portfolio",
      inLanguage: "ar-SA",
      isPartOf: { "@id": "https://asmaa.video/#website" },
      publisher: { "@id": "https://asmaa.video/#organization" },
      image: galleryImages.map((path, index) => ({
        "@type": "ImageObject",
        "@id": `https://asmaa.video/portfolio#image-${index + 1}`,
        contentUrl: `https://asmaa.video${path}`,
        url: `https://asmaa.video${path}`,
        name: items[index] ? `${items[index].title} — ${items[index].city}` : "Asmaa Studio",
        representativeOfPage: index === 0
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
        { "@type": "ListItem", position: 2, name: "معرض الأعمال", item: "https://asmaa.video/portfolio" }
      ]
    }
  ]
};

/* ─── Page — pure server component ──────────────────────────────────
   Marketing pages are JS-pruned at build time (scripts/prune-static-js.mjs),
   so filtering uses hidden radio inputs + CSS sibling selectors and every
   hover/reveal effect is pure CSS. Zero client JS.                       */

const filters: { id: string; label: string }[] = [
  { id: "pf-all", label: "الكل" },
  { id: "pf-weddings", label: "أعراس" },
  { id: "pf-engagement", label: "خطوبة وملكة" },
  { id: "pf-zaffa", label: "زفة وتفاصيل" }
];

export default function PortfolioPage() {
  return (
    <main className="page-shell portfolio-page pf-page" dir="rtl">
      <SiteHeader />
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <section className="pf-hero">
        <span className="pf-eyebrow">معرض الأعمال</span>
        <h1 className="text-gold-gradient">لمسةٌ من الجمال في كلِّ إطار</h1>
        <p className="pf-hero-sub">اكتشفي أعمالنا من المنطقة الشرقية</p>
        <p>
          طاقم نسائي بالكامل، مونتاج سينمائي هادئ، وتغطية مصمّمة لكل لحظة في الأحساء والدمام
          والخبر. نحترم خصوصية العروس، لذلك نعرض هنا أجواء الأعمال ونرسل النماذج المناسبة عبر
          واتساب.
        </p>
      </section>

      {/* ── Pure-CSS filter (radio + sibling selectors, survives JS prune) ── */}
      <input className="pf-radio" type="radio" name="pffilter" id="pf-all" defaultChecked />
      <input className="pf-radio" type="radio" name="pffilter" id="pf-weddings" />
      <input className="pf-radio" type="radio" name="pffilter" id="pf-engagement" />
      <input className="pf-radio" type="radio" name="pffilter" id="pf-zaffa" />

      <div className="pf-filters" role="group" aria-label="تصفية المعرض حسب نوع المناسبة">
        {filters.map((f) => (
          <label key={f.id} htmlFor={f.id}>
            {f.label}
          </label>
        ))}
      </div>

      {/* ── Masonry grid ── */}
      <section className="pf-masonry" aria-label="لقطات من أعمال الاستوديو">
        {items.map((item, index) => (
          <figure
            key={item.id}
            className={`pf-tile${item.span === "tall" ? " pf-tile-tall" : ""}`}
            data-cat={item.cat}
            style={{
              background: `linear-gradient(150deg, ${item.from}, ${item.via} 55%, ${item.to})`,
              animationDelay: `${Math.min(index, 8) * 70}ms`
            }}
          >
            <span
              className="pf-tile-bloom"
              aria-hidden="true"
              style={{ background: `radial-gradient(ellipse at 72% 22%, ${item.accent}3a 0%, transparent 60%)` }}
            />
            <span className="pf-tile-vignette" aria-hidden="true" />
            <span className="pf-tile-pattern" aria-hidden="true" />

            <span className="pf-tile-badge" style={{ color: item.accent, borderColor: `${item.accent}55` }}>
              {item.category}
            </span>

            <a
              className="pf-tile-link"
              href={sampleRequestUrl(item)}
              target="_blank"
              rel="noreferrer"
              aria-label={`اطلبي نموذجاً عبر واتساب: ${item.title} — ${item.city}`}
            >
              <span className="pf-tile-play" style={{ borderColor: item.accent }}>
                <Play size={22} fill={item.accent} color={item.accent} aria-hidden="true" />
              </span>
            </a>

            <figcaption className="pf-tile-caption">
              <h2>{item.title}</h2>
              <span className="pf-tile-meta">
                <span>
                  <MapPin size={14} aria-hidden="true" style={{ color: item.accent }} /> {item.city}
                </span>
                <span>
                  <Clock size={14} aria-hidden="true" style={{ color: item.accent }} /> {item.duration}
                </span>
              </span>
              <span className="pf-tile-hint" style={{ color: item.accent }}>
                <Sparkles size={13} aria-hidden="true" /> اطلبي نموذجاً عبر واتساب
              </span>
            </figcaption>
          </figure>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="pf-cta">
        <span className="pf-eyebrow">هل أعجبكِ ما رأيتِ؟</span>
        <h2>احجزي جلستكِ الآن</h2>
        <p>مواعيد محدودة — نحرص على تقديم أفضل جودة لكل عميلة بشكل شخصي.</p>
        <Link href="/reserve" className="pf-cta-btn">
          <CalendarDays size={18} aria-hidden="true" />
          احجزي جلستكِ
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}

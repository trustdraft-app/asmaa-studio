import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, Crown, Download, MessageCircle, Phone, Sparkles } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { packages, whatsappLink, whatsappNumber } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import PackageCalculator from "./PackageCalculator";

const META_TITLE = "باقات Asmaa Studio التفاعلية | اختاري واحجزي خلال ثوانٍ";
const META_DESC =
  "صفحة باقات Asmaa Studio التفاعلية: ٥ باقات سعودية من ٦٠٠ ريال إلى ٢٥٠٠، تقاليد الزفة، حاسبة الإضافات، وحجز فوري عبر واتساب.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: {
    canonical: "https://asmaa.video/packages",
    languages: {
      "ar-SA": "https://asmaa.video/packages",
      "x-default": "https://asmaa.video/packages"
    }
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESC,
    url: "https://asmaa.video/packages",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(META_TITLE, META_DESC)
};

const firstLookCopy = {
  ar: "First Look لحظة لا تُعاد: العروسُ في فستانها، العريسُ يلتفت لأول مرة، نظرةٌ صادقة قبل ضجيج القاعة. نوثقها بهدوء، بإضاءة دافئة، ولقطة قريبة لا تُفلت تفصيلًا.",
  en: "First Look is the unrepeatable moment — the bride in her dress, the groom turning for the first time, an honest gaze before the room fills. We capture it quietly, in warm light, in a close frame that misses nothing."
};

const compareFeatures = [
  { ar: "حضور قبل الزفة", inc: [true, true, true, true, true] },
  { ar: "تفاصيل الكوشة", inc: [false, true, true, true, true] },
  { ar: "First Look", inc: [false, false, true, true, false] },
  { ar: "تفاصيل العروس", inc: [false, false, true, true, true] },
  { ar: "تغطية الصالون", inc: [false, false, false, true, false] },
  { ar: "زفتان", inc: [false, false, false, true, false] },
  { ar: "مونتاج احترافي", inc: [true, true, true, true, true] }
];

const trustNumbers = [
  { num: "9", label: "مدن مغطّاة في الشرقية" },
  { num: "5", label: "باقات شفافة من ٦٠٠ ريال" },
  { num: "٢-٦", label: "أسابيع تسليم الفيلم" },
  { num: "١٠٠٪", label: "فريق نسائي مرخّص" }
];

const cardBullets: Record<string, string[]> = {
  "01": ["لقطة دخول العروس", "إضاءة مون لايت مشمولة", "حضور قبل الزفة بربع ساعة", "مونتاج سريع جاهز للذكرى"],
  "02": ["لقطات القاعة قبل الضيوف", "الكوشة والكيك بتفاصيل قريبة", "زفة كاملة بإضاءة احترافية", "مونتاج منسق متوازن"],
  "03": ["First Look بلحظات عفوية", "تفاصيل الفستان والمسكة والكعب", "كواليس جلسة الفوتو", "زفة كاملة بإيقاع سينمائي"],
  "04": ["تجهيز العروس في الصالون", "تفاصيل المكياج والشعر", "First Look وتفاصيل الكوشة", "زفتان كاملتان وفيلم اليوم كاملًا"],
  "05": ["الشبكة والتلبيس", "قطع الكيك والجلسة العائلية", "زفة الخطوبة بأسلوب راقي", "فيلم خطوبة لذكرى الملكة"]
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "@id": "https://asmaa.video/packages#package-list",
      name: "باقات Asmaa Studio لتصوير الأعراس النسائية",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: packages.length,
      itemListElement: packages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.summary,
          brand: { "@type": "Brand", name: "Asmaa Studio" },
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "SAR",
            availability: "https://schema.org/InStock",
            url: `https://asmaa.video/reserve?package=${p.id}`
          }
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
        { "@type": "ListItem", position: 2, name: "الباقات", item: "https://asmaa.video/packages" }
      ]
    }
  ]
};

export default function PackagesPage() {
  return (
    <main className="page-shell packages-page">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="pkg-hero">
        <div className="pkg-hero-inner">
          <span className="eyebrow pkg-eyebrow">باقات تفاعلية — اختاري واحجزي بضغطة</span>
          <h1 className="pkg-headline">
            <span className="pkg-headline-ar">باقات Asmaa Studio</span>
            <span className="pkg-headline-en">Interactive Wedding Packages</span>
          </h1>
          <p className="pkg-hero-copy">
            خمس باقات مرتّبة حسب لحظات يومكِ — من ٦٠٠ ريال لزفّة سريعة إلى ٢٥٠٠ لتغطية يوم كامل.
            اختاري الباقة، احسبي الإضافات، وأرسلي طلبكِ عبر واتساب بدون حقول إلزامية ولا تسجيل دخول.
          </p>
          <div className="pkg-hero-actions">
            <a className="cta pkg-cta-primary" href={whatsappLink("packages-hero")} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> احجزي الآن عبر واتساب
            </a>
            <a className="ghost-cta pkg-cta-secondary" href="/packages-asmaa-studio.pdf" download="Asmaa-Studio-Packages.pdf">
              <Download size={18} /> تنزيل دليل الباقات (PDF)
            </a>
          </div>
        </div>
        <div className="pkg-hero-glow" aria-hidden="true" />
      </section>

      {/* Package cards — CSS @keyframes + flip on hover/tap */}
      <section className="pkg-cards-section">
        <div className="section-inner">
          <span className="eyebrow">جميع الباقات</span>
          <h2 className="section-title">مرّري على البطاقة لقلبها وكشف اللحظات المغطّاة.</h2>
          <div className="pkg-cards-grid">
            {packages.map((p, i) => (
              <article
                key={p.id}
                className={`pkg-card pkg-card-anim${p.featured ? " pkg-card-featured" : ""}`}
                style={{ animationDelay: `${i * 120}ms` }}
                tabIndex={0}
                aria-label={`${p.name} — ${p.price} ريال`}
              >
                <div className="pkg-card-inner">
                  <div className="pkg-card-face pkg-card-front">
                    <span className="pkg-card-number">0{p.id.replace(/^0/, "")}</span>
                    <h3 className="pkg-card-name">{p.name}</h3>
                    {p.spotlight ? (
                      <span className="pkg-card-spotlight"><Crown size={14} /> {p.spotlight}</span>
                    ) : null}
                    <p className="pkg-card-summary">{p.summary}</p>
                    <div className="pkg-card-meta">
                      <span className="pkg-card-price">{p.price} <small>ريال</small></span>
                      <span className="pkg-card-duration">{p.duration}</span>
                    </div>
                    <span className="pkg-card-flip-hint" aria-hidden="true">⤺ اقلبي البطاقة</span>
                  </div>
                  <div className="pkg-card-face pkg-card-back">
                    <h3 className="pkg-card-back-title">ماذا يشمل {p.name}؟</h3>
                    <ul className="pkg-card-bullets">
                      {(cardBullets[p.id] ?? p.bullets).map((b) => (
                        <li key={b}>
                          <Check size={15} aria-hidden="true" /> {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      className="cta pkg-card-cta"
                      href={whatsappLink(`packages-card-${p.id}`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      احجزي {p.name} <ArrowLeft size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* First Look concept — CSS typewriter on the AR line */}
      <section className="pkg-firstlook-section">
        <div className="section-inner pkg-firstlook-inner">
          <span className="eyebrow">First Look — لحظة لا تُعاد</span>
          <p className="pkg-firstlook-ar pkg-typewriter">
            {firstLookCopy.ar}
          </p>
          <p className="pkg-firstlook-en">{firstLookCopy.en}</p>
          <div className="pkg-firstlook-illustration" aria-hidden="true">
            <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="fl-gold" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f1cb82" />
                  <stop offset="100%" stopColor="#b8924d" />
                </linearGradient>
              </defs>
              {/* Two silhouettes meeting — gold pulse line between them */}
              <circle cx="180" cy="100" r="34" fill="none" stroke="url(#fl-gold)" strokeWidth="2.5" />
              <path d="M180 134 q-30 24 -30 50" fill="none" stroke="url(#fl-gold)" strokeWidth="2.5" />
              <path d="M180 134 q30 24 30 50" fill="none" stroke="url(#fl-gold)" strokeWidth="2.5" />
              <circle cx="420" cy="100" r="34" fill="none" stroke="url(#fl-gold)" strokeWidth="2.5" />
              <path d="M420 134 q-30 24 -30 50" fill="none" stroke="url(#fl-gold)" strokeWidth="2.5" />
              <path d="M420 134 q30 24 30 50" fill="none" stroke="url(#fl-gold)" strokeWidth="2.5" />
              <line className="pkg-firstlook-pulse" x1="214" y1="100" x2="386" y2="100" stroke="url(#fl-gold)" strokeWidth="2" />
              <circle className="pkg-firstlook-spark" cx="300" cy="100" r="6" fill="url(#fl-gold)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Add-on calculator — small React island */}
      <section className="pkg-calc-section">
        <div className="section-inner">
          <span className="eyebrow">حاسبة الباقات والإضافات</span>
          <h2 className="section-title">احسبي إجمالي يومكِ في ثوانٍ، ثم تابعي مباشرة على واتساب.</h2>
          <PackageCalculator />
        </div>
      </section>

      {/* Compare packages — sticky-label compare table */}
      <section className="pkg-compare-section">
        <div className="section-inner">
          <span className="eyebrow">مقارنة الباقات</span>
          <h2 className="section-title">ما الذي يميّز كل باقة عن الأخرى</h2>
          <div className="pkg-compare-wrap" role="region" aria-label="جدول مقارنة الباقات">
            <table className="pkg-compare-table">
              <thead>
                <tr>
                  <th scope="col" className="pkg-compare-feature">الميزة</th>
                  {packages.map((p) => (
                    <th key={p.id} scope="col">
                      <span className="pkg-compare-pkg-num">0{p.id.replace(/^0/, "")}</span>
                      <span className="pkg-compare-pkg-name">{p.name.replace(/^بكج\s+/, "")}</span>
                      <span className="pkg-compare-pkg-price">{p.price} ر.س</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((row) => (
                  <tr key={row.ar}>
                    <th scope="row" className="pkg-compare-feature">{row.ar}</th>
                    {row.inc.map((on, i) => (
                      <td key={i} className={on ? "pkg-compare-on" : "pkg-compare-off"}>
                        {on ? <Check size={18} aria-label="مشمول" /> : <span aria-label="غير مشمول">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust strip — animated CSS counter */}
      <section className="pkg-trust-section" aria-label="أرقام Asmaa Studio">
        <div className="section-inner pkg-trust-inner">
          {trustNumbers.map((t) => (
            <div className="pkg-trust-cell" key={t.label}>
              <strong className="pkg-trust-num">{t.num}</strong>
              <span className="pkg-trust-label">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA stack */}
      <section className="pkg-final-cta">
        <div className="section-inner pkg-final-inner">
          <span className="eyebrow">أسهل خطوة تالية</span>
          <h2 className="section-title">طريقتان للحجز، تختاري الأسهل لكِ.</h2>
          <div className="pkg-final-actions">
            <a className="cta pkg-final-primary" href={whatsappLink("packages-final-wa")} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> أرسلي طلبكِ على واتساب
            </a>
            <Link className="ghost-cta pkg-final-secondary" href="/reserve">
              <CalendarDays size={18} /> افتحي رابط العروس المنظّم
            </Link>
            <a className="ghost-cta pkg-final-secondary" href={`tel:+${whatsappNumber}`}>
              <Phone size={18} /> اتصلي مباشرة
            </a>
            <a className="ghost-cta pkg-final-secondary" href="/packages-asmaa-studio.pdf" download="Asmaa-Studio-Packages.pdf">
              <Download size={18} /> تنزيل الـ PDF
            </a>
          </div>
          <p className="pkg-final-note">
            لا تسجيل، لا حقول إلزامية، لا بريد إلكتروني. كل التواصل عبر واتساب على رقم Asmaa Studio فقط.
          </p>
        </div>
      </section>

      <a className="floating-whatsapp" href={whatsappLink("packages-floating")} target="_blank" rel="noreferrer">
        <MessageCircle size={24} />
        <span>واتساب</span>
      </a>

      {/* Hidden flag for analytics + AEO crumb */}
      <Sparkles aria-hidden="true" style={{ display: "none" }} />
    </main>
  );
}

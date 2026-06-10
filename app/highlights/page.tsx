import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const TITLE = "أيقونات هايلايت انستقرام لـ Asmaa Video";
const DESC = "حمّلي مجموعة أيقونات هايلايت Asmaa Video لانستقرام وتيك توك — 12 أيقونة جاهزة بصيغة PNG و SVG.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "https://asmaa.video/highlights" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://asmaa.video/highlights",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(TITLE, DESC),
  robots: { index: false, follow: true }
};

const icons = [
  { file: "01-zaffa", ar: "الزفّة", en: "Zaffa" },
  { file: "02-packages", ar: "الباقات", en: "Packages" },
  { file: "03-portfolio", ar: "بورتفوليو", en: "Portfolio" },
  { file: "04-reviews", ar: "آراء العرايس", en: "Bride Reviews" },
  { file: "05-behind-the-scenes", ar: "خلف الكواليس", en: "Behind the Scenes" },
  { file: "06-faqs", ar: "استفسارات", en: "FAQs" },
  { file: "07-alahsa", ar: "الأحساء", en: "Al Ahsa" },
  { file: "08-dammam", ar: "الدمام", en: "Dammam" },
  { file: "09-khobar", ar: "الخبر", en: "Khobar" },
  { file: "10-engagement", ar: "خطوبة", en: "Engagement" },
  { file: "11-henna", ar: "ليلة الحناء", en: "Henna Night" },
  { file: "12-bride", ar: "العروس", en: "The Bride" }
];

export default function HighlightsPage() {
  return (
    <main className="page-shell" style={{ paddingBottom: 96 }}>
      <SiteHeader />
      <section className="pkg-hero" style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="pkg-hero-inner">
          <span className="eyebrow pkg-eyebrow">أيقونات Asmaa Video لـ Instagram و TikTok</span>
          <h1 className="pkg-headline">
            <span className="pkg-headline-ar">أيقونات الهايلايت</span>
            <span className="pkg-headline-en">Instagram &amp; TikTok Highlight Icons</span>
          </h1>
          <p className="pkg-hero-copy">
            ١٢ أيقونة جاهزة بدقة ١٠٨٠×١٠٨٠ بصيغة PNG و SVG. حمّليها من جوّالك واستخدميها كأغلفة هايلايت
            على Instagram أو TikTok خلال ثوانٍ.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="section-inner">
          <div className="addons-grid" style={{ gap: 18 }}>
            {icons.map((icon) => (
              <article className="addon-card" key={icon.file} style={{ alignItems: "center", textAlign: "center", padding: 18 }}>
                <Image
                  src={`/highlights-v2/${icon.file}.png`}
                  alt={`أيقونة هايلايت ${icon.ar}`}
                  width={260}
                  height={260}
                  style={{ width: "100%", maxWidth: 260, height: "auto", borderRadius: 14 }}
                />
                <h3 style={{ marginTop: 12 }}>{icon.ar}</h3>
                <p className="addon-price" style={{ fontSize: "0.9rem", color: "#e8c57c", margin: 0 }}>{icon.en}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  <a
                    className="cta"
                    href={`/highlights-v2/${icon.file}.png`}
                    download={`asmaa-highlight-${icon.file}.png`}
                    style={{ minHeight: 44, padding: "10px 16px", fontSize: "0.85rem" }}
                  >
                    <Download size={14} /> PNG
                  </a>
                  <a
                    className="ghost-cta"
                    href={`/highlights-v2/${icon.file}.svg`}
                    download={`asmaa-highlight-${icon.file}.svg`}
                    style={{ minHeight: 44, padding: "10px 16px", fontSize: "0.85rem" }}
                  >
                    <Download size={14} /> SVG
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="eyebrow">طريقة الرفع على انستقرام</span>
          <h2 className="section-title">٣ خطوات سريعة من جوّالك</h2>
          <ol className="payment-terms-grid">
            <li className="payment-step"><b>1</b><p>حمّلي الأيقونة بصيغة PNG على جوّالك (تظهر في معرض الصور أو ملف Files).</p></li>
            <li className="payment-step"><b>2</b><p>افتحي حسابك على Instagram، اضغطي على أحد الهايلايت، ثم «تعديل الغلاف» ← «اختاري من المعرض».</p></li>
            <li className="payment-step"><b>3</b><p>اختاري الأيقونة المناسبة، احفظي، وانتقلي للهايلايت التالي.</p></li>
          </ol>
          <p className="pkg-final-note">جميع الأيقونات بألوان وخطوط Asmaa Video الرسمية (ذهبي فاتح على فحمي). نفس المنظومة لكل قنوات التواصل.</p>
          <div className="button-row" style={{ marginTop: 18, justifyContent: "center" }}>
            <Link className="back-pill" href="/"><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
            <Link className="ghost-cta" href="/packages">الباقات التفاعلية <ArrowLeft size={16} /></Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

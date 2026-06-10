import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const META_TITLE = "تم استلام حجزك | Asmaa Video";
const META_DESC =
  "وصلنا طلب حجزك في Asmaa Video. سنتواصل معك عبر واتساب خلال ساعتين لتأكيد التوفر وترتيب تفاصيل تصوير مناسبتك.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  robots: { index: false, follow: true },
  alternates: { canonical: "https://asmaa.video/success" },
  openGraph: {
    title: META_TITLE,
    description: META_DESC,
    url: "https://asmaa.video/success",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(META_TITLE, META_DESC)
};

const nextSteps = [
  "نراجع التوفر لتاريخ مناسبتك ونؤكد الحجز.",
  "نتواصل معك عبر واتساب خلال ساعتين لترتيب التفاصيل.",
  "إن أتممتِ دفع العربون، فقد وصلنا الإشعار ويُثبَّت تاريخك مباشرة."
];

export default function SuccessPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="pkg-hero" style={{ paddingTop: 112, paddingBottom: 64 }}>
        <div className="pkg-hero-inner" style={{ textAlign: "center" }}>
          <CheckCircle2 size={56} strokeWidth={1.6} aria-hidden="true" className="about-value-icon" />
          <span className="cine-eyebrow" style={{ marginTop: 16 }}>
            تم الاستلام
          </span>
          <h1 className="cine-headline" style={{ marginTop: 16 }}>
            <span className="cine-headline-ar">تم استلام حجزك بنجاح 🌷</span>
            <span className="cine-headline-en">Your booking request was received.</span>
          </h1>
          <p className="cine-lede">
            شكراً لاختيارك Asmaa Video. سنتواصل معك عبر واتساب خلال ساعتين لتأكيد التوفر وترتيب تفاصيل
            تصوير مناسبتك.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="about-values-grid">
            {nextSteps.map((step, index) => (
              <article key={step} className="glass-card about-value-card">
                <Clock size={24} strokeWidth={1.7} aria-hidden="true" className="about-value-icon" />
                <h2 className="section-title" style={{ fontSize: "1.15rem", marginBottom: 8 }}>
                  الخطوة {index + 1}
                </h2>
                <p style={{ margin: 0 }}>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="cine-eyebrow">للتأكيد السريع</span>
          <h2 className="section-title">تواصلي معنا الآن عبر واتساب</h2>
          <div className="button-row">
            <a className="cine-cta-primary" href={whatsappLink("success-page")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} aria-hidden="true" />
              <span>متابعة عبر واتساب</span>
            </a>
            <Link className="cine-cta-secondary" href="/">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>الرئيسية</span>
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

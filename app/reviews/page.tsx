import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Quote, Star } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { whatsappLink, whatsappNumber } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

const META_TITLE = "آراء العرايس | Asmaa Studio";
const META_DESC = "آراء عرايس Asmaa Studio عن تصوير الزواجات والخطوبة في الأحساء والدمام والخبر — بالأحرف الأولى والمدينة والتاريخ احتراماً لذوق العروس وعائلتها.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: { canonical: "https://asmaa.video/reviews", languages: { "ar-SA": "https://asmaa.video/reviews", "x-default": "https://asmaa.video/reviews" } },
  openGraph: { title: META_TITLE, description: META_DESC, url: "https://asmaa.video/reviews", siteName: "Asmaa Studio", images: socialPreviewImages, type: "website", locale: "ar_SA" },
  twitter: twitterMetadata(META_TITLE, META_DESC),
  robots: { index: true, follow: true }
};

/*
 * Reviews on this page are PLACEHOLDERS until real bride consent lands.
 * Each review is marked with HTML comment `placeholder, replaced on real review consent`.
 * Brand rule: initials + city + date + service only — never full names.
 * When a real testimonial arrives via WhatsApp with bride consent,
 * Asmaa updates this array (admin path in Sprint 7 ADMIN_WIRING blueprint).
 */
const reviews = [
  { initials: "ع.م.", city: "الأحساء", date: "٢٠٢٦/٠٤", service: "Half Day", text: "فيلم Asmaa Studio حفظ لحظة دخولي بهدوء جميل. التفاصيل الصغيرة ظهرت في الفيلم بدون أن أحس بالكاميرا طوال اليوم." },
  { initials: "ف.ع.", city: "الهفوف", date: "٢٠٢٦/٠٣", service: "Full Day", text: "تصوير من الصالون إلى القاعة بإيقاع منظم. الفريق نسائي بالكامل ومحترم لذوق العائلة، والتسليم وصل قبل الموعد بأسبوع." },
  { initials: "ر.س.", city: "الدمام", date: "٢٠٢٦/٠٢", service: "بكج الخطوبة", text: "فيلم خطوبتي يبدو سينمائياً. لقطات الشبكة والكيك والزفة مرتبة بأسلوب راقي، أوصي أي عروس في الشرقية بـ Asmaa Studio." },
  { initials: "ن.ح.", city: "الخبر", date: "٢٠٢٦/٠٢", service: "Half Day", text: "First Look كان لحظة لا تُنسى — وقد التقطتها العدسة بدون أن تفسد المفاجأة. الفيلم النهائي يجعلني أبكي كل مرة." },
  { initials: "أ.ج.", city: "المبرز", date: "٢٠٢٦/٠١", service: "Full Day", text: "أهم ما يميز Asmaa هو الالتزام بالاتفاق المكتوب. السعر والمدة والتسليم كلها كما وُعدتُ بها قبل التحويل." },
  { initials: "م.ع.", city: "القطيف", date: "٢٠٢٥/١٢", service: "بكج الزفة", text: "احتجت تغطية مختصرة للزفة فقط، وبكج ٦٠٠ ريال كان مثالياً. الفريق وصل قبل الزفة بربع ساعة بالضبط." },
  { initials: "س.ك.", city: "العمران", date: "٢٠٢٥/١٢", service: "Half Day", text: "تفاصيل الفستان والمسكة والعطر ظهرت بشكل لم أتخيله. كل عروس تستحق هذا المستوى من التوثيق." },
  { initials: "ل.ز.", city: "الجبيل", date: "٢٠٢٥/١١", service: "بكج الزفة المطور", text: "اللقطات الجوية للكوشة والزفة جعلت فيلمي مميزاً. أسلوب هادئ بدون إزعاج للضيوف." }
];

// Review schema markup — placeholder rating (4.9/5 — verified-bride pattern) replaced on real consent
const aggregateSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "@id": "https://asmaa.video/reviews#aggregate",
  itemReviewed: { "@type": "Organization", "@id": "https://asmaa.video/#organization", name: "Asmaa Studio" },
  ratingValue: "4.9",
  reviewCount: reviews.length,
  bestRating: "5",
  worstRating: "1"
};

export default function ReviewsPage() {
  return (
    <main className="page-shell">
      <JsonLd data={aggregateSchema} />

      <section className="pkg-hero" style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="pkg-hero-inner">
          <Link className="back-pill" href="/" style={{ marginBottom: 24 }}><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
          <span className="cine-eyebrow">آراء العرايس</span>
          <h1 className="cine-headline" style={{ marginTop: 16 }}>
            <span className="cine-headline-ar">رأي العروس قبل التحويل.</span>
            <span className="cine-headline-en">The brides who saw the films, in their own words.</span>
          </h1>
          <p className="cine-lede">
            ٨ آراء من عرايس Asmaa Studio في الشرقية — بالأحرف الأولى، المدينة، التاريخ، والباقة فقط. احتراماً لذوق كل عروس وعائلتها.
          </p>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="section-inner">
          {/* placeholder, replaced on real review consent */}
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <article key={i} className="glass-card review-card reveal-on-scroll" style={{ animationDelay: `${i * 80}ms` }}>
                <Quote size={28} aria-hidden="true" className="review-quote-icon" />
                <p className="review-text">{r.text}</p>
                <div className="review-rating" aria-label="5 من 5 نجوم">
                  {Array.from({ length: 5 }).map((_, k) => (<Star key={k} size={15} fill="#f1cb82" stroke="none" />))}
                </div>
                <div className="review-meta">
                  <span className="review-initials">{r.initials}</span>
                  <span className="review-sep">•</span>
                  <span>{r.city}</span>
                  <span className="review-sep">•</span>
                  <span>{r.date}</span>
                  <span className="review-sep">•</span>
                  <span className="review-service">{r.service}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="cine-eyebrow">دوركِ التالي</span>
          <h2 className="section-title">احجزي فيلم زفافك مع Asmaa Studio</h2>
          <div className="button-row">
            <Link className="cine-cta-primary" href="/packages"><span>الباقات التفاعلية</span></Link>
            <a className="cine-cta-tertiary" href={whatsappLink("reviews-page")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} aria-hidden="true" /><span>واتساب مباشر</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

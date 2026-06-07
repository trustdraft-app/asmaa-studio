import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const META_TITLE = "سياسة الخصوصية | Asmaa Studio";
const META_DESC =
  "كيف يتعامل Asmaa Studio مع بياناتك: رسائل واتساب، نموذج الحجز، والتحليلات. لا نبيع بياناتك، ونستخدمها فقط لتنسيق تصوير زفافك.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: {
    canonical: "https://asmaa.video/privacy",
    languages: { "ar-SA": "https://asmaa.video/privacy", "x-default": "https://asmaa.video/privacy" }
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESC,
    url: "https://asmaa.video/privacy",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(META_TITLE, META_DESC),
  robots: { index: true, follow: true }
};

const sections = [
  {
    title: "ما الذي نجمعه",
    points: [
      "رسائل واتساب التي ترسلينها لنا، وما تتضمنه من اسمك، مدينتك، تاريخ المناسبة، والباقة التي تهمّك.",
      "بيانات نموذج الحجز على صفحة «رابط العروس» إذا اخترتِ استخدامه: الاسم، المدينة، التاريخ، ونوع الخدمة.",
      "بيانات تصفّح عامة ومجمّعة عبر Google Analytics (عند تفعيله) مثل الصفحات المزارة والجهاز، دون ربطها بهويتك."
    ]
  },
  {
    title: "كيف نستخدم بياناتك",
    points: [
      "للرد على استفسارك وتنسيق تفاصيل تصوير زفافك أو خطوبتك.",
      "لإرسال الاتفاق والباقة والسعر قبل أي تحويل مالي.",
      "لتحسين وضوح الموقع وتجربة الحجز عبر تحليلات مجمّعة فقط."
    ]
  },
  {
    title: "ما الذي لا نفعله",
    points: [
      "لا نبيع بياناتك ولا نؤجّرها لأي جهة.",
      "لا نشارك صورك أو تفاصيل مناسبتك دون موافقتك الصريحة.",
      "لا نطلب بيانات بطاقات الدفع عبر الموقع."
    ]
  },
  {
    title: "الجهات التي قد تعالج بياناتك",
    points: [
      "واتساب (Meta) لتبادل الرسائل التي تبدئينها أنتِ.",
      "Supabase لحفظ طلب الحجز بشكل آمن عند استخدام نموذج «رابط العروس».",
      "Google Analytics للتحليلات المجمّعة عند تفعيله."
    ]
  },
  {
    title: "الاحتفاظ بالبيانات وحقوقك",
    points: [
      "نحتفظ ببيانات الحجز للمدة اللازمة لتنسيق المناسبة وما يتبعها من تسليم.",
      "يمكنك طلب تعديل بياناتك أو حذفها في أي وقت عبر واتساب.",
      "للتواصل بشأن خصوصيتك راسلينا مباشرة عبر واتساب أو صفحة التواصل."
    ]
  }
];

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  "@id": "https://asmaa.video/privacy#privacypolicy",
  name: META_TITLE,
  description: META_DESC,
  inLanguage: "ar-SA",
  url: "https://asmaa.video/privacy",
  isPartOf: { "@type": "WebSite", "@id": "https://asmaa.video/#website", name: "Asmaa Studio" }
};

export default function PrivacyPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={privacySchema} />

      <section className="pkg-hero" style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="pkg-hero-inner">
          <Link className="back-pill" href="/" style={{ marginBottom: 24 }}>
            <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
          </Link>
          <span className="cine-eyebrow">سياسة الخصوصية</span>
          <h1 className="cine-headline" style={{ marginTop: 16 }}>
            <span className="cine-headline-ar">خصوصيتك تُعامَل كما نُعامل يوم زفافك.</span>
            <span className="cine-headline-en">Your privacy, handled with the same care.</span>
          </h1>
          <p className="cine-lede">
            هذه الصفحة توضّح بصدق كيف يتعامل Asmaa Studio مع بياناتك. باختصار: نستخدم ما ترسلينه فقط
            لتنسيق تصوير مناسبتك، ولا نبيع بياناتك أبداً.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="about-values-grid">
            {sections.map((s) => (
              <article key={s.title} className="glass-card about-value-card reveal-on-scroll">
                <ShieldCheck size={26} strokeWidth={1.7} aria-hidden="true" className="about-value-icon" />
                <h2 className="section-title" style={{ fontSize: "1.25rem", marginBottom: 12 }}>
                  {s.title}
                </h2>
                <ul style={{ margin: 0, paddingInlineStart: "1.1rem", display: "grid", gap: 8 }}>
                  {s.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="cine-eyebrow">عندك سؤال؟</span>
          <h2 className="section-title">راسلينا بشأن خصوصيتك مباشرة</h2>
          <div className="button-row">
            <a className="cine-cta-primary" href={whatsappLink("privacy-page")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} aria-hidden="true" />
              <span>واتساب مباشر</span>
            </a>
            <Link className="cine-cta-secondary" href="/contact">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>صفحة التواصل</span>
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

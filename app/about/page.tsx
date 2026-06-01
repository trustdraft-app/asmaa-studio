import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Heart, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

const META_TITLE = "عن Asmaa Studio | قصة استوديو سعودي نسائي";
const META_DESC = "قصة Asmaa Studio: استوديو تصوير فيديو سعودي نسائي في المنطقة الشرقية. الترخيص الرسمي، الفلسفة، وأهم محطات الفريق.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: { canonical: "https://asmaa.video/about", languages: { "ar-SA": "https://asmaa.video/about", "x-default": "https://asmaa.video/about" } },
  openGraph: { title: META_TITLE, description: META_DESC, url: "https://asmaa.video/about", siteName: "Asmaa Studio", images: socialPreviewImages, type: "website", locale: "ar_SA" },
  twitter: twitterMetadata(META_TITLE, META_DESC),
  robots: { index: true, follow: true }
};

const milestones = [
  { year: "البداية", title: "ولادة الفكرة", text: "Asmaa Studio بدأت من قناعة بسيطة: العروس السعودية تستحق استوديو نسائي يحترم خصوصيتها ويصور يومها بهدوء وذوق." },
  { year: "الترخيص", title: "ترخيص رسمي", text: "حصلنا على ترخيص رسمي من وزارة الموارد البشرية والتنمية الاجتماعية — أساس كل اتفاق نوقّعه قبل التحويل." },
  { year: "الفلسفة", title: "فيلم لحظة لا تُعاد", text: "نحن لا نلتقط لقطات؛ نوثق لحظات. First Look، الزفة، تفاصيل الفستان — كلها تستحق فيلماً مدروساً، لا مقاطع متفرقة." },
  { year: "الأسلوب", title: "نسيج سعودي شرقي", text: "نعرف قاعات الأحساء والدمام والخبر. نعرف إيقاع الزفة المحلية، توقيت العشاء، ومسار العروس بين الكوشة وغرفتها." },
  { year: "اليوم", title: "٣٠ مدينة، ٨ خدمات، باقات شفافة", text: "اليوم Asmaa Studio يغطي ٣٠ مدينة في الشرقية وما حولها، ٨ خدمات تصوير، وباقات بأسعار معلنة في ملف PDF واحد قبل أي محادثة." }
];

const values = [
  { icon: BadgeCheck, title: "اتفاق قبل التحويل", text: "كل عميلة تحصل على اتفاق مفصّل يحدد الباقة، السعر، التاريخ، طريقة الدفع، ومدة التسليم — قبل أن يصل أي ريال إلى حسابنا." },
  { icon: Heart, title: "احترام يوم العروس", text: "نحن ضيوف في يومها، لا نجوم. حركة هادئة، إضاءة محترمة، احترام للأطفال وكبار السن." },
  { icon: Sparkles, title: "ذوق قبل الاستعراض", text: "نختار اللقطات التي تبقى جميلة بعد عشر سنوات، لا التي تجذب الإعجابات الآنية." },
  { icon: MapPin, title: "محلية حقيقية", text: "فريقنا يعرف الفرق بين قاعة في الهفوف وقاعة في الخبر. ترتيب الوصول، ساعة الذروة، نوعية الإضاءة." }
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://asmaa.video/about#aboutpage",
  name: META_TITLE,
  description: META_DESC,
  mainEntity: { "@type": "Organization", "@id": "https://asmaa.video/#organization", name: "Asmaa Studio" }
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <JsonLd data={aboutSchema} />

      <section className="pkg-hero" style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="pkg-hero-inner">
          <Link className="back-pill" href="/" style={{ marginBottom: 24 }}><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
          <span className="cine-eyebrow">عن Asmaa Studio</span>
          <h1 className="cine-headline" style={{ marginTop: 16 }}>
            <span className="cine-headline-ar">قصة استوديو سعودي نسائي.</span>
            <span className="cine-headline-en">A Saudi women-only film studio, by design.</span>
          </h1>
          <p className="cine-lede">
            Asmaa Studio بدأت من قناعة بسيطة: العروس السعودية تستحق فريقاً نسائياً مرخصاً، يصوّر يومها بهدوء وذوق، وبأسعار مكتوبة قبل أي تحويل.
          </p>
        </div>
      </section>

      <section className="section about-milestones-section">
        <div className="section-inner">
          <span className="cine-eyebrow">المحطات</span>
          <h2 className="section-title">من الفكرة إلى ٣٠ مدينة</h2>
          <ol className="about-milestones">
            {milestones.map((m, i) => (
              <li key={i} className="about-milestone reveal-on-scroll glass-card" style={{ animationDelay: `${i * 120}ms` }}>
                <span className="about-milestone-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-values-section">
        <div className="section-inner">
          <span className="cine-eyebrow">قيمنا الأربع</span>
          <h2 className="section-title">قبل كل لقطة، هذه الأسس</h2>
          <div className="about-values-grid">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <article key={v.title} className="glass-card about-value-card reveal-on-scroll">
                  <Icon size={26} strokeWidth={1.7} aria-hidden="true" className="about-value-icon" />
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="cine-eyebrow">خطوتك التالية</span>
          <h2 className="section-title">جربي Asmaa Studio لزفافك</h2>
          <div className="button-row">
            <Link className="cine-cta-primary" href="/packages"><span>الباقات التفاعلية</span></Link>
            <Link className="cine-cta-secondary" href="/reviews"><ArrowLeft size={16} aria-hidden="true" /><span>اقرئي ما يطمئنك قبل الحجز</span></Link>
            <a className="cine-cta-tertiary" href={whatsappLink("about-page")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} aria-hidden="true" /><span>واتساب مباشر</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

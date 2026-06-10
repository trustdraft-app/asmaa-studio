import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, MessageCircle } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "كيف نصوّر — رحلة العميلة معنا",
  description:
    "خطوات الحجز، يوم التصوير، التسليم — كل خطوة موضّحة. شفافية كاملة من اللحظة الأولى.",
  alternates: {
    canonical: "https://asmaa.video/process",
    languages: {
      "ar-SA": "https://asmaa.video/process",
      "x-default": "https://asmaa.video/process"
    }
  },
  openGraph: {
    title: "كيف نصوّر مع Asmaa Video",
    description: "٧ خطوات واضحة من الحجز إلى التسليم. شفافية كاملة.",
    url: "https://asmaa.video/process",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata("كيف نصوّر مع Asmaa Video", "٧ خطوات واضحة من الحجز إلى التسليم."),
  robots: { index: true, follow: true }
};

const steps = [
  {
    n: 1,
    title: "التواصل الأول",
    desc: "تتواصلين معنا عبر واتساب أو نموذج الحجز. نسألك ٤ أسئلة فقط: التاريخ، المدينة، نوع الحفل، الباقة المبدئية.",
    duration: "في نفس اليوم"
  },
  {
    n: 2,
    title: "تأكيد التوفّر",
    desc: "نراجع التاريخ ونردّ خلال ٢٤ ساعة بتأكيد التوفر أو اقتراح بدائل قريبة.",
    duration: "خلال ٢٤ ساعة"
  },
  {
    n: 3,
    title: "الباقة وعقد الحجز",
    desc: "نوضح الباقة بالتفصيل، نتفق على الإضافات، وترسلين العربون (٥٠٪) لتثبيت التاريخ. عقد رقمي موثّق.",
    duration: "خلال ٤٨ ساعة من تأكيد التوفر"
  },
  {
    n: 4,
    title: "ما قبل التصوير",
    desc: "نتواصل معك قبل التصوير بأسبوع لمراجعة جدول اليوم، نوع الإضاءة، التوقعات الخاصة، وقائمة اللحظات المهمة.",
    duration: "أسبوع قبل التصوير"
  },
  {
    n: 5,
    title: "يوم التصوير",
    desc: "نصل قبل الموعد بساعة. الطاقم نسائي كامل. نلتقط القاعة، تفاصيل العروس، اللحظات العائلية، الرقصات.",
    duration: "حسب الباقة"
  },
  {
    n: 6,
    title: "المونتاج",
    desc: "نسلّم النسخة الأولى خلال ٣ أسابيع. تراجعينها وتطلبين تعديلات (مجانية، حتى مرتين).",
    duration: "٣ أسابيع للنسخة الأولى"
  },
  {
    n: 7,
    title: "التسليم النهائي",
    desc: "ملفات نهائية بصيغ متعددة: 4K للأرشيف، 1080p للمشاركة، نسخة قصيرة للسوشيال.",
    duration: "خلال أسبوع من تأكيد المراجعة"
  }
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "كيف نصوّر حفل زفافك مع Asmaa Video",
  description: "٧ خطوات واضحة من الحجز للتسليم النهائي.",
  totalTime: "P30D",
  estimatedCost: { "@type": "MonetaryAmount", currency: "SAR", value: "600-2500" },
  step: steps.map((s) => ({
    "@type": "HowToStep",
    position: s.n,
    name: s.title,
    text: s.desc
  }))
};

export default function ProcessPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={howToJsonLd} />

      <section className="pkg-hero" style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="pkg-hero-inner">
          <Link className="back-pill" href="/" style={{ marginBottom: 24 }}>
            <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
          </Link>
          <span className="cine-eyebrow">رحلة العميلة معنا</span>
          <h1 className="cine-headline" style={{ marginTop: 16 }}>
            <span className="cine-headline-ar">من الحجز إلى التسليم — كل خطوة موضّحة.</span>
            <span className="cine-headline-en">From booking to delivery — nothing hidden.</span>
          </h1>
          <p className="cine-lede">
            لا مفاجآت ولا غموض. كل خطوة لها مدة معروفة وشيء تنتظرينه منّا.
          </p>
        </div>
      </section>

      <section className="section" id="steps">
        <div className="section-inner">
          <ol className="process-steps" aria-label="خطوات العمل">
            {steps.map((s) => (
              <li key={s.n} className="glass-card process-step-card">
                <div className="process-step-number" aria-hidden="true">{s.n}</div>
                <div className="process-step-body">
                  <h2 className="process-step-title">{s.title}</h2>
                  <p className="process-step-desc">{s.desc}</p>
                  <span className="process-step-duration">
                    <Clock3 size={14} aria-hidden="true" />
                    {s.duration}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div className="process-cta-block glass-card" style={{ marginTop: 48, textAlign: "center" }}>
            <h2 className="section-title">جاهزة تحجزين موعدك؟</h2>
            <p className="section-copy" style={{ maxWidth: 520, margin: "12px auto 28px" }}>
              ابدئي بالتواصل عبر واتساب أو اطلعي على الباقات أولاً.
            </p>
            <div className="button-row" style={{ justifyContent: "center" }}>
              <Link className="cta" href="/reserve">
                رابط العروس
              </Link>
              <a className="ghost-cta" href={whatsappLink("process-page")} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" />
                واتساب
              </a>
            </div>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

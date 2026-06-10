import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  FileText,
  LockKeyhole,
  MessageCircle,
  ShieldCheck
} from "lucide-react";
import { serviceAreas } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const META_TITLE = "سياسة آراء العميلات | Asmaa Video";
const META_DESC = "Asmaa Video تنشر آراء العرايس فقط بعد موافقة صريحة، وبالأحرف الأولى فقط، مع احترام حدود مشاركة العروس والعائلة.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: {
    canonical: "https://asmaa.video/reviews",
    languages: {
      "ar-SA": "https://asmaa.video/reviews",
      "x-default": "https://asmaa.video/reviews"
    }
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESC,
    url: "https://asmaa.video/reviews",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(META_TITLE, META_DESC),
  robots: { index: true, follow: true }
};

const feedbackPrinciples = [
  {
    icon: ShieldCheck,
    title: "موافقة قبل النشر",
    body: "أي رأي يُنشر هنا يحتاج موافقة واضحة من العروس، ولا نعرض اسمها الكامل أو تفاصيل عائلتها.",
  },
  {
    icon: LockKeyhole,
    title: "حدود مشاركة العائلة أولاً",
    body: "التصوير النسائي والزواجات مناسبات خاصة، لذلك لا نستخدم صوراً أو شهادات للتسويق بدون إذن محدد.",
  },
  {
    icon: MessageCircle,
    title: "مراجعة مباشرة",
    body: "للاطمئنان قبل الحجز، اطلبي عبر واتساب نماذج مناسبة لنوع مناسبتك وسيتم إرسال ما يسمح بمشاركته فقط.",
  },
];

const bookingChecks = [
  "اختاري الباقة الأقرب بدل طلب ملف طويل بلا سياق.",
  "أرسلي المدينة والقاعة أو الحي مع التاريخ.",
  "اذكري أهم اللقطات: الزفة، First Look، تفاصيل العروس، أو الخطوبة.",
  "إذا كانت المناسبة ملكة أو خطوبة، اكتبي ذلك من البداية لتصل الرسالة للبكج الصحيح."
];

const evidenceRoutes = [
  { href: "/packages", label: "الباقات التفاعلية", detail: "توضح الفرق بين الزفة، الخطوبة، Half Day، وFull Day." },
  { href: "/portfolio", label: "الألبوم", detail: "يركز على اللحظات التي تقارنها العروس فعلا قبل الحجز." },
  { href: "/faq", label: "الأسئلة المتكررة", detail: "يختصر وقت الحضور، العربون، والتوفر قبل واتساب." },
  { href: "/engagement", label: "صفحة الخطوبة", detail: "مخصصة لنية الملكة والخطوبة حتى لا تبدأي من الصفر." }
];

const consentRules = [
  "الرأي الحقيقي يظل باسم مختصر أو وصف عام فقط إذا وافقت العميلة على نشره.",
  "لا يتم تحويل المحادثات الخاصة إلى اقتباسات دعائية من دون إذن واضح.",
  "إذا كانت العروس تريد مثالًا أقرب لمناسبتها، نحدد ذلك عبر واتساب بحسب المدينة ونوع التغطية."
];

export default function ReviewsPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="pkg-hero" style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="pkg-hero-inner">
          <Link className="back-pill" href="/" style={{ marginBottom: 24 }}><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
          <span className="cine-eyebrow">آراء العرايس</span>
          <h1 className="cine-headline" style={{ marginTop: 16 }}>
            <span className="cine-headline-ar">آراء موثقة فقط، ومشاركة محدودة دائماً.</span>
            <span className="cine-headline-en">Consent-first client feedback.</span>
          </h1>
          <p className="cine-lede">
            لا ننشر تقييمات أو نجوم أو اقتباسات منسوبة لعروس إلا بعد موافقة صريحة. إلى أن تصل مراجعات موثقة قابلة للنشر، هذه الصفحة توضّح طريقة التعامل مع آراء العميلات.
          </p>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="section-inner">
          <div className="reviews-grid">
            {feedbackPrinciples.map((item, i) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="glass-card review-card reveal-on-scroll" style={{ animationDelay: `${i * 80}ms` }}>
                  <Icon size={28} aria-hidden="true" className="review-quote-icon" />
                  <h2 className="review-service" style={{ margin: 0 }}>{item.title}</h2>
                  <p className="review-text">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">ما يسرع الرد</span>
            <h2>أرسلي هذه النقاط في أول رسالة بدل السؤال المفتوح.</h2>
            <div className="city-wave-list">
              {bookingChecks.map((item) => (
                <p key={item}>
                  <CheckCircle2 size={16} />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </article>
          <article>
            <span className="eyebrow">أين تبدئين؟</span>
            <h2>إذا كنت تريدين دليلًا ملموسًا قبل واتساب، ابدئي من هذه الصفحات.</h2>
            <div className="city-wave-list">
              {evidenceRoutes.map((item) => (
                <p key={item.href}>
                  <FileText size={16} />
                  <Link href={item.href}>{item.label}</Link>
                  <span>{item.detail}</span>
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section guide-index-bottom">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">سياسة الموافقة</span>
            <h2>Feedback طبيعي ومحترم، لا اقتباس مزيف.</h2>
            <div className="city-wave-list">
              {consentRules.map((item) => (
                <p key={item}>
                  <BadgeCheck size={16} />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </article>
          <article>
            <span className="eyebrow">مدن الخدمة</span>
            <h2>إذا كان سؤالك متعلقًا بالمكان، ابدئي من صفحة مدينتك.</h2>
            <div className="city-wave-list">
              {serviceAreas.slice(0, 5).map((city) => (
                <p key={city.slug}>
                  <CheckCircle2 size={16} />
                  <Link href={`/${city.slug}`}>{city.headline}</Link>
                </p>
              ))}
            </div>
          </article>
        </div>

        <div className="section-inner button-row wave-actions">
          <Link className="cta" href="/reserve">
            ابدئي من رابط العروس <CalendarDays size={18} />
          </Link>
          <Link className="ghost-cta" href="/portfolio">
            شاهدي الألبوم <ArrowLeft size={18} />
          </Link>
          <Link className="ghost-cta" href="/faq">
            صفحة الأسئلة <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

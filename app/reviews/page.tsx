import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, CalendarDays, CheckCircle2, FileText, MessageCircle, ShieldCheck } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { serviceAreas, whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

const META_TITLE = "الاطمئنان قبل الحجز | Asmaa Studio";
const META_DESC =
  "صفحة Asmaa Studio التي تشرح كيف تطمئن العروس قبل الحجز: ما الذي يظهر في الموقع، ماذا ترسل في أول رسالة، وكيف يتم اعتماد أي رأي أو لقطة للنشر بعد موافقة العميلة.";

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
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(META_TITLE, META_DESC),
  robots: { index: true, follow: true }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://asmaa.video/reviews#webpage",
      url: "https://asmaa.video/reviews",
      name: META_TITLE,
      description: META_DESC,
      inLanguage: "ar-SA"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://asmaa.video/reviews#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://asmaa.video/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "الاطمئنان قبل الحجز",
          item: "https://asmaa.video/reviews"
        }
      ]
    }
  ]
};

const trustPillars = [
  {
    title: "وضوح الباقة قبل واتساب",
    detail: "السعر، المدة، وما الذي سيظهر داخل الفيلم مكتوب بوضوح قبل أن تبدأي المحادثة."
  },
  {
    title: "الخطوة التالية محددة",
    detail: "رابط العروس يختصر المدينة والتاريخ والبكج حتى تصل الرسالة الأولى مرتبة بدل سؤال عام."
  },
  {
    title: "لا ننشر رأيًا ولا لقطة بلا موافقة",
    detail: "أي لقطة أو رأي من عميلة لا يتحول إلى مادة منشورة إلا بعد موافقة واضحة منها."
  }
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
      <JsonLd data={pageSchema} />

      <section className="section city-hero-20x portfolio-hero">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/">
              <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
            </Link>
            <span className="eyebrow">Wave 19 / اطمئنان طبيعي قبل الحجز</span>
            <h1 className="section-title">الاطمئنان قبل الحجز يبدأ من الوضوح، لا من اقتباسات مبالغ فيها.</h1>
            <p className="section-copy">
              هذه الصفحة مخصصة للعروس التي تريد أن تعرف لماذا يبدو قرار الحجز أوضح هنا:
              باقات مكتوبة، مسار حجز مرتب، وعدم تحويل آراء العميلات أو لقطاتهن إلى عرض عام إلا بموافقتهن.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/packages">
                شاهدي الباقات <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink("reviews-page")} target="_blank" rel="noreferrer">
                اسألي عن التوفر <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card portfolio-command-card">
            <span>ما الذي يطمئن العروس؟</span>
            <h2>٣ قواعد واضحة</h2>
            <div>
              <em>سعر ومدة مكتوبان</em>
              <em>خطوة حجز محددة</em>
              <em>موافقة قبل أي نشر</em>
              <em>واتساب مباشر عند الحاجة</em>
            </div>
          </aside>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="section-inner">
          <span className="eyebrow">قبل التحويل</span>
          <h2 className="section-title">هذه هي عناصر الثقة التي يمكن التحقق منها الآن على الموقع.</h2>
          <div className="board-lever-grid">
            {trustPillars.map((item) => (
              <article key={item.title} className="board-lever-card">
                <ShieldCheck size={22} />
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
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
    </main>
  );
}

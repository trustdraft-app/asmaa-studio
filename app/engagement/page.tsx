import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { packages, serviceAreas, whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const engagementPackage = packages.find((item) => item.id === "05");
const halfDayPackage = packages.find((item) => item.id === "03");

export const metadata: Metadata = {
  title: "بكج الخطوبة والملكة",
  description:
    "صفحة Asmaa Studio لبكج الخطوبة والملكة في الأحساء والدمام والخبر: السعر، المدة، وما الذي يشمله فيلم الخطوبة قبل واتساب.",
  alternates: {
    canonical: "https://asmaa.video/engagement"
  },
  openGraph: {
    title: "بكج الخطوبة والملكة | Asmaa Studio",
    description:
      "للعروس التي تريد تصوير الشبكة والتلبيس والكيك والزفة في فيلم خطوبة راق: هذه الصفحة توضح متى يكفي بكج الخطوبة ومتى يكون Half Day أنسب.",
    url: "https://asmaa.video/engagement",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "بكج الخطوبة والملكة | Asmaa Studio",
    "للعروس التي تريد تصوير الشبكة والتلبيس والكيك والزفة في فيلم خطوبة راق: هذه الصفحة توضح متى يكفي بكج الخطوبة ومتى يكون Half Day أنسب."
  )
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://asmaa.video/engagement#service",
      name: "بكج الخطوبة والملكة",
      serviceType: "Engagement and milkah videography",
      provider: {
        "@id": "https://asmaa.video/#organization"
      },
      areaServed: serviceAreas.map((city) => ({
        "@type": "City",
        name: city.en,
        alternateName: city.ar
      })),
      offers: engagementPackage
        ? {
            "@type": "Offer",
            price: engagementPackage.price,
            priceCurrency: "SAR",
            availability: "https://schema.org/InStock",
            url: "https://asmaa.video/reserve?package=05"
          }
        : undefined
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://asmaa.video/engagement#breadcrumb",
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
          name: "بكج الخطوبة والملكة",
          item: "https://asmaa.video/engagement"
        }
      ]
    }
  ]
};

const decisionPoints = [
  {
    title: "متى يكون هذا البكج مناسبًا؟",
    detail: "عندما تكون المناسبة خطوبة أو ملكة، وتريدين حفظ الشبكة والتلبيس والكيك والزفة في فيلم عائلي مرتب."
  },
  {
    title: "ما الذي يظهر داخل الفيلم؟",
    detail: "تفاصيل الشبكة، لحظة التلبيس، الكيك، اللقطات العائلية، والزفة ضمن إيقاع هادئ وناعم."
  },
  {
    title: "متى تحتاجين Half Day بدلًا منه؟",
    detail: "إذا كانت تفاصيل العروس أكثر اتساعًا أو تريدين First Look وكواليس إضافية قبل الزفة، فـ Half Day يمنحك مساحة أكبر."
  }
];

const quickChecks = [
  "اذكري هل المناسبة خطوبة أم ملكة.",
  "أضيفي وقت التلبيس أو الزفة التقريبي.",
  "اذكري المدينة والقاعة أو الحي.",
  "حددي إذا كانت الشبكة والكيك من أهم اللقطات لديك."
];

export default function EngagementPage() {
  if (!engagementPackage || !halfDayPackage) {
    return null;
  }

  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={serviceJsonLd} />

      <section className="section city-hero-20x portfolio-hero">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/">
              <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
            </Link>
            <span className="eyebrow">Wave 17 / نية الخطوبة والملكة</span>
            <h1 className="section-title">بكج الخطوبة والملكة للعروس التي تريد فيلمًا راقيًا لتفاصيل المناسبة.</h1>
            <p className="section-copy">
              هذه الصفحة تختصر قرارًا شائعًا قبل واتساب: إذا كانت المناسبة خطوبة أو ملكة،
              فبكج الخطوبة يوضح السعر، المدة، وما الذي سيظهر داخل الفيلم قبل بدء المحادثة.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve?package=05">
                افتحي رابط الخطوبة <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink("engagement-page")} target="_blank" rel="noreferrer">
                اسألي عن التوفر <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card portfolio-command-card">
            <span>للخطوبة والملكة</span>
            <h2>{engagementPackage.price} ريال</h2>
            <p>{engagementPackage.summary}</p>
            <div>
              <em>{engagementPackage.duration}</em>
              <em>{engagementPackage.deliverable}</em>
              <em>الشبكة والتلبيس</em>
              <em>الكيك والزفة</em>
            </div>
          </aside>
        </div>
      </section>

      <section className="section portfolio-scene-section">
        <div className="section-inner">
          <span className="eyebrow">قبل واتساب</span>
          <h2 className="section-title">كيف تعرفين أن بكج الخطوبة هو المسار المناسب؟</h2>
          <div className="board-lever-grid">
            {decisionPoints.map((point) => (
              <article className="board-lever-card" key={point.title}>
                <Sparkles size={22} />
                <h3>{point.title}</h3>
                <p>{point.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">مقارنة سريعة</span>
          <h2 className="section-title">إذا توسعت اللقطات قبل الزفة، فهذه هي الخطوة الأقرب بعدها.</h2>
          <div className="packages-grid packages-grid-20x guide-package-grid">
            {[engagementPackage, halfDayPackage].map((item) => (
              <article className="package-card package-card-20x" key={item.id}>
                <header>
                  <small>بكج {item.id}</small>
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} ريال</p>
                </header>
                <p>{item.summary}</p>
                <div className="package-best">
                  <strong>مناسب لـ</strong>
                  <span>{item.bestFor}</span>
                </div>
                <div className="package-sequence">
                  {item.sequence.map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>
                <a href={whatsappLink(`engagement-page-package-${item.id}`)} target="_blank" rel="noreferrer">
                  اسألي عن هذا البكج <ArrowLeft size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section guide-index-bottom">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">ما يسرع الرد</span>
            <h2>أرسلي هذه النقاط في أول رسالة بدل السؤال العام.</h2>
            <div className="city-wave-list">
              {quickChecks.map((item) => (
                <p key={item}>
                  <CheckCircle2 size={16} />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </article>
          <article>
            <span className="eyebrow">مدن الخدمة</span>
            <h2>يمكنك أيضًا البدء من صفحة المدينة إذا كان القرار مرتبطًا بالموقع.</h2>
            <div className="city-wave-list">
              {serviceAreas.map((city) => (
                <p key={city.slug}>
                  <MapPin size={16} />
                  <Link href={`/${city.slug}`}>{city.headline}</Link>
                </p>
              ))}
            </div>
          </article>
        </div>
        <div className="section-inner board-lever-grid">
          <article className="board-lever-card">
            <Clock3 size={22} />
            <h3>المدة</h3>
            <p>ساعتان ونصف تكفي عادة لخطوبة أو ملكة مرتبة التركيز على الشبكة والتلبيس والزفة.</p>
          </article>
          <article className="board-lever-card">
            <CalendarDays size={22} />
            <h3>الحجز المباشر</h3>
            <p>يمكنك فتح رابط العروس مع اختيار باقة 05 مباشرة حتى تصل الرسالة بالبكج الصحيح من البداية.</p>
          </article>
          <article className="board-lever-card">
            <MessageCircle size={22} />
            <h3>متى يكون السؤال عبر واتساب أفضل؟</h3>
            <p>إذا كانت المناسبة تجمع بين خطوبة وتفاصيل عروس أوسع، اكتبي ذلك مباشرة لنحدد هل الخطوبة أو Half Day أنسب.</p>
          </article>
        </div>
        <div className="section-inner button-row wave-actions">
          <Link className="cta" href="/reserve?package=05">
            ابدئي من رابط الخطوبة <CalendarDays size={18} />
          </Link>
          <Link className="ghost-cta" href="/guides/engagement-videography-eastern-province">
            دليل الخطوبة <ArrowLeft size={18} />
          </Link>
          <Link className="ghost-cta" href="/portfolio">
            شاهدي الألبوم <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

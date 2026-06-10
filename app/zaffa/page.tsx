import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { packages, serviceAreas, whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const zaffaPackage = packages.find((item) => item.id === "01");
const enhancedZaffaPackage = packages.find((item) => item.id === "02");

export const metadata: Metadata = {
  title: "بكج الزفة",
  description:
    "صفحة Asmaa Video لبكج الزفة في الأحساء والدمام والخبر: سعر واضح، مدة مختصرة، وما الذي يشمله تصوير لحظة الدخول قبل واتساب.",
  alternates: {
    canonical: "https://asmaa.video/zaffa"
  },
  openGraph: {
    title: "بكج الزفة | Asmaa Video",
    description:
      "للعميلة التي تريد تصوير لحظة الدخول فقط: هذه الصفحة تشرح بكج الزفة، متى يكفي، ومتى يكون الزفة والكواليس أنسب.",
    url: "https://asmaa.video/zaffa",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "بكج الزفة | Asmaa Video",
    "للعميلة التي تريد تصوير لحظة الدخول فقط: هذه الصفحة تشرح بكج الزفة، متى يكفي، ومتى يكون الزفة والكواليس أنسب."
  )
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://asmaa.video/zaffa#service",
      name: "بكج الزفة",
      serviceType: "Zaffa wedding entrance videography",
      provider: {
        "@id": "https://asmaa.video/#organization"
      },
      areaServed: serviceAreas.map((city) => ({
        "@type": "City",
        name: city.en,
        alternateName: city.ar
      })),
      offers: zaffaPackage
        ? {
            "@type": "Offer",
            price: zaffaPackage.price,
            priceCurrency: "SAR",
            availability: "https://schema.org/InStock",
            url: "https://asmaa.video/reserve?package=01"
          }
        : undefined
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://asmaa.video/zaffa#breadcrumb",
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
          name: "بكج الزفة",
          item: "https://asmaa.video/zaffa"
        }
      ]
    }
  ]
};

const decisionPoints = [
  {
    title: "متى يكفي هذا البكج؟",
    detail: "عندما تكون اللحظة الأهم هي دخول العروس فقط، وتريدين فيلمًا مختصرًا وواضحًا بدون تغطية تفاصيل اليوم كاملة."
  },
  {
    title: "ماذا يشمل عمليًا؟",
    detail: "حضور قبل الزفة بربع ساعة، تجهيز الإضاءة، تصوير لحظة الدخول، ثم مونتاج مختصر يحفظ المشهد بشكل مرتب."
  },
  {
    title: "متى تنتقلين إلى الزفة والكواليس؟",
    detail: "إذا كانت الكوشة أو الكيك أو لقطات القاعة جزءًا مهمًا من الذكرى، فالباقة المطورة تعطي الفيلم بداية أوسع."
  }
];

const quickChecks = [
  "اكتبي وقت الزفة التقريبي.",
  "اذكري المدينة والقاعة أو الحي.",
  "حددي هل تريدين الزفة فقط أو الزفة والكواليس.",
  "أضيفي أي ملاحظة مهمة مثل الكوشة أو الكيك."
];

export default function ZaffaPage() {
  if (!zaffaPackage || !enhancedZaffaPackage) {
    return null;
  }

  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={serviceJsonLd} />

      <section className="section city-hero-20x portfolio-hero">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/"><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
            <span className="eyebrow">Wave 16 / نية الزفة</span>
            <h1 className="section-title">بكج الزفة للعروس التي تريد حفظ لحظة الدخول بدون مسار طويل.</h1>
            <p className="section-copy">
              هذه الصفحة تختصر سؤالًا متكررًا: إذا كان تركيزك على لقطة الدخول فقط، فبكج الزفة يوضح
              السعر، المدة، وما الذي سيظهر داخل الفيلم قبل أن تبدئي المحادثة.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve?package=01">
                افتحي رابط الزفة <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink("zaffa-page")} target="_blank" rel="noreferrer">
                اسألي عن التوفر <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card portfolio-command-card">
            <span>سريع وواضح</span>
            <h2>{zaffaPackage.price} ريال</h2>
            <p>{zaffaPackage.summary}</p>
            <div>
              <em>{zaffaPackage.duration}</em>
              <em>{zaffaPackage.deliverable}</em>
              <em>الحجز السريع</em>
              <em>لحظة الدخول</em>
            </div>
          </aside>
        </div>
      </section>

      <section className="section portfolio-scene-section">
        <div className="section-inner">
          <span className="eyebrow">قبل واتساب</span>
          <h2 className="section-title">كيف تعرفين أن بكج الزفة هو الاختيار المناسب؟</h2>
          <div className="board-lever-grid">
            {decisionPoints.map((point) => (
              <article className="board-lever-card reveal-on-scroll" key={point.title}>
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
          <h2 className="section-title">إذا اتسعت الذكرى قليلًا، فهذه هي الخطوة التالية الأقرب.</h2>
          <div className="packages-grid packages-grid-20x guide-package-grid">
            {[zaffaPackage, enhancedZaffaPackage].map((item) => (
              <article className="package-card package-card-20x reveal-on-scroll" key={item.id}>
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
                <a href={whatsappLink(`zaffa-page-package-${item.id}`)} target="_blank" rel="noreferrer">
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
          <article className="board-lever-card reveal-on-scroll">
            <Clock3 size={22} />
            <h3>وقت أقل</h3>
            <p>هذه الباقة مناسبة عندما يكون جدول اليوم ضيقًا وتريدين حفظ اللحظة الأساسية فقط.</p>
          </article>
          <article className="board-lever-card reveal-on-scroll">
            <CalendarDays size={22} />
            <h3>قرار أسرع</h3>
            <p>الأسعار والمدة واضحة هنا، لذلك تكون رسالة واتساب الأولى أقرب إلى الحجز من الاستفسار العام.</p>
          </article>
        </div>
        <div className="section-inner">
          <div className="button-row wave-actions">
            <Link className="cta" href="/reserve?package=01">
              احجزي بكج الزفة <ArrowLeft size={18} />
            </Link>
            <Link className="ghost-cta" href="/guides/zaffa-video-package">
              دليل الزفة <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

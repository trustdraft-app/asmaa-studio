import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle, Search } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { instagramUrl, packages, serviceAreas, tiktokUrl, whatsappLink, whatsappNumber } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city) ?? serviceAreas[0];

  return {
    title: {
      absolute: area.metaTitle
    },
    description: area.metaDescription,
    alternates: {
      canonical: `https://asmaa.video/${area.slug}`
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `https://asmaa.video/${area.slug}`,
      siteName: "Asmaa Studio",
      images: socialPreviewImages,
      type: "website",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(area.metaTitle, area.metaDescription)
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city) ?? serviceAreas[0];

  const cityJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://asmaa.video/${area.slug}#service`,
    name: area.headline,
    serviceType: "Female wedding videography",
    inLanguage: "ar-SA",
    areaServed: {
      "@type": "City",
      name: area.en,
      alternateName: area.ar,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Eastern Province, Saudi Arabia"
      }
    },
    provider: {
      "@type": "Organization",
      "@id": "https://asmaa.video/#organization",
      name: "Asmaa Studio",
      url: "https://asmaa.video/",
      telephone: `+${whatsappNumber}`,
      logo: "https://asmaa.video/brand/asmaa-logo-square.png",
      sameAs: [instagramUrl, tiktokUrl]
    },
    audience: {
      "@type": "Audience",
      audienceType: area.audience
    },
    offers: packages.map((item) => ({
      "@type": "Offer",
      name: item.name,
      price: item.price,
      priceCurrency: "SAR",
      description: item.summary,
      url: `https://asmaa.video/reserve?city=${area.slug}&package=${item.id}`
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
      { "@type": "ListItem", position: 2, name: "المدن", item: "https://asmaa.video/#cities" },
      { "@type": "ListItem", position: 3, name: area.ar, item: `https://asmaa.video/${area.slug}` }
    ]
  };

  return (
    <main className="page-shell city-page">
      <SiteHeader />
      <JsonLd data={cityJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/"><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
            <span className="eyebrow">{area.priority} / {area.en}</span>
            <h1 className="section-title">{area.headline}</h1>
            <p className="section-copy">{area.heroLine}</p>
            <div className="city-intent">
              <article>
                <Search size={22} />
                <strong>ما تبحث عنه العروس</strong>
                <span>{area.searchIntent}</span>
              </article>
              <article>
                <MapPin size={22} />
                <strong>المنطقة</strong>
                <span>{area.neighborhoodSignals.join("، ")}</span>
              </article>
            </div>
            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink(area.slug)} target="_blank" rel="noreferrer">
                اسألي عن توفر {area.ar} <MessageCircle size={18} />
              </a>
              <Link className="ghost-cta" href="/packages">
                الباقات التفاعلية <CalendarDays size={18} />
              </Link>
              <Link className="ghost-cta" href={`/reserve?city=${area.slug}`}>
                رابط العروس <CalendarDays size={18} />
              </Link>
            </div>
          </div>

          <aside className="city-command-card">
            <span>خدمة قريبة من مناسبتك</span>
            <h2>{area.ar}</h2>
            <p>{area.localPromise}</p>
            <div>
              {area.keywordCluster.map((keyword) => (
                <em key={keyword}>{keyword}</em>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">اختيار الباقة في {area.ar}</span>
          <h2 className="section-title">الباقة المناسبة حسب لحظات المناسبة، لا حسب السعر فقط.</h2>
          <div className="packages-grid packages-grid-20x">
            {packages.map((item) => (
              <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
                <header>
                  <small>بكج {item.id}</small>
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} ريال</p>
                </header>
                <p>{item.summary}</p>
                <div className="package-best">
                  <strong>لماذا يهم في {area.ar}</strong>
                  <span>{item.bestFor}</span>
                </div>
                <div className="package-sequence">
                  {item.sequence.map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>
                <a href={whatsappLink(`${area.slug}-package-${item.id}`)} target="_blank" rel="noreferrer">
                  اسألي عن هذا البكج <ArrowLeft size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section city-proof-section">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">لماذا هذه الصفحة مناسبة لك</span>
            <h2>{area.cityProof}</h2>
            <p>{area.audience}</p>
          </article>
          <article>
            <span className="eyebrow">ما سنركز عليه في المحتوى</span>
            <div className="city-wave-list">
              {area.contentWave.map((item) => (
                <p key={item}>
                  <Check size={16} /> {item}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-inner">
          <span className="eyebrow">أسئلة {area.ar}</span>
          <h2 className="section-title">إجابات قصيرة تقلل تردد العروس قبل واتساب.</h2>
          <div className="faq-grid">
            {area.faq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">قبل أول رسالة</span>
          <h2 className="section-title">افتحي قائمة تجهيز العروس الخاصة بـ {area.ar}.</h2>
          <div className="button-row wave-actions">
            <Link className="ghost-cta" href={`/ar/${area.slug}/bride-checklist`}>
              تجهيز العروس قبل التصوير <ArrowLeft size={15} />
            </Link>
            <Link className="ghost-cta" href="/eastern-province">
              كل مدن المنطقة الشرقية <ArrowLeft size={15} />
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle, Search, Sparkles } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { ImageGalleryJsonLd } from "../../components/seo/ImageGalleryJsonLd";
import { assetPath, instagramUrl, packages, serviceAreas, tiktokUrl, whatsappLink, whatsappNumber } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

type Props = {
  params: Promise<{ city: string }>;
};

/**
 * City-labeled portfolio thumbnails (real highlight artwork from /public).
 * Cities with a dedicated highlight cover lead with it; the rest open with
 * the zaffa frame. Labels carry the local search keyword for that city.
 */
const cityHighlightCovers: Record<string, string> = {
  alahsa: "/highlights-v2/07-alahsa.png",
  dammam: "/highlights-v2/08-dammam.png",
  khobar: "/highlights-v2/09-khobar.png"
};

function cityPortfolioThumbs(area: { slug: string; ar: string }) {
  return [
    {
      src: cityHighlightCovers[area.slug] ?? "/highlights-v2/01-zaffa.png",
      label: `تصوير زفة في ${area.ar}`,
      en: "Zaffa entrance"
    },
    {
      src: "/highlights-v2/12-bride.png",
      label: `تفاصيل عروس ${area.ar}`,
      en: "Bride details"
    },
    {
      src: "/highlights-v2/10-engagement.png",
      label: `خطوبة وملكة في ${area.ar}`,
      en: "Engagement & Milkah"
    }
  ];
}

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
  const thumbs = cityPortfolioThumbs(area);

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

  // NOTE: FAQPage JSON-LD intentionally NOT emitted — the launch verifier
  // (scripts/verify-launch.mjs) bans deprecated FAQPage structured data on
  // marketing routes. The visible FAQ section below still serves brides + AEO.
  return (
    <main className="page-shell city-page">
      <SiteHeader />
      <JsonLd data={cityJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ImageGalleryJsonLd
        name={`أعمال Asmaa Studio في ${area.ar}`}
        description={`لقطات من تصوير الزواجات والخطوبة النسائي في ${area.ar} — زفة، تفاصيل عروس، وملكة.`}
        url={`https://asmaa.video/${area.slug}`}
        images={thumbs.map((thumb) => ({
          contentUrl: `https://asmaa.video${thumb.src}`,
          name: thumb.label,
          description: `${thumb.label} — Asmaa Studio`
        }))}
      />

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
            <p className="city-price-indicator">
              <Sparkles size={15} aria-hidden="true" />
              باقات {area.ar} تبدأ من <b>٦٠٠</b> وحتى <b>٢٥٠٠ ريال</b> — نفس السعر المعلن، بدون رسوم تنقّل داخل المدينة.
            </p>
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

      <section className="section city-thumbs-section">
        <div className="section-inner">
          <span className="eyebrow">من أعمالنا في {area.ar}</span>
          <h2 className="section-title">لقطات بنفس اللغة البصرية التي ستوثق يومك.</h2>
          <div className="city-thumbs-grid">
            {thumbs.map((thumb) => (
              <Link className="city-thumb" href="/portfolio" key={thumb.label}>
                <span className="city-thumb-media">
                  <Image
                    src={assetPath(thumb.src)}
                    alt={thumb.label}
                    fill
                    loading="lazy"
                    sizes="(max-width: 720px) 90vw, 30vw"
                  />
                  <span className="city-thumb-pattern" aria-hidden="true" />
                </span>
                <span className="city-thumb-caption">
                  <strong>{thumb.label}</strong>
                  <em>{thumb.en}</em>
                </span>
              </Link>
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

      <section className="section city-book-band" aria-label={`احجزي في ${area.ar}`}>
        <div className="section-inner city-book-band-inner">
          <div>
            <span className="eyebrow">الخطوة الأخيرة</span>
            <h2 className="section-title">احجزي الآن في {area.ar} — رسالة واحدة تكفي.</h2>
            <p className="section-copy">المدينة محفوظة مسبقاً في الرسالة؛ أضيفي التاريخ فقط ونرد عليك بالتوفر.</p>
          </div>
          <div className="button-row">
            <a className="cta" href={whatsappLink(area.slug)} target="_blank" rel="noreferrer">
              احجزي في {area.ar} عبر واتساب <MessageCircle size={18} />
            </a>
            <Link className="ghost-cta" href={`/reserve?city=${area.slug}`}>
              أو عبر رابط العروس <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

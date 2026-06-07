import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle, Mic, Phone, Search } from "lucide-react";
import { JsonLd } from "../../../../../components/JsonLd";
import { instagramUrl, tiktokUrl, whatsappLink, whatsappNumber } from "../../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../../lib/metadata";
import { allCityServicePairs, seoCities, seoServices } from "../../../../../lib/seo-grid";
import { SiteHeader } from "../../../../../components/SiteHeader";
import { SiteFooter } from "../../../../../components/SiteFooter";

type Props = { params: Promise<{ city: string; service: string }> };

export function generateStaticParams() {
  return allCityServicePairs().map(({ city, service }) => ({ city: city.slug, service: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = seoCities.find((item) => item.slug === citySlug);
  const service = seoServices.find((item) => item.slug === serviceSlug);

  if (!city || !service) {
    return { title: "Asmaa Studio" };
  }

  const title = `${service.ar} قريب مني في ${city.ar} | Asmaa Studio`;
  const description = `صفحة بحث محلي للعروس التي تبحث عن ${service.ar} قريب منها في ${city.ar}: الأحياء القريبة، الباقة المناسبة، وما الذي يختصر رسالة الحجز الأولى مع Asmaa Studio.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me`,
      languages: {
        "ar-SA": `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me`,
        "x-default": `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me`
      }
    },
    openGraph: {
      title,
      description,
      url: `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me`,
      siteName: "Asmaa Studio",
      images: socialPreviewImages,
      type: "article",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(title, description),
    robots: { index: true, follow: true }
  };
}

export default async function SeoNearMePage({ params }: Props) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = seoCities.find((item) => item.slug === citySlug);
  const service = seoServices.find((item) => item.slug === serviceSlug);

  if (!city || !service) notFound();

  const sourceLabel = `near-me-${city.slug}-${service.slug}`;
  const nearbyCities = seoCities.filter((item) => item.slug !== city.slug && item.governorate === city.governorate).slice(0, 3);
  const siblingServices = seoServices.filter((item) => item.slug !== service.slug).slice(0, 4);
  const reservationHref = `/reserve?city=${city.slug}&package=${service.packageId ?? ""}`;
  const firstMessageChecklist = [
    `اسم القاعة أو الحي داخل ${city.ar} حتى يكون الوصول واضحاً.`,
    `هل تريدين ${service.ar} فقط أم معه تفاصيل إضافية؟`,
    "وقت بداية المناسبة ووقت الزفة أو الفقرة الرئيسية.",
    "أي لقطة مهمة مثل First Look أو الشبكة أو الكيك أو تفاصيل العروس."
  ];
  const answerBullets = [
    `${service.ar} متاح لعروس ${city.ar} مع أولوية للأحياء التالية: ${city.neighborhoodSignals.slice(0, 3).join("، ")}.`,
    `السعر المبدئي يبدأ من ${service.price} ريال والمدة ${service.durationAr}.`,
    "أفضل رسالة أولى هي التي تجمع المدينة، التاريخ، القاعة، والباقة الأقرب."
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me#article`,
        headline: `${service.ar} قريب مني في ${city.ar}`,
        description: `بحث محلي لعروس ${city.ar} التي تريد ${service.ar} قريباً منها مع باقة واضحة ورسالة حجز أسهل.`,
        inLanguage: "ar-SA",
        mainEntityOfPage: `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me`,
        author: {
          "@type": "Organization",
          "@id": "https://asmaa.video/#organization",
          name: "Asmaa Studio",
          url: "https://asmaa.video/"
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://asmaa.video/#organization",
          name: "Asmaa Studio"
        },
        about: [city.ar, service.ar, "near me wedding videography", "voice search"]
      },
      {
        "@type": "Service",
        "@id": `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me#service`,
        name: `${service.ar} قريب مني في ${city.ar}`,
        serviceType: service.en,
        inLanguage: ["ar-SA", "en"],
        provider: {
          "@type": "Organization",
          "@id": "https://asmaa.video/#organization",
          name: "Asmaa Studio",
          url: "https://asmaa.video/",
          telephone: `+${whatsappNumber}`,
          sameAs: [instagramUrl, tiktokUrl]
        },
        areaServed: {
          "@type": "City",
          name: city.en,
          alternateName: city.ar,
          containedInPlace: { "@type": "AdministrativeArea", name: "Eastern Province, Saudi Arabia" }
        },
        offers: {
          "@type": "Offer",
          price: service.price,
          priceCurrency: "SAR",
          availability: "https://schema.org/InStock",
          url: "https://asmaa.video/packages"
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: city.ar, item: `https://asmaa.video/${city.slug}` },
          { "@type": "ListItem", position: 3, name: service.ar, item: `https://asmaa.video/ar/${city.slug}/${service.slug}` },
          { "@type": "ListItem", position: 4, name: "قريب مني", item: `https://asmaa.video/ar/${city.slug}/${service.slug}/near-me` }
        ]
      }
    ]
  };

  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={articleJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href={`/ar/${city.slug}/${service.slug}`}>
              <ArrowLeft size={16} /> صفحة {service.ar} في {city.ar}
            </Link>
            <span className="eyebrow">Near Me / {city.ar} / {service.ar}</span>
            <h1 className="section-title">{service.ar} قريب مني في {city.ar}</h1>
            <p className="section-copy">
              هذه الصفحة مخصصة للعروس التي تبحث بصيغة &quot;قريب مني&quot; وتريد جواباً واضحاً: هل الخدمة مناسبة داخل {city.ar}، ما الباقة الأقرب، وما الذي يجعل رسالة الحجز أسرع؟
            </p>

            <div className="city-intent">
              <article>
                <Mic size={22} />
                <strong>نية البحث</strong>
                <span>سؤال صوتي سريع قبل الدخول في تفاصيل طويلة.</span>
              </article>
              <article>
                <MapPin size={22} />
                <strong>أقرب أحياء</strong>
                <span>{city.neighborhoodSignals.slice(0, 3).join("، ")}</span>
              </article>
              <article>
                <CalendarDays size={22} />
                <strong>المدة</strong>
                <span>{service.durationAr}</span>
              </article>
            </div>

            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href={reservationHref}>
                رابط العروس <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink(sourceLabel)} target="_blank" rel="noreferrer">
                اسألي عن التوفر القريب <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card">
            <span>الجواب المختصر</span>
            <h2>ماذا يعني &quot;قريب مني&quot; هنا؟</h2>
            <div className="city-wave-list">
              {answerBullets.map((item) => (
                <p key={item}>
                  <Check size={16} />
                  {item}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">قبل أول رسالة</span>
            <h2>أربع نقاط تكفي لبدء الحجز</h2>
            <div className="city-wave-list">
              {firstMessageChecklist.map((item) => (
                <p key={item}>
                  <Search size={16} />
                  {item}
                </p>
              ))}
            </div>
          </article>

          <article>
            <span className="eyebrow">روابط قريبة</span>
            <h2>مدن مجاورة لنفس نوع التغطية</h2>
            <div className="city-wave-list">
              {nearbyCities.map((item) => (
                <p key={item.slug}>
                  <Check size={16} />
                  <Link href={`/ar/${item.slug}/${service.slug}/near-me`}>{service.ar} قريب مني في {item.ar}</Link>
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">خدمات مشابهة</span>
          <h2 className="section-title">إذا لم تكن هذه هي الباقة الأقرب، افتحي خدمة مشابهة داخل {city.ar}</h2>
          <div className="addons-grid">
            {siblingServices.map((item) => (
              <article className="addon-card" key={item.slug}>
                <h3>{item.ar}</h3>
                <p className="addon-price">{item.price} ريال</p>
                <p className="addon-desc">{item.shortDescAr}</p>
                <Link className="ghost-cta" href={`/ar/${city.slug}/${item.slug}/near-me`} style={{ marginTop: "auto" }}>
                  افتحي صفحة قريب مني <ArrowLeft size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="eyebrow">الخطوة التالية</span>
          <h2 className="section-title">احجزي {service.ar} في {city.ar} الآن</h2>
          <div className="button-row">
            <a className="cta" href={whatsappLink(`${sourceLabel}-final`)} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> واتساب مباشر
            </a>
            <a className="ghost-cta" href={`tel:+${whatsappNumber}`}>
              <Phone size={18} /> اتصلي بنا
            </a>
            <Link className="ghost-cta" href={`/ar/${city.slug}/bride-checklist`}>
              تجهيز العروس <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

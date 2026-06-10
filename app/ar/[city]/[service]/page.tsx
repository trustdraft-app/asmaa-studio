import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, Download, MessageCircle, Phone } from "lucide-react";
import { JsonLd } from "../../../../components/JsonLd";
import { ServiceMotion } from "../../../../components/ServiceMotion";
import { instagramUrl, tiktokUrl, whatsappLink, whatsappNumber } from "../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../lib/metadata";
import {
  allCityServicePairs,
  pickPhrase,
  seoCities,
  seoIntroBank,
  seoModifierPhraseBank,
  seoServices
} from "../../../../lib/seo-grid";
import { SiteHeader } from "../../../../components/SiteHeader";
import { SiteFooter } from "../../../../components/SiteFooter";

type Props = { params: Promise<{ city: string; service: string }> };

export function generateStaticParams() {
  return allCityServicePairs().map(({ city, service }) => ({ city: city.slug, service: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = seoCities.find((c) => c.slug === citySlug);
  const service = seoServices.find((s) => s.slug === serviceSlug);
  if (!city || !service) return { title: "Asmaa Video" };

  const title = `${service.ar} في ${city.ar} | Asmaa Video`;
  const desc = `${service.ar} في ${city.ar} من ${service.price} ريال — ${service.shortDescAr} باقات Asmaa Video بفريق نسائي مرخص.`;

  return {
    title: { absolute: title },
    description: desc,
    alternates: {
      canonical: `https://asmaa.video/ar/${city.slug}/${service.slug}`,
      languages: { "ar-SA": `https://asmaa.video/ar/${city.slug}/${service.slug}`, "x-default": `https://asmaa.video/ar/${city.slug}/${service.slug}` }
    },
    openGraph: {
      title,
      description: desc,
      url: `https://asmaa.video/ar/${city.slug}/${service.slug}`,
      siteName: "Asmaa Video",
      images: socialPreviewImages,
      type: "website",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(title, desc),
    robots: { index: true, follow: true }
  };
}

export default async function SeoCityServicePage({ params }: Props) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = seoCities.find((c) => c.slug === citySlug);
  const service = seoServices.find((s) => s.slug === serviceSlug);
  if (!city || !service) notFound();

  const seed = `${city.slug}-${service.slug}`;
  const intro = pickPhrase(seed, seoIntroBank)
    .replace(/\{city\}/g, city.ar)
    .replace(/\{service\}/g, service.ar);
  const trustNote = pickPhrase(seed, seoModifierPhraseBank.trust);
  const priceNote = pickPhrase(seed, seoModifierPhraseBank.price);

  const h1 = `${service.ar} في ${city.ar} — Asmaa Video`;
  const sourceLabel = `seo-${city.slug}-${service.slug}`;

  const otherServices = seoServices.filter((s) => s.slug !== service.slug).slice(0, 4);
  const sameGovernorate = seoCities.filter((c) => c.slug !== city.slug && c.governorate === city.governorate).slice(0, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://asmaa.video/ar/${city.slug}/${service.slug}#service`,
        name: `${service.ar} في ${city.ar}`,
        serviceType: service.en,
        inLanguage: ["ar-SA", "en"],
        provider: {
          "@type": "Organization",
          "@id": "https://asmaa.video/#organization",
          name: "Asmaa Video",
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
          url: `https://asmaa.video/packages`
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Video", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: city.ar, item: `https://asmaa.video/${city.slug.replace(/-/g, "")}` },
          { "@type": "ListItem", position: 3, name: service.ar, item: `https://asmaa.video/ar/${city.slug}/${service.slug}` }
        ]
      }
    ]
  };

  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={serviceJsonLd} />

      <section className="section city-hero-20x reveal-on-scroll">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/"><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
            <span className="eyebrow">{city.governorate === "alahsa" ? "محافظة الأحساء" : "المنطقة الشرقية"} / {city.en}</span>
            <h1 className="section-title">{h1}</h1>
            <p className="section-copy">{intro}</p>
            <div className="service-motion-wrap reveal-on-scroll" style={{ margin: "24px 0", display: "flex", justifyContent: "center" }}>
              <ServiceMotion serviceSlug={service.slug} ariaLabel={`Asmaa Video illustration: ${service.ar} في ${city.ar}`} />
            </div>

            <div className="city-intent">
              <article>
                <CalendarDays size={22} />
                <strong>المدة</strong>
                <span>{service.durationAr}</span>
              </article>
              <article>
                <Check size={22} />
                <strong>السعر من</strong>
                <span>{service.price} ريال</span>
              </article>
              <article>
                <ArrowLeft size={22} />
                <strong>أحياء التغطية</strong>
                <span>{city.neighborhoodSignals.slice(0, 3).join("، ")}</span>
              </article>
            </div>

            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink(sourceLabel)} target="_blank" rel="noreferrer">
                اسألي عن {service.ar} في {city.ar} <MessageCircle size={18} />
              </a>
              <Link className="ghost-cta" href="/packages">
                <CalendarDays size={18} /> الباقات التفاعلية
              </Link>
              <a className="ghost-cta" href="/packages-asmaa-studio.pdf" download="Asmaa-Studio-Packages.pdf">
                <Download size={18} /> دليل PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">لماذا Asmaa Video في {city.ar}</span>
          <h2 className="section-title">ثلاث ركائز لكل {service.ar} نقدمها هنا</h2>
          <ul className="payment-terms-grid">
            <li className="payment-step"><b>1</b><p>{trustNote}</p></li>
            <li className="payment-step"><b>2</b><p>{priceNote}</p></li>
            <li className="payment-step"><b>3</b><p>{service.highlightAr} — {service.shortDescAr}</p></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">تغطية {city.ar}</span>
          <h2 className="section-title">أحياء وقاعات {city.ar} المغطّاة</h2>
          <p className="section-copy">{city.populationHint} — فريقنا يصل إلى: {city.neighborhoodSignals.join("، ")}.</p>
          <div className="button-row wave-actions">
            {sameGovernorate.map((c) => (
              <Link key={c.slug} className="ghost-cta" href={`/ar/${c.slug}/${service.slug}`}>
                {service.ar} في {c.ar} <ArrowLeft size={15} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">باقات قريبة</span>
          <h2 className="section-title">خدمات Asmaa Video الأخرى في {city.ar}</h2>
          <div className="addons-grid">
            {otherServices.map((s) => (
              <article className="addon-card" key={s.slug}>
                <h3>{s.ar}</h3>
                <p className="addon-price">{s.price} ريال</p>
                <p className="addon-desc">{s.shortDescAr}</p>
                <Link className="ghost-cta" href={`/ar/${city.slug}/${s.slug}`} style={{ marginTop: "auto" }}>
                  افتحي الصفحة <ArrowLeft size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="eyebrow">خطوتك التالية</span>
          <h2 className="section-title">احجزي {service.ar} في {city.ar} الآن</h2>
          <div className="button-row">
            <a className="cta" href={whatsappLink(`${sourceLabel}-final`)} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> واتساب مباشر
            </a>
            <a className="ghost-cta" href={`tel:+${whatsappNumber}`}>
              <Phone size={18} /> اتصلي بنا
            </a>
            <Link className="ghost-cta" href="/packages">
              الباقات التفاعلية <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

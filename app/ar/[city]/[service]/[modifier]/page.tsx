import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, Download, MessageCircle, Phone } from "lucide-react";
import { JsonLd } from "../../../../../components/JsonLd";
import { instagramUrl, tiktokUrl, whatsappLink, whatsappNumber } from "../../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../../lib/metadata";
import {
  allCityServiceModifierTriples,
  pickPhrase,
  seoCities,
  seoIntroBank,
  seoModifierPhraseBank,
  seoModifiers,
  seoServices
} from "../../../../../lib/seo-grid";
import { SiteHeader } from "../../../../../components/SiteHeader";
import { SiteFooter } from "../../../../../components/SiteFooter";

type Props = { params: Promise<{ city: string; service: string; modifier: string }> };

export function generateStaticParams() {
  return allCityServiceModifierTriples().map(({ city, service, modifier }) => ({
    city: city.slug,
    service: service.slug,
    modifier: modifier.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug, modifier: modifierSlug } = await params;
  const city = seoCities.find((c) => c.slug === citySlug);
  const service = seoServices.find((s) => s.slug === serviceSlug);
  const modifier = seoModifiers.find((m) => m.slug === modifierSlug);
  if (!city || !service || !modifier) return { title: "Asmaa Video" };

  const title = `${modifier.ar} ${service.ar} في ${city.ar} ٢٠٢٦ | Asmaa Video`;
  const desc = `${modifier.ar} ${service.ar} في ${city.ar}: ${service.shortDescAr} من ${service.price} ريال — Asmaa Video بفريق نسائي مرخص.`;

  return {
    title: { absolute: title },
    description: desc,
    alternates: {
      canonical: `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}`,
      languages: {
        "ar-SA": `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}`,
        "x-default": `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}`
      }
    },
    openGraph: {
      title,
      description: desc,
      url: `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}`,
      siteName: "Asmaa Video",
      images: socialPreviewImages,
      type: "website",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(title, desc),
    robots: { index: true, follow: true }
  };
}

export default async function SeoCityServiceModifierPage({ params }: Props) {
  const { city: citySlug, service: serviceSlug, modifier: modifierSlug } = await params;
  const city = seoCities.find((c) => c.slug === citySlug);
  const service = seoServices.find((s) => s.slug === serviceSlug);
  const modifier = seoModifiers.find((m) => m.slug === modifierSlug);
  if (!city || !service || !modifier) notFound();

  const seed = `${city.slug}-${service.slug}-${modifier.slug}`;
  const intro = pickPhrase(seed, seoIntroBank)
    .replace(/\{city\}/g, city.ar)
    .replace(/\{service\}/g, `${modifier.ar} ${service.ar}`);
  const modifierBank = seoModifierPhraseBank[modifier.intent] ?? seoModifierPhraseBank.trust;
  const modifierNote = pickPhrase(seed, modifierBank);
  const trustNote = pickPhrase(`${seed}-trust`, seoModifierPhraseBank.trust);

  const h1 = `${modifier.ar} ${service.ar} في ${city.ar}`;
  const sourceLabel = `seo-${city.slug}-${service.slug}-${modifier.slug}`;

  const otherModifiers = seoModifiers.filter((m) => m.slug !== modifier.slug).slice(0, 4);
  const otherServices = seoServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}#service`,
        name: `${modifier.ar} ${service.ar} في ${city.ar}`,
        serviceType: `${service.en} (${modifier.en})`,
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
          url: "https://asmaa.video/packages"
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Video", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: city.ar, item: `https://asmaa.video/${city.slug.replace(/-/g, "")}` },
          { "@type": "ListItem", position: 3, name: service.ar, item: `https://asmaa.video/ar/${city.slug}/${service.slug}` },
          { "@type": "ListItem", position: 4, name: modifier.ar, item: `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}` }
        ]
      }
    ]
  };

  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={serviceJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href={`/ar/${city.slug}/${service.slug}`}>
              ← {service.ar} في {city.ar}
            </Link>
            <span className="eyebrow">{city.ar} / {service.ar} / {modifier.ar}</span>
            <h1 className="section-title">{h1}</h1>
            <p className="section-copy">{intro}</p>
            <p className="section-copy" style={{ marginTop: 12 }}>{modifierNote}</p>

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
            </div>

            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink(sourceLabel)} target="_blank" rel="noreferrer">
                اسألي عن {modifier.ar} {service.ar} في {city.ar} <MessageCircle size={18} />
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
          <span className="eyebrow">لماذا نحن</span>
          <h2 className="section-title">ضمانات Asmaa Video في {city.ar}</h2>
          <p className="section-copy">{trustNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">روابط ذات صلة</span>
          <h2 className="section-title">استكشفي خيارات أخرى في {city.ar}</h2>
          <div className="button-row wave-actions">
            {otherModifiers.map((m) => (
              <Link key={m.slug} className="ghost-cta" href={`/ar/${city.slug}/${service.slug}/${m.slug}`}>
                {m.ar} {service.ar} <ArrowLeft size={15} />
              </Link>
            ))}
            {otherServices.map((s) => (
              <Link key={s.slug} className="ghost-cta" href={`/ar/${city.slug}/${s.slug}`}>
                {s.ar} في {city.ar} <ArrowLeft size={15} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="eyebrow">احجزي الآن</span>
          <h2 className="section-title">{modifier.ar} {service.ar} في {city.ar}</h2>
          <div className="button-row">
            <a className="cta" href={whatsappLink(`${sourceLabel}-final`)} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> واتساب مباشر
            </a>
            <a className="ghost-cta" href={`tel:+${whatsappNumber}`}>
              <Phone size={18} /> اتصلي بنا
            </a>
            <Link className="ghost-cta" href="/packages">
              الباقات <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

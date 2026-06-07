import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MessageCircle } from "lucide-react";
import { JsonLd } from "../../../../components/JsonLd";
import { whatsappLink, whatsappNumber } from "../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../lib/metadata";
import { allEnCityServicePairs, seoCities, seoServices } from "../../../../lib/seo-grid";
import { SiteHeader } from "../../../../components/SiteHeader";
import { SiteFooter } from "../../../../components/SiteFooter";

type Props = { params: Promise<{ city: string; service: string }> };
export function generateStaticParams() { return allEnCityServicePairs().map(({ city, service }) => ({ city: city.slug, service: service.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: c, service: s } = await params;
  const city = seoCities.find((x) => x.slug === c);
  const service = seoServices.find((x) => x.slug === s);
  if (!city || !service) return { title: "Asmaa Studio" };
  const title = `${service.en} in ${city.en}, Saudi Arabia | Asmaa Studio`;
  const desc = `${service.en} in ${city.en}, Eastern Province. Women-only crew, ministry-licensed, from ${service.price} SAR. Same-day WhatsApp reply.`;
  return {
    title: { absolute: title }, description: desc,
    alternates: { canonical: `https://asmaa.video/en/${city.slug}/${service.slug}`, languages: { "en": `https://asmaa.video/en/${city.slug}/${service.slug}`, "ar-SA": `https://asmaa.video/ar/${city.slug}/${service.slug}`, "x-default": `https://asmaa.video/ar/${city.slug}/${service.slug}` } },
    openGraph: { title, description: desc, url: `https://asmaa.video/en/${city.slug}/${service.slug}`, siteName: "Asmaa Studio", images: socialPreviewImages, type: "website", locale: "en" },
    twitter: twitterMetadata(title, desc), robots: { index: true, follow: true }
  };
}

export default async function EnCityServicePage({ params }: Props) {
  const { city: c, service: s } = await params;
  const city = seoCities.find((x) => x.slug === c);
  const service = seoServices.find((x) => x.slug === s);
  if (!city || !service) notFound();
  return (
    <main className="page-shell" lang="en" dir="ltr">
      <SiteHeader />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "Service", "@id": `https://asmaa.video/en/${city.slug}/${service.slug}#service`, name: `${service.en} in ${city.en}`, serviceType: service.en, inLanguage: ["en", "ar-SA"], provider: { "@type": "Organization", "@id": "https://asmaa.video/#organization", name: "Asmaa Studio", telephone: `+${whatsappNumber}` }, areaServed: { "@type": "City", name: city.en, alternateName: city.ar, containedInPlace: { "@type": "AdministrativeArea", name: "Eastern Province, Saudi Arabia" } }, offers: { "@type": "Offer", price: service.price, priceCurrency: "SAR", url: "https://asmaa.video/packages" } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: city.en, item: `https://asmaa.video/en/${city.slug}` },
          { "@type": "ListItem", position: 3, name: service.en, item: `https://asmaa.video/en/${city.slug}/${service.slug}` }
        ]}
      ]}} />
      <section className="section city-hero-20x"><div className="section-inner city-hero-grid"><div>
        <Link className="ghost-cta" href="/">Back to home</Link>
        <span className="eyebrow">{city.governorate === "alahsa" ? "Al-Ahsa Governorate" : "Eastern Province"} / {city.en}</span>
        <h1 className="section-title">{service.en} in {city.en}, Saudi Arabia</h1>
        <p className="section-copy">Asmaa Studio delivers {service.en.toLowerCase()} in {city.en} with a fully women-only crew, ministry-licensed. Prices start at {service.price} SAR. Neighbourhoods covered: {city.neighborhoodSignals.slice(0, 3).join(", ")}.</p>
        <p className="section-copy" style={{ marginTop: 12 }}>Service highlight: {service.shortDescAr} ({service.durationAr}).</p>
        <div className="button-row" style={{ marginTop: 28 }}>
          <a className="cta" href={whatsappLink(`en-${city.slug}-${service.slug}`)} target="_blank" rel="noreferrer">WhatsApp Asmaa about {service.en} <MessageCircle size={18} /></a>
          <Link className="ghost-cta" href="/packages"><CalendarDays size={18} /> Interactive packages</Link>
          <Link className="ghost-cta" href={`/ar/${city.slug}/${service.slug}`}>العربية</Link>
        </div>
      </div></div></section>
      <section className="section"><div className="section-inner">
        <span className="eyebrow">Related services in {city.en}</span>
        <h2 className="section-title">Other Asmaa Studio offerings</h2>
        <div className="button-row wave-actions">
          {seoServices.filter((x) => x.slug !== service.slug).slice(0, 4).map((x) => (
            <Link key={x.slug} className="ghost-cta" href={`/en/${city.slug}/${x.slug}`}>{x.en} <ArrowLeft size={15} /></Link>
          ))}
        </div>
      </div></section>
    <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MessageCircle } from "lucide-react";
import { JsonLd } from "../../../../../components/JsonLd";
import { whatsappLink, whatsappNumber } from "../../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../../lib/metadata";
import { allEnCityServiceModifierTriples, seoCities, seoModifiers, seoServices } from "../../../../../lib/seo-grid";
import { SiteHeader } from "../../../../../components/SiteHeader";
import { SiteFooter } from "../../../../../components/SiteFooter";

type Props = { params: Promise<{ city: string; service: string; modifier: string }> };
export function generateStaticParams() { return allEnCityServiceModifierTriples().map(({ city, service, modifier }) => ({ city: city.slug, service: service.slug, modifier: modifier.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: c, service: s, modifier: m } = await params;
  const city = seoCities.find((x) => x.slug === c);
  const service = seoServices.find((x) => x.slug === s);
  const modifier = seoModifiers.find((x) => x.slug === m);
  if (!city || !service || !modifier) return { title: "Asmaa Video" };
  const title = `${modifier.en} ${service.en} in ${city.en} 2026 | Asmaa Video`;
  const desc = `${modifier.en} ${service.en} in ${city.en}, Saudi Arabia. Women-only crew, ministry-licensed. From ${service.price} SAR — same-day WhatsApp reply.`;
  return {
    title: { absolute: title }, description: desc,
    alternates: { canonical: `https://asmaa.video/en/${city.slug}/${service.slug}/${modifier.slug}`, languages: { "en": `https://asmaa.video/en/${city.slug}/${service.slug}/${modifier.slug}`, "ar-SA": `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}`, "x-default": `https://asmaa.video/ar/${city.slug}/${service.slug}/${modifier.slug}` } },
    openGraph: { title, description: desc, url: `https://asmaa.video/en/${city.slug}/${service.slug}/${modifier.slug}`, siteName: "Asmaa Video", images: socialPreviewImages, type: "website", locale: "en" },
    twitter: twitterMetadata(title, desc), robots: { index: true, follow: true }
  };
}

export default async function EnDeepPage({ params }: Props) {
  const { city: c, service: s, modifier: m } = await params;
  const city = seoCities.find((x) => x.slug === c);
  const service = seoServices.find((x) => x.slug === s);
  const modifier = seoModifiers.find((x) => x.slug === m);
  if (!city || !service || !modifier) notFound();
  return (
    <main className="page-shell" lang="en" dir="ltr">
      <SiteHeader />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "Service", "@id": `https://asmaa.video/en/${city.slug}/${service.slug}/${modifier.slug}#service`, name: `${modifier.en} ${service.en} in ${city.en}`, serviceType: `${service.en} (${modifier.en})`, inLanguage: ["en", "ar-SA"], provider: { "@type": "Organization", "@id": "https://asmaa.video/#organization", name: "Asmaa Video", telephone: `+${whatsappNumber}` }, areaServed: { "@type": "City", name: city.en, alternateName: city.ar, containedInPlace: { "@type": "AdministrativeArea", name: "Eastern Province, Saudi Arabia" } }, offers: { "@type": "Offer", price: service.price, priceCurrency: "SAR", url: "https://asmaa.video/packages" } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Video", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: city.en, item: `https://asmaa.video/en/${city.slug}` },
          { "@type": "ListItem", position: 3, name: service.en, item: `https://asmaa.video/en/${city.slug}/${service.slug}` },
          { "@type": "ListItem", position: 4, name: modifier.en, item: `https://asmaa.video/en/${city.slug}/${service.slug}/${modifier.slug}` }
        ]}
      ]}} />
      <section className="section city-hero-20x"><div className="section-inner city-hero-grid"><div>
        <Link className="ghost-cta" href={`/en/${city.slug}/${service.slug}`}>← {service.en} in {city.en}</Link>
        <span className="eyebrow">{city.en} / {service.en} / {modifier.en}</span>
        <h1 className="section-title">{modifier.en} {service.en} in {city.en}</h1>
        <p className="section-copy">Looking for {modifier.en.toLowerCase()} {service.en.toLowerCase()} in {city.en}? Asmaa Video delivers it with a women-only crew, ministry-licensed, transparent pricing. Service from {service.price} SAR.</p>
        <p className="section-copy" style={{ marginTop: 12 }}>{service.shortDescAr} — {service.durationAr}.</p>
        <div className="button-row" style={{ marginTop: 28 }}>
          <a className="cta" href={whatsappLink(`en-${city.slug}-${service.slug}-${modifier.slug}`)} target="_blank" rel="noreferrer">WhatsApp Asmaa <MessageCircle size={18} /></a>
          <Link className="ghost-cta" href="/packages"><CalendarDays size={18} /> Interactive packages</Link>
          <Link className="ghost-cta" href={`/ar/${city.slug}/${service.slug}/${modifier.slug}`}>العربية</Link>
        </div>
      </div></div></section>
    <SiteFooter />
    </main>
  );
}

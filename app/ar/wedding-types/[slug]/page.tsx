import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MessageCircle } from "lucide-react";
import { JsonLd } from "../../../../components/JsonLd";
import { whatsappLink, whatsappNumber } from "../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../lib/metadata";
import { allWeddingTypePairs, seoServices, seoWeddingTypes } from "../../../../lib/seo-grid";
import { SiteHeader } from "../../../../components/SiteHeader";
import { SiteFooter } from "../../../../components/SiteFooter";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return allWeddingTypePairs().map((p) => ({ slug: p.slug })); }

function parse(slug: string) {
  for (const type of seoWeddingTypes) {
    if (slug.startsWith(`${type.slug}-`)) {
      const serviceSlug = slug.slice(type.slug.length + 1);
      const service = seoServices.find((s) => s.slug === serviceSlug);
      if (service) return { type, service };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = parse(slug);
  if (!p) return { title: "Asmaa Studio" };
  const title = `${p.service.ar} لـ${p.type.ar} | Asmaa Studio`;
  const desc = `${p.service.ar} مصمّمة لـ${p.type.ar}: ${p.type.note}. السعر من ${p.service.price} ريال.`;
  return {
    title: { absolute: title }, description: desc,
    alternates: { canonical: `https://asmaa.video/ar/wedding-types/${slug}`, languages: { "ar-SA": `https://asmaa.video/ar/wedding-types/${slug}`, "x-default": `https://asmaa.video/ar/wedding-types/${slug}` } },
    openGraph: { title, description: desc, url: `https://asmaa.video/ar/wedding-types/${slug}`, siteName: "Asmaa Studio", images: socialPreviewImages, type: "website", locale: "ar_SA" },
    twitter: twitterMetadata(title, desc), robots: { index: true, follow: true }
  };
}

export default async function WeddingTypePage({ params }: Props) {
  const { slug } = await params;
  const p = parse(slug);
  if (!p) notFound();
  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "Service", "@id": `https://asmaa.video/ar/wedding-types/${slug}#service`, name: `${p.service.ar} لـ${p.type.ar}`, serviceType: `${p.service.en} for ${p.type.en}`, inLanguage: ["ar-SA", "en"], provider: { "@type": "Organization", "@id": "https://asmaa.video/#organization", name: "Asmaa Studio", telephone: `+${whatsappNumber}` }, offers: { "@type": "Offer", price: p.service.price, priceCurrency: "SAR", url: "https://asmaa.video/packages" } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: "حسب نوع المناسبة", item: "https://asmaa.video/ar/wedding-types" },
          { "@type": "ListItem", position: 3, name: `${p.type.ar} - ${p.service.ar}`, item: `https://asmaa.video/ar/wedding-types/${slug}` }
        ]}
      ]}} />
      <section className="section city-hero-20x"><div className="section-inner city-hero-grid"><div>
        <Link className="ghost-cta" href="/packages">الباقات التفاعلية</Link>
        <span className="eyebrow">{p.type.ar}</span>
        <h1 className="section-title">{p.service.ar} مصمّمة لـ{p.type.ar}</h1>
        <p className="section-copy">{p.type.note}</p>
        <div className="button-row" style={{ marginTop: 28 }}>
          <a className="cta" href={whatsappLink(`wt-${slug}`)} target="_blank" rel="noreferrer">اسألي عن {p.service.ar} <MessageCircle size={18} /></a>
          <Link className="ghost-cta" href="/packages"><CalendarDays size={18} /> الباقات التفاعلية</Link>
        </div>
      </div></div></section>
      <section className="section"><div className="section-inner">
        <span className="eyebrow">خدمات أخرى لـ{p.type.ar}</span>
        <h2 className="section-title">روابط ذات صلة</h2>
        <div className="button-row wave-actions">
          {seoServices.filter((s) => s.slug !== p.service.slug).slice(0, 4).map((s) => (
            <Link key={s.slug} className="ghost-cta" href={`/ar/wedding-types/${p.type.slug}-${s.slug}`}>{s.ar} <ArrowLeft size={15} /></Link>
          ))}
        </div>
      </div></section>
    <SiteFooter />
    </main>
  );
}

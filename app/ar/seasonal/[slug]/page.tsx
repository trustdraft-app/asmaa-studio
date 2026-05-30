import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MessageCircle } from "lucide-react";
import { JsonLd } from "../../../../components/JsonLd";
import { whatsappLink, whatsappNumber } from "../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../lib/metadata";
import { allSeasonalPairs, pickPhrase, seoServices, seoIntroBank, seoSeasonalMonths } from "../../../../lib/seo-grid";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allSeasonalPairs().map((p) => ({ slug: p.slug }));
}

function parse(slug: string) {
  for (const month of seoSeasonalMonths) {
    if (slug.startsWith(`${month.slug}-`)) {
      const serviceSlug = slug.slice(month.slug.length + 1);
      const service = seoServices.find((s) => s.slug === serviceSlug);
      if (service) return { month, service };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = parse(slug);
  if (!p) return { title: "Asmaa Studio" };
  const title = `${p.service.ar} في ${p.month.ar} — موسم ٢٠٢٦ | Asmaa Studio`;
  const desc = `${p.service.ar} في شهر ${p.month.ar}: ${p.month.note}. السعر من ${p.service.price} ريال — Asmaa Studio بفريق نسائي مرخص.`;
  return {
    title: { absolute: title }, description: desc,
    alternates: { canonical: `https://asmaa.video/ar/seasonal/${slug}`, languages: { "ar-SA": `https://asmaa.video/ar/seasonal/${slug}`, "x-default": `https://asmaa.video/ar/seasonal/${slug}` } },
    openGraph: { title, description: desc, url: `https://asmaa.video/ar/seasonal/${slug}`, siteName: "Asmaa Studio", images: socialPreviewImages, type: "website", locale: "ar_SA" },
    twitter: twitterMetadata(title, desc),
    robots: { index: true, follow: true }
  };
}

export default async function SeasonalPage({ params }: Props) {
  const { slug } = await params;
  const p = parse(slug);
  if (!p) notFound();
  const seed = `seasonal-${slug}`;
  const intro = pickPhrase(seed, seoIntroBank).replace(/\{city\}/g, `موسم ${p.month.ar}`).replace(/\{service\}/g, p.service.ar);
  return (
    <main className="page-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "Service", "@id": `https://asmaa.video/ar/seasonal/${slug}#service`, name: `${p.service.ar} موسم ${p.month.ar}`, serviceType: `${p.service.en} (${p.month.en} season)`, inLanguage: ["ar-SA", "en"], provider: { "@type": "Organization", "@id": "https://asmaa.video/#organization", name: "Asmaa Studio", url: "https://asmaa.video/", telephone: `+${whatsappNumber}` }, offers: { "@type": "Offer", price: p.service.price, priceCurrency: "SAR", url: "https://asmaa.video/packages" } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: "العروض الموسمية", item: "https://asmaa.video/ar/seasonal" },
          { "@type": "ListItem", position: 3, name: `${p.month.ar} - ${p.service.ar}`, item: `https://asmaa.video/ar/seasonal/${slug}` }
        ]}
      ]}} />
      <section className="section city-hero-20x"><div className="section-inner city-hero-grid"><div>
        <Link className="ghost-cta" href="/packages">الباقات التفاعلية</Link>
        <span className="eyebrow">موسم {p.month.ar} ٢٠٢٦</span>
        <h1 className="section-title">{p.service.ar} في {p.month.ar} — موسم الزواجات الشرقي</h1>
        <p className="section-copy">{p.month.note}. {intro}</p>
        <div className="button-row" style={{ marginTop: 28 }}>
          <a className="cta" href={whatsappLink(`seasonal-${slug}`)} target="_blank" rel="noreferrer">احجزي تاريخك في {p.month.ar} <MessageCircle size={18} /></a>
          <Link className="ghost-cta" href="/packages"><CalendarDays size={18} /> الباقات التفاعلية</Link>
        </div>
      </div></div></section>
      <section className="section"><div className="section-inner">
        <span className="eyebrow">روابط ذات صلة</span>
        <h2 className="section-title">خدمات أخرى في {p.month.ar}</h2>
        <div className="button-row wave-actions">
          {seoServices.filter((s) => s.slug !== p.service.slug).slice(0, 4).map((s) => (
            <Link key={s.slug} className="ghost-cta" href={`/ar/seasonal/${p.month.slug}-${s.slug}`}>{s.ar} <ArrowLeft size={15} /></Link>
          ))}
        </div>
      </div></section>
    </main>
  );
}

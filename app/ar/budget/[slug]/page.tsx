import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MessageCircle } from "lucide-react";
import { JsonLd } from "../../../../components/JsonLd";
import { whatsappLink, whatsappNumber } from "../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../lib/metadata";
import { allBudgetPairs, seoServices, seoBudgetTiers } from "../../../../lib/seo-grid";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return allBudgetPairs().map((p) => ({ slug: p.slug })); }

function parse(slug: string) {
  for (const tier of seoBudgetTiers) {
    if (slug.startsWith(`${tier.slug}-`)) {
      const serviceSlug = slug.slice(tier.slug.length + 1);
      const service = seoServices.find((s) => s.slug === serviceSlug);
      if (service) return { tier, service };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = parse(slug);
  if (!p) return { title: "Asmaa Studio" };
  const title = `${p.service.ar} بميزانية ${p.tier.ar} | Asmaa Studio`;
  const desc = `${p.service.ar} ضمن ميزانية ${p.tier.ar}. ${p.tier.note} — Asmaa Studio بأسعار شفافة من الـ PDF.`;
  return {
    title: { absolute: title }, description: desc,
    alternates: { canonical: `https://asmaa.video/ar/budget/${slug}`, languages: { "ar-SA": `https://asmaa.video/ar/budget/${slug}`, "x-default": `https://asmaa.video/ar/budget/${slug}` } },
    openGraph: { title, description: desc, url: `https://asmaa.video/ar/budget/${slug}`, siteName: "Asmaa Studio", images: socialPreviewImages, type: "website", locale: "ar_SA" },
    twitter: twitterMetadata(title, desc), robots: { index: true, follow: true }
  };
}

export default async function BudgetPage({ params }: Props) {
  const { slug } = await params;
  const p = parse(slug);
  if (!p) notFound();
  return (
    <main className="page-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "Service", "@id": `https://asmaa.video/ar/budget/${slug}#service`, name: `${p.service.ar} - ${p.tier.ar}`, serviceType: `${p.service.en} budget tier ${p.tier.en}`, inLanguage: ["ar-SA", "en"], provider: { "@type": "Organization", "@id": "https://asmaa.video/#organization", name: "Asmaa Studio", telephone: `+${whatsappNumber}` }, offers: { "@type": "Offer", price: p.service.price, priceCurrency: "SAR", url: "https://asmaa.video/packages" } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: "حسب الميزانية", item: "https://asmaa.video/ar/budget" },
          { "@type": "ListItem", position: 3, name: `${p.tier.ar} - ${p.service.ar}`, item: `https://asmaa.video/ar/budget/${slug}` }
        ]}
      ]}} />
      <section className="section city-hero-20x"><div className="section-inner city-hero-grid"><div>
        <Link className="ghost-cta" href="/packages">الباقات التفاعلية</Link>
        <span className="eyebrow">ميزانية {p.tier.ar}</span>
        <h1 className="section-title">{p.service.ar} ضمن ميزانية {p.tier.ar}</h1>
        <p className="section-copy">{p.tier.note}</p>
        <p className="section-copy" style={{ marginTop: 12 }}>السعر الأساسي لـ{p.service.ar}: {p.service.price} ريال — {p.service.shortDescAr}</p>
        <div className="button-row" style={{ marginTop: 28 }}>
          <a className="cta" href={whatsappLink(`budget-${slug}`)} target="_blank" rel="noreferrer">احسبي ميزانيتك معنا <MessageCircle size={18} /></a>
          <Link className="ghost-cta" href="/packages"><CalendarDays size={18} /> الباقات + حاسبة الإضافات</Link>
        </div>
      </div></div></section>
      <section className="section"><div className="section-inner">
        <span className="eyebrow">روابط ذات صلة</span>
        <h2 className="section-title">خدمات أخرى ضمن {p.tier.ar}</h2>
        <div className="button-row wave-actions">
          {seoServices.filter((s) => s.slug !== p.service.slug && s.price >= p.tier.min && s.price <= p.tier.max).slice(0, 4).map((s) => (
            <Link key={s.slug} className="ghost-cta" href={`/ar/budget/${p.tier.slug}-${s.slug}`}>{s.ar} <ArrowLeft size={15} /></Link>
          ))}
        </div>
      </div></section>
    </main>
  );
}

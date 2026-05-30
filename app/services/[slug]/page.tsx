import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, MessageCircle } from "lucide-react";
import { JsonLd } from "../../../components/JsonLd";
import { instagramUrl, packages, tiktokUrl, whatsappLink, whatsappNumber } from "../../../lib/content";
import { servicePageBySlug, servicePages } from "../../../lib/services";
import { socialPreviewImages, twitterMetadata } from "../../../lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageBySlug(slug);
  if (!page) return { title: "خدمات Asmaa Studio" };

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: {
      canonical: `https://asmaa.video/services/${page.slug}`,
      languages: {
        "ar-SA": `https://asmaa.video/services/${page.slug}`,
        "x-default": `https://asmaa.video/services/${page.slug}`
      }
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://asmaa.video/services/${page.slug}`,
      siteName: "Asmaa Studio",
      images: socialPreviewImages,
      type: "website",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(page.metaTitle, page.metaDescription)
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = servicePageBySlug(slug);
  if (!page) notFound();

  const pkg = page.packageId ? packages.find((p) => p.id === page.packageId) : null;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://asmaa.video/services/${page.slug}#service`,
    name: page.h1,
    serviceType: page.en,
    inLanguage: ["ar-SA", "en"],
    description: page.metaDescription,
    provider: {
      "@type": "Organization",
      "@id": "https://asmaa.video/#organization",
      name: "Asmaa Studio",
      url: "https://asmaa.video/",
      telephone: `+${whatsappNumber}`,
      sameAs: [instagramUrl, tiktokUrl]
    },
    areaServed: [
      { "@type": "City", name: "Al Ahsa", alternateName: "الأحساء" },
      { "@type": "City", name: "Dammam", alternateName: "الدمام" },
      { "@type": "City", name: "Khobar", alternateName: "الخبر" }
    ],
    ...(pkg
      ? {
          offers: {
            "@type": "Offer",
            name: pkg.name,
            price: pkg.price,
            priceCurrency: "SAR",
            url: `https://asmaa.video/reserve?package=${pkg.id}`
          }
        }
      : {})
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
      { "@type": "ListItem", position: 2, name: "الخدمات", item: "https://asmaa.video/services" },
      { "@type": "ListItem", position: 3, name: page.ar, item: `https://asmaa.video/services/${page.slug}` }
    ]
  };

  return (
    <main className="page-shell">
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/">
              <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
            </Link>
            <span className="eyebrow">{page.en}</span>
            <h1 className="section-title">{page.h1}</h1>
            <p className="section-copy">{page.intro}</p>

            <div className="city-intent">
              <article>
                <CalendarDays size={22} />
                <strong>المدة</strong>
                <span>{page.duration}</span>
              </article>
              <article>
                <Check size={22} />
                <strong>السعر</strong>
                <span>{page.priceLabel}</span>
              </article>
            </div>

            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink(`service-${page.slug}`)} target="_blank" rel="noreferrer">
                اسألي عن {page.ar} <MessageCircle size={18} />
              </a>
              <Link className="ghost-cta" href="/packages">
                الباقات التفاعلية <CalendarDays size={18} />
              </Link>
              <Link className="ghost-cta" href={pkg ? `/reserve?package=${pkg.id}` : "/reserve"}>
                رابط العروس <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href="/packages-asmaa-studio.pdf" download="Asmaa-Studio-Packages.pdf">
                PDF <ArrowLeft size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">ما تتضمنه الخدمة</span>
          <h2 className="section-title">أهم لحظات {page.ar} في فيلم Asmaa Studio</h2>
          <ul className="payment-terms-grid" aria-label="مكونات الخدمة">
            {page.highlights.map((h, i) => (
              <li className="payment-step" key={i}>
                <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                <p>{h}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">من تناسبها</span>
          <h2 className="section-title">{page.whoFor}</h2>
          <p className="section-copy">المخرجات: {page.deliverable}.</p>
          <div className="button-row wave-actions">
            <a className="cta" href={whatsappLink(`service-${page.slug}-bottom`)} target="_blank" rel="noreferrer">
              تحققي من توفر التاريخ <MessageCircle size={18} />
            </a>
            <Link className="ghost-cta" href="/portfolio">
              شاهدي الألبوم <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">أسئلة متكررة</span>
          <h2 className="section-title">إجابات سريعة عن {page.ar}</h2>
          <div className="payment-terms-grid">
            {page.faqs.map((faq, i) => (
              <article className="payment-step" key={i} style={{ paddingLeft: 22 }}>
                <h3 style={{ color: "#fff6df", marginBottom: 8 }}>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle, Search } from "lucide-react";
import { JsonLd } from "../../../components/JsonLd";
import { packages, serviceAreas, whatsappLink } from "../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../lib/metadata";
import { seoGuidePageBySlug, seoGuidePages } from "../../../lib/seo-pages";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoGuidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = seoGuidePageBySlug(slug);

  if (!page) {
    return {
      title: "دليل تصوير الزواجات"
    };
  }

  return {
    title: {
      absolute: page.metaTitle
    },
    description: page.metaDescription,
    alternates: {
      canonical: `https://asmaa.video/guides/${page.slug}`
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://asmaa.video/guides/${page.slug}`,
      siteName: "Asmaa Video",
      images: socialPreviewImages,
      type: "article",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(page.metaTitle, page.metaDescription)
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = seoGuidePageBySlug(slug);

  if (!page) notFound();

  const cityMap = new Map(serviceAreas.map((city) => [city.slug, city]));
  const packageMap = new Map(packages.map((item) => [item.id, item]));
  const pagePackages = page.packageIds.map((id) => packageMap.get(id)).filter(Boolean);
  const relatedGuides = seoGuidePages
    .filter((item) => item.slug !== page.slug)
    .filter((item) => item.citySlugs.some((city) => page.citySlugs.includes(city)) || item.packageIds.some((id) => page.packageIds.includes(id)))
    .slice(0, 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://asmaa.video/guides/${page.slug}#article`,
    headline: page.h1,
    description: page.metaDescription,
    inLanguage: "ar-SA",
    mainEntityOfPage: `https://asmaa.video/guides/${page.slug}`,
    image: "https://asmaa.video/brand/asmaa-og.jpg",
    datePublished: "2026-05-28",
    dateModified: "2026-05-29",
    author: {
      "@type": "Organization",
      "@id": "https://asmaa.video/#organization",
      name: "Asmaa Video",
      url: "https://asmaa.video"
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://asmaa.video/#organization",
      name: "Asmaa Video",
      logo: {
        "@type": "ImageObject",
        url: "https://asmaa.video/brand/asmaa-logo-square.png"
      }
    },
    about: [
      ...page.citySlugs.map((citySlug) => cityMap.get(citySlug)?.ar).filter(Boolean),
      ...page.packageIds.map((packageId) => packages.find((item) => item.id === packageId)?.name).filter(Boolean)
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Asmaa Video",
        item: "https://asmaa.video"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "دليل التصوير",
        item: "https://asmaa.video/guides"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `https://asmaa.video/guides/${page.slug}`
      }
    ]
  };

  return (
    <main className="page-shell guide-page">
      <SiteHeader />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x guide-article-hero">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href="/guides">
              دليل التصوير
            </Link>
            <span className="eyebrow">{page.title}</span>
            <h1 className="section-title">{page.h1}</h1>
            <p className="section-copy">{page.summary}</p>
            <div className="city-intent">
              <article>
                <Search size={22} />
                <strong>نية البحث</strong>
                <span>{page.searchIntent}</span>
              </article>
              <article>
                <CalendarDays size={22} />
                <strong>ما يختصر القرار</strong>
                <span>{page.promise}</span>
              </article>
            </div>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve">
                رابط العروس <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink(`guide-${page.slug}`)} target="_blank" rel="noreferrer">
                واتساب مباشر <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card guide-command-card">
            <span>كلمات بحث مرتبطة</span>
            <h2>{page.citySlugs.map((city) => cityMap.get(city)?.ar).filter(Boolean).join(" / ")}</h2>
            <p>{page.metaDescription}</p>
            <div>
              {page.keyPhrases.map((phrase) => (
                <em key={phrase}>{phrase}</em>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section guide-content-section">
        <div className="section-inner guide-article-grid">
          <div className="guide-main-copy">
            {page.sections.map((section) => (
              <article className="guide-story-block" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                <div className="guide-bullet-grid">
                  {section.bullets.map((bullet) => (
                    <span key={bullet}>
                      <Check size={15} />
                      {bullet}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="guide-checklist">
            <span className="eyebrow">قبل إرسال الطلب</span>
            <h2>قائمة مختصرة للحجز</h2>
            <div className="city-wave-list">
              {page.checklist.map((item) => (
                <p key={item}>
                  <Check size={16} />
                  {item}
                </p>
              ))}
            </div>
            <Link className="cta" href="/reserve">
              إرسال التفاصيل <ArrowLeft size={18} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">باقات مرتبطة بهذا البحث</span>
          <h2 className="section-title">اختاري الباقة الأقرب للّحظات التي تريدين حفظها.</h2>
          <div className="packages-grid packages-grid-20x guide-package-grid">
            {pagePackages.map((item) =>
              item ? (
                <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
                  <header>
                    <small>بكج {item.id}</small>
                    <h3>{item.name}</h3>
                    <p className="price">{item.price} ريال</p>
                  </header>
                  <p>{item.summary}</p>
                  <div className="package-best">
                    <strong>مناسب لـ</strong>
                    <span>{item.bestFor}</span>
                  </div>
                  <div className="package-sequence">
                    {item.sequence.map((step) => (
                      <span key={step}>{step}</span>
                    ))}
                  </div>
                  <a href={whatsappLink(`guide-${page.slug}-package-${item.id}`)} target="_blank" rel="noreferrer">
                    اسألي عن هذا البكج <ArrowLeft size={16} />
                  </a>
                </article>
              ) : null
            )}
          </div>
        </div>
      </section>

      <section className="section guide-city-links">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">صفحات المدن</span>
            <h2>اختاري الصفحة الأقرب لموقع المناسبة.</h2>
            <div className="city-wave-list">
              {page.citySlugs.map((citySlug) => {
                const city = cityMap.get(citySlug);
                return city ? (
                  <p key={city.slug}>
                    <MapPin size={16} />
                    <Link href={`/${city.slug}`}>{city.headline}</Link>
                  </p>
                ) : null;
              })}
            </div>
          </article>
          <article>
            <span className="eyebrow">أسئلة سريعة</span>
            <div className="faq-grid guide-faq-grid">
              {page.faqs.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section guide-related-section">
        <div className="section-inner">
          <span className="eyebrow">صفحات قد تساعدك</span>
          <h2 className="section-title">استكملي القرار من زاوية أخرى.</h2>
          <div className="guide-card-grid guide-related-grid">
            {relatedGuides.map((item) => (
              <article className="guide-card" key={item.slug}>
                <span>{item.citySlugs.map((city) => cityMap.get(city)?.ar).filter(Boolean).join(" / ")}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link href={`/guides/${item.slug}`}>
                  فتح الصفحة <ArrowLeft size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

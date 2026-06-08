import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, Clock, MapPin, MessageCircle } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { packages, serviceAreas, whatsappLink } from "../lib/content";
import type { BlogPost } from "../lib/blog";

const SITE = "https://asmaa.video";

/**
 * Canonical renderer for every /blog and /ar/blog article. Pure server
 * component — zero client JS, survives the static-export prune. Emits
 * Article + FAQPage + BreadcrumbList JSON-LD inline (kept by the prune).
 */
export function BlogArticle({ post }: { post: BlogPost }) {
  const url = `${SITE}/blog/${post.slug}`;
  const cityMap = new Map(serviceAreas.map((city) => [city.slug, city]));
  const packageMap = new Map(packages.map((item) => [item.id, item]));
  const postPackages = post.relatedPackageIds.map((id) => packageMap.get(id)).filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    inLanguage: post.locale,
    mainEntityOfPage: url,
    image: `${SITE}/brand/asmaa-og.jpg`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    keywords: post.keyPhrases.join(", "),
    author: {
      "@type": "Organization",
      "@id": `${SITE}#business`,
      name: "Asmaa Studio",
      url: SITE
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE}#business`,
      name: "Asmaa Studio",
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` }
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: SITE },
      { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.h1, item: url }
    ]
  };

  return (
    <main className="page-shell guide-page" dir={post.dir}>
      <SiteHeader />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x guide-article-hero">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href="/blog">
              المدونة
            </Link>
            <span className="eyebrow">{post.eyebrow}</span>
            <h1 className="section-title">{post.h1}</h1>
            <p className="section-copy">{post.heroIntro}</p>
            <div className="city-intent">
              <article>
                <Clock size={22} />
                <strong>وقت القراءة</strong>
                <span>{post.readingTime}</span>
              </article>
              <article>
                <CalendarDays size={22} />
                <strong>محدّث</strong>
                <span>2026</span>
              </article>
            </div>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve">
                رابط العروس <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink(`blog-${post.slug}`)} target="_blank" rel="noreferrer">
                واتساب مباشر <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card guide-command-card">
            <span>كلمات بحث مرتبطة</span>
            <h2>{post.eyebrow}</h2>
            <p>{post.metaDescription}</p>
            <div>
              {post.keyPhrases.map((phrase) => (
                <em key={phrase}>{phrase}</em>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section guide-content-section">
        <div className="section-inner guide-article-grid">
          <div className="guide-main-copy">
            {post.sections.map((section) => (
              <article className="guide-story-block" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <div className="guide-bullet-grid">
                    {section.bullets.map((bullet) => (
                      <span key={bullet}>
                        <Check size={15} />
                        {bullet}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <aside className="guide-checklist">
            <span className="eyebrow">جاهزة للحجز؟</span>
            <h2>اختاري باقتك وأرسلي التفاصيل</h2>
            <div className="city-wave-list">
              {postPackages.map((item) =>
                item ? (
                  <p key={item.id}>
                    <Check size={16} />
                    {item.name} — {item.price} ريال
                  </p>
                ) : null
              )}
            </div>
            <Link className="cta" href="/packages">
              كل الباقات <ArrowLeft size={18} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section guide-city-links">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">صفحات المدن</span>
            <h2>اختاري الصفحة الأقرب لموقع المناسبة.</h2>
            <div className="city-wave-list">
              {post.relatedCitySlugs.map((citySlug) => {
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
            <span className="eyebrow">أسئلة شائعة</span>
            <div className="faq-grid guide-faq-grid">
              {post.faqs.map((faq) => (
                <article key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { blogPosts } from "../lib/blog";

const SITE = "https://asmaa.video";

/**
 * Shared listing for /blog and /ar/blog. Pure server component.
 */
export function BlogIndex({ basePath }: { basePath: "/blog" | "/ar/blog" }) {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مدونة أسماء ستوديو — تصوير الأعراس في المنطقة الشرقية",
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE}/blog/${post.slug}`,
      name: post.h1
    }))
  };

  return (
    <main className="page-shell guide-page" dir="rtl">
      <SiteHeader />
      <JsonLd data={itemListJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner">
          <span className="eyebrow">
            <BookOpen size={16} /> المدونة
          </span>
          <h1 className="section-title">مدونة تصوير الأعراس في المنطقة الشرقية</h1>
          <p className="section-copy">
            أدلة عملية للعروس: كيف تختارين مصورة زفاف، الفرق بين الباقات، وكم تكلفة تصوير الأفراح في
            الأحساء والدمام والخبر والقطيف. محتوى محدّث لعام 2026 من أسماء ستوديو — طاقم نسائي بالكامل.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="guide-card-grid">
            {blogPosts.map((post) => (
              <article className="guide-card" key={post.slug}>
                <span>
                  <Clock size={14} /> {post.readingTime}
                </span>
                <h2>{post.h1}</h2>
                <p>{post.metaDescription}</p>
                <Link href={`${basePath}/${post.slug}`}>
                  قراءة المقال <ArrowLeft size={15} />
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

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, CalendarDays, MapPin, Search } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { packages, serviceAreas } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { seoGuidePages } from "../../lib/seo-pages";

export const metadata: Metadata = {
  title: "دليل تصوير الزواجات والخطوبة",
  description:
    "دليل Asmaa Studio لتصوير الزواجات والخطوبة في الأحساء والدمام والخبر: باقات، تجهيزات، تفاصيل العروس، واختيار المصورة.",
  alternates: {
    canonical: "https://asmaa.video/guides"
  },
  openGraph: {
    title: "دليل تصوير الزواجات والخطوبة | Asmaa Studio",
    description: "صفحات عملية تساعد العروس على اختيار الباقة والمدينة وتجهيز تفاصيل الحجز.",
    url: "https://asmaa.video/guides",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "دليل تصوير الزواجات والخطوبة | Asmaa Studio",
    "صفحات عملية تساعد العروس على اختيار الباقة والمدينة وتجهيز تفاصيل الحجز."
  )
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://asmaa.video/guides#collection",
      name: "دليل تصوير الزواجات والخطوبة",
      url: "https://asmaa.video/guides",
      inLanguage: "ar-SA",
      mainEntity: {
        "@id": "https://asmaa.video/guides#item-list"
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://asmaa.video/guides#item-list",
      name: "صفحات دليل تصوير الزواجات والخطوبة",
      itemListElement: seoGuidePages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page.title,
        url: `https://asmaa.video/guides/${page.slug}`,
        description: page.metaDescription
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://asmaa.video/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "دليل تصوير الزواجات",
          item: "https://asmaa.video/guides"
        }
      ]
    }
  ]
};

export default function GuidesPage() {
  const cityMap = new Map(serviceAreas.map((city) => [city.slug, city]));

  return (
    <main className="page-shell guide-page">
      <JsonLd data={jsonLd} />

      <section className="section city-hero-20x guide-index-hero">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href="/">
              العودة للرئيسية
            </Link>
            <span className="eyebrow">دليل الحجز والبحث</span>
            <h1 className="section-title">صفحات تساعد العروس على اختيار الباقة والمدينة بثقة.</h1>
            <p className="section-copy">
              هذا الدليل مبني حول الأسئلة التي تظهر قبل الحجز: المدينة، نوع المناسبة، مدة التصوير،
              تفاصيل العروس، وشكل الفيديو النهائي. كل صفحة تقود إلى قرار واضح ورابط حجز مختصر.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve">
                افتحي رابط العروس <CalendarDays size={18} />
              </Link>
              <Link className="ghost-cta" href="/faq">
                الأسئلة الشائعة <Search size={18} />
              </Link>
            </div>
          </div>

          <aside className="city-command-card guide-command-card">
            <span>محتوى قابل للبحث</span>
            <h2>{seoGuidePages.length}</h2>
            <p>صفحة متخصصة تربط نية البحث بالباقات والمدن والخطوة التالية.</p>
            <div>
              {["الأحساء", "الدمام", "الخبر", "الزفة", "الخطوبة", "First Look"].map((item) => (
                <em key={item}>{item}</em>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section guide-directory-section">
        <div className="section-inner">
          <span className="eyebrow">صفحات الزيارات الجديدة</span>
          <h2 className="section-title">كل صفحة تخدم سؤالا مختلفا قبل الحجز.</h2>
          <div className="guide-card-grid">
            {seoGuidePages.map((page, index) => (
              <article className="guide-card" key={page.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <BookOpen size={24} strokeWidth={1.6} />
                <h3>{page.title}</h3>
                <p>{page.summary}</p>
                <div className="guide-meta-row">
                  {page.citySlugs.map((slug) => {
                    const city = cityMap.get(slug);
                    return city ? <em key={slug}>{city.ar}</em> : null;
                  })}
                </div>
                <Link href={`/guides/${page.slug}`}>
                  فتح الصفحة <ArrowLeft size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section guide-index-bottom">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">المدن الأساسية</span>
            <h2>ابدئي من المدينة إذا كان البحث محليا.</h2>
            <div className="city-wave-list">
              {serviceAreas.map((city) => (
                <p key={city.slug}>
                  <MapPin size={16} />
                  <Link href={`/${city.slug}`}>{city.headline}</Link>
                </p>
              ))}
            </div>
          </article>
          <article>
            <span className="eyebrow">الباقات داخل الدليل</span>
            <h2>المحتوى يربط كل سؤال بالباقة الأقرب.</h2>
            <div className="city-wave-list">
              {packages.slice(0, 4).map((item) => (
                <p key={item.id}>
                  <CalendarDays size={16} />
                  <span>{item.name} - {item.duration}</span>
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

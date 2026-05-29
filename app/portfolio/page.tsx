import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ImageIcon,
  MapPin,
  MessageCircle
} from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import {
  bookingSteps,
  packages,
  portfolioScenes,
  serviceAreas,
  whatsappLink
} from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

export const metadata: Metadata = {
  title: "ألبوم لقطات الزواجات والخطوبة",
  description:
    "ألبوم Asmaa Studio يشرح أهم 8 لقطات تبحث عنها العروس في تصوير الزواجات والخطوبة: الزفة، تفاصيل العروس، First Look، الكوشة، وكواليس اليوم.",
  alternates: {
    canonical: "https://asmaa.video/portfolio"
  },
  openGraph: {
    title: "ألبوم Asmaa Studio",
    description:
      "صفحة ألبوم توضح شكل اللقطات التي تصنع فيلم الزفاف: الزفة، التفاصيل، First Look، والختام.",
    url: "https://asmaa.video/portfolio",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "ألبوم Asmaa Studio",
    "صفحة ألبوم توضح شكل اللقطات التي تصنع فيلم الزفاف: الزفة، التفاصيل، First Look، والختام."
  )
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ألبوم لقطات الزواجات والخطوبة",
  url: "https://asmaa.video/portfolio",
  description:
    "مجموعة توضح أكثر اللقطات طلبا في أفلام الزواجات والخطوبة لدى Asmaa Studio في الأحساء والدمام والخبر.",
  hasPart: portfolioScenes.map((scene, index) => ({
    "@type": "CreativeWork",
    position: index + 1,
    name: scene.title,
    description: scene.summary,
    keywords: scene.keywords.join(", ")
  }))
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
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
      name: "الألبوم",
      item: "https://asmaa.video/portfolio"
    }
  ]
};

export default function PortfolioPage() {
  return (
    <main className="page-shell portfolio-page">
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x portfolio-hero">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href="/">
              العودة للرئيسية
            </Link>
            <span className="eyebrow">الموجة 15 / Album refresh</span>
            <h1 className="section-title">ألبوم مختصر يوضح اللقطات التي ترفع قيمة فيلم يومك.</h1>
            <p className="section-copy">
              بدل أن تبقى كلمة الألبوم عامة، هذه الصفحة تشرح أهم المشاهد التي تسأل عنها العروس قبل
              الحجز: الزفة، تفاصيل العروس، First Look، الكوشة، والخاتمة التي تجعل الفيلم مكتملًا.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve">
                افتحي رابط العروس <CalendarDays size={18} />
              </Link>
              <a
                className="ghost-cta"
                href={whatsappLink("portfolio-page")}
                target="_blank"
                rel="noreferrer"
              >
                اسألي عن الألبوم <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card portfolio-command-card">
            <span>أفضل 8 لقطات</span>
            <h2>قرار أسرع</h2>
            <p>الألبوم هنا ليس عرضًا عامًا؛ هو طريقة لفهم ما الذي سيظهر فعلًا داخل فيلم المناسبة.</p>
            <div>
              <em>الزفة</em>
              <em>First Look</em>
              <em>تفاصيل العروس</em>
              <em>الخطوبة</em>
            </div>
          </aside>
        </div>
      </section>

      <section className="section portfolio-scene-section">
        <div className="section-inner">
          <span className="eyebrow">مشاهد الألبوم</span>
          <h2 className="section-title">هذه هي اللقطات التي تسأل عنها العميلات وتغير شكل الفيلم النهائي.</h2>
          <div className="portfolio-grid">
            {portfolioScenes.map((scene) => (
              <article className="portfolio-card" key={scene.id}>
                <span>{scene.id}</span>
                <ImageIcon size={24} strokeWidth={1.6} />
                <h3>{scene.title}</h3>
                <p>{scene.summary}</p>
                <div className="portfolio-meta">
                  <strong>{scene.packageHint}</strong>
                  <em>{scene.cityHint}</em>
                </div>
                <div className="mini-keywords">
                  {scene.keywords.map((keyword) => (
                    <em key={keyword}>{keyword}</em>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section board-live">
        <div className="section-inner">
          <span className="eyebrow">كيف يتحول الألبوم إلى حجز</span>
          <h2 className="section-title">شاهدي اللقطات، اختاري ما يشبه يومك، ثم ارسلي التفاصيل مرة واحدة.</h2>
          <div className="portfolio-flow-grid">
            {bookingSteps.map((step) => (
              <article className="board-lever-card" key={step.number}>
                <span className="portfolio-step-badge">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section guide-index-bottom">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">الباقات الأقرب للألبوم</span>
            <h2>كلما زادت لحظات اليوم، اتسع الألبوم بصريًا.</h2>
            <div className="city-wave-list">
              {packages.slice(0, 5).map((item) => (
                <p key={item.id}>
                  <CheckCircle2 size={16} />
                  <span>
                    {item.name} - {item.duration}
                  </span>
                </p>
              ))}
            </div>
          </article>
          <article>
            <span className="eyebrow">صفحات المدن</span>
            <h2>إذا كان قرارك مرتبطًا بالمدينة، ابدئي من صفحة الخدمة المحلية.</h2>
            <div className="city-wave-list">
              {serviceAreas.map((city) => (
                <p key={city.slug}>
                  <MapPin size={16} />
                  <Link href={`/${city.slug}`}>{city.headline}</Link>
                </p>
              ))}
            </div>
          </article>
        </div>
        <div className="section-inner">
          <div className="button-row wave-actions">
            <Link className="cta" href="/reserve">
              احجزي عبر الرابط <ArrowLeft size={18} />
            </Link>
            <Link className="ghost-cta" href="/faq">
              أسئلة الحجز <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

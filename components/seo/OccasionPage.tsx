import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { JsonLd } from "../JsonLd";
import { serviceAreas, whatsappLink } from "../../lib/content";

/**
 * Shared server-rendered template for seasonal/occasion landing pages
 * (/ramadan, /eid, /national-day). Answer-box first paragraph, Service
 * JSON-LD, no client JS — safe for the static export + prune pipeline.
 */

export type Occasion = {
  slug: string;
  eyebrow: string;
  h1: string;
  // 40-60 word answer-box paragraph for featured snippets / AI answers.
  answerBox: string;
  serviceNameAr: string;
  serviceNameEn: string;
  priceFrom: number;
  ideas: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export function OccasionPage({ occasion }: { occasion: Occasion }) {
  const pageUrl = `https://asmaa.video/${occasion.slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: occasion.serviceNameAr,
    alternateName: occasion.serviceNameEn,
    serviceType: "Female-only event videography",
    inLanguage: "ar-SA",
    description: occasion.answerBox,
    provider: { "@id": "https://asmaa.video#business" },
    areaServed: serviceAreas.slice(0, 8).map((area) => ({
      "@type": "City",
      name: area.en,
      alternateName: area.ar
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "SAR",
      price: String(occasion.priceFrom),
      availability: "https://schema.org/InStock",
      url: "https://asmaa.video/reserve"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
      { "@type": "ListItem", position: 2, name: occasion.serviceNameAr, item: pageUrl }
    ]
  };

  return (
    <section>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/">
              <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
            </Link>
            <span className="eyebrow">{occasion.eyebrow}</span>
            <h1 className="section-title">{occasion.h1}</h1>
            <p className="section-copy">{occasion.answerBox}</p>
            <div className="city-intent">
              <article>
                <Sparkles size={22} />
                <strong>فريق نسائي بالكامل</strong>
                <span>خصوصية تامة للعميلة وضيوفها في كل المناسبات النسائية.</span>
              </article>
              <article>
                <MapPin size={22} />
                <strong>نخدم المنطقة الشرقية</strong>
                <span>الأحساء، الدمام، الخبر، القطيف، الجبيل والمدن المجاورة.</span>
              </article>
            </div>
            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink(occasion.slug)} target="_blank" rel="noreferrer">
                اسألي عن توفر تاريخك <MessageCircle size={18} />
              </a>
              <Link className="ghost-cta" href="/reserve">
                رابط الحجز <CalendarDays size={18} />
              </Link>
            </div>
          </div>

          <aside className="city-command-card">
            <span>{occasion.serviceNameEn}</span>
            <h2>{occasion.serviceNameAr}</h2>
            <p>تغطية هادئة ومرتبة تناسب أجواء المناسبة، مع تسليم فيديو عالي الدقة جاهز للمشاركة.</p>
            <p className="city-price-indicator">
              <Sparkles size={15} aria-hidden="true" />
              تبدأ التغطية من <b>{occasion.priceFrom}</b> <b>ريال</b> — السعر المعلن هو السعر النهائي.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">أفكار التغطية</span>
          <h2 className="section-title">ماذا نوثق لك في هذه المناسبة؟</h2>
          <div className="packages-grid packages-grid-20x">
            {occasion.ideas.map((idea) => (
              <article className="package-card package-card-20x" key={idea.title}>
                <header>
                  <h3>{idea.title}</h3>
                </header>
                <p>{idea.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">أسئلة شائعة</span>
          <h2 className="section-title">إجابات مباشرة قبل الحجز.</h2>
          <div className="faq-list">
            {occasion.faqs.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="button-row" style={{ marginTop: 24 }}>
            <a className="cta" href={whatsappLink(`${occasion.slug}-faq`)} target="_blank" rel="noreferrer">
              احجزي عبر واتساب <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}

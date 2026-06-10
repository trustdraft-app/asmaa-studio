import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { JsonLd } from "../../../components/JsonLd";
import { instagramUrl, packages, serviceAreas, tiktokUrl, whatsappLink, whatsappNumber } from "../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../lib/metadata";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";

type Props = {
  params: Promise<{ city: string }>;
};

/**
 * GEO/AEO landing family: "تصوير أفراح [المدينة]" — the highest-volume Arabic
 * voice/search phrase brides use ("أفضل مصورة أفراح الدمام", "تصوير أفراح
 * قريب مني"). One static page per service-area city, answer-box first.
 */

// City coordinates for LocalBusiness geo signals (fallback: Al Ahsa HQ).
const cityGeo: Record<string, { lat: number; lng: number }> = {
  alahsa: { lat: 25.3833, lng: 49.5869 },
  hofuf: { lat: 25.3646, lng: 49.5874 },
  mubarraz: { lat: 25.4282, lng: 49.5639 },
  dammam: { lat: 26.4207, lng: 50.0888 },
  khobar: { lat: 26.2172, lng: 50.1971 },
  qatif: { lat: 26.565, lng: 49.997 },
  jubail: { lat: 27.0046, lng: 49.6603 },
  saihat: { lat: 26.4752, lng: 50.0413 },
  safwa: { lat: 26.6498, lng: 49.9523 },
  tarut: { lat: 26.5722, lng: 50.0617 },
  "ras-tanura": { lat: 26.6444, lng: 50.1611 },
  abqaiq: { lat: 25.9371, lng: 49.6681 }
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city) ?? serviceAreas[0];
  const title = `تصوير أفراح ${area.ar} | Asmaa Studio`;
  const description = `مصورة أفراح نسائية في ${area.ar}. فريق نسائي بالكامل يضمن الخصوصية التامة. تصوير زواجات وخطوبات وملكات بباقات معلنة من ٦٠٠ إلى ٢٥٠٠ ريال. احجزي موعدك عبر واتساب.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://asmaa.video/${area.slug}/tsweer-afrah`
    },
    openGraph: {
      title,
      description,
      url: `https://asmaa.video/${area.slug}/tsweer-afrah`,
      siteName: "Asmaa Studio",
      images: socialPreviewImages,
      type: "website",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(title, description)
  };
}

export default async function CityAfrahPage({ params }: Props) {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city) ?? serviceAreas[0];
  const geo = cityGeo[area.slug] ?? cityGeo.alahsa;
  const pageUrl = `https://asmaa.video/${area.slug}/tsweer-afrah`;

  // Answer-box paragraph: 40-60 words, leads with the exact voice-search answer.
  const answerBox = `أسماء ستوديو فريق تصوير نسائي بالكامل يوثق الأفراح والخطوبات والملكات في ${area.ar} والمنطقة الشرقية. خصوصية تامة للعروس وضيوفها، باقات معلنة تبدأ من ٦٠٠ ريال وتصل إلى ٢٥٠٠ ريال لتغطية اليوم الكامل، والحجز يتم برسالة واتساب واحدة مرتبة عبر رابط العروس.`;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#business`,
    name: `أسماء ستوديو — تصوير أفراح ${area.ar}`,
    url: pageUrl,
    image: "https://asmaa.video/brand/asmaa-og.jpg",
    telephone: `+${whatsappNumber}`,
    priceRange: "600-2500 SAR",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.ar,
      addressRegion: "المنطقة الشرقية",
      addressCountry: "SA"
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    hasMap: `https://maps.google.com/?q=${geo.lat},${geo.lng}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "22:00"
    },
    parentOrganization: { "@id": "https://asmaa.video#business" },
    sameAs: [instagramUrl, tiktokUrl]
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `تصوير أفراح ${area.ar}`,
    serviceType: "Female-only wedding videography and event coverage",
    inLanguage: "ar-SA",
    description: answerBox,
    provider: { "@id": "https://asmaa.video#business" },
    areaServed: {
      "@type": "City",
      name: area.en,
      alternateName: area.ar,
      containedInPlace: { "@type": "AdministrativeArea", name: "Eastern Province, Saudi Arabia" }
    },
    audience: { "@type": "Audience", audienceType: "العرائس والعميلات في المناسبات النسائية" },
    offers: packages.map((item) => ({
      "@type": "Offer",
      name: item.name,
      price: item.price,
      priceCurrency: "SAR",
      url: `https://asmaa.video/reserve?city=${area.slug}&package=${item.id}`
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
      { "@type": "ListItem", position: 2, name: area.ar, item: `https://asmaa.video/${area.slug}` },
      { "@type": "ListItem", position: 3, name: `تصوير أفراح ${area.ar}`, item: pageUrl }
    ]
  };

  // Visible FAQ only — FAQPage JSON-LD is intentionally NOT emitted
  // (launch verifier bans deprecated FAQPage structured data on marketing routes).
  const afrahFaqs = [
    {
      q: `من أفضل مصورة أفراح في ${area.ar}؟`,
      a: `العروس في ${area.ar} تحتاج فريقا نسائيا يحترم خصوصية المناسبة ويعلن أسعاره قبل أول رسالة. أسماء ستوديو يقدم الاثنين معا: طاقم نسائي بالكامل وباقات مكتوبة من ٦٠٠ إلى ٢٥٠٠ ريال مع أمثلة أعمال واضحة قبل الحجز.`
    },
    {
      q: `كم تكلفة تصوير الفرح في ${area.ar}؟`,
      a: `الباقات معلنة بالكامل: ٦٠٠ ريال للزفة، ١٢٠٠ للزفة المطورة، ١٥٠٠ للخطوبة والملكة، ١٧٠٠ لنصف اليوم، و٢٥٠٠ ريال لليوم الكامل. لا توجد رسوم تنقل داخل ${area.ar}.`
    },
    {
      q: `هل يوجد فريق تصوير نسائي في ${area.ar}؟`,
      a: `نعم. فريق أسماء ستوديو نسائي بالكامل من الوصول إلى التسليم، وهذا يضمن خصوصية تامة للعروس والضيوف في الأفراح والمناسبات النسائية في ${area.ar}.`
    },
    {
      q: "كيف أحجز موعد التصوير؟",
      a: "افتحي رابط العروس، اختاري المدينة والتاريخ والباقة، ثم يصل طلبك مرتبا ونكمل التأكيد عبر واتساب خلال ساعات."
    }
  ];

  return (
    <main className="page-shell city-page">
      <SiteHeader />
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href={`/${area.slug}`}>
              <ArrowLeft size={16} aria-hidden="true" /> <span>صفحة {area.ar}</span>
            </Link>
            <span className="eyebrow">تصوير أفراح / {area.en}</span>
            <h1 className="section-title">تصوير أفراح {area.ar} بفريق نسائي يحفظ الخصوصية والتفاصيل</h1>
            <p className="section-copy">{answerBox}</p>
            <div className="city-intent">
              <article>
                <Sparkles size={22} />
                <strong>خصوصية تامة</strong>
                <span>طاقم نسائي بالكامل في التصوير والمونتاج والتسليم — مناسب للأفراح النسائية المغلقة.</span>
              </article>
              <article>
                <MapPin size={22} />
                <strong>نخدم أحياء {area.ar}</strong>
                <span>{area.neighborhoodSignals.join("، ")}</span>
              </article>
            </div>
            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink(`${area.slug}-afrah`)} target="_blank" rel="noreferrer">
                اسألي عن توفر تاريخك <MessageCircle size={18} />
              </a>
              <Link className="ghost-cta" href={`/reserve?city=${area.slug}`}>
                رابط العروس <CalendarDays size={18} />
              </Link>
            </div>
          </div>

          <aside className="city-command-card">
            <span>تصوير أفراح {area.ar}</span>
            <h2>{area.ar}</h2>
            <p>{area.localPromise}</p>
            <div>
              <em>تصوير أفراح {area.ar}</em>
              <em>مصورة أفراح {area.ar}</em>
              <em>تصوير زواجات {area.ar}</em>
              <em>فريق نسائي {area.ar}</em>
            </div>
            <p className="city-price-indicator">
              <Sparkles size={15} aria-hidden="true" />
              باقات الأفراح في {area.ar} من <b>٦٠٠</b> إلى <b>٢٥٠٠ ريال</b> — السعر المعلن هو السعر النهائي.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">باقات الأفراح في {area.ar}</span>
          <h2 className="section-title">خمس باقات واضحة — اختاري حسب لحظات يومك.</h2>
          <div className="packages-grid packages-grid-20x">
            {packages.map((item) => (
              <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
                <header>
                  <small>بكج {item.id}</small>
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} ريال</p>
                </header>
                <p>{item.summary}</p>
                <div className="package-best">
                  <strong>الأنسب لفرحك في {area.ar}</strong>
                  <span>{item.bestFor}</span>
                </div>
                <a href={whatsappLink(`${area.slug}-afrah-package-${item.id}`)} target="_blank" rel="noreferrer">
                  اسألي عن هذا البكج <ArrowLeft size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">أسئلة عرائس {area.ar}</span>
          <h2 className="section-title">إجابات مباشرة قبل أول رسالة.</h2>
          <div className="faq-list">
            {afrahFaqs.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
          <ul style={{ marginTop: 24, listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
            <li><Check size={15} aria-hidden="true" /> تغطية الزفة والخطوبة والملكة وليلة الحناء والمناسبات النسائية.</li>
            <li><Check size={15} aria-hidden="true" /> تسليم فيديو عالي الدقة جاهز للجوال والتلفاز ومنصات التواصل.</li>
            <li><Check size={15} aria-hidden="true" /> حجز مبكر للمواسم المزدحمة — أرسلي تاريخك اليوم لتأكيد التوفر.</li>
          </ul>
          <div className="button-row" style={{ marginTop: 24 }}>
            <a className="cta" href={whatsappLink(`${area.slug}-afrah-faq`)} target="_blank" rel="noreferrer">
              احجزي عبر واتساب <MessageCircle size={18} />
            </a>
            <Link className="ghost-cta" href="/packages">
              مقارنة الباقات <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

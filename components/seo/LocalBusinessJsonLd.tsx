/**
 * Site-wide LocalBusiness + Service JSON-LD for asmaa.video
 *
 * Why: AEO/GEO breakthrough — Google + ChatGPT + Perplexity prefer answering
 * questions about local businesses when there's structured data. This single
 * schema covers WHO we are, WHAT services we offer, and where we serve.
 *
 * NOTE: aggregateRating intentionally omitted — no verified public reviews yet.
 * Add it only when real Google Business Profile ratings are confirmed.
 *
 * Renders inside <body>; safe to inline on every page via layout.tsx.
 */

import { JsonLd } from "../JsonLd";

const SITE = "https://asmaa.video";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
  "@id": `${SITE}#business`,
  name: "Asmaa Video",
  alternateName: ["أسماء فيديو", "أسماء للتصوير", "Asmaa Photography"],
  // Google Business Profile description — concise, keyword-anchored, truthful.
  description:
    "أسماء فيديو لتصوير وفيديو الأعراس والخطوبة في المنطقة الشرقية — الأحساء والدمام والخبر والقطيف. طاقم نسائي بالكامل، مونتاج سينمائي، وباقات واضحة من 600 إلى 2500 ريال. Female-only wedding photography & videography studio serving Al-Ahsa, Dammam, Khobar and Qatif in Saudi Arabia's Eastern Province.",
  slogan: "ذكرى مرتبة وواضحة ليوم عمرك",
  url: SITE,
  image: `${SITE}/brand/asmaa-og.jpg`,
  logo: `${SITE}/favicon.png`,
  telephone: "+966551606334",
  address: {
    "@type": "PostalAddress",
    addressLocality: "الأحساء",
    addressRegion: "المنطقة الشرقية",
    addressCountry: "SA"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.3833,
    longitude: 49.5869
  },
  priceRange: "600-2500 SAR",
  currenciesAccepted: "SAR",
  paymentAccepted: ["Cash", "Bank Transfer", "Mada", "Apple Pay"],
  // WhatsApp-first studio — reachable every day (matches "متاح 7 أيام" / typical 2h reply).
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "22:00"
  },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "AdministrativeArea", name: "Eastern Province", containedInPlace: { "@type": "Country", name: "Saudi Arabia" } },
    { "@type": "City", name: "Al-Ahsa" },
    { "@type": "City", name: "Dammam" },
    { "@type": "City", name: "Khobar" },
    { "@type": "City", name: "Dhahran" },
    { "@type": "City", name: "Jubail" },
    { "@type": "City", name: "Qatif" }
  ],
  knowsLanguage: ["Arabic", "English"],
  serviceType: ["Wedding Videography", "Engagement Videography", "Event Videography"],
  // Canonical package names + prices — must stay in sync with lib/content.ts
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "باقات تصوير الأعراس والخطوبة",
    itemListElement: [
      {
        "@type": "Offer",
        name: "بكج الزفة",
        description: "توثيق لحظة الدخول بإضاءة جميلة ومونتاج مختصر.",
        price: "600",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "بكج الزفة والكواليس",
        description: "تصوير الزفة مع تفاصيل الكوشة والكيك ولقطات القاعة الأساسية.",
        price: "1200",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Half Day",
        description: "First Look وتفاصيل العروس والكوشة وكواليس التصوير وزفة واحدة.",
        price: "1700",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Full Day",
        description: "تغطية كاملة من الصالون إلى القاعة مع زفتين.",
        price: "2500",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "بكج الخطوبة",
        description: "فيلم خطوبة يشمل الشبكة والتلبيس والكيك والزفة.",
        price: "1500",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      }
    ]
  },
  founder: { "@id": `${SITE}#asmaa` },
  employee: { "@id": `${SITE}#asmaa` },
  sameAs: ["https://www.instagram.com/asmaa.video", "https://www.tiktok.com/@asmaa.video"]
};

// SearchAction intentionally omitted: static export has no /search route.
// A fake SearchAction endpoint harms structured-data trust signals.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}#website`,
  url: SITE,
  name: "Asmaa Video",
  inLanguage: "ar-SA",
  publisher: { "@id": `${SITE}#business` }
};

export function LocalBusinessJsonLd() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />
    </>
  );
}

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

const SITE = "https://asmaa.video";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE}#business`,
  name: "Asmaa Studio",
  alternateName: "أسماء ستوديو",
  description:
    "تصوير فيديو زواجات وخطوبة احترافي في الأحساء والدمام والخبر — طاقم نسائي بالكامل، مونتاج سينمائي، باقات واضحة.",
  url: SITE,
  image: `${SITE}/og-image.png`,
  logo: `${SITE}/favicon.png`,
  priceRange: "600-2500 SAR",
  currenciesAccepted: "SAR",
  paymentAccepted: ["Cash", "Bank Transfer", "Mada", "Apple Pay"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "Eastern Province",
    addressLocality: "Al-Ahsa"
  },
  areaServed: [
    { "@type": "City", name: "Al-Ahsa" },
    { "@type": "City", name: "Dammam" },
    { "@type": "City", name: "Khobar" },
    { "@type": "City", name: "Dhahran" },
    { "@type": "City", name: "Jubail" }
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
        name: "بكج الزفة المطور",
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
  sameAs: ["https://www.instagram.com/asmaa.video", "https://www.tiktok.com/@asmaa.video"]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}#website`,
  url: SITE,
  name: "Asmaa Studio",
  inLanguage: "ar-SA",
  publisher: { "@id": `${SITE}#business` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string"
  }
};

export function LocalBusinessJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

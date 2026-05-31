/**
 * Site-wide LocalBusiness + Service + AggregateRating JSON-LD for asmaa.video
 *
 * Why: AEO/GEO breakthrough — Google + ChatGPT + Perplexity prefer answering
 * questions about local businesses when there's structured data. This single
 * schema covers WHO we are, WHAT services we offer, and proof signals
 * (rating, area served, contact).
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wedding & Engagement Videography Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Engagement Package",
        description: "تصوير حفل الخطوبة",
        price: "600",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Wedding Essentials",
        description: "باقة الأساس لحفل الزفاف",
        price: "1200",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Wedding Premium",
        description: "باقة الزفاف المتميزة",
        price: "1700",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Wedding Cinematic",
        description: "باقة الزفاف السينمائية الكاملة",
        price: "2500",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Half-Day Coverage",
        description: "تغطية نصف يوم",
        price: "1500",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock"
      }
    ]
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1"
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

/**
 * City-specific Service JSON-LD for AsmaaVideo /[city] landing pages.
 *
 * Why: GEO/AEO breakthrough — when someone voice-asks "wedding videographer
 * in Dammam" or types "تصوير زواج في الأحساء", we want to be the cited result.
 * Per-city Service schema makes each city page individually rankable.
 */

interface CityServiceProps {
  citySlug: string;
  cityName: string;
  cityNameAr: string;
}

const SITE = "https://asmaa.video";

export function CityServiceJsonLd({ citySlug, cityName, cityNameAr }: CityServiceProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/${citySlug}#service`,
    serviceType: "Wedding Videography",
    name: `Wedding Videography in ${cityName} | تصوير زواج ${cityNameAr}`,
    description: `Professional wedding and engagement videography in ${cityName}, Eastern Province, Saudi Arabia. All-female crew, cinematic editing, transparent pricing.`,
    provider: { "@id": `${SITE}#business` },
    areaServed: {
      "@type": "City",
      name: cityName,
      alternateName: cityNameAr,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Eastern Province",
        addressCountry: "SA",
      },
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "SAR",
      lowPrice: "600",
      highPrice: "2500",
      offerCount: "5",
    },
    audience: { "@type": "Audience", audienceType: "Brides and grooms in Saudi Arabia" },
    url: `${SITE}/${citySlug}`,
    image: `${SITE}/og-image.png`,
  };

  const speakable = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]", "header p"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakable) }}
      />
    </>
  );
}

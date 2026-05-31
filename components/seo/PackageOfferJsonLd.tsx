/**
 * Per-package Offer + Service JSON-LD for AsmaaVideo packages.
 *
 * Use on /packages or pricing page so each package becomes individually
 * surfaceable in SERP rich results.
 */

interface PackageOffer {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  currency: string;
  includes: string[];
  duration?: string;
}

interface PackageOfferProps {
  packages: PackageOffer[];
  url: string;
}

export function PackageOfferJsonLd({ packages, url }: PackageOfferProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${url}#package-catalog`,
    name: "Asmaa Studio Wedding Packages",
    url,
    provider: { "@id": "https://asmaa.video#business" },
    itemListElement: packages.map((pkg) => ({
      "@type": "Offer",
      "@id": `${url}#${pkg.id}`,
      name: `${pkg.nameEn} — ${pkg.name}`,
      description: pkg.description,
      price: pkg.price.toString(),
      priceCurrency: pkg.currency,
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: pkg.nameEn,
        serviceType: "Wedding Videography",
        provider: { "@id": "https://asmaa.video#business" },
        ...(pkg.duration ? { duration: pkg.duration } : {}),
      },
      eligibleRegion: { "@type": "Country", name: "Saudi Arabia" },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

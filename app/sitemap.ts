import type { MetadataRoute } from "next";
import { serviceAreas } from "../lib/content";
import { seoGuidePages } from "../lib/seo-pages";
import { servicePages } from "../lib/services";
import {
  allBudgetPairs,
  allCityServiceModifierTriples,
  allCityServicePairs,
  allEnCityServiceModifierTriples,
  allEnCityServicePairs,
  allSeasonalPairs,
  allWeddingTypePairs
} from "../lib/seo-grid";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://asmaa.video";
  return [
    {
      url: `${base}/`,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${base}/packages`,
      changeFrequency: "weekly",
      priority: 0.95
    },
    {
      url: `${base}/highlights`,
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${base}/faq`,
      changeFrequency: "weekly",
      priority: 0.88
    },
    {
      url: `${base}/portfolio`,
      changeFrequency: "weekly",
      priority: 0.87
    },
    {
      url: `${base}/zaffa`,
      changeFrequency: "weekly",
      priority: 0.89
    },
    {
      url: `${base}/guides`,
      changeFrequency: "weekly",
      priority: 0.86
    },
    ...serviceAreas.map((area) => ({
      url: `${base}/${area.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.82
    })),
    ...seoGuidePages.map((page) => ({
      url: `${base}/guides/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.78
    })),
    ...servicePages.map((page) => ({
      url: `${base}/services/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.84
    })),
    // Programmatic SEO grid — 12 cities × 8 services = 96 pages
    ...allCityServicePairs().map(({ city, service }) => ({
      url: `${base}/ar/${city.slug}/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.85 : 0.7
    })),
    // Programmatic SEO grid — 20 × 8 × 14 = 2,240 pages
    ...allCityServiceModifierTriples().map(({ city, service, modifier }) => ({
      url: `${base}/ar/${city.slug}/${service.slug}/${modifier.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.68 : 0.55
    })),
    // EN mirrors — 20 × 8 = 160 city/service pages
    ...allEnCityServicePairs().map(({ city, service }) => ({
      url: `${base}/en/${city.slug}/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.6 : 0.5
    })),
    // EN deep — 20 × 8 × 8 = 1,280 pages
    ...allEnCityServiceModifierTriples().map(({ city, service, modifier }) => ({
      url: `${base}/en/${city.slug}/${service.slug}/${modifier.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.55 : 0.45
    })),
    // Seasonal — 12 × 8 = 96 pages
    ...allSeasonalPairs().map(({ slug }) => ({
      url: `${base}/ar/seasonal/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    // Budget — 3 × 8 = 24 pages
    ...allBudgetPairs().map(({ slug }) => ({
      url: `${base}/ar/budget/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    // Wedding types — 5 × 8 = 40 pages
    ...allWeddingTypePairs().map(({ slug }) => ({
      url: `${base}/ar/wedding-types/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    {
      url: `${base}/packages-asmaa-studio.pdf`,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }
  ];
}

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
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.78
    },
    {
      url: `${base}/reviews`,
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${base}/contact`,
      changeFrequency: "weekly",
      priority: 0.86
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
      url: `${base}/engagement`,
      changeFrequency: "weekly",
      priority: 0.88
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
    // Programmatic SEO grid — 30 cities × 8 services = 240 pages
    ...allCityServicePairs().map(({ city, service }) => ({
      url: `${base}/ar/${city.slug}/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.85 : city.governorate === "easternProvince" ? 0.7 : 0.5
    })),
    // Programmatic SEO grid — 30 × 8 × 14 = 3,360 pages
    ...allCityServiceModifierTriples().map(({ city, service, modifier }) => ({
      url: `${base}/ar/${city.slug}/${service.slug}/${modifier.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.68 : city.governorate === "easternProvince" ? 0.55 : 0.4
    })),
    // EN mirrors — 30 × 8 = 240 city/service pages
    ...allEnCityServicePairs().map(({ city, service }) => ({
      url: `${base}/en/${city.slug}/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.6 : city.governorate === "easternProvince" ? 0.5 : 0.4
    })),
    // EN deep — 30 × 8 × 14 = 3,360 pages
    ...allEnCityServiceModifierTriples().map(({ city, service, modifier }) => ({
      url: `${base}/en/${city.slug}/${service.slug}/${modifier.slug}`,
      changeFrequency: "monthly" as const,
      priority: city.governorate === "alahsa" ? 0.55 : city.governorate === "easternProvince" ? 0.45 : 0.35
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

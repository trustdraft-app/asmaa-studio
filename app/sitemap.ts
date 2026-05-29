import type { MetadataRoute } from "next";
import { serviceAreas } from "../lib/content";
import { seoGuidePages } from "../lib/seo-pages";

export const dynamic = "force-static";

const lastModified = new Date("2026-05-29T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://asmaa.video";
  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${base}/reserve`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${base}/faq`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.88
    },
    {
      url: `${base}/portfolio`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.87
    },
    {
      url: `${base}/guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.86
    },
    ...serviceAreas.map((area) => ({
      url: `${base}/${area.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.82
    })),
    ...seoGuidePages.map((page) => ({
      url: `${base}/guides/${page.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.78
    }))
  ];
}

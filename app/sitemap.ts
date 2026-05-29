import type { MetadataRoute } from "next";
import { serviceAreas } from "../lib/content";
import { seoGuidePages } from "../lib/seo-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://asmaa.video";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${base}/reserve`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${base}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.88
    },
    {
      url: `${base}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.87
    },
    {
      url: `${base}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.86
    },
    ...serviceAreas.map((area) => ({
      url: `${base}/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.82
    })),
    ...seoGuidePages.map((page) => ({
      url: `${base}/guides/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.78
    }))
  ];
}

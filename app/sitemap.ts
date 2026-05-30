import type { MetadataRoute } from "next";
import { serviceAreas } from "../lib/content";
import { seoGuidePages } from "../lib/seo-pages";
import { servicePages } from "../lib/services";

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
    {
      url: `${base}/packages-asmaa-studio.pdf`,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }
  ];
}

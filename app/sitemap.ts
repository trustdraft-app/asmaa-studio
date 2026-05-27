import type { MetadataRoute } from "next";
import { serviceAreas } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://asmaa.video";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    ...serviceAreas.map((area) => ({
      url: `${base}/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.82
    }))
  ];
}

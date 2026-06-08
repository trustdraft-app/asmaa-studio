import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// AI answer engines we explicitly welcome (GEO/AEO). Listing them by name —
// in addition to the catch-all "*" — is an unambiguous opt-in signal so our
// content is eligible for ChatGPT, Claude, Perplexity, and Google AI overviews.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin"
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/admin"
      }))
    ],
    sitemap: "https://asmaa.video/sitemap.xml"
  };
}

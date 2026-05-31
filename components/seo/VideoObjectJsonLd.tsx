/**
 * VideoObject JSON-LD for AsmaaVideo portfolio reels.
 *
 * Voice + AI search engines surface video content when properly schema-tagged.
 * Use for hero reels, package showcase videos, or any embedded video.
 */

interface VideoObjectProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string; // ISO 8601
  contentUrl?: string;
  embedUrl?: string;
  duration?: string; // ISO 8601 duration, e.g. "PT2M30S"
  inLanguage?: string;
}

export function VideoObjectJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  inLanguage = "ar-SA",
}: VideoObjectProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    inLanguage,
    publisher: { "@id": "https://asmaa.video#business" },
  };
  if (contentUrl) schema.contentUrl = contentUrl;
  if (embedUrl) schema.embedUrl = embedUrl;
  if (duration) schema.duration = duration;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Speakable JSON-LD — tells voice assistants (Google Assistant, Siri,
 * Alexa) which parts of the page to read aloud for voice-search answers.
 *
 * AEO win: when someone voice-asks "best wedding videographer in Dammam"
 * or "أفضل مصورة زواج في الأحساء", structured Speakable helps us be cited.
 */

interface SpeakableProps {
  cssSelectors?: string[];
}

export function SpeakableJsonLd({
  cssSelectors = ["h1", "[data-speakable]", "header p"],
}: SpeakableProps = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

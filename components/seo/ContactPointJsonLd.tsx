/**
 * ContactPoint JSON-LD — WhatsApp + email contact channels.
 *
 * AEO win: when users voice-ask "how do I contact Asmaa Studio" or
 * "WhatsApp wedding videographer", structured contact data lets engines
 * surface the answer directly.
 */

export function ContactPointJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://asmaa.video#contact-org",
    name: "Asmaa Studio",
    url: "https://asmaa.video",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
        areaServed: ["SA"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        contactType: "booking",
        availableLanguage: ["Arabic"],
        areaServed: ["SA"],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

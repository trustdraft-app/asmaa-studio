/**
 * ContactPoint JSON-LD — WhatsApp + email contact channels.
 *
 * AEO win: when users voice-ask "how do I contact Asmaa Video" or
 * "WhatsApp wedding videographer", structured contact data lets engines
 * surface the answer directly.
 */

import { JsonLd } from "../JsonLd";

export function ContactPointJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://asmaa.video#contact-org",
    name: "Asmaa Video",
    url: "https://asmaa.video",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
        areaServed: ["SA"],
        url: "https://asmaa.video/contact",
      },
      {
        "@type": "ContactPoint",
        contactType: "booking",
        availableLanguage: ["Arabic"],
        areaServed: ["SA"],
        url: "https://asmaa.video/reserve",
      },
    ],
  };
  return <JsonLd data={schema} />;
}

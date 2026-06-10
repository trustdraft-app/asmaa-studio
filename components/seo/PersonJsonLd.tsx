/**
 * Person JSON-LD for Asmaa — the photographer/founder behind the studio.
 *
 * Why: Google + AI answer engines (ChatGPT/Perplexity) connect "who is the
 * photographer" queries to the business entity when a Person node exists and
 * cross-references the LocalBusiness via worksFor/@id. Strengthens E-E-A-T
 * for queries like "مصورة زفاف الخبر" and "تصوير عروس الدمام".
 *
 * NOTE: facts only — name, role, languages, service knowledge, social links.
 * No invented credentials, awards, or review data (repo policy).
 */

const SITE = "https://asmaa.video";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}#asmaa`,
  name: "Asmaa",
  alternateName: "أسماء",
  jobTitle: "Wedding Cinematographer & Director",
  description:
    "أسماء — مصوّرة ومخرجة أفلام زواجات نسائية في المنطقة الشرقية: الأحساء والدمام والخبر والقطيف. Female wedding cinematographer serving Saudi Arabia's Eastern Province.",
  url: `${SITE}/about`,
  image: `${SITE}/brand/asmaa-monogram-heritage.jpg`,
  worksFor: { "@id": `${SITE}#business` },
  knowsLanguage: ["Arabic", "English"],
  knowsAbout: [
    "تصوير زواجات نسائي",
    "مصورة زفاف الخبر",
    "تصوير عروس الدمام",
    "مصورة زواجات الأحساء",
    "تصوير خطوبة وملكة",
    "Wedding cinematography",
    "Bridal detail filming",
    "First Look filming"
  ],
  workLocation: [
    { "@type": "City", name: "Al-Ahsa", alternateName: "الأحساء" },
    { "@type": "City", name: "Dammam", alternateName: "الدمام" },
    { "@type": "City", name: "Khobar", alternateName: "الخبر" },
    { "@type": "City", name: "Qatif", alternateName: "القطيف" }
  ],
  sameAs: ["https://www.instagram.com/asmaa.video/", "https://www.tiktok.com/@asmaa.video"]
};

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

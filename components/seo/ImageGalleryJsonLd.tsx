/**
 * ImageGallery JSON-LD for portfolio pages.
 *
 * Helps Google Image Search + AI engines understand the portfolio
 * is a curated gallery of wedding photography/videography.
 */

interface GalleryImage {
  contentUrl: string;
  name?: string;
  description?: string;
  uploadDate?: string;
}

interface ImageGalleryProps {
  name: string;
  description: string;
  images: GalleryImage[];
  url: string;
}

export function ImageGalleryJsonLd({ name, description, images, url }: ImageGalleryProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    url,
    publisher: { "@id": "https://asmaa.video#business" },
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.contentUrl,
      ...(img.name ? { name: img.name } : {}),
      ...(img.description ? { description: img.description } : {}),
      ...(img.uploadDate ? { uploadDate: img.uploadDate } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

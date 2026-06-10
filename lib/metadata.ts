import type { Metadata } from "next";

export const socialPreviewImage = {
  url: "/brand/asmaa-og.jpg",
  width: 1200,
  height: 630,
  alt: "Asmaa Video bridal videography preview"
};

export const socialPreviewImages = [socialPreviewImage];

export function twitterMetadata(title: string, description: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [socialPreviewImage.url]
  };
}

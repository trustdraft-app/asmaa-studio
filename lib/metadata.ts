import type { Metadata } from "next";

export const socialPreviewImage = {
  url: "/brand/asmaa-cinematic-bridal-still.png",
  width: 1572,
  height: 1001,
  alt: "Asmaa Studio bridal videography preview"
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

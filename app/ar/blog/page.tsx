import type { Metadata } from "next";
import { BlogIndex } from "../../../components/BlogIndex";
import { socialPreviewImages, twitterMetadata } from "../../../lib/metadata";

const title = "المدونة العربية | تصوير الأعراس في المنطقة الشرقية — Asmaa Studio";
const description =
  "القسم العربي لمدونة أسماء ستوديو: أدلة اختيار مصورة الزفاف، باقات تصوير الأفراح، وأسعار التصوير في الأحساء والدمام والخبر والقطيف لعام 2026.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://asmaa.video/ar/blog",
    languages: {
      "ar-SA": "https://asmaa.video/ar/blog",
      "x-default": "https://asmaa.video/blog"
    }
  },
  openGraph: {
    title,
    description,
    url: "https://asmaa.video/ar/blog",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(title, description)
};

export default function ArabicBlogPage() {
  return <BlogIndex basePath="/blog" />;
}

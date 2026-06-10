import type { Metadata } from "next";
import { BlogIndex } from "../../components/BlogIndex";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

const title = "المدونة | أدلة تصوير الأعراس في المنطقة الشرقية — Asmaa Video";
const description =
  "مدونة أسماء فيديو: كيف تختارين مصورة زفاف في الأحساء والدمام والخبر، الفرق بين باقات الفيديو، وكم تكلفة تصوير الأفراح في السعودية 2026.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://asmaa.video/blog",
    languages: {
      "ar-SA": "https://asmaa.video/blog",
      "x-default": "https://asmaa.video/blog"
    }
  },
  openGraph: {
    title,
    description,
    url: "https://asmaa.video/blog",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(title, description)
};

export default function BlogPage() {
  return <BlogIndex basePath="/blog" />;
}

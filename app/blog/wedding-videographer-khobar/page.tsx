import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "../../../components/BlogArticle";
import { blogPostBySlug } from "../../../lib/blog";
import { socialPreviewImages, twitterMetadata } from "../../../lib/metadata";

const slug = "wedding-videographer-khobar";
const post = blogPostBySlug(slug);

export const metadata: Metadata = {
  title: { absolute: post?.metaTitle ?? "المدونة" },
  description: post?.metaDescription,
  keywords: post?.keyPhrases,
  alternates: {
    canonical: `https://asmaa.video/blog/${slug}`,
    languages: {
      "ar-SA": `https://asmaa.video/blog/${slug}`,
      "x-default": `https://asmaa.video/blog/${slug}`
    }
  },
  openGraph: {
    title: post?.metaTitle,
    description: post?.metaDescription,
    url: `https://asmaa.video/blog/${slug}`,
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "article",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(post?.metaTitle ?? "Asmaa Studio", post?.metaDescription ?? "")
};

export default function Page() {
  if (!post) notFound();
  return <BlogArticle post={post} />;
}

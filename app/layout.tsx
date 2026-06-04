import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { socialPreviewImages, twitterMetadata } from "../lib/metadata";
import { LocalBusinessJsonLd } from "../components/seo/LocalBusinessJsonLd";
import { SpeakableJsonLd } from "../components/seo/SpeakableJsonLd";
import { ContactPointJsonLd } from "../components/seo/ContactPointJsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://asmaa.video"),
  title: {
    default: "Asmaa Studio | تصوير فيديو زواجات نسائي في الأحساء والشرقية",
    template: "%s | Asmaa Studio"
  },
  description:
    "Asmaa Studio تقدم تصوير فيديو للأعراس والخطوبة في الأحساء والدمام والخبر مع باقات واضحة، مونتاج احترافي، وتواصل مباشر عبر واتساب.",
  alternates: {
    canonical: "https://asmaa.video/",
    languages: {
      "ar-SA": "https://asmaa.video/",
      "x-default": "https://asmaa.video/"
    }
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title: "Asmaa Studio",
    description: "تصوير فيديو زواجات وخطوبة للأحساء والدمام والخبر.",
    url: "https://asmaa.video",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    locale: "ar_SA",
    type: "website"
  },
  twitter: twitterMetadata("Asmaa Studio", "تصوير فيديو زواجات وخطوبة للأحساء والدمام والخبر."),
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="ar" dir="rtl" className="font-runtime-stacks">
      <body>
        <LocalBusinessJsonLd />
        <SpeakableJsonLd />
        <ContactPointJsonLd />
        {children}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}

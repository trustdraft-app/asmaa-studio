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
  },
  // Google Search Console site verification — set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // to the token from Search Console. Omitted (no empty tag) when unset.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {})
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="ar" dir="rtl" className="font-runtime-stacks">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,500;1,600&display=swap"
        />
      </head>
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

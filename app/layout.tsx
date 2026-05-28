import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const arabicUi = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const arabicDisplay = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"]
});

const latinDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-latin-display",
  display: "swap",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asmaa.video"),
  title: {
    default: "Asmaa Studio | تصوير فيديو زواجات نسائي في الأحساء والشرقية",
    template: "%s | Asmaa Studio"
  },
  description:
    "Asmaa Studio تقدم تصوير فيديو للأعراس والخطوبة في الأحساء والدمام والخبر مع باقات واضحة، مونتاج احترافي، وتواصل مباشر عبر واتساب.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Asmaa Studio",
    description: "تصوير فيديو زواجات وخطوبة للأحساء والدمام والخبر.",
    url: "https://asmaa.video",
    siteName: "Asmaa Studio",
    images: [
      {
        url: "/brand/asmaa-monogram-heritage.jpg",
        width: 853,
        height: 1280,
        alt: "Asmaa Studio gold monogram"
      }
    ],
    locale: "ar_SA",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicUi.variable} ${arabicDisplay.variable} ${latinDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}

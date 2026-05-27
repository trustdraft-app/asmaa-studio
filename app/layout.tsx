import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap"
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
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
    "Asmaa Studio تقدم تصوير فيديو نسائي للأعراس والخطوبة في الأحساء والدمام والخبر مع باقات واضحة، مونتاج احترافي، وتواصل مباشر عبر واتساب.",
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
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}

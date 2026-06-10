import type { Metadata } from "next";
import { ReservationExperience } from "../../components/ReservationExperience";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

export const metadata: Metadata = {
  title: "احجزي الآن — تصوير فيديو أفراحك",
  description: "رابط حجز أنيق يساعد العروس على اختيار بكج تصوير الفيديو والإضافات وإرسال تفاصيل المناسبة بخطوات بسيطة.",
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: "https://asmaa.video/reserve"
  },
  openGraph: {
    title: "رابط العروس | Asmaa Video",
    description: "اختيار المدينة والتاريخ والبكج ثم إرسال تفاصيل المناسبة برسالة واتساب مرتبة.",
    url: "https://asmaa.video/reserve",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "رابط العروس | Asmaa Video",
    "اختيار المدينة والتاريخ والبكج ثم إرسال تفاصيل المناسبة برسالة واتساب مرتبة."
  )
};

export default function ReservePage() {
  return <ReservationExperience />;
}

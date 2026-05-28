import type { Metadata } from "next";
import { ReservationExperience } from "../../components/ReservationExperience";

export const metadata: Metadata = {
  title: "رابط العروس | Asmaa Studio",
  description: "رابط حجز أنيق يساعد العروس على اختيار باقة تصوير الزفاف وإرسال تفاصيل المناسبة بخطوات بسيطة.",
  alternates: {
    canonical: "https://asmaa.video/reserve"
  }
};

export default function ReservePage() {
  return <ReservationExperience />;
}

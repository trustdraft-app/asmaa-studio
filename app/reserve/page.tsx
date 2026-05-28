import type { Metadata } from "next";
import { ReservationExperience } from "../../components/ReservationExperience";

export const metadata: Metadata = {
  title: "رابط العروس | Asmaa Studio",
  description: "نموذج حجز سهل للعروس لاختيار باقة تصوير الزفاف وإرسال تفاصيل المناسبة.",
  alternates: {
    canonical: "https://asmaa.video/reserve"
  }
};

export default function ReservePage() {
  return <ReservationExperience />;
}

import type { Metadata } from "next";
import { OccasionPage, type Occasion } from "../../components/seo/OccasionPage";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const title = "جلسة تصوير رمضانية في المنطقة الشرقية | Asmaa Video";
const description =
  "جلسة تصوير رمضانية نسائية في الأحساء والدمام والخبر. توثيق الغبقات والمناسبات العائلية النسائية في رمضان بفريق نسائي بالكامل وخصوصية تامة. التغطية تبدأ من ٦٠٠ ريال.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://asmaa.video/ramadan" },
  openGraph: {
    title,
    description,
    url: "https://asmaa.video/ramadan",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(title, description)
};

const occasion: Occasion = {
  slug: "ramadan",
  eyebrow: "مناسبات رمضان النسائية",
  h1: "جلسة تصوير رمضانية بأجواء دافئة وفريق نسائي بالكامل",
  answerBox:
    "أسماء فيديو يوثق المناسبات الرمضانية النسائية في المنطقة الشرقية: غبقات العائلة، حفلات القرقيعان، والملكات التي تقام في رمضان. فريق نسائي بالكامل يضمن خصوصية تامة، والتغطية تبدأ من ٦٠٠ ريال مع تسليم فيديو عالي الدقة جاهز للمشاركة. الحجز برسالة واتساب واحدة.",
  serviceNameAr: "جلسة تصوير رمضانية",
  serviceNameEn: "Ramadan Session",
  priceFrom: 600,
  ideas: [
    { title: "غبقة العائلة", body: "توثيق هادئ لتجمع النساء على الغبقة: الضيافة، التفاصيل، واللحظات العفوية بإضاءة رمضانية دافئة." },
    { title: "ملكة أو خطوبة في رمضان", body: "كثير من الملكات تقام بعد التراويح — نغطي الدخول والشبكة والتفاصيل بنفس باقات الخطوبة المعلنة." },
    { title: "قرقيعان الأطفال", body: "تغطية قصيرة مرحة لحفل القرقيعان داخل البيت أو الاستراحة، مناسبة للمشاركة العائلية." }
  ],
  faqs: [
    { q: "هل تتوفر مواعيد تصوير بعد الإفطار؟", a: "نعم، مواعيد رمضان مسائية بطبيعتها — من بعد الإفطار وحتى وقت متأخر، حسب توفر التاريخ. أرسلي تاريخك مبكرا لأن ليالي رمضان تمتلئ بسرعة." },
    { q: "كم تكلفة تغطية الغبقة؟", a: "التغطية القصيرة تبدأ من ٦٠٠ ريال، وإذا كانت المناسبة أطول أو تشمل ملكة فالباقات تصل إلى ٢٥٠٠ ريال لليوم الكامل. كل الأسعار معلنة في صفحة الباقات." },
    { q: "هل التصوير نسائي بالكامل؟", a: "نعم، الفريق نسائي من الوصول إلى التسليم، وهذا يناسب الغبقات والمناسبات الرمضانية النسائية المغلقة." }
  ]
};

export default function RamadanPage() {
  return (
    <main className="page-shell city-page">
      <SiteHeader />
      <OccasionPage occasion={occasion} />
      <SiteFooter />
    </main>
  );
}

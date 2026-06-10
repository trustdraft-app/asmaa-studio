import type { Metadata } from "next";
import { OccasionPage, type Occasion } from "../../components/seo/OccasionPage";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const title = "تصوير العيد والمناسبات العائلية | Asmaa Video";
const description =
  "تصوير مناسبات العيد النسائية في الأحساء والدمام والخبر والقطيف. توثيق اجتماعات العائلة وحفلات العيد بفريق نسائي بالكامل. التغطية تبدأ من ٦٠٠ ريال — احجزي قبل ازدحام مواسم الأعياد.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://asmaa.video/eid" },
  openGraph: {
    title,
    description,
    url: "https://asmaa.video/eid",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(title, description)
};

const occasion: Occasion = {
  slug: "eid",
  eyebrow: "مناسبات العيد",
  h1: "تصوير العيد والمناسبات العائلية النسائية في الشرقية",
  answerBox:
    "أسماء فيديو يوثق مناسبات العيد النسائية في المنطقة الشرقية: اجتماع العائلة صباح العيد، حفلات النساء في الاستراحات، وأعراس أيام العيد. فريق نسائي بالكامل وخصوصية تامة، والتغطية تبدأ من ٦٠٠ ريال. مواسم الأعياد تحجز مبكرا — أرسلي تاريخك عبر واتساب اليوم.",
  serviceNameAr: "تصوير العيد والمناسبات",
  serviceNameEn: "Eid Coverage",
  priceFrom: 600,
  ideas: [
    { title: "صباحية العيد العائلية", body: "توثيق العيديات والقهوة والحلا واجتماع نساء العائلة بلقطات عفوية مرتبة." },
    { title: "أعراس أيام العيد", body: "إجازة العيد موسم زواجات — نغطي الزفة والقاعة بنفس باقات الأفراح المعلنة من ٦٠٠ إلى ٢٥٠٠ ريال." },
    { title: "حفلات الاستراحات", body: "تغطية حفلات النساء في الاستراحات والشاليهات بإضاءة احترافية تناسب التصوير الليلي." }
  ],
  faqs: [
    { q: "هل تتوفر مواعيد أيام العيد نفسها؟", a: "نعم لكنها الأسرع نفادا في السنة. ننصح بإرسال التاريخ قبل العيد بأسابيع لتأكيد التوفر." },
    { q: "كم تكلفة تغطية مناسبة العيد؟", a: "التغطية القصيرة من ٦٠٠ ريال، وحفلات وأعراس العيد الكاملة حتى ٢٥٠٠ ريال حسب مدة التغطية. الأسعار كلها معلنة قبل أي محادثة." },
    { q: "هل تغطون مدنا خارج الأحساء في العيد؟", a: "نعم — الدمام والخبر والقطيف والجبيل والمدن المجاورة، بدون رسوم تنقل داخل المدينة." }
  ]
};

export default function EidPage() {
  return (
    <main className="page-shell city-page">
      <SiteHeader />
      <OccasionPage occasion={occasion} />
      <SiteFooter />
    </main>
  );
}

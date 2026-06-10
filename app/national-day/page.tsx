import type { Metadata } from "next";
import { OccasionPage, type Occasion } from "../../components/seo/OccasionPage";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const title = "جلسة تصوير اليوم الوطني | Asmaa Studio";
const description =
  "جلسة تصوير نسائية بمناسبة اليوم الوطني السعودي في المنطقة الشرقية. توثيق احتفالات العائلة والمناسبات النسائية بالهوية الوطنية، بفريق نسائي بالكامل. التغطية تبدأ من ٦٠٠ ريال.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://asmaa.video/national-day" },
  openGraph: {
    title,
    description,
    url: "https://asmaa.video/national-day",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(title, description)
};

const occasion: Occasion = {
  slug: "national-day",
  eyebrow: "اليوم الوطني السعودي",
  h1: "جلسة يوم وطني بلمسة نسائية وتفاصيل خضراء أنيقة",
  answerBox:
    "أسماء ستوديو يقدم جلسات تصوير نسائية بمناسبة اليوم الوطني السعودي في المنطقة الشرقية: احتفالات العائلة، فعاليات المدارس النسائية، وجلسات بالهوية الوطنية الخضراء. فريق نسائي بالكامل يضمن الخصوصية، والتغطية تبدأ من ٦٠٠ ريال مع تسليم فيديو جاهز للمشاركة في يوم الاحتفال.",
  serviceNameAr: "جلسة يوم وطني",
  serviceNameEn: "Saudi National Day Session",
  priceFrom: 600,
  ideas: [
    { title: "احتفال العائلة", body: "توثيق تجمع النساء والأطفال بالزي الأخضر والتفاصيل الوطنية بلقطات مرتبة قابلة للمشاركة." },
    { title: "فعاليات نسائية", body: "تغطية فعاليات المدارس والجهات النسائية في اليوم الوطني بفريق نسائي يحترم خصوصية الحضور." },
    { title: "جلسة بالهوية الوطنية", body: "جلسة قصيرة بخلفيات وإضاءة بألوان العلم — مناسبة للعائلات وصاحبات المشاريع." }
  ],
  faqs: [
    { q: "متى أحجز جلسة اليوم الوطني؟", a: "قبل ٢٣ سبتمبر بأسبوعين على الأقل — أسبوع اليوم الوطني يزدحم بالفعاليات النسائية والعائلية." },
    { q: "كم تكلفة الجلسة؟", a: "الجلسات القصيرة تبدأ من ٦٠٠ ريال وتزيد حسب مدة التغطية وعدد المواقع. الأسعار معلنة بالكامل قبل الحجز." },
    { q: "هل التغطية مناسبة للفعاليات المغلقة؟", a: "نعم، الفريق نسائي بالكامل من التصوير إلى التسليم، وهذا يناسب الفعاليات النسائية المغلقة في المدارس والقاعات." }
  ]
};

export default function NationalDayPage() {
  return (
    <main className="page-shell city-page">
      <SiteHeader />
      <OccasionPage occasion={occasion} />
      <SiteFooter />
    </main>
  );
}

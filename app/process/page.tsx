import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

export const metadata: Metadata = {
  title: "كيف نصوّر — رحلة العميلة معنا",
  description:
    "خطوات الحجز، يوم التصوير، التسليم — كل خطوة موضّحة. شفافية كاملة من اللحظة الأولى.",
  alternates: { canonical: "https://asmaa.video/process" },
  openGraph: {
    title: "كيف نصوّر مع Asmaa Studio",
    description: "خطوات واضحة من الحجز للتسليم.",
    url: "https://asmaa.video/process",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA",
  },
  twitter: twitterMetadata("كيف نصوّر مع Asmaa Studio", "شفافية كاملة من الحجز للتسليم."),
};

const steps = [
  { n: 1, title: "التواصل الأول", desc: "تتواصلين معنا عبر واتساب أو نموذج الحجز. نسألك ٤ أسئلة فقط: التاريخ، المدينة، نوع الحفل، الباقة المبدئية.", duration: "في نفس اليوم" },
  { n: 2, title: "تأكيد التوفّر", desc: "نراجع التاريخ ونردّ خلال ٢٤ ساعة بتأكيد التوفر أو اقتراح بدائل قريبة.", duration: "خلال ٢٤ ساعة" },
  { n: 3, title: "الباقة وعقد الحجز", desc: "نوضح الباقة بالتفصيل، نتفق على الإضافات، وترسلين العربون (٣٠٪) لتثبيت التاريخ. عقد رقمي موثّق.", duration: "خلال ٤٨ ساعة من تأكيد التوفر" },
  { n: 4, title: "ما قبل التصوير", desc: "نتواصل معك قبل التصوير بأسبوع لمراجعة جدول اليوم، نوع الإضاءة، التوقعات الخاصة، وقائمة اللحظات المهمة.", duration: "أسبوع قبل التصوير" },
  { n: 5, title: "يوم التصوير", desc: "نصل قبل الموعد بساعة. الطاقم نسائي كامل. نلتقط القاعة، تفاصيل العروس، اللحظات العائلية، الرقصات.", duration: "حسب الباقة (٤–١٢ ساعة)" },
  { n: 6, title: "المونتاج", desc: "نسلّم النسخة الأولى خلال ٣ أسابيع. تراجعينها وتطلبين تعديلات (مجانية، حتى مرتين).", duration: "٣ أسابيع للنسخة الأولى" },
  { n: 7, title: "التسليم النهائي", desc: "ملفات نهائية بصيغ متعددة (4K للأرشيف، 1080p للمشاركة، نسخة قصيرة للسوشيال).", duration: "خلال أسبوع من تأكيد المراجعة" },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "كيف نصوّر حفل زفافك مع Asmaa Studio",
  description: "٧ خطوات واضحة من الحجز للتسليم النهائي.",
  totalTime: "P30D",
  estimatedCost: { "@type": "MonetaryAmount", currency: "SAR", value: "600-2500" },
  step: steps.map((s) => ({
    "@type": "HowToStep",
    position: s.n,
    name: s.title,
    text: s.desc,
  })),
};

export default function ProcessPage() {
  return (
    <main className="page-shell" dir="rtl" lang="ar">
      <JsonLd data={howToJsonLd} />
      <section className="section">
        <div className="section-inner">
          <header className="mb-12 max-w-3xl">
            <span className="metal-kicker">رحلة العميلة معنا</span>
            <h1 className="mt-4 text-display-xl" data-speakable>
              من الحجز إلى التسليم — كل خطوة موضّحة
            </h1>
            <p className="mt-5 text-body-lg leading-relaxed text-muted-foreground">
              لا مفاجآت ولا غموض. كل خطوة لها مدة معروفة وشيء تنتظرينه منّا.
            </p>
          </header>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="rounded-3xl border border-border bg-card/40 p-8 backdrop-blur">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-400 text-2xl font-semibold text-neutral-950">
                    {s.n}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-foreground">{s.title}</h2>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
                    <p className="mt-3 inline-flex rounded-full bg-gold-400/10 px-3 py-1 text-sm text-gold-300">
                      المدة المتوقعة: {s.duration}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-16 rounded-3xl border border-border bg-card/30 p-8 text-center backdrop-blur">
            <h2 className="text-3xl font-semibold text-foreground">جاهزة تحجزين موعدك؟</h2>
            <p className="mt-3 text-muted-foreground">ابدئي بالتواصل عبر واتساب أو اطلعي على الباقات أولاً.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/packages" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background hover:opacity-90">
                تصفّحي الباقات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

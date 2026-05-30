import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, MessageCircle } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { bookingFaqs, whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";

export const metadata: Metadata = {
  title: "أسئلة الحجز",
  description:
    "أسئلة الحجز الأكثر تكرارا لدى العروس: اختيار الباقة، وقت الحضور، العربون، المدن، وطريقة تأكيد التوفر مع Asmaa Studio.",
  alternates: {
    canonical: "https://asmaa.video/faq"
  },
  openGraph: {
    title: "أسئلة حجز Asmaa Studio",
    description:
      "إجابات قصيرة وواضحة عن اختيار الباقة، وقت الحضور، العربون، والخطوة التالية قبل واتساب.",
    url: "https://asmaa.video/faq",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "أسئلة حجز Asmaa Studio",
    "إجابات قصيرة وواضحة عن اختيار الباقة، وقت الحضور، العربون، والخطوة التالية قبل واتساب."
  )
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://asmaa.video/"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "أسئلة الحجز",
      item: "https://asmaa.video/faq"
    }
  ]
};

export default function FaqPage() {
  return (
    <main className="page-shell">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href="/">
              العودة للرئيسية
            </Link>
            <span className="eyebrow">أسئلة قبل الحجز</span>
            <h1 className="section-title">أسئلة الحجز التي تختصر التردد قبل أول رسالة.</h1>
            <p className="section-copy">
              هذه الصفحة تجمع الإجابات القصيرة التي تحتاجها العروس عادة قبل واتساب: كيف تختار
              الباقة، متى يكون الحضور، ماذا يرسل في أول رسالة، ومتى يتم تأكيد التوفر.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve">
                افتحي رابط العروس <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink("faq-page")} target="_blank" rel="noreferrer">
                اسألي عبر واتساب <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card">
            <span>قبل التواصل</span>
            <h2>قرار أوضح</h2>
            <p>إجابات مباشرة تقلل الأسئلة المكررة وتساعدك على إرسال تفاصيل اليوم بشكل مرتب من أول مرة.</p>
            <div>
              <em>اختيار الباقة</em>
              <em>وقت الحضور</em>
              <em>العربون</em>
              <em>تأكيد التوفر</em>
            </div>
          </aside>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-inner">
          <span className="eyebrow">إجابات قصيرة وواضحة</span>
          <h2 className="section-title">كل سؤال هنا مكتوب لتسهيل القرار، لا لإطالة الطريق.</h2>
          <div className="faq-grid">
            {bookingFaqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section board-live">
        <div className="section-inner">
          <span className="eyebrow">بعد قراءة الأسئلة</span>
          <h2 className="section-title">إذا أصبحت الصورة أوضح، انتقلي مباشرة إلى الخطوة التالية.</h2>
          <div className="board-lever-grid">
            <article className="board-lever-card">
              <h3>رابط العروس</h3>
              <p>اختاري المدينة والتاريخ والباقة واكتبي أهم تفاصيل اليوم برسالة مرتبة.</p>
            </article>
            <article className="board-lever-card">
              <h3>واتساب أسرع</h3>
              <p>إذا كنت تعرفين ما تريدينه بالفعل، ابدئي بالمحادثة مباشرة مع ذكر التاريخ والمدينة والبكج.</p>
            </article>
            <article className="board-lever-card">
              <h3>صفحات المدن</h3>
              <p>شاهدي صفحة الأحساء أو الدمام أو الخبر إذا كان قرارك مرتبطا بالمدينة وطبيعة المناسبة.</p>
            </article>
          </div>
          <div className="button-row" style={{ marginTop: 28 }}>
            <Link className="cta" href="/reserve">
              رابط العروس <ArrowLeft size={18} />
            </Link>
            <Link className="ghost-cta" href="/zaffa">
              بكج الزفة <CalendarDays size={18} />
            </Link>
            <Link className="ghost-cta" href="/alahsa">
              صفحة الأحساء <CheckCircle2 size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

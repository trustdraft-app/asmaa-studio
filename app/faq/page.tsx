import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MessageCircle, MapPin } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { whatsappLink } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description:
    "إجابات واضحة على أكثر الأسئلة تكرارًا عن باقات Asmaa Studio: الأسعار، التسليم، مدة المونتاج، الصيغ، والمدن.",
  alternates: {
    canonical: "https://asmaa.video/faq"
  },
  openGraph: {
    title: "الأسئلة الشائعة | Asmaa Studio",
    description:
      "إجابات واضحة على أسئلة الأسعار والباقات ومدة التسليم وصيغ الفيديو مع Asmaa Studio.",
    url: "https://asmaa.video/faq",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "الأسئلة الشائعة | Asmaa Studio",
    "إجابات واضحة على أسئلة الأسعار والباقات ومدة التسليم وصيغ الفيديو مع Asmaa Studio."
  )
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://asmaa.video/" },
    { "@type": "ListItem", position: 2, name: "الأسئلة الشائعة", item: "https://asmaa.video/faq" }
  ]
};

const faqs = [
  {
    q: "ما هي أسعار الباقات؟",
    a: "تبدأ الباقات من بكج الزفة للمناسبات القصيرة، وتصل إلى الباقات الشاملة ليوم كامل. كل باقة مرتبطة بعدد اللحظات والساعات المغطاة. تواصلي عبر واتساب أو رابط العروس للحصول على السعر الدقيق حسب تاريخك ومدينتك."
  },
  {
    q: "ما الفرق بين الباقات المتاحة؟",
    a: "بكج الزفة يركز على لحظة الدخول والزفة. باقات الخطوبة تشمل تجهيز العروس والتفاصيل الأنثوية. الباقات الشاملة تغطي اليوم كاملًا من التجهيز حتى نهاية المناسبة. الاختيار يعتمد على عدد اللحظات التي تريدين حفظها."
  },
  {
    q: "كم تستغرق مدة التسليم بعد المناسبة؟",
    a: "مدة المونتاج والتسليم تتراوح بين أسبوعين إلى أربعة أسابيع بحسب الباقة والموسم. يتم إبلاغك بالمدة الدقيقة عند تأكيد الحجز."
  },
  {
    q: "بأي صيغة يُسلَّم الفيديو؟",
    a: "يُسلَّم الفيديو بصيغة MP4 عالية الدقة (1080p أو 4K حسب الباقة) عبر رابط تحميل خاص. الفيديو جاهز للعرض على الجوال والتلفاز ومنصات التواصل الاجتماعي مباشرة."
  },
  {
    q: "هل يشمل التسليم هايلايت لمنصات التواصل الاجتماعي؟",
    a: "نعم، تتضمن معظم الباقات هايلايت قصيرة مناسبة للإنستقرام والتيك توك بجانب الفيديو الكامل. تفاصيل ما يشمله كل بكج تظهر عند التواصل."
  },
  {
    q: "كيف أحجز وما هي شروط العربون؟",
    a: "الحجز يبدأ بملء رابط العروس أو التواصل عبر واتساب بذكر التاريخ والمدينة والباقة. يُثبَّت الموعد بعربون 50% من قيمة الباقة، والمتبقي يُدفع يوم المناسبة."
  },
  {
    q: "هل يمكن إضافة لحظات أو خدمات خارج الباقة؟",
    a: "نعم، هناك إضافات متاحة مثل تصوير الحناء أو الخطوبة المنفصلة أو تمديد ساعات الحضور. يتم الاتفاق عليها مسبقًا حسب جدول اليوم."
  },
  {
    q: "هل الخدمة متاحة في الأحساء والدمام والخبر؟",
    a: "نعم، تغطي Asmaa Studio الأحساء والدمام والخبر والمنطقة الشرقية. اذكري المدينة واسم القاعة عند التواصل لتأكيد التوفر والتنسيق المناسب."
  },
  {
    q: "ما ساعات التواصل والرد على الاستفسارات؟",
    a: "يمكنك التواصل عبر واتساب أو رابط العروس في أي وقت. الرد على الاستفسارات يكون خلال أوقات العمل: الأحد إلى الخميس من 9 صباحًا حتى 9 مساءً."
  },
  {
    q: "هل يمكن مشاهدة أعمال سابقة قبل الحجز؟",
    a: "نعم، يمكنك الاطلاع على الألبوم وعينات الأعمال في صفحة البورتفوليو على الموقع، أو طلب أمثلة إضافية عبر واتساب قبل اتخاذ قرار الحجز."
  }
];

export default function FaqPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/">
              <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
            </Link>
            <span className="eyebrow">الأسئلة الشائعة</span>
            <h1 className="section-title">كل ما تحتاجينه قبل قرار الحجز في مكان واحد.</h1>
            <p className="section-copy">
              إجابات مباشرة عن الأسعار والباقات ومدة التسليم وصيغ الفيديو والمدن — حتى يكون
              قرارك أوضح قبل التواصل.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href="/reserve">
                رابط العروس <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink("faq-page")} target="_blank" rel="noreferrer">
                اسألي عبر واتساب <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card">
            <span>قبل التواصل</span>
            <h2>١٠ إجابات</h2>
            <p>أسئلة الأسعار والباقات والتسليم والمدن كلها هنا — اقرئيها بهدوء ثم تواصلي.</p>
            <div>
              <em>الأسعار والباقات</em>
              <em>مدة التسليم</em>
              <em>صيغ الفيديو</em>
              <em>المدن</em>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section faq-section">
        <div className="section-inner">
          <span className="eyebrow">إجابات واضحة</span>
          <h2 className="section-title">أسئلة الأسعار والباقات والتسليم — موجودة هنا.</h2>
          <div className="faq-accordion">
            {faqs.map((item, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">
                  <span>{item.q}</span>
                  <span className="faq-chevron" aria-hidden="true">&#x25BE;</span>
                </summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="section board-live">
        <div className="section-inner">
          <span className="eyebrow">الخطوة التالية</span>
          <h2 className="section-title">إذا أصبح كل شيء واضحًا، انتقلي مباشرة للحجز.</h2>
          <div className="board-lever-grid">
            <article className="board-lever-card">
              <h3>رابط العروس</h3>
              <p>اختاري المدينة والتاريخ والباقة واكتبي تفاصيل يومك في خطوات قصيرة.</p>
            </article>
            <article className="board-lever-card">
              <h3>واتساب مباشر</h3>
              <p>إذا عندك سؤال إضافي ابدئي المحادثة مباشرة — ذكري التاريخ والمدينة والباقة.</p>
            </article>
            <article className="board-lever-card">
              <h3>تواصلي معنا</h3>
              <p>هاتف أو إيميل أو موقعنا في المنطقة الشرقية — كل طرق التواصل في صفحة واحدة.</p>
            </article>
          </div>
          <div className="button-row" style={{ marginTop: 28 }}>
            <Link className="cta" href="/reserve">
              رابط العروس <CalendarDays size={18} />
            </Link>
            <Link className="ghost-cta" href="/contact">
              <MapPin size={18} /> تواصلي معنا
            </Link>
            <Link className="ghost-cta" href="/portfolio">
              الألبوم <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    <SiteFooter />
    </main>
  );
}

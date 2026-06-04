import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle, Search } from "lucide-react";
import { JsonLd } from "../../../../components/JsonLd";
import { packages, whatsappLink } from "../../../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../../../lib/metadata";
import { seoCities, seoServices } from "../../../../lib/seo-grid";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return seoCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = seoCities.find((item) => item.slug === citySlug);

  if (!city) {
    return { title: "Asmaa Studio" };
  }

  const title = `تجهيز العروس قبل تصوير الزفاف في ${city.ar} | Asmaa Studio`;
  const description = `قائمة مختصرة للعروس في ${city.ar} قبل تصوير الزفاف أو الخطوبة: القاعة، وقت الزفة، تفاصيل العروس، واختيار الباقة المناسبة مع Asmaa Studio.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://asmaa.video/ar/${city.slug}/bride-checklist`,
      languages: {
        "ar-SA": `https://asmaa.video/ar/${city.slug}/bride-checklist`,
        "x-default": `https://asmaa.video/ar/${city.slug}/bride-checklist`
      }
    },
    openGraph: {
      title,
      description,
      url: `https://asmaa.video/ar/${city.slug}/bride-checklist`,
      siteName: "Asmaa Studio",
      images: socialPreviewImages,
      type: "article",
      locale: "ar_SA"
    },
    twitter: twitterMetadata(title, description),
    robots: { index: true, follow: true }
  };
}

export default async function BrideChecklistPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = seoCities.find((item) => item.slug === citySlug);

  if (!city) notFound();

  const packageOptions = packages.filter((item) => ["01", "03", "04", "05"].includes(item.id));
  const relatedServices = seoServices
    .filter((service) => service.packageId && ["01", "03", "04", "05"].includes(service.packageId))
    .slice(0, 4);
  const guideChecks = [
    `اسم القاعة أو الحي داخل ${city.ar} حتى يكون الوصول مرتباً قبل الزفة.`,
    "وقت بداية المناسبة ووقت الزفة المتوقع، لا التاريخ فقط.",
    "الباقة الأقرب لعدد اللحظات التي تريدين حفظها: زفة، خطوبة، Half Day، أو Full Day.",
    "هل تريدين تفاصيل العروس مثل المجوهرات والمسكة والعطر والكعب؟",
    "أي ملاحظة مهمة مثل First Look أو ترتيب التلبيس أو لحظة الشبكة."
  ];
  const promiseBullets = [
    `هذه الصفحة مخصصة لعروس ${city.ar} التي تريد تقليل الرسائل المتكررة قبل الحجز.`,
    "الهدف ليس ملء نموذج طويل، بل تجهيز رسالة واضحة تختصر الوقت على الطرفين.",
    "إذا كانت الباقة غير محسومة بعد، يكفي تحديد نوع المناسبة وأقرب مدة تغطية."
  ];
  const sourceLabel = `bride-checklist-${city.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://asmaa.video/ar/${city.slug}/bride-checklist#article`,
        headline: `تجهيز العروس قبل تصوير الزفاف في ${city.ar}`,
        description: `قائمة مختصرة للعروس في ${city.ar} قبل تصوير الزفاف أو الخطوبة مع Asmaa Studio.`,
        inLanguage: "ar-SA",
        mainEntityOfPage: `https://asmaa.video/ar/${city.slug}/bride-checklist`,
        author: {
          "@type": "Organization",
          "@id": "https://asmaa.video/#organization",
          name: "Asmaa Studio",
          url: "https://asmaa.video/"
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://asmaa.video/#organization",
          name: "Asmaa Studio"
        },
        about: [city.ar, "تصوير الزفاف", "تصوير الخطوبة", "تجهيز رسالة الحجز"]
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Asmaa Studio", item: "https://asmaa.video/" },
          { "@type": "ListItem", position: 2, name: city.ar, item: `https://asmaa.video/${city.slug}` },
          {
            "@type": "ListItem",
            position: 3,
            name: "تجهيز العروس قبل التصوير",
            item: `https://asmaa.video/ar/${city.slug}/bride-checklist`
          }
        ]
      }
    ]
  };

  return (
    <main className="page-shell">
      <JsonLd data={articleJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="ghost-cta" href={`/${city.slug}`}>
              <ArrowLeft size={16} /> صفحة {city.ar}
            </Link>
            <span className="eyebrow">Bride Checklist / {city.ar}</span>
            <h1 className="section-title">تجهيز العروس قبل تصوير الزفاف في {city.ar}</h1>
            <p className="section-copy">
              إذا كانت أول رسالة ستبدأ اليوم، فهذه القائمة تختصر ما تحتاجه العروس في {city.ar} قبل سؤال التوفر واختيار الباقة.
            </p>
            <div className="city-intent">
              <article>
                <Search size={22} />
                <strong>نية البحث</strong>
                <span>عروس تريد معرفة ماذا ترسل قبل الحجز حتى يكون الرد أسرع وأوضح.</span>
              </article>
              <article>
                <MapPin size={22} />
                <strong>داخل {city.ar}</strong>
                <span>{city.neighborhoodSignals.slice(0, 3).join("، ")}</span>
              </article>
            </div>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="cta" href={`/reserve?city=${city.slug}`}>
                رابط العروس <CalendarDays size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink(sourceLabel)} target="_blank" rel="noreferrer">
                أرسلي الطلب على واتساب <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <aside className="city-command-card">
            <span>ما الذي يختصر القرار؟</span>
            <h2>خمس نقاط قبل الرسالة الأولى</h2>
            <div className="city-wave-list">
              {guideChecks.map((item) => (
                <p key={item}>
                  <Check size={16} />
                  {item}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">كيف تستخدمين هذه الصفحة</span>
            <h2>رسالة أوضح، قرار أسرع</h2>
            <div className="city-wave-list">
              {promiseBullets.map((item) => (
                <p key={item}>
                  <Check size={16} />
                  {item}
                </p>
              ))}
            </div>
          </article>
          <article>
            <span className="eyebrow">اقتراح سريع للباقات</span>
            <h2>ابدئي من اللحظة الأهم لا من السعر فقط</h2>
            <div className="city-wave-list">
              {relatedServices.map((service) => (
                <p key={service.slug}>
                  <Check size={16} />
                  <Link href={`/ar/${city.slug}/${service.slug}`}>{service.ar} في {city.ar}</Link>
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">الباقات الأقرب لهذا البحث</span>
          <h2 className="section-title">اختاري الباقة ثم أضيفي تفاصيل المناسبة في الرسالة نفسها.</h2>
          <div className="packages-grid packages-grid-20x">
            {packageOptions.map((item) => (
              <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
                <header>
                  <small>بكج {item.id}</small>
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} ريال</p>
                </header>
                <p>{item.summary}</p>
                <div className="package-best">
                  <strong>متى تختارينه؟</strong>
                  <span>{item.bestFor}</span>
                </div>
                <a href={whatsappLink(`${sourceLabel}-package-${item.id}`)} target="_blank" rel="noreferrer">
                  اسألي عن هذا البكج <ArrowLeft size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

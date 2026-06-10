import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageCircle } from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { instagramUrl, packages, serviceAreas, tiktokUrl, whatsappLink, whatsappNumber } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const metaTitle = "تصوير فيديو زفاف في المنطقة الشرقية | Wedding Videography Eastern Province";
const metaDescription =
  "استوديو تصوير فيديو زفاف نسائي يغطّي كل مدن المنطقة الشرقية — الأحساء والدمام والخبر والقطيف والجبيل. طاقم نسائي بالكامل، فيلم سينمائي، وباقات واضحة من 600 إلى 2500 ريال. Female-only wedding videography across Saudi Arabia's Eastern Province.";

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description: metaDescription,
  alternates: {
    canonical: "https://asmaa.video/eastern-province"
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: "https://asmaa.video/eastern-province",
    siteName: "Asmaa Video",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(metaTitle, metaDescription)
};

// Primary metropolitan cities of the Eastern Province (the Al-Ahsa sub-towns —
// hofuf/mubarraz/etc. — keep their own pages but roll up under Al-Ahsa here).
const hubCitySlugs = ["alahsa", "dammam", "khobar", "qatif", "jubail"];

export default function EasternProvincePage() {
  const cities = hubCitySlugs
    .map((slug) => serviceAreas.find((area) => area.slug === slug))
    .filter((area): area is NonNullable<typeof area> => Boolean(area));

  const regionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://asmaa.video/eastern-province#service",
    name: "تصوير فيديو زفاف نسائي في المنطقة الشرقية",
    serviceType: "Female wedding videography",
    inLanguage: ["ar-SA", "en"],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Eastern Province, Saudi Arabia",
      alternateName: "المنطقة الشرقية"
    },
    provider: {
      "@type": "Organization",
      "@id": "https://asmaa.video/#organization",
      name: "Asmaa Video",
      url: "https://asmaa.video/",
      telephone: `+${whatsappNumber}`,
      logo: "https://asmaa.video/brand/asmaa-logo-square.png",
      sameAs: [instagramUrl, tiktokUrl]
    },
    offers: packages.map((item) => ({
      "@type": "Offer",
      name: item.name,
      price: item.price,
      priceCurrency: "SAR",
      description: item.summary,
      url: `https://asmaa.video/reserve?package=${item.id}`
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Asmaa Video", item: "https://asmaa.video/" },
      { "@type": "ListItem", position: 2, name: "المنطقة الشرقية", item: "https://asmaa.video/eastern-province" }
    ]
  };

  return (
    <main className="page-shell city-page">
      <SiteHeader />
      <JsonLd data={regionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/"><ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span></Link>
            <span className="eyebrow">المنطقة الشرقية / Eastern Province</span>
            <h1 className="section-title">تصوير فيديو زفاف نسائي يغطّي كل مدن المنطقة الشرقية</h1>
            <p className="section-copy">
              من الأحساء إلى الدمام والخبر والقطيف والجبيل — طاقم نسائي بالكامل يحوّل يومك إلى فيلم
              سينمائي بنفس الجودة والأسعار في كل مدينة. اختاري مدينتك للتفاصيل، أو راسلينا مباشرة عبر واتساب.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink("eastern-province")} target="_blank" rel="noreferrer">
                اسألي عن التوفر في مدينتك <MessageCircle size={18} />
              </a>
              <Link className="ghost-cta" href="/packages">
                الباقات التفاعلية <CalendarDays size={18} />
              </Link>
              <Link className="ghost-cta" href="/reserve">
                احجزي يومكِ <CalendarDays size={18} />
              </Link>
            </div>
          </div>

          <aside className="city-command-card">
            <span>تغطية كاملة للمنطقة الشرقية</span>
            <h2>كل المدن · سعر واحد</h2>
            <p>نفس الباقات والجودة في كل مدينة، بطاقم نسائي بالكامل لخصوصية حفلات النساء.</p>
            <div>
              <em>تصوير فيديو زفاف الشرقية</em>
              <em>طاقم نسائي بالكامل</em>
              <em>فيلم سينمائي ومونتاج</em>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="cities">
        <div className="section-inner">
          <span className="eyebrow">اختاري مدينتك</span>
          <h2 className="section-title">صفحة مخصّصة لكل مدينة في المنطقة الشرقية.</h2>
          <div className="faq-grid">
            {cities.map((area) => (
              <article key={area.slug}>
                <h3>{area.ar}</h3>
                <p>{area.en}</p>
                <div className="button-row" style={{ marginTop: 14 }}>
                  <Link className="ghost-cta compact" href={`/${area.slug}`}>
                    تفاصيل {area.ar} <ArrowLeft size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">الباقات في كل المنطقة الشرقية</span>
          <h2 className="section-title">باقة مناسبة لكل مناسبة، بنفس السعر في كل مدينة.</h2>
          <div className="packages-grid packages-grid-20x">
            {packages.map((item) => (
              <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
                <header>
                  <small>بكج {item.id}</small>
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} ريال</p>
                </header>
                <p>{item.summary}</p>
                <div className="package-sequence">
                  {item.sequence.map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>
                <a href={whatsappLink(`eastern-province-package-${item.id}`)} target="_blank" rel="noreferrer">
                  اسألي عن هذا البكج <ArrowLeft size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section city-proof-section">
        <div className="section-inner city-proof-grid">
          <article>
            <span className="eyebrow">لماذا أسماء فيديو في الشرقية</span>
            <h2>طاقم نسائي بالكامل وخبرة بقاعات كل مدينة.</h2>
            <p>
              نعرف اختلاف قاعات الأحساء التراثية، وصالات الدمام الحديثة، وفنادق الخبر البحرية،
              ونوازن الإضاءة في كل قاعة حتى لا تطغى الألوان على الفستان في الفيلم النهائي.
            </p>
          </article>
          <article>
            <span className="eyebrow">ما تحصلين عليه</span>
            <div className="city-wave-list">
              <p><Check size={16} /> طاقم نسائي بالكامل لخصوصية تامة</p>
              <p><Check size={16} /> فيلم سينمائي ومونتاج احترافي</p>
              <p><Check size={16} /> مقاطع قصيرة أنيقة للسوشيال ميديا</p>
              <p><Check size={16} /> باقات واضحة من 600 إلى 2500 ريال بلا مفاجآت</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-inner">
          <span className="eyebrow">أسئلة المنطقة الشرقية</span>
          <h2 className="section-title">إجابات قصيرة قبل أول رسالة واتساب.</h2>
          <div className="faq-grid">
            <article>
              <h3>هل تغطّون كل مدن المنطقة الشرقية؟</h3>
              <p>نعم، نغطّي الأحساء والدمام والخبر والظهران والجبيل والقطيف بنفس الباقات والأسعار. أرسلي اسم القاعة والمدينة والتاريخ عبر واتساب لتأكيد التوفر.</p>
            </article>
            <article>
              <h3>هل السعر يختلف بين المدن؟</h3>
              <p>لا، الأسعار نفسها في كل مدن المنطقة الشرقية: من 600 ريال لبكج الزفة إلى 2500 ريال لليوم الكامل، وباقة خطوبة بـ 1500 ريال، والساعة الإضافية 200 ريال بسعر ثابت.</p>
            </article>
            <article>
              <h3>هل الطاقم نسائي بالكامل؟</h3>
              <p>نعم، الطاقم نسائي بالكامل في كل المدن، وهو أساس لخصوصية حفلات النساء يتيح تصوير لحظات التحضير والزفة بخصوصية تامة فيخرج الفيلم صادقًا وعفويًا.</p>
            </article>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

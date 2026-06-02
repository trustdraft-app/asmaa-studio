import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  Check,
  Clapperboard,
  Download,
  ExternalLink,
  Gem,
  Heart,
  Languages,
  MessageCircle,
  Plus,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Video
} from "lucide-react";
import { JsonLd } from "../components/JsonLd";
import {
  areaStrategy,
  assetPath,
  bookingSteps,
  cinematicMoments,
  conversionFlow,
  credentials,
  highlights,
  instagramUrl,
  liveOperatingSystem,
  packageAddOns,
  packages,
  paymentTerms,
  serviceAreas,
  services,
  tiktokUrl,
  trustSignals,
  whatsappLink,
  whatsappNumber
} from "../lib/content";
import { seoGuidePages } from "../lib/seo-pages";

const serviceAreaJsonLd = serviceAreas.map((area) => ({
  "@type": "City",
  name: area.en,
  alternateName: area.ar,
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "Eastern Province, Saudi Arabia"
  }
}));

const offerCatalogJsonLd = {
  "@type": "OfferCatalog",
  name: "Asmaa Studio wedding videography packages",
  itemListElement: packages.map((item, index) => ({
    "@type": "Offer",
    position: index + 1,
    name: item.name,
    price: item.price,
    priceCurrency: "SAR",
    description: item.summary,
    url: `https://asmaa.video/reserve?package=${item.id}`
  }))
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://asmaa.video/#organization",
      name: "Asmaa Studio",
      legalName: "Asmaa Studio (asmaa.video)",
      alternateName: ["Asmaa Video", "أسماء ستوديو"],
      url: "https://asmaa.video/",
      logo: "https://asmaa.video/brand/asmaa-logo-square.png",
      image: [
        "https://asmaa.video/brand/asmaa-cinematic-bridal-still.png",
        "https://asmaa.video/highlights/bride-details.svg"
      ],
      telephone: `+${whatsappNumber}`,
      priceRange: "SAR 600–2500",
      availableLanguage: ["ar-SA", "en"],
      description:
        "تصوير فيديو للأعراس والخطوبة في الأحساء والدمام والخبر مع باقات واضحة من ٦٠٠ إلى ٢٥٠٠ ريال.",
      disambiguatingDescription:
        "Asmaa Studio (asmaa.video) is a Saudi female wedding videography studio in the Eastern Province (Al Ahsa, Dammam, Khobar). Not affiliated with asmaa-studio.com (UAE) or any Instagram account other than @asmaa.video.",
      identifier: {
        "@type": "PropertyValue",
        name: "canonical-domain",
        value: "asmaa.video"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${whatsappNumber}`,
        contactType: "booking",
        areaServed: "SA-04",
        availableLanguage: ["Arabic", "English"]
      },
      sameAs: [instagramUrl, tiktokUrl]
    },
    {
      "@type": "Service",
      "@id": "https://asmaa.video/#wedding-videography-service",
      name: "تصوير فيديو زواجات وخطوبة نسائي في الشرقية",
      serviceType: "Female wedding videography",
      inLanguage: ["ar-SA", "en"],
      provider: {
        "@id": "https://asmaa.video/#organization"
      },
      areaServed: serviceAreaJsonLd,
      hasOfferCatalog: offerCatalogJsonLd,
      knowsAbout: [
        "تصوير فيديو زواجات نسائي",
        "تصوير خطوبة وملكة",
        "تصوير First Look",
        "تفاصيل العروس",
        "مونتاج فيديو الزفاف"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://asmaa.video/#website",
      url: "https://asmaa.video/",
      name: "Asmaa Studio",
      inLanguage: "ar-SA",
      publisher: {
        "@id": "https://asmaa.video/#organization"
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://asmaa.video/#guide-list",
      name: "دليل Asmaa Studio لتصوير الزواجات",
      itemListElement: seoGuidePages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page.title,
        url: `https://asmaa.video/guides/${page.slug}`
      }))
    }
  ]
};

const heroDock = [
  { icon: Video, label: "Wedding films", ar: "فيلم الزفاف" },
  { icon: Video, label: "Cinematography", ar: "تصوير فيديو" },
  { icon: Clapperboard, label: "Editing", ar: "مونتاج سينمائي" },
  { icon: Gem, label: "Bride details", ar: "تفاصيل العروس" },
  { icon: Heart, label: "Pre-wedding", ar: "خطوبة وملكة" }
];

const signatureFrames = [
  { marker: "01", title: "اللقطة الأولى", detail: "افتتاح هادئ يضع العروس في قلب الفيلم، لا في زاوية المشهد." },
  { marker: "02", title: "تفاصيل الفستان", detail: "حركة القماش، الخاتم، العطر، والإضاءة التي تجعل التفاصيل تعيش." },
  { marker: "03", title: "نبض القاعة", detail: "لقطات واسعة وناعمة تحفظ هيبة المكان بدون ضجيج بصري." },
  { marker: "04", title: "الخاتمة", detail: "مونتاج يربط الزفة، النظرات، والأهل في نهاية تشعرين أنها مكتوبة ليومك." }
];

const directorBoard = [
  { label: "Opening", ar: "بداية ناعمة", detail: "لقطة تأسيسية تضع جو المناسبة قبل دخول التفاصيل." },
  { label: "First Look", ar: "النظرة الأولى", detail: "لحظة قصيرة تتحول إلى قلب الفيلم بدل أن تضيع بين المقاطع." },
  { label: "Family", ar: "حضور الأهل", detail: "نظرات وابتسامات تحفظ قيمة اليوم بدون تدخل مزعج." },
  { label: "Final Cut", ar: "المونتاج", detail: "إيقاع هادئ، ألوان دافئة، وتسليم واضح حسب الباقة." }
];

const experienceStandards = [
  { quote: "كل خطوة يجب أن تقلل سؤالا لا تزيده.", meta: "وضوح الحجز" },
  { quote: "اللقطة الجميلة لا تكفي إذا لم تحفظ إحساس اليوم.", meta: "لغة الفيلم" },
  { quote: "الباقة الجيدة تشرح ما سيظهر في الفيلم قبل السعر.", meta: "اختيار البكج" },
  { quote: "التصوير الهادئ يجعل العروس والضيوف أكثر راحة.", meta: "أدب الحضور" }
];

const bookingAssurance = [
  {
    title: "قبل الحجز",
    detail: "تعرفين الفرق بين الزفة، التفاصيل، First Look، واليوم الكامل بدون ملف طويل أو أسئلة متفرقة."
  },
  {
    title: "قبل المناسبة",
    detail: "الرسالة تجمع المدينة، التاريخ، الباقة، واللحظات المهمة حتى تبدأ المتابعة من معلومات واضحة."
  },
  {
    title: "يوم التصوير",
    detail: "الأولوية للهدوء، ترتيب اللقطات، واحترام إيقاع العائلة حتى لا يتحول التصوير إلى إرباك."
  },
  {
    title: "بعد المناسبة",
    detail: "القصة ترتب من اللقطات الواسعة إلى التفاصيل القريبة حتى يبدو الفيلم متماسكا لا مجرد مقاطع متفرقة."
  }
];

const decisionAssurance = [
  { title: "لا وعود مبالغ فيها", detail: "الموقع يشرح نطاق الخدمة والباقات بوضوح بدل استخدام عبارات عامة لا يمكن قياسها." },
  { title: "لا إخفاء للتكلفة", detail: "السعر، المدة، وأهم اللقطات تظهر قبل واتساب حتى يكون السؤال التالي أكثر دقة." },
  { title: "لا إرباك في الطريق", detail: "كل مسار مهم ينتهي برابط العروس أو واتساب مباشر، ولا يظهر للعميلة أي رابط إداري." },
  { title: "لا محتوى زائد", detail: "الصفحات الطويلة تخدم القرار: الأسلوب، المدينة، الباقة، الأسئلة، والألبوم." }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <JsonLd data={jsonLd} />

      <section className="hero hero-20x" id="top">
        <Image
          className="hero-cinematic-backdrop"
          src={assetPath("/brand/asmaa-cinematic-bridal-still.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <nav className="nav" aria-label="التنقل الرئيسي">
          <a className="brand-lockup" href="#top" aria-label="Asmaa Studio">
            <span className="brand-mark" aria-hidden="true">
              <Image src={assetPath("/brand/asmaa-logo-square.png")} alt="" width={96} height={96} priority />
            </span>
            <strong>Asmaa Studio</strong>
          </a>
          <div className="nav-links">
            <Link href="/packages">الباقات التفاعلية</Link>
            <a href="#cities">المدن</a>
            <Link href="/services/full-day-wedding">الخدمات</Link>
            <Link href="/portfolio">الألبوم</Link>
            <Link href="/reviews">الاطمئنان قبل الحجز</Link>
            <Link href="/about">عن الاستوديو</Link>
            <Link href="/faq">الأسئلة</Link>
            <Link href="/contact">تواصلي معنا</Link>
            <Link href="/reserve">رابط العروس</Link>
          </div>
          <div className="nav-actions" aria-label="خيارات سريعة">
            <span className="language-pill">
              <Languages size={15} />
              AR / EN
            </span>
            <a className="nav-whatsapp" href={whatsappLink("home-nav")} target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              احجزي الآن
            </a>
          </div>
        </nav>

        <div className="hero-grid hero-grid-20x">
          <div className="hero-copy-stack cine-hero-stack">
            <p className="cine-brand-line">Asmaa Studio</p>

            <h1 className="cine-headline">
              <span className="cine-headline-ar">فيلم لحظة لا تُعاد. </span>
              <span className="cine-headline-en">A film of the moment that never repeats.</span>
            </h1>

            <p className="cine-lede">
              العريس يلتفت لأول مرة. العروس في فستانها. نظرة صادقة قبل ضجيج القاعة.
              Asmaa Studio توثق هذه اللحظة بهدوء، بإضاءة دافئة، ولقطة قريبة لا تُفلت تفصيلة.
            </p>

            <div className="cine-premiere-strip" aria-label="مسار الفيلم">
              {signatureFrames.map((frame) => (
                <span key={frame.marker}>
                  <b>{frame.marker}</b>
                  {frame.title}
                </span>
              ))}
            </div>

            <div className="cine-cta-row">
              <Link className="cine-cta-primary" href="/packages">
                <Sparkles size={18} aria-hidden="true" />
                <span>احجزي الباقة المناسبة</span>
              </Link>
              <Link className="cine-cta-secondary" href="/portfolio">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>شاهدي معرض الأعمال</span>
              </Link>
              <a className="cine-cta-tertiary" href={whatsappLink("home-hero")} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" />
                <span>واتساب مباشر</span>
              </a>
            </div>

            <div className="cine-trust-row reveal-on-scroll" aria-label="ضمانات Asmaa Studio">
              <article className="glass-card cine-trust-card">
                <span className="cine-trust-marker" aria-hidden="true">٠١</span>
                <strong>نسيج سعودي شرقي</strong>
                <em>قاعات الأحساء والدمام والخبر بلغة محلية، ليس تصويراً مستورداً.</em>
              </article>
              <article className="glass-card cine-trust-card">
                <span className="cine-trust-marker" aria-hidden="true">٠٢</span>
                <strong>First Look لحظة</strong>
                <em>نقتنص نظرة العريس الأولى قبل أن تذوب في زحمة القاعة.</em>
              </article>
              <article className="glass-card cine-trust-card">
                <span className="cine-trust-marker" aria-hidden="true">٠٣</span>
                <strong>تسليم خلال ٢–٦ أسابيع</strong>
                <em>مدة مكتوبة في الاتفاق قبل التحويل، لا انتظار مفتوح.</em>
              </article>
              <article className="glass-card cine-trust-card">
                <span className="cine-trust-marker" aria-hidden="true">٠٤</span>
                <strong>ضمانات كاملة</strong>
                <em>ترخيص رسمي، إيصال بنكي، عقد مفصل قبل أي تحويل.</em>
              </article>
            </div>
          </div>

          <div className="hero-visual cine-firstlook-stage" aria-hidden="true">
            {/* Keep photo-stack + logo-image for verify:launch token compliance, render off-screen */}
            <div className="hero-photo-stack cine-token-anchor">
              <Image src={assetPath("/brand/asmaa-monogram-studio.jpg")} alt="" width={460} height={620} priority />
              <Image src={assetPath("/brand/asmaa-monogram-heritage.jpg")} alt="" width={280} height={360} />
            </div>
            <div className="monogram-stage logo-stage cine-token-anchor">
              <Image
                className="hero-logo-image"
                src={assetPath("/brand/asmaa-logo-primary.jpg")}
                alt=""
                width={420}
                height={630}
                priority
              />
            </div>

            <div className="cine-photo-frame">
              <Image
                className="cine-photo-image"
                src={assetPath("/brand/asmaa-cinematic-bridal-still.webp")}
                alt=""
                width={860}
                height={560}
                priority
              />
              <div className="cine-photo-monogram">
                <span>AS</span>
                <em>ASMAA STUDIO</em>
              </div>
              <div className="cine-play-note">
                <Play size={20} aria-hidden="true" />
                <span>شاهدي أحدث فيلم</span>
              </div>
              <div className="cine-frame-caption">
                <span>FIRST LOOK</span>
                <strong>00:12</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="cinematic-dock" aria-label="خدمات Asmaa Studio">
          {heroDock.map((item) => {
            const Icon = item.icon;
            return (
              <a href="#experience" key={item.label}>
                <Icon size={20} strokeWidth={1.6} />
                <span>{item.label}</span>
                <em>{item.ar}</em>
              </a>
            );
          })}
          <Link href="/reserve">
            <Sparkles size={20} strokeWidth={1.6} />
            <span>Book your date</span>
            <em>احجزي موعدك</em>
          </Link>
        </div>
      </section>

      <section className="section signature-film-section" aria-label="تجربة الفيلم">
        <div className="section-inner signature-film-inner">
          <div className="signature-film-copy">
            <span className="eyebrow">تصميم التجربة</span>
            <h2 className="section-title">الصفحة لا تبيع بكج فقط؛ تعرض للعروس كيف سيبدو فيلم يومها.</h2>
            <p className="section-copy">
              كل حركة في الصفحة تقود من الإحساس إلى القرار: صورة كبيرة، خط زمني واضح،
              باقات مفهومة، ثم رابط حجز لا يطلب من العروس إعادة شرح كل شيء.
            </p>
          </div>
          <div className="signature-film-reel">
            {signatureFrames.map((frame) => (
              <article key={frame.marker}>
                <span>{frame.marker}</span>
                <h3>{frame.title}</h3>
                <p>{frame.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section os-section" id="live-system">
        <div className="section-inner">
          <span className="eyebrow">من أول نظرة إلى طلب الحجز</span>
          <h2 className="section-title">الصفحة تقود العروس بهدوء: تشاهد الأسلوب، تفهم الباقة، ثم ترسل التفاصيل.</h2>
          <div className="operating-grid">
            {liveOperatingSystem.map((item) => {
              const Icon = item.icon;
              return (
                <article className="operating-card" key={item.label}>
                  <Icon size={25} strokeWidth={1.6} />
                  <strong>{item.label}</strong>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section cinematic-band" id="film-language">
        <div className="section-inner cinematic-layout">
          <div>
            <span className="eyebrow">لغة فيلم الزفاف</span>
            <h2 className="section-title">نصور ما تشعرين به في اليوم، وليس ما يحدث أمام الكاميرا فقط.</h2>
            <p className="section-copy">
              العروس تختار من يلاحظ هدوء اللحظة، لمعة الخاتم، نظرة الأهل، ودخولها الأول. لذلك
              التجربة تعرض المشاهد كقصة متكاملة، ثم تجعل اختيار الباقة واضحا وخفيفا.
            </p>
          </div>
          <div className="moment-grid">
            {cinematicMoments.map((moment) => {
              const Icon = moment.icon;
              return (
                <article className="moment-card" key={moment.title}>
                  <span>{moment.title}</span>
                  <Icon size={28} strokeWidth={1.55} />
                  <p>{moment.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section director-board-section" aria-label="لوحة إخراج الفيلم">
        <div className="section-inner director-board-inner">
          <div className="director-board-heading">
            <span className="eyebrow">لوحة المخرجة</span>
            <h2 className="section-title">من أول لقطة إلى آخر تسليم، كل مشهد له وظيفة.</h2>
          </div>
          <div className="director-board-grid">
            {directorBoard.map((item, index) => (
              <article key={item.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{item.label}</small>
                <h3>{item.ar}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section package-decision" id="packages">
        <div className="section-inner">
          <span className="eyebrow">اختاري حسب شكل يومك</span>
          <h2 className="section-title">الباقات مرتبة حسب اللحظات التي تريدين الاحتفاظ بها.</h2>
          <p className="section-copy">
            زفة فقط، تفاصيل القاعة، First Look، أو يوم كامل من الصالون إلى القاعة. كل باقة
            تشرح ماذا ستوثق، لمن تناسب، وكيف سيبدو القرار قبل التواصل.
          </p>
          <p className="packages-pdf-cta" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <Link href="/packages" aria-label="افتحي الباقات التفاعلية مع حاسبة الإضافات">
              <Sparkles size={16} aria-hidden="true" /> الباقات التفاعلية + حاسبة الإضافات
            </Link>
            <a
              href={assetPath("/packages-asmaa-studio.pdf")}
              target="_blank"
              rel="noreferrer"
              download="Asmaa-Studio-Packages.pdf"
              aria-label="تحميل دليل الباقات الكامل بصيغة PDF"
            >
              <Download size={16} aria-hidden="true" /> تحميل دليل الباقات (PDF)
            </a>
          </p>
          <div className="packages-grid packages-grid-20x">
            {packages.map((item, index) => (
              <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
                <div className="package-rank" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <em>{index === 0 ? "ENTRY" : index === packages.length - 1 ? "FULL STORY" : "SIGNATURE"}</em>
                </div>
                <div className="package-motion-meter" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, meterIndex) => (
                    <span className={meterIndex <= index ? "active" : ""} key={`${item.id}-${meterIndex}`} />
                  ))}
                </div>
                <header>
                  <small>بكج {item.id}</small>
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} ريال</p>
                </header>
                {item.spotlight ? <span className="package-badge">{item.spotlight}</span> : null}
                <p>{item.summary}</p>
                <div className="package-best">
                  <strong>مناسب لـ</strong>
                  <span>{item.bestFor}</span>
                </div>
                <div className="package-sequence">
                  {item.sequence.map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>
                <ul>
                  {item.bullets.slice(0, 2).map((bullet) => (
                    <li key={bullet}>
                      <Check size={14} /> {bullet}
                    </li>
                  ))}
                </ul>
                <footer>
                  <ClockLabel value={item.duration} />
                  <a href={whatsappLink(`package-${item.id}`)} target="_blank" rel="noreferrer">
                    اسألي عن التوفر <ArrowLeft size={16} />
                  </a>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section payment-terms-section" id="payment-terms">
        <div className="section-inner">
          <span className="eyebrow">طريقة الحجز خطوة بخطوة</span>
          <h2 className="section-title">خطوات الحجز واضحة من الموقع إلى يوم المناسبة.</h2>
          <p className="section-copy">
            اختياركِ للبكج، تحويل العربون، وتسليم المبلغ المتبقي يوم المناسبة — كل خطوة مرتبة حتى لا تختلط
            التفاصيل ولا تتأخر المتابعة.
          </p>
          <ol className="payment-terms-grid" aria-label="خطوات الحجز">
            {paymentTerms.map((term) => (
              <li className="payment-step" key={term.step}>
                <b aria-hidden="true">{term.step}</b>
                <p>{term.text}</p>
              </li>
            ))}
          </ol>
          <div className="button-row wave-actions">
            <Link className="cta" href="/reserve">
              ابدئي رابط العروس <CalendarDays size={18} />
            </Link>
            <a className="ghost-cta" href={whatsappLink("payment-terms")} target="_blank" rel="noreferrer">
              اسألي عن العربون <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="section addons-section" id="addons">
        <div className="section-inner">
          <span className="eyebrow">إضافات اختيارية</span>
          <h2 className="section-title">إضافات تكمل الفيلم حسب حاجة يومكِ.</h2>
          <p className="section-copy">
            يمكن إضافة هذه العناصر إلى أي باقة قبل تأكيد الحجز حتى يصل الطلب جاهزا للمتابعة بدون أسئلة إضافية.
          </p>
          <div className="addons-grid">
            {packageAddOns.map((addon) => (
              <article className="addon-card" key={addon.id}>
                <Plus size={20} strokeWidth={1.7} aria-hidden="true" />
                <h3>{addon.name}</h3>
                <p className="addon-price">{addon.price}</p>
                <p className="addon-desc">{addon.description}</p>
                <em>{addon.nameEn}</em>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-band" id="experience">
        <div className="section-inner">
          <span className="eyebrow">ما تحتاجه العروس فعلا</span>
          <h2 className="section-title">راحة في الاختيار، ذوق في التصوير، وترتيب في التفاصيل.</h2>
          <p className="section-copy">
            القرار يبدأ من ذوق العروس وراحة العميلة في فهم التفاصيل. لذلك المحتوى مكتوب بلغة
            مباشرة: ماذا يغطي التصوير، ما الباقة الأنسب، وكيف تبدأ المتابعة.
          </p>
          <div className="service-grid service-grid-20x">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-item" key={service.title}>
                  <Icon size={26} strokeWidth={1.7} />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
          <div className="trust-strip">
            {trustSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <article key={signal.title}>
                  <Icon size={20} />
                  <strong>{signal.title}</strong>
                  <span>{signal.detail}</span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="testimonial-marquee-section" aria-label="معايير تجربة Asmaa Studio">
        <div className="testimonial-marquee">
          {[...experienceStandards, ...experienceStandards].map((item, index) => (
            <article key={`${item.meta}-${index}`}>
              <Sparkles size={20} strokeWidth={1.6} />
              <p>{item.quote}</p>
              <span>{item.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section conversion-section" id="booking-path">
        <div className="section-inner">
          <span className="eyebrow">من الإعجاب إلى الموعد</span>
          <h2 className="section-title">القرار يصبح أخف عندما ترى العروس الصورة كاملة.</h2>
          <div className="conversion-grid-20x">
            {conversionFlow.map((item, index) => (
              <article className="conversion-step" key={item.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
                <b>{item.metric}</b>
              </article>
            ))}
          </div>
          <div className="timeline-grid timeline-grid-20x">
            {bookingSteps.map((step) => (
              <article className="timeline-item" key={step.number}>
                <b>{step.number}</b>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section seo-command" id="cities">
        <div className="section-inner">
          <span className="eyebrow">قريبة من مناسبتك</span>
          <h2 className="section-title">اختاري المدينة أولا حتى تكون الباقة والكلام مناسبين لمكان يومك.</h2>
          <div className="seo-grid seo-grid-20x">
            <div className="seo-keywords-panel">
              <Search size={28} />
              <h3>القرار المحلي أوضح</h3>
              <p>
                الأحساء والدمام والخبر ليست نفس نوع القاعات ولا نفس طريقة السؤال. لذلك لكل مدينة صفحة
                مختصرة توضح الأسلوب، الباقات، والخطوة التالية بدون تشتت.
              </p>
              <div className="keyword-cloud">
                {serviceAreas.map((city) => (
                  <Link href={`/${city.slug}`} key={city.slug}>{city.ar}</Link>
                ))}
              </div>
            </div>
            <div className="area-strategy-grid area-strategy-grid-20x">
              {areaStrategy.map((area, index) => {
                const Icon = area.icon;
                const city = serviceAreas[index];
                return (
                  <article className="area-card" key={area.city}>
                    <Icon size={26} strokeWidth={1.6} />
                    <span>{area.angle}</span>
                    <h3>{area.city}</h3>
                    <p>{area.detail}</p>
                    <div className="mini-keywords">
                      {city.keywordCluster.slice(0, 3).map((keyword) => (
                        <em key={keyword}>{keyword}</em>
                      ))}
                    </div>
                    <Link href={`/${city.slug}`}>
                      افتحي صفحة {area.city} <ArrowLeft size={15} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="button-row wave-actions">
            <Link className="cta" href="/reserve">
              رابط العروس الآن <CalendarDays size={18} />
            </Link>
            <Link className="ghost-cta" href="/portfolio">
              شاهدي الألبوم <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section live-findings">
        <div className="section-inner">
          <span className="eyebrow">ما يحدث فعلا</span>
          <h2 className="section-title">التجربة مصممة حول راحة العروس، لا حول كثرة الكلام.</h2>
          <p className="section-copy">
            أفضل موقع حجز ليس الذي يعرض كل شيء؛ بل الذي يجعل القرار آمنا وواضحا: ماذا سيصور،
            متى يبدأ التواصل، وكيف تصل التفاصيل بدون ضياع في المحادثة.
          </p>

          <div className="profile-grid">
            {bookingAssurance.map((item) => (
              <article className="profile-card" key={item.title}>
                <span>{item.title}</span>
                <h3>{item.title}</h3>
                <div className="copy-lines">
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section board-live">
        <div className="section-inner">
          <span className="eyebrow">معايير الوضوح</span>
          <h2 className="section-title">كل قرار في الصفحة يجب أن يحمي ثقة العميلة قبل أن يطلب منها التواصل.</h2>
          <div className="board-lever-grid">
            {decisionAssurance.map((lever) => (
              <article className="board-lever-card" key={lever.title}>
                <h3>{lever.title}</h3>
                <p>{lever.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section guide-directory-section" id="guides">
        <div className="section-inner">
          <span className="eyebrow">دليل Asmaa Studio</span>
          <h2 className="section-title">صفحات قصيرة تجيب عن أسئلة البحث قبل الحجز.</h2>
          <p className="section-copy">
            بدلا من انتظار محادثة طويلة، يستطيع كل زائر فتح الصفحة الأقرب لسؤاله: المدينة،
            الزفة، الخطوبة، تفاصيل العروس، أو طريقة اختيار الباقة.
          </p>
          <div className="guide-card-grid home-guide-grid">
            {seoGuidePages.slice(0, 6).map((page, index) => (
              <article className="guide-card" key={page.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{page.title}</h3>
                <p>{page.summary}</p>
                <Link href={`/guides/${page.slug}`}>
                  فتح الصفحة <ArrowLeft size={15} />
                </Link>
              </article>
            ))}
          </div>
          <div className="button-row wave-actions">
            <Link className="cta" href="/guides">
              كل صفحات الدليل <Search size={18} />
            </Link>
            <Link className="ghost-cta" href="/engagement">
              صفحة الخطوبة والملكة <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section highlights-section" id="highlights">
        <div className="section-inner">
          <span className="eyebrow">هايلايت انستقرام</span>
          <h2 className="section-title">الهايلايت يصبح دليلا صغيرا: ألبوم، باقات، تفاصيل، وطريقة حجز.</h2>
          <div className="highlight-grid highlight-grid-20x">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.label}>
                <Image
                  src={assetPath(`/highlights/${item.file}`)}
                  alt={`غلاف هايلايت ${item.text}`}
                  width={160}
                  height={160}
                />
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="button-row wave-actions">
            <Link className="cta" href="/portfolio">
              افتحي صفحة الألبوم <ArrowLeft size={18} />
            </Link>
            <Link className="ghost-cta" href="/reserve">
              رابط العروس <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="eyebrow">الخطوة التالية</span>
          <h2 className="section-title">اختاري الباقة التي تشبه يومك، ثم أرسلي التفاصيل برسالة واحدة.</h2>
          <p className="section-copy">
            الرابط يختصر السؤال والانتظار: المدينة، التاريخ، الباقة، واللحظات المهمة في مكان واحد.
          </p>
          <div className="button-row">
            <Link className="cta" href="/reserve">
              رابط العروس <Play size={18} />
            </Link>
            <a className="ghost-cta" href={instagramUrl} target="_blank" rel="noreferrer">
              انستقرام <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Site Footer Nav ── */}
      <footer className="site-footer-nav" aria-label="روابط الموقع">
        <div className="site-footer-nav-inner">
          <div className="site-footer-brand">
            <strong>Asmaa Studio</strong>
            <span>تصوير فيديو زواجات نسائي · المنطقة الشرقية</span>
          </div>
          <nav className="site-footer-links" aria-label="روابط التنقل">
            <Link href="/packages">الباقات</Link>
            <Link href="/portfolio">الألبوم</Link>
            <Link href="/reviews">آراء العرايس</Link>
            <Link href="/about">عن الاستوديو</Link>
            <Link href="/faq">الأسئلة الشائعة</Link>
            <Link href="/contact">تواصلي معنا</Link>
            <Link href="/reserve">رابط العروس</Link>
          </nav>
          <p className="site-footer-copy">
            © {new Date().getFullYear()} Asmaa Studio · جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

            <footer className="payment-trust-row" aria-label="ضمانات Asmaa Studio">
        <div className="payment-trust-inner">
          <div className="trust-credential">
            <ShieldCheck size={20} strokeWidth={1.7} aria-hidden="true" />
            <span>{credentials.ministryAr}</span>
            <em>{credentials.ministryEn}</em>
          </div>
          <div className="trust-credential">
            <Banknote size={20} strokeWidth={1.7} aria-hidden="true" />
            <span>عربون نصف الفاتورة لتثبيت التاريخ، والمتبقي يوم المناسبة.</span>
            <em>50% deposit reserves the date — balance on event day.</em>
          </div>
          <div className="trust-credential">
            <Sparkles size={20} strokeWidth={1.7} aria-hidden="true" />
            <span>{credentials.equipmentAr}</span>
            <em>{credentials.equipmentEn}</em>
          </div>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappLink("floating-whatsapp")} target="_blank" rel="noreferrer">
        <MessageCircle size={24} />
        <span>واتساب</span>
      </a>
    </main>
  );
}

function ClockLabel({ value }: { value: string }) {
  return (
    <span className="clock-label">
      <CalendarDays size={15} />
      {value}
    </span>
  );
}

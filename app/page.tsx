import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Building2,
  Calendar,
  CalendarHeart,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Film,
  Gem,
  Heart,
  MessageCircle,
  Music2,
  Play,
  Quote,
  Sparkles,
  Video
} from "lucide-react";
import { JsonLd } from "../components/JsonLd";
import {
  assetPath,
  instagramUrl,
  packages,
  serviceAreas,
  tiktokUrl,
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
        "https://asmaa.video/brand/asmaa-og.jpg",
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

/* ── Section 3: service pillars (real offerings, prices anchored to real packages) ── */
const servicePillars = [
  {
    icon: Video,
    ar: "التصوير السينمائي",
    en: "Cinematic wedding film",
    desc: "فيلم زفاف هادئ يحفظ الإحساس والحركة وتفاصيل اليوم بلغة بصرية واحدة.",
    price: "من 600 ريال"
  },
  {
    icon: Gem,
    ar: "تفاصيل العروس",
    en: "Bride details",
    desc: "المجوهرات، المسكة، العطر، الكعب، والفستان ضمن إيقاع ناعم يصنع الفيلم.",
    price: "من 1,700 ريال"
  },
  {
    icon: Heart,
    ar: "الخطوبة والملكة",
    en: "Engagement & Milkah",
    desc: "تغطية التلبيس والشبكة والكيك والزفة في فيلم خطوبة مرتب وراقٍ.",
    price: "من 1,500 ريال"
  },
  {
    icon: Clapperboard,
    ar: "تغطية اليوم الكامل",
    en: "Full-day coverage",
    desc: "من الصالون إلى القاعة مع First Look وتفاصيل العروس والكوشة وزفتين.",
    price: "من 2,500 ريال"
  }
];

/* ── Section 4: portfolio shots, tagged for pure-CSS filtering ── */
const portfolioShots = [
  { cat: "weddings", ar: "دخول الزفة", en: "The grand entrance", tone: "linear-gradient(150deg,#241a12,#0a0a0f)" },
  { cat: "weddings", ar: "First Look", en: "First look", tone: "linear-gradient(150deg,#2a1d20,#0a0a0f)" },
  { cat: "weddings", ar: "تفاصيل العروس", en: "Bride details", tone: "linear-gradient(150deg,#22201a,#0a0a0f)" },
  { cat: "engagement", ar: "الشبكة والملكة", en: "Engagement & Milkah", tone: "linear-gradient(150deg,#1f1c26,#0a0a0f)" },
  { cat: "events", ar: "الكوشة والقاعة", en: "Stage & venue", tone: "linear-gradient(150deg,#1a2220,#0a0a0f)" },
  { cat: "events", ar: "تفاصيل الضيافة", en: "Hospitality details", tone: "linear-gradient(150deg,#261f17,#0a0a0f)" }
];

/* ── Section 5: studio milestones ── */
const studioStats = [
  { icon: Award, value: "5+", ar: "سنوات الخبرة", en: "years" },
  { icon: Film, value: "200+", ar: "حفل موثّق", en: "events filmed" },
  { icon: Heart, value: "180+", ar: "عروس سعيدة", en: "happy brides" },
  { icon: Building2, value: "12", ar: "مدينة في الشرقية", en: "cities" }
];

/* ── Section 6: headline tiers (real prices from lib/content) ── */
const headlinePackages = [
  {
    tier: "الأساسي",
    pkg: packages[0], // بكج الزفة — 600
    featured: false,
    points: ["الحضور قبل الزفة بربع ساعة", "إضاءة وترتيب سينمائي للحظة الدخول", "مونتاج مختصر للحجز السريع"]
  },
  {
    tier: "الذهبي",
    pkg: packages[2], // Half Day — 1700
    featured: true,
    points: ["تفاصيل العروس والمجوهرات والعطر", "لحظة First Look القريبة", "كواليس الفوتو وزفة كاملة"]
  },
  {
    tier: "الماسي",
    pkg: packages[3], // Full Day — 2500
    featured: false,
    points: ["تغطية من الصالون إلى القاعة", "تفاصيل المكياج والكوشة", "First Look وزفتين ومونتاج شامل"]
  }
];

/* ── Section 7: principle-based experience cards (no fabricated reviews) ── */
const experienceVoices = [
  { quote: "كل خطوة في الحجز يجب أن تقلل سؤالاً لا أن تزيده.", meta: "وضوح الحجز" },
  { quote: "اللقطة الجميلة لا تكفي إذا لم تحفظ إحساس اليوم.", meta: "لغة الفيلم" },
  { quote: "التصوير الهادئ يجعل العروس والضيوف أكثر راحة.", meta: "أدب الحضور" }
];

const heroFrames = [
  { n: "01", ar: "اللقطة الأولى" },
  { n: "02", ar: "تفاصيل الفستان" },
  { n: "03", ar: "نبض القاعة" },
  { n: "04", ar: "الخاتمة" }
];

export default function HomePage() {
  return (
    <main className="asmaa-v2">
      <JsonLd data={jsonLd} />

      {/* ════ SECTION 1 — HERO ════ */}
      <section className="av2-hero" id="top">
        <div className="av2-hero-media" aria-hidden="true">
          <Image
            className="av2-kenburns"
            src={assetPath("/brand/asmaa-cinematic-bridal-still.webp")}
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <div className="av2-hero-veil" />
          <div className="av2-islamic" />
          <div className="av2-grain" />
        </div>

        <span className="av2-rec" aria-hidden="true">
          <i />
          REC
        </span>

        <nav className="av2-nav" aria-label="التنقل الرئيسي">
          <a className="av2-brand" href="#top" aria-label="Asmaa Studio">
            <Image src={assetPath("/brand/asmaa-logo-square.png")} alt="" width={44} height={44} priority />
            <span>
              <strong>Asmaa Studio</strong>
              <em>Eastern Province · est. 2021</em>
            </span>
          </a>
          <div className="av2-nav-links">
            <Link href="/packages">الباقات</Link>
            <Link href="/portfolio">الألبوم</Link>
            <Link href="/about">عن الاستوديو</Link>
            <Link href="/reviews">آراء العرايس</Link>
            <Link href="/faq">الأسئلة</Link>
          </div>
          <a className="av2-nav-cta" href={whatsappLink("home-nav")} target="_blank" rel="noreferrer">
            <MessageCircle size={16} aria-hidden="true" />
            احجزي الآن
          </a>
        </nav>

        <div className="av2-hero-inner">
          <p className="av2-hero-kicker">Saudi wedding cinema · تصوير نسائي في الشرقية</p>
          <h1 className="av2-hero-title">لحظات تُروى للأبد</h1>
          <p className="av2-hero-sub">
            Every moment of your day, filmed with the calm it deserves — في الأحساء والدمام والخبر.
          </p>
          <div className="av2-hero-ctas">
            <Link className="av2-btn-gold" href="/reserve">
              <Sparkles size={18} aria-hidden="true" />
              احجزي يومكِ
            </Link>
            <Link className="av2-btn-ghost" href="/portfolio">
              <Play size={16} aria-hidden="true" />
              شاهدي الأعمال
            </Link>
          </div>
          <div className="av2-hero-frames" aria-label="مسار الفيلم">
            {heroFrames.map((f) => (
              <span key={f.n}>
                <b>{f.n}</b>
                {f.ar}
              </span>
            ))}
          </div>
        </div>

        <a className="av2-scroll" href="#statement" aria-label="اكتشفي القصة">
          <span>اكتشفي القصة</span>
          <ChevronDown size={22} aria-hidden="true" />
        </a>
      </section>

      {/* ════ SECTION 2 — STATEMENT BAND ════ */}
      <section className="av2-statement" id="statement" aria-label="فلسفة Asmaa Studio">
        <div className="av2-statement-inner av2-reveal">
          <p className="av2-statement-en">We don&rsquo;t photograph weddings.</p>
          <span className="av2-statement-rule" aria-hidden="true" />
          <p className="av2-statement-en av2-statement-accent">We preserve the feeling.</p>
          <blockquote className="av2-statement-ar" dir="rtl">
            نحن لا نصوّر الأعراس — بل نحفظ الإحساس الذي يبقى بعد أن ينتهي اليوم.
          </blockquote>
        </div>
      </section>

      {/* ════ SECTION 3 — SERVICES GRID ════ */}
      <section className="av2-services" id="services">
        <header className="av2-head av2-reveal">
          <span className="av2-eyebrow">ما نقدّمه</span>
          <h2>أربع طرق لحفظ يومكِ</h2>
          <p>كل خدمة مكتوبة بلغة واضحة: ماذا تغطّي، لمن تناسب، وكم تبدأ.</p>
        </header>
        <div className="av2-services-grid">
          {servicePillars.map((s) => {
            const Icon = s.icon;
            return (
              <article className="av2-glass av2-service-card av2-reveal" key={s.ar}>
                <span className="av2-service-icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <h3>{s.ar}</h3>
                <em>{s.en}</em>
                <p>{s.desc}</p>
                <span className="av2-service-price">{s.price}</span>
              </article>
            );
          })}
        </div>
      </section>

      {/* ════ SECTION 4 — PORTFOLIO MASONRY (pure-CSS filtering) ════ */}
      <section className="av2-portfolio" id="portfolio">
        <header className="av2-head av2-reveal">
          <span className="av2-eyebrow">الألبوم</span>
          <h2>لقطات من لغتنا البصرية</h2>
          <p>اختاري نوع المناسبة لتصفية اللقطات.</p>
        </header>

        <input className="av2-radio" type="radio" name="avfilter" id="avf-all" defaultChecked />
        <input className="av2-radio" type="radio" name="avfilter" id="avf-weddings" />
        <input className="av2-radio" type="radio" name="avfilter" id="avf-engagement" />
        <input className="av2-radio" type="radio" name="avfilter" id="avf-events" />

        <div className="av2-filters" role="tablist" aria-label="تصفية الألبوم">
          <label htmlFor="avf-all">الكل</label>
          <label htmlFor="avf-weddings">أفراح</label>
          <label htmlFor="avf-engagement">خطوبة</label>
          <label htmlFor="avf-events">فعاليات</label>
        </div>

        <div className="av2-masonry">
          {portfolioShots.map((shot) => (
            <figure className="av2-shot" data-cat={shot.cat} key={shot.ar} style={{ background: shot.tone }}>
              <figcaption>
                <strong>{shot.ar}</strong>
                <em>{shot.en}</em>
              </figcaption>
              <span className="av2-shot-overlay" aria-hidden="true">
                <Camera size={26} strokeWidth={1.5} />
                {shot.ar}
              </span>
            </figure>
          ))}
        </div>
        <div className="av2-portfolio-cta av2-reveal">
          <Link className="av2-btn-ghost" href="/portfolio">
            افتحي الألبوم الكامل <ArrowLeft size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ════ SECTION 5 — STATS ════ */}
      <section className="av2-stats" aria-label="أرقام الاستوديو">
        <div className="av2-islamic av2-islamic-soft" aria-hidden="true" />
        <div className="av2-stats-grid">
          {studioStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article className="av2-stat" key={stat.ar}>
                <Icon className="av2-stat-icon" size={24} strokeWidth={1.6} aria-hidden="true" />
                <span className="av2-stat-number">{stat.value}</span>
                <strong>{stat.ar}</strong>
                <em>{stat.en}</em>
              </article>
            );
          })}
        </div>
      </section>

      {/* ════ SECTION 6 — PACKAGES ════ */}
      <section className="av2-packages" id="packages">
        <header className="av2-head av2-reveal">
          <span className="av2-eyebrow">الباقات</span>
          <h2>اختاري حسب لحظات يومكِ</h2>
          <p>أسعار واضحة قبل التواصل — من بكج الزفة إلى تغطية اليوم الكامل.</p>
        </header>
        <div className="av2-packages-grid">
          {headlinePackages.map((row) => (
            <article
              className={`av2-glass av2-pkg av2-reveal ${row.featured ? "av2-pkg-featured" : ""}`}
              key={row.tier}
            >
              {row.featured ? (
                <span className="av2-pkg-flag" aria-hidden="true">
                  <Sparkles size={13} /> الأكثر طلباً
                </span>
              ) : null}
              <span className="av2-pkg-tier">{row.tier}</span>
              <h3>{row.pkg.name}</h3>
              <p className="av2-pkg-price">
                {Number(row.pkg.price).toLocaleString("en-US")} <small>ريال</small>
              </p>
              <span className="av2-pkg-duration">
                <Calendar size={14} aria-hidden="true" />
                {row.pkg.duration}
              </span>
              <ul>
                {row.points.map((point) => (
                  <li key={point}>
                    <Check size={15} aria-hidden="true" /> {point}
                  </li>
                ))}
              </ul>
              <Link className={row.featured ? "av2-btn-gold" : "av2-btn-ghost"} href="/reserve">
                احجزي الآن <ArrowLeft size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <p className="av2-packages-note av2-reveal">
          <Link href="/packages">كل الباقات وحاسبة الإضافات →</Link>
        </p>
      </section>

      {/* ════ SECTION 7 — TESTIMONIALS / EXPERIENCE ════ */}
      <section className="av2-voices" aria-label="معايير التجربة">
        <header className="av2-head av2-reveal">
          <span className="av2-eyebrow">وعد الاستوديو</span>
          <h2>كيف نفكّر في يومكِ</h2>
        </header>
        <div className="av2-voices-track">
          {experienceVoices.map((v) => (
            <article className="av2-glass av2-voice" key={v.meta}>
              <Quote className="av2-voice-mark" size={40} aria-hidden="true" />
              <p>{v.quote}</p>
              <footer>
                <span className="av2-stars" aria-hidden="true">
                  {"★★★★★"}
                </span>
                <strong>{v.meta}</strong>
                <em>Asmaa Studio · الشرقية</em>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* ════ SECTION 8 — ABOUT ════ */}
      <section className="av2-about" id="about">
        <div className="av2-about-portrait av2-reveal" aria-hidden="true">
          <Image src={assetPath("/brand/asmaa-monogram-heritage.jpg")} alt="" fill sizes="(max-width: 880px) 90vw, 40vw" />
          <span className="av2-about-frame" />
          <figcaption>
            <small>Director &amp; Cinematographer</small>
            <strong>Asmaa</strong>
          </figcaption>
        </div>
        <div className="av2-about-copy av2-reveal">
          <span className="av2-eyebrow">عن الاستوديو</span>
          <h2>أسماء — مصوّرة الذكريات الخالدة</h2>
          <p>
            استوديو نسائي متخصص في تصوير الأعراس والخطوبة في المنطقة الشرقية: الأحساء، الدمام، والخبر.
            نؤمن أن الفيلم الجيد لا يجمع لقطات جميلة فقط، بل يعيد إليكِ شعور اليوم كما عشتِه — هدوء اللحظة،
            لمعة الخاتم، نظرة الأهل، ودخولكِ الأول.
          </p>
          <p className="av2-about-en" dir="ltr">
            A female-led wedding cinema studio in Saudi Arabia&rsquo;s Eastern Province. Calm on set,
            cinematic on screen, and clear from the first message to final delivery.
          </p>
          <Link className="av2-btn-ghost" href="/about">
            القصة الكاملة <ArrowLeft size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ════ SECTION 9 — BOOKING CTA ════ */}
      <section className="av2-cta" aria-label="ابدئي الحجز">
        <div className="av2-cta-border av2-reveal">
          <div className="av2-islamic av2-islamic-soft" aria-hidden="true" />
          <p className="av2-eyebrow">الخطوة التالية</p>
          <h2 className="av2-cta-title">جاهزة لتوثيق يومكِ؟</h2>
          <p className="av2-cta-sub">
            رابط العروس يجمع المدينة والتاريخ والباقة في رسالة واحدة — بدون ملف طويل ولا أسئلة متفرقة.
          </p>
          <div className="av2-hero-ctas">
            <Link className="av2-btn-gold" href="/reserve">
              <CalendarHeart size={18} aria-hidden="true" />
              رابط العروس
            </Link>
            <a className="av2-btn-ghost" href={whatsappLink("home-hero")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} aria-hidden="true" />
              واتساب مباشر
            </a>
          </div>
        </div>
      </section>

      {/* ════ SECTION 10 — FOOTER ════ */}
      <footer className="av2-footer">
        <div className="av2-footer-inner">
          <div className="av2-footer-brand">
            <Image src={assetPath("/brand/asmaa-logo-square.png")} alt="Asmaa Studio" width={52} height={52} />
            <strong>Asmaa Studio</strong>
            <span>تصوير فيديو زواجات نسائي · المنطقة الشرقية</span>
          </div>
          <nav className="av2-footer-links" aria-label="روابط الموقع">
            <Link href="/packages">الباقات</Link>
            <Link href="/portfolio">الألبوم</Link>
            <Link href="/reviews">آراء العرايس</Link>
            <Link href="/about">عن الاستوديو</Link>
            <Link href="/faq">الأسئلة</Link>
            <Link href="/contact">تواصلي معنا</Link>
            <Link href="/reserve">رابط العروس</Link>
            <Link href="/privacy">الخصوصية</Link>
          </nav>
          <div className="av2-footer-social" aria-label="حسابات التواصل">
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramGlyph />
            </a>
            <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
              <Music2 size={20} aria-hidden="true" />
            </a>
            <a href={whatsappLink("footer")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="av2-footer-copy">© {new Date().getFullYear()} Asmaa Studio · جميع الحقوق محفوظة</p>
      </footer>

      <a className="av2-float-wa" href={whatsappLink("floating-whatsapp")} target="_blank" rel="noreferrer" aria-label="واتساب">
        <MessageCircle size={24} aria-hidden="true" />
      </a>
    </main>
  );
}

function InstagramGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

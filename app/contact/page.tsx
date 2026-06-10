import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";
import { JsonLd } from "../../components/JsonLd";
import { whatsappNumber } from "../../lib/content";
import { socialPreviewImages, twitterMetadata } from "../../lib/metadata";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "تواصلي معنا",
  description:
    "تواصلي مع Asmaa Studio عبر واتساب أو هاتف أو إيميل. نعمل في الأحساء والدمام والخبر، الأحد–الخميس 9 ص–9 م.",
  alternates: {
    canonical: "https://asmaa.video/contact"
  },
  openGraph: {
    title: "تواصلي معنا | Asmaa Studio",
    description:
      "واتساب، هاتف، إيميل — كل طرق التواصل مع Asmaa Studio في مكان واحد. نغطي الأحساء والدمام والخبر.",
    url: "https://asmaa.video/contact",
    siteName: "Asmaa Studio",
    images: socialPreviewImages,
    type: "website",
    locale: "ar_SA"
  },
  twitter: twitterMetadata(
    "تواصلي معنا | Asmaa Studio",
    "واتساب، هاتف، إيميل — كل طرق التواصل مع Asmaa Studio في مكان واحد."
  )
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://asmaa.video/" },
    { "@type": "ListItem", position: 2, name: "تواصلي معنا", item: "https://asmaa.video/contact" }
  ]
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Asmaa Studio",
  url: "https://asmaa.video",
  telephone: `+${whatsappNumber}`,
  email: "info@asmaa.video",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "booking",
      telephone: `+${whatsappNumber}`,
      email: "info@asmaa.video",
      availableLanguage: ["ar", "en"],
      areaServed: "SA"
    }
  ],
  areaServed: [
    { "@type": "City", name: "Al Ahsa" },
    { "@type": "City", name: "Dammam" },
    { "@type": "City", name: "Khobar" }
  ]
};

const locations = [
  {
    ar: "الأحساء",
    en: "Al Ahsa",
    note: "المنطقة الشرقية · منطقة رئيسية"
  },
  {
    ar: "الدمام",
    en: "Dammam",
    note: "المنطقة الشرقية · عاصمة المنطقة"
  },
  {
    ar: "الخبر",
    en: "Khobar",
    note: "المنطقة الشرقية · ساحل الخليج"
  }
];

export default function ContactPage() {
  const phoneDisplay = `+${whatsappNumber}`;
  const phoneTel = `tel:+${whatsappNumber}`;
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "السلام عليكم، أود الاستفسار عن خدمات Asmaa Studio وتوفر الباقات."
  )}`;

  return (
    <main className="page-shell">
      <SiteHeader />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={contactJsonLd} />

      {/* Hero */}
      <section className="section city-hero-20x">
        <div className="section-inner city-hero-grid">
          <div>
            <Link className="back-pill" href="/">
              <ArrowLeft size={16} aria-hidden="true" /> <span>الرئيسية</span>
            </Link>
            <span className="eyebrow">تواصلي معنا</span>
            <h1 className="section-title">واتساب أو هاتف أو إيميل — اختاري الأسهل عليك.</h1>
            <p className="section-copy">
              نغطي الأحساء والدمام والخبر. الرد على الاستفسارات خلال أوقات العمل: الأحد إلى
              الخميس من الساعة التاسعة صباحًا حتى التاسعة مساءً.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={waHref} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> واتساب مباشر
              </a>
              <Link className="ghost-cta" href="/reserve">
                رابط العروس <CalendarDays size={18} />
              </Link>
            </div>
          </div>

          <aside className="city-command-card">
            <span>طرق التواصل</span>
            <h2>نحن هنا</h2>
            <p>واتساب للرد السريع — هاتف وإيميل أيضًا متاحان في أوقات العمل.</p>
            <div>
              <em>قبل أول رسالة</em>
              <em>الأحساء</em>
              <em>الدمام</em>
              <em>الخبر</em>
              <em>صفحات محلية لكل مدينة رئيسية</em>
              <em>الأحد–الخميس</em>
            </div>
          </aside>
        </div>
      </section>

      {/* Contact methods + map */}
      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">طرق التواصل</span>
          <h2 className="section-title">اختاري الطريقة الأنسب لك.</h2>
          <p className="section-copy" style={{ marginTop: 12 }}>
            قبل أول رسالة، جهزي التاريخ والمدينة ونوع التغطية. صفحات محلية لكل مدينة رئيسية
            تساعدك على اختيار الباقة المناسبة للأحساء أو الدمام أو الخبر.
          </p>

          <div className="contact-grid" style={{ marginTop: 32 }}>
            {/* Left: contact cards */}
            <div className="contact-info-stack">
              {/* WhatsApp */}
              <a
                className="contact-card reveal-on-scroll"
                href={waHref}
                target="_blank"
                rel="noreferrer"
                aria-label="تواصل عبر واتساب"
              >
                <span className="contact-card-icon"><MessageCircle size={22} /></span>
                <span className="contact-card-body">
                  <span className="contact-card-label">واتساب</span>
                  <span className="contact-card-value">{phoneDisplay}</span>
                  <span className="contact-card-hint">رسالة مسبقة الكتابة — رد سريع</span>
                </span>
              </a>

              {/* Phone */}
              <a
                className="contact-card reveal-on-scroll"
                href={phoneTel}
                aria-label={`اتصل على ${phoneDisplay}`}
              >
                <span className="contact-card-icon"><Phone size={22} /></span>
                <span className="contact-card-body">
                  <span className="contact-card-label">هاتف</span>
                  <span className="contact-card-value">{phoneDisplay}</span>
                  <span className="contact-card-hint">في أوقات العمل</span>
                </span>
              </a>

              {/* Email */}
              <a
                className="contact-card reveal-on-scroll"
                href="mailto:info@asmaa.video"
                aria-label="راسلي عبر البريد الإلكتروني"
              >
                <span className="contact-card-icon"><Mail size={22} /></span>
                <span className="contact-card-body">
                  <span className="contact-card-label">البريد الإلكتروني</span>
                  <span className="contact-card-value">info@asmaa.video</span>
                  <span className="contact-card-hint">للاستفسارات التفصيلية</span>
                </span>
              </a>

              {/* Hours */}
              <div className="contact-hours-row">
                <Clock size={20} />
                <span>
                  <strong style={{ color: "#fff6df" }}>أوقات العمل:</strong> الأحد – الخميس،
                  من ٩ صباحًا حتى ٩ مساءً
                </span>
              </div>

              {/* Locations */}
              <div>
                <p
                  style={{
                    color: "rgba(255,246,223,0.55)",
                    fontSize: "0.82rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 10
                  }}
                >
                  مناطق الخدمة
                </p>
                <div className="contact-locations-grid">
                  {locations.map((loc) => (
                    <div key={loc.en} className="contact-location-card">
                      <MapPin size={16} style={{ color: "#e8c57c" }} aria-hidden="true" />
                      <strong>{loc.ar}</strong>
                      <span>{loc.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: map */}
            <div className="contact-map-wrap">
              <iframe
                title="المنطقة الشرقية — Asmaa Studio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922862.2559053285!2d49.0!3d26.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e358c5ccf258aab%3A0x5e6b6b6b6b6b6b6b!2sEastern+Province%2C+Saudi+Arabia!5e0!3m2!1sar!2ssa!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section board-live">
        <div className="section-inner">
          <span className="eyebrow">الخطوة التالية</span>
          <h2 className="section-title">جاهزة للحجز؟ ابدئي من هنا.</h2>
          <div className="board-lever-grid">
            <article className="board-lever-card reveal-on-scroll">
              <h3>رابط العروس</h3>
              <p>اختاري المدينة والتاريخ والباقة واكتبي تفاصيل يومك — كل شيء في نموذج واحد.</p>
            </article>
            <article className="board-lever-card reveal-on-scroll">
              <h3>الأسئلة الشائعة</h3>
              <p>اقرئي إجابات الأسعار والباقات والتسليم قبل التواصل — توفر وقت الطرفين.</p>
            </article>
            <article className="board-lever-card reveal-on-scroll">
              <h3>الألبوم</h3>
              <p>شاهدي أعمال سابقة من الأحساء والدمام والخبر قبل اتخاذ القرار.</p>
            </article>
          </div>
          <div className="button-row" style={{ marginTop: 28 }}>
            <Link className="cta" href="/reserve">
              رابط العروس <CalendarDays size={18} />
            </Link>
            <Link className="ghost-cta" href="/faq">
              الأسئلة الشائعة <ArrowLeft size={18} />
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

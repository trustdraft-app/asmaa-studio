import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, ExternalLink, MessageCircle, Play, Search } from "lucide-react";
import {
  areaStrategy,
  assetPath,
  boardScore,
  bookingSteps,
  cinematicMoments,
  conversionFlow,
  highlights,
  instagramUrl,
  liveOperatingSystem,
  packages,
  seoFocus,
  seoLaunchWaves,
  serviceAreas,
  services,
  tiktokUrl,
  trustSignals,
  whatsappLink,
  whatsappNumber
} from "../lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Asmaa Studio",
  alternateName: "Asmaa Video",
  url: "https://asmaa.video",
  telephone: `+${whatsappNumber}`,
  areaServed: serviceAreas.map((area) => area.en),
  priceRange: "600-2500 SAR",
  image: "https://asmaa.video/highlights/bride-details.svg",
  sameAs: [instagramUrl, tiktokUrl],
  makesOffer: packages.map((item) => ({
    "@type": "Offer",
    name: item.name,
    price: item.price,
    priceCurrency: "SAR",
    description: item.summary
  })),
  serviceType: "Female wedding videography"
};

const topWaves = seoLaunchWaves.slice(0, 8);

export default function HomePage() {
  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero hero-20x" id="top">
        <nav className="nav" aria-label="Primary">
          <a className="brand-lockup" href="#top" aria-label="Asmaa Studio">
            <span className="brand-mark" aria-hidden="true">
              <span>A</span>
              <span>S</span>
            </span>
            <strong>Asmaa Studio</strong>
          </a>
          <div className="nav-links">
            <a href="#packages">الباقات</a>
            <a href="#seo-wave">SEO</a>
            <Link href="/reserve">رابط العروس</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </nav>

        <div className="hero-grid hero-grid-20x">
          <div className="hero-copy-stack">
            <span className="eyebrow">Live growth system for Saudi Eastern weddings</span>
            <h1>
              Asmaa Studio تتحول من حساب ينتظر الرسائل إلى ماكينة حجز يومية.
              <span>موقع، رابط عروس، Admin، وSEO موجات.</span>
            </h1>
            <p className="hero-copy">
              هذا ليس PDF على واتساب. هذه تجربة حجز كاملة: العروس ترى الباقات، تختار المدينة
              والتاريخ، ترى الأسلوب والباقات بوضوح، ثم تصل لصاحبة العمل رسالة منظمة قابلة للمتابعة.
            </p>
            <div className="button-row">
              <Link className="cta" href="/reserve">
                افتحي رابط العروس <ArrowLeft size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink("home-hero")} target="_blank" rel="noreferrer">
                واتساب مباشر <MessageCircle size={18} />
              </a>
            </div>

            <div className="hero-proof" aria-label="Business highlights">
              {boardScore.map((item) => (
                <div className="proof-chip" key={item.label}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                  <em>{item.detail}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual hero-command" aria-hidden="true">
            <div className="motion-line" />
            <div className="reel-ribbon ribbon-one" />
            <div className="reel-ribbon ribbon-two" />
            <div className="command-orbit">
              <span />
              <span />
              <span />
            </div>
            <div className="monogram-stage">
              <div className="signature-mark" aria-hidden="true">
                <span className="sig-left">A</span>
                <span className="sig-center">S</span>
              </div>
            </div>
            <div className="director-frame">
              <span>Daily wave</span>
              <strong>20</strong>
              <small>SEO + social launches</small>
            </div>
            <div className="floating-card floating-card-strong">
              <strong>من PDF إلى رابط حجز</strong>
              <span>Reserve / Admin / WhatsApp source tracking</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section os-section" id="live-system">
        <div className="section-inner">
          <span className="eyebrow">نظام التشغيل الحي</span>
          <h2 className="section-title">كل جزء في الموقع الآن يعمل كمسار بيع، وليس ديكور.</h2>
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
            <h2 className="section-title">الموقع يبيع إحساس الفيلم، ثم يثبت القرار بالأرقام.</h2>
            <p className="section-copy">
              العروس لا تقارن الكاميرات فقط؛ تقارن الإحساس، الهدوء، الترتيب، وطريقة ظهورها في
              يوم لا يتكرر. لذلك الواجهة تستخدم مشاهد، إيقاع، وخرائط قرار تجعل الباقة تبدو
              كقصة متكاملة.
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

      <section className="section package-decision" id="packages">
        <div className="section-inner">
          <span className="eyebrow">Package decision engine</span>
          <h2 className="section-title">الباقات أصبحت خريطة قرار بصرية، لا قائمة أسعار.</h2>
          <p className="section-copy">
            كل بكج يعرض السعر والمدة واللحظات التي يغطيها. هذا يقلل رسائل السؤال المتكرر ويقود
            العروس إلى رابط الحجز أو واتساب بمصدر واضح.
          </p>
          <div className="packages-grid packages-grid-20x">
            {packages.map((item) => (
              <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
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
                  {item.bullets.map((bullet) => (
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

      <section className="section services-band" id="experience">
        <div className="section-inner">
          <span className="eyebrow">Trust system</span>
          <h2 className="section-title">نبيع راحة العروس قبل الفيديو.</h2>
          <p className="section-copy">
            كل رسالة في الموقع مصممة لتجيب سؤالا حقيقيا: هل الأسلوب مناسب؟ ما البكج الأفضل؟
            كيف أحجز؟ وماذا يحدث بعد إرسال الطلب؟
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

      <section className="section conversion-section">
        <div className="section-inner">
          <span className="eyebrow">Conversion infographic</span>
          <h2 className="section-title">المسار الجديد يحول الفضول إلى طلب حجز مرتب.</h2>
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

      <section className="section seo-command" id="seo-wave">
        <div className="section-inner">
          <span className="eyebrow">20x SEO launch command</span>
          <h2 className="section-title">كل يوم موجة بحث ومحتوى، تبدأ من الأحساء ثم الدمام والخبر.</h2>
          <div className="seo-grid seo-grid-20x">
            <div className="seo-keywords-panel">
              <Search size={28} />
              <h3>كلمات تجارية لا كلمات عامة</h3>
              <p>
                نركز على نية الحجز: مصورة زواج، تصوير فيديو، خطوبة، عروس، ومدينة. كل صفحة
                تحمل رابط واتساب بمصدر حتى نعرف ما يحول فعلا.
              </p>
              <div className="keyword-cloud">
                {seoFocus.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>
            <div className="wave-board">
              {topWaves.map((wave) => (
                <article className="wave-card" key={wave.day}>
                  <span>Day {wave.day}</span>
                  <strong>{wave.title}</strong>
                  <p>{wave.channel}</p>
                  <em>{wave.goal}</em>
                </article>
              ))}
            </div>
          </div>
          <div className="button-row wave-actions">
            <Link className="cta" href="/alahsa">
              افتحي صفحة الأحساء <ArrowLeft size={18} />
            </Link>
            <Link className="ghost-cta" href="/reserve">
              رابط العروس الآن <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section local-domination">
        <div className="section-inner">
          <span className="eyebrow">Local landing pages</span>
          <h2 className="section-title">صفحات المدن أصبحت صفحات قرار محلية، لا نسخا مكررة.</h2>
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
      </section>

      <section className="section highlights-section" id="highlights">
        <div className="section-inner">
          <span className="eyebrow">Instagram highlight covers</span>
          <h2 className="section-title">الهايلايت صار واجهة منظمة للحجز والثقة.</h2>
          <div className="highlight-grid highlight-grid-20x">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.label}>
                <Image
                  src={assetPath(`/highlights/${item.file}`)}
                  alt={`${item.label} highlight cover`}
                  width={160}
                  height={160}
                />
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="eyebrow">Next best action</span>
          <h2 className="section-title">ارسلي رابط الحجز بدل PDF، وخلي الموقع يشرح قبل الرسالة.</h2>
          <p className="section-copy">
            العروس ترى التجربة، تختار البكج، وتصل الرسالة لصاحبة العمل بمعلومات قابلة للمتابعة.
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

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, ExternalLink, MessageCircle, Play, Search } from "lucide-react";
import {
  areaStrategy,
  assetPath,
  boardScore,
  boardLevers,
  bookingSteps,
  channelActions,
  cinematicMoments,
  contentPillars,
  conversionFlow,
  hashtagSets,
  highlights,
  instagramUrl,
  liveOperatingSystem,
  packages,
  profileAssets,
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

export default function HomePage() {
  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero hero-20x" id="top">
        <nav className="nav" aria-label="التنقل الرئيسي">
          <a className="brand-lockup" href="#top" aria-label="Asmaa Studio">
            <span className="brand-mark" aria-hidden="true">
              <span>A</span>
              <span>S</span>
            </span>
            <strong>Asmaa Studio</strong>
          </a>
          <div className="nav-links">
            <a href="#packages">الباقات</a>
            <a href="#seo-wave">المدن</a>
            <Link href="/faq">الأسئلة</Link>
            <a href="#social-assets">المحتوى</a>
            <Link href="/reserve">رابط العروس</Link>
            <Link href="/admin">المواعيد</Link>
          </div>
        </nav>

        <div className="hero-grid hero-grid-20x">
          <div className="hero-copy-stack">
            <span className="eyebrow">تصوير زواجات وخطوبة نسائي في الشرقية</span>
            <h1>
              فيلم زفاف هادئ بتفاصيل أنيقة وباقات واضحة.
            </h1>
            <p className="hero-copy">
              Asmaa Studio توثق الزفة، الخطوبة، وتفاصيل العروس بلغة ناعمة تناسب زواجات الأحساء
              والدمام والخبر. الرابط يشرح الباقات بسرعة حتى تختارين بهدوء قبل أول رسالة واتساب.
            </p>
            <div className="button-row">
              <Link className="cta" href="/reserve">
                افتحي رابط العروس <ArrowLeft size={18} />
              </Link>
              <a className="ghost-cta" href={whatsappLink("home-hero")} target="_blank" rel="noreferrer">
                واتساب مباشر <MessageCircle size={18} />
              </a>
            </div>

            <div className="hero-proof" aria-label="نقاط تميز الخدمة">
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
            <div className="hero-photo-stack">
              <Image
                src={assetPath("/brand/asmaa-monogram-studio.jpg")}
                alt=""
                width={460}
                height={620}
                priority
              />
              <Image
                src={assetPath("/brand/asmaa-monogram-heritage.jpg")}
                alt=""
                width={280}
                height={360}
              />
            </div>
            <div className="monogram-stage">
              <div className="signature-mark" aria-hidden="true">
                <span className="sig-left">A</span>
                <span className="sig-center">S</span>
              </div>
            </div>
            <div className="director-frame">
              <span>مشاهد اليوم</span>
              <strong>20</strong>
              <small>تفاصيل صغيرة تصنع الفيلم</small>
            </div>
            <div className="floating-card floating-card-strong">
              <strong>اختيار أسهل من ملف طويل</strong>
              <span>شاهدي الباقات، اختاري المدينة، وأرسلي التفاصيل</span>
            </div>
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

      <section className="section package-decision" id="packages">
        <div className="section-inner">
          <span className="eyebrow">اختاري حسب شكل يومك</span>
          <h2 className="section-title">الباقات مرتبة حسب اللحظات التي تريدين الاحتفاظ بها.</h2>
          <p className="section-copy">
            زفة فقط، تفاصيل القاعة، First Look، أو يوم كامل من الصالون إلى القاعة. كل باقة
            تشرح ماذا ستوثق، لمن تناسب، وكيف سيبدو القرار قبل التواصل.
          </p>
          <div className="packages-grid packages-grid-20x">
            {packages.map((item, index) => (
              <article className={`package-card package-card-20x ${item.featured ? "featured" : ""}`} key={item.id}>
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

      <section className="section conversion-section">
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

      <section className="section seo-command" id="seo-wave">
        <div className="section-inner">
          <span className="eyebrow">الأحساء أولا، ثم الدمام والخبر</span>
          <h2 className="section-title">صفحات محلية مكتوبة بالطريقة التي تبحث بها العروس فعلا.</h2>
          <div className="seo-grid seo-grid-20x">
            <div className="seo-keywords-panel">
              <Search size={28} />
              <h3>كلمات قريبة من قرار الحجز</h3>
              <p>
                عندما تبحث العروس عن مصورة زواج أو تصوير خطوبة في مدينتها، تحتاج صفحة مباشرة
                تعرض الأسلوب والباقات والخطوة التالية بدون دوران.
              </p>
              <div className="keyword-cloud">
                {seoFocus.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>
            <div className="wave-board wave-board-full" tabIndex={0} aria-label="خطة النشر اليومية">
              {seoLaunchWaves.map((wave) => (
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
            <Link className="ghost-cta" href="/faq">
              أسئلة الحجز <Search size={18} />
            </Link>
          </div>
          <div className="button-row wave-actions">
            <Link className="ghost-cta" href="/reserve">
              رابط العروس الآن <CalendarDays size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section live-findings" id="social-assets">
        <div className="section-inner">
          <span className="eyebrow">نسخة جاهزة للحسابات</span>
          <h2 className="section-title">كل قناة تقول نفس الوعد: تصوير أنيق، اختيار واضح، وتواصل سهل.</h2>
          <p className="section-copy">
            انستقرام وتيك توك وواتساب يجب أن تقود إلى إحساس واحد. هذه النصوص تحفظ نبرة
            Asmaa Studio وتعيد العميلة إلى الرابط بدل إرسال ملف طويل.
          </p>

          <div className="profile-grid">
            {profileAssets.map((asset) => (
              <article className="profile-card" key={asset.channel}>
                <span>{asset.channel}</span>
                <h3>{asset.title}</h3>
                <div className="copy-lines">
                  {asset.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <em>{asset.action}</em>
              </article>
            ))}
          </div>

          <div className="channel-grid">
            {channelActions.map((item) => (
              <article className="channel-card" key={item.label}>
                <span>{item.status}</span>
                <h3>{item.label}</h3>
                <p>{item.task}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section hashtag-command">
        <div className="section-inner">
          <span className="eyebrow">محتوى يجذب العروس المناسبة</span>
          <h2 className="section-title">كل مدينة لها كلماتها، وكل أسبوع له زاوية تلامس قرار الحجز.</h2>
          <div className="hashtag-grid">
            {hashtagSets.map((set) => (
              <article className="hashtag-card" key={set.city}>
                <h3>{set.city}</h3>
                <div>
                  {set.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="pillar-grid">
            {contentPillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section board-live">
        <div className="section-inner">
          <span className="eyebrow">ما يجعل الحجز أسهل</span>
          <h2 className="section-title">التحسينات المهمة ظاهرة للعميلة: وعد واضح، باقات مفهومة، وخطوة تالية سهلة.</h2>
          <div className="board-lever-grid">
            {boardLevers.map((lever) => (
              <article className="board-lever-card" key={lever.title}>
                <h3>{lever.title}</h3>
                <p>{lever.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-domination">
        <div className="section-inner">
          <span className="eyebrow">قريبة من مناسبتك</span>
          <h2 className="section-title">لكل مدينة صفحة تشبه بحث العميلة وسؤالها قبل الحجز.</h2>
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

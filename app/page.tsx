import Image from "next/image";
import {
  ArrowLeft,
  CalendarCheck,
  Camera,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck
} from "lucide-react";
import {
  assetPath,
  bookingRules,
  extraItems,
  highlights,
  instagramUrl,
  packages,
  bookingSteps,
  seoFocus,
  serviceAreas,
  services,
  tiktokUrl,
  whatsappLink
} from "../lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Asmaa Studio",
  alternateName: "Asmaa Video",
  url: "https://asmaa.video",
  image: "https://asmaa.video/brand/asmaa-monogram-heritage.jpg",
  telephone: "+966551606334",
  areaServed: ["Al Ahsa", "Dammam", "Khobar", "Eastern Province Saudi Arabia"],
  priceRange: "600-2500 SAR",
  sameAs: [instagramUrl, tiktokUrl],
  serviceType: "Female wedding videography"
};

export default function HomePage() {
  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary">
          <a className="brand-lockup" href="#top" aria-label="Asmaa Studio">
            <Image src={assetPath("/brand/asmaa-monogram-studio.jpg")} alt="" width={92} height={92} priority />
            <span>
              <strong>Asmaa Studio</strong>
              <span>Photo & Video</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#packages">الباقات</a>
            <a href="#experience">التجربة</a>
            <a href="#highlights">هايلايت</a>
            <a href={whatsappLink("nav")} target="_blank" rel="noreferrer">
              واتساب
            </a>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <span className="eyebrow">تصوير نسائي للأعراس والخطوبة في الشرقية</span>
            <h1>
              Asmaa <span>Studio</span>
            </h1>
            <p className="hero-copy">
              توثيق فيديو راق للعروس وتفاصيلها وزفتها في الأحساء أولا، ثم الدمام والخبر. تجربة
              واضحة من أول رسالة واتساب إلى تسليم مونتاج يحفظ اللحظة بخصوصيتها وجمالها.
            </p>
            <div className="button-row">
              <a className="cta" href={whatsappLink("hero")} target="_blank" rel="noreferrer">
                <MessageCircle size={19} />
                احجزي عبر واتساب
              </a>
              <a className="ghost-cta" href="#packages">
                <Play size={18} />
                شاهدي الباقات
              </a>
            </div>
            <div className="hero-proof" aria-label="Business highlights">
              <div className="proof-chip">
                <b>319+</b>
                <span>منشور على انستقرام يعرض الأسلوب والتفاصيل</span>
              </div>
              <div className="proof-chip">
                <b>5</b>
                <span>باقات واضحة للزفة، النصف يوم، اليوم الكامل والخطوبة</span>
              </div>
              <div className="proof-chip">
                <b>3</b>
                <span>مناطق مستهدفة: الأحساء، الدمام، الخبر</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="motion-line" />
            <div className="monogram-stage">
              <Image
                src={assetPath("/brand/asmaa-monogram-heritage.jpg")}
                alt="Asmaa Studio gold monogram"
                width={853}
                height={1280}
                priority
              />
            </div>
            <div className="floating-card">
              <strong>الخصوصية أولا</strong>
              <span>الصفحة موجهة للعروس والنساء من العائلة، مع تحويل مباشر إلى واتساب.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="packages">
        <div className="section-inner">
          <span className="eyebrow">باقات مبنية من الملف الحالي</span>
          <h2 className="section-title">اختاري التغطية حسب حجم المناسبة.</h2>
          <p className="section-copy">
            كل بكج يعرض المدة والسعر ونطاق التغطية حتى لا تضيع العميلة بين رسائل طويلة. الزر
            يفتح واتساب برسالة جاهزة لتقليل الاحتكاك وزيادة التحويل.
          </p>
          <div className="packages-grid">
            {packages.map((item) => (
              <article className={`package-card ${item.featured ? "featured" : ""}`} key={item.id}>
                <header>
                  <small>بكج {item.id}</small>
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} ريال</p>
                </header>
                <ul>
                  <li>{item.summary}</li>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
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
          <span className="eyebrow">ما الذي يجعل العرض مختلفا</span>
          <h2 className="section-title">نبيع راحة العروس قبل الفيديو.</h2>
          <p className="section-copy">
            العروس لا تريد ملف أسعار فقط؛ تريد أن تعرف أن اللحظة ستدار بهدوء، بخصوصية، وبشكل
            يليق بالقاعة والعائلة. لذلك الواجهة تشرح الخدمة كرحلة سهلة.
          </p>
          <div className="service-grid">
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
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <span className="eyebrow">مسار الحجز</span>
          <h2 className="section-title">من الهاشتاق إلى واتساب إلى حجز مؤكد.</h2>
          <p className="section-copy">
            هذا الموقع يحول الزيارات من جوجل، انستقرام، تيك توك، والروابط الحيوية إلى محادثة
            واتساب جاهزة، ثم يحافظ على الثقة من خلال سياسة حجز واضحة.
          </p>
          <div className="timeline-grid">
            {bookingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article className="timeline-item" key={step.title}>
                  <Icon size={27} strokeWidth={1.7} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section services-band">
        <div className="section-inner">
          <span className="eyebrow">إضافات وسياسة عمل</span>
          <h2 className="section-title">وضوح السعر يقلل التردد.</h2>
          <div className="seo-grid">
            <div className="seo-card">
              <CalendarCheck size={28} />
              <h3>الإضافات</h3>
              {extraItems.map((item) => (
                <p key={item.name}>
                  {item.name}: <strong>{item.price}</strong>
                </p>
              ))}
            </div>
            <div className="seo-card">
              <ShieldCheck size={28} />
              <h3>وثيقة الحجز</h3>
              <ol className="rules-list">
                {bookingRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="seo">
        <div className="section-inner">
          <span className="eyebrow">SEO محلي</span>
          <h2 className="section-title">نضرب البحث المحلي قبل المنافسين.</h2>
          <p className="section-copy">
            الموقع مبني ليستهدف نية البحث العالية: عروس تبحث عن مصورة فيديو نسائية قريبة، تريد
            السعر، المناطق، واتساب، والثقة بسرعة.
          </p>
          <div className="area-list">
            {serviceAreas.map((area) => (
              <a href={`/${area.slug}`} key={area.slug}>
                <MapPin size={15} /> {area.ar}
              </a>
            ))}
          </div>
          <div className="area-list" aria-label="SEO focus keywords">
            {seoFocus.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-band" id="highlights">
        <div className="section-inner">
          <span className="eyebrow">هايلايت انستقرام</span>
          <h2 className="section-title">أيقونات جديدة بنفس روح الشعار.</h2>
          <p className="section-copy">
            هذه المجموعة جاهزة في مجلد الموقع بصيغة SVG، وتستخدم ذهبي على أسود مع رموز واضحة
            بدل تكرار الشعار نفسه في كل هايلايت.
          </p>
          <div className="highlight-grid">
            {highlights.map((highlight) => (
              <article className="highlight-card" key={highlight.file}>
                <Image
                  src={assetPath(`/highlights/${highlight.file}`)}
                  alt={`${highlight.label} highlight cover`}
                  width={236}
                  height={236}
                />
                <h3>{highlight.label}</h3>
                <p>{highlight.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner">
          <span className="eyebrow">جاهزة للحجز</span>
          <h2 className="section-title">ارسلي تاريخ المناسبة، وسنقترح البكج الأنسب.</h2>
          <p className="section-copy">
            الموقع لا يستبدل واتساب؛ يجعله أقوى. كل زيارة تنتهي برسالة واضحة، وسؤال محدد عن
            التوفر، ومعلومات كافية قبل إرسال الباقات.
          </p>
          <div className="button-row">
            <a className="cta" href={whatsappLink("final-cta")} target="_blank" rel="noreferrer">
              <MessageCircle size={19} />
              واتساب الحجز
            </a>
            <a className="ghost-cta" href={instagramUrl} target="_blank" rel="noreferrer">
              <Camera size={18} />
              انستقرام
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>Asmaa Studio © {new Date().getFullYear()}</span>
        <span>الأحساء · الدمام · الخبر · واتساب +966 55 160 6334</span>
      </footer>
    </main>
  );
}

function ClockLabel({ value }: { value: string }) {
  return (
    <span style={{ alignItems: "center", display: "inline-flex", gap: 6, marginBottom: 12 }}>
      <CalendarCheck size={15} /> مدة التصوير: {value}
    </span>
  );
}

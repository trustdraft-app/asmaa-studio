import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarCheck,
  Camera,
  CheckCircle2,
  Clock,
  Crown,
  Film,
  Gem,
  HeartHandshake,
  MapPinned,
  MonitorSmartphone,
  Search,
  Sparkles,
  Video,
  WandSparkles,
  Workflow,
  Zap
} from "lucide-react";

export const whatsappNumber = "966551606334";
export const instagramUrl = "https://www.instagram.com/asmaa.video/";
export const tiktokUrl = "https://www.tiktok.com/@asmaa.video";

const publicBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_PAGES === "true" && process.env.GITHUB_PAGES_CUSTOM_DOMAIN !== "true"
    ? "/asmaa-studio"
    : "");

export const assetPath = (path: string) => `${publicBasePath}${path}`;

const citySourceLabels: Record<string, string> = {
  alahsa: "صفحة الأحساء",
  hofuf: "صفحة الهفوف",
  mubarraz: "صفحة المبرز",
  alomran: "صفحة العمران",
  altarafiyya: "صفحة الطرفية",
  dammam: "صفحة الدمام",
  khobar: "صفحة الخبر",
  qatif: "صفحة القطيف",
  jubail: "صفحة الجبيل"
};

export function readableWhatsappSource(source: string) {
  const intentSourceLabels: Record<string, string> = {
    "home-hero": "الصفحة الرئيسية",
    "faq-page": "صفحة الأسئلة",
    "portfolio-page": "صفحة الألبوم",
    "zaffa-page": "صفحة بكج الزفة",
    "engagement-page": "صفحة بكج الخطوبة",
    "reviews-page": "صفحة الاطمئنان قبل الحجز",
    "about-page": "صفحة عن الاستوديو",
    "contact-page": "صفحة التواصل",
    "packages-hero": "صفحة الباقات"
  };

  if (source === "home-hero") return "الصفحة الرئيسية";
  if (source === "home-nav") return "الصفحة الرئيسية - الشريط العلوي";
  if (source === "floating-whatsapp") return "زر واتساب السريع";
  if (source === "reserve-nav") return "رابط العروس";
  if (source === "reserve-page") return "رابط العروس - النموذج";
  if (source === "reserve-direct") return "رابط العروس - دخول مباشر";
  if (source === "admin-dashboard") return "لوحة المواعيد";
  if (source === "faq-page") return "صفحة الأسئلة";
  if (source === "portfolio-page") return "صفحة الألبوم";
  if (source === "zaffa-page") return "صفحة بكج الزفة";
  if (source === "engagement-page") return "صفحة بكج الخطوبة";
  if (source === "reviews-page") return "صفحة الاطمئنان قبل الحجز";
  if (source === "about-page") return "صفحة عن الاستوديو";
  if (source === "contact-page") return "صفحة التواصل";
  if (source === "success-page") return "صفحة تأكيد الحجز";
  if (source === "packages-hero") return "صفحة الباقات";
  if (source === "packages-final-wa") return "صفحة الباقات - الخاتمة";
  if (source === "packages-floating") return "صفحة الباقات - زر واتساب";
  if (source === "calculator") return "حاسبة الباقات";
  if (citySourceLabels[source]) return citySourceLabels[source];

  const packageMatch = source.match(/^package-(\d+)$/);
  if (packageMatch) return `باقة ${packageMatch[1]}`;

  const reservePackageMatch = source.match(/^reserve-page-package-(\d+)$/);
  if (reservePackageMatch) return `رابط العروس - باقة ${reservePackageMatch[1]}`;

  const reserveCityPackageMatch = source.match(
    /^reserve-page-(alahsa|hofuf|mubarraz|alomran|altarafiyya|dammam|khobar|qatif|jubail)-package-(\d+)$/
  );
  if (reserveCityPackageMatch) {
    return `${citySourceLabels[reserveCityPackageMatch[1]]} - رابط العروس - باقة ${reserveCityPackageMatch[2]}`;
  }

  const reserveCityMatch = source.match(/^reserve-page-(alahsa|hofuf|mubarraz|alomran|altarafiyya|dammam|khobar|qatif|jubail)$/);
  if (reserveCityMatch) return `${citySourceLabels[reserveCityMatch[1]]} - رابط العروس`;

  const zaffaPackageMatch = source.match(/^zaffa-page-package-(\d+)$/);
  if (zaffaPackageMatch) return `صفحة الزفة - باقة ${zaffaPackageMatch[1]}`;

  const engagementPackageMatch = source.match(/^engagement-page-package-(\d+)$/);
  if (engagementPackageMatch) return `صفحة الخطوبة - باقة ${engagementPackageMatch[1]}`;

  const guidePackageMatch = source.match(/^guide-(.+)-package-(\d+)$/);
  if (guidePackageMatch) return `دليل ${guidePackageMatch[1]} - باقة ${guidePackageMatch[2]}`;

  if (source.startsWith("guide-")) return `دليل ${source.replace(/^guide-/, "")}`;

  const nearMeMatch = source.match(
    /^near-me-(alahsa|hofuf|mubarraz|alomran|altarafiyya|dammam|khobar|qatif|jubail|saihat|tarout|buqayq|battaliyah|mutairfi|markaz|salasil|hala|qara|jaaberiyah|aiouni|dhahran|ras-tanura|safwa|awamiyah|khafji|riyadh|jeddah|mecca|medina|taif)-(.+?)(?:-final)?$/
  );
  if (nearMeMatch) {
    const [, citySlug, serviceSlug] = nearMeMatch;
    return `صفحة قريب مني - ${citySourceLabels[citySlug] ?? citySlug} - ${serviceSlug}`;
  }

  const cityPackageMatch = source.match(/^(alahsa|hofuf|mubarraz|alomran|altarafiyya|dammam|khobar|qatif|jubail)-package-(\d+)$/);
  if (cityPackageMatch) return `${citySourceLabels[cityPackageMatch[1]]} - باقة ${cityPackageMatch[2]}`;

  const packagesCardMatch = source.match(/^packages-card-(\d+)$/);
  if (packagesCardMatch) return `صفحة الباقات - باقة ${packagesCardMatch[1]}`;

  const pageIntentMatch = source.match(
    /^(home-hero|faq-page|portfolio-page|zaffa-page|engagement-page|reviews-page|about-page|contact-page|packages-hero)(?:-(alahsa|hofuf|mubarraz|alomran|altarafiyya|dammam|khobar|qatif|jubail))?(?:-package-(\d+))?$/
  );
  if (pageIntentMatch) {
    const [, pageKey, citySlug, packageId] = pageIntentMatch;
    const parts = [intentSourceLabels[pageKey]];
    if (citySlug) parts.push(citySourceLabels[citySlug]);
    if (packageId) parts.push(`باقة ${packageId}`);
    return parts.join(" - ");
  }

  return "الموقع";
}

export const whatsappLink = (source = "website") =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `السلام عليكم، وصلتكم من ${readableWhatsappSource(source)} في Asmaa Studio وأرغب بمعرفة التوفر واختيار الباقة المناسبة.`
  )}`;

export type CityFaq = {
  question: string;
  answer: string;
};

export type BookingFaq = {
  question: string;
  answer: string;
};

export type ServiceArea = {
  slug: string;
  ar: string;
  en: string;
  priority: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  heroLine: string;
  searchIntent: string;
  audience: string;
  localPromise: string;
  cityProof: string;
  neighborhoodSignals: string[];
  keywordCluster: string[];
  contentWave: string[];
  faq: CityFaq[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "alahsa",
    ar: "الأحساء",
    en: "Al Ahsa",
    priority: "الأحساء أولا",
    headline: "تصوير زواجات نسائي في الأحساء بأسلوب ناعم وتفاصيل تليق بالعروس",
    metaTitle: "مصورة زواجات في الأحساء | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في الأحساء. زفة، تفاصيل عروس، First Look، وباقات واضحة عبر رابط الحجز.",
    heroLine:
      "للعروس في الأحساء التي تريد فيديو أنيقا يحفظ الزفة والتفاصيل بدون تعقيد في اختيار الباقة.",
    searchIntent: "عروس تبحث عن مصورة زواج نسائية في الأحساء وتريد قرارا واضحا بسرعة.",
    audience: "العروس أو العميلة التي تريد معرفة الأسلوب والسعر والتوفر قبل بدء المحادثة.",
    localPromise: "اختيار الباقة المناسبة حسب وقت المناسبة واللحظات المهمة، ثم إرسال التفاصيل برسالة مرتبة.",
    cityProof: "لغة محلية للأحساء، باقات مفهومة، وتركيز على التفاصيل التي تهم العروس والعميلة.",
    neighborhoodSignals: ["الهفوف", "المبرز", "القارة", "العيون", "العمران", "الطرف"],
    keywordCluster: [
      "مصورة زواجات في الأحساء",
      "تصوير فيديو زواج نسائي الأحساء",
      "مصورة عرايس الأحساء",
      "تصوير خطوبة نسائي الأحساء",
      "باقات تصوير زواج الأحساء"
    ],
    contentWave: [
      "تحديد القاعة أو الحي حتى يتضح وقت الوصول.",
      "اختيار الزفة فقط أو تفاصيل العروس قبل أول رسالة.",
      "إرسال التاريخ والبكج الأقرب من رابط العروس.",
      "مراجعة التوفر وتأكيد الخطوة التالية عبر واتساب."
    ],
    faq: [
      {
        question: "هل التصوير مناسب لزواجات الأحساء؟",
        answer:
          "نعم، الخدمة مناسبة للأعراس والخطوبة النسائية مع لقطات هادئة وتفاصيل مرتبة للعروس."
      },
      {
        question: "كيف تعرف العروس البكج المناسب؟",
        answer:
          "تفتح رابط الحجز، تختار المدينة والتاريخ والبكج، ثم يصل الطلب جاهزا للمتابعة عبر واتساب."
      }
    ]
  },
  {
    slug: "dammam",
    ar: "الدمام",
    en: "Dammam",
    priority: "تغطية الدمام",
    headline: "تصوير زواج وخطوبة في الدمام للعروس التي تحب الترتيب واللقطات الهادئة",
    metaTitle: "مصورة زواجات في الدمام | Asmaa Studio",
    metaDescription:
      "تصوير زواج وخطوبة نسائي في الدمام مع باقات واضحة، تفاصيل عروس، وزفة مصورة بأسلوب أنيق.",
    heroLine:
      "للمناسبات في الدمام حيث يهم وضوح الوقت، نوع التغطية، واللقطات التي لا تريد العروس أن تفوت.",
    searchIntent: "عميلة تقارن بين المصورات وتريد أن تفهم الفرق بين الباقات قبل إرسال أول رسالة.",
    audience: "عروس أو عميلة تريد معرفة السعر والمدة واللحظات المغطاة بدون ملف طويل.",
    localPromise: "تغطية أنيقة للزفة والخطوبة وتفاصيل القاعة مع رابط يختصر اختيار الموعد والبكج.",
    cityProof: "محتوى يناسب الدمام: قرار سريع، باقات مرتبة، ونبرة هادئة تجعل الاختيار أوضح.",
    neighborhoodSignals: ["الشاطئ", "الفيصلية", "النور", "الريان", "المزروعية", "الزهور"],
    keywordCluster: [
      "مصورة الدمام",
      "تصوير زواجات الدمام",
      "تصوير خطوبة الدمام",
      "تصوير فيديو زواج نسائي الدمام",
      "مصورة عرايس الدمام"
    ],
    contentWave: [
      "كتابة اسم القاعة أو الحي لتقدير ترتيب الوصول.",
      "تحديد هل المناسبة زواج أو خطوبة أو ملكة.",
      "اختيار مدة التغطية حسب اللقطات المطلوبة.",
      "تجهيز ملاحظات First Look أو تفاصيل العروس قبل المتابعة."
    ],
    faq: [
      {
        question: "كم تبدأ أسعار التصوير في الدمام؟",
        answer:
          "تبدأ الباقات الأساسية من 3,500 ريال للتصوير الفوتوغرافي، وتتوفر باقات شاملة للتصوير والفيديو معاً"
      },
      {
        question: "ما هي قاعات الأفراح في الدمام التي لديكم خبرة في التصوير فيها؟",
        answer:
          "صوّرنا في معظم قاعات الأفراح الكبرى بالدمام، بما فيها قصر الأفراح والمنارة ومجمع البستان"
      },
      {
        question: "كيف يمكنني حجز موعد للتصوير في الدمام؟",
        answer:
          "تواصل معنا عبر واتساب وسنرد خلال ساعات لتحديد تاريخ الحفل ومناقشة الباقة المناسبة"
      },
      {
        question: "هل تصورون حفلات الخطوبة بالإضافة إلى حفلات الزفاف في الدمام؟",
        answer:
          "نعم، نغطي جميع مناسبات الأفراح من خطوبة وزواج وحفلات السعودية"
      }
    ]
  },
  {
    slug: "khobar",
    ar: "الخبر",
    en: "Khobar",
    priority: "تغطية الخبر",
    headline: "تصوير عروس وخطوبة في الخبر بإحساس فاخر وتفاصيل لا تضيع",
    metaTitle: "مصورة زواجات في الخبر | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في الخبر. باقات فاخرة، تفاصيل عروس، First Look، وحجز عبر واتساب.",
    heroLine:
      "للعروس التي تحب اللمسة الراقية: تفاصيل المجوهرات، المسكة، First Look، وزفة مصورة كذكرى كاملة.",
    searchIntent: "عروس تبحث عن طابع راق وتفاصيل عالية الجودة للخطوبة أو الزواج.",
    audience: "عروس أو عميلة تهتم بالفخامة والهدوء وتبحث عن مصورة نسائية بأسلوب واضح وراقي.",
    localPromise: "تفاصيل العروس والكوشة والزفة في مسار بصري مرتب ومناسب لذكرى اليوم.",
    cityProof: "نبرة فاخرة تناسب الخبر، مع باقات تبرز تفاصيل اليوم لا عدد الساعات فقط.",
    neighborhoodSignals: ["العليا", "الراكة", "الكورنيش", "الثقبة", "الجسر", "اليرموك"],
    keywordCluster: [
      "مصورة الخبر",
      "تصوير زواجات الخبر",
      "تصوير خطوبة الخبر",
      "مصورة عرايس الخبر",
      "تصوير فيديو زواج الخبر"
    ],
    contentWave: [
      "تحديد أسلوب الفيلم المطلوب: هادئ، فاخر، أو مختصر.",
      "اختيار الباقة حسب التفاصيل لا عدد الساعات فقط.",
      "إضافة القاعة والوقت حتى تكون المتابعة دقيقة.",
      "تأكيد التوفر قبل تثبيت الموعد والخطوة التالية."
    ],
    faq: [
      {
        question: "كم تبدأ أسعار تصوير حفل الزفاف في الخبر؟",
        answer:
          "تبدأ باقات التصوير الفوتوغرافي من 3,500 ريال وتشمل جلسة كاملة ليوم الحفل مع الملفات عالية الجودة"
      },
      {
        question: "هل تغطون حفلات في فنادق الخبر الكبرى مثل ميريدان وهيلتون وكورال؟",
        answer:
          "نعم، لدينا خبرة واسعة في تصوير حفلات الزفاف في جميع فنادق الخبر الكبرى ونعرف أفضل الزوايا والإضاءات في كل قاعة"
      },
      {
        question: "كم مدة تسليم صور وفيديو الزفاف في الخبر؟",
        answer:
          "نسلّم الصور المعدّلة خلال 3-4 أسابيع من يوم الحفل، والفيديو الاحترافي خلال 6-8 أسابيع"
      },
      {
        question: "هل تتوفر جلسات تصوير خارجية في الخبر؟",
        answer:
          "نعم، نقدم جلسات خارجية مميزة على كورنيش الخبر وعلى ضفاف البحر الساحرة لالتقاط لحظات لا تُنسى"
      }
    ]
  },
  {
    slug: "hofuf",
    ar: "الهفوف",
    en: "Hofuf",
    priority: "الهفوف في قلب الأحساء",
    headline: "تصوير فيديو زواج وخطوبة في الهفوف بأسلوب هادئ يناسب قاعات المحافظة",
    metaTitle: "مصورة زواجات في الهفوف | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في الهفوف. باقات واضحة، تفاصيل العروس، First Look، وحجز سريع عبر واتساب.",
    heroLine:
      "للعروس في الهفوف التي تريد فيلما هادئا يحفظ تفاصيل اليوم بدون إرباك في اختيار الباقة.",
    searchIntent: "عروس في قلب الأحساء تبحث عن مصورة نسائية قريبة من قاعات الهفوف وتفضل قرارا واضحا.",
    audience: "العروس أو العميلة في الهفوف التي تريد معرفة السعر والمدة قبل المحادثة.",
    localPromise: "اختيار الباقة حسب طبيعة قاعات الهفوف ووقت المناسبة، ثم رسالة مرتبة عبر واتساب.",
    cityProof: "تركيز على راحة العائلة، لقطات تفاصيل، وفيلم يحفظ شكل اليوم لا مجرد لحظة الدخول.",
    neighborhoodSignals: ["الهفوف وسط", "الرقيقة", "حي السلمانية", "حي الواحة", "المزروعية", "الحزم"],
    keywordCluster: [
      "مصورة زواجات الهفوف",
      "تصوير فيديو زواج الهفوف",
      "مصورة عرايس الهفوف",
      "تصوير خطوبة الهفوف",
      "باقات تصوير الهفوف"
    ],
    contentWave: [
      "تحديد القاعة في الهفوف لتقدير وقت الوصول.",
      "اختيار الزفة فقط أو تفاصيل العروس قبل أول رسالة.",
      "إرسال التاريخ والبكج الأقرب من رابط العروس.",
      "تأكيد التوفر والخطوة التالية عبر واتساب."
    ],
    faq: [
      {
        question: "هل تغطي قاعات الهفوف الرئيسية؟",
        answer:
          "نعم، الخدمة تغطي قاعات الهفوف الكبرى مع تفضيل تأكيد القاعة مبكرا لترتيب وقت الوصول."
      },
      {
        question: "ما الفرق بين تصوير الهفوف والأحساء؟",
        answer:
          "الهفوف ضمن محافظة الأحساء؛ الأسلوب نفسه، لكن التفاصيل الموقعية تساعد على تخطيط أدق ليوم المناسبة."
      }
    ]
  },
  {
    slug: "mubarraz",
    ar: "المبرز",
    en: "Mubarraz",
    priority: "المبرز ضمن الأحساء",
    headline: "تصوير عروس وخطوبة في المبرز بأسلوب أنيق يحفظ تفاصيل اليوم",
    metaTitle: "مصورة زواجات في المبرز | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في المبرز ضمن محافظة الأحساء. باقات، تفاصيل عروس، وزفة مصورة بهدوء.",
    heroLine:
      "لعروس المبرز التي تريد ذكرى مرتبة من تفاصيل اليوم: المسكة، الكوشة، الدخول، ولقطات هادئة.",
    searchIntent: "عميلة في المبرز تبحث عن مصورة نسائية ذات أسلوب هادئ ومرتب وتفضل وضوح الباقات.",
    audience: "عروس أو عميلة من سكان المبرز أو القرى المجاورة تريد فيلما متماسكا لا مقاطع متفرقة.",
    localPromise: "تغطية أنيقة للزفة وتفاصيل العروس وفيلم يحفظ إيقاع المناسبة في المبرز.",
    cityProof: "محتوى يناسب المبرز: لغة هادئة، باقات مفهومة، وتفاصيل تليق بذوق العروس.",
    neighborhoodSignals: ["المبرز وسط", "حي العزيزية", "حي المنار", "البطالية", "حي اللويمي", "الكوت"],
    keywordCluster: [
      "مصورة زواجات المبرز",
      "تصوير فيديو زواج المبرز",
      "مصورة عرايس المبرز",
      "تصوير خطوبة المبرز",
      "باقات تصوير الأحساء المبرز"
    ],
    contentWave: [
      "كتابة اسم القاعة أو الحي في المبرز لتقدير الوصول.",
      "تحديد نوع المناسبة: زواج، خطوبة، أو ملكة.",
      "اختيار الباقة حسب اللقطات المطلوبة.",
      "تثبيت الموعد بعد مراجعة التوفر."
    ],
    faq: [
      {
        question: "هل المبرز جزء من تغطية الأحساء؟",
        answer:
          "نعم، المبرز ضمن محافظة الأحساء وتصلها الخدمة بنفس مستوى تغطية الهفوف ومدن المحافظة."
      },
      {
        question: "ما البكج الأنسب لزواج في المبرز؟",
        answer:
          "إذا كانت التفاصيل قليلة فبكج الزفة المطور يكفي؛ للتفاصيل واللقطات الأوسع، Half Day أو Full Day الأنسب."
      }
    ]
  },
  {
    slug: "alomran",
    ar: "العمران",
    en: "Al Omran",
    priority: "العمران ضمن الأحساء",
    headline: "تصوير زواج وخطوبة في العمران بأسلوب يناسب العائلات والقاعات المحلية",
    metaTitle: "مصورة زواجات في العمران | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في العمران بمحافظة الأحساء. باقات واضحة وتفاصيل مرتبة للعروس.",
    heroLine:
      "لعروس العمران التي تفضل التغطية الهادئة ولقطات تليق بطبيعة قاعات المنطقة.",
    searchIntent: "عميلة من العمران تبحث عن مصورة نسائية تفهم القاعات المحلية وتقدم باقات مفهومة.",
    audience: "عروس أو عميلة من العمران أو القرى المجاورة تريد قرارا سريعا وتفاصيل واضحة قبل المحادثة.",
    localPromise: "اختيار باقة تناسب يومك في العمران مع رسالة حجز تجمع المدينة والتاريخ والتفاصيل.",
    cityProof: "نبرة محلية للعمران: قرار مرتب، تفاصيل مهمة، وفيلم يحفظ شكل اليوم.",
    neighborhoodSignals: ["العمران", "العيون", "الجشة", "المطيرفي", "أبو ثور", "الفضول"],
    keywordCluster: [
      "مصورة زواجات العمران",
      "تصوير فيديو زواج العمران",
      "مصورة عرايس العمران",
      "تصوير خطوبة الأحساء العمران",
      "باقات تصوير العمران"
    ],
    contentWave: [
      "تحديد القاعة في العمران أو القرى المجاورة.",
      "تحديد اللحظات الأساسية: زفة، تفاصيل، أو First Look.",
      "إرسال التاريخ من رابط العروس.",
      "مراجعة التوفر عبر واتساب."
    ],
    faq: [
      {
        question: "هل العمران ضمن تغطية الأحساء؟",
        answer:
          "نعم، العمران ضمن محافظة الأحساء وتصلها الخدمة بنفس مستوى الهفوف والمبرز."
      },
      {
        question: "هل أحتاج لباقة كاملة؟",
        answer:
          "تعتمد الإجابة على عدد اللحظات التي تريدين حفظها. للزفة فقط: بكج الزفة. للتفاصيل الواسعة: Half Day أو Full Day."
      }
    ]
  },
  {
    slug: "altarafiyya",
    ar: "الطرفية",
    en: "Al Tarafiyya",
    priority: "الطرفية ضمن الأحساء",
    headline: "تصوير زواج وخطوبة في الطرفية بإحساس هادئ ومرتب",
    metaTitle: "مصورة زواجات في الطرفية | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في الطرفية بمحافظة الأحساء. لقطات هادئة، باقات واضحة، وحجز سريع.",
    heroLine:
      "لعروس الطرفية التي تريد فيلما هادئا يحفظ التفاصيل بدون إرباك في اليوم نفسه.",
    searchIntent: "عميلة من الطرفية تبحث عن مصورة نسائية قريبة وتريد قرارا واضحا بسرعة.",
    audience: "عروس أو عميلة من الطرفية وما حولها تريد معرفة الأسلوب والباقة قبل المحادثة.",
    localPromise: "تغطية تناسب قاعات الطرفية مع رابط حجز يختصر اختيار الموعد والباقة.",
    cityProof: "محتوى محلي للطرفية: لغة هادئة، باقات مرتبة، ولقطات تليق بذوق العائلة.",
    neighborhoodSignals: ["الطرفية", "الكلابية", "الشهارين", "الجبيل القروية", "الجفر", "الحليلة"],
    keywordCluster: [
      "مصورة زواجات الطرفية",
      "تصوير فيديو زواج الطرفية",
      "مصورة عرايس الطرفية",
      "تصوير خطوبة الطرفية",
      "باقات تصوير الأحساء الطرفية"
    ],
    contentWave: [
      "تحديد القاعة في الطرفية لتقدير الوصول.",
      "اختيار الزفة فقط أو تفاصيل العروس.",
      "إرسال التاريخ من رابط العروس.",
      "تثبيت الحجز بعد مراجعة التوفر."
    ],
    faq: [
      {
        question: "هل تصلون الطرفية وقراها؟",
        answer:
          "نعم، الطرفية وقراها ضمن تغطية محافظة الأحساء مع تنسيق وقت الوصول حسب القاعة."
      },
      {
        question: "هل البكج الأقل مناسب؟",
        answer:
          "يعتمد على اللحظات المهمة لك. بكج الزفة يحفظ الدخول، والباقات الأعلى تغطي التفاصيل وFirst Look."
      }
    ]
  },
  {
    slug: "qatif",
    ar: "القطيف",
    en: "Qatif",
    priority: "تغطية القطيف",
    headline: "تصوير عروس وخطوبة في القطيف بإحساس هادئ يليق بذوق المنطقة",
    metaTitle: "مصورة زواجات في القطيف | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في القطيف. باقات مرتبة، تفاصيل عروس، وزفة مصورة بأسلوب أنيق.",
    heroLine:
      "لعروس القطيف التي تحب تفاصيل اليوم وتريد فيلما هادئا يحفظ المسكة، الكوشة، والدخول.",
    searchIntent: "عميلة في القطيف تبحث عن مصورة نسائية ذات أسلوب راق وقاعات مرتبة.",
    audience: "عروس أو عميلة من القطيف وقراها تفضل التصوير الناعم واللقطات المرتبة.",
    localPromise: "أسلوب يناسب طبيعة القاعات في القطيف مع باقات تشرح اللحظات بوضوح.",
    cityProof: "نبرة محلية للقطيف، تفاصيل هادئة، وفيلم متماسك يحفظ شكل اليوم.",
    neighborhoodSignals: ["القطيف وسط", "العوامية", "صفوى", "تاروت", "سيهات", "أم الحمام"],
    keywordCluster: [
      "مصورة زواجات القطيف",
      "تصوير فيديو زواج القطيف",
      "مصورة عرايس القطيف",
      "تصوير خطوبة القطيف",
      "باقات تصوير القطيف"
    ],
    contentWave: [
      "تحديد القاعة أو القرية في القطيف.",
      "اختيار نوع المناسبة وأسلوب الفيديو.",
      "إرسال التاريخ من رابط العروس.",
      "تأكيد التوفر والخطوة التالية."
    ],
    faq: [
      {
        question: "هل تغطي قرى القطيف؟",
        answer:
          "نعم، الخدمة تشمل القطيف وقراها مع تنسيق وقت الوصول حسب القاعة والمناسبة."
      },
      {
        question: "هل يوجد بكج مناسب للخطوبة فقط؟",
        answer:
          "نعم، بكج الخطوبة يغطي التلبيس والشبكة والكيك والزفة في فيلم خطوبة مرتب."
      }
    ]
  },
  {
    slug: "jubail",
    ar: "الجبيل",
    en: "Jubail",
    priority: "تغطية الجبيل",
    headline: "تصوير زواج وخطوبة في الجبيل بأسلوب مرتب يناسب القاعات الحديثة",
    metaTitle: "مصورة زواجات في الجبيل | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في الجبيل. باقات واضحة، تفاصيل عروس، First Look، وحجز عبر واتساب.",
    heroLine:
      "لعروس الجبيل التي تريد فيلما حديثا يحفظ تفاصيل اليوم في قاعات المدينة الصناعية.",
    searchIntent: "عميلة في الجبيل تبحث عن مصورة نسائية قريبة من قاعات المدينة وتريد قرارا سريعا.",
    audience: "عروس أو عميلة من سكان الجبيل تفضل وضوح الباقات والتفاصيل قبل المحادثة.",
    localPromise: "تغطية مرتبة لقاعات الجبيل مع رابط حجز يختصر الاختيار.",
    cityProof: "محتوى يناسب الجبيل: قرار سريع، باقات مرتبة، ولقطات بإيقاع هادئ.",
    neighborhoodSignals: ["الجبيل البلد", "الجبيل الصناعية", "حي الفيحاء", "حي الفناتير", "حي اللؤلؤ", "حي الحويلات"],
    keywordCluster: [
      "مصورة زواجات الجبيل",
      "تصوير فيديو زواج الجبيل",
      "مصورة عرايس الجبيل",
      "تصوير خطوبة الجبيل",
      "باقات تصوير الجبيل"
    ],
    contentWave: [
      "تحديد القاعة في الجبيل لتقدير الوصول.",
      "اختيار الباقة حسب اللحظات المطلوبة.",
      "إرسال التاريخ من رابط العروس.",
      "تأكيد التوفر عبر واتساب."
    ],
    faq: [
      {
        question: "هل تصلون قاعات الجبيل؟",
        answer:
          "نعم، الخدمة تغطي قاعات الجبيل البلد والصناعية مع ترتيب وقت الوصول حسب القاعة."
      },
      {
        question: "ما أفضل بكج لقاعات الجبيل الكبيرة؟",
        answer:
          "للتغطية الكاملة Full Day هو الأنسب؛ ولمن تريد الزفة وتفاصيل الكوشة فقط فبكج الزفة المطور يفي بالغرض."
      }
    ]
  }
];

export const boardScore = [
  { value: "01", label: "الإحساس", detail: "فيلم يحفظ شكل اللحظة وشعورها" },
  { value: "02", label: "التفاصيل", detail: "فستان، مسكة، خاتم، كوشة، وزفة" },
  { value: "03", label: "الاختيار", detail: "باقات مفهومة قبل أول رسالة" },
  { value: "04", label: "المتابعة", detail: "رابط عروس وواتساب مختصر" }
];

export const packages = [
  {
    id: "01",
    name: "بكج الزفة",
    price: "600",
    duration: "20 دقيقة",
    summary: "توثيق لحظة الدخول بإضاءة جميلة ومونتاج مختصر لمن تريد حفظ الزفة فقط.",
    bestFor: "عروس تريد ذكرى واضحة للحظة الدخول بدون تغطية تفاصيل اليوم.",
    deliverable: "فيلم زفة مختصر",
    sequence: ["حضور قبل الزفة", "تجهيز الإضاءة", "تصوير الزفة", "مونتاج سريع"],
    bullets: ["الحضور قبل الزفة بربع ساعة", "تصوير سينمائي بإضاءة وترتيب واضح", "مناسب للحجز السريع"]
  },
  {
    id: "02",
    name: "بكج الزفة المطور",
    price: "1200",
    duration: "ساعة",
    summary: "تصوير الزفة مع تفاصيل الكوشة والكيك ولقطات القاعة الأساسية قبل لحظة الدخول.",
    bestFor: "عروس تريد الزفة مع لمسات المكان المهمة بدون تغطية يوم كامل.",
    deliverable: "فيلم زفة وتفاصيل",
    sequence: ["لقطات القاعة", "الكوشة والكيك", "الزفة", "مونتاج منسق"],
    bullets: ["تفاصيل القاعة والكوشة", "لقطات قريبة للكعكة والديكور", "تغطية عملية وواضحة"]
  },
  {
    id: "03",
    name: "Half Day",
    price: "1700",
    duration: "3 ساعات",
    summary: "First Look وتفاصيل العروس والكوشة وكواليس التصوير وزفة واحدة في فيلم متوازن.",
    bestFor: "العروس التي تريد قصة أنيقة لا تكتفي بلقطة الدخول.",
    deliverable: "فيلم عروس متكامل",
    sequence: ["تفاصيل العروس", "First Look", "كواليس الفوتو", "الزفة"],
    bullets: ["تفاصيل المجوهرات والمسكة والكعب والعطر", "لقطات مشاعر عفوية", "البكج الأنسب لتغطية متوازنة"],
    spotlight: "الأكثر قابلية للتحويل"
  },
  {
    id: "04",
    name: "Full Day",
    price: "2500",
    duration: "6 ساعات",
    summary: "تغطية كاملة من الصالون إلى القاعة مع First Look وتفاصيل العروس والكوشة وزفتين.",
    bestFor: "العروس التي تريد قصة اليوم كاملة من البداية إلى النهاية.",
    deliverable: "فيلم يوم كامل",
    sequence: ["الصالون", "تفاصيل المكياج", "القاعة", "زفتين"],
    bullets: ["تفاصيل المكياج والشعر", "تفاصيل القاعة والكوشة", "مونتاج احترافي شامل"],
    featured: true,
    spotlight: "أعلى قيمة بصرية"
  },
  {
    id: "05",
    name: "بكج الخطوبة",
    price: "1500",
    duration: "ساعتان ونصف",
    summary: "تفاصيل العروس والكوشة والشبكة والتلبيس والكيك والزفة في فيلم خطوبة مرتب.",
    bestFor: "خطوبة أو ملكة تحتاج حفظ التفاصيل واللحظات العائلية بنعومة.",
    deliverable: "فيلم خطوبة",
    sequence: ["الشبكة", "التلبيس", "الكيك", "الزفة"],
    bullets: ["مصمم للخطوبة والملكة", "تغطية لحظات التلبيس والشبكة", "أسلوب راق وهادئ"]
  }
];

export const services: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Video,
    title: "فيديو سينمائي",
    text: "تغطية نسائية هادئة تلتقط الإحساس، الحركة، وتفاصيل اليوم بدون إرباك."
  },
  {
    icon: Camera,
    title: "تفاصيل العروس",
    text: "لقطات للمجوهرات، المسكة، الكعب، العطر، الكوشة، واللحظات الصغيرة التي تصنع الفيلم."
  },
  {
    icon: HeartHandshake,
    title: "راحة الاختيار",
    text: "تجربة مفهومة للعروس والعميلة: الباقة، التاريخ، والمدينة في مسار واحد."
  },
  {
    icon: WandSparkles,
    title: "مونتاج مرتب",
    text: "الباقات تشرح القصة قبل السعر: ماذا سيصور، لماذا يهم، وما النتيجة المتوقعة."
  }
];

export const cinematicMoments: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Crown, title: "لحظة الدخول", text: "تأطير الزفة كقطة بطل واضحة ومضيئة." },
  { icon: Gem, title: "تفاصيل اللمعة", text: "المجوهرات، المسكة، العطر، والكعب تصبح ذاكرة قريبة." },
  { icon: HeartHandshake, title: "مشاعر اليوم", text: "لقطات ناعمة بلا إزعاج للعروس أو الضيوف." },
  { icon: Film, title: "إيقاع الفيلم", text: "ترتيب اللقطات من التحضير إلى النهاية حتى لا يبدو الفيديو مجمعا عشوائيا." }
];

export const bookingSteps = [
  { number: "1", title: "شاهدي الباقات", detail: "تعرفين الفرق بين الزفة، التفاصيل، First Look، واليوم الكامل." },
  { number: "2", title: "اختاري ما يشبهك", detail: "المدينة والتاريخ والبكج في خطوات قصيرة بدون ملف طويل." },
  { number: "3", title: "أرسلي التفاصيل", detail: "تتحول اختياراتك إلى رسالة واتساب جاهزة ومفهومة." },
  { number: "4", title: "راجعي التوفر", detail: "يتم تأكيد التاريخ والبكج والخطوة التالية حسب وثيقة العمل." }
];

export const portfolioScenes = [
  {
    id: "01",
    title: "دخول الزفة",
    summary: "اللقطة التي تحفظ رهبة الدخول والإضاءة والمشهد كاملًا بدون ارتباك في الحركة.",
    packageHint: "بكج الزفة أو الزفة المطور",
    cityHint: "مناسب للأحساء والدمام والخبر",
    keywords: ["تصوير زفة", "فيلم دخول", "لقطة افتتاحية"]
  },
  {
    id: "02",
    title: "First Look",
    summary: "لحظة قصيرة لكنها من أكثر اللقطات طلبًا عندما تريد العروس رد فعل صادقًا ومقربًا.",
    packageHint: "Half Day أو Full Day",
    cityHint: "يظهر كثيرًا في حفلات الخبر والشرقية",
    keywords: ["First Look", "مشاعر اليوم", "لقطة قريبة"]
  },
  {
    id: "03",
    title: "تفاصيل العروس",
    summary: "المجوهرات، المسكة، العطر، الكعب، والفستان ضمن إيقاع ناعم يجعل التفاصيل جزءًا من القصة.",
    packageHint: "Half Day وما فوق",
    cityHint: "مهم للعروس التي تريد ألبومًا أنيقًا",
    keywords: ["تفاصيل العروس", "مجوهرات", "مسكة"]
  },
  {
    id: "04",
    title: "الكوشة والقاعة",
    summary: "إظهار شكل المكان قبل دخول الضيوف حتى يبقى تصميم القاعة حاضرًا في الفيلم النهائي.",
    packageHint: "الزفة المطور أو Full Day",
    cityHint: "يناسب زواجات الدمام والقاعة الكبيرة",
    keywords: ["الكوشة", "تفاصيل القاعة", "ديكور المناسبة"]
  },
  {
    id: "05",
    title: "لقطات الشبكة والملكة",
    summary: "تغطية التلبيس، الكيك، الشبكة، واللحظات العائلية بلقطة مرتبة تناسب الخطوبة والملكة.",
    packageHint: "بكج الخطوبة",
    cityHint: "طلب متكرر في الخطوبات النسائية",
    keywords: ["تصوير خطوبة", "ملكة", "الشبكة"]
  },
  {
    id: "06",
    title: "تفاصيل الطاولة والضيافة",
    summary: "المساحات الصغيرة مثل القهوة والحلويات والورد تضيف فخامة هادئة عندما تُرتب داخل الألبوم.",
    packageHint: "يضاف عادة إلى الباقات المتوسطة والعالية",
    cityHint: "يخدم الطلبات الفاخرة في الخبر",
    keywords: ["ضيافة", "طاولة التفاصيل", "لقطات جمالية"]
  },
  {
    id: "07",
    title: "كواليس الفوتوشوت",
    summary: "لقطات بسيطة أثناء الترتيب أو التنقل تمنح الفيلم حياة بدون أن تزعج العروس أو توقف اليوم.",
    packageHint: "Half Day أو Full Day",
    cityHint: "مفيد للعروس التي تريد فيلمًا حيًا",
    keywords: ["BTS", "كواليس", "حركة اليوم"]
  },
  {
    id: "08",
    title: "الإغلاق الأخير",
    summary: "آخر لقطة في الألبوم يجب أن تنهي اليوم بإحساس هادئ: خروج، ابتسامة، أو نظرة أخيرة للمشهد.",
    packageHint: "كل الباقات تستفيد منه",
    cityHint: "تفصيل صغير يرفع قيمة الفيلم",
    keywords: ["نهاية الفيلم", "إغلاق بصري", "ذكرى كاملة"]
  }
];

export const conversionFlow = [
  { label: "إعجاب", detail: "لقطة زفة، تفصيلة عروس، أو ريل قصير", metric: "انتباه أول" },
  { label: "اطمئنان", detail: "أسلوب هادئ، باقات واضحة، وأسئلة مختصرة", metric: "تردد أقل" },
  { label: "اختيار", detail: "مقارنة البكجات حسب لحظات اليوم", metric: "قرار أسرع" },
  { label: "متابعة", detail: "رابط عروس ثم واتساب بتفاصيل جاهزة", metric: "محادثة أسهل" }
];

export const seoFocus = [
  "مصورة زواجات في الأحساء",
  "تصوير فيديو زواج نسائي الدمام",
  "مصورة عرايس الخبر",
  "تصوير خطوبة نسائي الشرقية",
  "باقات تصوير فيديو زواج"
];

export const profileAssets = [
  {
    channel: "Instagram",
    title: "Bio مباشر",
    lines: [
      "مصورة فيديو للأعراس والخطوبة ⚜️",
      "أفلام زفاف هادئة للعروس | الأحساء، الدمام، الخبر",
      "الباقات والحجز عبر الرابط 👇"
    ],
    action: "ضع asmaa.video كرابط وحيد ثم ثبت Reel، Packages، Booking."
  },
  {
    channel: "TikTok",
    title: "Bio مختصر",
    lines: [
      "Asmaa Studio ⚜️",
      "تصوير فيديو زواجات وخطوبة",
      "الأحساء | الدمام | الخبر",
      "شاهدي الباقات واحجزي عبر الرابط"
    ],
    action: "استخدم نفس رابط الموقع حتى لا تتشتت مصادر الحجز."
  },
  {
    channel: "WhatsApp Business",
    title: "رد البداية",
    lines: [
      "أهلا، اختاري المدينة والتاريخ والبكج من الرابط.",
      "بعدها نراجع التوفر ونكمل التفاصيل معك هنا."
    ],
    action: "استبدل الملف الطويل برابط /reserve في أول رد."
  }
];

export const hashtagSets = [
  {
    city: "الأحساء",
    tags: ["#تصوير_زواجات_الأحساء", "#مصورة_الأحساء", "#عروس_الأحساء", "#زواجات_الأحساء", "#تصوير_زفة", "#مصورة_عرايس"]
  },
  {
    city: "الدمام",
    tags: ["#مصورة_الدمام", "#تصوير_زواجات_الدمام", "#عروس_الدمام", "#زواجات_الشرقية", "#تصوير_خطوبة", "#تصوير_نسائي"]
  },
  {
    city: "الخبر",
    tags: ["#مصورة_الخبر", "#تصوير_زواجات_الخبر", "#عروس_الخبر", "#خطوبة_الخبر", "#زواجات_الخبر", "#تصوير_فيديو_زواج"]
  }
];

export const channelActions = [
  { label: "Search Console", task: "إرسال sitemap.xml ومراقبة صفحات المدن.", status: "جاهز الآن" },
  { label: "Google Business", task: "توحيد الرقم والموقع ومناطق الخدمة ثم نشر تحديث أسبوعي.", status: "إشارة محلية" },
  { label: "Instagram", task: "تغيير الاسم الظاهر إلى Asmaa Studio | أسماء ستوديو وتثبيت 3 منشورات.", status: "واجهة الانطباع" },
  { label: "TikTok", task: "استخدام نفس الرابط ونشر مقاطع قصيرة تقود إلى /reserve.", status: "اكتشاف سريع" },
  { label: "WhatsApp", task: "إرسال رابط العروس بدل الملف الطويل في أول رسالة.", status: "تحويل مباشر" },
  { label: "Citations", task: "إضافة بيانات موحدة في أدلة الزواجات والموردين المحليين.", status: "بناء سلطة" }
];

export const contentPillars = [
  { title: "تفاصيل العروس", detail: "الفستان، الخواتم، المسكة، العطر، الكوشة، وتفاصيل القاعة." },
  { title: "لحظات الإحساس", detail: "First Look، الدخول، وفرحة اليوم بصياغة هادئة." },
  { title: "اختيار البكج", detail: "شرح الفرق بين الزفة، Half Day، Full Day، وبكج الخطوبة." },
  { title: "تجهيز اليوم", detail: "ماذا تجهز العروس قبل التصوير وكيف تختصر وقت الأسئلة." },
  { title: "نية محلية", detail: "الأحساء، الدمام، الخبر، والموسم بدون ادعاء ارتباط بأي قاعة." }
];

export const boardLevers = [
  { title: "ظهور محلي", detail: "صفحات مدن منفصلة وكلمات عربية قريبة من نية الحجز." },
  { title: "WhatsApp-first", detail: "كل CTA يفتح محادثة مفهومة بدلا من ملف مبهم." },
  { title: "Highlights", detail: "هايلايت مرتب يجيب اعتراضات الشراء: Album، Packages، Booking، Details." },
  { title: "Package story", detail: "البيع حسب لحظات اليوم والنتيجة المتوقعة لا حسب السعر فقط." },
  { title: "One brand language", detail: "Asmaa Studio، نفس الرقم، نفس الرابط، ونفس الوعد في كل قناة." }
];

export const areaStrategy: { icon: LucideIcon; city: string; angle: string; detail: string }[] =
  serviceAreas.map((area, index) => ({
    icon: [MapPinned, Sparkles, HeartHandshake][index] ?? MapPinned,
    city: area.ar,
    angle: area.priority,
    detail: area.localPromise
  }));

export const highlights = [
  { label: "Album", file: "album.svg", text: "ألبوم مختصر لأفضل اللقطات" },
  { label: "Care", file: "feedback.svg", text: "اطمئنان قبل الحجز بدون وعود مبالغ فيها" },
  { label: "Packages", file: "packages.svg", text: "اختيار البكج حسب لحظات اليوم" },
  { label: "Zaffa", file: "zaffa.svg", text: "بكج الزفة للحجز السريع" },
  { label: "Bride details", file: "bride-details.svg", text: "تفاصيل العروس والإكسسوارات" },
  { label: "Video details", file: "video-details.svg", text: "أسلوب الفيديو والمونتاج" },
  { label: "First Look", file: "first-look.svg", text: "لحظة الظهور الأولى" },
  { label: "Booking", file: "booking-policy.svg", text: "طريقة الحجز والخطوات" },
  { label: "BTS", file: "bts.svg", text: "كواليس العمل بشكل أنيق ومختصر" },
  { label: "Editing", file: "editing.svg", text: "المونتاج وتسليم الفيلم" },
  { label: "Life style", file: "lifestyle.svg", text: "لقطات ناعمة للحياة والتفاصيل" },
  { label: "Coffee&food", file: "coffee-food.svg", text: "ضيافة وتفاصيل طاولة" },
  { label: "Snapchat", file: "snapchat.svg", text: "مقاطع قصيرة وسريعة" }
];

export const seoLaunchWaves: { day: string; title: string; channel: string; goal: string; ownerCue: string }[] = [
  { day: "01", title: "صفحة الأحساء + ريل الزفة", channel: "Website + Instagram", goal: "امتلاك نية الأحساء", ownerCue: "رابط /alahsa في البايو والستوري" },
  { day: "02", title: "كاروسيل اختيار البكج", channel: "Instagram", goal: "تحويل السعر إلى قرار", ownerCue: "استخدام لقطة تفاصيل عروس" },
  { day: "03", title: "صفحة الدمام + ستوري أسئلة", channel: "Website + Stories", goal: "التوسع بدون إعلان", ownerCue: "تصويت: زفة فقط أم Full Day" },
  { day: "04", title: "هايلايت Packages الجديد", channel: "Instagram Highlights", goal: "تقليل طلب الملف", ownerCue: "رفع غلاف Packages" },
  { day: "05", title: "صفحة الخبر + First Look", channel: "Website + TikTok", goal: "طلب راق عالي القيمة", ownerCue: "ريل 7 ثواني قبل/بعد" },
  { day: "06", title: "FAQ: راحة العروس يوم المناسبة", channel: "Website + WhatsApp", goal: "إزالة تردد العميلة", ownerCue: "إجابة مختصرة في الحالة" },
  { day: "07", title: "مقارنة Half Day وFull Day", channel: "Instagram Carousel", goal: "رفع متوسط البكج", ownerCue: "CTA: اكتبي Half Day" },
  { day: "08", title: "محتوى تفاصيل العروس", channel: "TikTok + Reels", goal: "جذب العروس نفسها", ownerCue: "لقطات مجوهرات ومسكة" },
  { day: "09", title: "Google Business Profile منشور", channel: "Google", goal: "إشارة محلية", ownerCue: "نشر خدمة تصوير زواجات" },
  { day: "10", title: "هايلايت Bride Details", channel: "Instagram Highlights", goal: "إثبات الذوق", ownerCue: "تحديث الغلاف والمقاطع" },
  { day: "11", title: "ريل الدمام: القاعة والكوشة", channel: "Instagram", goal: "بحث الدمام", ownerCue: "هاشتاقات الدمام فقط" },
  { day: "12", title: "ستوري رابط العروس", channel: "Stories + WhatsApp", goal: "تحويل الأسئلة المتكررة إلى رابط", ownerCue: "ضع رابط /reserve" },
  { day: "13", title: "ريل الخبر: تفاصيل فاخرة", channel: "TikTok", goal: "طلب Premium", ownerCue: "نص قصير: للخبر والشرقية" },
  { day: "14", title: "صفحة أسئلة حجز مصغرة", channel: "Website", goal: "تقليل رسائل متكررة", ownerCue: "إجابة وقت الحضور والعربون" },
  { day: "15", title: "تحديث الألبوم", channel: "Highlights", goal: "إظهار جودة حديثة", ownerCue: "أفضل 8 لقطات فقط" },
  { day: "16", title: "كاروسيل الزفة فقط", channel: "Instagram", goal: "حجز الميزانية الصغيرة", ownerCue: "شرح بكج 600" },
  { day: "17", title: "ريل الخطوبة", channel: "TikTok + Reels", goal: "التقاط الملكة والخطوبة", ownerCue: "ذكر بكج الخطوبة" },
  { day: "18", title: "منشور Google ثان", channel: "Google", goal: "استمرارية محلية", ownerCue: "أضف صورة تفاصيل عامة من العمل" },
  { day: "19", title: "Feedback بدون اقتباس مزيف", channel: "Highlights", goal: "اطمئنان طبيعي", ownerCue: "لقطة شاشة بعد موافقة العميلة" },
  { day: "20", title: "تقرير مصادر الحجز", channel: "المواعيد + واتساب", goal: "قياس ما يحجز فعلا", ownerCue: "تسجيل مصدر كل محادثة" }
];

export const trustSignals: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: BadgeCheck, title: "مرخّصة رسميًا", detail: "خدمة تصوير مصرّح بها من وزارة الموارد البشرية والتنمية الاجتماعية." },
  { icon: Sparkles, title: "أحدث المعدات", detail: "كاميرات وعدسات وإضاءة سينمائية حديثة لكل تفصيلة من فيلم اليوم." },
  { icon: CalendarCheck, title: "حجز منظم", detail: "كل طلب يأتي بتاريخ ومدينة وبكج لتقليل ضياع الرسائل." },
  { icon: Search, title: "ظهور محلي", detail: "محتوى محلي يبدأ من الأحساء ثم الدمام والخبر." }
];

export const packageAddOns: { id: string; name: string; nameEn: string; price: string; description: string }[] = [
  {
    id: "extra-hour",
    name: "الساعة الإضافية",
    nameEn: "Extra hour",
    price: "200 ريال",
    description: "تمديد وقت التصوير بأي باقة بسعر ثابت لكل ساعة إضافية."
  },
  {
    id: "mannequin",
    name: "منيكان لتصوير فستان العروس",
    nameEn: "Bridal dress mannequin",
    price: "150 ريال",
    description: "إعداد فستان العروس على منيكان لتصويره بإضاءة سينمائية كقطة مستقلة."
  },
  {
    id: "color-grade",
    name: "التلوين السينمائي وتنعيم البشرة",
    nameEn: "Cinematic color grading + skin softening",
    price: "350 ريال",
    description: "مرحلة Color Grade سينمائية لكامل الفيلم مع تنعيم بشرة العروس بطبقة احترافية."
  },
  {
    id: "moonlight",
    name: "إضاءة المون لايت وقت الزفة",
    nameEn: "Moonlight bridal entrance lighting",
    price: "مشمولة في بكج الزفة",
    description: "إضاءة محترفة تسلط على العروس وقت الزفة لإبراز اللحظة في الإضاءة المعتمة."
  }
];

export const paymentTerms: { step: string; text: string }[] = [
  { step: "1", text: "تختارين البكج من الموقع ويصلنا الطلب بتاريخ ومدينة وباقة واضحة." },
  { step: "2", text: "يتم تأكيد الحجز عبر تحويل عربون بنصف قيمة الفاتورة (العربون لا يُرد عند إلغاء الحجز)." },
  { step: "3", text: "التحويل يتم على أحد حساباتنا البنكية ثم تُرسل صورة الإيصال عبر واتساب." },
  { step: "4", text: "مدة الحجز يومان فقط؛ في حال عدم تحويل العربون يعتبر الحجز ملغيا." },
  { step: "5", text: "أي ساعة تصوير إضافية تُحسب بسعر ثابت 200 ريال." },
  { step: "6", text: "يتم تسليم المبلغ المتبقي يوم المناسبة قبل بداية التصوير." }
];

export const credentials = {
  ministryAr: "مرخّصة من وزارة الموارد البشرية والتنمية الاجتماعية",
  ministryEn: "Licensed by the Saudi Ministry of Human Resources & Social Development",
  whatsappOfficialLink: "https://wa.me/message/RUHGT5HZCULJF1",
  equipmentAr: "أحدث المعدات السينمائية للتصوير والإضاءة",
  equipmentEn: "Latest cinematic equipment for filming and lighting"
} as const;

export const bookingFaqs: BookingFaq[] = [
  {
    question: "كيف أختار الباقة المناسبة قبل واتساب؟",
    answer:
      "ابدئي من عدد اللحظات التي تريدين حفظها. إذا كان تركيزك على لحظة الدخول فقط فبكج الزفة يكفي، وإذا أردت تفاصيل العروس وFirst Look والقاعة فالباقات الأعلى أوضح لك."
  },
  {
    question: "متى يكون الحضور قبل الزفة أو بداية المناسبة؟",
    answer:
      "يختلف حسب الباقة، لكن بكج الزفة يشمل الحضور قبل الدخول بربع ساعة، والباقات الأطول ترتب وقت الوصول بحسب تفاصيل اليوم واللقطات المطلوبة."
  },
  {
    question: "هل الحجز يتم مباشرة من الموقع؟",
    answer:
      "الموقع يختصر القرار ويجمع التفاصيل، ثم يتم تأكيد التوفر والخطوة التالية عبر واتساب حتى تكون المتابعة سريعة وواضحة."
  },
  {
    question: "ما الذي أرسله في أول رسالة حتى يكون الرد أسرع؟",
    answer:
      "التاريخ، المدينة، اسم القاعة أو الحي، الباقة الأقرب لك، وأي لحظة أساسية مثل First Look أو تفاصيل العروس. رابط العروس يجمع هذه المعلومات لك تلقائيا."
  },
  {
    question: "هل يوجد عربون لتثبيت الموعد؟",
    answer:
      "نعم، تثبيت الموعد وخطوة العربون يتم توضيحهما بعد مراجعة التوفر وتفاصيل المناسبة حتى يكون الاتفاق مناسبا لليوم المطلوب."
  },
  {
    question: "هل الخدمة للأحساء فقط؟",
    answer:
      "الخدمة تركز حاليا على الأحساء ثم الدمام والخبر، ويمكن كتابة القاعة أو الحي داخل الرابط لتوضيح مكان المناسبة بدقة."
  },
  {
    question: "هل التصوير مناسب للزواجات والخطوبة النسائية؟",
    answer:
      "نعم، أسلوب الخدمة مخصص لتصوير الأعراس والخطوبة النسائية بلقطات هادئة وتفاصيل مرتبة تحافظ على ذوق المناسبة."
  },
  {
    question: "متى أعرف التوفر النهائي؟",
    answer:
      "بعد إرسال الرابط أو رسالة واتساب المرتبة تتم مراجعة التاريخ والمدينة والباقة ثم يصل تأكيد التوفر والخطوة التالية مباشرة."
  }
];

export const liveOperatingSystem = [
  { icon: MonitorSmartphone, label: "رابط العروس", text: "اختيار الباقة والتاريخ والمدينة في خطوات قصيرة." },
  { icon: Workflow, label: "طلب مرتب", text: "التفاصيل تصل بطريقة تسهل المتابعة بدون أسئلة مكررة." },
  { icon: Camera, label: "هايلايت واضح", text: "الألبوم، الباقات، والتفاصيل تظهر قبل قرار التواصل." },
  { icon: Zap, label: "تذكير واضح", text: "الصفحات والهايلايت تساعد العروس على تذكر الباقة المناسبة." },
  { icon: CheckCircle2, label: "اختيار أهدأ", text: "كل باقة مربوطة بلحظات اليوم لا بالسعر فقط." },
  { icon: Clock, label: "رد أسرع", text: "المحادثة تبدأ من معلومات جاهزة لا من سؤال عام." }
];

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
  ShieldCheck,
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

export const whatsappLink = (source = "website") =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `السلام عليكم، وصلتكم من موقع Asmaa Studio (${source}) وأرغب بمعرفة التوفر والباقات.`
  )}`;

export type CityFaq = {
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
    priority: "الموجة 01",
    headline: "تصوير زواجات نسائي في الأحساء بهدوء وخصوصية وباقات واضحة",
    metaTitle: "مصورة زواجات في الأحساء | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في الأحساء. باقات واضحة، رابط حجز للعروس، وواتساب مباشر للتوفر.",
    heroLine:
      "الأحساء هي السوق الأساسي: صفحة مصممة لكلمات البحث القريبة من قرار الحجز، وليست صفحة عامة.",
    searchIntent: "عروس تبحث الآن عن مصورة زواج أو خطوبة نسائية قريبة وسهلة التواصل.",
    audience: "العروس، أخت العروس، أو الخالة التي تريد تأكيد السعر والتوفر بسرعة.",
    localPromise: "رد واضح على التوفر، اختيار بكج سريع، وتجهيز تفاصيل العروس قبل يوم المناسبة.",
    cityProof: "تركيز الصفحة على مفردات الأحساء، الحجز المبكر، وخصوصية التصوير النسائي.",
    neighborhoodSignals: ["الهفوف", "المبرز", "القارة", "العيون", "العمران", "الطرف"],
    keywordCluster: [
      "مصورة زواجات في الأحساء",
      "تصوير فيديو زواج نسائي الأحساء",
      "مصورة عرايس الأحساء",
      "تصوير خطوبة نسائي الأحساء",
      "باقات تصوير زواج الأحساء"
    ],
    contentWave: [
      "ريل: تفاصيل العروس قبل الزفة",
      "ستوري: كيف تختارين مدة التصوير",
      "كاروسيل: الفرق بين بكج الزفة وFull Day",
      "هايلايت: وثيقة العمل والحجز"
    ],
    faq: [
      {
        question: "هل التصوير مناسب للزواجات النسائية في الأحساء؟",
        answer:
          "نعم، الخدمة موجهة للتصوير النسائي مع تركيز على الخصوصية واللقطات الهادئة وتفاصيل العروس."
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
    priority: "الموجة 02",
    headline: "تصوير فيديو زواج وخطوبة نسائي في الدمام للعروس التي تريد وضوحا وسرعة",
    metaTitle: "مصورة زواجات في الدمام | Asmaa Studio",
    metaDescription:
      "باقات تصوير زواج وخطوبة نسائي في الدمام مع رابط حجز واضح وتحويل مباشر إلى واتساب.",
    heroLine:
      "الدمام سوق توسع قوي: الصفحة تركز على نية البحث التجارية، الباقات، والتوفر السريع.",
    searchIntent: "عميلة تقارن بين مصورات وتحتاج عرضا واضحا قبل أول رسالة واتساب.",
    audience: "عروس أو أخت عروس تريد معرفة السعر والمدة ونطاق التغطية دون ملف PDF طويل.",
    localPromise: "تغطية أنيقة للزفة والخطوبة وتفاصيل القاعة مع مسار حجز مختصر.",
    cityProof: "محتوى الصفحة يربط الدمام بالخصوصية، وضوح الباقات، وسهولة طلب الموعد.",
    neighborhoodSignals: ["الشاطئ", "الفيصلية", "النور", "الريان", "المزروعية", "الزهور"],
    keywordCluster: [
      "مصورة الدمام",
      "تصوير زواجات الدمام",
      "تصوير خطوبة الدمام",
      "تصوير فيديو زواج نسائي الدمام",
      "مصورة عرايس الدمام"
    ],
    contentWave: [
      "ريل: لحظة First Look",
      "ستوري: أسئلة الدمام عن مدة التغطية",
      "كاروسيل: 5 لقطات لا تفوت",
      "هايلايت: Video details"
    ],
    faq: [
      {
        question: "هل يمكن طلب تصوير خطوبة في الدمام؟",
        answer:
          "نعم، بكج الخطوبة مصمم لتفاصيل الشبكة والتلبيس والكيك والزفة بأسلوب هادئ وواضح."
      },
      {
        question: "هل الأسعار واضحة قبل التواصل؟",
        answer: "نعم، الباقات تعرض السعر والمدة والنقاط الأساسية، ثم يتم تأكيد التوفر عبر واتساب."
      }
    ]
  },
  {
    slug: "khobar",
    ar: "الخبر",
    en: "Khobar",
    priority: "الموجة 03",
    headline: "تصوير عروس وخطوبة في الخبر بإحساس فاخر وتفاصيل مرتبة",
    metaTitle: "مصورة زواجات في الخبر | Asmaa Studio",
    metaDescription:
      "تصوير فيديو زواج وخطوبة نسائي في الخبر. باقات فاخرة، تفاصيل عروس، First Look، وحجز عبر واتساب.",
    heroLine:
      "الخبر تحتاج عرضا راقيا: تفاصيل، مونتاج، وثقة بصرية تجعل العروس تطلب الحجز لا مجرد السعر.",
    searchIntent: "عروس تبحث عن طابع راق وتفاصيل عالية الجودة للخطوبة أو الزواج.",
    audience: "عروس تهتم بالفخامة والهدوء، أو أخت تبحث عن مصورة نسائية موثوقة.",
    localPromise: "تفاصيل العروس والكوشة والزفة في مسار بصري مرتب ومناسب للذكريات الخاصة.",
    cityProof: "تقديم المدينة بنبرة فاخرة مع باقات تبرز التفاصيل لا عدد الساعات فقط.",
    neighborhoodSignals: ["العليا", "الراكة", "الكورنيش", "الثقبة", "الجسر", "اليرموك"],
    keywordCluster: [
      "مصورة الخبر",
      "تصوير زواجات الخبر",
      "تصوير خطوبة الخبر",
      "مصورة عرايس الخبر",
      "تصوير فيديو زواج الخبر"
    ],
    contentWave: [
      "ريل: كادر المسكة والمجوهرات",
      "ستوري: اختيار بكج الخبر",
      "كاروسيل: لماذا Full Day مناسب للخبر",
      "هايلايت: Bride details"
    ],
    faq: [
      {
        question: "ما البكج المناسب لزواج في الخبر؟",
        answer:
          "إذا كانت التفاصيل كثيرة فالاختيار الأقوى هو Full Day لأنه يغطي الصالون والقاعة والزفة والتفاصيل."
      },
      {
        question: "هل يوجد تصوير لتفاصيل العروس فقط؟",
        answer:
          "نعم، الباقات المتوسطة والعالية تركز على المجوهرات والمسكة والكعب والعطر ولقطات First Look."
      }
    ]
  }
];

export const boardScore = [
  { value: "01", label: "الخصوصية", detail: "رسالة واضحة للعروس والعائلة" },
  { value: "02", label: "القصة", detail: "بداية، تفاصيل، لحظة، ثم مونتاج" },
  { value: "03", label: "الوضوح", detail: "باقات وسعر ومدة قبل أول رسالة" },
  { value: "04", label: "الحجز", detail: "رابط عروس وواتساب مباشر" }
];

export const packages = [
  {
    id: "01",
    name: "بكج الزفة",
    price: "600",
    duration: "20 دقيقة",
    summary: "فيديو زفة فقط مع الإضاءة الفورية على العروس وقت الزفة ومونتاج احترافي.",
    bestFor: "مناسبة قصيرة تريد توثيق لحظة الدخول فقط.",
    deliverable: "فيلم زفة مختصر",
    sequence: ["حضور قبل الزفة", "تجهيز الإضاءة", "تصوير الزفة", "مونتاج سريع"],
    bullets: ["الحضور قبل الزفة بربع ساعة", "تصوير سينمائي بأحدث المعدات", "مناسب للحجز السريع"]
  },
  {
    id: "02",
    name: "بكج الزفة المطور",
    price: "900",
    duration: "ساعة",
    summary: "تصوير الزفة مع تفاصيل الكوشة والكيك ولقطات القاعة الأساسية قبل اللحظة.",
    bestFor: "عروس تريد زفة وتفاصيل قاعة بدون تغطية يوم كامل.",
    deliverable: "فيلم زفة وتفاصيل",
    sequence: ["لقطات القاعة", "الكوشة والكيك", "الزفة", "مونتاج منسق"],
    bullets: ["تفاصيل القاعة والكوشة", "لقطات قريبة للكعكة والديكور", "تغطية عملية وواضحة"]
  },
  {
    id: "03",
    name: "Royal Event",
    price: "1700",
    duration: "3 ساعات",
    summary: "First Look وتفاصيل العروس والكوشة وكواليس الفوتو وزفة واحدة.",
    bestFor: "أفضل توازن بين السعر والقصة والتفاصيل.",
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
    summary: "تغطية من الصالون إلى القاعة مع First Look وتفاصيل العروس والكوشة وزفتين.",
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
    summary: "تفاصيل العروس والكوشة والشبكة والتلبيس والكيك والزفة مع مونتاج احترافي.",
    bestFor: "خطوبة أو ملكة تحتاج ترتيب التفاصيل واللحظات العائلية.",
    deliverable: "فيلم خطوبة",
    sequence: ["الشبكة", "التلبيس", "الكيك", "الزفة"],
    bullets: ["مصمم للخطوبة والملكة", "تغطية لحظات التلبيس والشبكة", "أسلوب راق وهادئ"]
  }
];

export const services: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Video,
    title: "فيديو سينمائي",
    text: "تغطية نسائية تحافظ على خصوصية المناسبة وتوثق المشاعر والتفاصيل دون إزعاج."
  },
  {
    icon: Camera,
    title: "تفاصيل العروس",
    text: "لقطات للمجوهرات، المسكة، الكعب، العطر، الكوشة، واللحظات الصغيرة التي تصنع الفيلم."
  },
  {
    icon: ShieldCheck,
    title: "خصوصية العائلة",
    text: "لغة الموقع والحجز تركز على راحة العروس والنساء، مع تقليل الأسئلة المتكررة."
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
  { icon: HeartHandshake, title: "مشاعر العائلة", text: "لقطات ناعمة بلا إزعاج للعروس أو الضيوف." },
  { icon: Film, title: "إيقاع الفيلم", text: "ترتيب اللقطات من التحضير إلى النهاية حتى لا يبدو الفيديو مجمعا عشوائيا." }
];

export const bookingSteps = [
  { number: "1", title: "رابط العروس", detail: "بدل ملف PDF طويل، تملأ العروس المدينة والتاريخ والبكج." },
  { number: "2", title: "فرز ذكي", detail: "الطلب يصل بصيغة مرتبة تجعل المتابعة سهلة على صاحبة العمل." },
  { number: "3", title: "واتساب", detail: "رسالة جاهزة بمصدر واضح للحجز أو الباقة أو المدينة." },
  { number: "4", title: "تأكيد", detail: "تأكيد التاريخ والبكج ثم العربون حسب وثيقة العمل." }
];

export const conversionFlow = [
  { label: "اكتشاف", detail: "انستقرام، تيك توك، بحث Google", metric: "نية عالية" },
  { label: "ثقة", detail: "خصوصية، باقات، مدن، أسئلة", metric: "تقليل تردد" },
  { label: "اختيار", detail: "مقارنة البكجات حسب لحظات اليوم", metric: "قرار أسرع" },
  { label: "حجز", detail: "رابط عروس + واتساب بمصدر", metric: "متابعة أسهل" }
];

export const seoFocus = [
  "مصورة زواجات في الأحساء",
  "تصوير فيديو زواج نسائي الدمام",
  "مصورة عرايس الخبر",
  "تصوير خطوبة نسائي الشرقية",
  "باقات تصوير فيديو زواج"
];

export const areaStrategy: { icon: LucideIcon; city: string; angle: string; detail: string }[] =
  serviceAreas.map((area, index) => ({
    icon: [MapPinned, Sparkles, ShieldCheck][index] ?? MapPinned,
    city: area.ar,
    angle: area.priority,
    detail: area.localPromise
  }));

export const highlights = [
  { label: "Album", file: "album.svg", text: "ألبوم مختصر لأفضل اللقطات" },
  { label: "Feedback", file: "feedback.svg", text: "آراء العميلات بدون اقتباسات مزيفة" },
  { label: "Packages", file: "packages.svg", text: "اختيار البكج حسب لحظات اليوم" },
  { label: "Bride details", file: "bride-details.svg", text: "تفاصيل العروس والإكسسوارات" },
  { label: "Video details", file: "video-details.svg", text: "أسلوب الفيديو والمونتاج" },
  { label: "First Look", file: "first-look.svg", text: "لحظة الظهور الأولى" },
  { label: "Booking", file: "booking-policy.svg", text: "طريقة الحجز والوضوح" },
  { label: "BTS", file: "bts.svg", text: "كواليس العمل بدون كشف خصوصية" },
  { label: "Editing", file: "editing.svg", text: "المونتاج وتسليم الفيلم" },
  { label: "Life style", file: "lifestyle.svg", text: "لقطات ناعمة للحياة والتفاصيل" },
  { label: "Coffee&food", file: "coffee-food.svg", text: "ضيافة وتفاصيل طاولة" },
  { label: "Snapchat", file: "snapchat.svg", text: "مقاطع قصيرة وسريعة" }
];

export const seoLaunchWaves: { day: string; title: string; channel: string; goal: string; ownerCue: string }[] = [
  { day: "01", title: "صفحة الأحساء + ريل الزفة", channel: "Website + Instagram", goal: "امتلاك نية الأحساء", ownerCue: "رابط /alahsa في البايو والستوري" },
  { day: "02", title: "كاروسيل اختيار البكج", channel: "Instagram", goal: "تحويل السعر إلى قرار", ownerCue: "استخدام لقطة تفاصيل عروس" },
  { day: "03", title: "صفحة الدمام + ستوري أسئلة", channel: "Website + Stories", goal: "التوسع بدون إعلان", ownerCue: "تصويت: زفة فقط أم Full Day" },
  { day: "04", title: "هايلايت Packages الجديد", channel: "Instagram Highlights", goal: "تقليل طلب PDF", ownerCue: "رفع غلاف Packages" },
  { day: "05", title: "صفحة الخبر + First Look", channel: "Website + TikTok", goal: "طلب راق عالي القيمة", ownerCue: "ريل 7 ثواني قبل/بعد" },
  { day: "06", title: "FAQ: الخصوصية النسائية", channel: "Website + WhatsApp", goal: "إزالة خوف العميلة", ownerCue: "إجابة مختصرة في الحالة" },
  { day: "07", title: "مقارنة Royal Event وFull Day", channel: "Instagram Carousel", goal: "رفع متوسط البكج", ownerCue: "CTA: اكتبي Royal" },
  { day: "08", title: "محتوى تفاصيل العروس", channel: "TikTok + Reels", goal: "جذب العروس نفسها", ownerCue: "لقطات مجوهرات ومسكة" },
  { day: "09", title: "Google Business Profile منشور", channel: "Google", goal: "إشارة محلية", ownerCue: "نشر خدمة تصوير زواجات" },
  { day: "10", title: "هايلايت Bride Details", channel: "Instagram Highlights", goal: "إثبات الذوق", ownerCue: "تحديث الغلاف والمقاطع" },
  { day: "11", title: "ريل الدمام: القاعة والكوشة", channel: "Instagram", goal: "بحث الدمام", ownerCue: "هاشتاقات الدمام فقط" },
  { day: "12", title: "ستوري رابط العروس", channel: "Stories + WhatsApp", goal: "تحويل PDF إلى رابط", ownerCue: "ضع رابط /reserve" },
  { day: "13", title: "ريل الخبر: تفاصيل فاخرة", channel: "TikTok", goal: "طلب Premium", ownerCue: "نص قصير: للخبر والشرقية" },
  { day: "14", title: "صفحة أسئلة حجز مصغرة", channel: "Website", goal: "تقليل رسائل متكررة", ownerCue: "إجابة وقت الحضور والعربون" },
  { day: "15", title: "Album refresh", channel: "Highlights", goal: "إظهار جودة حديثة", ownerCue: "أفضل 8 لقطات فقط" },
  { day: "16", title: "كاروسيل الزفة فقط", channel: "Instagram", goal: "حجز الميزانية الصغيرة", ownerCue: "شرح بكج 600" },
  { day: "17", title: "ريل الخطوبة", channel: "TikTok + Reels", goal: "التقاط الملكة والخطوبة", ownerCue: "ذكر بكج الخطوبة" },
  { day: "18", title: "منشور Google ثان", channel: "Google", goal: "استمرارية محلية", ownerCue: "أضف صورة عامة غير خاصة" },
  { day: "19", title: "Feedback بدون اقتباس مزيف", channel: "Highlights", goal: "ثقة نظيفة", ownerCue: "لقطة شاشة بعد موافقة العميلة" },
  { day: "20", title: "تقرير مصادر الحجز", channel: "Admin + WhatsApp", goal: "قياس ما يحجز فعلا", ownerCue: "تسجيل مصدر كل محادثة" }
];

export const trustSignals: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: ShieldCheck, title: "خصوصية قبل الجمال", detail: "لا نستخدم وعودا مزيفة أو صورا تكشف عميلات بدون إذن." },
  { icon: BadgeCheck, title: "باقات مفهومة", detail: "السعر والمدة واللقطات الأساسية ظاهرة قبل المحادثة." },
  { icon: CalendarCheck, title: "حجز منظم", detail: "كل طلب يأتي بتاريخ ومدينة وبكج لتقليل ضياع الرسائل." },
  { icon: Search, title: "SEO يومي", detail: "20 موجة محتوى محلية تبدأ من الأحساء ثم الدمام والخبر." }
];

export const liveOperatingSystem = [
  { icon: MonitorSmartphone, label: "Bride link", text: "الرابط يلتقط التفاصيل بدل إرسال PDF." },
  { icon: Workflow, label: "Admin view", text: "صاحبة العمل تراجع الطلبات القادمة بسهولة." },
  { icon: Camera, label: "Social loop", text: "كل هايلايت يربط إلى باقة أو رابط حجز." },
  { icon: Zap, label: "Daily wave", text: "موجة SEO ومحتوى يومية قابلة للتنفيذ." },
  { icon: CheckCircle2, label: "Measure", text: "مصدر واتساب يوضح ما يحول فعلا." },
  { icon: Clock, label: "Fast reply", text: "العميلة تصل بسياق جاهز للمتابعة." }
];

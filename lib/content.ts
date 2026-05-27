import {
  Camera,
  Clapperboard,
  Gem,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Video
} from "lucide-react";

export const whatsappNumber = "966551606334";
export const instagramUrl = "https://www.instagram.com/asmaa.video/";
export const tiktokUrl = "https://www.tiktok.com/@asmaa.video";

export const whatsappLink = (source = "website") =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `السلام عليكم، أريد معرفة توفر وباقات Asmaa Studio لتصوير مناسبة. المصدر: ${source}`
  )}`;

export const serviceAreas = [
  { slug: "alahsa", ar: "الأحساء", en: "Al Ahsa" },
  { slug: "dammam", ar: "الدمام", en: "Dammam" },
  { slug: "khobar", ar: "الخبر", en: "Khobar" }
];

export const packages = [
  {
    id: "01",
    name: "بكج الزفة",
    price: "600",
    duration: "20 دقيقة",
    summary: "فيديو زفة فقط مع الإضاءة الفورية على العروس وقت الزفة ومونتاج احترافي.",
    bullets: ["الحضور قبل الزفة بربع ساعة", "تصوير سينمائي بأحدث المعدات", "مناسب للتوثيق السريع والراقي"]
  },
  {
    id: "02",
    name: "زفة + كواليس الفوتو",
    price: "1200",
    duration: "ساعتان",
    summary: "فيديو الزفة مع كواليس جلسة تصوير الفوتو ومونتاج احترافي.",
    bullets: ["يبدأ بعد جلسة تصوير الفوتو", "لقطات تجهيز وتفاصيل ناعمة", "اختيار عملي للحفلات المختصرة"]
  },
  {
    id: "03",
    name: "Half Day",
    price: "1700",
    duration: "3 ساعات",
    summary: "First Look وتفاصيل العروس والكوشة وكواليس الفوتو وزفة واحدة.",
    bullets: ["تفاصيل المجوهرات والمسكة والكعب والعطر", "لقطات مشاعر عفوية", "البكج الأنسب لتغطية متوازنة"]
  },
  {
    id: "04",
    name: "Full Day",
    price: "2500",
    duration: "6 ساعات",
    summary: "تغطية من الصالون إلى القاعة مع First Look وتفاصيل العروس والكوشة وزفتين.",
    bullets: ["تفاصيل المكياج والشعر", "تفاصيل القاعة والكوشة", "مونتاج احترافي شامل"],
    featured: true
  },
  {
    id: "05",
    name: "بكج الخطوبة",
    price: "1500",
    duration: "ساعتان ونصف",
    summary: "تفاصيل العروس والكوشة والشبكة والتلبيس والكيك والزفة مع مونتاج احترافي.",
    bullets: ["مصمم للخطوبة والملكة", "تغطية لحظات التلبيس والشبكة", "أسلوب راق وهادئ"]
  }
];

export const services = [
  {
    icon: Video,
    title: "فيديو سينمائي",
    text: "تغطية نسائية تحافظ على خصوصية المناسبة وتوثق المشاعر والتفاصيل دون إزعاج."
  },
  {
    icon: Camera,
    title: "تفاصيل العروس",
    text: "لقطات للمجوهرات، المسكة، الكعب، العطر، الفستان، الكوشة، والقاعة."
  },
  {
    icon: Sparkles,
    title: "First Look",
    text: "مشهد عفوي عند رؤية العريس للعروس لأول مرة، بتوثيق دافئ وغير مصطنع."
  },
  {
    icon: Clapperboard,
    title: "مونتاج احترافي",
    text: "قصة قصيرة وواضحة للمناسبة، مناسبة للمشاركة العائلية والاحتفاظ بالذكرى."
  }
];

export const process = [
  {
    icon: MessageCircle,
    title: "استفسار واتساب",
    text: "تصل العروس أو أختها أو قريبتها للواتساب، ويتم إرسال الباقات وتاريخ المناسبة."
  },
  {
    icon: Gem,
    title: "اختيار البكج",
    text: "نرشح الباقة حسب نوع المناسبة، مدة التغطية، وأهمية التفاصيل والـ First Look."
  },
  {
    icon: HeartHandshake,
    title: "تأكيد الحجز",
    text: "يثبت الموعد بعد العربون، وتصل التذكيرات والنقاط المهمة قبل يوم التصوير."
  }
];

export const highlights = [
  { label: "Album", file: "album.svg", text: "ألبوم مختصر لأفضل اللقطات" },
  { label: "Feedback", file: "feedback.svg", text: "آراء العميلات بدون اقتباسات مزيفة" },
  { label: "Bride details", file: "bride-details.svg", text: "تفاصيل العروس والإكسسوارات" },
  { label: "Video details", file: "video-details.svg", text: "كيف يظهر الفيديو والمونتاج" },
  { label: "Photo shoot", file: "photo-shoot.svg", text: "كواليس جلسة التصوير" },
  { label: "Booking", file: "booking-policy.svg", text: "وثيقة العمل والحجز" }
];

export const seoFocus = [
  "مصورة زواجات في الأحساء",
  "تصوير فيديو زواج نسائي الأحساء",
  "مصورة عرايس الدمام",
  "تصوير خطوبة الخبر",
  "تصوير زفة نسائي الشرقية",
  "باقات تصوير فيديو زواج"
];

export const bookingRules = [
  "يتم اختيار رقم البكج ثم إرسال تاريخ وموقع المناسبة عبر واتساب.",
  "يتم تأكيد الحجز بعربون يحسب من قيمة الفاتورة.",
  "الحجز يبقى مبدئيا لمدة يومين فقط قبل إلغائه عند عدم التحويل.",
  "الساعة الإضافية بسعر 200 ريال حسب توفر المصورة في يوم المناسبة.",
  "يسلم المبلغ المتبقي في يوم المناسبة قبل بداية التصوير."
];

export const extraItems = [
  { name: "تلوين سينمائي للفيديو + تنعيم البشرة", price: "350 ريال" },
  { name: "منيكان لتصوير فستان العروس", price: "150 ريال" }
];

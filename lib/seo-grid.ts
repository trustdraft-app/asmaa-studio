// Mega-SEO programmatic grid — 12 cities × 8 services × 10 modifiers
// = 1,056 combinatoric pages, zero LLM calls per page.
// Each page renders via app/ar/[city]/[service]/[modifier]/page.tsx
// with title/meta/h1/intro all token-substituted from this data + the
// rotating phrase bank below for uniqueness.

export type SeoCity = {
  slug: string;
  ar: string;
  en: string;
  governorate: "alahsa" | "easternProvince";
  populationHint: string;
  neighborhoodSignals: string[];
  postalArea: string;
};

export type SeoService = {
  slug: string;
  ar: string;
  en: string;
  packageId: string | null;
  price: number;
  durationAr: string;
  shortDescAr: string;
  highlightAr: string;
};

export type SeoModifier = {
  slug: string;
  ar: string;
  en: string;
  intent: "price" | "package" | "trust" | "year" | "exclusivity" | "offer" | "quality" | "geographic" | "comparison" | "guarantee";
};

export const seoCities: SeoCity[] = [
  { slug: "alahsa", ar: "الأحساء", en: "Al Ahsa", governorate: "alahsa", populationHint: "أكبر محافظات الشرقية", neighborhoodSignals: ["الهفوف", "المبرز", "العيون", "العمران", "الطرف"], postalArea: "31982" },
  { slug: "hofuf", ar: "الهفوف", en: "Hofuf", governorate: "alahsa", populationHint: "مركز محافظة الأحساء", neighborhoodSignals: ["الرقيقة", "السلمانية", "الواحة", "النعاثل", "الحزم"], postalArea: "36441" },
  { slug: "mubarraz", ar: "المبرز", en: "Al Mubarraz", governorate: "alahsa", populationHint: "ثاني أكبر مدن الأحساء", neighborhoodSignals: ["العزيزية", "المنار", "البطالية", "اللويمي", "الكوت"], postalArea: "36422" },
  { slug: "alomran", ar: "العمران", en: "Al Omran", governorate: "alahsa", populationHint: "من قرى الأحساء النابضة", neighborhoodSignals: ["العمران", "الجشة", "أبو ثور", "الفضول", "العيون"], postalArea: "36432" },
  { slug: "altarafiyya", ar: "الطرفية", en: "Al Tarafiyya", governorate: "alahsa", populationHint: "من قرى الأحساء", neighborhoodSignals: ["الطرفية", "الكلابية", "الشهارين", "الجفر", "الحليلة"], postalArea: "36412" },
  { slug: "dammam", ar: "الدمام", en: "Dammam", governorate: "easternProvince", populationHint: "عاصمة المنطقة الشرقية", neighborhoodSignals: ["الفيصلية", "النور", "الريان", "المزروعية", "الزهور"], postalArea: "31952" },
  { slug: "khobar", ar: "الخبر", en: "Khobar", governorate: "easternProvince", populationHint: "ساحل الخليج العربي", neighborhoodSignals: ["العليا", "الراكة", "الكورنيش", "الثقبة", "اليرموك"], postalArea: "34621" },
  { slug: "qatif", ar: "القطيف", en: "Qatif", governorate: "easternProvince", populationHint: "مدينة ساحلية تراثية", neighborhoodSignals: ["العوامية", "صفوى", "تاروت", "سيهات", "أم الحمام"], postalArea: "32654" },
  { slug: "jubail", ar: "الجبيل", en: "Jubail", governorate: "easternProvince", populationHint: "المدينة الصناعية الكبرى", neighborhoodSignals: ["الجبيل البلد", "الجبيل الصناعية", "الفيحاء", "الفناتير", "اللؤلؤ"], postalArea: "35513" },
  { slug: "saihat", ar: "سيهات", en: "Saihat", governorate: "easternProvince", populationHint: "مدينة بين القطيف والدمام", neighborhoodSignals: ["سيهات وسط", "حي البحري", "حي الأمل", "حي العمال", "حي السلام"], postalArea: "31972" },
  { slug: "tarout", ar: "تاروت", en: "Tarout", governorate: "easternProvince", populationHint: "جزيرة تراثية في القطيف", neighborhoodSignals: ["تاروت وسط", "الرفيعة", "دارين", "الزور", "سنابس"], postalArea: "32636" },
  { slug: "buqayq", ar: "بقيق", en: "Buqayq", governorate: "easternProvince", populationHint: "مدينة جنوب الدمام", neighborhoodSignals: ["بقيق وسط", "حي العاملين", "حي المنتزه", "حي الشروق", "الواحة"], postalArea: "31931" },
  { slug: "battaliyah", ar: "البطالية", en: "Al Battaliyah", governorate: "alahsa", populationHint: "من قرى محافظة الأحساء", neighborhoodSignals: ["البطالية وسط", "حي الجامعة", "حي السلام", "حي النهضة", "حي الفيصلية"], postalArea: "36422" },
  { slug: "mutairfi", ar: "المطيرفي", en: "Al Mutairfi", governorate: "alahsa", populationHint: "قرية في شمال الأحساء", neighborhoodSignals: ["المطيرفي", "العلامية", "حي الفيحاء", "حي الورود", "حي النخيل"], postalArea: "36432" },
  { slug: "markaz", ar: "المركز", en: "Al Markaz", governorate: "alahsa", populationHint: "وسط محافظة الأحساء", neighborhoodSignals: ["المركز", "حي الأمير محمد", "حي الندى", "حي الراشدية", "حي الواحة"], postalArea: "36441" },
  { slug: "salasil", ar: "السلاسل", en: "Al Salasil", governorate: "alahsa", populationHint: "من قرى الأحساء التاريخية", neighborhoodSignals: ["السلاسل", "الفضول", "العقير المسار", "حي الإسكان", "حي الزهور"], postalArea: "36412" },
  { slug: "hala", ar: "الهلا", en: "Al Hala", governorate: "alahsa", populationHint: "قرية من قرى الأحساء", neighborhoodSignals: ["الهلا", "حي الواحة الشرقية", "حي السلام", "حي الأمل", "حي النور"], postalArea: "36432" },
  { slug: "qara", ar: "القارة", en: "Al Qara", governorate: "alahsa", populationHint: "جبل القارة التراثي", neighborhoodSignals: ["القارة", "حي الجبل", "حي العين", "حي الفيصلية", "حي الواحة"], postalArea: "36442" },
  { slug: "jaaberiyah", ar: "الجعبيرية", en: "Al Jaaberiyah", governorate: "alahsa", populationHint: "من قرى الأحساء", neighborhoodSignals: ["الجعبيرية", "حي الحزم", "حي المروج", "حي الفجر", "حي الواحة"], postalArea: "36412" },
  { slug: "aiouni", ar: "العيوني", en: "Al Aiouni", governorate: "alahsa", populationHint: "قرية في محافظة الأحساء", neighborhoodSignals: ["العيوني", "حي السلام", "حي الواحة", "حي الفيصلية", "حي النخيل"], postalArea: "36422" }
];

export const seoServices: SeoService[] = [
  { slug: "zaffa-tasweer", ar: "تصوير الزفة", en: "Zaffa Videography", packageId: "01", price: 600, durationAr: "٢٠ دقيقة", shortDescAr: "تصوير لحظة دخول العروس بإضاءة سينمائية احترافية.", highlightAr: "حضور قبل الزفة بربع ساعة" },
  { slug: "zaffa-plus-tasweer", ar: "تصوير الزفة المطور", en: "Zaffa Plus Videography", packageId: "02", price: 1200, durationAr: "ساعة كاملة", shortDescAr: "زفة كاملة مع تفاصيل الكوشة والكيك والديكور.", highlightAr: "تفاصيل القاعة قبل دخول الضيوف" },
  { slug: "half-day-tasweer", ar: "تصوير نصف يوم الزفاف", en: "Half Day Wedding", packageId: "03", price: 1700, durationAr: "٣ ساعات", shortDescAr: "First Look وتفاصيل العروس والكوشة وزفة واحدة.", highlightAr: "الأكثر طلباً بين الباقات" },
  { slug: "full-day-tasweer", ar: "تصوير يوم الزفاف الكامل", en: "Full Day Wedding", packageId: "04", price: 2500, durationAr: "٦ ساعات", shortDescAr: "تغطية كاملة من الصالون إلى القاعة مع زفتين.", highlightAr: "أعلى قيمة بصرية في الباقات" },
  { slug: "khotuba-tasweer", ar: "تصوير الخطوبة والملكة", en: "Engagement & Milkah", packageId: "05", price: 1500, durationAr: "ساعتان ونصف", shortDescAr: "الشبكة والتلبيس والكيك والزفة في فيلم خطوبة مرتب.", highlightAr: "مصمم خصيصاً للخطوبة" },
  { slug: "henna-tasweer", ar: "تصوير ليلة الحناء", en: "Henna Night", packageId: "05", price: 1500, durationAr: "حسب الباقة", shortDescAr: "تفاصيل رسومات الحناء والكوشة التراثية والزفة الشعبية.", highlightAr: "يحترم تقاليد المناسبة" },
  { slug: "bride-session", ar: "جلسة عروس", en: "Bridal Session", packageId: "03", price: 1700, durationAr: "٣ ساعات", shortDescAr: "جلسة تصوير مخصصة للعروس بإضاءة استوديو احترافية.", highlightAr: "إعداد فستاني وتلبيس متكامل" },
  { slug: "ladies-event", ar: "تصوير المناسبات النسائية", en: "Ladies Event", packageId: null, price: 600, durationAr: "حسب نوع المناسبة", shortDescAr: "تغطية أعراس وخطوبات وحفلات تخرج وملكات بفريق نسائي.", highlightAr: "فريق نسائي بالكامل" }
];

export const seoModifiers: SeoModifier[] = [
  { slug: "asaar", ar: "أسعار", en: "Prices", intent: "price" },
  { slug: "baqat", ar: "باقات", en: "Packages", intent: "package" },
  { slug: "musawira", ar: "مصورة", en: "Female Videographer", intent: "trust" },
  { slug: "2026", ar: "٢٠٢٦", en: "2026", intent: "year" },
  { slug: "bidoun-rijal", ar: "بدون رجال", en: "Women-only set", intent: "exclusivity" },
  { slug: "ehtirafi", ar: "احترافي", en: "Professional", intent: "quality" },
  { slug: "afdal", ar: "أفضل", en: "Best", intent: "comparison" },
  { slug: "moqareeb", ar: "قريبة منك", en: "Nearby", intent: "geographic" },
  { slug: "jodah-aliah", ar: "جودة عالية", en: "High Quality", intent: "quality" },
  { slug: "tarkhees-rasmi", ar: "ترخيص رسمي", en: "Officially Licensed", intent: "guarantee" },
  { slug: "ajl", ar: "حجز عاجل", en: "Urgent Booking", intent: "offer" },
  { slug: "baqat-shamela", ar: "باقة شاملة", en: "Full Package", intent: "package" },
  { slug: "khosomat", ar: "خصومات", en: "Discounts", intent: "offer" },
  { slug: "istisharat-majaniyah", ar: "استشارة مجانية", en: "Free Consult", intent: "offer" }
];

// Phrase bank — rotated per page combination via hash(city+service+modifier) % bank.length
// Each entry yields a unique opening sentence; bank size × city/service/modifier combinations
// gives enough variety to avoid "thin doorway page" pattern.
export const seoIntroBank: string[] = [
  "تختار العروس في {city} {service} عندما تريد ذكرى تليق بيومها — Asmaa Studio تقدمها بأسلوب هادئ وسعر شفاف.",
  "إذا كنت تبحثين عن {service} في {city}، فالقرار يبدأ من فهم الباقة قبل السعر. Asmaa Studio تشرح ماذا ستصور قبل أي حساب.",
  "في {city}، الفرق بين فيلم زفاف عادي وفيلم لا يُنسى هو الهدوء والتخطيط. Asmaa Studio تقدم {service} بمقاربة منظمة من البداية إلى النهاية.",
  "خدمة {service} في {city} من Asmaa Studio مبنية على ثلاث ركائز: فريق نسائي مرخص، أسلوب سينمائي، وسعر معلن مسبقاً.",
  "كل عروس في {city} تستحق فيلماً يعكس جمال يومها. Asmaa Studio تقدم {service} بإحساس عالٍ وتفاصيل لا تفوّت لحظة.",
  "ابدئي رحلة {service} في {city} من رابط واحد: اختاري الباقة، حددي التاريخ، وتابعي على واتساب بدون حقول إلزامية.",
  "Asmaa Studio أصبحت الخيار الأول لعروس {city} الباحثة عن {service} يحفظ ذوق المناسبة وتفاصيل العروس معاً.",
  "في موسم الزواجات بـ{city}، يكون حجز {service} مبكراً ضرورة. Asmaa Studio تفتح التقويم قبل ستة أشهر من المناسبة.",
  "اختياركِ لـ{service} في {city} يحدد شكل الذكرى. Asmaa Studio تقدم الباقة المناسبة لقاعتك ومدة مناسبتك بدقة.",
  "Asmaa Studio تغطي {city} بنفس مستوى التغطية في الأحساء — لأن جودة الفيلم لا تتبع المدينة، بل تتبع الفريق."
];

export const seoModifierPhraseBank: Record<string, string[]> = {
  price: [
    "السعر مُعلن مسبقاً ولا يتغير بعد التحويل. تحديثات ٢٠٢٦ مثبتة على الموقع.",
    "كل باقة لها سعر ثابت معلن، والإضافات بأسعار ثابتة لا تتغير حسب القاعة.",
    "الشفافية أساس عمل Asmaa Studio: السعر والمدة واللقطات تظهر قبل أول رسالة."
  ],
  package: [
    "الباقات مرتبة حسب لحظات يومك، لا حسب السعر فقط. اختاري الأنسب لشكل مناسبتك.",
    "خمس باقات تغطي من الزفة المختصرة إلى اليوم الكامل، مع باقة خطوبة مستقلة.",
    "كل باقة تشرح ماذا ستصور، كم ستستغرق، وما النتيجة المتوقعة في الفيلم النهائي."
  ],
  trust: [
    "Asmaa Studio فريق نسائي بالكامل مرخص من وزارة الموارد البشرية والتنمية الاجتماعية.",
    "الترخيص الرسمي شرط أساسي للعمل المنظم — احفظي صورة من ترخيصنا في أي تواصل.",
    "العمل النسائي يعني فريقاً نسائياً كاملاً يوم المناسبة — بلا استثناءات."
  ],
  year: [
    "أسعار وباقات ٢٠٢٦ المحدثة مع الإضافات الجديدة (المون لايت مشمول، التلوين السينمائي ٣٥٠ ريال).",
    "تحديث ٢٠٢٦: باقة بكج الزفة المطور بـ١٢٠٠ ريال، Half Day بـ١٧٠٠ ريال.",
    "للموسم القادم في ٢٠٢٦، Asmaa Studio أضافت إضاءة المون لايت ضمن بكج الزفة الأساسي."
  ],
  exclusivity: [
    "الفريق نسائي بالكامل — لا يحضر رجال إلى موقع التصوير في المناسبات النسائية.",
    "بيانات المناسبة محفوظة بأمان: تصوير نسائي، إذن نشر مكتوب، حفظ مغلق للمواد.",
    "تصوير للمناسبات النسائية فقط، بفريق نسائي مرخص يحترم ذوق العائلة ومساحتها."
  ],
  quality: [
    "تصوير سينمائي بأحدث المعدات: كاميرات وعدسات وإضاءة احترافية لكل تفصيلة.",
    "جودة الفيلم تأتي من ثلاثة عوامل: المعدات، الإضاءة، والمونتاج. Asmaa Studio تستثمر في الثلاثة.",
    "مستوى الجودة موحد بين كل المدن — جودة الأحساء هي نفسها جودة الدمام والخبر."
  ],
  comparison: [
    "كيف تفرّقين بين الجيد والممتاز؟ الأسلوب، التسليم، والوضوح في الحجز قبل التحويل.",
    "افتحي الألبوم أولاً، اقرئي الباقة ثانياً، ثم قارني الأسعار. هذا الترتيب يحمي القرار.",
    "أفضل مصورة فيديو هي التي تشرح الباقة بوضوح قبل التواصل، لا التي تعد بكل شيء."
  ],
  geographic: [
    "تغطية قريبة من قاعتك في كل أحياء المدينة — مع تنسيق وقت الوصول حسب الموقع.",
    "نعرف القاعات الرئيسية والأحياء المحلية، ونرتب الوصول قبل الزفة بوقت كافٍ.",
    "تغطية محلية متمرسة — لكل حي في المدينة ترتيب وصول خاص حسب الكثافة المرورية."
  ],
  guarantee: [
    "الترخيص الرسمي من وزارة الموارد البشرية يحمي حقكِ كصاحبة الفيلم.",
    "اتفاق مكتوب، إيصال بنكي، ترخيص رسمي — ثلاث ضمانات قبل أي تحويل.",
    "Asmaa Studio تقدم اتفاقاً مفصلاً يضمن الباقة، التاريخ، طريقة الدفع، ومدة التسليم."
  ],
  offer: [
    "للحجوزات العاجلة قبل أقل من ٣٠ يوماً — تواصل مباشر على واتساب لتأكيد التوفر الفوري.",
    "العروض الموسمية مرتبطة بفصول السنة وتاريخ المناسبة. اسألي عن باقة شاملة تجمع الزفة والخطوبة بسعر مدمج.",
    "خصومات للباقات المركبة (مثل خطوبة + زفاف من نفس العروس) — احسبيها مع حاسبة الباقات على /packages.",
    "استشارة مجانية قبل الحجز عبر واتساب — نشرح لكِ الباقة الأنسب لقاعتك دون أي التزام."
  ]
};

// Seasonal months for the seasonal route family
export const seoSeasonalMonths = [
  { slug: "january", ar: "يناير", en: "January", note: "شتاء معتدل، إضاءة دافئة، موسم مرغوب" },
  { slug: "february", ar: "فبراير", en: "February", note: "نهاية الشتاء، طقس مثالي للقطات خارجية" },
  { slug: "march", ar: "مارس", en: "March", note: "ربيع الشرقية، أكثر شهر طلباً للزواجات" },
  { slug: "april", ar: "أبريل", en: "April", note: "موسم الورد والربيع المتأخر" },
  { slug: "may", ar: "مايو", en: "May", note: "بداية الصيف، تصوير داخلي مرغوب" },
  { slug: "june", ar: "يونيو", en: "June", note: "صيف الشرقية، قاعات مكيّفة فقط" },
  { slug: "july", ar: "يوليو", en: "July", note: "قمة الصيف، تصوير ليلي مفضل" },
  { slug: "august", ar: "أغسطس", en: "August", note: "آخر شهر صيفي، قاعات مغلقة" },
  { slug: "september", ar: "سبتمبر", en: "September", note: "بداية الخريف، طقس يلطف" },
  { slug: "october", ar: "أكتوبر", en: "October", note: "موسم خريفي مثالي، الحجوزات تشتعل" },
  { slug: "november", ar: "نوفمبر", en: "November", note: "خريف الشرقية، طقس مثالي" },
  { slug: "december", ar: "ديسمبر", en: "December", note: "نهاية السنة، إجازات وحفلات كثيرة" }
];

// Budget tiers for the budget route family
export const seoBudgetTiers = [
  { slug: "under-2k", ar: "أقل من ٢٠٠٠ ريال", en: "Under 2,000 SAR", min: 0, max: 2000, note: "بكج الزفة وبكج الزفة المطور — مناسبة للميزانية المختصرة" },
  { slug: "2k-5k", ar: "٢-٥ آلاف ريال", en: "2k-5k SAR", min: 2000, max: 5000, note: "Half Day، Full Day، وبكج الخطوبة — الأكثر طلباً" },
  { slug: "5k-plus", ar: "أكثر من ٥٠٠٠ ريال", en: "5k+ SAR", min: 5000, max: 999999, note: "حزم كاملة + إضافات (تلوين سينمائي، منيكان، ساعات إضافية)" }
];

// Wedding types for the wedding-types route family
export const seoWeddingTypes = [
  { slug: "zaffa-only", ar: "زفّة فقط", en: "Zaffa Only", note: "تركيز كامل على لحظة الدخول" },
  { slug: "full-event", ar: "حفل كامل", en: "Full Event", note: "تغطية المناسبة من البداية إلى النهاية" },
  { slug: "ceremony-only", ar: "حفل الزواج فقط", en: "Ceremony Only", note: "الإيجاب والقبول ومراسم العقد" },
  { slug: "henna-engagement-wedding", ar: "حناء + خطوبة + زفاف", en: "Henna + Engagement + Wedding", note: "حزمة كاملة لمناسبات متعددة" },
  { slug: "destination", ar: "زواج وجهة", en: "Destination Wedding", note: "تصوير في قاعات بعيدة أو خاصة" }
];

// English modifiers (subset of 8 — for /en/ deep route)
export const seoModifiersEn: SeoModifier[] = seoModifiers.slice(0, 8);

// Hash function for deterministic-but-varied phrase selection per combination
export function pickPhrase(seed: string, bank: string[]): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return bank[Math.abs(hash) % bank.length];
}

// Generate all (city, service) pairs — 12 × 8 = 96
export function allCityServicePairs() {
  const out: { city: SeoCity; service: SeoService }[] = [];
  for (const city of seoCities) {
    for (const service of seoServices) out.push({ city, service });
  }
  return out;
}

// Generate all (city, service, modifier) triples — 20 × 8 × 14 = 2,240
export function allCityServiceModifierTriples() {
  const out: { city: SeoCity; service: SeoService; modifier: SeoModifier }[] = [];
  for (const city of seoCities) {
    for (const service of seoServices) {
      for (const modifier of seoModifiers) out.push({ city, service, modifier });
    }
  }
  return out;
}

// Seasonal pairs — 12 months × 8 services = 96
export function allSeasonalPairs() {
  const out: { month: typeof seoSeasonalMonths[number]; service: SeoService; slug: string }[] = [];
  for (const month of seoSeasonalMonths) {
    for (const service of seoServices) {
      out.push({ month, service, slug: `${month.slug}-${service.slug}` });
    }
  }
  return out;
}

// Budget pairs — 3 tiers × 8 services = 24
export function allBudgetPairs() {
  const out: { tier: typeof seoBudgetTiers[number]; service: SeoService; slug: string }[] = [];
  for (const tier of seoBudgetTiers) {
    for (const service of seoServices) {
      out.push({ tier, service, slug: `${tier.slug}-${service.slug}` });
    }
  }
  return out;
}

// Wedding-type pairs — 5 types × 8 services = 40
export function allWeddingTypePairs() {
  const out: { type: typeof seoWeddingTypes[number]; service: SeoService; slug: string }[] = [];
  for (const type of seoWeddingTypes) {
    for (const service of seoServices) {
      out.push({ type, service, slug: `${type.slug}-${service.slug}` });
    }
  }
  return out;
}

// EN mirrors — 20 cities × 8 services = 160 pair pages, 20 × 8 × 8 = 1,280 triple pages
export function allEnCityServicePairs() {
  const out: { city: SeoCity; service: SeoService }[] = [];
  for (const city of seoCities) {
    for (const service of seoServices) out.push({ city, service });
  }
  return out;
}

export function allEnCityServiceModifierTriples() {
  const out: { city: SeoCity; service: SeoService; modifier: SeoModifier }[] = [];
  for (const city of seoCities) {
    for (const service of seoServices) {
      for (const modifier of seoModifiersEn) out.push({ city, service, modifier });
    }
  }
  return out;
}

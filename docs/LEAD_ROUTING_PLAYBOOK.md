# Lead Routing Playbook — asmaa.video
**Date:** 2026-05-30
**PM:** Asmaa PM
**Audience:** Asmaa (operator) — copy/paste templates for WhatsApp responses to inbound leads.

## How leads arrive
Every WhatsApp message contains a pre-filled source line so you know exactly which CTA the bride tapped. The source is in the **first** line of every message.

### Live source labels (decoded from prod 2026-05-30 11:55 UTC)
| Source label in greeting | CTA on site | Bride's intent signal |
|---|---|---|
| `الصفحة الرئيسية` | hero CTA | exploring, package not yet chosen |
| `الصفحة الرئيسية - الشريط العلوي` | nav-WA pill "احجزي الآن" | committed, wants to book now |
| `زر واتساب السريع` | floating WA bottom-right | scrolled past packages and chose to ask |
| `باقة 01` … `باقة 05` | per-package "اسألي عن التوفر" | knows which package she wants |
| `صفحة الأحساء` / `صفحة الدمام` / `صفحة الخبر` | city-page WA | local intent, ready to talk venue |
| `صفحة الأحساء - باقة 03` (and permutations) | city + package CTA | high intent, just needs date confirmed |
| `صفحة بكج الزفة` | `/zaffa` page | budget bride, zaffa-only ICP |
| `صفحة الزفة - باقة 01` | zaffa-page package CTA | 600 SAR-only intent, lowest budget |
| `صفحة الألبوم` | portfolio bottom WA | style-buying intent, wants social proof |
| `صفحة الأسئلة` | FAQ bottom WA | objections to clear before commit |
| `دليل [slug]` | guide-page WA | educational intent, often returning visitor |
| `دليل [slug] - باقة 0N` | guide + package | very high intent, knows the topic + the package |
| `رابط العروس` | reservation experience nav WA | mid-form rescue (didn't finish the form) |

### SLA
| Window (KSA time) | First response target |
|---|---|
| 09:00 – 21:00 | **< 1 hour** |
| 21:00 – 09:00 | **< 8 hours** (or first 09:00 slot the next day) |

If a lead arrives outside the 09:00–21:00 window, send the "Night-time autoreply" template within 10 minutes (manually or via WA Business away message), then a real reply at 09:00 sharp.

---

## Response templates

All templates assume the bride opened with the auto pre-fill. **Do not re-introduce yourself** — she knows she messaged "Asmaa Studio". Get to the point.

### T1. Exploring — source: `الصفحة الرئيسية` or `زر واتساب السريع`
**AR (default)**
```
وعليكم السلام ورحمة الله 🤍
شكرا لتواصلك مع Asmaa Studio.
عشان نختار البكج المناسب لك، تكفين خبريني:
١) تاريخ المناسبة (أو الشهر المتوقع)
٢) المدينة والقاعة إن تحددت
٣) المناسبة: زواج، خطوبة، أو ملكة
٤) أي لحظات تهمك بالذات (مثلا: زفة فقط، First Look، تفاصيل العروس)

دليل الباقات الكامل بصيغة PDF موجود هنا:
https://asmaa.video/packages-asmaa-studio.pdf
```

**EN (for bilingual / GCC expat)**
```
Wa-alaykum as-salaam 🤍
Thank you for reaching out to Asmaa Studio.
To match you with the right package, could you share:
1) Event date (or expected month)
2) City and venue if confirmed
3) Event type: wedding, engagement, or henna
4) Moments most important to you (zaffa only, First Look, bridal details, etc.)

Full package brochure (PDF):
https://asmaa.video/packages-asmaa-studio.pdf
```

### T2. Specific package interest — source: `باقة 0N` or `صفحة X - باقة 0N`
**AR**
```
وعليكم السلام 🤍
بكج {NN} متاح بالإذن من الله.
لتثبيت الموعد أحتاج منك:
• تاريخ المناسبة
• المدينة والقاعة
• وقت الزفة (تقريبا)

العربون نصف الفاتورة لحجز التاريخ، والباقي يوم المناسبة قبل التصوير.
لو تبين تفاصيل البكج كاملة قبل التحويل، حابة تشوفي الـ PDF أو نكمل من هنا؟
```

Replace `{NN}` with the actual package number from the source line.

**EN**
```
Wa-alaykum as-salaam 🤍
Package {NN} is available, in-shaa-Allah.
To confirm the date I need:
• Event date
• City and venue
• Approximate zaffa time

A 50% deposit secures the date; the balance is paid on the event day before filming.
Would you like the full PDF brochure or shall we continue here?
```

### T3. Zaffa-only / budget — source: `صفحة بكج الزفة` or `صفحة الزفة - باقة 01`
**AR**
```
وعليكم السلام 🤍
بكج الزفة (٦٠٠ ريال، عشرين دقيقة) مصمم بالضبط للعروس اللي تبي تحفظ لحظة الدخول بدون تغطية كاملة لليوم.
أحضر قبل الزفة بربع ساعة وأحضر إضاءة احترافية لإبراز اللحظة.
متى المناسبة وأي مدينة؟
```

### T4. City-specific — source: `صفحة الأحساء/الدمام/الخبر`
**AR**
```
أهلين 🤍
أغطي {city} وفي بالي قاعات المنطقة. حابة تخبريني القاعة عشان أرتب وقت الوصول بدقة؟
كذلك التاريخ والمناسبة والبكج الأقرب لكِ.
```

Replace `{city}` with: `الأحساء`, `الدمام`, or `الخبر`.

### T5. Portfolio admirer — source: `صفحة الألبوم`
**AR**
```
وعليكم السلام 🤍
يسعدني أن الألبوم وصلكِ. الأسلوب يبقى ثابت في كل تصوير: هدوء، تفاصيل، ولقطات طبيعية.
لو تخبريني التاريخ والمدينة وأي لحظات تهمك بالذات، أرسلك البكج الأنسب.
```

### T6. Out-of-area (Riyadh / Jeddah / GCC) — source: any, after she confirms city
**AR**
```
أهلاً وسهلاً 🤍
خدمة Asmaa Studio حالياً مخصصة للمنطقة الشرقية (الأحساء، الدمام، الخبر).
لو مناسبتك خارج هذه المدن أعرف أن القرار يخصك، لكن للحفاظ على جودة التغطية وراحة العائلة أكتفي بالمنطقة الشرقية في الوقت الحالي.
إذا حابة أوصيكِ بمصورة موثوقة في منطقتك، أخبريني وأرسلها لك (بدون عمولة، توصية فقط).
```

**EN**
```
Welcome 🤍
Asmaa Studio currently serves Eastern Province only (Al Ahsa, Dammam, Khobar).
If your event is outside these cities, I'd be happy to refer you to a trusted female videographer in your area (no commission, just a recommendation).
```

### T7. Night-time autoreply (21:00–09:00 KSA)
**AR**
```
أهلاً 🤍
وصلتني رسالتك. الردود الكاملة تكون من ٩ صباحا إلى ٩ مساء بإذن الله.
أول رد لك يوصلك صباح غدا.
```

### T8. Repeat-question deflection (price for X)
**AR**
```
الأسعار كاملة في دليل الباقات:
https://asmaa.video/packages-asmaa-studio.pdf
وكل بكج فيه السعر والمدة وأهم اللقطات. لو احتاجتي شرحا لأي بكج معين، اكتبي رقم البكج وأشرحه لك.
```

### T9. Halal / women-only clarification (when bride asks)
**AR**
```
نعم، الفريق نسائي بالكامل (لا يحضر رجال).
الخدمة مرخّصة من وزارة الموارد البشرية والتنمية الاجتماعية.
الأسلوب هادئ ومحترم لخصوصية العروس والعائلة.
```

**Note (important brand rule):** Mohammed's rule is to **not put this in a visual badge on the site** because stating the obvious insults the audience. But it is **OK and helpful to confirm it directly when a bride asks** — that's a 1:1 conversation, not a public claim.

### T10. Add-on inquiry (extra hour, mannequin, color grade, moonlight)
**AR**
```
نعم متوفر:
• الساعة الإضافية: ٢٠٠ ريال لكل ساعة
• تصوير الفستان بالمنيكان: ١٥٠ ريال
• التلوين السينمائي + تنعيم البشرة: ٣٥٠ ريال
• إضاءة المون لايت وقت الزفة: مشمولة في بكج الزفة

أي إضافة تهمك بالذات؟
```

---

## Triage flow chart

```
INCOMING WA MESSAGE
        │
        ├─ Source starts with "باقة 0N" or "X - باقة 0N"
        │       → T2  (highest intent; close fast)
        │
        ├─ Source starts with "صفحة بكج الزفة" or "صفحة الزفة - باقة 01"
        │       → T3  (budget intent; confirm zaffa-only fit)
        │
        ├─ Source = "صفحة الأحساء|الدمام|الخبر"
        │       → T4  (geo-confirmed; ask for venue)
        │
        ├─ Source = "صفحة الألبوم"
        │       → T5  (style-buying; convert to date+package)
        │
        ├─ Source = "صفحة الأسئلة"
        │       → answer the FAQ topic first, then T1
        │
        ├─ Source contains "دليل"
        │       → educational lead; answer the guide topic, then T2
        │
        ├─ Source = "رابط العروس"
        │       → check if reservation form data was submitted;
        │         if yes, confirm receipt; if no, send T1
        │
        ├─ Source = "الصفحة الرئيسية - الشريط العلوي"
        │       → committed-intent; T1 with date+city+package questions
        │
        ├─ Source = "زر واتساب السريع" or "الصفحة الرئيسية"
        │       → T1
        │
        └─ Bride later mentions city outside Eastern Province
                → T6
```

---

## Phase 2 (future) — automation hooks
When ready, the following sources can be routed to a Brevo / WA Business API auto-responder:
- `صفحة الأسئلة` → auto-send T8 (PDF deflection) within 30s
- Night-time arrivals (21:00–09:00) → auto-send T7 within 60s, queue real reply for 09:00

Manual mode is recommended for the first 60 days so Asmaa can read tone and personalize. Then automate the deflectors only.

---

## Operator tips
1. **Always reply within 1 hour during business hours.** Saudi brides are messaging 3–5 vendors simultaneously; the first-to-respond wins ~70% of bookings.
2. **Match her language** — if she opens in English, reply in English; otherwise default to Arabic.
3. **Don't paste the PDF link until she asks for prices** or until 2 messages into the convo. Earlier feels transactional.
4. **Never share Mohammed's personal handles** — all leads stay on the studio WhatsApp (+966 55 160 6334) and `@asmaa.video` social.
5. **Source label = entry path = trust signal** — when she came from `صفحة الأسئلة`, she already read the FAQ; don't re-explain those answers.
6. **Deposit messaging is anchored at 50% / on-event-day balance** — that's the live `paymentTerms` published on the site. Never improvise.

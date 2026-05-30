# Asmaa Studio — Instagram Highlight Icon Set

**Designed:** 2026-05-30
**PM:** Asmaa PM
**Spec:** Instagram highlight cover format — 1080×1080 SVG (vector source), exportable to PNG at any resolution.

## Icons in this set

| # | File | Arabic | English |
|---|---|---|---|
| 01 | `01-zaffa.svg` | الزفة | Zaffa |
| 02 | `02-packages.svg` | الباقات | Packages |
| 03 | `03-portfolio.svg` | الألبوم | Portfolio |
| 04 | `04-reviews.svg` | آراء العرايس | Reviews |
| 05 | `05-behind-the-scenes.svg` | الكواليس | Behind the Scenes |
| 06 | `06-bride-details.svg` | تفاصيل العروس | Bride Details |
| 07 | `07-first-look.svg` | اللقطة الأولى | First Look |
| 08 | `08-booking.svg` | الحجز | Booking |

## Design system

- **Background:** `#0c0c0d` → `#1a1410` radial gradient (matches site `--ink` and `--ink-soft`)
- **Primary accent:** linear gradient `#f1cb82` → `#b8924d` (matches site `--gold` / `--champagne`)
- **Body text:** `#fff6df` (matches site `--ivory`)
- **Italic Latin labels:** Cormorant Garamond (matches site `--font-latin-display`)
- **Arabic labels:** Noto Kufi Arabic 700 (matches site `--font-display`)
- **Frame:** 56px corner radius rounded rectangle, 2px gold border at 45% opacity
- **Safe area:** outer 60px margin (Instagram crops circles inside ~960×960)

## Export to PNG

```bash
# Requires inkscape or rsvg-convert
for f in *.svg; do
  rsvg-convert -w 1080 -h 1080 "$f" -o "$(basename "$f" .svg).png"
done
```

Or in macOS Preview: open SVG, File > Export, format PNG at 1080×1080.

## Upload to Instagram

1. Open each PNG in Instagram → Stories → save to Highlights cover
2. Or use the brand's preferred scheduler (Buffer / Later / Meta Business Suite)

## Brand-rule compliance

- No "نسائي 100%" badge in any icon ✅
- Asmaa Studio wordmark NOT included on icons (per spec — highlights show inside the IG profile which already names the brand)
- All copy in MSA Arabic + English; no Khaleeji slang
- Saudi-respectful: minimalist, elegant, premium feel — matches the wedding/luxury market positioning

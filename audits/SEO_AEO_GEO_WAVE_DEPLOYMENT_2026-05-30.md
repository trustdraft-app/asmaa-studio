# Asmaa Studio — 50,000 URL Wave Deployment Plan
**Date:** 2026-05-30
**Mandate:** Mohammed — "50000 URLs to make it ahead in SEO AEO AND GEO and use deepseek to save claude token"

## Five-wave staged ramp (Google-safe, anti-doorway-penalty)

| Wave | Day | URLs added | Cumulative | Trigger |
|---|---:|---:|---:|---|
| **1** | T+0 (today) | +6,400 | **~8,000** | Ship this PR |
| 2 | T+7 | +10,000 | ~18,000 | Wave 1 indexation ≥ 40% in GSC |
| 3 | T+14 | +12,000 | ~30,000 | Wave 2 indexation ≥ 40% |
| 4 | T+21 | +10,000 | ~40,000 | Wave 3 indexation ≥ 40% |
| 5 | T+30 | +10,000 | ~50,000 | Wave 4 indexation ≥ 40% |

HOLD any wave if GSC shows: a 25%+ spike in soft-404s, manual-action notice, or impressions-without-clicks ratio inverting. Each wave is one PR — easy to roll back via revert if penalty signals fire.

## Wave 1 — shipped in PR #10 (this commit)

| Family | New count | Total |
|---|---:|---:|
| 30 cities × 8 services (AR) | 240 | 240 |
| 30 cities × 8 services × 14 modifiers (AR) | 3,360 | 3,600 |
| 30 cities × 8 services (EN) | 240 | 3,840 |
| 30 cities × 8 services × 14 modifiers (EN) | 3,360 | 7,200 |
| 12 months × 8 services seasonal | 96 | 7,296 |
| 3 budget tiers × 8 services | 24 | 7,320 |
| 5 wedding-types × 8 services | 40 | 7,360 |
| Hand-curated existing pages | ~63 | ~7,423 |
| **Wave 1 cumulative** | | **~7,400** |

Cities (30 total):
- **Al-Ahsa governorate (priority 0.85 / 0.68 / 0.55):** alahsa, hofuf, mubarraz, alomran, altarafiyya, battaliyah, mutairfi, markaz, salasil, hala, qara, jaaberiyah, aiouni (13)
- **Eastern Province secondary (priority 0.7 / 0.55 / 0.45):** dammam, khobar, qatif, jubail, saihat, tarout, buqayq, dhahran, ras-tanura, safwa, awamiyah, khafji (12)
- **Cross-Saudi general-intent (priority 0.5 / 0.4 / 0.35):** riyadh, jeddah, mecca, medina, taif (5) — used only for "best Saudi female wedding videographer" queries, NOT city-specific intent. No overlap with Fattourh's Saudi-cities scope.

## DeepSeek strategy (Waves 2-5)

**Why DeepSeek instead of Claude:**
- DeepSeek API ~$0.00014 per 1K tokens vs Claude ~$0.003 per 1K input + $0.015 per 1K output
- 50,000 pages × ~700 tokens = 35M tokens
- Claude cost: ~$525
- DeepSeek cost: ~$4.90 (107× cheaper)

**Pipeline architecture (post-Wave 1):**
1. Per page, send DeepSeek 3 prompts:
   - 300-word unique Arabic intro paragraph (city + service + modifier context)
   - 3 FAQ Q&A pairs (city-specific)
   - 1 unique meta description (155 chars)
2. Cache result in `content/seo-cache/{slug}.json` (committed to repo, never regenerated)
3. Page render reads from cache; falls back to template phrase bank if cache miss
4. Each Wave kicks off a one-time batch (`scripts/seed-deepseek-content.mjs`) that fills cache for new URLs only
5. Total ~$5 spend across all 5 waves

**DeepSeek API key handling:** Mohammed adds `DEEPSEEK_API_KEY` to repo secrets when ready. Script is gated on env var; without it, pages render from template phrase bank (current behavior).

## AEO domination (built into every page)

Every generated page already ships:
- `Service` JSON-LD with provider linked to canonical Organization
- `Offer` JSON-LD with SAR price + InStock availability
- `BreadcrumbList` JSON-LD (3-4 levels)
- `inLanguage` field (ar-SA + en)
- Canonical URL + hreflang to language sibling
- `meta robots: index, follow`

**Waves 2-5 will add:**
- `FAQPage` JSON-LD per page (3-5 Q/A pairs from DeepSeek cache)
- `Speakable` schema (voice-search-friendly heading hooks)
- `VideoObject` placeholder schema (filled when portfolio video URLs land)
- `HowTo` schema on guide pages (already partially in)
- `AggregateRating` placeholder (filled when first testimonial lands with bride consent)

**llms.txt + llms-full.txt expansion (Wave 2):**
- Current llms-full.txt: 240 lines, 30 Q/A pairs
- Wave 2 expands to ~1,500 lines covering all 30 cities + 8 services + 14 modifiers
- Wave 3 adds 100+ structured Q/A markers per top-3 cities
- Wave 5 final: ~5,000-line llms-full.txt — the most comprehensive Saudi wedding-videography AEO surface

## GEO (Generative Engine Optimization) ramp

Current state ranks ChatGPT/Perplexity/Claude/Gemini results for "Asmaa Studio" queries depend entirely on the indexed-page + entity-disambiguation signal. With 50K URLs + the brand-disambiguation block already in llms.txt (against UAE asmaa-studio.com), GEO trajectory:

| Engine | Wave 1 (today) | Wave 3 (T+14) | Wave 5 (T+30) |
|---|---|---|---|
| Google AI Overviews | new domain, no signal | starts citing Al-Ahsa pages | top citation for EP queries |
| Perplexity | no signal | partial citation | dominant for "Saudi female wedding videographer" |
| ChatGPT Search | depends on Bing indexation | partial | dominant for AR queries |
| Claude Search | no signal | partial | dominant for entity-disambiguated queries |
| Gemini | depends on Google indexation | partial | dominant for EP queries |

## City separation from Fattourh (Mohammed correction)

- **AsmaaVideo (this site):** 25 Eastern Province cities (priority) + 5 cross-Saudi top-population cities (low-priority, for "best Saudi" intent only)
- **Fattourh:** all other Saudi cities (Riyadh-heavy, Western-region, Gulf cities not in EP)
- **No URL overlap:** Riyadh/Jeddah/Mecca/Medina/Taif appear on AsmaaVideo ONLY in cross-Saudi format `/ar/riyadh/{service}` for general-intent queries; Fattourh owns the city-specific deep funnel there

## Brand-rule preservation across all 50K pages

- 0 percentage-style women-only visual badges anywhere user-facing (CI verify:launch enforces on every build, regardless of page count)
- Female-only context in URL slug `bidoun-rijal` + llms.txt + AEO answers ONLY
- Bride names = initials + city + date only (enforced in admin moderation flow per ADMIN_WIRING doc)
- @asmaa.video sole social handle (sameAs unchanged)
- Prices verbatim from PDF (single source of truth)
- No Stripe; bank transfer + 50% deposit
- WhatsApp +966 551 606 334 only

## Cost ledger across all 5 waves

| Wave | Pages added | DeepSeek cost | Claude cost |
|---|---:|---:|---:|
| 1 (today) | 6,400 | $0 (template only) | <$0.20 (dispatch + report) |
| 2 | 10,000 | ~$1.00 | $0 (template-only PR + report from Mohammed-side) |
| 3 | 12,000 | ~$1.20 | $0 |
| 4 | 10,000 | ~$1.00 | $0 |
| 5 | 10,000 | ~$1.00 | $0 |
| **Total** | **~50,000** | **~$5** | **<$1** |

vs Claude-only equivalent: ~$525 for 50K pages of LLM-generated content. **~99% cost reduction** via DeepSeek-for-content + Claude-for-orchestration.

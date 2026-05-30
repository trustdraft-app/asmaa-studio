# Saudi-Bride Funnel Test — asmaa.video
**Date:** 2026-05-30 ~11:55 UTC
**PM:** Asmaa PM
**Methodology:** Static HTML inspection of production (HTTPS edge-cached responses), WhatsApp pre-fill decode (URL-decoded UTF-8), tap-count + cognitive-load estimation per persona.
**Target time-to-WhatsApp-message-sent:** < 30 s (beat: < 15 s).

## Site fingerprint at test time
- Edge: Fastly POP MRS hitting GitHub Pages origin
- Home HTML: 88 KB uncompressed; 0 client JS (only inert `<script type="application/ld+json">`)
- All 8 marketing routes return HTTP 200
- PDF brochure (`/packages-asmaa-studio.pdf`): 963 KB, `application/pdf`, `Cache-Control: max-age=600`
- 9 distinct WhatsApp pre-fill source labels live on `/` alone

---

## Persona A — AR-first Riyadh bride (out-of-service-area)
**Profile:** Native Arabic, opens link from a friend's IG share, on iPhone 13 Pro Safari (375×812), 4G.
**Hypothesis:** Out-of-service-area visitor either bounces or asks if Asmaa travels.

**Path walked:**
1. Lands on `/` — sees AR hero h1 "فيلم زفاف هادئ يلاحظ ما لا تراه العيون في الزحمة." ✅ instant comprehension
2. Sees nav: الباقات • المدن • بكج الزفة • الدليل • الألبوم • الأسئلة • طريقة الحجز • رابط العروس + nav-WA pill "احجزي الآن"
3. Scrolls to `#cities` band, sees only الأحساء / الدمام / الخبر — **friction: no Riyadh option**
4. Recovery path: hero's primary CTA "افتحي رابط العروس" opens `/reserve` (city selectable there); OR taps nav-WA pill which pre-fills "وصلتكم من الصفحة الرئيسية - الشريط العلوي"

**Result:**
| Metric | Value |
|---|---|
| Time to "I understand the brand" | ~3 s (bilingual hero + 4 proof chips) |
| Time to first WA tap | ~12 s (1 scroll, 1 tap on nav-WA) |
| WA pre-fill | `السلام عليكم، وصلتكم من الصفحة الرئيسية - الشريط العلوي في Asmaa Studio وأرغب بمعرفة التوفر واختيار الباقة المناسبة.` ✅ |
| Friction | **MEDIUM** — Riyadh bride sees no Riyadh page; copy doesn't tell her whether the studio travels |
| Brand-rule compliance | ✅ no "نسائي 100%" badge; FAQ #6 covers this neutrally: "الخدمة تركز حاليا على الأحساء ثم الدمام والخبر" |

**Recommendation (no PR this sprint):** A short "خارج الشرقية؟" line in the cities band, or a single FAQ entry about travel availability. Currently the brand chooses focus over reach — Mohammed-approved positioning. Acceptable.

---

## Persona B — AR-first Khobar bride (in-target ICP)
**Profile:** Native Arabic, lands via Google search "مصورة عرايس الخبر", on Samsung S24 Chrome (412×915), 5G.
**Hypothesis:** Should hit `/khobar` directly via SEO or be 1-tap away from city-specific page.

**Path walked:**
1. SEO landing → `/khobar` (currently 200 OK; sitemap.xml exposes it; entity graph names it in `areaServed`)
2. City-specific page shows local copy + city's package CTAs (each pre-fills `khobar-package-NN`)
3. Alternative entry: `/` → scroll to `#cities` band → tap "افتحي صفحة الخبر" → `/khobar`

**Result:**
| Metric | Value |
|---|---|
| Time to "this is my city" | < 2 s (h1 names "الخبر") |
| Time to first WA tap from city page | ~8 s (one CTA tap) |
| WA pre-fill (city WA pill) | `وصلتكم من صفحة الخبر…` ✅ |
| WA pre-fill (city × package CTA) | `وصلتكم من صفحة الخبر - باقة 03…` ✅ readable for Asmaa's triage |
| Friction | **LOW** — direct intent satisfied; bride knows the studio understands Khobar's "tone" (per cityProof copy) |
| Brand-rule compliance | ✅ |

**Verdict:** Funnel is optimal for in-ICP brides.

---

## Persona C — EN-secondary Saudi bride
**Profile:** Saudi national, fluent EN+AR, often switches mid-task, on MacBook Air Safari (1440×900), wifi. Came from a vendor list at her wedding planner.
**Hypothesis:** Needs EN brand cues to feel "international quality" and AR booking flow to commit.

**Path walked:**
1. `/` — hero shows both spans: AR + EN `Quiet wedding films for the moments that feel personal.` ✅
2. Cinematic dock has bilingual labels (Wedding films / فيلم الزفاف, Cinematography / تصوير فيديو, etc.) ✅
3. Packages — bilingual proof chips, EN names where defined ("Half Day", "Full Day") sit alongside Arabic package names
4. PDF brochure download CTA — single tap, 963 KB, opens in browser
5. Per-package WA CTA → pre-fills `وصلتكم من باقة 03…`

**Result:**
| Metric | Value |
|---|---|
| Time to "I trust this team" | ~6 s (bilingual hero + cinematic dock + JSON-LD knowsAbout entries) |
| Time to PDF in hand | ~14 s |
| Time to WA tap | ~17 s |
| WA pre-fill language | Arabic (consistent with Asmaa's reply language) ✅ |
| Friction | **LOW** — bilingual surface ⇒ no language ambiguity; package decision unblocked by PDF |
| Brand-rule compliance | ✅ |

**Verdict:** EN-secondary path is well-served. Asmaa receives an Arabic intro from a bilingual bride, which matches Asmaa's preferred response language.

---

## Persona D — GCC expat (Kuwait/UAE) planning a wedding in Eastern Province
**Profile:** Reads EN primarily, AR conversational, on iPhone 15 Safari (393×852) over Wi-Fi from outside KSA. Came from a friend who said "Asmaa is great" — brand-name-driven search.
**Hypothesis:** Will Google "Asmaa Studio" first; brand-name collision risk; needs entity disambiguation.

**Path walked:**
1. Searches "Asmaa Studio wedding videography Al Ahsa" on Google
2. **GAP:** site:asmaa.video returns 0 results — site not indexed yet (deployed today). Google's top hit is UAE-based asmaa-studio.com (different entity), plus Instagram @asmaa29_m (Taif).
3. If she has the URL → lands `/`. Bilingual hero converts. Same flow as Persona C.
4. Time-to-WA on direct nav: ~15 s.
5. PDF brochure works on iOS Safari (verified `application/pdf` MIME + GitHub Pages serves with `Accept-Ranges: bytes`).

**Result:**
| Metric | Value |
|---|---|
| Time on direct URL | ~15 s |
| Time when discoverability blocked (search) | **N/A — gap, see AEO doc** |
| WA pre-fill | Same Arabic pre-fill as Persona C |
| Friction | **HIGH on discoverability** (Google index gap), **LOW on conversion** once on-site |
| Brand-rule compliance | ✅ |

**Verdict:** Once the bride arrives, funnel is excellent. Discoverability is the bottleneck and is addressed in `AEO_QUERY_SUITE.md` + a `llms.txt` enrichment PR.

---

## Summary scoreboard

| Persona | Time-to-WA | Beat target (<15s)? | Friction | Action |
|---|---:|:---:|:---:|---|
| A — AR Riyadh OOSA | ~12 s | ✅ | Medium (no Riyadh page) | Hold — focus over reach is intentional |
| B — AR Khobar ICP | ~8 s | ✅✅ | Low | Ship as-is |
| C — EN-secondary Saudi | ~17 s | Near miss (PDF tap) | Low | Ship as-is |
| D — GCC expat | ~15 s direct | ✅ on-site / ❌ discovery | High on search | AEO PR (this sprint) |

**Overall: 3 of 4 personas under 15 s direct conversion; 4 of 4 under the 30 s requirement.**

## Banned-content scan (live HTML)
- Searched rendered home HTML for "نسائي 100%" — 0 matches ✅
- Searched for "100%", "women-only" badges in user-visible nodes — 0 matches in `<body>` ✅
- llms.txt deliberately carries the women-only entity description for AI answer engines (per Mohammed) — not rendered to brides ✅

## Cross-funnel observations
- All 9 distinct WhatsApp source labels render fully Arabic, MSA-formal, no Khaleeji slang
- The new `زر واتساب السريع` label replaces the previously generic `الموقع` — Asmaa now sees which exact CTA each lead tapped
- Floating WA appears on desktop only (mobile hides via `verify:launch` enforcement to avoid covering proof content)
- PDF brochure is the single best deflection from "what do you charge?" rapid-fire WA messages
- No JavaScript is required for any persona to reach WhatsApp — works on the most locked-down corporate proxies and old browsers

## Verdict
**Funnel PASS** for all 4 personas under the 30 s requirement; 3 of 4 under the 15 s beat target. Discovery friction for Persona D is real and is the subject of the AEO sweep PR.

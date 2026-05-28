# Asmaa Studio Decision Log

## 2026-05-28 03:17 +03 — Asmaa Studio
**Question:** How should the bride reservation link and owner admin dashboard work on the current static GitHub Pages deployment?
**Decision:** Implement `/reserve` and `/admin` as Supabase-ready client pages, require Supabase Edge Function persistence for live writes, and keep a structured WhatsApp fallback when backend variables are missing.
**Reasoning:** A direct anonymous browser insert from a static website would violate the required origin/rate-limit/security boundary, while the WhatsApp fallback lets the new bride link work immediately.
**Source:** AGENTS.md, AI Empire security findings, project files, professional judgment.

## 2026-05-28 — Asmaa Studio
**Question:** Which domain should be canonical for the live site?
**Decision:** Use `asmaa.video` as the GitHub Pages custom domain and temporarily redirect `asmaavideo.com` to `http://asmaa.video` until the GitHub Pages certificate is issued.
**Reasoning:** One canonical domain avoids splitting SEO authority, and the temporary HTTP target avoids sending support-domain visitors into a certificate mismatch while GitHub prepares HTTPS.
**Source:** User instruction, project `.agent/decisions.md`, professional judgment.

## 2026-05-28 05:58 +03 — Asmaa Studio
**Question:** Should the requested 20x SEO/Figma/Canva/board upgrades remain in docs or become live customer-facing product surface?
**Decision:** Ship the upgrades into `app/page.tsx`, `app/[city]/page.tsx`, `lib/content.ts`, and `public/highlights`, then keep docs only as operating evidence.
**Reasoning:** Mohammed explicitly asked for real live progress and breakthrough, so the correct artifact is a deployed conversion/SEO experience, not another plan.
**Source:** User instruction, live project files, professional judgment.

## 2026-05-28 06:18 +03 — Asmaa Studio
**Question:** How should the site communicate trust without making normal expectations sound suspicious?
**Decision:** Remove repeated explicit privacy framing and express trust indirectly through calm execution, suitable style, family comfort, clear packages, and elegant workflow language.
**Reasoning:** Over-explaining an obvious expectation can trigger doubt; premium service copy should make the buyer feel comfortable without sounding defensive.
**Source:** User feedback, live copy review, professional judgment.

## 2026-05-28 06:31 +03 — Asmaa Studio
**Question:** How should all remaining strategic findings be made live instead of remaining in documentation?
**Decision:** Add live homepage sections for the full 20-wave plan, profile copy, hashtags, channel actions, content pillars, and board growth levers.
**Reasoning:** The user explicitly requested all findings live, so the website must become the operating surface rather than pointing to docs.
**Source:** User instruction, docs findings, project files, professional judgment.

## 2026-05-28 06:37 +03 — Asmaa Studio
**Question:** Which Arabic fonts should make the live website feel elegant, clear, beautiful, and user friendly?
**Decision:** Use IBM Plex Sans Arabic for body/UI copy, Noto Kufi Arabic for display headings, and keep Cormorant Garamond limited to the Latin monogram/brand accent.
**Reasoning:** This pairing gives readable Arabic forms for forms/navigation while giving headings a premium wedding-studio character without forcing Latin serif styling onto Arabic text.
**Source:** User instruction, live typography review, professional judgment.

## 2026-05-28 06:56 +03 — Asmaa Studio
**Question:** How should the website copy speak to brides and family decision-makers without sounding suspicious or overly operational?
**Decision:** Reframe the live copy around emotion, elegance, clear package choice, family ease, and local relevance while removing visible privacy phrasing and internal growth/SEO/Admin language from the customer journey.
**Reasoning:** Brides buy the memory and feeling first, while sisters/aunts reduce uncertainty through simple package and date clarity; defensive wording weakens that feeling.
**Source:** User instruction, growth-and-offer playbook, live page review, professional judgment.

## 2026-05-28 07:16 +03 — Asmaa Studio
**Question:** Which third-party audit findings should be fixed immediately?
**Decision:** Fix all clear, code-owned issues found in the pass: city query preselection, date guard, package accessibility state, Arabic accessibility labels, customer-friendly WhatsApp source labels, admin phone normalization, hero text spacing, and highlight alt text.
**Reasoning:** These issues directly affect booking clarity, accessibility, and owner follow-up reliability without requiring brand, legal, or money decisions.
**Source:** User instruction, live audit scripts, Playwright/axe checks, professional judgment.

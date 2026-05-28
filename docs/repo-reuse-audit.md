# Asmaa Studio Repo Reuse Audit

Updated: 2026-05-28 14:44 +03

## Repositories checked

| Repo | Useful pattern found | Applied to Asmaa |
|---|---|---|
| `trustdraft-app/fattourh` | AI-search `llms.txt`, readiness gates, clear owner-gated launch notes | Added Asmaa-specific `public/llms.txt` and launch verification command. |
| `trustdraft-app/scanability` | Playwright + axe accessibility discipline | Added browser verification with serious/critical axe checks. |
| `trustdraft-app/halalcrypto` | Deploy body-grep proof and static verification mindset | Added static export checks for required files, banned copy, visual-system tokens, and canonical domain. |
| `trustdraft-app/sawgly` | Cloudflare/Next deployment conventions and Saudi SME growth stack | Kept as reference only; Asmaa currently runs on GitHub Pages. |
| `trustdraft-app/founder-command-center` | Admin/dashboard dependency set and mission-control framing | Kept Asmaa admin simpler; no charts or dashboard library added. |

## Changes shipped from the audit

- Added `public/llms.txt` so AI answer engines can understand the brand, cities, main action, and canonical pages without guessing.
- Added `npm run verify:launch`, a launch guard that checks static export completeness, banned wording, marketing-page script pruning, homepage visual-system elements, mobile overflow, controlled mobile heading size, and axe serious/critical accessibility issues.
- Extended static JS pruning to include `/faq`, keeping the indexable marketing/FAQ surface fast while leaving `/reserve` and `/admin` interactive.
- Replaced remaining owner-specific admin wording with neutral studio-team language.

## Not imported

- Cloudflare Workers/OpenNext deployment setup: useful later, but GitHub Pages is the current live target and already configured.
- Heavy admin dashboard libraries, charts, and command-center patterns: unnecessary for the current reservation workflow.
- Large legal/security headers from Cloudflare Pages projects: GitHub Pages does not honor `_headers`; domain HTTPS remains governed by GitHub Pages certificate issuance.

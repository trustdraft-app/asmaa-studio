# Asmaa Studio — SEO Wave Automation
**Date:** 2026-05-30
**Mandate:** Mohammed — cron-based wave deployment, staggered from Fattourh, GSC-gated, Slack-notified.

## Cadence calendar (AsmaaVideo + Fattourh)

| Day | UTC | AST (Saudi) | Site | Activity |
|---|---|---|---|---|
| Monday | 07:00 | 10:00 | Fattourh | Wave deploy (cron) |
| Tuesday | 07:00 | 10:00 | **AsmaaVideo** | **Wave deploy (cron)** |
| Wednesday | — | — | — | (rest day for indexation to bake) |
| Thursday | 07:00 | 10:00 | Fattourh | Wave deploy (cron) |
| Friday | 07:00 | 10:00 | **AsmaaVideo** | **Wave deploy (cron)** |
| Saturday | — | — | — | (rest day; Saudi weekend; Asmaa engaged with brides) |
| Sunday | — | — | — | (rest day; Saudi weekend) |

Staggering ensures: (1) GSC API quota isn't shared between sites; (2) Slack notifications are spread across the week; (3) any infrastructure shock (e.g. GitHub Actions outage) only blocks one site's wave at a time.

## Workflow architecture

`.github/workflows/seo-wave-deploy.yml` does:

1. **Resolve wave number** — reads `seo-waves/state.json` for `nextWave`, or accepts `workflow_dispatch.inputs.wave` override.
2. **GSC indexation gate** — calls `scripts/gsc-indexation-gate.mjs`. Without `GSC_SERVICE_ACCOUNT_JSON` secret, the gate is a no-op (allow). With the secret, queries Google Search Console URL Inspection API for indexation status of the prior wave's pages. If `indexed_in_last_window / total_prior_wave_pages < threshold`, SKIP this wave.
3. **DeepSeek wave generator** — `scripts/wave-deploy.mjs` reads the wave manifest, calls DeepSeek API per page combo (batched 10 prompts/call), writes results to `content/seo-cache/{slug}.json`. Without `DEEPSEEK_API_KEY` secret, falls back to template phrase bank (current behavior).
4. **Auto-merge PR** — branch `seo/wave-{N}-{date}`, commit, push, `gh pr create`, `gh pr merge --squash --auto`. Requires `GITHUB_TOKEN` (built-in).
5. **State bump** — updates `seo-waves/state.json.nextWave` to N+1 and records `lastDeploy.deployedAt`.
6. **Slack notification** — POSTs job status to `SLACK_WEBHOOK_URL` if set.

## Wave manifest schema

`seo-waves/wave-{N}.json` fields:

| Field | Type | Required |
|---|---|---|
| `wave` | int | ✓ |
| `name` | string | ✓ |
| `scheduledFor` | YYYY-MM-DD | ✓ |
| `status` | "pending" \| "deployed" \| "skipped" | ✓ |
| `method` | "template-only" \| "deepseek-cached" | ✓ |
| `deepseekBudgetUsd` | number | ✓ |
| `cities` | string[] | — (Wave 1 only) |
| `services` | string[] | — (Wave 1 only) |
| `modifiers` | string[] | — (Wave 1 only) |
| `newRouteFamilies` | object[] | — (Waves 2-5) |
| `expectedPageDelta` | int | ✓ |
| `deployedPageDelta` | int | filled by script after deploy |
| `indexationGate` | object | required for waves 2+ |

## Indexation gate spec (per wave manifest)

```json
{
  "indexationGate": {
    "method": "GSC API",
    "thresholdPercent": 40,
    "windowDays": 7,
    "minimumIndexedCount": 800
  }
}
```

If prior wave's `indexedInWindow / priorWaveDeltaPages < thresholdPercent / 100`, OR `indexedInWindow < minimumIndexedCount`, the gate FAILS and the workflow exits cleanly. Manual override available via `workflow_dispatch.inputs.force=true`.

## DeepSeek pipeline spec (Wave 2+)

Per page, the script will call DeepSeek with 3 prompts in a single batched API call:

1. **Intro paragraph (300 words AR):** `"Write a 300-word elegant Arabic intro paragraph for a wedding videography service page. Service: {service.ar}. City: {city.ar}. Modifier: {modifier.ar}. Tone: calm, elegant, Saudi-respectful, MSA-formal. Do not use the phrase 'نسائي 100%' or any percentage badge. Do not use the word 'خصوصية'."`
2. **Meta description (155 chars):** `"Write a 155-character Arabic meta description for ${page-title}. Include the city, service, and price ({service.price} SAR). End with a soft call to WhatsApp."`
3. **3 FAQ pairs:** `"Write 3 unique question + answer pairs in Arabic for ${city.ar} brides asking about ${service.ar}. Answers ≤80 words each, Saudi-respectful, no banned phrases."`

Estimated cost per page: ~$0.0001 (DeepSeek pricing at $0.00014/1K tokens for both input and output).
50K pages × $0.0001 = ~$5 total spend across waves 2-5.

Cache shape:
```json
// content/seo-cache/{slug}.json
{
  "slug": "alahsa-full-day-tasweer-bidoun-rijal",
  "generatedAt": "2026-06-06T10:15:32Z",
  "intro": "ر…",
  "metaDescription": "…",
  "faqs": [{"q":"…","a":"…"},{"q":"…","a":"…"},{"q":"…","a":"…"}]
}
```

Render-time fallback: if cache miss, render from the existing template phrase bank in `lib/seo-grid.ts`. No page ever fails to render due to missing cache.

## Slack notification format

```
Asmaa Studio SEO Wave {N} — status: success/failure — see workflow run for details.
```

Set via `SLACK_WEBHOOK_URL` repo secret. Without it, notifications are skipped (workflow continues).

## Secrets required for full automation

| Secret | Required for | Status |
|---|---|---|
| `GITHUB_TOKEN` | PR open + merge | ✅ built-in to Actions |
| `DEEPSEEK_API_KEY` | Wave 2+ content gen | ❌ Mohammed needs to add |
| `GSC_SERVICE_ACCOUNT_JSON` | Indexation gate | ❌ Mohammed needs to add |
| `SLACK_WEBHOOK_URL` | Notifications | ❌ Mohammed needs to add |

**Without any of these, the workflow runs in degraded but non-blocking mode** — wave deploys still happen via template phrase bank; gate becomes permissive; notifications are skipped.

## Manual override

```bash
# Force-fire a specific wave bypassing the cron + gate
gh workflow run seo-wave-deploy.yml --field wave=3 --field force=true

# Check next scheduled wave
cat seo-waves/state.json | jq .nextWave

# Mark a wave as deployed without running
# (write status: "deployed" into the manifest)
```

## Outstanding Mohammed action items (target 0)

| # | Action | Blocks | Workaround if not done |
|---|---|---|---|
| 1 | Add `DEEPSEEK_API_KEY` to repo secrets | Wave 2+ unique-content quality | Template phrase bank (deterministic-hash uniqueness) |
| 2 | Add `GSC_SERVICE_ACCOUNT_JSON` to repo secrets | Indexation gate (anti-penalty safety) | Gate is no-op; rely on manual monitoring |
| 3 | Add `SLACK_WEBHOOK_URL` to repo secrets | Wave-completion notifications | Check `gh run list` manually |
| 4 | Add `BREVO_API_KEY` to repo secrets | Functional admin auth (see ADMIN_WIRING) | Existing Supabase-gated admin |
| 5 | First Google Business Profile listing | Local SEO + LocalBusiness schema | Currently blocked (addressless penalty) — get a verified KSA address |

With items 1-3 done, the wave automation runs fully unattended. Item 4 unblocks the functional admin. Item 5 unblocks LocalBusiness schema for richer Maps SEO.

## How this differs from Fattourh

| Aspect | Fattourh | AsmaaVideo |
|---|---|---|
| Cron | Mon + Thu 07:00 UTC | Tue + Fri 07:00 UTC |
| City scope | All Saudi EXCEPT Eastern Province | Eastern Province + 5 cross-Saudi for general-intent only |
| Page-count target | varies | 50K |
| DeepSeek budget | varies | ~$5 across waves |
| Tone | varies per-product | calm, elegant, Saudi-respectful MSA, NO percentage-style badges |

No URL overlap. No content overlap. Both sites can run their workflows independently without rate-limiting each other on GSC API or DeepSeek API quotas.

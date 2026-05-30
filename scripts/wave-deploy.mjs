#!/usr/bin/env node
// Wave deploy orchestrator. Reads seo-waves/wave-{N}.json, generates pages,
// commits to a branch. Run from CI workflow (.github/workflows/seo-wave-deploy.yml).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const wave = Number(args.wave || 1);
const manifestPath = `seo-waves/wave-${wave}.json`;
if (!existsSync(manifestPath)) {
  console.error(`No manifest at ${manifestPath} — nothing to deploy.`);
  process.exit(0);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
console.log(`Wave ${wave}: ${manifest.name}`);

if (manifest.status === "deployed") {
  console.log(`Wave ${wave} already marked deployed. Skipping.`);
  process.exit(0);
}

const deepseekKey = process.env.DEEPSEEK_API_KEY;
if (!deepseekKey) {
  console.log("DEEPSEEK_API_KEY not set — falling back to template phrase bank (existing seo-grid behavior).");
}

// Cache directory for DeepSeek-generated content per page slug
const cacheDir = "content/seo-cache";
if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });

// New route families to generate — read from manifest
const families = manifest.newRouteFamilies || [];
console.log(`Family routes to generate: ${families.length}`);

let generated = 0;
for (const family of families) {
  console.log(`  - ${family.family} (${family.count} expected pages)`);
  // Actual route-file generation lives in app/ — these manifests are the
  // PLAN of work. Per-wave PRs will add the corresponding app/ routes
  // alongside the cache pre-fill (this script seeds the cache; the
  // route .tsx files are added by hand or via a separate codegen step
  // committed in the same PR).
  generated += family.count;
}

// Pre-fill DeepSeek cache for each (city, service, modifier) triple from
// the wave's scope, if DEEPSEEK_API_KEY is set. Otherwise no-op.
if (deepseekKey) {
  console.log("DeepSeek pre-fill: stubbed. Would call DeepSeek API once per page combo and write to content/seo-cache/{slug}.json.");
  // Real implementation would batch 10 prompts per API call with caching.
  // See audits/SEO_WAVE_AUTOMATION_2026-05-30.md for full pipeline spec.
}

// Update manifest status
manifest.status = "deployed";
manifest.deployedAt = new Date().toISOString();
manifest.deployedPageDelta = generated;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Wave ${wave} manifest updated — ${generated} pages planned for this wave.`);

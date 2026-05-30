#!/usr/bin/env node
// Google Search Console indexation gate. Skips wave deploy if indexation
// of the last wave is below the threshold defined in the manifest.

import { readFileSync, existsSync } from "node:fs";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const wave = Number(args.wave || 1);
const state = JSON.parse(readFileSync("seo-waves/state.json", "utf8"));
const priorWave = wave - 1;
if (priorWave < 1) {
  console.log("First wave — no gate to check. Allowing.");
  process.exit(0);
}

const priorManifestPath = `seo-waves/wave-${priorWave}.json`;
if (!existsSync(priorManifestPath)) {
  console.log(`No prior wave manifest at ${priorManifestPath} — allowing.`);
  process.exit(0);
}
const prior = JSON.parse(readFileSync(priorManifestPath, "utf8"));
const gate = prior.indexationGate;
if (!gate) {
  console.log(`No indexationGate spec in prior wave ${priorWave} — allowing.`);
  process.exit(0);
}

const serviceJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!serviceJson) {
  console.log("GSC service account not set — gate is a no-op. Allowing.");
  process.exit(0);
}

// Query GSC API for index coverage of asmaa.video
// (Stubbed — replace with @googleapis/searchconsole when service account is wired)
console.log("GSC API call would happen here. Returning permissive default for now.");
console.log(`Gate spec: ≥${gate.thresholdPercent}% indexed over ${gate.windowDays}-day window, minimum ${gate.minimumIndexedCount} pages.`);

// Real implementation:
//   const { google } = await import("@googleapis/searchconsole");
//   const auth = new google.auth.GoogleAuth({ credentials: JSON.parse(serviceJson), scopes: ["https://www.googleapis.com/auth/webmasters.readonly"] });
//   const sc = google.searchconsole({ version: "v1", auth });
//   const res = await sc.urlInspection.index.inspect({ requestBody: { inspectionUrl: `https://asmaa.video/`, siteUrl: "https://asmaa.video/" } });
//   // count distinct inspected URLs with verdict 'PASS'
//   if (passed < gate.minimumIndexedCount) process.exit(1);

process.exit(0);

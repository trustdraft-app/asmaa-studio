#!/usr/bin/env node
/**
 * IndexNow submitter for asmaa.video.
 *
 * Pings Bing/Yandex/Seznam (and Google indirectly via IndexNow partners) the
 * instant new/updated URLs ship — far faster than waiting for an organic crawl.
 *
 * The key is the filename of public/<key>.txt (its contents must equal the key).
 * That file is copied verbatim into the static export, so the verification URL
 * https://asmaa.video/<key>.txt resolves once deployed.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs                 # submit the default high-value set
 *   node scripts/indexnow-submit.mjs https://asmaa.video/blog/...   # submit specific URLs
 *
 * Run AFTER deploy — IndexNow validates the key file is live before accepting.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HOST = "asmaa.video";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function discoverKey() {
  const publicDir = join(root, "public");
  const keyFile = readdirSync(publicDir).find((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f));
  if (!keyFile) {
    throw new Error("No IndexNow key file (public/<hex>.txt) found. Generate one first.");
  }
  const key = keyFile.replace(/\.txt$/i, "");
  const contents = readFileSync(join(publicDir, keyFile), "utf8").trim();
  if (contents !== key) {
    throw new Error(`Key file contents must equal the key. Expected "${key}", got "${contents}".`);
  }
  return key;
}

const defaultUrls = [
  `${ORIGIN}/`,
  `${ORIGIN}/blog`,
  `${ORIGIN}/ar/blog`,
  `${ORIGIN}/blog/wedding-photography-eastern-province`,
  `${ORIGIN}/blog/wedding-videography-saudi-2026`,
  `${ORIGIN}/packages`,
  `${ORIGIN}/portfolio`
];

async function main() {
  const key = discoverKey();
  const cliUrls = process.argv.slice(2).filter((u) => u.startsWith("http"));
  const urlList = (cliUrls.length ? cliUrls : defaultUrls).filter((u) => u.startsWith(ORIGIN));

  const payload = { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList };
  console.log(`Submitting ${urlList.length} URL(s) to IndexNow with key ${key}...`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload)
  });

  const body = await res.text();
  console.log(`IndexNow responded: ${res.status} ${res.statusText}`);
  if (body) console.log(body);

  // 200/202 = accepted. 422 usually means the key file isn't live yet.
  if (![200, 202].includes(res.status)) {
    console.error("Submission not accepted. Ensure the deploy is live and the key file is reachable.");
    process.exit(1);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

import { existsSync, rmSync } from "node:fs";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const outDir = join(process.cwd(), "out");
const adminPanelEnabled = process.env.NEXT_PUBLIC_ADMIN_PANEL_ENABLED === "true";

if (!existsSync(outDir)) {
  process.exit(0);
}

async function walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(fullPath);
    return entry.name.endsWith(".html") ? [fullPath] : [];
  }));
  return nestedFiles.flat();
}

async function mapLimit(items, limit, fn) {
  let index = 0;
  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, async () => {
    while (index < items.length) {
      const item = items[index];
      index += 1;
      await fn(item);
    }
  });
  await Promise.all(workers);
}

if (!adminPanelEnabled) {
  rmSync(join(outDir, "admin.html"), { force: true });
  rmSync(join(outDir, "admin"), { force: true, recursive: true });
}

const keepClientRoutes = new Set(["reserve.html", "packages.html"]);
if (adminPanelEnabled) keepClientRoutes.add("admin.html");

const htmlFiles = await walkHtmlFiles(outDir);
const concurrency = Number(process.env.PRUNE_STATIC_JS_CONCURRENCY || 16);

await mapLimit(htmlFiles, concurrency, async (file) => {
  const route = relative(outDir, file);
  if (keepClientRoutes.has(route) || route.startsWith("reserve/") || route.startsWith("admin/") || route.startsWith("packages/")) return;
  let fileStat;
  try {
    fileStat = await stat(file);
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }
  if (!fileStat.isFile()) return;

  const original = await readFile(file, "utf8");
  const pruned = original
    .replace(/<link rel="preload" as="script"[^>]*>/g, "")
    // Keep JSON-LD structured data and GA4 (googletagmanager) — strip all other client JS
    .replace(/<script(?![^>]*type="application\/ld\+json")(?![^>]*googletagmanager\.com)[\s\S]*?<\/script>/g, "");

  if (pruned !== original) {
    await writeFile(file, pruned);
  }
});

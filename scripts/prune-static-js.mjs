import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");

if (!existsSync(outDir)) {
  process.exit(0);
}

const staticRoutes = ["index.html", "alahsa.html", "dammam.html", "khobar.html", "404.html"];

for (const route of staticRoutes) {
  const file = join(outDir, route);
  if (!existsSync(file)) continue;

  const original = readFileSync(file, "utf8");
  const pruned = original
    .replace(/<link rel="preload" as="script"[^>]*>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "");

  if (pruned !== original) {
    writeFileSync(file, pruned);
  }
}

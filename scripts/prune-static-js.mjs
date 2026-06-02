import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const outDir = join(process.cwd(), "out");
const adminPanelEnabled = process.env.NEXT_PUBLIC_ADMIN_PANEL_ENABLED === "true";

if (!existsSync(outDir)) {
  process.exit(0);
}

function walkHtmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(fullPath);
    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

if (!adminPanelEnabled) {
  rmSync(join(outDir, "admin.html"), { force: true });
  rmSync(join(outDir, "admin"), { force: true, recursive: true });
}

const keepClientRoutes = new Set(["reserve.html", "packages.html"]);
if (adminPanelEnabled) keepClientRoutes.add("admin.html");

for (const file of walkHtmlFiles(outDir)) {
  const route = relative(outDir, file);
  if (keepClientRoutes.has(route) || route.startsWith("reserve/") || route.startsWith("admin/") || route.startsWith("packages/")) continue;
  if (!existsSync(file)) continue;
  if (!statSync(file).isFile()) continue;

  const original = readFileSync(file, "utf8");
  const pruned = original
    .replace(/<link rel="preload" as="script"[^>]*>/g, "")
    .replace(/<script(?![^>]*type="application\/ld\+json")[\s\S]*?<\/script>/g, "");

  if (pruned !== original) {
    writeFileSync(file, pruned);
  }
}

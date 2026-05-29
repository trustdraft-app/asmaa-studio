#!/usr/bin/env node
import { createServer } from "node:http";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = process.cwd();
const outDir = join(root, "out");
const port = Number(process.env.PORT || 4177);
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const adminPanelEnabled = process.env.NEXT_PUBLIC_ADMIN_PANEL_ENABLED === "true";
const verifyAdminOnly = process.env.VERIFY_ADMIN_ONLY === "true";

const requiredFiles = [
  "index.html",
  "reserve.html",
  "faq.html",
  "portfolio.html",
  "guides.html",
  "alahsa.html",
  "dammam.html",
  "khobar.html",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
  "favicon.ico",
  "CNAME"
];

if (adminPanelEnabled) {
  requiredFiles.push("admin.html");
}

const guideSlugs = [
  "wedding-videography-al-ahsa",
  "wedding-videography-dammam",
  "wedding-videography-khobar",
  "female-wedding-photographer-eastern-province",
  "engagement-videography-eastern-province",
  "zaffa-video-package",
  "first-look-wedding-video",
  "wedding-video-packages-saudi",
  "bridal-details-video",
  "wedding-videography-checklist",
  "how-to-choose-wedding-videographer",
  "wedding-video-delivery-editing"
];

const bannedPhrases = [
  "الاختيار أمامك",
  "مصمم للشرقية",
  "واتساب يبقى سريع",
  "الحفظ الآلي",
  "صاحبة العمل",
  "عمّة",
  "خالة",
  "أخت العروس",
  "privacy",
  "Privacy",
  "خصوصية",
  "خطة النشر اليومية",
  "نسخة جاهزة للحسابات",
  "هاشتاق",
  "SEO",
  "مصادر الحجز"
];

const marketingRoutes = [
  "index.html",
  "alahsa.html",
  "dammam.html",
  "khobar.html",
  "faq.html",
  "portfolio.html",
  "guides.html",
  "404.html",
  ...guideSlugs.map((slug) => `guides/${slug}.html`)
];
const mime = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function readOutFile(relativePath) {
  return readFileSync(join(outDir, relativePath), "utf8");
}

function walkFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(fullPath);
    return [fullPath];
  });
}

function staticPathForUrl(url) {
  const parsed = new URL(url, baseUrl);
  const cleanPath = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
  const candidates = cleanPath
    ? [cleanPath, `${cleanPath}.html`, join(cleanPath, "index.html")]
    : ["index.html"];

  for (const candidate of candidates) {
    const filePath = normalize(join(outDir, candidate));
    if (!filePath.startsWith(outDir) || !existsSync(filePath) || !statSync(filePath).isFile()) continue;
    return filePath;
  }
  return null;
}

function serveOut() {
  const server = createServer((request, response) => {
    const filePath = staticPathForUrl(request.url || "/");
    if (!filePath) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": mime[extname(filePath)] || "application/octet-stream",
      "cache-control": "no-store"
    });
    response.end(readFileSync(filePath));
  });

  return new Promise((resolveServer) => {
    server.listen(port, "127.0.0.1", () => resolveServer(server));
  });
}

function verifyStaticOutput() {
  if (!existsSync(outDir)) {
    fail("out/ is missing; run npm run build first.");
    return;
  }

  for (const file of requiredFiles) {
    if (existsSync(join(outDir, file))) pass(`built ${file}`);
    else fail(`missing ${file}`);
  }

  if (!adminPanelEnabled) {
    const adminHtmlPath = join(outDir, "admin.html");
    const homepageHtml = readOutFile("index.html");
    if (!homepageHtml.includes('href="/admin"') && !homepageHtml.includes("admin-login")) {
      pass("public homepage does not expose an admin link");
    } else {
      fail("public homepage must not expose /admin or admin login affordances");
    }

    if (!existsSync(adminHtmlPath)) {
      pass("admin route is absent from public launch build");
    } else {
      const adminHtml = readFileSync(adminHtmlPath, "utf8");
      if (adminHtml.includes('id="__next_error__"') && !adminHtml.includes("admin-login")) {
        pass("admin route renders a 404 artifact in public launch build");
      } else {
        fail("admin route must render 404 unless NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true");
      }
    }
  } else {
    const adminHtml = readOutFile("admin.html");
    if (adminHtml.includes("admin-login")) pass("admin login screen is present when explicitly enabled");
    else fail("admin login screen is missing when NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true");
    if (adminHtml.includes('name="robots" content="noindex, nofollow"')) pass("admin page is noindex when enabled");
    else fail("admin page must stay noindex when enabled");
  }

  for (const slug of guideSlugs) {
    const file = `guides/${slug}.html`;
    if (existsSync(join(outDir, file))) pass(`built ${file}`);
    else fail(`missing ${file}`);
  }

  const cname = existsSync(join(outDir, "CNAME")) ? readOutFile("CNAME").trim() : "";
  if (cname === "asmaa.video") pass("CNAME points to asmaa.video");
  else fail(`CNAME should be asmaa.video, got "${cname}"`);

  const allHtml = walkFiles(outDir).filter((file) => file.endsWith(".html"));
  for (const filePath of allHtml) {
    const html = readFileSync(filePath, "utf8");
    const relative = filePath.replace(`${outDir}/`, "");
    for (const phrase of bannedPhrases) {
      if (html.includes(phrase)) fail(`${relative} contains banned wording: ${phrase}`);
    }
  }

  for (const route of marketingRoutes) {
    if (!existsSync(join(outDir, route))) continue;
    const html = readOutFile(route);
    const nonStructuredScripts = html.match(/<script(?![^>]*type="application\/ld\+json")[\s\S]*?<\/script>/gi) || [];
    if (nonStructuredScripts.length > 0) fail(`${route} still contains client scripts`);
    else pass(`${route} is static-script pruned with structured data preserved`);
  }

  const home = existsSync(join(outDir, "index.html")) ? readOutFile("index.html") : "";
  for (const token of ["hero-photo-stack", "hero-logo-image", "package-motion-meter", "moment-card", "guide-card", "Asmaa Studio"]) {
    if (home.includes(token)) pass(`homepage contains ${token}`);
    else fail(`homepage missing ${token}`);
  }

  const sitemap = existsSync(join(outDir, "sitemap.xml")) ? readOutFile("sitemap.xml") : "";
  for (const slug of guideSlugs) {
    if (sitemap.includes(`https://asmaa.video/guides/${slug}`)) pass(`sitemap contains ${slug}`);
    else fail(`sitemap missing ${slug}`);
  }

  const llms = existsSync(join(outDir, "llms.txt")) ? readOutFile("llms.txt") : "";
  for (const token of [
    "Asmaa Studio",
    "Al Ahsa",
    "Dammam",
    "Khobar",
    "https://asmaa.video/reserve",
    "https://asmaa.video/portfolio",
    "https://asmaa.video/guides"
  ]) {
    if (llms.includes(token)) pass(`llms.txt contains ${token}`);
    else fail(`llms.txt missing ${token}`);
  }
}

async function verifyBrowserOutput() {
  const server = await serveOut();
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromium.executablePath(),
    args: ["--disable-dev-shm-usage"]
  });

  try {
    const contexts = [
      {
        name: "mobile",
        viewport: { width: 390, height: 844 },
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
      },
      {
        name: "desktop",
        viewport: { width: 1440, height: 1200 }
      }
    ];

    for (const config of contexts) {
      const context = await browser.newContext({
        viewport: config.viewport,
        userAgent: config.userAgent,
        locale: "ar-SA"
      });
      const page = await context.newPage();

      const browserRoutes = verifyAdminOnly
        ? ["/admin"]
        : [
            "/",
            "/reserve",
            "/faq",
            "/portfolio",
            "/guides",
            "/guides/wedding-videography-al-ahsa",
            "/guides/female-wedding-photographer-eastern-province",
            "/alahsa",
            "/dammam",
            "/khobar"
          ];
      if (adminPanelEnabled && !verifyAdminOnly) browserRoutes.push("/admin");

      for (const route of browserRoutes) {
        await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });

        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          h1Size: Number.parseFloat(getComputedStyle(document.querySelector("h1") || document.body).fontSize),
          bodyText: document.body.innerText
        }));

        if (layout.overflow <= 2) pass(`${config.name} ${route} has no horizontal overflow`);
        else fail(`${config.name} ${route} overflows horizontally by ${layout.overflow}px`);

        if (config.name === "mobile" && layout.h1Size <= 58) pass(`${route} mobile h1 size is controlled`);
        if (config.name === "mobile" && layout.h1Size > 58) fail(`${route} mobile h1 is too large: ${layout.h1Size}px`);

        for (const phrase of bannedPhrases) {
          if (layout.bodyText.includes(phrase)) fail(`${config.name} ${route} renders banned wording: ${phrase}`);
        }

        if (route === "/admin" && adminPanelEnabled) {
          if (layout.bodyText.includes("دخول فريق الاستوديو")) pass(`${config.name} admin shows only the login gate`);
          else fail(`${config.name} admin login gate is missing`);
          if (layout.bodyText.includes("كل طلب حجز")) fail(`${config.name} admin exposes dashboard content before auth`);
          else pass(`${config.name} admin dashboard content is hidden before auth`);
        }

        if (route === "/" && !adminPanelEnabled) {
          const publicAdminLinks = await page.locator('a[href="/admin"]').count();
          if (publicAdminLinks === 0) pass(`${config.name} homepage hides the admin link`);
          else fail(`${config.name} homepage exposes ${publicAdminLinks} admin link(s)`);
        }
      }

      if (verifyAdminOnly) {
        await context.close();
        continue;
      }

      await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
      const homeCounts = await page.evaluate(() => ({
        heroImages: document.querySelectorAll(".hero-photo-stack img").length,
        realLogoImages: document.querySelectorAll(".brand-mark img, .hero-logo-image").length,
        meters: document.querySelectorAll(".package-motion-meter").length,
        moments: document.querySelectorAll(".moment-card").length
      }));

      if (homeCounts.heroImages >= 2) pass(`${config.name} homepage has layered hero imagery`);
      else fail(`${config.name} homepage missing layered hero imagery`);

      if (homeCounts.realLogoImages >= 2) pass(`${config.name} homepage uses the real logo artwork`);
      else fail(`${config.name} homepage is missing real logo artwork`);

      if (homeCounts.meters >= 4) pass(`${config.name} homepage has package infographics`);
      else fail(`${config.name} homepage missing package infographics`);

      if (homeCounts.moments >= 4) pass(`${config.name} homepage has story moment cards`);
      else fail(`${config.name} homepage missing story moment cards`);

      await page.addScriptTag({ content: axeSource });
      const axe = await page.evaluate(async () => {
        return window.axe.run(document, {
          rules: {
            "color-contrast": { enabled: false }
          }
        });
      });
      const serious = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact || ""));
      if (serious.length === 0) pass(`${config.name} homepage has no serious axe violations`);
      else fail(`${config.name} homepage axe violations: ${serious.map((item) => item.id).join(", ")}`);

      await context.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

verifyStaticOutput();

if (!process.exitCode) {
  await verifyBrowserOutput();
}

if (process.exitCode) {
  console.error(`\nLaunch verification failed. Inspect ${pathToFileURL(outDir).href}`);
  process.exit(process.exitCode);
}

console.log("\nAsmaa launch verification passed.");

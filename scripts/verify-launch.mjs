#!/usr/bin/env node
import { createServer } from "node:http";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
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
  "contact.html",
  "faq.html",
  "portfolio.html",
  "zaffa.html",
  "engagement.html",
  "guides.html",
  "alahsa.html",
  "dammam.html",
  "khobar.html",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
  "favicon.ico",
  "CNAME",
  "_headers"
];

const requiredHeaderArtifactLines = [
  ["Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload"],
  ["Content-Security-Policy", "default-src 'self'"],
  ["Content-Security-Policy", "frame-ancestors 'none'"],
  ["X-Frame-Options", "DENY"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"]
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
  "مصادر الحجز",
  "الموجة",
  "ريل:",
  "ستوري:",
  "كاروسيل:",
  "هايلايت:",
  "Album refresh",
  "تصوير فوتوغرافي"
];

const marketingRoutes = [
  "index.html",
  "alahsa.html",
  "dammam.html",
  "khobar.html",
  "faq.html",
  "contact.html",
  "portfolio.html",
  "zaffa.html",
  "engagement.html",
  "process.html",
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

function verifyDeployHeaderArtifacts() {
  const headersPath = join(outDir, "_headers");
  if (!existsSync(headersPath)) {
    fail("out/_headers is missing; header-capable hosts will not receive launch security headers");
    return;
  }

  const headers = readFileSync(headersPath, "utf8");
  if (/^\s*\/\*/m.test(headers)) pass("Netlify/Cloudflare _headers artifact defines a global route");
  else fail("out/_headers must define a global /* route");

  for (const [name, value] of requiredHeaderArtifactLines) {
    if (headers.includes(`${name}:`) && headers.includes(value)) pass(`_headers contains ${name}`);
    else fail(`_headers missing ${name}: ${value}`);
  }

  const vercelConfigPath = join(root, "vercel.json");
  if (!existsSync(vercelConfigPath)) {
    fail("vercel.json is missing; Vercel deploys would not inherit the launch header policy");
    return;
  }

  const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));
  const vercelHeaders = new Map(
    (vercelConfig.headers || []).flatMap((rule) =>
      (rule.headers || []).map((header) => [header.key, String(header.value || "")])
    )
  );
  for (const [name, value] of requiredHeaderArtifactLines) {
    if (vercelHeaders.get(name)?.includes(value)) {
      pass(`vercel.json contains ${name}`);
    } else {
      fail(`vercel.json missing ${name}: ${value}`);
    }
  }
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

async function verifyStaticOutput() {
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

  verifyDeployHeaderArtifacts();

  const allHtml = walkFiles(outDir).filter((file) => file.endsWith(".html"));
  const scanConcurrency = Number(process.env.VERIFY_HTML_CONCURRENCY || 16);
  await mapLimit(allHtml, scanConcurrency, async (filePath) => {
    const html = await readFile(filePath, "utf8");
    const relative = filePath.replace(`${outDir}/`, "");
    for (const phrase of bannedPhrases) {
      if (html.includes(phrase)) fail(`${relative} contains banned wording: ${phrase}`);
    }

    if (/<title>[^<]*Asmaa Studio\s*\|\s*Asmaa Studio[^<]*<\/title>/.test(html)) {
      fail(`${relative} has a duplicated Asmaa Studio title`);
    }
  });

  for (const route of marketingRoutes) {
    if (!existsSync(join(outDir, route))) continue;
    const html = readOutFile(route);
    const nonStructuredScripts = (html.match(/<script(?![^>]*type="application\/ld\+json")(?![^>]*googletagmanager\.com)[\s\S]*?<\/script>/gi) || []);
    if (nonStructuredScripts.length > 0) fail(`${route} still contains client scripts`);
    else pass(`${route} is static-script pruned with structured data preserved`);

    if (html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"')) {
      fail(`${route} still exposes deprecated FAQPage structured data`);
    } else {
      pass(`${route} does not expose deprecated FAQPage structured data`);
    }
  }

  const home = existsSync(join(outDir, "index.html")) ? readOutFile("index.html") : "";
  for (const token of [
    "hero-photo-stack",
    "hero-logo-image",
    "package-motion-meter",
    "moment-card",
    "guide-card",
    "Asmaa Studio",
    "/brand/asmaa-cinematic-bridal-still.webp"
  ]) {
    if (home.includes(token)) pass(`homepage contains ${token}`);
    else fail(`homepage missing ${token}`);
  }

  for (const token of ['"@type":"Organization"', '"@type":"Service"', '"@type":"WebSite"', '"@type":"ItemList"']) {
    if (home.includes(token)) pass(`homepage structured data contains ${token}`);
    else fail(`homepage structured data missing ${token}`);
  }
  if (home.includes('"@type":"LocalBusiness"') || home.includes('"@type": "LocalBusiness"')) {
    fail("homepage must not publish addressless LocalBusiness structured data");
  } else {
    pass("homepage avoids addressless LocalBusiness structured data");
  }

  const reserve = existsSync(join(outDir, "reserve.html")) ? readOutFile("reserve.html") : "";
  if (reserve.includes('name="robots" content="noindex, follow"')) pass("reserve page is noindex/follow");
  else fail("reserve page must be noindex/follow");

  const sitemap = existsSync(join(outDir, "sitemap.xml")) ? readOutFile("sitemap.xml") : "";
  if (sitemap.includes("<loc>https://asmaa.video/</loc>")) pass("sitemap uses slash-normalized root URL");
  else fail("sitemap root URL must be https://asmaa.video/");
  if (!sitemap.includes("<lastmod>")) {
    pass("sitemap omits unverifiable lastmod values");
  } else {
    fail("sitemap must not emit unverifiable lastmod values");
  }
  if (!sitemap.includes("<loc>https://asmaa.video/reserve</loc>")) {
    pass("sitemap excludes noindex reserve page");
  } else {
    fail("sitemap must not include the noindex reserve page");
  }
  for (const slug of guideSlugs) {
    if (sitemap.includes(`https://asmaa.video/guides/${slug}`)) pass(`sitemap contains ${slug}`);
    else fail(`sitemap missing ${slug}`);
  }

  const guides = existsSync(join(outDir, "guides.html")) ? readOutFile("guides.html") : "";
  for (const token of ['"@type":"CollectionPage"', '"@type":"ItemList"', '"@type":"BreadcrumbList"']) {
    if (guides.includes(token)) pass(`guides structured data contains ${token}`);
    else fail(`guides structured data missing ${token}`);
  }

  const llms = existsSync(join(outDir, "llms.txt")) ? readOutFile("llms.txt") : "";
  for (const token of [
    "Asmaa Studio",
    "Al Ahsa",
    "Dammam",
    "Khobar",
    "https://asmaa.video/reserve",
    "https://asmaa.video/portfolio",
    "https://asmaa.video/engagement",
    "https://asmaa.video/process",
    "https://asmaa.video/guides"
  ]) {
    if (llms.includes(token)) pass(`llms.txt contains ${token}`);
    else fail(`llms.txt missing ${token}`);
  }
  if (!llms.includes("photography and videography") && !llms.includes("videography and photography")) {
    pass("llms.txt keeps the service focus on wedding videography");
  } else {
    fail("llms.txt still mixes photography/videography as the primary service");
  }
}

async function verifyBrowserOutput() {
  const server = await serveOut();
  const playwrightChromiumPath = chromium.executablePath();
  const fallbackChromiumPath =
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const executablePath = existsSync(playwrightChromiumPath)
    ? existsSync(fallbackChromiumPath)
      ? fallbackChromiumPath
      : playwrightChromiumPath
    : existsSync(fallbackChromiumPath)
      ? fallbackChromiumPath
      : playwrightChromiumPath;

  const browser = await chromium.launch({
    headless: true,
    executablePath,
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
            "/engagement",
            "/process",
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

        if (config.name === "mobile") {
          const smallTargets = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("a, button"))
              .map((node) => {
                const rect = node.getBoundingClientRect();
                const style = window.getComputedStyle(node);
                return {
                  label: (node.textContent || node.getAttribute("aria-label") || node.getAttribute("href") || "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .slice(0, 80),
                  height: Math.round(rect.height),
                  width: Math.round(rect.width),
                  visible:
                    rect.width > 0 &&
                    rect.height > 0 &&
                    style.visibility !== "hidden" &&
                    style.display !== "none" &&
                    Number(style.opacity || "1") > 0
                };
              })
              .filter((item) => item.visible && (item.height < 44 || item.width < 44));
          });
          if (smallTargets.length === 0) pass(`${config.name} ${route} has comfortable tap targets`);
          else fail(`${config.name} ${route} has undersized tap targets: ${JSON.stringify(smallTargets.slice(0, 5))}`);

          if (route === "/") {
            const floatingWhatsappVisible = await page.locator(".floating-whatsapp:visible").count();
            if (floatingWhatsappVisible === 0) pass("mobile homepage hides floating WhatsApp to avoid content overlap");
            else fail("mobile homepage must not show the floating WhatsApp over proof content");
          }
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

      await page.goto(`${baseUrl}/reserve?city=dammam&package=02`, { waitUntil: "networkidle" });
      await page.waitForFunction(() =>
        Array.from(document.querySelectorAll("select")).some((select) => select.value === "الدمام")
      );
      const reservePrefill = await page.evaluate(() => ({
        selectValues: Array.from(document.querySelectorAll("select")).map((select) => select.value)
      }));
      if (reservePrefill.selectValues.includes("الدمام")) pass(`${config.name} reserve preselects city from query`);
      else fail(`${config.name} reserve failed to preselect city from query`);

      await page.locator(".stepper button").nth(1).click();
      await page.waitForSelector('.package-picker button[aria-pressed="true"]');
      const selectedPackage = await page.locator('.package-picker button[aria-pressed="true"]').textContent();
      if (selectedPackage?.includes("بكج 02")) pass(`${config.name} reserve preselects package from query`);
      else fail(`${config.name} reserve failed to preselect package from query`);

      await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
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

await verifyStaticOutput();

if (!process.exitCode) {
  await verifyBrowserOutput();
}

if (process.exitCode) {
  console.error(`\nLaunch verification failed. Inspect ${pathToFileURL(outDir).href}`);
  process.exit(process.exitCode);
}

console.log("\nAsmaa launch verification passed.");

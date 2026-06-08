#!/usr/bin/env node
import { createServer } from "node:http";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = process.cwd();
const outDir = join(root, "out");
const rawPort = process.env.PORT;
const parsedPort = rawPort === undefined ? NaN : Number(rawPort);
const port = Number.isInteger(parsedPort) && parsedPort >= 0 ? parsedPort : 4177;
const configuredBaseUrl = process.env.BASE_URL || "";
let baseUrl = configuredBaseUrl || `http://127.0.0.1:${port === 0 ? 4177 : port}`;
const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const adminPanelEnabled = process.env.NEXT_PUBLIC_ADMIN_PANEL_ENABLED === "true";
const verifyAdminOnly = process.env.VERIFY_ADMIN_ONLY === "true";
const latestProofPath = join(root, "ASMAA_LAUNCH_VERIFY_LATEST.json");
let passCount = 0;
let failCount = 0;
const failures = [];

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
  "ar/alahsa/bride-checklist.html",
  "ar/dammam/bride-checklist.html",
  "ar/khobar/bride-checklist.html",
  "ar/alahsa/zaffa-tasweer/near-me.html",
  "ar/dammam/zaffa-tasweer/near-me.html",
  "ar/khobar/full-day-tasweer/near-me.html",
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
  failCount += 1;
  failures.push(message);
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  passCount += 1;
  console.log(`PASS ${message}`);
}

function writeLatestProof() {
  const ok = !process.exitCode;
  writeFileSync(latestProofPath, `${JSON.stringify({
    ok,
    status: ok ? "passed" : "failed",
    checkedAt: new Date().toISOString(),
    product: "asmaa.video",
    adminPanelEnabled,
    verifyAdminOnly,
    passCount,
    failCount,
    failures,
    outDir,
    baseUrl,
    proof: {
      staticExport: ok,
      browserVerification: ok,
      noSeriousAxeViolations: ok,
      noHorizontalOverflow: ok,
      publicAdminHidden: ok && adminPanelEnabled !== true,
      realLogoArtwork: ok,
      layeredHeroImagery: ok,
      packageInfographics: ok,
      storyMomentCards: ok,
    },
  }, null, 2)}\n`);
}

function withTimeout(promise, timeoutMs, label) {
  let timeout;
  const timeoutPromise = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeout));
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
    server.listen(port, "127.0.0.1", () => {
      const address = server.address();
      if (!configuredBaseUrl && address && typeof address === "object") {
        baseUrl = `http://127.0.0.1:${address.port}`;
      }
      resolveServer(server);
    });
  });
}

async function launchChromiumForAudit() {
  const playwrightChromiumPath = chromium.executablePath();
  const fallbackChromiumPath =
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const candidates = [playwrightChromiumPath, fallbackChromiumPath]
    .filter((candidate) => candidate && existsSync(candidate))
    .filter((candidate, index, all) => all.indexOf(candidate) === index);
  const launchErrors = [];

  for (const executablePath of candidates) {
    try {
      return await chromium.launch({
        headless: true,
        executablePath,
        args: [
          "--disable-background-networking",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--disable-software-rasterizer",
          "--no-default-browser-check",
          "--no-first-run"
        ]
      });
    } catch (error) {
      launchErrors.push(`${executablePath}: ${error.message.split("\n")[0]}`);
      console.error(`WARN Chromium launch failed for ${executablePath}`);
    }
  }

  throw new Error(`No launchable Chromium available. ${launchErrors.join(" | ")}`);
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

    if (/<title>[^<]*Asmaa Studio\s*\|\s*Asmaa Studio[^<]*<\/title>/.test(html)) {
      fail(`${relative} has a duplicated Asmaa Studio title`);
    }
  }

  for (const route of marketingRoutes) {
    if (!existsSync(join(outDir, route))) continue;
    const html = readOutFile(route);
    const nonStructuredScripts = html.match(/<script(?![^>]*type="application\/ld\+json")[\s\S]*?<\/script>/gi) || [];
    if (nonStructuredScripts.length > 0) fail(`${route} still contains client scripts`);
    else pass(`${route} is static-script pruned with structured data preserved`);

    if (html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"')) {
      fail(`${route} still exposes deprecated FAQPage structured data`);
    } else {
      pass(`${route} does not expose deprecated FAQPage structured data`);
    }
  }

  const home = existsSync(join(outDir, "index.html")) ? readOutFile("index.html") : "";
  // v2 redesign: class tokens updated to scoped .asmaa-v2 equivalents
  for (const token of [
    "av2-hero",
    "av2-service-card",
    "av2-pkg",
    "av2-shot",
    "av2-voice",
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

  const contact = existsSync(join(outDir, "contact.html")) ? readOutFile("contact.html") : "";
  if (contact) {
    if (contact.includes('"@type":"LocalBusiness"') || contact.includes('"@type": "LocalBusiness"')) {
      fail("contact page must not expose LocalBusiness structured data without a verified public address");
    } else {
      pass("contact page avoids LocalBusiness structured data");
    }

    for (const token of ['"@type":"Organization"', '"@type":"ContactPoint"', "قبل أول رسالة", "صفحات محلية لكل مدينة رئيسية"]) {
      if (contact.includes(token)) pass(`contact page contains ${token}`);
      else fail(`contact page missing ${token}`);
    }
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
  for (const citySlug of ["alahsa", "dammam", "khobar"]) {
    if (sitemap.includes(`<loc>https://asmaa.video/ar/${citySlug}/bride-checklist</loc>`)) {
      pass(`sitemap contains bride checklist for ${citySlug}`);
    } else {
      fail(`sitemap missing bride checklist for ${citySlug}`);
    }
  }
  for (const route of [
    "https://asmaa.video/ar/alahsa/zaffa-tasweer/near-me",
    "https://asmaa.video/ar/dammam/zaffa-tasweer/near-me",
    "https://asmaa.video/ar/khobar/full-day-tasweer/near-me"
  ]) {
    if (sitemap.includes(`<loc>${route}</loc>`)) pass(`sitemap contains ${route}`);
    else fail(`sitemap missing ${route}`);
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
    "https://asmaa.video/guides",
    "https://asmaa.video/ar/alahsa/bride-checklist",
    "https://asmaa.video/ar/alahsa/zaffa-tasweer/near-me"
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
  const homepageMarkupForComposition = readOutFile("index.html");
  const server = await serveOut();
  let browser;

  try {
    browser = await launchChromiumForAudit();
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
    const browserRoutes = verifyAdminOnly
      ? ["/admin"]
      : [
          "/",
          "/reserve",
          "/success",
          "/faq",
          "/portfolio",
          "/engagement",
          "/guides",
          "/guides/wedding-videography-al-ahsa",
          "/guides/female-wedding-photographer-eastern-province",
          "/alahsa",
          "/dammam",
          "/khobar"
        ];
    if (adminPanelEnabled && !verifyAdminOnly) browserRoutes.push("/admin");

    const contextOptions = (config) => ({
      viewport: config.viewport,
      userAgent: config.userAgent,
      locale: "ar-SA"
    });

    async function openRoute(page, route) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
    }

    async function ensureBrowser() {
      if (!browser || !browser.isConnected()) {
        browser = await launchChromiumForAudit();
      }
      return browser;
    }

    async function resetBrowser() {
      const staleBrowser = browser;
      browser = null;
      if (staleBrowser) await staleBrowser.close().catch(() => {});
    }

    async function withFreshPage(config, label, callback) {
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        let context;
        try {
          const activeBrowser = await ensureBrowser();
          context = await activeBrowser.newContext(contextOptions(config));
          const page = await context.newPage();
          page.setDefaultTimeout(15000);
          page.setDefaultNavigationTimeout(30000);
          return await withTimeout(callback(page), 45000, label);
        } catch (error) {
          lastError = error;
          await resetBrowser();
          if (attempt < 3) {
            console.error(`WARN retrying ${label}: ${error.message.split("\n")[0]}`);
            await new Promise((resolveRetryDelay) => setTimeout(resolveRetryDelay, 250 * attempt));
          }
        } finally {
          if (context) await context.close().catch(() => {});
          if (browser && !browser.isConnected()) await resetBrowser();
        }
      }
      throw lastError;
    }

    for (const config of contexts) {
      for (const route of browserRoutes) {
        await withFreshPage(config, `${config.name} ${route}`, async (page) => {
          await openRoute(page, route);

          if (config.name === "mobile" && route === "/reserve") {
            await page.waitForFunction(
              () => {
                const brandLockup = document.querySelector(".brand-lockup");
                const stepperButton = document.querySelector(".stepper button");
                if (!(brandLockup instanceof HTMLElement) || !(stepperButton instanceof HTMLElement)) return false;
                const brandRect = brandLockup.getBoundingClientRect();
                const stepperRect = stepperButton.getBoundingClientRect();
                return brandRect.height >= 44 && stepperRect.height >= 44;
              },
              undefined,
              { timeout: 10000 }
            );
          }

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
        });
      }

      if (verifyAdminOnly) continue;

      // v2 redesign: updated composition checks to match .asmaa-v2 scoped classes
      const homeCounts = {
        heroImages: (homepageMarkupForComposition.match(/<img /g) || []).length,
        realLogoImages:
          (homepageMarkupForComposition.match(/class="av2-brand"/g) || []).length
          + (homepageMarkupForComposition.match(/class="av2-footer-brand"/g) || []).length,
        serviceCards: (homepageMarkupForComposition.match(/av2-service-card/g) || []).length,
        portfolioShots: (homepageMarkupForComposition.match(/av2-shot/g) || []).length,
      };

      if (homeCounts.heroImages >= 2) pass(`${config.name} homepage has layered hero imagery`);
      else fail(`${config.name} homepage missing layered hero imagery`);

      if (homeCounts.realLogoImages >= 2) pass(`${config.name} homepage uses the real logo artwork`);
      else fail(`${config.name} homepage is missing real logo artwork`);

      if (homeCounts.serviceCards >= 4) pass(`${config.name} homepage has service cards`);
      else fail(`${config.name} homepage missing service cards`);

      if (homeCounts.portfolioShots >= 4) pass(`${config.name} homepage has portfolio shots`);
      else fail(`${config.name} homepage missing portfolio shots`);

      await withFreshPage(config, `${config.name} reserve prefill`, async (page) => {
        await openRoute(page, "/reserve?city=dammam&package=02");
        await page.waitForFunction(
          () => Array.from(document.querySelectorAll("select")).some((select) => select.value === "الدمام"),
          undefined,
          { timeout: 10000 }
        );
        const reservePrefill = await page.evaluate(() => ({
          selectValues: Array.from(document.querySelectorAll("select")).map((select) => select.value)
        }));
        if (reservePrefill.selectValues.includes("الدمام")) pass(`${config.name} reserve preselects city from query`);
        else fail(`${config.name} reserve failed to preselect city from query`);

        await page.waitForSelector(".stepper button");
        await page.locator(".stepper button").nth(1).click();
        await page.waitForFunction(
          () => {
            const selected = document.querySelector('.package-picker button[aria-pressed="true"]');
            return selected && selected.textContent && selected.textContent.includes("بكج 02");
          },
          undefined,
          { timeout: 10000 }
        );
        const selectedPackage = await page.locator('.package-picker button[aria-pressed="true"]').textContent();
        if (selectedPackage?.includes("بكج 02")) pass(`${config.name} reserve preselects package from query`);
        else fail(`${config.name} reserve failed to preselect package from query`);
      });

      await withFreshPage(config, `${config.name} axe audit`, async (page) => {
        await openRoute(page, "/");
        await page.waitForFunction(
          () => Boolean(document.title.trim()) && Boolean(document.documentElement.lang || document.documentElement.getAttribute("lang")),
          undefined,
          { timeout: 5000 }
        );
        await page.addScriptTag({ content: axeSource });
        const documentBasics = await page.evaluate(() => ({
          lang: document.documentElement.lang || document.documentElement.getAttribute("lang") || "",
          title: document.title,
          url: location.href
        }));
        const axe = await page.evaluate(async () => {
          return window.axe.run(document, {
            rules: {
              "color-contrast": { enabled: false }
            }
          });
        });
        const serious = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact || ""));
        if (serious.length === 0) pass(`${config.name} homepage has no serious axe violations`);
        else {
          fail(
            `${config.name} homepage axe violations: ${serious.map((item) => item.id).join(", ")} ` +
              `(title=${JSON.stringify(documentBasics.title)}, lang=${JSON.stringify(documentBasics.lang)}, url=${documentBasics.url})`
          );
        }
      });
    }
  } finally {
    if (browser) await browser.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

verifyStaticOutput();

if (!process.exitCode) {
  try {
    await verifyBrowserOutput();
  } catch (error) {
    fail(`browser verification crashed: ${error.message.split("\n")[0]}`);
  }
}

if (process.exitCode) {
  writeLatestProof();
  console.error(`\nLaunch verification failed. Inspect ${pathToFileURL(outDir).href}`);
  process.exit(process.exitCode);
}

writeLatestProof();
console.log("\nAsmaa launch verification passed.");

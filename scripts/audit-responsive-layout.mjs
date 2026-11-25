import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const origin = "https://www.fjxstudio.com";
const sitemapPath = path.resolve("dist/sitemap.xml");
const baseUrl = process.env.AUDIT_BASE_URL || "http://127.0.0.1:4173";
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const height = 900;

if (!fs.existsSync(sitemapPath)) {
  throw new Error("dist/sitemap.xml was not found. Run the production build first.");
}

const xml = fs.readFileSync(sitemapPath, "utf8");
const urls = [...xml.matchAll(/<loc>\\s*([^<]+?)\\s*<\\/loc>/gi)]
  .map((match) => match[1].trim().replaceAll("&amp;", "&"))
  .filter((url) => {
    try { return new URL(url).origin === origin; } catch { return false; }
  });
const pages = [...new Set(urls)].sort();
if (!pages.length) throw new Error("No same-origin URLs were found in dist/sitemap.xml.");

const browser = await chromium.launch({ headless: true });
const results = [];
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  page.setDefaultNavigationTimeout(25000);
  for (const url of pages) {
    const route = new URL(url).pathname;
    for (const width of widths) {
      const issues = [];
      try {
        await page.setViewportSize({ width, height });
        const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready.then(() => true));
        await page.waitForTimeout(180);
        const metrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const visible = [...document.querySelectorAll("body *")].filter((el) => {
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" &&
              Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
          });
          const outside = visible.filter((el) => {
            const r = el.getBoundingClientRect();
            return r.left < -2 || r.right > innerWidth + 2;
          }).slice(0, 12).map((el) => ({
            tag: el.tagName.toLowerCase(),
            selector: el.id ? "#" + el.id : el.className?.toString?.().split(" ").filter(Boolean).slice(0, 2).join(".") || "",
            left: Math.round(el.getBoundingClientRect().left),
            right: Math.round(el.getBoundingClientRect().right),
            width: Math.round(el.getBoundingClientRect().width)
          }));
          const clippedText = visible.filter((el) => {
            if (!el.children.length && el.textContent?.trim() && el.scrollWidth > el.clientWidth + 3) {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.height > 0;
            }
            return false;
          }).slice(0, 12).map((el) => ({
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || "").trim().slice(0, 70),
            clientWidth: el.clientWidth,
            scrollWidth: el.scrollWidth
          }));
          return {
            viewportWidth: innerWidth,
            documentWidth: Math.max(doc.scrollWidth, body?.scrollWidth || 0),
            documentHeight: Math.max(doc.scrollHeight, body?.scrollHeight || 0),
            outsideViewport: outside,
            clippedText
          };
        });
        if (!response || response.status() >= 400) issues.push({ type: "http-status", status: response?.status() ?? null });
        if (metrics.documentWidth > width + 2) issues.push({ type: "horizontal-overflow", documentWidth: metrics.documentWidth, viewportWidth: width });
        if (metrics.outsideViewport.length) issues.push({ type: "elements-outside-viewport", elements: metrics.outsideViewport });
        if (metrics.clippedText.length) issues.push({ type: "text-clipping-candidates", elements: metrics.clippedText });
        if (issues.length) {\n          const safeRoute = route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";\n          const screenshotDir = path.resolve("artifacts/screenshots");\n          fs.mkdirSync(screenshotDir, { recursive: true });\n          await page.screenshot({ path: path.join(screenshotDir, safeRoute + "-" + width + ".png"), fullPage: true });\n        }\n        results.push({ url, width, status: response?.status() ?? null, issues });
      } catch (error) {
        results.push({ url, width, status: null, issues: [{ type: "navigation-or-render-error", message: String(error).slice(0, 500) }] });
      }
    }
  }
} finally {
  await browser.close();
}

const failures = results.filter((result) => result.issues.length);
const summary = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  pageCount: pages.length,
  viewportWidths: widths,
  checksRun: results.length,
  pagesWithIssues: new Set(failures.map((item) => item.url)).size,
  issueCount: failures.reduce((sum, item) => sum + item.issues.length, 0),
  results
};
fs.mkdirSync("artifacts", { recursive: true });
fs.writeFileSync("artifacts/responsive-audit.json", JSON.stringify(summary, null, 2) + "\\n");
console.log(JSON.stringify({
  pageCount: summary.pageCount,
  viewportWidths: widths,
  checksRun: summary.checksRun,
  pagesWithIssues: summary.pagesWithIssues,
  issueCount: summary.issueCount,
  report: "artifacts/responsive-audit.json"
}, null, 2));

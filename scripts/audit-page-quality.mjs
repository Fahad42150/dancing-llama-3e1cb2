import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const files = [];

function collect(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(file);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(file);
  }
}
collect(publicDir);
const rootIndex = path.join(root, "index.html");
if (fs.existsSync(rootIndex)) files.push(rootIndex);

const issues = [];
const totals = {
  pages: files.length, missingTitle: 0, missingDescription: 0, missingViewport: 0,
  missingCanonical: 0, missingH1: 0, multipleH1: 0, duplicateIds: 0,
  images: 0, imagesMissingAlt: 0, imagesMissingDimensions: 0,
  videos: 0, videosMissingTitle: 0, videosMissingLazy: 0, videosWithoutResponsivePattern: 0, emptyMediaFrames: 0, imagesMissingSource: 0,
  localMediaMissing: 0, pagesWithHorizontalOverflowRisk: 0
};

function add(file, code, detail) {
  issues.push({ page: path.relative(root, file).split(path.sep).join("/"), code, detail });
}
function count(html, re) { return (html.match(re) || []).length; }
function attr(tag, name) {
  const attrs = [...tag.matchAll(/([^\s=]+)\s*=\s*(["'])(.*?)\2/gi)];
  const match = attrs.find(item => item[1].toLowerCase() === name.toLowerCase());
  return match ? match[3].trim() : null;
}
function plain(html) {
  return html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ").trim();
}
function mediaExists(src, file) {
  if (!src || /^(?:https?:|data:|blob:|#|\/\/)/i.test(src)) return true;
  const clean = src.split(/[?#]/)[0];
  const target = clean.startsWith("/")
    ? path.join(publicDir, clean.replace(/^\/+/, ""))
    : path.resolve(path.dirname(file), clean);
  return fs.existsSync(target);
}
function responsiveVideo(html, iframe) {
  const src = attr(iframe, "src") || "";
  if (!/youtube|youtu\.be|vimeo|wistia/i.test(src)) return true;
  const start = Math.max(0, html.indexOf(iframe) - 900);
  const end = Math.min(html.length, html.indexOf(iframe) + iframe.length + 300);
  const context = html.slice(start, end);
  return /aspect-ratio\s*:\s*16\s*\/\s*9|padding-top\s*:\s*56\.25%|position\s*:\s*absolute|width\s*=\s*["']100%["']|width\s*:\s*100%/i.test(context) ||
    /aspect-ratio\s*:\s*16\s*\/\s*9|padding-top\s*:\s*56\.25%|iframe\s*\{[^}]*position\s*:\s*absolute/i.test(html);
}

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const title = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const description = (html.match(/<meta\b[^>]*(?:name|property)=["'](?:description|og:description)["'][^>]*>/i) || [])[0];
  const h1 = count(html, /<h1\b/gi);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
  const duplicate = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  const iframes = [...html.matchAll(/<iframe\b[^>]*>/gi)].map(m => m[0]);
  const text = plain((html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i) || [])[1] || html);
  const relative = path.relative(root, file).split(path.sep).join("/");
  const isWatch = relative.includes("/watch/");
  const isService = !isWatch && /public\//.test(relative) && !/(?:blog|articles|portfolio|watch|services)\//.test(relative);

  if (!title.trim()) { totals.missingTitle++; add(file, "missing-title", "Page has no document title."); }
  if (!description || !attr(description, "content")) { totals.missingDescription++; add(file, "missing-meta-description", "Add a unique, useful meta description."); }
  if (!/name=["']viewport["']/i.test(html)) { totals.missingViewport++; add(file, "missing-viewport", "Mobile viewport meta tag is missing."); }
  if (!/rel=["']canonical["']/i.test(html)) { totals.missingCanonical++; add(file, "missing-canonical", "Canonical URL is missing."); }
  if (h1 === 0) { totals.missingH1++; add(file, "missing-h1", "Page needs one clear primary heading."); }
  if (h1 > 1) { totals.multipleH1++; add(file, "multiple-h1", "Found " + h1 + " H1 headings; confirm a single page-level heading."); }
  if (duplicate.length) { totals.duplicateIds++; add(file, "duplicate-ids", duplicate.join(", ")); }

  for (const img of images) {
    totals.images++;
    const src = attr(img, "src");
    const alt = attr(img, "alt");
    if (!src) { totals.imagesMissingSource++; add(file, "image-missing-source", "Image element has no src attribute."); }
    if (alt === null) { totals.imagesMissingAlt++; add(file, "image-missing-alt", src || "Image without src"); }
    if (!/\bwidth=/i.test(img) || !/\bheight=/i.test(img)) {
      totals.imagesMissingDimensions++;
      add(file, "image-missing-dimensions", src || "Image without intrinsic dimensions; review layout shift.");
    }
    if (src && !mediaExists(src, file)) { totals.localMediaMissing++; add(file, "missing-local-media", src); }
  }
  // Count only truly empty media containers. Populated wrappers may contain
  // nested same-tag elements, so broad non-greedy matching creates false positives.
  const emptyMediaFrames = [...html.matchAll(/<div\\b(?=[^>]*\\bclass=[\"'][^\"']*(?:video|media|embed)[^\"']*[\"'])[^>]*>\\s*<\\/div>/gi)];
  for (const frame of emptyMediaFrames) {
    totals.emptyMediaFrames++;
    add(file, "empty-media-frame", frame[0].slice(0, 180));
  }
  for (const iframe of iframes) {
    totals.videos++;
    if (!attr(iframe, "title")) { totals.videosMissingTitle++; add(file, "video-missing-title", attr(iframe, "src") || "iframe without title"); }
    if (!attr(iframe, "loading")) { totals.videosMissingLazy++; add(file, "video-missing-loading", attr(iframe, "src") || "iframe without loading strategy"); }
    if (!responsiveVideo(html, iframe)) { totals.videosWithoutResponsivePattern++; add(file, "video-responsive-wrapper", attr(iframe, "src") || "Video embed may not have a responsive 16:9 wrapper."); }
  }
  if (/width\s*:\s*100vw/i.test(html) && !/overflow-x\s*:\s*(?:hidden|clip)/i.test(html)) {
    totals.pagesWithHorizontalOverflowRisk++;
    add(file, "possible-horizontal-overflow", "100vw layout found without an explicit horizontal overflow safeguard.");
  }
  if (isService && text.split(/\s+/).filter(Boolean).length < 220) {
    add(file, "short-service-copy", "Service page has fewer than 220 visible words; review whether the page answers buyer questions adequately.");
  }
}

const report = { generatedAt: new Date().toISOString(), totals, issueCount: issues.length, issues };
const out = path.join(root, ".page-quality-audit.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2) + "\n");
console.log("[page-quality-audit] " + JSON.stringify(totals));
console.log("[page-quality-audit] " + issues.length + " review item(s); full report written to .page-quality-audit.json");

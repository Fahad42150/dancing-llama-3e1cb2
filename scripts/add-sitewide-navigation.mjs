import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const navId = "fjx-sitewide-primary-nav";

const nav = `
<nav id="${navId}" class="fjx-primary-nav" aria-label="Main navigation">
  <div class="fjx-primary-nav__inner">
    <a href="https://www.fjxstudio.com/#about">About</a>
    <a href="https://www.fjxstudio.com/services/">Services</a>
    <a href="https://www.fjxstudio.com/#portfolio">Portfolio</a>
    <a href="https://www.fjxstudio.com/articles/">Articles</a>
    <a href="https://www.fjxstudio.com/blog/">Blogs</a>
    <a href="https://www.fjxstudio.com/#pricing">Pricing</a>
    <a href="https://www.fjxstudio.com/#testimonials">Reviews</a>
    <a href="https://www.fjxstudio.com/#contact">Contact</a>
  </div>
</nav>
<style id="fjx-sitewide-primary-nav-css">
  html { scroll-padding-top: 76px; }
  .fjx-primary-nav { position:sticky; top:0; z-index:10000; width:100%; background:#17210f; border-bottom:1px solid rgba(255,255,255,.14); box-shadow:0 4px 16px rgba(0,0,0,.12); }
  .fjx-primary-nav__inner { width:min(100% - 32px,1200px); min-height:54px; margin:0 auto; display:flex; align-items:center; justify-content:center; gap:clamp(12px,2.2vw,30px); overflow-x:auto; scrollbar-width:thin; -webkit-overflow-scrolling:touch; }
  .fjx-primary-nav a { flex:0 0 auto; display:inline-flex; align-items:center; min-height:54px; color:#fff; font:650 14px/1.2 Inter,Arial,sans-serif; text-decoration:none; white-space:nowrap; border-bottom:3px solid transparent; padding:3px 0 0; }
  .fjx-primary-nav a:hover,.fjx-primary-nav a:focus-visible { color:#b7e43b; border-bottom-color:#b7e43b; outline-offset:3px; }
  @media(max-width:760px) { .fjx-primary-nav__inner { justify-content:flex-start; gap:22px; min-height:50px; } .fjx-primary-nav a { min-height:50px; font-size:13px; } }
</style>
`;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) out.push(full);
  }
  return out;
}

const files = [...walk(publicDir), path.join(root, "index.html")].filter(fs.existsSync);
let updated = 0;
let skipped = 0;
for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('id="' + navId + '"')) { skipped++; continue; }
  const bodyOpen = html.match(/<body\\b[^>]*>/i);
  if (!bodyOpen) continue;
  const insertAt = bodyOpen.index + bodyOpen[0].length;
  html = html.slice(0, insertAt) + "\\n" + nav + "\\n" + html.slice(insertAt);
  fs.writeFileSync(file, html, "utf8");
  updated++;
}
console.log("[sitewide-navigation] Added primary navigation to " + updated + " HTML page(s); " + skipped + " already had it.");

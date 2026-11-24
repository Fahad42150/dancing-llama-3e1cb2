import fs from "node:fs";
import path from "node:path";
const SITE="https://www.fjxstudio.com", PUBLIC=path.resolve("public"), WATCH=path.join(PUBLIC,"watch");
let videos=[
{id:"Vj_BSX5GKJo",slug:"inksoft-updated-add-product-workflow",title:"InkSoft Updated Add Product Workflow",description:"An InkSoft tutorial demonstrating the updated add-product workflow for preparing and maintaining products in an InkSoft store catalog."},
{id:"0PNYIQFbWEo",slug:"inksoft-store-setup-and-configuration",title:"Setting Up and Configuring an InkSoft Store",description:"An InkSoft walkthrough focused on setting up and configuring an online store, with an overview of the storefront setup workflow."},
{id:"_Eva3P9yD_s",slug:"inksoft-get-started-guide",title:"InkSoft Get Started Guide",description:"An introductory InkSoft guide covering the platform's getting-started workflow for businesses setting up and managing an online store."},
{id:"SjJHmcJUK7c",slug:"ecommerce-inventory-management-overview",title:"eCommerce Inventory Management Services | FJX Studio",description:"An overview of FJX Studio eCommerce inventory management support, including SKU records, stock data updates, product availability, and inventory administration."},
{id:"uSNRXjJ4TN4",slug:"inksoft-product-pricing-guide",title:"InkSoft Product Pricing Guide",description:"An InkSoft tutorial about product pricing setup and pricing-grid workflows for online apparel and merchandise stores."},
{id:"UNZnBJAXynU",slug:"promotional-products-store-management-overview",title:"Promotional Products Store Management | FJX Studio",description:"An overview of FJX Studio promotional products store management, including branded merchandise catalogs, product uploads, artwork coordination, pricing updates, and store administration."},
{id:"bErj1J7rQvc",slug:"canva-graphic-design-services-overview",title:"Canva Graphic Design Services | FJX Studio",description:"An overview of FJX Studio Canva graphic design services for branded marketing graphics, business visuals, promotional designs, and editable Canva assets."},
{id:"Byk9Qkxuk4s",slug:"email-management-virtual-assistant-overview",title:"Email Management Virtual Assistant | FJX Studio",description:"An overview of FJX Studio email management virtual assistant support, including inbox organization, customer email handling, follow-ups, and routine communication administration."}
];
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function page(v){
const url=SITE+"/watch/"+v.slug+"/", player="https://www.youtube-nocookie.com/embed/"+v.id, thumb="https://i.ytimg.com/vi/"+v.id+"/hqdefault.jpg", title=esc(v.title), desc=esc(v.description);
return [
"<!doctype html>","<html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>",
"<title>"+title+" | FJX Studio</title><meta name='description' content='"+desc+"'><meta name='robots' content='index,follow,max-video-preview:-1'>",
"<link rel='canonical' href='"+url+"'><meta property='og:type' content='video.other'><meta property='og:title' content='"+title+" | FJX Studio'>",
"<meta property='og:description' content='"+desc+"'><meta property='og:url' content='"+url+"'><meta property='og:image' content='"+thumb+"'><meta property='og:video' content='"+player+"'><meta property='og:video:type' content='text/html'>",
"<meta name='twitter:card' content='player'><meta name='twitter:title' content='"+title+" | FJX Studio'><meta name='twitter:description' content='"+desc+"'><meta name='twitter:image' content='"+thumb+"'><meta name='twitter:player' content='"+player+"'><meta name='twitter:player:width' content='1280'><meta name='twitter:player:height' content='720'>",
"<style>*{box-sizing:border-box}html{background:#101510}body{margin:0;min-width:320px;background:#101510;color:#f7faf5;font-family:Arial,Helvetica,sans-serif}.watch-shell{width:min(1100px,calc(100% - 40px));margin:0 auto;padding:36px 0 52px}.watch-brand{display:inline-block;margin-bottom:28px;color:#b4ec7c;text-decoration:none;font-size:18px;font-weight:800}.watch-label{margin:0 0 10px;color:#b4ec7c;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}h1{max-width:900px;margin:0 0 14px;font-size:clamp(27px,5vw,44px);line-height:1.15}.watch-description{max-width:820px;margin:0 0 24px;color:#c7d0c4;font-size:17px;line-height:1.65}.watch-player{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:#000;box-shadow:0 18px 54px rgba(0,0,0,.35)}.watch-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.watch-footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;margin-top:24px;padding-top:20px;border-top:1px solid #344034;color:#aeb9aa;font-size:14px}.watch-footer a{color:#b4ec7c;text-decoration:none}.watch-footer a:hover{text-decoration:underline}@media(max-width:600px){.watch-shell{width:calc(100% - 28px);padding:24px 0 36px}.watch-player{border-radius:10px}.watch-description{font-size:15px}}</style>",
"</head><body><main class='watch-shell'><a class='watch-brand' href='"+SITE+"/' aria-label='FJX Studio home'>FJX Studio</a><p class='watch-label'>Video</p><h1>"+title+"</h1><p class='watch-description'>"+desc+"</p>",
"<div class='watch-player'><iframe src='"+player+"' title='"+title+"' width='1280' height='720' loading='eager' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>",
"<div class='watch-footer'><span>Video hosted on YouTube and presented by FJX Studio.</span><a href='"+SITE+"/'>Explore FJX Studio</a></div></main></body></html>"
].join("\n");
}
function collect(dir,out){if(!fs.existsSync(dir))return out;for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory()){if(f!==WATCH)collect(f,out);}else if(e.isFile()&&e.name.toLowerCase().endsWith(".html"))out.push(f);}return out;}
function linkPage(file){
let html=fs.readFileSync(file,"utf8");
html=html.replace(/<section\b[^>]*id=["']fjx-video-watch-links["'][\s\S]*?<\/section>/i,"");
const frames=html.match(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi)||[], ids=new Set();
frames.forEach(frame=>{const src=(frame.match(/\bsrc=["']([^"']+)["']/i)||[])[1]||"";videos.forEach(v=>{if(src.indexOf("/embed/"+v.id)!==-1)ids.add(v.id);});});
if(!ids.size)return;
const links=videos.filter(v=>ids.has(v.id)).map(v=>"<li><a href='/watch/"+v.slug+"/'>"+esc(v.title)+" — watch on FJX Studio</a></li>").join("");
const block="<section id='fjx-video-watch-links' class='fjx-video-watch-links' aria-label='Watch video on FJX Studio'><h2>Watch this video on FJX Studio</h2><ul>"+links+"</ul></section><style>.fjx-video-watch-links{max-width:1100px;margin:24px auto;padding:18px 20px;border:1px solid #e5eadf;border-radius:12px;background:#f7faf3;color:#263126}.fjx-video-watch-links h2{margin:0 0 10px;font-size:16px;line-height:1.35}.fjx-video-watch-links ul{margin:0;padding-left:20px}.fjx-video-watch-links li+li{margin-top:7px}.fjx-video-watch-links a{color:#426d20;font-weight:700;text-decoration:underline;text-underline-offset:3px}@media(max-width:640px){.fjx-video-watch-links{margin:18px 14px;padding:16px}}</style>";
if(/<\/main>/i.test(html))html=html.replace(/<\/main>/i,block+"\n</main>");else html=html.replace(/<\/body>/i,block+"\n</body>");
fs.writeFileSync(file,html);
}
const htmlFiles=collect(PUBLIC,[]);
const rootIndex=path.resolve("index.html");
if(fs.existsSync(rootIndex))htmlFiles.push(rootIndex);

// Only explicitly curated videos are promoted to dedicated watch pages.
// Ordinary embedded videos remain supporting content on their original pages.
fs.mkdirSync(WATCH,{recursive:true});
videos.forEach(v=>{const d=path.join(WATCH,v.slug);fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,"index.html"),page(v));});
htmlFiles.forEach(linkPage);
const entries=videos.map(v=>"<url><loc>"+SITE+"/watch/"+v.slug+"/</loc><video:video><video:thumbnail_loc>https://i.ytimg.com/vi/"+v.id+"/hqdefault.jpg</video:thumbnail_loc><video:title><![CDATA["+v.title+"]]></video:title><video:description><![CDATA["+v.description+"]]></video:description><video:player_loc>https://www.youtube-nocookie.com/embed/"+v.id+"</video:player_loc></video:video></url>").join("\n");
fs.writeFileSync(path.join(PUBLIC,"video-sitemap.xml"),"<?xml version='1.0' encoding='UTF-8'?>\n<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:video='http://www.google.com/schemas/sitemap-video/1.1'>\n"+entries+"\n</urlset>\n");
const smPath=path.join(PUBLIC,"sitemap.xml");
if(fs.existsSync(smPath)){let sm=fs.readFileSync(smPath,"utf8");const missing=videos.filter(v=>sm.indexOf(SITE+"/watch/"+v.slug+"/")===-1);if(missing.length){const locs=missing.map(v=>"<url><loc>"+SITE+"/watch/"+v.slug+"/</loc></url>").join("\n");sm=sm.replace(/<\/urlset>/i,locs+"\n</urlset>");fs.writeFileSync(smPath,sm);}}
const rp=path.join(PUBLIC,"robots.txt");let robots=fs.existsSync(rp)?fs.readFileSync(rp,"utf8"):"User-agent: *\nAllow: /\n";if(robots.indexOf(SITE+"/video-sitemap.xml")===-1)robots=robots.trim()+"\nSitemap: "+SITE+"/video-sitemap.xml\n";fs.writeFileSync(rp,robots);
console.log("Generated "+videos.length+" dedicated video watch pages and a video sitemap; added watch-page links to "+htmlFiles.length+" HTML pages.");

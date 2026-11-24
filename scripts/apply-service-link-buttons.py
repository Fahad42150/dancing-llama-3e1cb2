#!/usr/bin/env python3
"""Apply one consistent responsive button system to related-service links on service pages."""
from pathlib import Path
import re

STYLE_ID = 'fjx-universal-related-service-buttons'
DIRECTORY_STYLE_ID = 'fjx-services-directory-button-system'
STYLE = r"""<style id="fjx-universal-related-service-buttons">
/* Standard related-service link cards across every standalone service page. */
main .links {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  grid-auto-rows: 1fr;
  align-items: stretch;
  gap: 14px !important;
}
main .links a {
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100%;
  min-width: 0;
  min-height: 72px;
  height: 100%;
  padding: 16px 19px !important;
  gap: 12px !important;
  border: 1px solid #dfe6d9 !important;
  border-radius: 13px !important;
  background: #fff !important;
  color: #202326 !important;
  font-family: Inter, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700 !important;
  line-height: 1.45;
  text-decoration: none !important;
  white-space: normal !important;
  overflow-wrap: anywhere;
  word-break: normal;
  box-shadow: 0 2px 8px rgba(32, 35, 38, .045);
  transition: background-color .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;
}
main .links a::after {
  content: "→";
  display: inline-flex;
  flex: 0 0 22px;
  width: 22px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  color: #5b8b30;
  font-size: 20px;
  line-height: 1;
}
main .links a:hover {
  background: #f6faef !important;
  border-color: #9fce79 !important;
  color: #202326 !important;
  box-shadow: 0 8px 20px rgba(32, 35, 38, .09);
  transform: translateY(-2px);
}
main .links a:focus-visible {
  outline: 3px solid #679d37 !important;
  outline-offset: 3px;
  box-shadow: 0 0 0 5px rgba(103, 157, 55, .12);
}
@media (max-width: 900px) {
  main main .links { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
}
@media (max-width: 600px) {
  main main .links { grid-template-columns: minmax(0, 1fr) !important; grid-auto-rows: auto; gap: 10px !important; }
  main .links a { min-height: 60px; height: auto; padding: 14px 16px !important; }
}
@media (prefers-reduced-motion: reduce) {
  main .links a { transition: none; }
  main .links a:hover { transform: none; }
}
</style>
"""

DIRECTORY_STYLE = r"""<style id="fjx-services-directory-button-system">
/* Re-applied on every production build so newly generated directory cards match. */
main .grid,
main .fjx-featured-button-grid {
  display:grid !important;
  grid-template-columns:repeat(3,minmax(0,1fr)) !important;
  grid-auto-rows:1fr;
  align-items:stretch !important;
  gap:16px !important;
}
main .grid > a,
main .fjx-featured-button-grid > a {
  box-sizing:border-box !important;
  display:flex !important;
  align-items:center !important;
  justify-content:space-between !important;
  width:100% !important;
  min-width:0 !important;
  min-height:76px !important;
  height:100% !important;
  margin:0 !important;
  padding:17px 20px !important;
  gap:14px !important;
  border:1px solid #dfe6d9 !important;
  border-radius:13px !important;
  background:#fff !important;
  color:#202326 !important;
  font:700 15px/1.45 Inter,Arial,sans-serif !important;
  text-align:left !important;
  text-decoration:none !important;
  white-space:normal !important;
  overflow-wrap:anywhere !important;
  word-break:normal !important;
  box-shadow:0 2px 8px rgba(32,35,38,.05) !important;
  transition:background-color .18s ease,border-color .18s ease,box-shadow .18s ease,transform .18s ease !important;
}
main .grid > a > span:first-child,
main .fjx-featured-button-grid > a > span:first-child {
  flex:1 1 auto !important; min-width:0 !important; white-space:normal !important;
  overflow-wrap:anywhere !important; word-break:normal !important;
}
main .grid > a > span:last-child,
main .fjx-featured-button-grid > a > span:last-child {
  display:inline-flex !important; flex:0 0 22px !important; width:22px !important;
  min-width:22px !important; align-items:center !important; justify-content:center !important;
  margin-left:auto !important; color:#5b8b30 !important; font-size:20px !important;
}
main .grid > a:hover,
main .fjx-featured-button-grid > a:hover {
  background:#f6faef !important; border-color:#9fce79 !important;
  color:#202326 !important; box-shadow:0 8px 20px rgba(32,35,38,.09) !important;
  transform:translateY(-2px);
}
main .grid > a:focus-visible,
main .fjx-featured-button-grid > a:focus-visible {
  outline:3px solid #679d37 !important; outline-offset:3px !important;
}
@media(max-width:900px) {
  main .grid, main .fjx-featured-button-grid {grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:14px !important;}
}
@media(max-width:600px) {
  main .grid, main .fjx-featured-button-grid {grid-template-columns:minmax(0,1fr) !important;grid-auto-rows:auto;gap:11px !important;}
  main .grid > a, main .fjx-featured-button-grid > a {min-height:62px !important;height:auto !important;padding:15px 16px !important;font-size:14px !important;}
}
@media(prefers-reduced-motion:reduce) {
  main .grid > a, main .fjx-featured-button-grid > a {transition:none !important;}
  main .grid > a:hover, main .fjx-featured-button-grid > a:hover {transform:none;}
}
</style>
"""

root = Path(__file__).resolve().parents[1]
excluded = {"blog", "articles", "pricing"}
updated = 0
skipped = 0

for path in sorted((root / "public").glob("*/index.html")):
    if path.parent.name in excluded:
        skipped += 1
        continue
    html = path.read_text(encoding="utf-8")
    original = html
    if path.parent.name == "services":
        html = re.sub(
            rf'<style\b[^>]*id=["\']{re.escape(DIRECTORY_STYLE_ID)}["\'][^>]*>[\s\S]*?</style\s*>',
            '',
            html,
            flags=re.IGNORECASE,
        )
        if re.search(r'<main\b', html, flags=re.IGNORECASE):
            head_end_for_directory = re.search(r'</head\s*>', html, flags=re.IGNORECASE)
            if head_end_for_directory:
                html = html[:head_end_for_directory.start()] + DIRECTORY_STYLE + "\n" + html[head_end_for_directory.start():]
        if html != original:
            path.write_text(html, encoding="utf-8")
            updated += 1
        continue
    # Only target standalone service pages with related-service link collections.
    if not re.search(r'class=["\'][^"\']*\blinks\b[^"\']*["\']', html, flags=re.IGNORECASE):
        continue
    # Replace any prior version of this exact fix so reruns stay idempotent.
    html = re.sub(
        rf'<style\b[^>]*id=["\']{re.escape(STYLE_ID)}["\'][^>]*>[\s\S]*?</style\s*>',
        '',
        html,
        flags=re.IGNORECASE,
    )
    head_end = re.search(r'</head\s*>', html, flags=re.IGNORECASE)
    if not head_end:
        continue
    html = html[:head_end.start()] + STYLE + "\n" + html[head_end.start():]
    if html != original:
        path.write_text(html, encoding="utf-8")
        updated += 1

print(f"Applied consistent related-service button styling to {updated} service pages.")
print(f"Skipped {skipped} non-service directory pages.")

#!/usr/bin/env python3
"""Add the site-wide Book Now CTA to every standalone HTML page."""
from pathlib import Path

BOOK_URL = "https://calendar.app.google/S23mhjJCcXo7M2HE7"
MARKER = 'id="fjx-book-now-sitewide"'
CTA = f"""
<a {MARKER} href="{BOOK_URL}" target="_blank" rel="noopener noreferrer"
   aria-label="Book Now - opens the FJX Studio booking calendar"
   style="position:fixed;right:22px;bottom:22px;z-index:2147483000;display:inline-flex;align-items:center;justify-content:center;padding:14px 24px;border-radius:999px;background:#b7e43b;color:#17210b;font:700 15px/1.2 Arial,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.22);">
  Book Now
</a>
"""

root = Path(__file__).resolve().parents[1]
targets = [root / "index.html", *sorted((root / "public").rglob("*.html"))]
changed = 0
for path in targets:
    if not path.is_file():
        continue
    html = path.read_text(encoding="utf-8")
    if MARKER in html or "</body>" not in html.lower():
        continue
    pos = html.lower().rfind("</body>")
    html = html[:pos] + CTA + "\n" + html[pos:]
    path.write_text(html, encoding="utf-8")
    changed += 1
print(f"Added Book Now CTA to {changed} HTML pages.")

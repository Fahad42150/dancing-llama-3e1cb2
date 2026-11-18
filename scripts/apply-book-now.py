#!/usr/bin/env python3
"""Ensure every standalone HTML page has a Book Now link in its header."""
from pathlib import Path
import re

BOOK_URL = "https://calendar.app.google/S23mhjJCcXo7M2HE7"
FLOAT_MARKER = 'id="fjx-book-now-sitewide"'
NAV_MARKER = 'id="fjx-book-now-nav"'

FLOAT_CTA = f"""
<a {FLOAT_MARKER} href="{BOOK_URL}" target="_blank" rel="noopener noreferrer"
   aria-label="Book Now - opens the FJX Studio booking calendar"
   style="position:fixed;right:22px;bottom:22px;z-index:2147483000;display:inline-flex;align-items:center;justify-content:center;padding:14px 24px;border-radius:999px;background:#b7e43b;color:#17210b;font:700 15px/1.2 Arial,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.22);">
  Book Now
</a>
"""
NAV_CTA = f"""
<a {NAV_MARKER} href="{BOOK_URL}" target="_blank" rel="noopener noreferrer"
   aria-label="Book Now - opens the FJX Studio booking calendar"
   style="position:absolute;top:12px;right:clamp(16px,calc((100vw - 1120px)/2),64px);z-index:1000;display:inline-flex;align-items:center;justify-content:center;padding:10px 18px;border-radius:10px;background:#9fe870;color:#17210f;font:800 14px/1.2 Arial,sans-serif;text-decoration:none;white-space:nowrap;">
  Book Now
</a>
"""

root = Path(__file__).resolve().parents[1]
targets = [root / "index.html", *sorted((root / "public").rglob("*.html"))]
nav_changed = 0
floating_changed = 0

for path in targets:
    if not path.is_file():
        continue
    html = path.read_text(encoding="utf-8")
    original = html

    if NAV_MARKER not in html:
        match = re.search(r"</header\s*>", html, flags=re.IGNORECASE)
        if match:
            html = html[:match.start()] + NAV_CTA + "\n" + html[match.start():]
            if "<head" in html.lower():
                head_end = re.search(r"</head\s*>", html, flags=re.IGNORECASE)
                if head_end and "fjx-book-now-header-position" not in html:
                    css = "<style id=\"fjx-book-now-header-position\">header:first-of-type{position:relative}</style>\n"
                    html = html[:head_end.start()] + css + html[head_end.start():]
            nav_changed += 1

    if FLOAT_MARKER not in html and re.search(r"</body\s*>", html, flags=re.IGNORECASE):
        body_end = list(re.finditer(r"</body\s*>", html, flags=re.IGNORECASE))[-1]
        html = html[:body_end.start()] + FLOAT_CTA + "\n" + html[body_end.start():]
        floating_changed += 1

    if html != original:
        path.write_text(html, encoding="utf-8")

print(f"Added Book Now navigation links to {nav_changed} HTML pages.")
print(f"Added floating Book Now links to {floating_changed} additional HTML pages.")

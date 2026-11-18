#!/usr/bin/env python3
"""Ensure every standalone HTML page has a Book Now link in its header."""
from pathlib import Path
import re

BOOK_URL = "https://calendar.app.google/S23mhjJCcXo7M2HE7"
FLOAT_MARKER = 'id="fjx-book-now-sitewide"'
NAV_MARKER = 'id="fjx-book-now-nav"'

TAWK_WIDGET = """<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6afdc8e5723f713cce6b7ad0/1k7nlhgh1';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
"""

FLOAT_CTA = f"""
<a {FLOAT_MARKER} href="{BOOK_URL}" target="_blank" rel="noopener noreferrer"
   aria-label="Book Now - opens the FJX Studio booking calendar"
   style="position:fixed;left:22px;right:auto;bottom:22px;z-index:2147483000;display:inline-flex;align-items:center;justify-content:center;padding:14px 24px;border-radius:999px;background:#b7e43b;color:#17210b;font:700 15px/1.2 Arial,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.22);">
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
targets = sorted(
    path for path in root.rglob("*.html")
    if not any(part in {".git", "node_modules", "dist"} for part in path.relative_to(root).parts)
)
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

    if "embed.tawk.to/6afdc8e5723f713cce6b7ad0/1k7nlhgh1" not in html:
        body_matches = list(re.finditer(r"</body\s*>", html, flags=re.IGNORECASE))
        if body_matches:
            body_end = body_matches[-1]
            html = html[:body_end.start()] + TAWK_WIDGET + "\n" + html[body_end.start():]

    if FLOAT_MARKER not in html and re.search(r"</body\s*>", html, flags=re.IGNORECASE):
        body_end = list(re.finditer(r"</body\s*>", html, flags=re.IGNORECASE))[-1]
        html = html[:body_end.start()] + FLOAT_CTA + "\n" + html[body_end.start():]
        floating_changed += 1
    elif FLOAT_MARKER in html:
        # Keep the floating Book Now CTA on the left, opposite the Tawk.to launcher.
        html = re.sub(
            r'(<a\s+id="fjx-book-now-sitewide"[^>]*style=")[^"]*(")',
            r'\g<1>position:fixed;left:22px;right:auto;bottom:22px;z-index:2147483000;display:inline-flex;align-items:center;justify-content:center;padding:14px 24px;border-radius:999px;background:#b7e43b;color:#17210b;font:700 15px/1.2 Arial,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.22);\g<2>',
            html,
            flags=re.IGNORECASE,
        )

    if html != original:
        path.write_text(html, encoding="utf-8")

print(f"Added Book Now navigation links to {nav_changed} HTML pages.")
print(f"Added floating Book Now links to {floating_changed} additional HTML pages.")
print("Ensured the Tawk.to chat widget is installed on every HTML page.")

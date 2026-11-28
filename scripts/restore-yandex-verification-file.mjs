import fs from "node:fs";
import path from "node:path";

// Restore the Yandex ownership-verification file after all HTML enhancement
// scripts have run. Vite then copies this exact file from public/ unchanged.
const file = path.join(process.cwd(), "public", "cd91a0d7e7a6ba0e.html");
const content = '<html>\n    <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n    </head>\n    <body>Verification: cd91a0d7e7a6ba0e</body>\n</html>\n';

fs.writeFileSync(file, content, "utf8");
console.log("[yandex-verification] Restored exact Yandex verification file.");

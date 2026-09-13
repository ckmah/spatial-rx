#!/usr/bin/env node
/**
 * Concatenate per-widget Vite CSS outputs into the shared widgets.css that
 * Python resolves via spatial_rx._assets.widget_css().
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const bundled = path.resolve(rootDir, "../../spatial_rx/static/bundled");
const widgets = ["gallery", "landmarks", "polyrender"];
const parts = [];

for (const name of widgets) {
  const cssPath = path.join(bundled, `${name}.css`);
  if (!fs.existsSync(cssPath)) {
    console.warn(`merge-widget-css: missing ${cssPath}`);
    continue;
  }
  parts.push(`/* --- ${name} --- */\n` + fs.readFileSync(cssPath, "utf8"));
}

if (!parts.length) {
  console.error("merge-widget-css: no per-widget CSS files found");
  process.exit(1);
}

const out = path.join(bundled, "widgets.css");
fs.writeFileSync(out, parts.join("\n"), "utf8");
console.log(`Wrote ${out} (${parts.length} widgets)`);

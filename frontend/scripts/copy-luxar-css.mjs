import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const bundled = path.resolve(rootDir, "../../spatial_rx/static/bundled");
const src = path.resolve(
  rootDir,
  "../node_modules/@luxar/viewer/dist/lib/luxar-viewer.css",
);
const dest = path.join(bundled, "luxar.css");

if (!fs.existsSync(src)) {
  console.error("Missing @luxar/viewer CSS at", src);
  process.exit(1);
}

fs.mkdirSync(bundled, { recursive: true });
fs.copyFileSync(src, dest);
console.log("Copied", path.basename(src), "->", dest);

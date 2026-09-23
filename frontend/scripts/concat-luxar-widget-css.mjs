import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const bundled = path.resolve(rootDir, "../../spatial_rx/static/bundled");
const widgetsCss = path.join(bundled, "widgets.css");
const luxarCss = path.join(bundled, "luxar.css");
const out = path.join(bundled, "luxar-widget.css");

if (!fs.existsSync(widgetsCss) || !fs.existsSync(luxarCss)) {
  console.error("Missing widgets.css or luxar.css under", bundled);
  process.exit(1);
}

fs.writeFileSync(
  out,
  `${fs.readFileSync(widgetsCss, "utf8")}\n${fs.readFileSync(luxarCss, "utf8")}`,
);

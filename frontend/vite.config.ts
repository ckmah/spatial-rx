import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(rootDir, "..");
const devDir = path.resolve(rootDir, "dev");
const outDir = path.resolve(repoRoot, "spatial_rx/static/bundled");

/** One entry per anywidget that uses shadcn/React. */
const widgetEntries = {
  gallery: path.resolve(rootDir, "src/widgets/gallery/index.tsx"),
  landmarks: path.resolve(rootDir, "src/widgets/landmarks/index.tsx"),
  polyrender: path.resolve(rootDir, "src/widgets/polyrender/index.tsx"),
};

const buildWidget = process.env.SPATIAL_RX_BUILD_WIDGET;
if (!buildWidget || !(buildWidget in widgetEntries)) {
  throw new Error(
    "Set SPATIAL_RX_BUILD_WIDGET to one of: " +
      Object.keys(widgetEntries).join(", ") +
      " (anywidget needs one fully-inlined .mjs per widget).",
  );
}
const entries = {
  [buildWidget]: widgetEntries[buildWidget as keyof typeof widgetEntries],
};

const sharedResolve = {
  alias: {
    "@": path.resolve(rootDir, "src"),
    "@deck.gl/core": path.resolve(rootDir, "node_modules/@deck.gl/core"),
    "@deck.gl/layers": path.resolve(rootDir, "node_modules/@deck.gl/layers"),
    "@deck.gl/extensions": path.resolve(rootDir, "node_modules/@deck.gl/extensions"),
    "@deck.gl/widgets": path.resolve(rootDir, "node_modules/@deck.gl/widgets"),
  },
};

const sharedServer = {
  fs: { allow: [repoRoot] },
};

/** After each single-widget build, refresh shared widgets.css (full merge when possible). */
function mergeWidgetCssPlugin() {
  return {
    name: "merge-widget-css",
    closeBundle() {
      const names = Object.keys(widgetEntries);
      const parts: string[] = [];
      for (const name of names) {
        const cssPath = path.join(outDir, `${name}.css`);
        if (fs.existsSync(cssPath)) {
          parts.push(`/* --- ${name} --- */\n` + fs.readFileSync(cssPath, "utf8"));
        }
      }
      if (!parts.length) {
        const fallback = path.join(outDir, `${buildWidget}.css`);
        if (fs.existsSync(fallback)) {
          fs.copyFileSync(fallback, path.join(outDir, "widgets.css"));
        }
        return;
      }
      fs.writeFileSync(path.join(outDir, "widgets.css"), parts.join("\n"), "utf8");
    },
  };
}

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: devDir,
      plugins: [react(), tailwindcss()],
      resolve: sharedResolve,
      server: sharedServer,
    };
  }

  return {
    plugins: [react(), tailwindcss(), mergeWidgetCssPlugin()],
    resolve: sharedResolve,
    server: sharedServer,
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    build: {
      outDir,
      // Gallery is first in `npm run build`; later widgets must not wipe siblings.
      emptyOutDir: buildWidget === "gallery",
      lib: {
        entry: entries,
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          entryFileNames: "[name].mjs",
          inlineDynamicImports: true,
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
              // Per-widget CSS; mergeWidgetCssPlugin concatenates to widgets.css.
              return `${buildWidget}.css`;
            }
            return "[name][extname]";
          },
        },
      },
    },
  };
});

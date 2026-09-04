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
};

const buildWidget = process.env.SPATIAL_RX_BUILD_WIDGET;
const entries =
  buildWidget && buildWidget in widgetEntries
    ? { [buildWidget]: widgetEntries[buildWidget as keyof typeof widgetEntries] }
    : widgetEntries;
const singleWidget = Object.keys(entries).length === 1;

const sharedResolve = {
  alias: {
    "@": path.resolve(rootDir, "src"),
  },
};

const sharedServer = {
  fs: { allow: [repoRoot] },
};

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
    plugins: [react(), tailwindcss()],
    resolve: sharedResolve,
    server: sharedServer,
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    build: {
      outDir,
      emptyOutDir: !buildWidget || buildWidget === "gallery",
      lib: {
        entry: entries,
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          entryFileNames: "[name].mjs",
          inlineDynamicImports: singleWidget,
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
              return "widgets.css";
            }
            return "[name][extname]";
          },
        },
      },
    },
  };
});

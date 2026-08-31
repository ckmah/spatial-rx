import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(rootDir, "../spatial_rx/static/bundled");

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

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  // Engine + vanilla CSS live outside frontend/; allow resolve during build.
  server: {
    fs: { allow: [path.resolve(rootDir, "..")] },
  },
  define:
    command === "build"
      ? { "process.env.NODE_ENV": JSON.stringify("production") }
      : undefined,
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
        // anywidget loads each _esm as a blob URL; extra chunks cannot resolve.
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
}));

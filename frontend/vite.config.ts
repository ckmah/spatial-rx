import path from "node:path";
import { fileURLToPath } from "node:url";

import anywidget from "@anywidget/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(rootDir, "../spatial_rx/static/bundled");

/** One entry per anywidget that uses shadcn/React. */
const widgetEntries = {
  gallery: path.resolve(rootDir, "src/widgets/gallery/index.tsx"),
};

export default defineConfig({
  plugins: [react(), tailwindcss(), anywidget()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    lib: {
      entry: widgetEntries,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].mjs",
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
            return "widgets.css";
          }
          return "[name][extname]";
        },
      },
    },
  },
});

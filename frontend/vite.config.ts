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
  "volume-cube": path.resolve(rootDir, "src/widgets/volume-cube/index.tsx"),
  gallery: path.resolve(rootDir, "src/widgets/gallery/index.tsx"),
  landmarks: path.resolve(rootDir, "src/widgets/landmarks/index.tsx"),
};

const buildWidget = process.env.SPATIAL_RX_BUILD_WIDGET;
const entries =
  buildWidget && buildWidget in widgetEntries
    ? { [buildWidget]: widgetEntries[buildWidget as keyof typeof widgetEntries] }
    : widgetEntries;
const singleWidget = Object.keys(entries).length === 1;

const vivBundle =
  buildWidget === "volume-cube" || process.env.DEV_WIDGET === "volume-cube";
const harnessRoot =
  process.env.DEV_WIDGET === "volume-cube"
    ? path.resolve(devDir, "volume-cube")
    : devDir;

// Viv 0.21 ships deck.gl 9.2 / luma.gl 9.2. The landmarks widget pins 9.1.
// Resolving the root copies into the volume cube blanks the raycaster.
const vivNested = path.resolve(rootDir, "node_modules/@hms-dbmi/viv/node_modules");
const vivPackages = [
  "@deck.gl/core",
  "@deck.gl/layers",
  "@deck.gl/extensions",
  "@deck.gl/widgets",
  "@deck.gl/mesh-layers",
  "@luma.gl/constants",
  "@luma.gl/core",
  "@luma.gl/engine",
  "@luma.gl/shadertools",
  "@luma.gl/webgl",
];

const sharedResolve = {
  alias: {
    "@": path.resolve(rootDir, "src"),
    ...(vivBundle
      ? Object.fromEntries(
          vivPackages.map((name) => [name, path.resolve(vivNested, name)]),
        )
      : {
          "@deck.gl/core": path.resolve(rootDir, "node_modules/@deck.gl/core"),
          "@deck.gl/layers": path.resolve(rootDir, "node_modules/@deck.gl/layers"),
          "@deck.gl/extensions": path.resolve(rootDir, "node_modules/@deck.gl/extensions"),
          "@deck.gl/widgets": path.resolve(rootDir, "node_modules/@deck.gl/widgets"),
          "@thi.ng/geom-accel": path.resolve(rootDir, "node_modules/@thi.ng/geom-accel"),
          "polygon-clipping": path.resolve(
            rootDir,
            "node_modules/polygon-clipping/dist/polygon-clipping.esm.js",
          ),
        }),
  },
};

const sharedServer = {
  fs: { allow: [repoRoot] },
};

// Viv's nested deck.gl 9.2 must not be re-optimized with the landmarks 9.1 aliases.
const cacheDir = path.resolve(
  rootDir,
  vivBundle ? "node_modules/.vite-volume-cube" : "node_modules/.vite",
);

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: harnessRoot,
      // Missing OME-Zarr keys must 404. SPA fallback serves index.html (200),
      // and zarrita then fails to parse it instead of opening the v2 store.
      appType: process.env.DEV_WIDGET === "volume-cube" ? "mpa" : "spa",
      plugins: [react(), tailwindcss()],
      resolve: sharedResolve,
      cacheDir,
      optimizeDeps: vivBundle ? undefined : { exclude: ["@hms-dbmi/viv"] },
      server: sharedServer,
    };
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: sharedResolve,
    cacheDir,
    server: sharedServer,
    // Browser ESM has no Node `process`. polygon-clipping reads optional
    // POLYGON_CLIPPING_* limits via process.env — stub them so the bundled
    // landmarks.mjs never contains a bare `process.env` (pytest guard).
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE": "undefined",
      "process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS": "undefined",
    },
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

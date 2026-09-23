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

const devWidget = process.env.DEV_WIDGET;
const harnessRoots: Record<string, string> = {
  "volume-cube": path.resolve(devDir, "volume-cube"),
  "notebook-link": path.resolve(devDir, "notebook-link"),
};
const harnessRoot = harnessRoots[devWidget ?? ""] ?? devDir;

// Single deck.gl / luma.gl stack for all widgets (9.2.x). npm overrides dedupe
// Viv's nested peers to these root copies; each widget bundle still ships its own
// ESM chunk — there is no shared runtime Deck across anywidgets in a notebook cell.
const deckPackages = [
  "@deck.gl/core",
  "@deck.gl/layers",
  "@deck.gl/extensions",
  "@deck.gl/widgets",
  "@deck.gl/mesh-layers",
  "@deck.gl/geo-layers",
  "@deck.gl/react",
];
const lumaPackages = [
  "@luma.gl/constants",
  "@luma.gl/core",
  "@luma.gl/engine",
  "@luma.gl/shadertools",
  "@luma.gl/webgl",
  "@luma.gl/gltf",
];

const sharedResolve = {
  alias: {
    "@": path.resolve(rootDir, "src"),
    ...Object.fromEntries(
      [...deckPackages, ...lumaPackages].map((name) => [
        name,
        path.resolve(rootDir, "node_modules", name),
      ]),
    ),
    "@thi.ng/geom-accel": path.resolve(rootDir, "node_modules/@thi.ng/geom-accel"),
    "polygon-clipping": path.resolve(
      rootDir,
      "node_modules/polygon-clipping/dist/polygon-clipping.esm.js",
    ),
  },
};

const sharedServer = {
  fs: { allow: [repoRoot] },
};

function serveNotebookLinkFixture() {
  return {
    name: "serve-notebook-link-fixture",
    configureServer(server: { middlewares: { use: Function } }) {
      if (devWidget !== "notebook-link") return;
      server.middlewares.use("/fixture.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        fs.createReadStream(
          path.resolve(devDir, "volume-cube-fixture.json"),
        ).pipe(res);
      });
    },
  };
}

const usesViv = devWidget === "volume-cube" || devWidget === "notebook-link";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: harnessRoot,
      // Missing OME-Zarr keys must 404. SPA fallback serves index.html (200),
      // and zarrita then fails to parse it instead of opening the v2 store.
      appType: usesViv ? "mpa" : "spa",
      publicDir:
        devWidget === "notebook-link"
          ? path.resolve(devDir, "volume-cube/public")
          : undefined,
      plugins: [react(), tailwindcss(), serveNotebookLinkFixture()],
      resolve: sharedResolve,
      // Viv harnesses need default dep optimization; landmarks excludes Viv.
      optimizeDeps: usesViv ? undefined : { exclude: ["@hms-dbmi/viv"] },
      server: sharedServer,
    };
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: sharedResolve,
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

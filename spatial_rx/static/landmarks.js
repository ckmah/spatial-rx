import {
  Deck,
  OrthographicView,
  LinearInterpolator,
} from "@deck.gl/core";
import {
  ScatterplotLayer,
  PathLayer,
  PolygonLayer,
  BitmapLayer,
  TextLayer,
} from "@deck.gl/layers";
import { PathStyleExtension } from "@deck.gl/extensions";
import { ZoomWidget, ResetViewWidget } from "@deck.gl/widgets";
import {
  neighborhoodFor as neighborhoodForArgs,
  patchLandmark,
  patchNeighborhood,
  setSelected as setSelectedTrait,
  setMode as setModeTrait,
  deleteLandmark as deleteLandmarkTrait,
  deleteSelection as deleteSelectionTrait,
  withHood,
  setLandmarks,
} from "./landmarks_state.js";

/** Pinned with frontend package.json (@deck.gl/*@9.1.14); bundled by Vite. */
const DECK_MODULES = {
  Deck,
  OrthographicView,
  LinearInterpolator,
  ScatterplotLayer,
  PathLayer,
  PolygonLayer,
  BitmapLayer,
  TextLayer,
  PathStyleExtension,
  ZoomWidget,
  ResetViewWidget,
};

/** Landmark dashed stroke (path units / pixels). */
const LANDMARK_DASH = [8, 5];
/** Selection outline: dotted [dot, gap] in path units (pixels with widthUnits). */
const SELECTION_DOT = [2, 4];

/** Hide stock widget DOM; React/shadcn chrome calls the same handle methods. */
const HIDDEN_WIDGET_STYLE = { display: "none" };
const OVERLAY_GL = { depthCompare: "always", depthWriteEnabled: false };

const COLORS = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"];
const FALLBACK_POINT = "#00e5ff";
const SEL_COLORS = ["#a3a3a3", "#8a8a8a", "#737373", "#c4c4c4"];
const POINT_OPACITY = 0.8;
const LANDMARK_OPACITY = 0.28;
const STROKE_WIDTH = 2;
const DEFAULT_TENSION = 0;
const DEFAULT_BUFFER_SIDE = "both";
/** Soft hover/pin halos by inspect target type (DESIGN.md). */
const HALO_LANDMARK = "#00e5ff";
const HALO_CELL = "#a3a3a3";
const HALO_MOLECULE = "#ff0099";
/** DESIGN.md neighborhood-teal */
const NEIGH_COLOR = "#b3f2e8";
const NEIGH_FILL_ALPHA = 0.3;
const NEIGH_LINE_ALPHA = 0.9;
/** kNN edge restyle: thin, low-opacity teal wash */
const NEIGH_EDGE_ALPHA = 0.28;
const NEIGH_EDGE_WIDTH = 0.75;
/** Radius soft-gradient field (baked BitmapLayer; no per-seed disk strokes). */
/** Peak alpha kept low so scatter + seed/neighbor roles stay primary. */
const NEIGH_GRADIENT_PEAK_ALPHA = 0.18;
/** Muted teal wash (DESIGN neighborhood-teal desaturated) for the field only. */
const NEIGH_GRADIENT_COLOR = "#8ebfb6";
const NEIGH_GRADIENT_MAX_DIM = 512;
const NEIGH_GRADIENT_MAX_DIM_LARGE = 256;
const SEED_ROLE = 2;
const NEIGH_ROLE = 1;
/** Selected / seed points grow slightly when a type or selection is focused. */
const SELECTED_SIZE_SCALE = 1.28;
/** Unselected points shrink when a type/selection is focused. */
const OTHER_SIZE_SCALE = 0.55;
/** Unselected point alpha multiplier while focused. */
const OTHER_ALPHA_SCALE = 0.28;
const BUFFERABLE = ["line", "spline", "gradient"];
/** Raster similarity sequential (DESIGN.md cream → magenta). */
const RASTER_SEQ_LOW = "#f3e6d4";
const RASTER_SEQ_HIGH = "#ff0099";
const RASTER_DENSITY_ALPHA = 0.85;
const RASTER_DIM_ALPHA = 0.18;
const RASTER_QUERY_STROKE = "#111111";
const RASTER_HOVER_STROKE = "#00e5ff";
const RASTER_TEXTURE_MAX = 1024;

/** CSS/Penner easeOutQuart for camera transitions. */
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

/** Shift+wheel often reports deltaX on macOS/Chrome; prefer vertical then horizontal. */
function wheelDelta(e) {
  const dy = e.deltaY || 0;
  const dx = e.deltaX || 0;
  if (dy !== 0) return dy;
  return dx;
}

function decodeF32Base64(b64) {
  if (!b64) return new Float32Array(0);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Float32Array(bytes.buffer);
}

function decodeI32Base64(b64) {
  if (!b64) return new Int32Array(0);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Int32Array(bytes.buffer);
}

function cssColorToClear(color) {
  const probe = document.createElement("canvas");
  probe.width = probe.height = 1;
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#000000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255, a / 255 || 1];
}

export function mountEngine({ model, host }) {
  if (!host) throw new Error("mountEngine: host element is required");

  const container = host.closest(".landmarks");
  const body = host.closest(".landmarks__body");
  const main = host.closest(".landmarks__main") || host.parentElement;
  if (!container || !body || !main) {
    throw new Error(
      "mountEngine: host must sit inside .landmarks > .landmarks__body > .landmarks__main",
    );
  }

  host.replaceChildren();
  host.classList.add("landmarks__plot-host");
  host.style.position = "relative";
  host.style.flex = "1 1 auto";
  host.style.minHeight = "0";
  host.style.width = "100%";
  host.style.height = "100%";

  const plotStack = document.createElement("div");
  plotStack.className = "landmarks__plot";
  const webglCanvas = document.createElement("canvas");
  webglCanvas.className = "landmarks__webgl";
  webglCanvas.tabIndex = 0;
  const legend = document.createElement("div");
  legend.className = "landmarks__legend";
  legend.hidden = true;
  plotStack.append(webglCanvas, legend);
  host.append(plotStack);

  // React owns theme class apply (dark / landmarks--dark / landmarks--light).
  // Re-clear the deck when those classes change on the container.
  let applyPlotBackground = () => { };
  const themeObserver = new MutationObserver(() => {
    applyPlotBackground();
    if (deckgl) setDeckLayers();
  });
  themeObserver.observe(container, {
    attributes: true,
    attributeFilter: ["class"],
  });

  function tooltipStyle() {
    const styles = getComputedStyle(container);
    return {
      background: styles.getPropertyValue("--lm-tooltip-bg").trim() || "#0f172a",
      color: styles.getPropertyValue("--lm-tooltip-text").trim() || "#f8fafc",
      fontSize: "11px",
      fontWeight: "500",
      padding: "4px 8px",
      borderRadius: "4px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.18)",
    };
  }

  /** Native Deck tooltip content (replaces engine-owned tooltip DOM). */
  function deckTooltip(info) {
    const drafting =
      draft.length > 0 && ["polygon", "line", "spline", "shape"].includes(currentMode);
    if (drafting) {
      const need = currentMode === "line" || currentMode === "spline" ? 2 : 3;
      return {
        text: draft.length >= need ? "Enter to finish" : "Click",
        style: tooltipStyle(),
      };
    }
    // Pointer-only hover tooltips (Move / Selection / landmark draw: no hover paint).
    if (currentMode !== "pointer") return null;
    const hit = resolvePointerTarget(info);
    if (!hit) return null;
    const text = formatInspectTooltip(hit);
    return text ? { text, style: tooltipStyle() } : null;
  }

  function formatInspectTooltip(hit) {
    if (!hit) return "";
    if (hit.kind === "landmark") {
      const lm = (model.get("landmarks") || [])[hit.index];
      if (!lm) return "";
      return String(lm.id || `landmark ${hit.index}`);
    }
    if (hit.kind === "type") {
      const labels = model.get("legend_labels") || [];
      const name = labels[hit.index] ?? `type ${hit.index}`;
      const cat = model.get("active_category") || "category";
      return `${cat}: ${name}`;
    }
    if (hit.kind === "molecule") {
      const pts = getPointsData();
      const p = pts[hit.index];
      if (!p) return `molecule ${hit.index}`;
      const bits = [`molecule ${hit.index}`, `x ${p.x.toFixed(1)}`, `y ${p.y.toFixed(1)}`];
      const activeGenes = model.get("active_genes") || [];
      const genesOn =
        model.get("color_by") === "continuous" && activeGenes.length > 0;
      if (genesOn) {
        for (const name of activeGenes) {
          const raw = geneRawAt(hit.index, name);
          if (raw == null || !Number.isFinite(raw)) continue;
          bits.push(`${name} ${Number(raw).toPrecision(3)}`);
        }
      } else {
        const labels = model.get("legend_labels") || [];
        const code = categoryCodeAt(hit.index);
        if (code >= 0 && labels[code] != null) bits.push(String(labels[code]));
      }
      return bits.join(" · ");
    }
    return "";
  }

  function haloColorFor(kind) {
    if (kind === "landmark") return HALO_LANDMARK;
    if (kind === "type") return HALO_CELL;
    return HALO_MOLECULE;
  }

  legend.addEventListener("mousedown", (e) => e.stopPropagation());
  legend.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });

  const INTERACTION_MODES = ["pointer", "move"];
  const GEOMETRY_MODES = ["lasso", "polygon", "rectangle", "ellipse"];
  const LANDMARK_MODES = ["point", "line", "spline", "shape"];
  const modes = [...INTERACTION_MODES, ...GEOMETRY_MODES, ...LANDMARK_MODES];
  /** Single-key mode map (digits = landmark tools; letters = nav / selection). */
  const MODE_BY_KEY = {
    v: "pointer",
    h: "move",
    l: "lasso",
    r: "rectangle",
    o: "ellipse",
    g: "polygon",
    1: "point",
    2: "line",
    3: "spline",
    4: "shape",
  };
  let currentMode = model.get("mode") || "pointer";
  // Migrate legacy "select" (pan+inspect) → move.
  if (currentMode === "select") currentMode = "move";
  if (!modes.includes(currentMode)) currentMode = modes[0] || "pointer";

  /** In-memory clipboard for landmark / selection copy-paste. */
  let editClipboard = null;

  let hoverTarget = null;
  let hoverRaf = 0;

  function isGeometryMode(mode) {
    return ["lasso", "polygon", "rectangle", "ellipse"].includes(mode);
  }
  function isLandmarkDrawMode(mode) {
    return ["point", "line", "spline", "shape"].includes(mode);
  }
  function sameTarget(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.kind === b.kind && a.index === b.index;
  }


  let deckgl = null;
  let deckModules = null;
  let zoomWidget = null;
  let resetWidget = null;
  let plotW = 0;
  let plotH = 0;
  let currentViewState = null;
  let viewStateListeners = [];
  let hoverListeners = [];
  let landmarkMenuListeners = [];
  let layerRaf = 0;
  let fittedOnce = false;
  let fitZoom = null;
  let pointsCache = { key: "", data: [] };
  let pointRoles = null;
  let pointRoleMode = false;
  let hoodEdges = [];
  let hoodRadiusBake = null; // { key, dist, w, h, bounds, seedCount, textureSize, rMax }
  let hoodRadiusGradient = null; // remapped view { key, image, bounds, seedCount, textureSize, radius, bakeRMax }
  let zoomBy = () => { };
  let resetZoom = () => { };
  let zoomInterpolator = null;
  let categoryCodes = null;
  let geneValues = null;
  let knnGraph = null;
  let radiusGraph = null;
  let rasterCache = {
    key: "",
    rows: null,
    cols: null,
    counts: null,
    features: null,
    flatToCompact: null,
  };
  let rasterScores = null; // Float32Array | null
  let rasterScoreKey = "";
  let hoverBinIndex = -1;
  let rasterImageCache = { key: "", image: null, bounds: null };

  function refreshCategoryCodes() {
    const b64 = model.get("category_codes") || "";
    categoryCodes = b64 ? decodeI32Base64(b64) : null;
  }
  refreshCategoryCodes();

  function refreshGeneValues() {
    const b64 = model.get("gene_values") || "";
    geneValues = b64 ? decodeF32Base64(b64) : null;
  }
  refreshGeneValues();

  function refreshNeighborGraph() {
    knnGraph = decodeNeighborCsr(
      model.get("neighbor_indptr") || "",
      model.get("neighbor_indices") || "",
      model.get("neighbor_distances") || "",
    );
    radiusGraph = decodeNeighborCsr(
      model.get("radius_indptr") || "",
      model.get("radius_indices") || "",
      model.get("radius_distances") || "",
    );
  }
  function decodeNeighborCsr(indptrB64, indicesB64, distancesB64) {
    const indptr = decodeI32Base64(indptrB64);
    const indices = decodeI32Base64(indicesB64);
    const distances = decodeF32Base64(distancesB64);
    if (!indptr.length) return null;
    return { indptr, indices, distances };
  }
  refreshNeighborGraph();

  function isRasterMode() {
    return (model.get("render_mode") || "points") === "raster";
  }

  function rasterSimilarityOn() {
    return isRasterMode() && !!model.get("raster_similarity_enabled");
  }

  function refreshRasterArrays() {
    const rowsB64 = model.get("raster_bin_rows") || "";
    const colsB64 = model.get("raster_bin_cols") || "";
    const countsB64 = model.get("raster_bin_counts") || "";
    const featB64 = model.get("raster_features") || "";
    const nBins = model.get("raster_n_bins") | 0;
    const dim = model.get("raster_feature_dim") | 0;
    const key = [
      rowsB64.length,
      colsB64.length,
      countsB64.length,
      featB64.length,
      nBins,
      dim,
      model.get("raster_origin_x"),
      model.get("raster_origin_y"),
      model.get("raster_bin_size"),
      model.get("raster_n_cols"),
      model.get("raster_n_rows"),
      rowsB64.slice(0, 24),
      featB64.slice(0, 24),
    ].join(":");
    if (key === rasterCache.key) return rasterCache;
    const rows = rowsB64 ? decodeI32Base64(rowsB64) : new Int32Array(0);
    const cols = colsB64 ? decodeI32Base64(colsB64) : new Int32Array(0);
    const counts = countsB64 ? decodeI32Base64(countsB64) : new Int32Array(0);
    const features = featB64 ? decodeF32Base64(featB64) : new Float32Array(0);
    const nCols = model.get("raster_n_cols") | 0;
    const nRows = model.get("raster_n_rows") | 0;
    const flatToCompact = new Int32Array(Math.max(0, nCols * nRows));
    flatToCompact.fill(-1);
    const n = Math.min(nBins, rows.length, cols.length, counts.length);
    for (let i = 0; i < n; i++) {
      const flat = (cols[i] | 0) + nCols * (rows[i] | 0);
      if (flat >= 0 && flat < flatToCompact.length) flatToCompact[flat] = i;
    }
    rasterCache = { key, rows, cols, counts, features, flatToCompact, nBins: n, dim };
    rasterScores = null;
    rasterScoreKey = "";
    rasterImageCache = { key: "", image: null, bounds: null };
    return rasterCache;
  }

  function lerpHex(a, b, t) {
    const pa = hexToRgbaBytes(a, 1);
    const pb = hexToRgbaBytes(b, 1);
    const u = Math.max(0, Math.min(1, t));
    return [
      Math.round(pa[0] + (pb[0] - pa[0]) * u),
      Math.round(pa[1] + (pb[1] - pa[1]) * u),
      Math.round(pa[2] + (pb[2] - pa[2]) * u),
    ];
  }

  function cosineScoresForQuery(queryIdx) {
    const cache = refreshRasterArrays();
    const n = cache.nBins | 0;
    const dim = cache.dim | 0;
    const feats = cache.features;
    if (queryIdx < 0 || queryIdx >= n || !dim || !feats || feats.length < n * dim) {
      return null;
    }
    const key = `${cache.key}:${queryIdx}`;
    if (rasterScoreKey === key && rasterScores) return rasterScores;
    const scores = new Float32Array(n);
    const qOff = queryIdx * dim;
    for (let i = 0; i < n; i++) {
      let dot = 0;
      const off = i * dim;
      for (let d = 0; d < dim; d++) dot += feats[off + d] * feats[qOff + d];
      scores[i] = dot;
    }
    rasterScores = scores;
    rasterScoreKey = key;
    return scores;
  }

  function activeQueryBin() {
    const pinned = model.get("raster_query_bin");
    if (pinned != null && pinned >= 0) return pinned | 0;
    if (hoverBinIndex >= 0) return hoverBinIndex;
    return -1;
  }

  function pickBinAtWorld(x, y) {
    if (!isRasterMode()) return -1;
    const cache = refreshRasterArrays();
    const size = Number(model.get("raster_bin_size")) || 0;
    const nCols = model.get("raster_n_cols") | 0;
    const nRows = model.get("raster_n_rows") | 0;
    if (!(size > 0) || nCols <= 0 || nRows <= 0 || !cache.flatToCompact) return -1;
    const ox = Number(model.get("raster_origin_x")) || 0;
    const oy = Number(model.get("raster_origin_y")) || 0;
    const col = Math.floor((x - ox) / size);
    const row = Math.floor((y - oy) / size);
    if (col < 0 || row < 0 || col >= nCols || row >= nRows) return -1;
    const flat = col + nCols * row;
    return cache.flatToCompact[flat] ?? -1;
  }

  function binPolygon(compactIdx) {
    const cache = refreshRasterArrays();
    if (compactIdx < 0 || compactIdx >= (cache.nBins | 0)) return null;
    const size = Number(model.get("raster_bin_size")) || 0;
    const ox = Number(model.get("raster_origin_x")) || 0;
    const oy = Number(model.get("raster_origin_y")) || 0;
    const col = cache.cols[compactIdx] | 0;
    const row = cache.rows[compactIdx] | 0;
    const x0 = ox + col * size;
    const y0 = oy + row * size;
    const x1 = x0 + size;
    const y1 = y0 + size;
    return [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
      [x0, y0],
    ];
  }

  function buildRasterTexture() {
    const cache = refreshRasterArrays();
    const nBins = cache.nBins | 0;
    const nCols = model.get("raster_n_cols") | 0;
    const nRows = model.get("raster_n_rows") | 0;
    const size = Number(model.get("raster_bin_size")) || 0;
    if (!nBins || !nCols || !nRows || !(size > 0)) {
      return null;
    }
    const queryIdx = rasterSimilarityOn() ? activeQueryBin() : -1;
    const scores =
      queryIdx >= 0 && (cache.dim | 0) > 0 ? cosineScoresForQuery(queryIdx) : null;
    const threshold = Number(model.get("raster_threshold")) || 0;
    const basis = model.get("raster_basis") || "genes";
    const texKey = [
      cache.key,
      queryIdx,
      scores ? rasterScoreKey : "density",
      threshold,
      hoverBinIndex,
      model.get("raster_query_bin"),
      basis,
    ].join("|");
    if (rasterImageCache.key === texKey && rasterImageCache.image) {
      return rasterImageCache;
    }

    let tw = nCols;
    let th = nRows;
    const maxDim = RASTER_TEXTURE_MAX;
    if (tw > maxDim || th > maxDim) {
      const scale = maxDim / Math.max(tw, th);
      tw = Math.max(1, Math.round(tw * scale));
      th = Math.max(1, Math.round(th * scale));
    }
    const canvas = document.createElement("canvas");
    canvas.width = tw;
    canvas.height = th;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const img = ctx.createImageData(tw, th);
    const data = img.data;
    // transparent default
    data.fill(0);

    let maxCount = 1;
    for (let i = 0; i < nBins; i++) {
      const c = cache.counts[i] | 0;
      if (c > maxCount) maxCount = c;
    }

    const ox = Number(model.get("raster_origin_x")) || 0;
    const oy = Number(model.get("raster_origin_y")) || 0;
    const sx = tw / nCols;
    const sy = th / nRows;

    for (let i = 0; i < nBins; i++) {
      const col = cache.cols[i] | 0;
      const row = cache.rows[i] | 0;
      let t = (cache.counts[i] | 0) / maxCount;
      let alpha = RASTER_DENSITY_ALPHA;
      if (scores) {
        const s = scores[i];
        t = Math.max(0, Math.min(1, s));
        if (t < threshold) alpha = RASTER_DIM_ALPHA;
      }
      const [r, g, b] = lerpHex(RASTER_SEQ_LOW, RASTER_SEQ_HIGH, t);
      // Canvas y=0 is top; map world max row → top like neighborhood bake.
      const px0 = Math.floor(col * sx);
      const px1 = Math.max(px0 + 1, Math.floor((col + 1) * sx));
      const py0 = Math.floor((nRows - 1 - row) * sy);
      const py1 = Math.max(py0 + 1, Math.floor((nRows - row) * sy));
      const a = Math.round(alpha * 255);
      for (let y = py0; y < py1; y++) {
        for (let x = px0; x < px1; x++) {
          if (x < 0 || y < 0 || x >= tw || y >= th) continue;
          const o = (y * tw + x) * 4;
          data[o] = r;
          data[o + 1] = g;
          data[o + 2] = b;
          data[o + 3] = a;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
    const bounds = [
      ox,
      oy + nRows * size,
      ox + nCols * size,
      oy,
    ];
    rasterImageCache = { key: texKey, image: canvas, bounds };
    return rasterImageCache;
  }

  function buildRasterLayers() {
    if (!deckModules || !isRasterMode()) return [];
    if ((model.get("raster_status") || "") === "computing") return [];
    const baked = buildRasterTexture();
    if (!baked?.image) return [];
    const { BitmapLayer, PathLayer } = deckModules;
    const layers = [
      new BitmapLayer({
        id: "raster-bins",
        image: baked.image,
        bounds: baked.bounds,
        pickable: false,
        textureParameters: {
          minFilter: "nearest",
          magFilter: "nearest",
        },
        parameters: OVERLAY_GL,
        updateTriggers: {
          image: baked.key,
        },
      }),
    ];
    const pinned = model.get("raster_query_bin");
    const outlineIdx =
      pinned != null && pinned >= 0
        ? pinned | 0
        : hoverBinIndex >= 0
          ? hoverBinIndex
          : -1;
    const poly = outlineIdx >= 0 ? binPolygon(outlineIdx) : null;
    if (poly) {
      const stroke =
        pinned != null && pinned >= 0 ? RASTER_QUERY_STROKE : RASTER_HOVER_STROKE;
      layers.push(
        new PathLayer({
          id: "raster-query-outline",
          data: [{ path: poly }],
          getPath: (d) => d.path,
          getColor: hexToRgbaBytes(stroke, 0.95),
          getWidth: 2.5,
          widthUnits: "pixels",
          pickable: false,
          parameters: OVERLAY_GL,
          updateTriggers: {
            getColor: [pinned, hoverBinIndex],
            data: [outlineIdx, refreshRasterArrays().key],
          },
        })
      );
    }
    return layers;
  }

  function activeCategoryIndex() {
    const cols = model.get("category_columns") || [];
    const active = model.get("active_category") || "";
    return cols.findIndex((c) => c.name === active);
  }

  function categoryCodeAt(i) {
    const cols = model.get("category_columns") || [];
    const ci = activeCategoryIndex();
    const pts = getPointsData();
    if (ci < 0 || !categoryCodes || !pts.length) {
      return Math.round(pts[i]?.valueA || 0);
    }
    return categoryCodes[ci * pts.length + i];
  }

  /** Additive channels (keep in sync with helpers GENE_COLORS): magenta / lime / azure. */
  const GENE_COLORS = ["#ff0099", "#b8ff00", "#00b7ff"];

  function geneMeta(geneName) {
    const genes = model.get("gene_columns") || [];
    return genes.find((g) => g.name === geneName) || null;
  }

  function geneValueAt(i, geneName) {
    const active = model.get("active_genes") || [];
    const gi = active.indexOf(geneName);
    const pts = getPointsData();
    if (gi < 0 || !geneValues || !geneValues.length || !pts.length) return null;
    return geneValues[gi * pts.length + i];
  }

  /** Data-space gene value (pre-log1p) from packed [0, 1]. */
  function geneRawAt(i, geneName) {
    const t01 = geneValueAt(i, geneName);
    if (t01 == null || !Number.isFinite(t01)) return null;
    const meta = geneMeta(geneName);
    const lo = Number.isFinite(meta?.vmin) ? meta.vmin : 0;
    const hi = Number.isFinite(meta?.vmax) && meta.vmax > lo ? meta.vmax : lo + 1;
    const t = Math.max(0, Math.min(1, t01));
    return Math.max(0, lo + t * (hi - lo));
  }

  function geneUsesLog1p() {
    return !!model.get("gene_log1p") && !model.get("gene_expression_logged");
  }

  /** Reconstruct data-space value from packed [0, 1], then optional log1p. */
  function geneIntensity(t01, vmin, vmax) {
    const lo = Number.isFinite(vmin) ? vmin : 0;
    const hi = Number.isFinite(vmax) && vmax > lo ? vmax : lo + 1;
    const t = Math.max(0, Math.min(1, t01 == null ? 0 : t01));
    const raw = Math.max(0, lo + t * (hi - lo));
    return geneUsesLog1p() ? Math.log1p(raw) : raw;
  }

  function geneCeiling(vmin, vmax) {
    const lo = Number.isFinite(vmin) ? vmin : 0;
    const hi = Number.isFinite(vmax) && vmax > lo ? vmax : lo + 1;
    const top = Math.max(0, hi);
    const bot = Math.max(0, lo);
    if (geneUsesLog1p()) {
      const a = Math.log1p(bot);
      const b = Math.log1p(top);
      return b > a ? b : b + 1e-6;
    }
    return top > bot ? top : top + 1e-6;
  }

  function geneFloor(vmin, vmax) {
    const lo = Number.isFinite(vmin) ? vmin : 0;
    const bot = Math.max(0, lo);
    return geneUsesLog1p() ? Math.log1p(bot) : bot;
  }

  /** Scaled channel weight in [0, 1] for one gene at point i. */
  function scaledGeneT(i, geneName, sharedCeiling) {
    const meta = geneMeta(geneName);
    if (!meta) return 0;
    const t01 = geneValueAt(i, geneName);
    if (t01 == null) return 0;
    const vmin = meta.vmin ?? 0;
    const vmax = meta.vmax ?? 1;
    const intensity = geneIntensity(t01, vmin, vmax);
    const mode = model.get("gene_scale_mode") || "independent";
    if (mode === "shared") {
      const ceil = sharedCeiling > 0 ? sharedCeiling : geneCeiling(vmin, vmax);
      return Math.max(0, Math.min(1, intensity / ceil));
    }
    const floor = geneFloor(vmin, vmax);
    const ceil = geneCeiling(vmin, vmax);
    if (ceil <= floor) return 0;
    return Math.max(0, Math.min(1, (intensity - floor) / (ceil - floor)));
  }

  function sharedGeneCeiling(active) {
    let max = 0;
    for (const name of active) {
      const meta = geneMeta(name);
      if (!meta) continue;
      max = Math.max(max, geneCeiling(meta.vmin ?? 0, meta.vmax ?? 1));
    }
    return max;
  }

  function blendGeneColors(i, opacity) {
    const active = model.get("active_genes") || [];
    const pts = getPointsData();
    if (!active.length || !pts.length) return null;
    const shared =
      (model.get("gene_scale_mode") || "independent") === "shared"
        ? sharedGeneCeiling(active)
        : 0;
    let r = 0;
    let g = 0;
    let b = 0;
    let w = 0;
    for (let ai = 0; ai < active.length; ai++) {
      const t = scaledGeneT(i, active[ai], shared);
      if (!(t > 0)) continue;
      const rgb = hexToRgbaBytes(GENE_COLORS[ai % GENE_COLORS.length], 1);
      r += rgb[0] * t;
      g += rgb[1] * t;
      b += rgb[2] * t;
      w += t;
    }
    if (w < 1e-6) {
      return hexToRgbaBytes("#6b7280", opacity * 0.35);
    }
    return [
      Math.min(255, Math.round(r)),
      Math.min(255, Math.round(g)),
      Math.min(255, Math.round(b)),
      Math.round(Math.max(0, Math.min(1, opacity)) * 255),
    ];
  }
  let draft = [];
  let suppressClick = false;
  let isDragging = false;
  let dragStart = null;
  let dragKind = "";
  let dragIndex = -1;
  let didDrag = false;
  /** World/pixel cursor for rubber-band draft preview (line/spline/shape/polygon). */
  let draftCursor = null;
  /** True while button is held after placing the first line vertex (drag-to-end). */
  let lineStrokeActive = false;
  /** Pixel-distance² below this on mouseup → click, not drag (line authoring). */
  const LINE_CLICK_PX2 = 25;
  let vertexDragIndex = -1;
  let vertexDragLandmarkIndex = -1;
  let isLassoing = false;
  let lassoPath = [];
  let isBoxing = false;
  let boxStart = null;
  let boxCurrent = null;

  function nextNumberedId(prefix, items) {
    const used = new Set((items || []).map((x) => String(x.id)));
    for (let i = 1; ; i++) {
      const id = `${prefix} ${i}`;
      if (!used.has(id)) return id;
    }
  }
  function nextLandmarkId(items) {
    return nextNumberedId("landmark", items);
  }
  function nextSelectionId(items) {
    return nextNumberedId("selection", items);
  }

  function resetDraft() {
    draft = [];
    draftCursor = null;
    lineStrokeActive = false;
    lassoPath = [];
    isLassoing = false;
    isBoxing = false;
    boxStart = null;
    boxCurrent = null;
  }

  function eventPoint(event) {
    const rect = webglCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const viewport = deckgl?.isInitialized ? deckgl.getViewports()[0] : null;
    if (!viewport) return null;
    const [x, y] = viewport.unproject([px, py]);
    return { x, y, px, py };
  }

  function controllerProps() {
    const pan = currentMode === "move";
    return {
      dragPan: pan,
      scrollZoom: true,
      doubleClickZoom: false,
      touchRotate: false,
    };
  }

  function defaultCursor() {
    if (currentMode === "move") return "grab";
    if (currentMode === "pointer") return "default";
    return "crosshair";
  }

  function syncInteractionMode() {
    if (currentMode !== "pointer") hoverTarget = null;
    webglCanvas.style.cursor = defaultCursor();
    if (deckgl) deckgl.setProps({ controller: controllerProps() });
  }

  function syncCanvasBuffer() {
    const w = Math.max(1, Math.round(main.clientWidth || 1));
    const h = Math.max(1, Math.round(main.clientHeight || 1));
    plotW = w;
    plotH = h;
    if (deckgl) deckgl.setProps({ width: w, height: h, useDevicePixels: true });
    return { w, h };
  }

  function formatLegendValue(v) {
    if (!Number.isFinite(v)) return "";
    const a = Math.abs(v);
    if (a !== 0 && (a >= 1000 || a < 0.01)) return v.toExponential(1);
    if (a >= 100) return v.toFixed(0);
    if (a >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }

  function updatePointLegend() {
    if (!legend) return;
    if (isRasterMode()) {
      legend.innerHTML = "";
      const title = document.createElement("div");
      title.className = "landmarks__legend-title";
      const basis = model.get("raster_basis") || "genes";
      const q = model.get("raster_query_bin");
      const querying = q != null && q >= 0;
      title.textContent = querying
        ? `similarity · ${basis} · bin`
        : `density · ${basis} · bin`;
      legend.appendChild(title);
      const bar = document.createElement("div");
      bar.className = "landmarks__legend-bar";
      bar.style.background = `linear-gradient(to top, ${RASTER_SEQ_LOW}, ${RASTER_SEQ_HIGH})`;
      const scale = document.createElement("div");
      scale.className = "landmarks__legend-scale";
      const hi = document.createElement("span");
      hi.textContent = querying ? "1" : "max";
      const lo = document.createElement("span");
      lo.textContent = querying ? "0" : "0";
      scale.appendChild(hi);
      scale.appendChild(lo);
      const row = document.createElement("div");
      row.className = "landmarks__legend-continuous";
      row.appendChild(bar);
      row.appendChild(scale);
      legend.appendChild(row);
      legend.hidden = false;
      return;
    }
    const mode = model.get("color_by") || "categorical";
    const title = model.get("legend_title") || "";
    const palette = model.get("point_palette") || [];
    const activeGenes = model.get("active_genes") || [];

    legend.innerHTML = "";
    if (title) {
      const t = document.createElement("div");
      t.className = "landmarks__legend-title";
      t.textContent = title;
      legend.appendChild(t);
    }

    // Gene legends render in the Layers panel under the combobox.
    if (mode === "continuous" && activeGenes.length > 0) {
      legend.hidden = true;
      return;
    }

    if (mode === "continuous" && palette.length > 1) {
      const bar = document.createElement("div");
      bar.className = "landmarks__legend-bar";
      bar.style.background = `linear-gradient(to top, ${palette[0]}, ${palette[Math.floor(palette.length / 2)]}, ${palette[palette.length - 1]})`;
      const scale = document.createElement("div");
      scale.className = "landmarks__legend-scale";
      const vmax = document.createElement("span");
      vmax.textContent = formatLegendValue(model.get("color_vmax"));
      const vmin = document.createElement("span");
      vmin.textContent = formatLegendValue(model.get("color_vmin"));
      scale.appendChild(vmax);
      scale.appendChild(vmin);
      const row = document.createElement("div");
      row.className = "landmarks__legend-continuous";
      row.appendChild(bar);
      row.appendChild(scale);
      legend.appendChild(row);
      legend.hidden = false;
      return;
    }

    if (mode === "categorical") {
      legend.hidden = true;
      return;
    }

    legend.hidden = !title;
  }

  function hexToRgbaBytes(hex, alpha) {
    const h = String(hex || FALLBACK_POINT).replace("#", "");
    const full =
      h.length === 3
        ? h
          .split("")
          .map((c) => c + c)
          .join("")
        : h.padEnd(6, "0").slice(0, 6);
    const n = Number.parseInt(full, 16);
    return [
      (n >> 16) & 255,
      (n >> 8) & 255,
      n & 255,
      Math.round(Math.max(0, Math.min(1, alpha)) * 255),
    ];
  }

  /** Readable text on a solid landmark-colored chip (WCAG-ish luminance). */
  function contrastOnHex(hex) {
    const [r, g, b] = hexToRgbaBytes(hex, 1);
    const lin = (c) => {
      const x = c / 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    };
    const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    return L > 0.45 ? [15, 15, 15, 245] : [255, 255, 255, 250];
  }

  function landmarkLabelStyle(hex) {
    return {
      color: contrastOnHex(hex),
      // Solid tinted chip (ChromeTooltip-like padding via TextLayer background).
      background: hexToRgbaBytes(hex, 0.92),
    };
  }

  function fillColorForPoint(d) {
    const opacity = POINT_OPACITY;
    const mode = model.get("color_by") || "categorical";
    let rgba;
    if (mode === "continuous") {
      const activeGenes = model.get("active_genes") || [];
      if (activeGenes.length > 0) {
        rgba =
          blendGeneColors(d.i, opacity) ||
          hexToRgbaBytes("#6b7280", opacity * 0.35);
      } else {
        const palette = model.get("point_palette") || [FALLBACK_POINT];
        if (palette.length > 1) {
          const t = Math.max(0, Math.min(1, d.valueA));
          const idx = t * (palette.length - 1);
          const lo = Math.floor(idx);
          const hi = Math.min(palette.length - 1, lo + 1);
          const frac = idx - lo;
          const c0 = hexToRgbaBytes(palette[lo], opacity);
          const c1 = hexToRgbaBytes(palette[hi], opacity);
          rgba = c0.map((v, i) => Math.round(v + (c1[i] - v) * frac));
        } else {
          rgba = hexToRgbaBytes(palette[0], opacity);
        }
      }
    } else {
      const cols = model.get("category_columns") || [];
      const ci = activeCategoryIndex();
      const col = ci >= 0 ? cols[ci] : null;
      const palette = (col && col.palette) || model.get("point_palette") || [FALLBACK_POINT];
      const code = col ? categoryCodeAt(d.i) : Math.round(d.valueA);
      rgba = hexToRgbaBytes(palette[((code % palette.length) + palette.length) % palette.length], opacity);
    }
    if (!pointRoleMode || !pointRoles) return rgba;
    const role = pointRoles[d.i] || 0;
    if (role === SEED_ROLE || role === NEIGH_ROLE) {
      rgba[3] = 255;
      return rgba;
    }
    rgba[3] = Math.round((rgba[3] || 255) * OTHER_ALPHA_SCALE);
    return rgba;
  }

  function radiusForPoint(d) {
    const size = model.get("point_size") ?? 2;
    if (!pointRoleMode || !pointRoles) return size;
    const role = pointRoles[d.i] || 0;
    if (role === SEED_ROLE) return size * SELECTED_SIZE_SCALE;
    if (role === NEIGH_ROLE) return size;
    return size * OTHER_SIZE_SCALE;
  }

  function asPath(points) {
    return points.map((p) => [p.x, p.y]);
  }

  function asClosedPath(points) {
    const pts = asPath(points);
    if (!pts.length) return pts;
    const first = pts[0];
    const last = pts[pts.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) pts.push(first);
    return pts;
  }

  function boxPolygon(a, b) {
    if (currentMode === "ellipse") {
      const cx = (a.x + b.x) / 2;
      const cy = (a.y + b.y) / 2;
      const rx = Math.abs(b.x - a.x) / 2;
      const ry = Math.abs(b.y - a.y) / 2;
      const pts = [];
      for (let i = 0; i < 64; i++) {
        const t = (i / 64) * Math.PI * 2;
        pts.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
      }
      return pts;
    }
    return [
      [a.x, a.y],
      [b.x, a.y],
      [b.x, b.y],
      [a.x, b.y],
    ];
  }

  function selectionPolygonData(sel) {
    if (sel.type === "polygon" || sel.type === "lasso") {
      return (sel.vertices || []).map(([x, y]) => [x, y]);
    }
    const a = -(sel.angle || 0);
    if (sel.type === "rectangle") {
      const cx = sel.cx;
      const cy = sel.cy;
      const w = sel.width;
      const h = sel.height;
      const origin = { x: cx, y: cy };
      return [
        { x: cx - w / 2, y: cy - h / 2 },
        { x: cx + w / 2, y: cy - h / 2 },
        { x: cx + w / 2, y: cy + h / 2 },
        { x: cx - w / 2, y: cy + h / 2 },
      ].map((p) => {
        const r = rotatePt(p, origin, a);
        return [r.x, r.y];
      });
    }
    if (sel.type === "ellipse") {
      const cx = sel.cx;
      const cy = sel.cy;
      const rx = sel.rx;
      const ry = sel.ry;
      const origin = { x: cx, y: cy };
      const pts = [];
      for (let i = 0; i < 64; i++) {
        const t = (i / 64) * Math.PI * 2;
        const r = rotatePt(
          { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) },
          origin,
          a
        );
        pts.push([r.x, r.y]);
      }
      return pts;
    }
    return [];
  }

  function getPointsData() {
    const b64 = model.get("points_data") || "";
    const [xMin, xMax] = model.get("x_bounds");
    const [yMin, yMax] = model.get("y_bounds");
    const key = `${b64.length}:${xMin}:${xMax}:${yMin}:${yMax}:${b64.slice(0, 32)}:${b64.slice(-32)}`;
    if (key === pointsCache.key) return pointsCache.data;
    const raw = decodeF32Base64(b64);
    const n = Math.floor(raw.length / 4);
    const data = new Array(n);
    for (let i = 0; i < n; i++) {
      const o = i * 4;
      data[i] = {
        i,
        x: xMin + ((raw[o] + 1) / 2) * (xMax - xMin),
        y: yMin + ((raw[o + 1] + 1) / 2) * (yMax - yMin),
        valueA: raw[o + 2],
      };
    }
    pointsCache = { key, data };
    return data;
  }

  function buildPointsLayer() {
    if (!deckModules) return [];
    if (isRasterMode()) return [];
    const { ScatterplotLayer } = deckModules;
    const data = getPointsData();
    if (!data.length) return [];
    // point_size is radius in the same units as x/y (µm for micron data).
    const size = model.get("point_size") ?? 2;
    const roleTrigger = [
      size,
      pointRoleMode,
      model.get("selected_kind"),
      model.get("selected_index"),
      model.get("type_neighborhoods"),
      model.get("selections"),
      model.get("active_category"),
    ];
    const fillTriggers = [
      model.get("point_palette"),
      POINT_OPACITY,
      model.get("color_by"),
      model.get("active_genes"),
      model.get("gene_values"),
      model.get("gene_scale_mode"),
      model.get("gene_log1p"),
      ...roleTrigger,
    ];
    const pointerHoverPick = currentMode === "pointer";
    const pickData = pointerHoverPick
      ? data.map((d) => ({ ...d, kind: "molecule", index: d.i }))
      : data;
    return [
      new ScatterplotLayer({
        id: "landmarks-points",
        data: pickData,
        getPosition: (d) => [d.x, d.y, 0],
        getFillColor: (d) => fillColorForPoint(d),
        getRadius: (d) => radiusForPoint(d),
        radiusUnits: "common",
        radiusMinPixels: 1.5,
        stroked: false,
        filled: true,
        // Hover-only: pointer never selects points (click ignores molecules).
        pickable: pointerHoverPick,
        updateTriggers: {
          getFillColor: fillTriggers,
          getRadius: roleTrigger,
          pickable: pointerHoverPick,
        },
      }),
    ];
  }

  function landmarkLabelAnchor(lm, pathPts) {
    const name = String(lm.id || "").trim();
    if (!name) return null;
    if (lm.type === "point") {
      const v = (lm.vertices || [])[0];
      if (!v) return null;
      return {
        text: name,
        position: [v[0], v[1], 0],
        angle: 0,
        pixelOffset: [16, -16],
        textAnchor: "start",
        alignmentBaseline: "bottom",
      };
    }
    const pts = pathPts && pathPts.length ? pathPts : landmarkPathData(lm);
    if (!pts.length) return null;
    // Prefer near the end, stepped back slightly; larger offset from the tip.
    const endIdx = Math.max(0, pts.length - 1);
    const tipIdx = Math.max(0, Math.floor(endIdx * 0.92));
    const p = pts[tipIdx] || pts[endIdx];
    return {
      text: name,
      position: [p.x, p.y, 0],
      angle: 0,
      pixelOffset: lm.type === "shape" ? [0, -16] : [0, -18],
      textAnchor: "middle",
      alignmentBaseline: "bottom",
    };
  }

  function scaleRgbaAlpha(rgba, scale) {
    if (scale >= 0.999) return rgba;
    const out = rgba.slice();
    out[3] = Math.round((out[3] ?? 255) * scale);
    return out;
  }

  function buildLandmarkLayers() {
    if (!deckModules) return [];
    const { PathLayer, PolygonLayer, ScatterplotLayer, TextLayer, PathStyleExtension } = deckModules;
    const kind = model.get("selected_kind");
    const selectedIdx = model.get("selected_index");
    const stroke = STROKE_WIDTH;
    const opacity = LANDMARK_OPACITY;
    const dimOthers = kind === "landmark" && selectedIdx >= 0;
    const polys = [];
    const paths = [];
    const markers = [];
    const arrows = [];
    const labels = [];
    const arrowWorld = pixelsToWorld(14);
    (model.get("landmarks") || []).forEach((lm, i) => {
      if (lm.hidden) return;
      const hex = (typeof lm.color === "string" && lm.color) || COLORS[i % COLORS.length];
      const dashed = String(lm.line_style || "solid") === "dashed";
      const selected = kind === "landmark" && i === selectedIdx;
      const alphaScale = dimOthers && !selected ? 0.62 : 1;
      const lw = selected ? stroke + 1 : stroke;
      const line = scaleRgbaAlpha(hexToRgbaBytes(hex, 1), alphaScale);
      const fill = scaleRgbaAlpha(hexToRgbaBytes(hex, opacity), alphaScale);
      const pick = { kind: "landmark", index: i };
      if (lm.type === "point") {
        const v = (lm.vertices || [])[0];
        if (!v) return;
        markers.push({
          position: [v[0], v[1], 0],
          fill,
          line,
          lineWidth: selected ? 2 : 1.5,
          radius: selected ? 7 : 6,
          ...pick,
        });
        const anchor = landmarkLabelAnchor(lm);
        if (anchor) {
          const style = landmarkLabelStyle(hex);
          labels.push({
            ...anchor,
            color: scaleRgbaAlpha(style.color, alphaScale),
            background: scaleRgbaAlpha(style.background, alphaScale),
            ...pick,
          });
        }
        return;
      }
      const pathPts = landmarkPathData(lm);
      if (lm.type === "shape" && pathPts.length >= 3) {
        polys.push({
          polygon: asPath(pathPts),
          fill,
          line,
          width: lw,
          ...pick,
        });
        (lm.vertices || []).forEach(([x, y]) => {
          markers.push({
            position: [x, y, 0],
            fill: line,
            line,
            lineWidth: 0,
            radius: selected ? 5 : 4,
            ...pick,
          });
        });
        const anchor = landmarkLabelAnchor(lm, pathPts);
        if (anchor) {
          const style = landmarkLabelStyle(hex);
          labels.push({
            ...anchor,
            color: scaleRgbaAlpha(style.color, alphaScale),
            background: scaleRgbaAlpha(style.background, alphaScale),
            ...pick,
          });
        }
        return;
      }
      const buffer = bufferPolygonData(lm);
      if (buffer) {
        polys.push({
          polygon: asPath(buffer),
          fill: scaleRgbaAlpha(hexToRgbaBytes(NEIGH_COLOR, NEIGH_FILL_ALPHA), alphaScale),
          line: scaleRgbaAlpha(hexToRgbaBytes(NEIGH_COLOR, NEIGH_LINE_ALPHA), alphaScale),
          width: 1.5,
          ...pick,
        });
      }
      if (pathPts.length >= 2) {
        const path = asPath(pathPts);
        paths.push({
          path,
          color: line,
          width: lw,
          dashed,
          ...pick,
        });
        if (["line", "spline", "gradient"].includes(lm.type)) {
          const head = arrowHeadPolygon(path, arrowWorld);
          if (head) arrows.push({ polygon: head, fill: line, line, width: 1, ...pick });
        }
        (lm.vertices || []).forEach(([x, y]) => {
          markers.push({
            position: [x, y, 0],
            fill: line,
            line,
            lineWidth: 0,
            radius: selected ? 5 : 4,
            ...pick,
          });
        });
        const anchor = landmarkLabelAnchor(lm, pathPts);
        if (anchor) {
          const style = landmarkLabelStyle(hex);
          labels.push({
            ...anchor,
            color: scaleRgbaAlpha(style.color, alphaScale),
            background: scaleRgbaAlpha(style.background, alphaScale),
            ...pick,
          });
        }
      }
    });
    const layers = [];
    if (polys.length || arrows.length) {
      layers.push(
        new PolygonLayer({
          id: "landmark-polygons",
          data: [...polys, ...arrows],
          getPolygon: (d) => d.polygon,
          getFillColor: (d) => d.fill,
          getLineColor: (d) => d.line,
          getLineWidth: (d) => d.width,
          lineWidthUnits: "pixels",
          stroked: true,
          filled: true,
          pickable: true,
          parameters: OVERLAY_GL,
        })
      );
    }
    if (paths.length) {
      layers.push(
        new PathLayer({
          id: "landmark-paths",
          data: paths,
          getPath: (d) => d.path,
          getColor: (d) => d.color,
          getWidth: (d) => d.width,
          getDashArray: (d) => (d.dashed ? LANDMARK_DASH : [0, 0]),
          extensions: [new PathStyleExtension({ dash: true, highPrecisionDash: true })],
          widthUnits: "pixels",
          jointRounded: true,
          capRounded: true,
          pickable: true,
          widthMinPixels: 1,
          parameters: OVERLAY_GL,
        })
      );
    }
    if (markers.length) {
      layers.push(
        new ScatterplotLayer({
          id: "landmark-markers",
          data: markers,
          getPosition: (d) => d.position,
          getFillColor: (d) => d.fill,
          getLineColor: (d) => d.line,
          getRadius: (d) => d.radius,
          getLineWidth: (d) => d.lineWidth ?? 0,
          radiusUnits: "pixels",
          lineWidthUnits: "pixels",
          filled: true,
          stroked: true,
          pickable: true,
          radiusMinPixels: 2,
          parameters: OVERLAY_GL,
        })
      );
    }
    if (labels.length) {
      layers.push(
        new TextLayer({
          id: "landmark-labels",
          data: labels,
          getText: (d) => d.text,
          getPosition: (d) => d.position,
          getColor: (d) => d.color,
          getAngle: 0,
          getPixelOffset: (d) => d.pixelOffset || [0, 0],
          getTextAnchor: (d) => d.textAnchor || "middle",
          getAlignmentBaseline: (d) => d.alignmentBaseline || "center",
          getSize: 11,
          sizeUnits: "pixels",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 500,
          billboard: true,
          background: true,
          backgroundPadding: [8, 4],
          backgroundBorderRadius: 6,
          getBackgroundColor: (d) => d.background,
          outlineWidth: 0,
          pickable: false,
          parameters: OVERLAY_GL,
          updateTriggers: {
            getText: [model.get("landmarks")],
            getColor: [model.get("landmarks"), kind, selectedIdx],
            getBackgroundColor: [model.get("landmarks")],
            getPosition: [model.get("landmarks")],
          },
        })
      );
    }
    return layers;
  }

  function buildDraftLayers() {
    if (!deckModules) return [];
    const { PathLayer, PolygonLayer, ScatterplotLayer, PathStyleExtension } = deckModules;
    const isSel = ["lasso", "polygon", "rectangle", "ellipse"].includes(currentMode);
    // Preview color matches the next committed entity color.
    const hex = isSel
      ? SEL_COLORS[(model.get("selections") || []).length % SEL_COLORS.length]
      : COLORS[(model.get("landmarks") || []).length % COLORS.length];
    const line = hexToRgbaBytes(hex, 1);
    const fill = hexToRgbaBytes(hex, 0.15);
    const stroke = STROKE_WIDTH;
    const layers = [];
    let path = null;
    let polygon = null;
    let markers = [];

    if (isLassoing && lassoPath.length >= 2) {
      path = asPath(lassoPath);
    } else if (isBoxing && boxStart && boxCurrent) {
      polygon = boxPolygon(boxStart, boxCurrent);
    } else if (draft.length) {
      // Rubber-band: append live cursor after the last committed vertex.
      const preview =
        draftCursor &&
        ["line", "spline", "shape", "polygon"].includes(currentMode)
          ? [...draft, draftCursor]
          : draft;
      const sampled =
        currentMode === "spline"
          ? cardinalSample(preview, DEFAULT_TENSION, 20, false)
          : currentMode === "shape"
            ? cardinalSample(preview, DEFAULT_TENSION, 20, true)
            : preview;
      if (currentMode === "polygon" || currentMode === "shape") {
        polygon = asPath(sampled);
        path = asClosedPath(sampled);
      } else {
        path = asPath(sampled);
      }
      markers = draft.map((p) => ({ position: [p.x, p.y, 0], fill: line }));
      if (
        draftCursor &&
        ["line", "spline", "shape", "polygon"].includes(currentMode)
      ) {
        markers.push({
          position: [draftCursor.x, draftCursor.y, 0],
          fill: hexToRgbaBytes(hex, 0.55),
        });
      }
    }

    if (polygon && polygon.length >= 3) {
      // Fill without stroke; dashed outline via PathLayer when selection.
      layers.push(
        new PolygonLayer({
          id: "draft-polygon",
          data: [{ polygon, fill }],
          getPolygon: (d) => d.polygon,
          getFillColor: (d) => d.fill,
          stroked: false,
          filled: true,
          pickable: false,
          parameters: OVERLAY_GL,
        })
      );
      const outline = asClosedPath(polygon.map((pt) => ({ x: pt[0], y: pt[1] })));
      layers.push(
        new PathLayer({
          id: "draft-polygon-outline",
          data: [{ path: outline, color: line, width: isSel ? 2 : stroke }],
          getPath: (d) => d.path,
          getColor: (d) => d.color,
          getWidth: (d) => d.width,
          widthUnits: "pixels",
          jointRounded: true,
          capRounded: true,
          pickable: false,
          parameters: OVERLAY_GL,
          ...(isSel
            ? {
                getDashArray: SELECTION_DOT,
                dashJustified: true,
                extensions: [new PathStyleExtension({ dash: true, highPrecisionDash: true })],
              }
            : {}),
        })
      );
    } else if (path && path.length >= 2) {
      layers.push(
        new PathLayer({
          id: "draft-path",
          data: [{ path, color: line, width: isSel ? 2 : stroke }],
          getPath: (d) => d.path,
          getColor: (d) => d.color,
          getWidth: (d) => d.width,
          widthUnits: "pixels",
          jointRounded: true,
          capRounded: true,
          pickable: false,
          parameters: OVERLAY_GL,
          ...(isSel
            ? {
                getDashArray: SELECTION_DOT,
                dashJustified: true,
                extensions: [new PathStyleExtension({ dash: true, highPrecisionDash: true })],
              }
            : {}),
        })
      );
    }
    if (markers.length) {
      layers.push(
        new ScatterplotLayer({
          id: "draft-markers",
          data: markers,
          getPosition: (d) => d.position,
          getFillColor: (d) => d.fill,
          getRadius: 4,
          radiusUnits: "pixels",
          filled: true,
          stroked: false,
          pickable: false,
          parameters: OVERLAY_GL,
        })
      );
    }
    return layers;
  }

  function pixelsToWorld(px) {
    const vp = deckgl?.isInitialized ? deckgl.getViewports()?.[0] : null;
    if (!vp?.unproject) return px;
    const [x0] = vp.unproject([0, 0]);
    const [x1] = vp.unproject([px, 0]);
    return Math.max(Math.abs(x1 - x0), 1e-9);
  }

  function arrowHeadPolygon(path, size) {
    if (!path || path.length < 2 || !(size > 0)) return null;
    const a = path[path.length - 2];
    const b = path[path.length - 1];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const ux = (b[0] - a[0]) / len;
    const uy = (b[1] - a[1]) / len;
    const px = -uy;
    const py = ux;
    const tip = [b[0] + ux * size * 0.15, b[1] + uy * size * 0.15];
    const base = [b[0] - ux * size, b[1] - uy * size];
    return [
      tip,
      [base[0] + px * size * 0.55, base[1] + py * size * 0.55],
      [base[0] - px * size * 0.55, base[1] - py * size * 0.55],
    ];
  }

  function lookupGraphNeighbors(graph, pts, seedIdxs, opts) {
    const edges = [];
    const neighbors = [];
    if (!graph || !seedIdxs.length) return { edges, neighbors };
    const mode = opts?.mode || "knn";
    const takeK = Math.max(0, opts?.k | 0);
    const radius = Number(opts?.radius) || 0;
    // Radius mode uses outlined disks, not edge spaghetti — skip path building.
    const wantEdges = opts?.edges === true || (opts?.edges !== false && mode === "knn");
    if (mode === "knn" && takeK <= 0) return { edges, neighbors };
    if (mode === "radius" && !(radius > 0)) return { edges, neighbors };
    const { indptr, indices, distances } = graph;
    const seen = new Set();
    for (const si of seedIdxs) {
      const start = indptr[si] | 0;
      const end = indptr[si + 1] | 0;
      const s = pts[si];
      const stop = mode === "knn" ? Math.min(end, start + takeK) : end;
      for (let p = start; p < stop; p++) {
        if (mode === "radius") {
          const d = distances && distances.length ? distances[p] : 0;
          if (d > radius) break;
        }
        const j = indices[p] | 0;
        if (!seen.has(j)) {
          seen.add(j);
          neighbors.push(j);
        }
        if (wantEdges) {
          edges.push({
            path: [
              [s.x, s.y],
              [pts[j].x, pts[j].y],
            ],
          });
        }
      }
    }
    return { edges, neighbors };
  }

  function buildNeighborhoodLayers() {
    if (!deckModules) return [];
    if (isRasterMode()) return [];
    const focus = cellLayerFocus();
    const hood = neighborhoodFor(focus);
    if (!focus || !hood || hood.neighborhood === "off") return [];
    const layers = [];
    const { PathLayer, BitmapLayer } = deckModules;
    const pick = { kind: focus.kind, index: focus.index };
    // Radius: soft gradient field baked in world/common units (µm); no per-seed disks.
    if (hood.neighborhood === "radius" && hoodRadiusGradient?.image) {
      layers.push(
        new BitmapLayer({
          id: "neighborhood-radius-gradient",
          image: hoodRadiusGradient.image,
          bounds: hoodRadiusGradient.bounds,
          pickable: false,
          textureParameters: {
            minFilter: "linear",
            magFilter: "linear",
          },
          parameters: OVERLAY_GL,
          updateTriggers: {
            image: hoodRadiusGradient.key,
          },
        })
      );
    }
    // kNN: restyled seed→neighbor edges (thin, low-opacity design-token teal).
    if (hood.neighborhood === "knn" && hoodEdges.length) {
      layers.push(
        new PathLayer({
          id: "neighborhood-knn",
          data: hoodEdges.map((e) => ({ ...e, ...pick })),
          getPath: (d) => d.path,
          getColor: hexToRgbaBytes(NEIGH_COLOR, NEIGH_EDGE_ALPHA),
          getWidth: NEIGH_EDGE_WIDTH,
          widthUnits: "pixels",
          pickable: false,
          parameters: OVERLAY_GL,
        })
      );
    }
    return layers;
  }

  function resolvePointerTarget(info) {
    if (!info) return null;
    // Prefer multi-pick stack: landmark only (points are not selectable).
    if (deckgl?.isInitialized && info.x != null && info.y != null) {
      const stack = deckgl.pickObjects({
        x: info.x,
        y: info.y,
        radius: 8,
        depth: 12,
      }) || [];
      const objs = stack.map((s) => s.object).filter(Boolean);
      const landmark = objs.find((o) => o.kind === "landmark");
      if (landmark) return { kind: "landmark", index: landmark.index };
    }
    const obj = info.object;
    if (obj?.kind === "landmark") {
      return { kind: "landmark", index: obj.index };
    }
    return null;
  }

  /** Hover pick includes molecules for pie / tooltips; never used for selection. */
  function resolveHoverTarget(info) {
    if (!info) return null;
    if (deckgl?.isInitialized && info.x != null && info.y != null) {
      const stack = deckgl.pickObjects({
        x: info.x,
        y: info.y,
        radius: 8,
        depth: 12,
      }) || [];
      const objs = stack.map((s) => s.object).filter(Boolean);
      const landmark = objs.find((o) => o.kind === "landmark");
      if (landmark) return { kind: "landmark", index: landmark.index };
      const mol = objs.find((o) => o.kind === "molecule");
      if (mol) return { kind: "molecule", index: mol.index };
    }
    const obj = info.object;
    if (obj?.kind === "landmark" || obj?.kind === "molecule") {
      return { kind: obj.kind, index: obj.index };
    }
    return null;
  }

  function inspectHaloTargets() {
    const out = [];
    const pinKind = model.get("selected_kind");
    const pinIndex = model.get("selected_index");
    // Landmark pin only — no category / molecule outlines.
    if (pinKind === "landmark" && pinIndex >= 0) {
      out.push({ kind: pinKind, index: pinIndex, pinned: true });
    }
    if (
      hoverTarget?.kind === "landmark" &&
      !(pinKind === "landmark" && hoverTarget.index === pinIndex)
    ) {
      out.push({ ...hoverTarget, pinned: false });
    }
    return out;
  }

  function haloPositionsFor(hit) {
    const pts = getPointsData();
    if (hit.kind === "molecule") {
      const p = pts[hit.index];
      return p ? [[p.x, p.y, 0]] : [];
    }
    if (hit.kind === "landmark") {
      // No center-point halo for landmarks — selection uses stroke emphasis.
      return [];
    }
    return [];
  }

  function buildInspectHaloLayer() {
    if (!deckModules || currentMode !== "pointer") return null;
    const { ScatterplotLayer } = deckModules;
    const size = model.get("point_size") ?? 2;
    const data = [];
    for (const hit of inspectHaloTargets()) {
      const hex = haloColorFor(hit.kind);
      const fill = hexToRgbaBytes(hex, hit.pinned ? 0.28 : 0.16);
      const line = hexToRgbaBytes(hex, hit.pinned ? 0.95 : 0.55);
      const radius = size * (hit.pinned ? 2.4 : 2.0);
      for (const position of haloPositionsFor(hit)) {
        data.push({
          position,
          fill,
          line,
          radius,
          lineWidth: hit.pinned ? 2 : 1.25,
        });
      }
    }
    if (!data.length) return null;
    return new ScatterplotLayer({
      id: "inspect-halo",
      data,
      getPosition: (d) => d.position,
      getFillColor: (d) => d.fill,
      getLineColor: (d) => d.line,
      getRadius: (d) => d.radius,
      getLineWidth: (d) => d.lineWidth,
      radiusUnits: "common",
      lineWidthUnits: "pixels",
      stroked: true,
      filled: true,
      pickable: false,
      parameters: OVERLAY_GL,
      updateTriggers: {
        getFillColor: [hoverTarget, model.get("selected_kind"), model.get("selected_index")],
        getRadius: [model.get("point_size")],
      },
    });
  }

  function buildDeckLayers() {
    prepareFocusGeom();
    // Selection emphasis lives on the points layer (size + dimming); no outline layers.
    return [
      ...buildRasterLayers(),
      ...buildNeighborhoodLayers(),
      ...buildPointsLayer(),
      buildInspectHaloLayer(),
      ...buildLandmarkLayers(),
      ...buildDraftLayers(),
    ].filter(Boolean);
  }

  function computeDeckViewState(w, h) {
    const [xMin, xMax] = model.get("x_bounds");
    const [yMin, yMax] = model.get("y_bounds");
    const cx = (xMin + xMax) / 2;
    const cy = (yMin + yMax) / 2;
    const spanX = Math.max(xMax - xMin, 1e-6);
    const spanY = Math.max(yMax - yMin, 1e-6);
    const pad = 40;
    const zoom = Math.log2(
      Math.min((w - pad * 2) / spanX, (h - pad * 2) / spanY)
    );
    // Clamp scroll/button zoom relative to fit (±log2: −1 ≈ 2× out, +6 ≈ 64× in).
    return {
      target: [cx, cy, 0],
      zoom,
      minZoom: zoom - 1,
      maxZoom: zoom + 6,
    };
  }

  function fitDeckToBounds() {
    if (!deckgl) return;
    const w = Math.max(1, webglCanvas.clientWidth || webglCanvas.width);
    const h = Math.max(1, webglCanvas.clientHeight || webglCanvas.height);
    if (w <= 1 || h <= 1) return;
    currentViewState = computeDeckViewState(w, h);
    fitZoom = currentViewState.zoom;
    deckgl.setProps({
      viewState: currentViewState,
      initialViewState: currentViewState,
      width: w,
      height: h,
    });
    if (resetWidget) resetWidget.setProps({ initialViewState: currentViewState });
    fittedOnce = true;
    for (const fn of viewStateListeners) {
      try {
        fn(currentViewState);
      } catch {
        /* ignore */
      }
    }
  }

  function syncFitAsInitialViewState(vs) {
    if (!deckgl || !vs) return;
    deckgl.setProps({ initialViewState: vs });
    if (resetWidget) resetWidget.setProps({ initialViewState: vs });
  }

  /**
   * Stock ZoomWidget spreads Viewport instances ({position}) into viewState.
   * OrthographicView expects {target, zoom}, so the widget bridge cannot drive
   * this camera correctly. Keep widgets mounted (DOM hidden) for compatibility,
   * but implement zoom/reset via EngineHandle viewState updates.
   */
  function setViewState(next, { animate = false, duration = 200 } = {}) {
    if (!deckgl || !currentViewState) return;
    const vs = {
      ...currentViewState,
      ...next,
      transitionDuration: animate ? duration : 0,
    };
    if (animate) {
      if (!zoomInterpolator && deckModules?.LinearInterpolator) {
        zoomInterpolator = new deckModules.LinearInterpolator({
          transitionProps: ["target", "zoom"],
        });
      }
      if (zoomInterpolator) vs.transitionInterpolator = zoomInterpolator;
      vs.transitionEasing = easeOutQuart;
    }
    currentViewState = vs;
    deckgl.setProps({ viewState: vs });
    for (const fn of viewStateListeners) {
      try {
        fn(vs);
      } catch {
        /* ignore listener errors */
      }
    }
  }

  /** React chrome zoom buttons → orthographic viewState. */
  zoomBy = (delta, opts = {}) => {
    if (!deckgl || !currentViewState || !delta) return;
    const fit = fitZoom ?? currentViewState.zoom ?? 0;
    const minZ = currentViewState.minZoom ?? fit - 1;
    const maxZ = currentViewState.maxZoom ?? fit + 6;
    const zoom = Math.max(
      minZ,
      Math.min(maxZ, (currentViewState.zoom ?? 0) + delta)
    );
    const animate = opts.animate !== false && opts.animate !== 0;
    setViewState({ zoom }, {
      animate,
      duration: opts.duration ?? (animate ? 200 : 0),
    });
  };

  /** React chrome reset → fit bounds. */
  resetZoom = () => {
    if (!deckgl) return;
    const w = Math.max(1, webglCanvas.clientWidth || webglCanvas.width);
    const h = Math.max(1, webglCanvas.clientHeight || webglCanvas.height);
    if (w <= 1 || h <= 1) return;
    const fitted = computeDeckViewState(w, h);
    fitZoom = fitted.zoom;
    fittedOnce = true;
    syncFitAsInitialViewState(fitted);
    setViewState(
      {
        target: fitted.target,
        zoom: fitted.zoom,
        minZoom: fitted.minZoom,
        maxZoom: fitted.maxZoom,
      },
      { animate: true, duration: 320 }
    );
    // Recalibrate common-space point radius for the new fit zoom.
    setDeckLayers();
  };

  function resolvePlotBackground() {
    // Prefer a resolved used color (custom props may still be `var(...)`).
    for (const el of [body, container, plotStack]) {
      if (!el) continue;
      const used = getComputedStyle(el).backgroundColor;
      if (used && used !== "rgba(0, 0, 0, 0)" && used !== "transparent") {
        return used;
      }
    }
    const token = getComputedStyle(container).getPropertyValue("--background").trim();
    if (token && !token.startsWith("var(")) return token;
    return container.classList.contains("landmarks--dark") ? "#000000" : "#ffffff";
  }

  applyPlotBackground = () => {
    const bg = resolvePlotBackground();
    plotStack.style.background = bg;
    webglCanvas.style.background = bg;
    if (!deckgl) return;
    deckgl.setProps({
      parameters: { clearColor: cssColorToClear(bg),  },
      ...(currentViewState ? { viewState: currentViewState } : {}),
    });
    if (typeof deckgl.redraw === "function") deckgl.redraw(true);
  };

  function applyDeckProps(props) {
    if (!deckgl) return;
    const bg = resolvePlotBackground();
    deckgl.setProps({
      parameters: { clearColor: cssColorToClear(bg),  },
      ...props,
      ...(currentViewState ? { viewState: currentViewState } : {}),
    });
  }

  function setDeckLayers() {
    if (!deckgl || !deckModules) return;
    if (layerRaf) return;
    layerRaf = requestAnimationFrame(() => {
      layerRaf = 0;
      applyDeckProps({ layers: buildDeckLayers() });
    });
  }

  async function loadDeckModules() {
    if (deckModules) return deckModules;
    deckModules = DECK_MODULES;
    return deckModules;
  }

  async function initDeck() {
    if (deckgl) return;
    const { w, h } = syncCanvasBuffer();
    webglCanvas.style.display = "block";
    applyPlotBackground();
    try {
      const {
        Deck,
        OrthographicView,
        ZoomWidget: ZoomWidgetCtor,
        ResetViewWidget: ResetViewWidgetCtor,
      } = await loadDeckModules();
      const layers = buildDeckLayers();
      if (!layers.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const vs = computeDeckViewState(w, h);
      currentViewState = vs;
      fitZoom = vs.zoom;
      const bg = resolvePlotBackground();
      zoomWidget = new ZoomWidgetCtor({
        id: "landmarks-zoom",
        style: HIDDEN_WIDGET_STYLE,
        transitionDuration: 200,
      });
      resetWidget = new ResetViewWidgetCtor({
        id: "landmarks-reset-view",
        style: HIDDEN_WIDGET_STYLE,
        initialViewState: vs,
      });
      deckgl = new Deck({
        canvas: webglCanvas,
        width: w,
        height: h,
        useDevicePixels: true,
        parent: host,
        views: new OrthographicView(),
        controller: controllerProps(),
        initialViewState: vs,
        widgets: [zoomWidget, resetWidget],
        parameters: { clearColor: cssColorToClear(bg) },
        layers,
        pickingRadius: 8,
        getTooltip: deckTooltip,
        getCursor: ({ isDragging, isHovering }) => {
          if (isDragging) return "grabbing";
          if (currentMode === "pointer" && isHovering) return "pointer";
          if (isLandmarkDrawMode(currentMode) && isHovering) return "pointer";
          return defaultCursor();
        },
        onViewStateChange: ({ viewState }) => {
          const fit = fitZoom ?? viewState.zoom ?? 0;
          const vs = {
            ...viewState,
            minZoom: viewState.minZoom ?? currentViewState?.minZoom ?? fit - 1,
            maxZoom: viewState.maxZoom ?? currentViewState?.maxZoom ?? fit + 6,
          };
          currentViewState = vs;
          deckgl.setProps({ viewState: vs });
          for (const fn of viewStateListeners) {
            try {
              fn(vs);
            } catch {
              /* ignore listener errors */
            }
          }
        },
        onClick: (info) => {
          if (currentMode !== "pointer") return;
          if (suppressClick) {
            suppressClick = false;
            return;
          }
          const hit = resolvePointerTarget(info);
          if (hit) {
            setSelected(hit.kind, hit.index);
            return;
          }
          if (rasterSimilarityOn() && info?.coordinate) {
            const bin = pickBinAtWorld(info.coordinate[0], info.coordinate[1]);
            if (bin >= 0) {
              model.set("raster_query_bin", bin);
              model.save_changes();
              setDeckLayers();
              return;
            }
          }
          setSelected("", -1);
        },
        onHover: (info) => {
          if (currentMode === "pointer") {
            const hit = resolveHoverTarget(info);
            if (rasterSimilarityOn() && info?.coordinate) {
              const pinned = model.get("raster_query_bin");
              const bin =
                pinned != null && pinned >= 0
                  ? -1
                  : pickBinAtWorld(info.coordinate[0], info.coordinate[1]);
              if (bin !== hoverBinIndex) {
                hoverBinIndex = bin;
                if (hoverRaf) cancelAnimationFrame(hoverRaf);
                hoverRaf = requestAnimationFrame(() => {
                  hoverRaf = 0;
                  setDeckLayers();
                });
              }
              webglCanvas.style.cursor =
                hit?.kind === "landmark" || bin >= 0 ? "pointer" : "default";
            } else {
              if (hoverBinIndex >= 0) {
                hoverBinIndex = -1;
                setDeckLayers();
              }
              webglCanvas.style.cursor =
                hit?.kind === "landmark" ? "pointer" : "default";
            }
            if (sameTarget(hoverTarget, hit)) return;
            hoverTarget = hit;
            for (const fn of hoverListeners) {
              try {
                fn(hoverTarget ? { ...hoverTarget } : null);
              } catch {
                /* ignore */
              }
            }
            if (hoverRaf) cancelAnimationFrame(hoverRaf);
            hoverRaf = requestAnimationFrame(() => {
              hoverRaf = 0;
              setDeckLayers();
            });
            return;
          }
          if (hoverTarget) {
            hoverTarget = null;
            for (const fn of hoverListeners) {
              try {
                fn(null);
              } catch {
                /* ignore */
              }
            }
            setDeckLayers();
          }
          if (hoverBinIndex >= 0) {
            hoverBinIndex = -1;
            setDeckLayers();
          }
          if (isLandmarkDrawMode(currentMode)) {
            const hit = resolvePointerTarget(info);
            webglCanvas.style.cursor =
              hit?.kind === "landmark" ? "pointer" : defaultCursor();
            return;
          }
          webglCanvas.style.cursor = defaultCursor();
        },
        onLoad: () => {
          updatePointLegend();
          requestAnimationFrame(() => {
            syncCanvasBuffer();
            fitDeckToBounds();
            applyDeckProps({ layers: buildDeckLayers() });
            if (typeof deckgl.redraw === "function") deckgl.redraw(true);
          });
        },
      });
      syncInteractionMode();
    } catch (err) {
      console.error("landmarks deck init failed", err);
      const msg = document.createElement("div");
      msg.className = "landmarks__error";
      msg.textContent = `Deck renderer failed: ${err?.message || err}`;
      plotStack.appendChild(msg);
    }
  }

  function resizeDeck() {
    if (!deckgl) return;
    const { w, h } = syncCanvasBuffer();
    applyDeckProps({ width: w, height: h });
    if (!fittedOnce && w > 1 && h > 1) {
      fitDeckToBounds();
    } else if (typeof deckgl.redraw === "function") {
      deckgl.redraw(true);
    }
  }

  function cardinalSample(points, tension, nPerSeg, closed) {
    const n = nPerSeg || 20;
    const t = Math.max(0, Math.min(1, tension == null ? 0 : tension));
    const s = (1 - t) / 2;
    let pts = points.slice();
    let nSeg;
    let at;
    if (closed) {
      if (pts.length >= 2) {
        const a = pts[0], b = pts[pts.length - 1];
        if (a.x === b.x && a.y === b.y) pts = pts.slice(0, -1);
      }
      if (pts.length < 3) return pts.slice();
      const m = pts.length;
      at = (i) => pts[((i % m) + m) % m];
      nSeg = m;
    } else {
      if (pts.length < 2) return pts.slice();
      if (pts.length === 2) return pts.slice();
      const ext = [
        { x: 2 * pts[0].x - pts[1].x, y: 2 * pts[0].y - pts[1].y },
        ...pts,
        {
          x: 2 * pts[pts.length - 1].x - pts[pts.length - 2].x,
          y: 2 * pts[pts.length - 1].y - pts[pts.length - 2].y,
        },
      ];
      at = (i) => ext[i + 1];
      nSeg = pts.length - 1;
    }
    const out = [];
    for (let i = 0; i < nSeg; i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const m1x = s * (p2.x - p0.x), m1y = s * (p2.y - p0.y);
      const m2x = s * (p3.x - p1.x), m2y = s * (p3.y - p1.y);
      for (let j = 0; j < n; j++) {
        const u = j / n, u2 = u * u, u3 = u2 * u;
        const h00 = 2 * u3 - 3 * u2 + 1;
        const h10 = u3 - 2 * u2 + u;
        const h01 = -2 * u3 + 3 * u2;
        const h11 = u3 - u2;
        out.push({
          x: h00 * p1.x + h10 * m1x + h01 * p2.x + h11 * m2x,
          y: h00 * p1.y + h10 * m1y + h01 * p2.y + h11 * m2y,
        });
      }
    }
    out.push({ ...at(closed ? nSeg : pts.length - 1) });
    return out;
  }

  function rotatePt(p, origin, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const dx = p.x - origin.x, dy = p.y - origin.y;
    return { x: origin.x + dx * c - dy * s, y: origin.y + dx * s + dy * c };
  }

  function landmarkPathData(lm) {
    const verts = (lm.vertices || []).map(([x, y]) => ({ x, y }));
    if (lm.type === "spline" || lm.type === "gradient") return cardinalSample(verts, lm.tension ?? 0, 20, false);
    if (lm.type === "shape") return cardinalSample(verts, lm.tension ?? 0, 20, true);
    return verts;
  }

  function maxBufferWidth() {
    const [xMin, xMax] = model.get("x_bounds");
    const [yMin, yMax] = model.get("y_bounds");
    return 0.25 * Math.min(Math.abs(xMax - xMin), Math.abs(yMax - yMin));
  }

  function maxNeighborhoodK() {
    return Math.max(1, model.get("neighbor_k_max") || 64);
  }

  function maxNeighborhoodRadius() {
    const t = Number(model.get("neighbor_radius_max") || 0);
    return t > 0 ? t : maxBufferWidth();
  }

  // Offset a polyline by `width` along its left normal (negative goes right).
  function offsetPathData(points, width) {
    return points.map((p, i) => {
      const a = points[Math.max(0, i - 1)];
      const b = points[Math.min(points.length - 1, i + 1)];
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const dx = (b.x - a.x) / len;
      const dy = (b.y - a.y) / len;
      return { x: p.x - dy * width, y: p.y + dx * width };
    });
  }

  function bufferPolygonData(lm) {
    const width = Number(lm.buffer_width || 0);
    if (!(width > 0) || !BUFFERABLE.includes(lm.type)) return null;
    const points = landmarkPathData(lm);
    if (points.length < 2) return null;
    const side = lm.buffer_side || "both";
    if (side === "left") return [...points, ...offsetPathData(points, width).reverse()];
    if (side === "right") return [...points, ...offsetPathData(points, -width).reverse()];
    return [...offsetPathData(points, width), ...offsetPathData(points, -width).reverse()];
  }

  function cellLayerFocus() {
    const kind = model.get("selected_kind");
    const index = model.get("selected_index");
    if (kind === "type" || kind === "selection") return { kind, index };
    return null;
  }

  function landmarkFocus() {
    if (model.get("selected_kind") === "landmark") {
      return { kind: "landmark", index: model.get("selected_index") };
    }
    return null;
  }

  function neighborhoodFor(focus) {
    if (!focus) return null;
    return neighborhoodForArgs(
      focus.kind,
      focus.index,
      model.get("selections") || [],
      model.get("type_neighborhoods") || [],
      model.get("legend_labels") || [],
      model.get("active_category") || "",
    );
  }

  function activeNeighborhood() {
    return neighborhoodFor(cellLayerFocus());
  }

  function focusedLandmark() {
    const focus = landmarkFocus();
    if (!focus) return null;
    const landmarks = model.get("landmarks") || [];
    return focus.index >= 0 && focus.index < landmarks.length ? landmarks[focus.index] : null;
  }

  function updateActiveNeighborhood(patch) {
    const focus = cellLayerFocus();
    if (!focus) return;
    patchNeighborhood(
      model,
      focus.kind,
      focus.index,
      patch,
      model.get("selections") || [],
      model.get("type_neighborhoods") || [],
      model.get("legend_labels") || [],
      model.get("active_category") || "",
    );
    setDeckLayers();
  }

  function selectionMemberIndices(sel, pts) {
    if (sel?.hidden) return [];
    const raw = sel?.point_indices;
    if (Array.isArray(raw) && raw.length) {
      const n = pts.length;
      const out = [];
      for (let i = 0; i < raw.length; i++) {
        const idx = Number(raw[i]);
        if (Number.isInteger(idx) && idx >= 0 && idx < n) out.push(idx);
      }
      return out;
    }
    const poly = selectionPolygonData(sel || {});
    if (poly.length < 3) return [];
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      if (pointInRing(pts[i], poly)) out.push(i);
    }
    return out;
  }

  /** Commit a drawn region as indices-only (no durable geometry). */
  function commitPointSelection(tempGeom) {
    const pts = getPointsData();
    const indices = selectionMemberIndices(
      { ...tempGeom, point_indices: undefined, hidden: false },
      pts,
    );
    if (!indices.length) return false;
    const selections = [...(model.get("selections") || [])];
    selections.push(
      withHood({
        id: nextSelectionId(selections),
        type: "points",
        point_indices: indices,
      }),
    );
    model.set("selections", selections);
    model.set("selected_kind", "selection");
    model.set("selected_index", selections.length - 1);
    resetToPointerMode();
    model.save_changes();
    return true;
  }

  function seedIndicesFor(focus) {
    const pts = getPointsData();
    if (!focus) return [];
    if (focus.kind === "type") {
      return pts.reduce((acc, _p, i) => {
        if (categoryCodeAt(i) === focus.index) acc.push(i);
        return acc;
      }, []);
    }
    if (focus.kind === "selection") {
      const sel = (model.get("selections") || [])[focus.index];
      return selectionMemberIndices(sel || {}, pts);
    }
    return [];
  }

  function pointInRing(p, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      const hit =
        yi > p.y !== yj > p.y && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi + 1e-12) + xi;
      if (hit) inside = !inside;
    }
    return inside;
  }


  function hashSeedIndices(seeds) {
    let h = seeds.length * 73856093;
    for (let i = 0; i < seeds.length; i++) h = (Math.imul(h, 31) + (seeds[i] | 0)) | 0;
    return h;
  }

  /**
   * Bake a min-distance-to-nearest-seed field at r_max (world/common µm).
   * AABB is expanded by r_max once; seed world positions stay fixed (never
   * uniformly scale the AABB when r changes — that would pull seeds together).
   * Rebaked only when seeds or r_max change — not on pan/zoom or current-r slider.
   */
  function bakeRadiusDistanceField(pts, seeds, rMax) {
    if (!seeds.length || !(rMax > 0)) return null;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const positions = [];
    for (let i = 0; i < seeds.length; i++) {
      const s = pts[seeds[i]];
      if (!s) continue;
      positions.push(s);
      if (s.x < minX) minX = s.x;
      if (s.y < minY) minY = s.y;
      if (s.x > maxX) maxX = s.x;
      if (s.y > maxY) maxY = s.y;
    }
    if (!positions.length) return null;
    minX -= rMax;
    minY -= rMax;
    maxX += rMax;
    maxY += rMax;
    const spanX = Math.max(maxX - minX, 1e-6);
    const spanY = Math.max(maxY - minY, 1e-6);
    const maxDim =
      positions.length > 800 ? NEIGH_GRADIENT_MAX_DIM_LARGE : NEIGH_GRADIENT_MAX_DIM;
    const scale = maxDim / Math.max(spanX, spanY);
    const w = Math.max(1, Math.min(maxDim, Math.ceil(spanX * scale)));
    const h = Math.max(1, Math.min(maxDim, Math.ceil(spanY * scale)));
    const sx = w / spanX;
    const sy = h / spanY;
    // World-unit distance; Infinity sentinel → no seed within r_max.
    const dist = new Float32Array(w * h);
    dist.fill(Number.POSITIVE_INFINITY);
    const rPxX = rMax * sx;
    const rPxY = rMax * sy;

    for (let si = 0; si < positions.length; si++) {
      const s = positions[si];
      // Canvas y=0 is top; map world maxY → row 0 so BitmapLayer bounds top matches.
      const cx = (s.x - minX) * sx;
      const cy = (maxY - s.y) * sy;
      const x0 = Math.max(0, Math.floor(cx - rPxX));
      const x1 = Math.min(w - 1, Math.ceil(cx + rPxX));
      const y0 = Math.max(0, Math.floor(cy - rPxY));
      const y1 = Math.min(h - 1, Math.ceil(cy + rPxY));
      for (let y = y0; y <= y1; y++) {
        const dyWorld = ((y + 0.5 - cy) / sy);
        const row = y * w;
        for (let x = x0; x <= x1; x++) {
          const dxWorld = ((x + 0.5 - cx) / sx);
          const d = Math.hypot(dxWorld, dyWorld);
          if (d > rMax) continue;
          const idx = row + x;
          if (d < dist[idx]) dist[idx] = d;
        }
      }
    }

    return {
      dist,
      w,
      h,
      // [left, bottom, right, top] in world/common units (fixed at r_max)
      bounds: [minX, minY, maxX, maxY],
      seedCount: positions.length,
      rMax,
      textureSize: [w, h],
    };
  }

  /**
   * Remap a baked distance field to the visible soft-gradient canvas for current r.
   * O(texture) — no per-seed restamp. Min-distance + monotonic falloff ≡ max-blend
   * of per-seed kernels. Peak alpha clamped so unions do not overwhelm.
   */
  function remapRadiusGradientFromDist(bake, radius) {
    if (!bake || !(radius > 0)) return null;
    const { dist, w, h, bounds, seedCount, textureSize, rMax } = bake;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const img = ctx.createImageData(w, h);
    const data = img.data;
    const [cr, cg, cb] = hexToRgbaBytes(NEIGH_GRADIENT_COLOR, 1);
    const peak = Math.round(255 * NEIGH_GRADIENT_PEAK_ALPHA);
    const r = Math.min(radius, rMax);
    for (let i = 0; i < dist.length; i++) {
      const d = dist[i];
      if (!(d < r)) continue;
      // Soft smoothstep falloff in world units relative to current r.
      const t = 1 - d / r;
      const a = t * t * (3 - 2 * t);
      const o = i * 4;
      data[o] = cr;
      data[o + 1] = cg;
      data[o + 2] = cb;
      data[o + 3] = Math.min(255, Math.round(a * peak));
    }
    ctx.putImageData(img, 0, 0);
    return {
      image: canvas,
      bounds,
      seedCount,
      textureSize,
      radius: r,
      bakeRMax: rMax,
    };
  }

  /** Bake at r_max on seed/r_max change; remap only when current r changes. */
  function ensureRadiusGradient(pts, seeds, radius, rMax) {
    if (!seeds.length || !(radius > 0) || !(rMax > 0)) {
      hoodRadiusBake = null;
      hoodRadiusGradient = null;
      return;
    }
    const bakeKey = `${rMax.toFixed(5)}:${hashSeedIndices(seeds)}:${seeds.length}`;
    if (!hoodRadiusBake || hoodRadiusBake.key !== bakeKey) {
      const baked = bakeRadiusDistanceField(pts, seeds, rMax);
      hoodRadiusBake = baked ? { ...baked, key: bakeKey } : null;
    }
    if (!hoodRadiusBake) {
      hoodRadiusGradient = null;
      return;
    }
    const r = Math.min(radius, rMax);
    const viewKey = `${bakeKey}:${r.toFixed(5)}`;
    if (!hoodRadiusGradient || hoodRadiusGradient.key !== viewKey) {
      const remapped = remapRadiusGradientFromDist(hoodRadiusBake, r);
      hoodRadiusGradient = remapped ? { ...remapped, key: viewKey } : null;
    }
  }

  function prepareFocusGeom() {
    const pts = getPointsData();
    pointRoles = new Uint8Array(pts.length);
    pointRoleMode = false;
    hoodEdges = [];
    const focus = cellLayerFocus();
    if (!focus) {
      hoodRadiusBake = null;
      hoodRadiusGradient = null;
      return;
    }
    const seeds = seedIndicesFor(focus);
    if (!seeds.length) {
      hoodRadiusBake = null;
      hoodRadiusGradient = null;
      return;
    }
    // Category / selection focus: enlarge seeds and dim others.
    pointRoleMode = true;
    for (const i of seeds) pointRoles[i] = SEED_ROLE;
    const hood = neighborhoodFor(focus);
    if (!hood || hood.neighborhood === "off") {
      hoodRadiusBake = null;
      hoodRadiusGradient = null;
      return;
    }
    const graph = hood.neighborhood === "radius" ? radiusGraph : knnGraph;
    if (hood.neighborhood === "radius" || hood.neighborhood === "knn") {
      const k = Math.min(Number(hood.neighborhood_k) || 12, maxNeighborhoodK());
      let r = Number(hood.neighborhood_radius) || 0;
      const rMax = maxNeighborhoodRadius();
      if (rMax > 0) r = Math.min(r, rMax);
      const result = lookupGraphNeighbors(graph, pts, seeds, {
        mode: hood.neighborhood,
        k,
        radius: r,
        edges: hood.neighborhood === "knn",
      });
      hoodEdges = result.edges;
      for (const i of result.neighbors) {
        if (pointRoles[i] !== SEED_ROLE) pointRoles[i] = NEIGH_ROLE;
      }
      if (hood.neighborhood === "radius" && r > 0 && rMax > 0) {
        ensureRadiusGradient(pts, seeds, r, rMax);
      } else {
        hoodRadiusBake = null;
        hoodRadiusGradient = null;
      }
    } else {
      hoodRadiusBake = null;
      hoodRadiusGradient = null;
    }
  }

  function updateSelectedLandmark(patch) {
    const focus = landmarkFocus();
    if (!focus) return;
    patchLandmark(model, focus.index, patch, model.get("landmarks") || []);
    setDeckLayers();
  }

  function findHit(pt, radius = 8) {
    if (!deckgl?.isInitialized || !pt) return null;
    const stack =
      deckgl.pickObjects({ x: pt.px, y: pt.py, radius, depth: 12 }) || [];
    const objs = stack.map((s) => s.object).filter(Boolean);
    const landmark = objs.find((o) => o.kind === "landmark");
    if (landmark) return { kind: "landmark", index: landmark.index };
    const obj = objs[0];
    if (!obj?.kind) return null;
    return { kind: obj.kind, index: obj.index };
  }

  function resetNeighborhoodsOff() {
    const selections = (model.get("selections") || []).map((s) => ({
      ...s,
      neighborhood: "off",
    }));
    const types = (model.get("type_neighborhoods") || []).map((t) => ({
      ...t,
      neighborhood: "off",
    }));
    model.set("selections", selections);
    model.set("type_neighborhoods", types);
    model.save_changes();
  }

  function setSelected(kind, index) {
    if (!kind || index < 0) {
      resetNeighborhoodsOff();
      setSelectedTrait(model, "", -1);
      setDeckLayers();
      return;
    }
    setSelectedTrait(model, kind, index);
    setDeckLayers();
  }

  function updateUI() {
    updatePointLegend();
  }

  function resetToPointerMode() {
    if ((model.get("mode") || "pointer") === "pointer") return;
    model.set("mode", "pointer");
  }

  function finishVertexDraft() {
    const vertexModes = ["polygon", "line", "spline", "shape"];
    if (!vertexModes.includes(currentMode)) return;
    const minVerts = currentMode === "line" || currentMode === "spline" ? 2 : 3;
    if (draft.length < minVerts) {
      draft = [];
      draftCursor = null;
      lineStrokeActive = false;
      setDeckLayers();
      return;
    }
    if (currentMode === "polygon") {
      commitPointSelection({
        type: "polygon",
        vertices: draft.map((p) => [p.x, p.y]),
      });
      draft = [];
      draftCursor = null;
      lineStrokeActive = false;
      updateUI();
      setDeckLayers();
      return;
    }
    const landmarks = [...(model.get("landmarks") || [])];
    const item = {
      id: nextLandmarkId(landmarks),
      type: currentMode,
      vertices: draft.map((p) => [p.x, p.y]),
      line_style: "solid",
      color: COLORS[landmarks.length % COLORS.length],
    };
    if (currentMode === "spline" || currentMode === "shape") {
      item.tension = DEFAULT_TENSION;
    }
    if (BUFFERABLE.includes(currentMode)) {
      item.buffer_width = model.get("default_buffer_width") ?? 0;
      item.buffer_side = DEFAULT_BUFFER_SIDE;
    }
    landmarks.push(item);
    draft = [];
    draftCursor = null;
    lineStrokeActive = false;
    setLandmarks(model, landmarks);
    model.set("selected_kind", "landmark");
    model.set("selected_index", landmarks.length - 1);
    resetToPointerMode();
    model.save_changes();
    updateUI();
    setDeckLayers();
  }

  function pixelDeltaToData(dx, dy) {
    if (deckgl?.isInitialized) {
      const viewport = deckgl.getViewports()[0];
      if (viewport) {
        const origin = viewport.unproject([0, 0]);
        const moved = viewport.unproject([dx, dy]);
        return { dx: moved[0] - origin[0], dy: moved[1] - origin[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }

  function moveItem(kind, index, pixelDx, pixelDy, { persist = true } = {}) {
    const { dx, dy } = pixelDeltaToData(pixelDx, pixelDy);
    if (kind === "landmark") {
      const landmarks = model.get("landmarks") || [];
      model.set(
        "landmarks",
        landmarks.map((item, i) =>
          i !== index
            ? item
            : { ...item, vertices: (item.vertices || []).map(([x, y]) => [x + dx, y + dy]) }
        )
      );
    } else {
      const selections = model.get("selections") || [];
      model.set(
        "selections",
        selections.map((item, i) => {
          if (i !== index) return item;
          if (item.vertices) {
            return { ...item, vertices: item.vertices.map(([x, y]) => [x + dx, y + dy]) };
          }
          if (item.cx != null && item.cy != null) {
            return { ...item, cx: item.cx + dx, cy: item.cy + dy };
          }
          // Indices-only selections have no spatial handle to drag.
          return item;
        })
      );
    }
    if (persist) model.save_changes();
    setDeckLayers();
  }

  function hitTestVertex(pt) {
    const focus = landmarkFocus();
    if (!focus) return null;
    const landmarks = model.get("landmarks") || [];
    const lm = focus.index >= 0 && focus.index < landmarks.length ? landmarks[focus.index] : null;
    if (!lm || !lm.vertices) return null;
    const viewport = deckgl?.isInitialized ? deckgl.getViewports()[0] : null;
    for (let i = 0; i < lm.vertices.length; i++) {
      const v = lm.vertices[i];
      if (viewport) {
        const [sx, sy] = viewport.project([v[0], v[1]]);
        if (Math.hypot(pt.px - sx, pt.py - sy) <= 10) {
          return { index: i, landmarkIdx: focus.index };
        }
      } else {
        const dx = pt.x - v[0];
        const dy = pt.y - v[1];
        if (Math.hypot(dx, dy) < 6) return { index: i, landmarkIdx: focus.index };
      }
    }
    return null;
  }

  function startVertexDrag(vertexIndex, landmarkIndex) {
    // Track vertex drag state
    vertexDragIndex = vertexIndex;
    vertexDragLandmarkIndex = landmarkIndex;
  }

  function handleMouseDown(event) {
    if (currentMode === "move") return;
    // Right/middle clicks must not preventDefault — that blocks contextmenu.
    if (event.button !== 0) return;
    if (currentMode === "pointer") {
      event.preventDefault();
      webglCanvas.focus();
      const pt = eventPoint(event);
      if (!pt) return;
      didDrag = false;
      const hit = findHit(pt);
      if (hit?.kind === "landmark") {
        setSelected("landmark", hit.index);
        isDragging = true;
        dragStart = pt;
        dragKind = "landmark";
        dragIndex = hit.index;
        webglCanvas.style.cursor = "grabbing";
        return;
      }
      return;
    }
    event.preventDefault();
    webglCanvas.focus();
    const pt = eventPoint(event);
    if (!pt) return;
    didDrag = false;

    const hit = findHit(pt);

    if (currentMode === "lasso") {
      if (hit && hit.kind === "selection" && hit.kind === model.get("selected_kind") && hit.index === model.get("selected_index")) {
        isDragging = true; dragStart = pt; dragKind = hit.kind; dragIndex = hit.index;
        return;
      }
      // Selection mode: no inspect-pin; only activate existing selection regions.
      if (hit?.kind === "selection") { setSelected(hit.kind, hit.index); suppressClick = true; return; }
      isLassoing = true; lassoPath = [pt]; setDeckLayers(); return;
    }

    if (currentMode === "rectangle" || currentMode === "ellipse") {
      if (hit && hit.kind === "selection" && hit.kind === model.get("selected_kind") && hit.index === model.get("selected_index")) {
        isDragging = true; dragStart = pt; dragKind = hit.kind; dragIndex = hit.index;
        return;
      }
      if (hit?.kind === "selection") { setSelected(hit.kind, hit.index); suppressClick = true; return; }
      isBoxing = true; boxStart = pt; boxCurrent = pt; setDeckLayers(); return;
    }

    if (draft.length === 0) {
      const kind = model.get("selected_kind");
      const selectedIdx = model.get("selected_index");
      if (hit && hit.kind === kind && hit.index === selectedIdx) {
        isDragging = true; dragStart = pt; dragKind = hit.kind; dragIndex = hit.index;
        webglCanvas.style.cursor = "grabbing"; return;
      }
      if (hit) { setSelected(hit.kind, hit.index); suppressClick = true; return; }
      if (selectedIdx >= 0) setSelected("", -1);
    }

    const vertexHit = hitTestVertex(pt);
    if (vertexHit && currentMode !== "pointer" && currentMode !== "move") {
      startVertexDrag(vertexHit.index, vertexHit.landmarkIndex);
      return;
    }

    // Line: mousedown places start; rubber-band until mouseup (or click-then-click).
    // Spline/shape/polygon: click-to-add only (no drag stroke). Point: mouseup only.
    if (currentMode === "line" && draft.length === 0 && !hit) {
      draft = [pt];
      draftCursor = pt;
      lineStrokeActive = true;
      setDeckLayers();
    }
  }

  function handleMouseMove(event) {
    const pt = eventPoint(event);
    if (!pt) return;
    if (isDragging && dragStart && dragIndex >= 0) {
      const dx = pt.px - dragStart.px;
      const dy = pt.py - dragStart.py;
      if (dx || dy) didDrag = true;
      moveItem(dragKind, dragIndex, dx, dy, {
        persist: currentMode !== "pointer",
      });
      dragStart = pt;
      return;
    }
    if (isLassoing) { lassoPath.push(pt); setDeckLayers(); return; }
    if (isBoxing) { boxCurrent = pt; setDeckLayers(); return; }

    // Draft / landmark hover tips: Deck getTooltip (deckTooltip).

    if (vertexDragIndex >= 0 && vertexDragLandmarkIndex >= 0) {
      const landmarks = [...(model.get("landmarks") || [])];
      const lm = landmarks[vertexDragLandmarkIndex];
      if (lm && lm.vertices && vertexDragIndex < lm.vertices.length) {
        const vertices = lm.vertices.slice();
        vertices[vertexDragIndex] = [pt.x, pt.y];
        landmarks[vertexDragLandmarkIndex] = { ...lm, vertices };
        setLandmarks(model, landmarks);
        setDeckLayers();
      }
      return;
    }

    // Rubber-band draft preview from last vertex → cursor (line/spline/shape/polygon).
    if (
      draft.length > 0 &&
      ["line", "spline", "shape", "polygon"].includes(currentMode)
    ) {
      draftCursor = pt;
      setDeckLayers();
    }
  }

  function handleMouseUp(event) {
    if ((currentMode === "pointer" || currentMode === "move") && !isDragging) return;
    const pt = eventPoint(event);
    if (isDragging && currentMode === "pointer") {
      isDragging = false;
      dragStart = null;
      dragKind = "";
      dragIndex = -1;
      webglCanvas.style.cursor = "default";
      if (didDrag) {
        model.save_changes();
        suppressClick = true;
        didDrag = false;
      }
      return;
    }
    if (isLassoing) {
      isLassoing = false;
      if (lassoPath.length >= 3) {
        commitPointSelection({
          type: "lasso",
          vertices: lassoPath.map((p) => [p.x, p.y]),
        });
      }
      lassoPath = []; updateUI(); setDeckLayers(); return;
    }
    if (isBoxing) {
      isBoxing = false;
      if (boxStart && boxCurrent) {
        const a = boxStart;
        const b = boxCurrent;
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2;
        const width = Math.abs(b.x - a.x);
        const height = Math.abs(b.y - a.y);
        if (width > 1e-6 && height > 1e-6) {
          if (currentMode === "rectangle") {
            commitPointSelection({
              type: "rectangle",
              cx,
              cy,
              width,
              height,
              angle: 0,
            });
          } else {
            commitPointSelection({
              type: "ellipse",
              cx,
              cy,
              rx: width / 2,
              ry: height / 2,
              angle: 0,
            });
          }
        }
      }
      boxStart = null; boxCurrent = null; updateUI(); setDeckLayers(); return;
    }
    if (vertexDragIndex >= 0 || vertexDragLandmarkIndex >= 0) {
      vertexDragIndex = -1;
      vertexDragLandmarkIndex = -1;
      model.save_changes();
      return;
    }
    if (isDragging) {
      isDragging = false; dragStart = null; dragKind = ""; dragIndex = -1;
      webglCanvas.style.cursor = "crosshair";
      if (didDrag) { suppressClick = true; didDrag = false; return; }
    }
    if (suppressClick) { suppressClick = false; return; }
    if (!pt) return;
    // Geometry modes: lasso/rect/ellipse finish above; polygon vertices below.
    if (currentMode === "pointer" || currentMode === "move") return;
    if (isGeometryMode(currentMode) && currentMode !== "polygon") return;

    // Point: place at mouseup position (not mousedown).
    if (currentMode === "point") {
      const landmarks = [...(model.get("landmarks") || [])];
      landmarks.push({
        id: nextLandmarkId(landmarks),
        type: "point",
        vertices: [[pt.x, pt.y]],
        line_style: "solid",
        color: COLORS[landmarks.length % COLORS.length],
      });
      setLandmarks(model, landmarks);
      model.set("selected_kind", "landmark");
      model.set("selected_index", landmarks.length - 1);
      resetToPointerMode();
      model.save_changes(); updateUI(); setDeckLayers(); return;
    }

    // Line: mousedown=start; mouseup=end with rubber-band. Near-zero drag → wait for 2nd click.
    if (currentMode === "line") {
      if (lineStrokeActive) {
        lineStrokeActive = false;
        const start = draft[0];
        if (!start) {
          draft = [];
          draftCursor = null;
          setDeckLayers();
          return;
        }
        const dx = pt.px - start.px;
        const dy = pt.py - start.py;
        if (dx * dx + dy * dy > LINE_CLICK_PX2) {
          draft = [start, pt];
          draftCursor = null;
          finishVertexDraft();
        } else {
          // Click-like: keep first point only; second click sets the end.
          draftCursor = pt;
          setDeckLayers();
        }
        return;
      }
      if (draft.length === 1) {
        draft = [draft[0], pt];
        draftCursor = null;
        finishVertexDraft();
        return;
      }
      // Fallback: treat this click as the start if somehow empty.
      draft = [pt];
      draftCursor = pt;
      setDeckLayers();
      return;
    }

    // Spline / shape / polygon: click-to-add vertices only (no click-drag stroke).
    if (["spline", "shape", "polygon"].includes(currentMode)) {
      draft.push(pt);
      draftCursor = pt;
      setDeckLayers();
      return;
    }
  }

  function handleMouseLeave() {
    if (isDragging) { isDragging = false; dragStart = null; }
    if (vertexDragIndex >= 0 || vertexDragLandmarkIndex >= 0) {
      vertexDragIndex = -1;
      vertexDragLandmarkIndex = -1;
      model.save_changes();
    }
    if (lineStrokeActive) {
      // Keep first line vertex; end line-drag so a later click can finish.
      lineStrokeActive = false;
    }
    draftCursor = null;
    if (isLassoing) { isLassoing = false; lassoPath = []; setDeckLayers(); }
    if (isBoxing) { isBoxing = false; boxStart = null; boxCurrent = null; setDeckLayers(); }
    else if (draft.length) setDeckLayers();
  }
  function handleDblClick(e) {
    e.preventDefault();
    if (draft.length) draft.pop();
    finishVertexDraft();
  }

  function isTypingTarget(target) {
    if (!target || !(target instanceof Element)) return false;
    const tag = target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (target.isContentEditable) return true;
    return Boolean(
      target.closest(
        'input, textarea, select, [contenteditable="true"], [role="textbox"], [role="combobox"], [role="searchbox"]',
      ),
    );
  }

  function cloneJson(value) {
    try {
      return structuredClone(value);
    } catch {
      return JSON.parse(JSON.stringify(value));
    }
  }

  function switchMode(mode) {
    if (!modes.includes(mode)) return false;
    if ((model.get("mode") || "pointer") === mode) return true;
    setModeTrait(model, mode);
    return true;
  }

  function copySelectedToClipboard() {
    const kind = model.get("selected_kind") || "";
    const index = Number(model.get("selected_index"));
    if (kind === "landmark" && index >= 0) {
      const item = (model.get("landmarks") || [])[index];
      if (!item) return false;
      editClipboard = { kind: "landmark", item: cloneJson(item) };
      return true;
    }
    if (kind === "selection" && index >= 0) {
      const item = (model.get("selections") || [])[index];
      if (!item) return false;
      editClipboard = { kind: "selection", item: cloneJson(item) };
      return true;
    }
    return false;
  }

  function pasteFromClipboard() {
    if (!editClipboard?.item) return false;
    const [xMin, xMax] = model.get("x_bounds") || [0, 1];
    const [yMin, yMax] = model.get("y_bounds") || [0, 1];
    const span = Math.max(
      Math.abs(xMax - xMin),
      Math.abs(yMax - yMin),
      1,
    );
    const dx = 0.02 * span;
    const dy = 0.02 * span;

    if (editClipboard.kind === "landmark") {
      const landmarks = [...(model.get("landmarks") || [])];
      const item = cloneJson(editClipboard.item);
      item.id = nextLandmarkId(landmarks);
      if (Array.isArray(item.vertices)) {
        item.vertices = item.vertices.map((v) => {
          if (!Array.isArray(v) || v.length < 2) return v;
          return [Number(v[0]) + dx, Number(v[1]) + dy, ...v.slice(2)];
        });
      }
      landmarks.push(item);
      setLandmarks(model, landmarks);
      setSelected("landmark", landmarks.length - 1);
      return true;
    }

    if (editClipboard.kind === "selection") {
      const selections = [...(model.get("selections") || [])];
      const item = withHood(cloneJson(editClipboard.item));
      item.id = nextSelectionId(selections);
      selections.push(item);
      model.set("selections", selections);
      setSelected("selection", selections.length - 1);
      return true;
    }
    return false;
  }

  function deleteSelectedOrDraftVertex() {
    if (draft.length) {
      draft.pop();
      setDeckLayers();
      return true;
    }
    const kind = model.get("selected_kind") || "";
    const index = Number(model.get("selected_index"));
    if (kind === "landmark" && index >= 0) {
      deleteLandmarkTrait(
        model,
        index,
        model.get("landmarks") || [],
        kind,
        index,
      );
      setDeckLayers();
      return true;
    }
    if (kind === "selection" && index >= 0) {
      deleteSelectionTrait(
        model,
        index,
        model.get("selections") || [],
        kind,
        index,
      );
      setDeckLayers();
      return true;
    }
    return false;
  }

  function handleKeyDown(event) {
    if (isTypingTarget(event.target)) return;
    // Only when the event is inside this widget (canvas or chrome).
    if (!(event.target instanceof Node) || !container.contains(event.target)) {
      return;
    }

    const mod = event.metaKey || event.ctrlKey;
    const key = event.key;
    const lower = key.length === 1 ? key.toLowerCase() : key;

    if (key === "Enter") {
      event.preventDefault();
      finishVertexDraft();
      return;
    }
    if (key === "Escape") {
      event.preventDefault();
      resetDraft();
      setSelected("", -1);
      if ((model.get("raster_query_bin") ?? -1) >= 0) {
        model.set("raster_query_bin", -1);
        model.save_changes();
      }
      hoverBinIndex = -1;
      setDeckLayers();
      return;
    }

    if (mod && !event.altKey) {
      if (lower === "c") {
        if (copySelectedToClipboard()) event.preventDefault();
        return;
      }
      if (lower === "x") {
        if (draft.length) return;
        if (!copySelectedToClipboard()) return;
        deleteSelectedOrDraftVertex();
        event.preventDefault();
        return;
      }
      if (lower === "v") {
        if (pasteFromClipboard()) event.preventDefault();
        return;
      }
    }

    if (key === "Backspace" || key === "Delete") {
      if (deleteSelectedOrDraftVertex()) event.preventDefault();
      return;
    }

    // Mode / zoom shortcuts ignore modifiers (except Shift on +).
    if (event.altKey || event.metaKey || event.ctrlKey) return;

    if (lower in MODE_BY_KEY) {
      if (switchMode(MODE_BY_KEY[lower])) event.preventDefault();
      return;
    }
    if (key === "=" || key === "+") {
      event.preventDefault();
      zoomBy(1);
      return;
    }
    if (key === "-" || key === "_") {
      event.preventDefault();
      zoomBy(-1);
      return;
    }
    if (key === "0") {
      event.preventDefault();
      resetZoom();
      return;
    }
    if (lower === "f") {
      event.preventDefault();
      container.dispatchEvent(new CustomEvent("landmarks-toggle-fullscreen"));
    }
  }

  const abort = new AbortController();
  const { signal } = abort;

  webglCanvas.addEventListener(
    "wheel",
    (e) => {
      if (!e.shiftKey) return;
      const lm = focusedLandmark();
      if (lm && BUFFERABLE.includes(lm.type)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const max = maxBufferWidth();
        const step = max / 40;
        const delta = wheelDelta(e);
        if (!delta) return;
        const w = Math.max(
          0,
          Math.min(max, (Number(lm.buffer_width) || 0) + (delta > 0 ? -step : step))
        );
        updateSelectedLandmark({ buffer_width: w });
        return;
      }
      const hood = activeNeighborhood();
      if (!hood || hood.neighborhood === "off") return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const delta = wheelDelta(e);
      if (!delta) return;
      if (hood.neighborhood === "knn") {
        const kMax = maxNeighborhoodK();
        const k = Math.max(
          1,
          Math.min(kMax, (Number(hood.neighborhood_k) || 12) + (delta > 0 ? -1 : 1))
        );
        updateActiveNeighborhood({ neighborhood: "knn", neighborhood_k: k });
        return;
      }
      if (hood.neighborhood === "radius") {
        const max = maxNeighborhoodRadius();
        const step = max / 40;
        const r = Math.max(
          0,
          Math.min(max, (Number(hood.neighborhood_radius) || 0) + (delta > 0 ? -step : step))
        );
        updateActiveNeighborhood({ neighborhood: "radius", neighborhood_radius: r });
      }
    },
    { capture: true, passive: false, signal }
  );

  function handleContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    if (currentMode !== "pointer") return;
    const pt = eventPoint(event);
    if (!pt) return;
    const hit = findHit(pt, 14);
    if (hit?.kind !== "landmark") return;
    setSelected("landmark", hit.index);
    const payload = {
      kind: "landmark",
      index: hit.index,
      clientX: event.clientX,
      clientY: event.clientY,
    };
    for (const fn of landmarkMenuListeners) {
      try {
        fn(payload);
      } catch {
        /* ignore */
      }
    }
  }

  webglCanvas.addEventListener("mousedown", handleMouseDown, { signal });
  webglCanvas.addEventListener("mousemove", handleMouseMove, { signal });
  webglCanvas.addEventListener("mouseup", handleMouseUp, { signal });
  webglCanvas.addEventListener("mouseleave", handleMouseLeave, { signal });
  webglCanvas.addEventListener("dblclick", handleDblClick, { signal });
  // Widget-scoped shortcuts (modes, zoom, copy/paste/delete). Skip when typing in chrome.
  container.addEventListener("keydown", handleKeyDown, { signal });
  webglCanvas.addEventListener("contextmenu", handleContextMenu, {
    capture: true,
    signal,
  });

  const unsubs = [];
  function onChange(key, fn) {
    const event = `change:${key}`;
    model.on(event, fn);
    unsubs.push(() => model.off?.(event, fn));
  }

  ["landmarks", "selections", "type_neighborhoods"].forEach((k) => {
    onChange(k, () => {
      setDeckLayers();
      updateUI();
    });
  });
  ["selected_index", "selected_kind"].forEach((k) => {
    onChange(k, () => {
      setDeckLayers();
      updateUI();
    });
  });
  onChange("mode", () => {
    currentMode = model.get("mode");
    if (currentMode === "select") currentMode = "move";
    hoverTarget = null;
    resetDraft();
    syncInteractionMode();
    setDeckLayers();
  });
  onChange("points_data", () => {
    pointsCache = { key: "", data: [] };
    if (!deckgl) {
      initDeck();
    } else {
      setDeckLayers();
    }
    updatePointLegend();
  });
  ["point_palette", "point_size", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((k) => {
    onChange(k, () => {
      if (deckgl) setDeckLayers();
      updatePointLegend();
    });
  });
  onChange("category_codes", () => {
    refreshCategoryCodes();
    setDeckLayers();
  });
  onChange("gene_values", () => {
    refreshGeneValues();
    setDeckLayers();
  });
  ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "radius_indptr", "radius_indices", "radius_distances"].forEach((k) => {
    onChange(k, () => {
      refreshNeighborGraph();
      if (deckgl) setDeckLayers();
    });
  });
  ["category_columns", "active_category"].forEach((k) => {
    onChange(k, () => {
      updateUI();
      setDeckLayers();
    });
  });
  ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p", "gene_expression_logged"].forEach((k) => {
    onChange(k, () => {
      updateUI();
      updatePointLegend();
      setDeckLayers();
    });
  });
  [
    "render_mode",
    "raster_bin_rows",
    "raster_bin_cols",
    "raster_bin_counts",
    "raster_features",
    "raster_feature_dim",
    "raster_n_bins",
    "raster_n_cols",
    "raster_n_rows",
    "raster_origin_x",
    "raster_origin_y",
    "raster_bin_size",
    "raster_status",
    "raster_query_bin",
    "raster_threshold",
    "raster_similarity_enabled",
    "raster_basis",
  ].forEach((k) => {
    onChange(k, () => {
      if (
        k === "raster_bin_rows" ||
        k === "raster_bin_cols" ||
        k === "raster_bin_counts" ||
        k === "raster_features" ||
        k === "raster_feature_dim" ||
        k === "raster_n_bins" ||
        k === "raster_n_cols" ||
        k === "raster_n_rows" ||
        k === "raster_origin_x" ||
        k === "raster_origin_y" ||
        k === "raster_bin_size"
      ) {
        rasterCache.key = "";
        rasterScores = null;
        rasterScoreKey = "";
        rasterImageCache = { key: "", image: null, bounds: null };
      }
      if (k === "render_mode" && !isRasterMode()) {
        hoverBinIndex = -1;
      }
      if (deckgl) setDeckLayers();
      updatePointLegend();
    });
  });

  updateUI();
  let resizeObserver = null;
  let startRaf = 0;
  let destroyed = false;
  const start = () => {
    if (destroyed) return;
    const w = main.clientWidth;
    const h = main.clientHeight;
    if (w <= 1 || h <= 1) {
      startRaf = requestAnimationFrame(start);
      return;
    }
    startRaf = requestAnimationFrame(async () => {
      await initDeck();
      if (destroyed) {
        if (deckgl && typeof deckgl.finalize === "function") deckgl.finalize();
        deckgl = null;
        return;
      }
      setDeckLayers();
      resizeObserver = new ResizeObserver(() => resizeDeck());
      resizeObserver.observe(main);
    });
  };
  startRaf = requestAnimationFrame(start);

  function destroy() {
    destroyed = true;
    abort.abort();
    unsubs.forEach((fn) => fn());
    themeObserver.disconnect();
    resizeObserver?.disconnect();
    if (startRaf) cancelAnimationFrame(startRaf);
    if (layerRaf) cancelAnimationFrame(layerRaf);
    if (deckgl && typeof deckgl.finalize === "function") deckgl.finalize();
    deckgl = null;
    zoomWidget = null;
    resetWidget = null;
    if (typeof window !== "undefined" && window.__landmarksEngine) {
      delete window.__landmarksEngine;
      delete window.__landmarksModel;
    }
    host.replaceChildren();
  }

  const handle = {
    zoomBy: (d, opts) => zoomBy(d, opts),
    resetZoom: () => resetZoom(),
    resize: () => resizeDeck(),
    getViewState: () => (currentViewState ? { ...currentViewState } : null),
    setViewState: (partial, opts) => setViewState(partial, opts),
    subscribeViewState: (fn) => {
      if (typeof fn !== "function") return () => {};
      viewStateListeners.push(fn);
      return () => {
        viewStateListeners = viewStateListeners.filter((f) => f !== fn);
      };
    },
    getViewportWorldBounds: () => {
      if (!deckgl?.isInitialized) return null;
      const vp = deckgl.getViewports()?.[0];
      if (vp && vp.width > 0 && vp.height > 0) {
        const a = vp.unproject([0, vp.height]);
        const b = vp.unproject([vp.width, 0]);
        return [
          Math.min(a[0], b[0]),
          Math.min(a[1], b[1]),
          Math.max(a[0], b[0]),
          Math.max(a[1], b[1]),
        ];
      }
      // Fallback from orthographic viewState (common-space target + zoom).
      const vs = currentViewState;
      if (!vs?.target) return null;
      const w = Math.max(1, webglCanvas.clientWidth || webglCanvas.width || 1);
      const h = Math.max(1, webglCanvas.clientHeight || webglCanvas.height || 1);
      const scale = Math.pow(2, vs.zoom ?? 0);
      const halfW = w / (2 * scale);
      const halfH = h / (2 * scale);
      const cx = vs.target[0];
      const cy = vs.target[1];
      return [cx - halfW, cy - halfH, cx + halfW, cy + halfH];
    },
    panTo: (x, y, opts = {}) => {
      const animate = opts.animate !== false && opts.animate !== 0;
      setViewState(
        { target: [x, y, currentViewState?.target?.[2] ?? 0] },
        {
          animate,
          duration: opts.duration ?? (animate ? 220 : 0),
        },
      );
    },
    getSelectionOverlay: () => {
      const kind = model.get("selected_kind");
      const selectedIdx = model.get("selected_index");
      const pts = getPointsData();
      const out = [];
      (model.get("selections") || []).forEach((sel, i) => {
        const selected = kind === "selection" && i === selectedIdx;
        const members = selectionMemberIndices(sel, pts);
        out.push({
          index: i,
          selected,
          pointCount: members.length,
          // No stroke overlay — emphasis is size + dimming on the points layer.
          lineWidth: 0,
          lineAlpha: 0,
        });
      });
      return out;
    },
    getNeighborhoodOverlay: () => {
      const focus = cellLayerFocus();
      const hood = neighborhoodFor(focus);
      const mode = hood?.neighborhood || "off";
      let radius = Number(hood?.neighborhood_radius) || 0;
      const rMax = maxNeighborhoodRadius();
      if (rMax > 0) radius = Math.min(radius, rMax);
      const gradient = mode === "radius" && hoodRadiusGradient?.image
        ? hoodRadiusGradient
        : null;
      return {
        mode,
        edgeCount: hoodEdges.length,
        // Legacy: stroked per-seed disks removed; always 0 in radius gradient mode.
        radiusDiskCount: 0,
        radiusGradient: Boolean(gradient),
        gradientKind: gradient ? "bitmap" : null,
        gradientSeedCount: gradient ? gradient.seedCount : 0,
        gradientTextureSize: gradient ? gradient.textureSize : null,
        gradientBounds: gradient ? gradient.bounds : null,
        /** r_max used for the distance-field bake (remap uses current radius). */
        gradientBakeRadius: gradient ? gradient.bakeRMax : null,
        radius,
        k: Number(hood?.neighborhood_k) || 0,
      };
    },
    getHover: () => (hoverTarget ? { ...hoverTarget } : null),
    subscribeHover: (fn) => {
      if (typeof fn !== "function") return () => {};
      hoverListeners.push(fn);
      return () => {
        hoverListeners = hoverListeners.filter((f) => f !== fn);
      };
    },
    subscribeLandmarkMenu: (fn) => {
      if (typeof fn !== "function") return () => {};
      landmarkMenuListeners.push(fn);
      return () => {
        landmarkMenuListeners = landmarkMenuListeners.filter((f) => f !== fn);
      };
    },
    getInspectPin: () => {
      const kind = model.get("selected_kind") || "";
      const index = model.get("selected_index");
      if (
        (kind === "landmark" || kind === "type" || kind === "molecule") &&
        index >= 0
      ) {
        return { kind, index };
      }
      return null;
    },
    destroy,
  };
  if (typeof window !== "undefined") {
    window.__landmarksEngine = handle;
    window.__landmarksModel = model;
  }
  return handle;
}

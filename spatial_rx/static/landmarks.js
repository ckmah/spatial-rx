import {
  neighborhoodFor as neighborhoodForArgs,
  patchLandmark,
  patchNeighborhood,
  setSelected as setSelectedTrait,
  withHood,
} from "./landmarks_state.js";

const DECK_VERSION = "9.1.14";
// esm.sh resolves @deck.gl/core@^9.1.0 to latest 9.3.x (luma 9.3.6). Pin core on layers.
const DECK_CORE_URL = `https://esm.sh/@deck.gl/core@${DECK_VERSION}`;
const DECK_LAYERS_URL = `https://esm.sh/@deck.gl/layers@${DECK_VERSION}?deps=@deck.gl/core@${DECK_VERSION}`;
const OVERLAY_GL = { depthCompare: "always", depthWriteEnabled: false };

const COLORS = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"];
const SEL_COLORS = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"];
const NEIGH_COLOR = "#00e5cc";
const NEIGH_FILL_ALPHA = 0.3;
const NEIGH_LINE_ALPHA = 0.9;
const SEED_ROLE = 2;
const NEIGH_ROLE = 1;
/** Unselected points shrink when a type/selection is focused. */
const OTHER_SIZE_SCALE = 0.55;
const BUFFERABLE = ["line", "spline", "gradient"];
const BUFFER_SIDES = [
  { value: "left", label: "Left", title: "Buffer left of the drawing direction" },
  { value: "both", label: "Both", title: "Buffer on both sides" },
  { value: "right", label: "Right", title: "Buffer right of the drawing direction" },
];

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

/** CSS/Penner easeOutQuart. */
function easeOutQuart(t) {
  return 1 - (1 - t) ** 4;
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
  const tooltip = document.createElement("div");
  tooltip.className = "landmarks__tooltip";
  tooltip.hidden = true;
  plotStack.append(webglCanvas, legend);
  host.append(plotStack, tooltip);

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

  function placeTooltip(text, clientX, clientY) {
    tooltip.textContent = text;
    tooltip.hidden = false;
    const rect = host.getBoundingClientRect();
    tooltip.style.left = `${clientX - rect.left + 12}px`;
    tooltip.style.top = `${clientY - rect.top + 12}px`;
  }
  function hideTooltip() {
    tooltip.hidden = true;
  }

  legend.addEventListener("mousedown", (e) => e.stopPropagation());
  legend.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });

  const availableModes = model.get("modes") || [];
  const SELECT_MODES = ["select", "lasso"].filter((m) =>
    availableModes.includes(m)
  );
  const LANDMARK_MODES = ["point", "line", "spline", "shape"].filter((m) =>
    availableModes.includes(m)
  );
  const modes = [...SELECT_MODES, ...LANDMARK_MODES];
  let currentMode = model.get("mode") || "select";
  if (!modes.includes(currentMode)) currentMode = modes[0] || "select";


  let deckgl = null;
  let deckModules = null;
  let plotW = 0;
  let plotH = 0;
  let currentViewState = null;
  let layerRaf = 0;
  let fittedOnce = false;
  let fitZoom = null;
  let lastGridStep = null;
  let pointsCache = { key: "", data: [] };
  let pointRoles = null;
  let pointRoleMode = false;
  let hoodEdges = [];
  let zoomBy = () => { };
  let resetZoom = () => { };
  let categoryCodes = null;
  let geneValues = null;
  let knnGraph = null;
  let radiusGraph = null;

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
    const genes = model.get("gene_columns") || [];
    const gi = genes.findIndex((g) => g.name === geneName);
    const pts = getPointsData();
    if (gi < 0 || !geneValues || !geneValues.length || !pts.length) return null;
    return geneValues[gi * pts.length + i];
  }

  /** Reconstruct data-space value from packed [0, 1], then optional log1p. */
  function geneIntensity(t01, vmin, vmax) {
    const lo = Number.isFinite(vmin) ? vmin : 0;
    const hi = Number.isFinite(vmax) && vmax > lo ? vmax : lo + 1;
    const t = Math.max(0, Math.min(1, t01 == null ? 0 : t01));
    const raw = Math.max(0, lo + t * (hi - lo));
    return model.get("gene_log1p") ? Math.log1p(raw) : raw;
  }

  function geneCeiling(vmin, vmax) {
    const lo = Number.isFinite(vmin) ? vmin : 0;
    const hi = Number.isFinite(vmax) && vmax > lo ? vmax : lo + 1;
    const top = Math.max(0, hi);
    const bot = Math.max(0, lo);
    if (model.get("gene_log1p")) {
      const a = Math.log1p(bot);
      const b = Math.log1p(top);
      return b > a ? b : b + 1e-6;
    }
    return top > bot ? top : top + 1e-6;
  }

  function geneFloor(vmin, vmax) {
    const lo = Number.isFinite(vmin) ? vmin : 0;
    const bot = Math.max(0, lo);
    return model.get("gene_log1p") ? Math.log1p(bot) : bot;
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
  let zoomInterpolator = null;
  let draft = [];
  let isDragging = false;
  let dragStart = null;
  let dragKind = "";
  let dragIndex = -1;
  let didDrag = false;
  let suppressClick = false;
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
    const pan = currentMode === "select";
    return {
      dragPan: pan,
      scrollZoom: true,
      doubleClickZoom: false,
      touchRotate: false,
    };
  }

  function syncInteractionMode() {
    const pan = currentMode === "select";
    webglCanvas.style.cursor = pan ? "grab" : "crosshair";
    if (deckgl) deckgl.setProps({ controller: controllerProps() });
  }

  function applyViewportSize() {
    const w = Math.max(1, Number(model.get("width")) || 400);
    const h = Math.max(1, Number(model.get("height")) || 400);
    // Size the widget shell; figure panel flex-fills the remaining viewport
    // (not forced square).
    container.style.width = `${w}px`;
    container.style.maxWidth = "100%";
    body.style.height = `${h}px`;
    main.style.width = "";
    main.style.height = "";
    main.style.maxWidth = "";
    main.style.aspectRatio = "";
  }

  function syncCanvasBuffer() {
    const w = Math.max(1, Math.round(main.clientWidth || model.get("width") || 400));
    const h = Math.max(1, Math.round(main.clientHeight || model.get("height") || 400));
    plotW = w;
    plotH = h;
    if (webglCanvas.width !== w) webglCanvas.width = w;
    if (webglCanvas.height !== h) webglCanvas.height = h;
    if (deckgl) deckgl.setProps({ width: w, height: h });
    const bounds = model.get("axes_pixel_bounds") || [0, 0, w, h];
    if (bounds[2] !== w || bounds[3] !== h) {
      model.set("axes_pixel_bounds", [0, 0, w, h]);
      model.save_changes();
    }
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
    const h = String(hex || "#60a5fa").replace("#", "");
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

  function fillColorForPoint(d) {
    const opacity = model.get("point_opacity") ?? 0.75;
    const mode = model.get("color_by") || "categorical";
    let rgba;
    if (mode === "continuous") {
      const activeGenes = model.get("active_genes") || [];
      if (activeGenes.length > 0) {
        rgba =
          blendGeneColors(d.i, opacity) ||
          hexToRgbaBytes("#6b7280", opacity * 0.35);
      } else {
        const palette = model.get("point_palette") || ["#60a5fa"];
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
      const palette = (col && col.palette) || model.get("point_palette") || ["#60a5fa"];
      const code = col ? categoryCodeAt(d.i) : Math.round(d.valueA);
      rgba = hexToRgbaBytes(palette[((code % palette.length) + palette.length) % palette.length], opacity);
    }
    if (!pointRoleMode || !pointRoles) return rgba;
    const role = pointRoles[d.i] || 0;
    if (role === SEED_ROLE || role === NEIGH_ROLE) {
      rgba[3] = 255;
      return rgba;
    }
    rgba[3] = Math.round((rgba[3] || 255) * 0.28);
    return rgba;
  }

  function radiusForPoint(d) {
    const size = model.get("point_size") ?? 2;
    if (!pointRoleMode || !pointRoles) return size;
    const role = pointRoles[d.i] || 0;
    if (role === SEED_ROLE || role === NEIGH_ROLE) return size;
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

  function niceGridStep(span, target = 8) {
    const raw = span / Math.max(target, 1);
    const exp = Math.floor(Math.log10(Math.max(raw, 1e-12)));
    const base = 10 ** exp;
    const n = raw / base;
    const f = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return f * base;
  }

  function visibleWorldBounds() {
    const vp = deckgl?.isInitialized ? deckgl.getViewports()?.[0] : null;
    if (vp?.unproject && vp.width > 1 && vp.height > 1) {
      const [x0, y0] = vp.unproject([0, vp.height]);
      const [x1, y1] = vp.unproject([vp.width, 0]);
      return {
        xMin: Math.min(x0, x1),
        xMax: Math.max(x0, x1),
        yMin: Math.min(y0, y1),
        yMax: Math.max(y0, y1),
      };
    }
    const [xMin, xMax] = model.get("x_bounds");
    const [yMin, yMax] = model.get("y_bounds");
    return { xMin, xMax, yMin, yMax };
  }

  function gridStepForView() {
    const b = visibleWorldBounds();
    const span = Math.max(b.xMax - b.xMin, b.yMax - b.yMin, 1e-9);
    return niceGridStep(span, 8);
  }

  function maybeRefreshGrid(force = false) {
    const step = gridStepForView();
    if (!force && step === lastGridStep) return;
    lastGridStep = step;
    setDeckLayers();
  }

  function buildGridLayer() {
    if (!deckModules) return null;
    const { PathLayer } = deckModules;
    const b = visibleWorldBounds();
    const step = lastGridStep || niceGridStep(Math.max(b.xMax - b.xMin, b.yMax - b.yMin, 1e-9), 8);
    lastGridStep = step;
    const pad = step * 2;
    const xStart = Math.floor((b.xMin - pad) / step) * step;
    const yStart = Math.floor((b.yMin - pad) / step) * step;
    const paths = [];
    for (let x = xStart; x <= b.xMax + pad + step * 0.5; x += step) {
      paths.push({
        path: [
          [x, b.yMin - pad],
          [x, b.yMax + pad],
        ],
      });
    }
    for (let y = yStart; y <= b.yMax + pad + step * 0.5; y += step) {
      paths.push({
        path: [
          [b.xMin - pad, y],
          [b.xMax + pad, y],
        ],
      });
    }
    const grid =
      getComputedStyle(container).getPropertyValue("--lm-grid").trim() ||
      getComputedStyle(container).getPropertyValue("--lm-border").trim() ||
      "#94a3b8";
    const [r, g, bl] = cssColorToClear(grid);
    const color = [Math.round(r * 255), Math.round(g * 255), Math.round(bl * 255), 160];
    return new PathLayer({
      id: "landmarks-grid",
      data: paths,
      getPath: (d) => d.path,
      getColor: color,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: false,
    });
  }

  function buildPointsLayer() {
    if (!deckModules) return null;
    const { ScatterplotLayer } = deckModules;
    const data = getPointsData();
    if (!data.length) return null;
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
      model.get("point_opacity"),
      model.get("color_by"),
      model.get("active_genes"),
      model.get("gene_values"),
      model.get("gene_scale_mode"),
      model.get("gene_log1p"),
      ...roleTrigger,
    ];
    return [
      new ScatterplotLayer({
        id: "landmarks-points",
        data,
        getPosition: (d) => [d.x, d.y, 0],
        getFillColor: (d) => fillColorForPoint(d),
        getRadius: (d) => radiusForPoint(d),
        radiusUnits: "common",
        radiusMinPixels: 0,
        stroked: false,
        filled: true,
        pickable: false,
        updateTriggers: {
          getFillColor: fillTriggers,
          getRadius: roleTrigger,
        },
      }),
    ];
  }

  function buildSelectionLayers() {
    if (!deckModules) return [];
    const { PolygonLayer } = deckModules;
    const kind = model.get("selected_kind");
    const selectedIdx = model.get("selected_index");
    const selStroke =
      getComputedStyle(container).getPropertyValue("--lm-sel-stroke").trim() || "#64748b";
    const data = [];
    (model.get("selections") || []).forEach((sel, i) => {
      const polygon = selectionPolygonData(sel);
      if (polygon.length < 3) return;
      const selected = kind === "selection" && i === selectedIdx;
      data.push({
        polygon,
        fill: hexToRgbaBytes(selStroke, selected ? 0.08 : 0.04),
        line: hexToRgbaBytes(selStroke, selected ? 1 : 0.85),
        width: selected ? 2.5 : 2,
        kind: "selection",
        index: i,
      });
    });
    if (!data.length) return [];
    return [
      new PolygonLayer({
        id: "selections",
        data,
        getPolygon: (d) => d.polygon,
        getFillColor: (d) => d.fill,
        getLineColor: (d) => d.line,
        getLineWidth: (d) => d.width,
        lineWidthUnits: "pixels",
        stroked: true,
        filled: true,
        pickable: true,
        parameters: OVERLAY_GL,
      }),
    ];
  }

  function buildLandmarkLayers() {
    if (!deckModules) return [];
    const { PathLayer, PolygonLayer, ScatterplotLayer } = deckModules;
    const kind = model.get("selected_kind");
    const selectedIdx = model.get("selected_index");
    const stroke = model.get("stroke_width") || 2;
    const opacity = model.get("landmark_opacity") || 0.25;
    const polys = [];
    const paths = [];
    const markers = [];
    const arrows = [];
    const arrowWorld = pixelsToWorld(14);
    (model.get("landmarks") || []).forEach((lm, i) => {
      if (lm.hidden) return;
      const hex = COLORS[i % COLORS.length];
      const selected = kind === "landmark" && i === selectedIdx;
      const lw = selected ? stroke + 1 : stroke;
      const line = hexToRgbaBytes(hex, 1);
      const fill = hexToRgbaBytes(hex, opacity);
      const pick = { kind: "landmark", index: i };
      if (lm.type === "point") {
        const v = (lm.vertices || [])[0];
        if (!v) return;
        markers.push({
          position: [v[0], v[1], 0],
          fill: line,
          radius: selected ? 7 : 6,
          ...pick,
        });
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
            radius: selected ? 5 : 4,
            ...pick,
          });
        });
        return;
      }
      const buffer = bufferPolygonData(lm);
      if (buffer) {
        polys.push({
          polygon: asPath(buffer),
          fill: hexToRgbaBytes(NEIGH_COLOR, NEIGH_FILL_ALPHA),
          line: hexToRgbaBytes(NEIGH_COLOR, NEIGH_LINE_ALPHA),
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
            radius: selected ? 5 : 4,
            ...pick,
          });
        });
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
          getRadius: (d) => d.radius,
          radiusUnits: "pixels",
          filled: true,
          stroked: false,
          pickable: true,
          radiusMinPixels: 2,
          parameters: OVERLAY_GL,
        })
      );
    }
    return layers;
  }

  function buildDraftLayers() {
    if (!deckModules) return [];
    const { PathLayer, PolygonLayer, ScatterplotLayer } = deckModules;
    const isSel = ["lasso", "polygon", "rectangle", "ellipse"].includes(currentMode);
    const hex = isSel ? "#94a3b8" : "#00e5ff";
    const line = hexToRgbaBytes(hex, 1);
    const fill = hexToRgbaBytes(hex, 0.15);
    const stroke = model.get("stroke_width") || 4;
    const layers = [];
    let path = null;
    let polygon = null;
    let markers = [];

    if (isLassoing && lassoPath.length >= 2) {
      path = asPath(lassoPath);
    } else if (isBoxing && boxStart && boxCurrent) {
      polygon = boxPolygon(boxStart, boxCurrent);
    } else if (draft.length) {
      const sampled =
        currentMode === "spline"
          ? cardinalSample(draft, model.get("default_tension") ?? 0, 20, false)
          : currentMode === "shape"
            ? cardinalSample(draft, model.get("default_tension") ?? 0, 20, true)
            : draft;
      if (currentMode === "polygon" || currentMode === "shape") {
        polygon = asPath(sampled);
        path = asClosedPath(sampled);
      } else {
        path = asPath(sampled);
      }
      markers = draft.map((p) => ({ position: [p.x, p.y, 0], fill: line }));
    }

    if (polygon && polygon.length >= 3) {
      layers.push(
        new PolygonLayer({
          id: "draft-polygon",
          data: [{ polygon, fill, line, width: 2 }],
          getPolygon: (d) => d.polygon,
          getFillColor: (d) => d.fill,
          getLineColor: (d) => d.line,
          getLineWidth: (d) => d.width,
          lineWidthUnits: "pixels",
          stroked: true,
          filled: true,
          pickable: false,
          parameters: OVERLAY_GL,
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

  function lookupGraphNeighbors(graph, pts, seedIdxs) {
    const edges = [];
    const neighbors = [];
    if (!graph || !seedIdxs.length) return { edges, neighbors };
    const { indptr, indices } = graph;
    const seen = new Set();
    for (const si of seedIdxs) {
      const start = indptr[si] | 0;
      const end = indptr[si + 1] | 0;
      const s = pts[si];
      for (let p = start; p < end; p++) {
        const j = indices[p] | 0;
        if (!seen.has(j)) {
          seen.add(j);
          neighbors.push(j);
        }
        edges.push({
          path: [
            [s.x, s.y],
            [pts[j].x, pts[j].y],
          ],
        });
      }
    }
    return { edges, neighbors };
  }

  function buildNeighborhoodLayers() {
    if (!deckModules) return [];
    const focus = cellLayerFocus();
    const hood = neighborhoodFor(focus);
    if (!focus || !hood || hood.neighborhood === "off") return [];
    const pts = getPointsData();
    const layers = [];
    const { PathLayer } = deckModules;
    const pick = { kind: focus.kind, index: focus.index };
    if (
      (hood.neighborhood === "radius" || hood.neighborhood === "knn") &&
      hoodEdges.length
    ) {
      layers.push(
        new PathLayer({
          id: `neighborhood-${hood.neighborhood}`,
          data: hoodEdges.map((e) => ({ ...e, ...pick })),
          getPath: (d) => d.path,
          getColor: hexToRgbaBytes(NEIGH_COLOR, 0.45),
          getWidth: 1.25,
          widthUnits: "pixels",
          pickable: true,
          parameters: OVERLAY_GL,
        })
      );
    }
    return layers;
  }

  function buildDeckLayers() {
    prepareFocusGeom();
    return [
      buildGridLayer(),
      ...buildNeighborhoodLayers(),
      ...buildPointsLayer(),
      ...buildSelectionLayers(),
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
    return {
      target: [cx, cy, 0],
      zoom,
      minZoom: -20,
      maxZoom: 20,
    };
  }

  function fitDeckToBounds() {
    if (!deckgl) return;
    const w = Math.max(1, webglCanvas.clientWidth || webglCanvas.width);
    const h = Math.max(1, webglCanvas.clientHeight || webglCanvas.height);
    if (w <= 1 || h <= 1) return;
    currentViewState = computeDeckViewState(w, h);
    fitZoom = currentViewState.zoom;
    deckgl.setProps({ viewState: currentViewState, width: w, height: h });
    fittedOnce = true;
  }

  function setViewState(next, { animate = false, duration = 320 } = {}) {
    if (!deckgl) return;
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
  }

  zoomBy = (delta) => {
    if (!deckgl || !currentViewState) return;
    const minZ = currentViewState.minZoom ?? -20;
    const maxZ = currentViewState.maxZoom ?? 20;
    const zoom = Math.max(minZ, Math.min(maxZ, (currentViewState.zoom ?? 0) + delta));
    setViewState({ zoom }, { animate: true });
  };

  resetZoom = () => {
    if (!deckgl) return;
    const w = Math.max(1, webglCanvas.clientWidth || webglCanvas.width);
    const h = Math.max(1, webglCanvas.clientHeight || webglCanvas.height);
    if (w <= 1 || h <= 1) return;
    const fitted = computeDeckViewState(w, h);
    fitZoom = fitted.zoom;
    fittedOnce = true;
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
    const explicit = String(model.get("plot_background") || "").trim();
    if (explicit) return explicit;
    const fromCss = getComputedStyle(container).getPropertyValue("--lm-bg").trim();
    if (fromCss) return fromCss;
    return container.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff";
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
    // Load core first so luma initializes once at 9.1.x before layers imports.
    const core = await import(/* @vite-ignore */ DECK_CORE_URL);
    const layers = await import(/* @vite-ignore */ DECK_LAYERS_URL);
    deckModules = {
      Deck: core.Deck,
      OrthographicView: core.OrthographicView,
      LinearInterpolator: core.LinearInterpolator,
      ScatterplotLayer: layers.ScatterplotLayer,
      PathLayer: layers.PathLayer,
      PolygonLayer: layers.PolygonLayer,
    };
    return deckModules;
  }

  async function initDeck() {
    if (deckgl) return;
    applyViewportSize();
    const { w, h } = syncCanvasBuffer();
    webglCanvas.style.display = "block";
    applyPlotBackground();
    try {
      const { Deck, OrthographicView } = await loadDeckModules();
      const layers = buildDeckLayers();
      if (!layers.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const vs = computeDeckViewState(w, h);
      currentViewState = vs;
      fitZoom = vs.zoom;
      const bg = resolvePlotBackground();
      deckgl = new Deck({
        canvas: webglCanvas,
        width: w,
        height: h,
        views: new OrthographicView(),
        controller: controllerProps(),
        initialViewState: vs,
        parameters: { clearColor: cssColorToClear(bg) },
        layers,
        pickingRadius: 8,
        getCursor: ({ isDragging, isHovering }) => {
          if (isDragging) return "grabbing";
          if (isHovering) return "pointer";
          return currentMode === "select" ? "grab" : "crosshair";
        },
        onViewStateChange: ({ viewState }) => {
          currentViewState = viewState;
          deckgl.setProps({ viewState });
          maybeRefreshGrid();
        },
        onClick: (info) => {
          if (currentMode !== "select") return;
          const obj = info?.object;
          if (obj?.kind === "landmark" || obj?.kind === "selection" || obj?.kind === "type") {
            setSelected(obj.kind, obj.index);
          } else {
            setSelected("", -1);
          }
        },
        onHover: (info) => {
          const obj = info?.object;
          if (obj?.kind === "landmark" || obj?.kind === "selection" || obj?.kind === "type") {
            webglCanvas.style.cursor = "pointer";
            return;
          }
          if (currentMode === "select") webglCanvas.style.cursor = "grab";
          else webglCanvas.style.cursor = "crosshair";
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
      const poly = selectionPolygonData(sel || {});
      if (poly.length < 3) return [];
      return pts.reduce((acc, p, i) => {
        if (pointInRing(p, poly)) acc.push(i);
        return acc;
      }, []);
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

  function prepareFocusGeom() {
    const pts = getPointsData();
    pointRoles = new Uint8Array(pts.length);
    pointRoleMode = false;
    hoodEdges = [];
    const focus = cellLayerFocus();
    if (!focus) return;
    const seeds = seedIndicesFor(focus);
    if (!seeds.length) {
      pointRoleMode = true;
      return;
    }
    pointRoleMode = true;
    for (const i of seeds) pointRoles[i] = SEED_ROLE;
    const hood = neighborhoodFor(focus);
    if (!hood || hood.neighborhood === "off") return;
    const graph = hood.neighborhood === "radius" ? radiusGraph : knnGraph;
    if (hood.neighborhood === "radius" || hood.neighborhood === "knn") {
      const result = lookupGraphNeighbors(graph, pts, seeds);
      hoodEdges = result.edges;
      for (const i of result.neighbors) {
        if (pointRoles[i] !== SEED_ROLE) pointRoles[i] = NEIGH_ROLE;
      }
    }
  }

  function updateSelectedLandmark(patch) {
    const focus = landmarkFocus();
    if (!focus) return;
    patchLandmark(model, focus.index, patch, model.get("landmarks") || []);
    setDeckLayers();
  }

  function findHit(pt) {
    if (!deckgl?.isInitialized || !pt) return null;
    const info = deckgl.pickObject({ x: pt.px, y: pt.py, radius: 8 });
    const obj = info?.object;
    if (!obj?.kind) return null;
    return { kind: obj.kind, index: obj.index };
  }

  function setSelected(kind, index) {
    setSelectedTrait(model, kind, index);
    setDeckLayers();
  }

  function updateUI() {
    updatePointLegend();
  }

  function finishVertexDraft() {
    const vertexModes = ["polygon", "line", "spline", "shape"];
    if (!vertexModes.includes(currentMode)) return;
    const minVerts = currentMode === "line" || currentMode === "spline" ? 2 : 3;
    if (draft.length < minVerts) {
      draft = [];
      setDeckLayers();
      return;
    }
    if (currentMode === "polygon") {
      const selections = [...(model.get("selections") || [])];
      selections.push(withHood({
        id: nextSelectionId(selections),
        type: "polygon",
        vertices: draft.map((p) => [p.x, p.y]),
      }));
      draft = [];
      model.set("selections", selections);
      model.set("selected_kind", "selection");
      model.set("selected_index", selections.length - 1);
      model.save_changes();
      updateUI();
      setDeckLayers();
      return;
    }
    const landmarks = [...(model.get("landmarks") || [])];
    const item = {
      id: nextLandmarkId(landmarks),
      type: currentMode,
      vertices: draft.map((p) => [p.x, p.y]),
    };
    if (currentMode === "spline" || currentMode === "shape") {
      item.tension = model.get("default_tension") ?? 0;
    }
    if (BUFFERABLE.includes(currentMode)) {
      item.buffer_width = model.get("default_buffer_width") ?? 0;
      item.buffer_side = model.get("default_buffer_side") || "both";
    }
    landmarks.push(item);
    draft = [];
    model.set("landmarks", landmarks);
    model.set("selected_kind", "landmark");
    model.set("selected_index", landmarks.length - 1);
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

  function moveItem(kind, index, pixelDx, pixelDy) {
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
          return { ...item, cx: item.cx + dx, cy: item.cy + dy };
        })
      );
    }
    model.save_changes();
    setDeckLayers();
  }

  function handleMouseDown(event) {
    if (currentMode === "select") return;
    event.preventDefault();
    webglCanvas.focus();
    const pt = eventPoint(event);
    if (!pt) return;
    didDrag = false;

    const hit = findHit(pt);

    if (currentMode === "lasso") {
      if (hit && hit.kind === model.get("selected_kind") && hit.index === model.get("selected_index")) {
        isDragging = true; dragStart = pt; dragKind = hit.kind; dragIndex = hit.index;
        return;
      }
      if (hit) { setSelected(hit.kind, hit.index); suppressClick = true; return; }
      isLassoing = true; lassoPath = [pt]; setDeckLayers(); return;
    }

    if (currentMode === "rectangle" || currentMode === "ellipse") {
      if (hit && hit.kind === model.get("selected_kind") && hit.index === model.get("selected_index")) {
        isDragging = true; dragStart = pt; dragKind = hit.kind; dragIndex = hit.index;
        return;
      }
      if (hit) { setSelected(hit.kind, hit.index); suppressClick = true; return; }
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
  }

  function handleMouseMove(event) {
    const pt = eventPoint(event);
    if (!pt) return;
    if (isDragging && dragStart && dragIndex >= 0) {
      const dx = pt.px - dragStart.px;
      const dy = pt.py - dragStart.py;
      if (dx || dy) didDrag = true;
      moveItem(dragKind, dragIndex, dx, dy);
      dragStart = pt;
      return;
    }
    if (isLassoing) { lassoPath.push(pt); setDeckLayers(); return; }
    if (isBoxing) { boxCurrent = pt; setDeckLayers(); return; }

    const drafting = draft.length > 0 && ["polygon", "line", "spline", "shape"].includes(currentMode);
    if (drafting) {
      const need = currentMode === "line" || currentMode === "spline" ? 2 : 3;
      placeTooltip(draft.length >= need ? "Enter to finish" : "Click", event.clientX, event.clientY);
      return;
    }
    if (currentMode === "select") return;
    const hit = findHit(pt);
    if (hit && (hit.kind === "landmark" || hit.kind === "selection")) {
      const items = hit.kind === "landmark" ? model.get("landmarks") : model.get("selections");
      const name = items?.[hit.index]?.id;
      if (name) {
        placeTooltip(String(name), event.clientX, event.clientY);
        return;
      }
    }
    hideTooltip();
  }

  function handleMouseUp(event) {
    if (currentMode === "select" && !isDragging) return;
    const pt = eventPoint(event);
    if (isLassoing) {
      isLassoing = false;
      if (lassoPath.length >= 3) {
        const selections = [...(model.get("selections") || [])];
        selections.push(withHood({
          id: nextSelectionId(selections),
          type: "lasso",
          vertices: lassoPath.map((p) => [p.x, p.y]),
        }));
        model.set("selections", selections);
        model.set("selected_kind", "selection");
        model.set("selected_index", selections.length - 1);
        model.save_changes();
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
          const selections = [...(model.get("selections") || [])];
          if (currentMode === "rectangle") {
            selections.push(withHood({ id: nextSelectionId(selections), type: "rectangle", cx, cy, width, height, angle: 0 }));
          } else {
            selections.push(withHood({ id: nextSelectionId(selections), type: "ellipse", cx, cy, rx: width / 2, ry: height / 2, angle: 0 }));
          }
          model.set("selections", selections);
          model.set("selected_kind", "selection");
          model.set("selected_index", selections.length - 1);
          model.save_changes();
        }
      }
      boxStart = null; boxCurrent = null; updateUI(); setDeckLayers(); return;
    }
    if (isDragging) {
      isDragging = false; dragStart = null; dragKind = ""; dragIndex = -1;
      webglCanvas.style.cursor = "crosshair";
      if (didDrag) { suppressClick = true; didDrag = false; return; }
    }
    if (suppressClick) { suppressClick = false; return; }
    if (!pt) return;
    if (currentMode === "select" || currentMode === "lasso" || currentMode === "rectangle" || currentMode === "ellipse") return;

    if (currentMode === "point") {
      const landmarks = [...(model.get("landmarks") || [])];
      landmarks.push({ id: nextLandmarkId(landmarks), type: "point", vertices: [[pt.x, pt.y]] });
      model.set("landmarks", landmarks);
      model.set("selected_kind", "landmark");
      model.set("selected_index", landmarks.length - 1);
      model.save_changes(); updateUI(); setDeckLayers(); return;
    }
    draft.push({ x: pt.x, y: pt.y });
    setDeckLayers();
  }

  function handleMouseLeave() {
    hideTooltip();
    if (isDragging) { isDragging = false; dragStart = null; }
    if (isLassoing) { isLassoing = false; lassoPath = []; setDeckLayers(); }
    if (isBoxing) { isBoxing = false; boxStart = null; boxCurrent = null; setDeckLayers(); }
  }
  function handleDblClick(e) {
    e.preventDefault();
    if (draft.length) draft.pop();
    finishVertexDraft();
    hideTooltip();
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") { event.preventDefault(); finishVertexDraft(); hideTooltip(); }
    else if (event.key === "Escape") { resetDraft(); setSelected("", -1); setDeckLayers(); }
    else if (event.key === "Backspace" || event.key === "Delete") {
      if (draft.length) { draft.pop(); setDeckLayers(); }
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
        const w = Math.max(
          0,
          Math.min(max, (Number(lm.buffer_width) || 0) + (e.deltaY > 0 ? -step : step))
        );
        updateSelectedLandmark({ buffer_width: w });
        return;
      }
    },
    { capture: true, passive: false, signal }
  );

  webglCanvas.addEventListener("mousedown", handleMouseDown, { signal });
  webglCanvas.addEventListener("mousemove", handleMouseMove, { signal });
  webglCanvas.addEventListener("mouseup", handleMouseUp, { signal });
  webglCanvas.addEventListener("mouseleave", handleMouseLeave, { signal });
  webglCanvas.addEventListener("dblclick", handleDblClick, { signal });
  webglCanvas.addEventListener("keydown", handleKeyDown, { signal });

  const unsubs = [];
  function onChange(key, fn) {
    const event = `change:${key}`;
    model.on(event, fn);
    unsubs.push(() => model.off?.(event, fn));
  }

  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((k) => {
    onChange(k, () => {
      setDeckLayers();
      updateUI();
    });
  });
  onChange("mode", () => {
    currentMode = model.get("mode");
    resetDraft();
    syncInteractionMode();
    setDeckLayers();
  });
  onChange("width", () => {
    applyViewportSize();
    syncCanvasBuffer();
    setDeckLayers();
  });
  onChange("height", () => {
    applyViewportSize();
    syncCanvasBuffer();
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
  ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((k) => {
    onChange(k, () => {
      if (deckgl) setDeckLayers();
      updatePointLegend();
    });
  });
  ["stroke_width", "landmark_opacity"].forEach((k) => {
    onChange(k, () => {
      setDeckLayers();
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
  ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p"].forEach((k) => {
    onChange(k, () => {
      updateUI();
      updatePointLegend();
      setDeckLayers();
    });
  });
  onChange("plot_background", () => applyPlotBackground());

  updateUI();
  applyViewportSize();
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
    host.replaceChildren();
  }

  return { zoomBy: (d) => zoomBy(d), resetZoom: () => resetZoom(), destroy };
}

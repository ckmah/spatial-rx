const DECK_VERSION = "9.1.14";
// esm.sh resolves @deck.gl/core@^9.1.0 to latest 9.3.x (luma 9.3.6). Pin core on layers.
const DECK_CORE_URL = `https://esm.sh/@deck.gl/core@${DECK_VERSION}`;
const DECK_LAYERS_URL = `https://esm.sh/@deck.gl/layers@${DECK_VERSION}?deps=@deck.gl/core@${DECK_VERSION}`;
const OVERLAY_GL = { depthCompare: "always", depthWriteEnabled: false };

const COLORS = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"];
const SEL_COLORS = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"];
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

/** CSS/Penner easeOutQuart. */
function easeOutQuart(t) {
  return 1 - (1 - t) ** 4;
}

function isDarkTheme(node) {
  let el = node;
  while (el) {
    if (el.classList) {
      if (
        el.classList.contains("dark") ||
        el.classList.contains("dark-theme") ||
        el.classList.contains("theme-dark")
      ) {
        return true;
      }
      if (
        el.classList.contains("light") ||
        el.classList.contains("light-theme") ||
        el.classList.contains("theme-light")
      ) {
        return false;
      }
    }
    const theme = el.getAttribute?.("data-theme") || el.getAttribute?.("data-mode");
    if (theme === "dark") return true;
    if (theme === "light") return false;
    el = el.parentElement;
  }
  const root = document.documentElement;
  const body = document.body;
  for (const n of [root, body]) {
    if (!n) continue;
    if (
      n.classList.contains("dark") ||
      n.classList.contains("dark-theme") ||
      n.getAttribute("data-theme") === "dark" ||
      n.getAttribute("data-mode") === "dark"
    ) {
      return true;
    }
    if (
      n.classList.contains("light") ||
      n.classList.contains("light-theme") ||
      n.getAttribute("data-theme") === "light" ||
      n.getAttribute("data-mode") === "light"
    ) {
      return false;
    }
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function syncThemeClass(container) {
  const dark = isDarkTheme(container.parentElement || container);
  container.classList.toggle("landmarks--dark", dark);
  container.classList.toggle("landmarks--light", !dark);
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

function render({ model, el }) {
  const container = document.createElement("div");
  container.className = "landmarks";
  syncThemeClass(container);
  let applyPlotBackground = () => {};
  const themeObserver = new MutationObserver(() => {
    syncThemeClass(container);
    applyPlotBackground();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme", "data-mode"],
  });
  if (document.body) {
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode"],
    });
  }
  window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener?.("change", () => {
    syncThemeClass(container);
  });

  const icons = {
    select: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 1.5v11M1.5 7h11"/><path d="M7 1.5L5 3.5M7 1.5L9 3.5M7 12.5L5 10.5M7 12.5L9 10.5M1.5 7L3.5 5M1.5 7L3.5 9M12.5 7L10.5 5M12.5 7L10.5 9"/></svg>`,
    point: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="2.5" fill="currentColor"/></svg>`,
    line: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 11L12 3"/></svg>`,
    polygon: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2L12 6.5L9.5 12H4.5L2 6.5Z"/></svg>`,
    lasso: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8c0-3 2-5 4-5s4 2 4 5-2 4-4 4c-1.2 0-2.2-.5-3-1.2"/><path d="M3 11l-1 2"/></svg>`,
    rectangle: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3.5" width="9" height="7" rx="0.5"/></svg>`,
    ellipse: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="7" cy="7" rx="5" ry="3.5"/></svg>`,
    spline: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 11C4 11 5 3 7 3s3 8 5 8"/><path d="M10 8l2 0 0-2" stroke-linejoin="round"/></svg>`,
    shape: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2c2 1 4 3 4 5.5S9 12 7 12 3 10 3 7.5 5 3 7 2z"/></svg>`,
  };
  const eyeIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1.5 7s2.2-3.5 5.5-3.5S12.5 7 12.5 7 10.3 10.5 7 10.5 1.5 7 1.5 7z"/><circle cx="7" cy="7" r="1.6"/></svg>`;
  const eyeOffIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 2l10 10"/><path d="M5.8 3.4C6.2 3.2 6.6 3.1 7 3.1c3.3 0 5.5 3.9 5.5 3.9-.3.5-.8 1.2-1.4 1.8"/><path d="M9.5 9.6C8.8 10.1 7.9 10.5 7 10.5 3.7 10.5 1.5 7 1.5 7c.4-.7 1-1.5 1.8-2.2"/></svg>`;
  const zoomInIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M7 3v8M3 7h8"/></svg>`;
  const zoomOutIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 7h8"/></svg>`;
  const zoomResetIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 5.5V2.5H5.5M11.5 5.5V2.5H8.5M11.5 8.5v3H8.5M2.5 8.5v3H5.5"/></svg>`;
  const LABELS = {
    select: "Pan/Zoom",
    lasso: "Lasso",
    polygon: "Polygon",
    rectangle: "Rectangle",
    ellipse: "Ellipse",
    point: "Point",
    line: "Line",
    spline: "Spline",
    shape: "Shape",
  };

  const availableModes = model.get("modes") || [];
  const SELECT_MODES = ["select", "lasso"].filter((m) =>
    availableModes.includes(m)
  );
  const LANDMARK_MODES = ["point", "line", "spline", "shape"].filter((m) =>
    availableModes.includes(m)
  );
  const modes = [...SELECT_MODES, ...LANDMARK_MODES];
  const modeButtons = {};
  let currentMode = model.get("mode") || "select";
  if (!modes.includes(currentMode)) currentMode = modes[0] || "select";

  function placeTooltip(text, clientX, clientY) {
    tooltip.textContent = text;
    tooltip.hidden = false;
    const rect = container.getBoundingClientRect();
    tooltip.style.left = `${clientX - rect.left + 12}px`;
    tooltip.style.top = `${clientY - rect.top + 12}px`;
  }
  function hideTooltip() {
    tooltip.hidden = true;
  }

  function makeToolBtn(mode) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "landmarks__tool-btn";
    btn.dataset.mode = mode;
    btn.innerHTML = `<span class="landmarks__icon">${icons[mode]}</span>`;
    btn.setAttribute("aria-label", LABELS[mode]);
    btn.addEventListener("click", () => setMode(mode));
    btn.addEventListener("mouseenter", (e) => placeTooltip(LABELS[mode], e.clientX, e.clientY));
    btn.addEventListener("mousemove", (e) => placeTooltip(LABELS[mode], e.clientX, e.clientY));
    btn.addEventListener("mouseleave", hideTooltip);
    modeButtons[mode] = btn;
    return btn;
  }

  function makeSep() {
    const sep = document.createElement("span");
    sep.className = "landmarks__topbar-sep";
    sep.setAttribute("aria-hidden", "true");
    return sep;
  }

  function makeToolGroup(title, modes) {
    const group = document.createElement("div");
    group.className = "landmarks__tool-group";
    const label = document.createElement("span");
    label.className = "landmarks__tool-group-title";
    label.textContent = title;
    group.appendChild(label);
    const tools = document.createElement("div");
    tools.className = "landmarks__tool-group-tools";
    modes.forEach((m) => tools.appendChild(makeToolBtn(m)));
    group.appendChild(tools);
    return group;
  }

  const topbar = document.createElement("div");
  topbar.className = "landmarks__topbar";
  topbar.setAttribute("role", "toolbar");
  topbar.setAttribute("aria-label", "Drawing tools");

  const modesBar = document.createElement("div");
  modesBar.className = "landmarks__topbar-modes";
  const toolGroups = [];
  if (SELECT_MODES.length) toolGroups.push(makeToolGroup("Select", SELECT_MODES));
  if (LANDMARK_MODES.length) toolGroups.push(makeToolGroup("Landmarks", LANDMARK_MODES));
  toolGroups.forEach((group, i) => {
    if (i) modesBar.appendChild(makeSep());
    modesBar.appendChild(group);
  });
  topbar.appendChild(modesBar);

  const body = document.createElement("div");
  body.className = "landmarks__body";

  const sidebar = document.createElement("aside");
  sidebar.className = "landmarks__sidebar";

  function makeSection(title) {
    const section = document.createElement("div");
    section.className = "landmarks__section";
    const h = document.createElement("div");
    h.className = "landmarks__section-title";
    h.textContent = title;
    section.appendChild(h);
    return section;
  }

  function makeSectionSep() {
    const sep = document.createElement("div");
    sep.className = "landmarks__section-sep";
    sep.setAttribute("aria-hidden", "true");
    return sep;
  }

  const selSection = makeSection("Selections");
  const selList = document.createElement("div");
  selList.className = "landmarks__list";
  selSection.appendChild(selList);
  sidebar.appendChild(selSection);
  sidebar.appendChild(makeSectionSep());

  const lmSection = makeSection("Landmarks");
  const lmList = document.createElement("div");
  lmList.className = "landmarks__list";
  lmSection.appendChild(lmList);
  sidebar.appendChild(lmSection);
  sidebar.appendChild(makeSectionSep());

  const toolsSection = makeSection("Layer tools");
  toolsSection.classList.add("landmarks__section--tools");
  const toolsHint = document.createElement("div");
  toolsHint.className = "landmarks__hint";
  toolsHint.textContent = "Select a landmark to edit its parameters.";
  toolsSection.appendChild(toolsHint);
  const toolsFor = document.createElement("div");
  toolsFor.className = "landmarks__hint";
  toolsFor.hidden = true;
  toolsSection.appendChild(toolsFor);

  function makeTitledControl(titleText) {
    const wrap = document.createElement("div");
    wrap.className = "landmarks__side-control";
    wrap.hidden = true;
    const title = document.createElement("span");
    title.className = "landmarks__side-control-title";
    title.textContent = titleText;
    wrap.appendChild(title);
    return { wrap, title };
  }

  const { wrap: paramWrap } = makeTitledControl("tension");
  const paramInput = document.createElement("input");
  paramInput.type = "range";
  paramInput.min = "0";
  paramInput.max = "1";
  paramInput.step = "any";
  paramInput.value = "0";
  paramWrap.appendChild(paramInput);
  const paramValue = document.createElement("span");
  paramValue.className = "landmarks__param-value";
  paramValue.textContent = "0";
  paramWrap.appendChild(paramValue);
  toolsSection.appendChild(paramWrap);

  const { wrap: bufferSideWrap } = makeTitledControl("buffer");
  const seg = document.createElement("div");
  seg.className = "landmarks__seg";
  seg.setAttribute("role", "group");
  seg.setAttribute("aria-label", "Buffer side");
  const segButtons = {};
  BUFFER_SIDES.forEach(({ value, label, title }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "landmarks__seg-btn";
    btn.textContent = label;
    btn.title = title;
    btn.addEventListener("click", () => updateSelectedLandmark({ buffer_side: value }));
    segButtons[value] = btn;
    seg.appendChild(btn);
  });
  bufferSideWrap.appendChild(seg);
  toolsSection.appendChild(bufferSideWrap);

  const { wrap: bufferWidthWrap } = makeTitledControl("width");
  const bufferInput = document.createElement("input");
  bufferInput.type = "range";
  bufferInput.min = "0";
  bufferInput.step = "any";
  bufferInput.value = "0";
  bufferWidthWrap.appendChild(bufferInput);
  const bufferValue = document.createElement("span");
  bufferValue.className = "landmarks__param-value";
  bufferValue.textContent = "0";
  bufferWidthWrap.appendChild(bufferValue);
  toolsSection.appendChild(bufferWidthWrap);
  sidebar.appendChild(toolsSection);

  const main = document.createElement("div");
  main.className = "landmarks__main";
  const plotStack = document.createElement("div");
  plotStack.className = "landmarks__plot";
  const webglCanvas = document.createElement("canvas");
  webglCanvas.className = "landmarks__webgl";
  webglCanvas.tabIndex = 0;
  const tooltip = document.createElement("div");
  tooltip.className = "landmarks__tooltip";
  tooltip.hidden = true;
  plotStack.appendChild(webglCanvas);
  const legend = document.createElement("div");
  legend.className = "landmarks__legend";
  legend.hidden = true;
  legend.addEventListener("mousedown", (e) => e.stopPropagation());
  legend.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
  plotStack.appendChild(legend);
  const zoomCtl = document.createElement("div");
  zoomCtl.className = "landmarks__zoom";
  zoomCtl.addEventListener("mousedown", (e) => e.stopPropagation());
  zoomCtl.addEventListener("dblclick", (e) => e.stopPropagation());
  zoomCtl.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
  function makeZoomBtn(title, svg, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "landmarks__zoom-btn";
    btn.title = title;
    btn.setAttribute("aria-label", title);
    btn.innerHTML = `<span class="landmarks__icon">${svg}</span>`;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
    });
    return btn;
  }
  let zoomBy = () => {};
  let resetZoom = () => {};
  zoomCtl.appendChild(makeZoomBtn("Zoom in", zoomInIcon, () => zoomBy(1)));
  zoomCtl.appendChild(makeZoomBtn("Zoom out", zoomOutIcon, () => zoomBy(-1)));
  zoomCtl.appendChild(makeZoomBtn("Reset view", zoomResetIcon, () => resetZoom()));
  plotStack.appendChild(zoomCtl);
  main.appendChild(plotStack);
  main.classList.add("landmarks__main--plot");
  const figure = document.createElement("div");
  figure.className = "landmarks__figure";
  figure.appendChild(topbar);
  figure.appendChild(main);
  body.appendChild(sidebar);
  body.appendChild(figure);
  container.appendChild(body);
  container.appendChild(tooltip);
  el.appendChild(container);

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
    const legend = plotStack.querySelector(".landmarks__legend");
    if (!legend) return;
    const mode = model.get("color_by") || "categorical";
    const title = model.get("legend_title") || "";
    const palette = model.get("point_palette") || [];
    const labels = model.get("legend_labels") || [];

    legend.innerHTML = "";
    if (title) {
      const t = document.createElement("div");
      t.className = "landmarks__legend-title";
      t.textContent = title;
      legend.appendChild(t);
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

    if (mode === "categorical" && labels.length) {
      const list = document.createElement("div");
      list.className = "landmarks__legend-cats";
      labels.forEach((label, i) => {
        const row = document.createElement("div");
        row.className = "landmarks__legend-row";
        const swatch = document.createElement("span");
        swatch.className = "landmarks__legend-swatch";
        swatch.style.background = palette[i % palette.length] || "#888";
        const text = document.createElement("span");
        text.className = "landmarks__legend-label";
        text.textContent = label;
        row.appendChild(swatch);
        row.appendChild(text);
        list.appendChild(row);
      });
      legend.appendChild(list);
      legend.hidden = false;
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
    const palette = model.get("point_palette") || ["#60a5fa"];
    const opacity = model.get("point_opacity") ?? 0.75;
    const mode = model.get("color_by") || "categorical";
    if (mode === "continuous" && palette.length > 1) {
      const t = Math.max(0, Math.min(1, d.valueA));
      const idx = t * (palette.length - 1);
      const lo = Math.floor(idx);
      const hi = Math.min(palette.length - 1, lo + 1);
      const frac = idx - lo;
      const c0 = hexToRgbaBytes(palette[lo], opacity);
      const c1 = hexToRgbaBytes(palette[hi], opacity);
      return c0.map((v, i) => Math.round(v + (c1[i] - v) * frac));
    }
    const idx = Math.round(d.valueA) % palette.length;
    return hexToRgbaBytes(palette[(idx + palette.length) % palette.length], opacity);
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
    const border = getComputedStyle(container).getPropertyValue("--lm-border").trim() || "#3a3a3a";
    const [r, g, bl] = cssColorToClear(border);
    const color = [Math.round(r * 255), Math.round(g * 255), Math.round(bl * 255), 140];
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
    return new ScatterplotLayer({
      id: "landmarks-points",
      data,
      getPosition: (d) => [d.x, d.y, 0],
      getFillColor: (d) => fillColorForPoint(d),
      getRadius: size,
      radiusUnits: "common",
      radiusMinPixels: 0,
      pickable: false,
      updateTriggers: {
        getFillColor: [
          model.get("point_palette"),
          model.get("point_opacity"),
          model.get("color_by"),
        ],
        getRadius: [size],
      },
    });
  }

  function buildSelectionLayers() {
    if (!deckModules) return [];
    const { PolygonLayer } = deckModules;
    const kind = model.get("selected_kind");
    const selectedIdx = model.get("selected_index");
    const opacity = model.get("landmark_opacity") || 0.25;
    const data = [];
    (model.get("selections") || []).forEach((sel, i) => {
      const polygon = selectionPolygonData(sel);
      if (polygon.length < 3) return;
      const hex = SEL_COLORS[i % SEL_COLORS.length];
      const selected = kind === "selection" && i === selectedIdx;
      data.push({
        polygon,
        fill: hexToRgbaBytes(hex, opacity),
        line: hexToRgbaBytes(hex, 1),
        width: selected ? 3 : 1.5,
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
    const stroke = model.get("stroke_width") || 4;
    const opacity = model.get("landmark_opacity") || 0.25;
    const polys = [];
    const paths = [];
    const markers = [];
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
          radius: selected ? 6 : 5,
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
          fill: hexToRgbaBytes(hex, opacity * 0.7),
          line,
          width: Math.max(1, lw * 0.5),
          ...pick,
        });
      }
      if (pathPts.length >= 2) {
        paths.push({
          path: asPath(pathPts),
          color: line,
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
      }
    });
    const layers = [];
    if (polys.length) {
      layers.push(
        new PolygonLayer({
          id: "landmark-polygons",
          data: polys,
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
          widthMinPixels: 2,
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

  function buildDeckLayers() {
    return [
      buildGridLayer(),
      buildPointsLayer(),
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
      parameters: { clearColor: cssColorToClear(bg) },
      ...(currentViewState ? { viewState: currentViewState } : {}),
    });
    if (typeof deckgl.redraw === "function") deckgl.redraw(true);
  };

  function applyDeckProps(props) {
    if (!deckgl) return;
    const bg = resolvePlotBackground();
    deckgl.setProps({
      parameters: { clearColor: cssColorToClear(bg) },
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
    const core = await import(DECK_CORE_URL);
    const layers = await import(DECK_LAYERS_URL);
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
          // World-sized points follow zoom in the GPU; only rebuild when the
          // nice grid step bucket changes so button/wheel zoom stays smooth.
          maybeRefreshGrid();
        },
        onClick: (info) => {
          if (currentMode !== "select") return;
          const obj = info?.object;
          if (obj?.kind === "landmark" || obj?.kind === "selection") {
            setSelected(obj.kind, obj.index);
          } else {
            setSelected("", -1);
          }
        },
        onHover: (info, evt) => {
          const obj = info?.object;
          if (obj?.kind === "landmark" || obj?.kind === "selection") {
            webglCanvas.style.cursor = "pointer";
            const items =
              obj.kind === "landmark" ? model.get("landmarks") : model.get("selections");
            const name = items?.[obj.index]?.id;
            const src = evt?.srcEvent || evt;
            if (name && src?.clientX != null) {
              placeTooltip(String(name), src.clientX, src.clientY);
              return;
            }
          } else if (currentMode === "select") {
            webglCanvas.style.cursor = "grab";
          } else {
            webglCanvas.style.cursor = "crosshair";
          }
          if (currentMode === "select") hideTooltip();
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

  function updateSelectedLandmark(patch) {
    if (model.get("selected_kind") !== "landmark") return;
    const idx = model.get("selected_index");
    model.set(
      "landmarks",
      (model.get("landmarks") || []).map((lm, i) => (i === idx ? { ...lm, ...patch } : lm))
    );
    model.save_changes();
    updateUI();
    setDeckLayers();
  }

  function findHit(pt) {
    if (!deckgl?.isInitialized || !pt) return null;
    const info = deckgl.pickObject({ x: pt.px, y: pt.py, radius: 8 });
    const obj = info?.object;
    if (!obj?.kind) return null;
    return { kind: obj.kind, index: obj.index };
  }

  function setMode(mode) {
    currentMode = mode;
    model.set("mode", mode);
    model.save_changes();
    resetDraft();
    updateModeButtons();
    updateUI();
    syncInteractionMode();
    setDeckLayers();
  }
  function updateModeButtons() {
    modes.forEach((mode) => {
      if (modeButtons[mode]) modeButtons[mode].classList.toggle("active", mode === currentMode);
    });
  }
  function setSelected(kind, index) {
    model.set("selected_kind", kind || "");
    model.set("selected_index", index);
    model.save_changes();
    updateUI();
    setDeckLayers();
  }

  function commitLayerRename(kind, index, nextName, fallback) {
    const name = String(nextName || "").trim() || fallback;
    if (kind === "selection") {
      model.set(
        "selections",
        (model.get("selections") || []).map((sel, i) =>
          i === index ? { ...sel, id: name } : sel
        )
      );
    } else {
      model.set(
        "landmarks",
        (model.get("landmarks") || []).map((lm, i) =>
          i === index ? { ...lm, id: name } : lm
        )
      );
    }
    model.save_changes();
    updateUI();
    setDeckLayers();
  }

  function startLayerRename(kind, index, labelEl) {
    const items =
      kind === "selection" ? model.get("selections") || [] : model.get("landmarks") || [];
    const item = items[index];
    if (!item || !labelEl || labelEl.dataset.editing === "1") return;
    const prev = String(item.id ?? "");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "landmarks__label-input";
    input.value = prev;
    input.setAttribute("aria-label", "Rename layer");
    labelEl.dataset.editing = "1";
    labelEl.replaceWith(input);
    input.focus();
    input.select();
    let done = false;
    const finish = (commit) => {
      if (done) return;
      done = true;
      if (commit) commitLayerRename(kind, index, input.value, prev);
      else updateUI();
    };
    input.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        e.preventDefault();
        finish(true);
      } else if (e.key === "Escape") {
        e.preventDefault();
        finish(false);
      }
    });
    input.addEventListener("blur", () => finish(true));
    input.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("mousedown", (e) => e.stopPropagation());
    input.addEventListener("dblclick", (e) => e.stopPropagation());
  }

  function rebuildLists() {
    const kind = model.get("selected_kind") || "";
    const idx = model.get("selected_index");
    selList.innerHTML = "";
    (model.get("selections") || []).forEach((sel, i) => {
      const color = SEL_COLORS[i % SEL_COLORS.length];
      const row = document.createElement("button");
      row.type = "button";
      row.className = "landmarks__row" + (kind === "selection" && i === idx ? " landmarks__row--active" : "");
      const icon = document.createElement("span");
      icon.className = "landmarks__icon";
      icon.style.color = color;
      icon.innerHTML = icons[sel.type] || icons.polygon;
      const label = document.createElement("span");
      label.className = "landmarks__label";
      label.textContent = sel.id;
      label.title = "Double-click to rename";
      label.addEventListener("dblclick", (e) => {
        e.preventDefault();
        e.stopPropagation();
        startLayerRename("selection", i, label);
      });
      const del = document.createElement("span");
      del.className = "landmarks__row-delete";
      del.textContent = "x";
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        const next = (model.get("selections") || []).filter((_, j) => j !== i);
        model.set("selections", next);
        if (kind === "selection" && idx === i) {
          model.set("selected_kind", "");
          model.set("selected_index", -1);
        } else if (kind === "selection" && idx > i) {
          model.set("selected_index", idx - 1);
        }
        model.save_changes();
        updateUI();
        setDeckLayers();
      });
      row.appendChild(icon);
      row.appendChild(label);
      row.appendChild(del);
      row.addEventListener("click", () => setSelected("selection", i));
      selList.appendChild(row);
    });
    lmList.innerHTML = "";
    (model.get("landmarks") || []).forEach((lm, i) => {
      const color = COLORS[i % COLORS.length];
      const t = lm.type === "gradient" ? "spline" : lm.type;
      const hidden = !!lm.hidden;
      const row = document.createElement("div");
      row.className =
        "landmarks__row landmarks__row--static" +
        (hidden ? " landmarks__row--hidden" : "") +
        (kind === "landmark" && i === idx ? " landmarks__row--active" : "");
      const hideBtn = document.createElement("button");
      hideBtn.type = "button";
      hideBtn.className = "landmarks__row-hide";
      hideBtn.innerHTML = hidden ? eyeOffIcon : eyeIcon;
      hideBtn.setAttribute("aria-label", hidden ? "Show landmark" : "Hide landmark");
      hideBtn.title = hidden ? "Show" : "Hide";
      hideBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        model.set(
          "landmarks",
          (model.get("landmarks") || []).map((item, j) =>
            j === i ? { ...item, hidden: !item.hidden } : item
          )
        );
        model.save_changes();
        updateUI();
        setDeckLayers();
      });
      const icon = document.createElement("span");
      icon.className = "landmarks__icon";
      icon.style.color = color;
      icon.innerHTML = icons[t] || icons.point;
      const label = document.createElement("span");
      label.className = "landmarks__label";
      label.textContent = lm.id;
      label.title = "Double-click to rename";
      label.addEventListener("dblclick", (e) => {
        e.preventDefault();
        e.stopPropagation();
        startLayerRename("landmark", i, label);
      });
      const del = document.createElement("button");
      del.type = "button";
      del.className = "landmarks__row-delete";
      del.textContent = "x";
      del.setAttribute("aria-label", "Delete landmark");
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        const next = (model.get("landmarks") || []).filter((_, j) => j !== i);
        model.set("landmarks", next);
        if (kind === "landmark") {
          model.set("selected_kind", "");
          model.set("selected_index", -1);
        }
        model.save_changes();
        updateUI();
        setDeckLayers();
      });
      row.appendChild(hideBtn);
      row.appendChild(icon);
      row.appendChild(label);
      row.appendChild(del);
      row.addEventListener("click", () => setSelected("landmark", i));
      lmList.appendChild(row);
    });
  }

  function selectedLandmark() {
    if (model.get("selected_kind") !== "landmark") return null;
    const idx = model.get("selected_index");
    const landmarks = model.get("landmarks") || [];
    return idx >= 0 && idx < landmarks.length ? landmarks[idx] : null;
  }

  function updateUI() {
    rebuildLists();
    const selected = selectedLandmark();
    const usesTension =
      !!selected && ["spline", "shape", "gradient"].includes(selected.type);
    const usesBuffer = !!selected && BUFFERABLE.includes(selected.type);

    paramWrap.hidden = !usesTension;
    bufferSideWrap.hidden = !usesBuffer;
    bufferWidthWrap.hidden = !usesBuffer;
    toolsHint.hidden = usesTension || usesBuffer;
    toolsFor.hidden = !selected;
    if (selected) toolsFor.textContent = `for ${selected.id}`;
    if (selected && !usesTension && !usesBuffer) {
      toolsHint.hidden = false;
      toolsHint.textContent = "No parameters for this landmark.";
    } else if (!selected) {
      toolsHint.textContent = "Select a landmark to edit its parameters.";
    }

    if (usesTension) {
      paramWrap.title = "Tension: 0 = smooth (Catmull-Rom), 1 = straight";
      const val = Number(selected.tension ?? model.get("default_tension") ?? 0);
      paramInput.value = String(val);
      paramValue.textContent = val.toPrecision(3);
    }
    if (usesBuffer) {
      const side = selected.buffer_side || "both";
      Object.entries(segButtons).forEach(([value, btn]) =>
        btn.classList.toggle("active", value === side)
      );
      const max = maxBufferWidth();
      const val = Math.min(Number(selected.buffer_width || 0), max);
      bufferInput.max = String(max);
      bufferInput.step = String(max / 200);
      bufferInput.value = String(val);
      bufferValue.textContent = val ? val.toPrecision(3) : "off";
    }
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
      selections.push({
        id: nextSelectionId(selections),
        type: "polygon",
        vertices: draft.map((p) => [p.x, p.y]),
      });
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
        selections.push({
          id: nextSelectionId(selections),
          type: "lasso",
          vertices: lassoPath.map((p) => [p.x, p.y]),
        });
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
            selections.push({ id: nextSelectionId(selections), type: "rectangle", cx, cy, width, height, angle: 0 });
          } else {
            selections.push({ id: nextSelectionId(selections), type: "ellipse", cx, cy, rx: width / 2, ry: height / 2, angle: 0 });
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

  paramInput.addEventListener("input", () => {
    const selected = selectedLandmark();
    if (!selected) return;
    const idx = model.get("selected_index");
    const val = parseFloat(paramInput.value) || 0;
    paramValue.textContent = val.toPrecision(3);
    model.set(
      "landmarks",
      (model.get("landmarks") || []).map((lm, i) => (i === idx ? { ...lm, tension: val } : lm))
    );
    model.save_changes();
    setDeckLayers();
  });

  bufferInput.addEventListener("input", () => {
    const val = parseFloat(bufferInput.value) || 0;
    bufferValue.textContent = val ? val.toPrecision(3) : "off";
    updateSelectedLandmark({ buffer_width: val });
  });

  webglCanvas.addEventListener("mousedown", handleMouseDown);
  webglCanvas.addEventListener("mousemove", handleMouseMove);
  webglCanvas.addEventListener("mouseup", handleMouseUp);
  webglCanvas.addEventListener("mouseleave", handleMouseLeave);
  webglCanvas.addEventListener("dblclick", handleDblClick);
  webglCanvas.addEventListener("keydown", handleKeyDown);

  ["landmarks", "selections", "selected_index", "selected_kind"].forEach((k) => {
    model.on(`change:${k}`, () => {
      setDeckLayers();
      updateUI();
    });
  });
  model.on("change:mode", () => {
    currentMode = model.get("mode");
    updateModeButtons();
    syncInteractionMode();
    setDeckLayers();
  });
  model.on("change:width", () => {
    applyViewportSize();
    syncCanvasBuffer();
    setDeckLayers();
  });
  model.on("change:height", () => {
    applyViewportSize();
    syncCanvasBuffer();
    setDeckLayers();
  });
  model.on("change:points_data", () => {
    pointsCache = { key: "", data: [] };
    if (!deckgl) {
      initDeck();
    } else {
      setDeckLayers();
    }
    updatePointLegend();
  });
  ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((k) => {
    model.on(`change:${k}`, () => {
      if (deckgl) setDeckLayers();
      updatePointLegend();
    });
  });
  ["stroke_width", "landmark_opacity"].forEach((k) => {
    model.on(`change:${k}`, () => {
      setDeckLayers();
    });
  });
  model.on("change:plot_background", () => applyPlotBackground());

  updateModeButtons();
  updateUI();
  applyViewportSize();
  const start = () => {
    const w = main.clientWidth;
    const h = main.clientHeight;
    if (w <= 1 || h <= 1) {
      requestAnimationFrame(start);
      return;
    }
    requestAnimationFrame(async () => {
      await initDeck();
      setDeckLayers();
      const ro = new ResizeObserver(() => resizeDeck());
      ro.observe(main);
    });
  };
  requestAnimationFrame(start);
}

export default { render };

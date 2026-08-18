const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"];
const SEL_COLORS = ["#64748b", "#475569", "#78716c", "#57534e"];
const BUFFERABLE = ["line", "spline", "gradient"];
const BUFFER_SIDES = [
  { value: "left", label: "Left", title: "Buffer left of the arrow direction" },
  { value: "both", label: "Both", title: "Buffer on both sides" },
  { value: "right", label: "Right", title: "Buffer right of the arrow direction" },
];

function render({ model, el }) {
  const container = document.createElement("div");
  container.className = "landmarks";

  const icons = {
    select: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2l7 4-3 1-1 3z"/></svg>`,
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
  const LABELS = {
    select: "Select",
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
  const SELECT_MODES = ["lasso", "polygon", "rectangle", "ellipse"].filter((m) =>
    availableModes.includes(m)
  );
  const LANDMARK_MODES = ["point", "line", "spline", "shape"].filter((m) =>
    availableModes.includes(m)
  );
  const hasSelect = availableModes.includes("select");
  const modes = [
    ...(hasSelect ? ["select"] : []),
    ...SELECT_MODES,
    ...LANDMARK_MODES,
  ];
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
  const toolGroups = [];
  if (hasSelect) toolGroups.push(makeToolGroup("Select", ["select"]));
  if (SELECT_MODES.length) toolGroups.push(makeToolGroup("Selections", SELECT_MODES));
  if (LANDMARK_MODES.length) toolGroups.push(makeToolGroup("Landmarks", LANDMARK_MODES));
  toolGroups.forEach((group, i) => {
    if (i) topbar.appendChild(makeSep());
    topbar.appendChild(group);
  });

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
  const toolsHint = document.createElement("div");
  toolsHint.className = "landmarks__hint";
  toolsHint.textContent = "Select a landmark to edit its parameters.";
  toolsSection.appendChild(toolsHint);
  const toolsFor = document.createElement("div");
  toolsFor.className = "landmarks__hint";
  toolsFor.hidden = true;
  toolsSection.appendChild(toolsFor);

  const paramWrap = document.createElement("label");
  paramWrap.className = "landmarks__param";
  paramWrap.hidden = true;
  const paramLabel = document.createElement("span");
  paramLabel.className = "landmarks__label";
  paramLabel.textContent = "tension";
  paramWrap.appendChild(paramLabel);
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

  const bufferWrap = document.createElement("div");
  bufferWrap.className = "landmarks__group";
  bufferWrap.hidden = true;
  const bufferSideLabel = document.createElement("span");
  bufferSideLabel.className = "landmarks__label";
  bufferSideLabel.textContent = "buffer side";
  bufferWrap.appendChild(bufferSideLabel);
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
  bufferWrap.appendChild(seg);
  const bufferWidthWrap = document.createElement("label");
  bufferWidthWrap.className = "landmarks__param";
  const bufferWidthLabel = document.createElement("span");
  bufferWidthLabel.className = "landmarks__label";
  bufferWidthLabel.textContent = "width";
  bufferWidthWrap.appendChild(bufferWidthLabel);
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
  bufferWrap.appendChild(bufferWidthWrap);
  toolsSection.appendChild(bufferWrap);
  sidebar.appendChild(toolsSection);

  const main = document.createElement("div");
  main.className = "landmarks__main";
  const canvas = document.createElement("canvas");
  canvas.width = model.get("width");
  canvas.height = model.get("height");
  canvas.className = "landmarks__canvas";
  canvas.tabIndex = 0;
  const tooltip = document.createElement("div");
  tooltip.className = "landmarks__tooltip";
  tooltip.hidden = true;
  main.appendChild(canvas);
  body.appendChild(sidebar);
  body.appendChild(main);
  container.appendChild(topbar);
  container.appendChild(body);
  container.appendChild(tooltip);
  el.appendChild(container);

  const ctx = canvas.getContext("2d");
  const chartImage = new Image();
  let imageLoaded = false;
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
  let isRotating = false;

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
    isRotating = false;
  }

  function pixelToData(pixelX, pixelY) {
    const [xMin, xMax] = model.get("x_bounds");
    const [yMin, yMax] = model.get("y_bounds");
    const [left, top, right, bottom] = model.get("axes_pixel_bounds");
    pixelX = Math.max(left, Math.min(right, pixelX));
    pixelY = Math.max(top, Math.min(bottom, pixelY));
    return {
      x: xMin + ((pixelX - left) / (right - left)) * (xMax - xMin),
      y: yMin + ((bottom - pixelY) / (bottom - top)) * (yMax - yMin),
    };
  }
  function dataToPixel(dataX, dataY) {
    const [xMin, xMax] = model.get("x_bounds");
    const [yMin, yMax] = model.get("y_bounds");
    const [left, top, right, bottom] = model.get("axes_pixel_bounds");
    return {
      x: left + ((dataX - xMin) / (xMax - xMin)) * (right - left),
      y: bottom - ((dataY - yMin) / (yMax - yMin)) * (bottom - top),
    };
  }
  function isInsideAxes(c) {
    const [left, top, right, bottom] = model.get("axes_pixel_bounds");
    return c.x >= left && c.x <= right && c.y >= top && c.y <= bottom;
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

  function pointInPolygon(point, vertices) {
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const xi = vertices[i].x, yi = vertices[i].y;
      const xj = vertices[j].x, yj = vertices[j].y;
      if (yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function distToSeg(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
  }
  function rotatePt(p, origin, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const dx = p.x - origin.x, dy = p.y - origin.y;
    return { x: origin.x + dx * c - dy * s, y: origin.y + dx * s + dy * c };
  }

  function selectionCorners(sel) {
    if (sel.type === "polygon" || sel.type === "lasso") {
      return (sel.vertices || []).map(([x, y]) => dataToPixel(x, y));
    }
    if (sel.type === "rectangle") {
      const cx = sel.cx, cy = sel.cy, w = sel.width, h = sel.height, a = sel.angle || 0;
      const origin = dataToPixel(cx, cy);
      const hw = (dataToPixel(cx + w / 2, cy).x - origin.x);
      const hh = (origin.y - dataToPixel(cx, cy + h / 2).y);
      const corners = [
        { x: origin.x - hw, y: origin.y - hh },
        { x: origin.x + hw, y: origin.y - hh },
        { x: origin.x + hw, y: origin.y + hh },
        { x: origin.x - hw, y: origin.y + hh },
      ];
      return corners.map((p) => rotatePt(p, origin, -a));
    }
    if (sel.type === "ellipse") {
      const cx = sel.cx, cy = sel.cy, rx = sel.rx, ry = sel.ry, a = sel.angle || 0;
      const origin = dataToPixel(cx, cy);
      const px = dataToPixel(cx + rx, cy).x - origin.x;
      const py = origin.y - dataToPixel(cx, cy + ry).y;
      const pts = [];
      for (let i = 0; i < 32; i++) {
        const t = (i / 32) * Math.PI * 2;
        pts.push(rotatePt({ x: origin.x + px * Math.cos(t), y: origin.y + py * Math.sin(t) }, origin, -a));
      }
      return pts;
    }
    return [];
  }

  function rotateHandle(sel) {
    if (sel.type !== "rectangle" && sel.type !== "ellipse") return null;
    const origin = dataToPixel(sel.cx, sel.cy);
    const top = sel.type === "rectangle"
      ? { x: origin.x, y: origin.y - Math.abs(dataToPixel(sel.cx, sel.cy + sel.height / 2).y - origin.y) - 18 }
      : { x: origin.x, y: origin.y - Math.abs(dataToPixel(sel.cx, sel.cy + sel.ry).y - origin.y) - 18 };
    return rotatePt(top, origin, -(sel.angle || 0));
  }

  function landmarkPath(lm) {
    const verts = (lm.vertices || []).map(([x, y]) => dataToPixel(x, y));
    if (lm.type === "spline" || lm.type === "gradient") return cardinalSample(verts, lm.tension ?? 0, 20, false);
    if (lm.type === "shape") return cardinalSample(verts, lm.tension ?? 0, 20, true);
    return verts;
  }

  function landmarkPathData(lm) {
    const verts = (lm.vertices || []).map(([x, y]) => ({ x, y }));
    if (lm.type === "spline" || lm.type === "gradient") return cardinalSample(verts, lm.tension ?? 0, 20, false);
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
    draw();
  }

  function hitLandmark(coords, lm) {
    const path = landmarkPath(lm);
    if (lm.type === "point") {
      return path.length && Math.hypot(coords.x - path[0].x, coords.y - path[0].y) <= 8;
    }
    if (lm.type === "shape" && path.length >= 3) {
      if (pointInPolygon(coords, path)) return true;
    }
    for (let i = 0; i < path.length - 1; i++) {
      if (distToSeg(coords, path[i], path[i + 1]) <= 6) return true;
    }
    return false;
  }
  function hitSelection(coords, sel) {
    const path = selectionCorners(sel);
    if (path.length < 3) return false;
    if (pointInPolygon(coords, path)) return true;
    for (let i = 0; i < path.length; i++) {
      if (distToSeg(coords, path[i], path[(i + 1) % path.length]) <= 6) return true;
    }
    return false;
  }
  function findHit(coords) {
    const landmarks = model.get("landmarks") || [];
    for (let i = landmarks.length - 1; i >= 0; i--) {
      if (landmarks[i].hidden) continue;
      if (hitLandmark(coords, landmarks[i])) return { kind: "landmark", index: i };
    }
    const selections = model.get("selections") || [];
    for (let i = selections.length - 1; i >= 0; i--) {
      if (hitSelection(coords, selections[i])) return { kind: "selection", index: i };
    }
    return null;
  }

  function setMode(mode) {
    currentMode = mode;
    model.set("mode", mode);
    model.save_changes();
    resetDraft();
    updateModeButtons();
    updateUI();
    draw();
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
    draw();
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
      row.innerHTML = `<span class="landmarks__icon" style="color:${color}">${icons[sel.type] || icons.polygon}</span><span class="landmarks__label">${sel.id}</span>`;
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
        draw();
      });
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
      row.className = "landmarks__row landmarks__row--static" + (hidden ? " landmarks__row--hidden" : "");
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
        draw();
      });
      const icon = document.createElement("span");
      icon.className = "landmarks__icon";
      icon.style.color = color;
      icon.innerHTML = icons[t] || icons.point;
      const label = document.createElement("span");
      label.className = "landmarks__label";
      label.textContent = lm.id;
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
        draw();
      });
      row.appendChild(hideBtn);
      row.appendChild(icon);
      row.appendChild(label);
      row.appendChild(del);
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
    bufferWrap.hidden = !usesBuffer;
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
      draw();
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
      draw();
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
    draw();
  }

  function getCanvasCoords(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  }
  function pixelDeltaToData(dx, dy) {
    const [xMin, xMax] = model.get("x_bounds");
    const [yMin, yMax] = model.get("y_bounds");
    const [left, top, right, bottom] = model.get("axes_pixel_bounds");
    return {
      dx: (dx / (right - left || 1)) * (xMax - xMin),
      dy: -(dy / (bottom - top || 1)) * (yMax - yMin),
    };
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
    draw();
  }

  function handleMouseDown(event) {
    event.preventDefault();
    canvas.focus();
    const coords = getCanvasCoords(event);
    didDrag = false;

    // rotate handle
    if (model.get("selected_kind") === "selection") {
      const sels = model.get("selections") || [];
      const idx = model.get("selected_index");
      const sel = sels[idx];
      if (sel && (sel.type === "rectangle" || sel.type === "ellipse")) {
        const h = rotateHandle(sel);
        if (h && Math.hypot(coords.x - h.x, coords.y - h.y) <= 10) {
          isRotating = true;
          dragStart = coords;
          dragIndex = idx;
          return;
        }
      }
    }

    if (currentMode === "lasso" && isInsideAxes(coords)) {
      const hit = findHit(coords);
      if (hit && hit.kind === model.get("selected_kind") && hit.index === model.get("selected_index")) {
        isDragging = true; dragStart = coords; dragKind = hit.kind; dragIndex = hit.index;
        return;
      }
      if (hit) { setSelected(hit.kind, hit.index); suppressClick = true; return; }
      isLassoing = true; lassoPath = [coords]; return;
    }

    if ((currentMode === "rectangle" || currentMode === "ellipse") && isInsideAxes(coords)) {
      const hit = findHit(coords);
      if (hit && hit.kind === model.get("selected_kind") && hit.index === model.get("selected_index")) {
        isDragging = true; dragStart = coords; dragKind = hit.kind; dragIndex = hit.index;
        return;
      }
      if (hit) { setSelected(hit.kind, hit.index); suppressClick = true; return; }
      isBoxing = true; boxStart = coords; boxCurrent = coords; return;
    }

    if (draft.length === 0) {
      const hit = findHit(coords);
      const kind = model.get("selected_kind");
      const selectedIdx = model.get("selected_index");
      if (hit && hit.kind === kind && hit.index === selectedIdx) {
        isDragging = true; dragStart = coords; dragKind = hit.kind; dragIndex = hit.index;
        canvas.style.cursor = "grabbing"; return;
      }
      if (hit) { setSelected(hit.kind, hit.index); suppressClick = true; return; }
      if (currentMode === "select" || selectedIdx >= 0) {
        setSelected("", -1);
        if (currentMode === "select") suppressClick = true;
      }
    }
  }

  function handleMouseMove(event) {
    const coords = getCanvasCoords(event);
    if (isRotating && dragIndex >= 0) {
      const sels = [...(model.get("selections") || [])];
      const sel = sels[dragIndex];
      const origin = dataToPixel(sel.cx, sel.cy);
      sel.angle = Math.atan2(coords.y - origin.y, coords.x - origin.x) + Math.PI / 2;
      model.set("selections", sels);
      model.save_changes();
      draw();
      return;
    }
    if (isDragging && dragStart && dragIndex >= 0) {
      const dx = coords.x - dragStart.x, dy = coords.y - dragStart.y;
      if (dx || dy) didDrag = true;
      moveItem(dragKind, dragIndex, dx, dy);
      dragStart = coords;
      return;
    }
    if (isLassoing) { lassoPath.push(coords); draw(); return; }
    if (isBoxing) { boxCurrent = coords; draw(); return; }

    const drafting = draft.length > 0 && ["polygon", "line", "spline", "shape"].includes(currentMode);
    if (drafting) {
      const need = currentMode === "line" || currentMode === "spline" ? 2 : 3;
      placeTooltip(draft.length >= need ? "Enter to finish" : "Click", event.clientX, event.clientY);
      return;
    }
    const hit = findHit(coords);
    if (hit) {
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
    const coords = getCanvasCoords(event);
    if (isRotating) { isRotating = false; dragStart = null; dragIndex = -1; return; }
    if (isLassoing) {
      isLassoing = false;
      if (lassoPath.length >= 3) {
        const selections = [...(model.get("selections") || [])];
        selections.push({
          id: nextSelectionId(selections),
          type: "lasso",
          vertices: lassoPath.map((p) => { const d = pixelToData(p.x, p.y); return [d.x, d.y]; }),
        });
        model.set("selections", selections);
        model.set("selected_kind", "selection");
        model.set("selected_index", selections.length - 1);
        model.save_changes();
      }
      lassoPath = []; updateUI(); draw(); return;
    }
    if (isBoxing) {
      isBoxing = false;
      if (boxStart && boxCurrent) {
        const a = pixelToData(boxStart.x, boxStart.y);
        const b = pixelToData(boxCurrent.x, boxCurrent.y);
        const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
        const width = Math.abs(b.x - a.x), height = Math.abs(b.y - a.y);
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
      boxStart = null; boxCurrent = null; updateUI(); draw(); return;
    }
    if (isDragging) {
      isDragging = false; dragStart = null; dragKind = ""; dragIndex = -1;
      canvas.style.cursor = "crosshair";
      if (didDrag) { suppressClick = true; didDrag = false; return; }
    }
    if (suppressClick) { suppressClick = false; return; }
    if (!isInsideAxes(coords)) return;
    if (currentMode === "select" || currentMode === "lasso" || currentMode === "rectangle" || currentMode === "ellipse") return;

    const data = pixelToData(coords.x, coords.y);
    if (currentMode === "point") {
      const landmarks = [...(model.get("landmarks") || [])];
      landmarks.push({ id: nextLandmarkId(landmarks), type: "point", vertices: [[data.x, data.y]] });
      model.set("landmarks", landmarks);
      model.set("selected_kind", "landmark");
      model.set("selected_index", landmarks.length - 1);
      model.save_changes(); updateUI(); draw(); return;
    }
    draft.push(data);
    draw();
  }

  function handleMouseLeave() {
    hideTooltip();
    if (isDragging) { isDragging = false; dragStart = null; }
    if (isLassoing) { isLassoing = false; lassoPath = []; draw(); }
    if (isBoxing) { isBoxing = false; boxStart = null; boxCurrent = null; draw(); }
    isRotating = false;
  }
  function handleDblClick(e) {
    e.preventDefault();
    if (draft.length) draft.pop();
    finishVertexDraft();
    hideTooltip();
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") { event.preventDefault(); finishVertexDraft(); hideTooltip(); }
    else if (event.key === "Escape") { resetDraft(); setSelected("", -1); draw(); }
    else if (event.key === "Backspace" || event.key === "Delete") {
      if (draft.length) { draft.pop(); draw(); }
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
    draw();
  });

  bufferInput.addEventListener("input", () => {
    const val = parseFloat(bufferInput.value) || 0;
    bufferValue.textContent = val ? val.toPrecision(3) : "off";
    updateSelectedLandmark({ buffer_width: val });
  });

  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${alpha})`;
  }

  function drawArrowheads(pathPts, color) {
    if (pathPts.length < 2) return;
    [0.4, 0.75, 1].forEach((t) => {
      const i = Math.min(pathPts.length - 2, Math.floor(t * (pathPts.length - 1)));
      const a = pathPts[i], b = pathPts[i + 1];
      const ang = Math.atan2(b.y - a.y, b.x - a.x);
      const len = 8;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - len * Math.cos(ang - 0.4), b.y - len * Math.sin(ang - 0.4));
      ctx.lineTo(b.x - len * Math.cos(ang + 0.4), b.y - len * Math.sin(ang + 0.4));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  function strokeWithHalo(lineWidth, color, dashed) {
    ctx.setLineDash(dashed || []);
    ctx.lineWidth = lineWidth + 2;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawSelection(sel, color, selected) {
    const path = selectionCorners(sel);
    if (path.length < 2) return;
    const opacity = (model.get("landmark_opacity") || 0.25) * 0.7;
    ctx.save();
    ctx.beginPath();
    path.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.closePath();
    ctx.fillStyle = hexToRgba(color, opacity);
    ctx.fill();
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = selected ? 3 : 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    if (selected && (sel.type === "rectangle" || sel.type === "ellipse")) {
      const h = rotateHandle(sel);
      if (h) {
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(h.x, h.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(h.x, h.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawLandmark(lm, color, selected) {
    const path = landmarkPath(lm);
    const stroke = model.get("stroke_width") || 2;
    const opacity = model.get("landmark_opacity") || 0.25;
    const lw = selected ? stroke + 1 : stroke;
    ctx.save();
    if (lm.type === "point" && path.length) {
      ctx.beginPath();
      ctx.arc(path[0].x, path[0].y, selected ? 5 : 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(path[0].x, path[0].y, selected ? 4 : 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else if (lm.type === "shape" && path.length >= 3) {
      ctx.beginPath();
      path.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fillStyle = hexToRgba(color, opacity);
      ctx.fill();
      strokeWithHalo(lw, color, []);
    } else if (path.length >= 2) {
      const buffer = bufferPolygonData(lm);
      if (buffer) {
        const ring = buffer.map((p) => dataToPixel(p.x, p.y));
        ctx.beginPath();
        ring.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.closePath();
        ctx.fillStyle = hexToRgba(color, opacity * 0.7);
        ctx.fill();
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = hexToRgba(color, 0.7);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.beginPath();
      path.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      strokeWithHalo(lw, color, []);
      if (lm.type === "spline" || lm.type === "gradient" || buffer) drawArrowheads(path, color);
      (lm.vertices || []).map(([x, y]) => dataToPixel(x, y)).forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    }
    ctx.restore();
  }

  function drawDraft() {
    ctx.save();
    const draftColor = "#64748b";
    const isSelDraft = ["lasso", "polygon", "rectangle", "ellipse"].includes(currentMode);
    const strokeDraft = (lw) => {
      if (isSelDraft) {
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = lw;
        ctx.strokeStyle = draftColor;
        ctx.stroke();
      } else {
        strokeWithHalo(lw, draftColor, [4, 4]);
      }
    };
    if (isLassoing && lassoPath.length >= 2) {
      ctx.beginPath();
      lassoPath.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      strokeDraft(2);
    } else if (isBoxing && boxStart && boxCurrent) {
      const x = Math.min(boxStart.x, boxCurrent.x), y = Math.min(boxStart.y, boxCurrent.y);
      const w = Math.abs(boxCurrent.x - boxStart.x), h = Math.abs(boxCurrent.y - boxStart.y);
      ctx.beginPath();
      if (currentMode === "ellipse") {
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      } else {
        ctx.rect(x, y, w, h);
      }
      strokeDraft(2);
    } else if (draft.length) {
      const verts = draft.map((p) => dataToPixel(p.x, p.y));
      const path =
        currentMode === "spline"
          ? cardinalSample(verts, model.get("default_tension") ?? 0, 20, false)
          : currentMode === "shape"
            ? cardinalSample(verts, model.get("default_tension") ?? 0, 20, true)
            : verts;
      ctx.beginPath();
      path.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      if (currentMode === "polygon" || currentMode === "shape") ctx.closePath();
      strokeDraft(2);
      verts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, isSelDraft ? 3 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isSelDraft ? draftColor : "#ffffff";
        ctx.fill();
        if (!isSelDraft) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = draftColor;
          ctx.fill();
        }
      });
    }
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (imageLoaded) ctx.drawImage(chartImage, 0, 0, canvas.width, canvas.height);
    const kind = model.get("selected_kind");
    const selected = model.get("selected_index");
    (model.get("selections") || []).forEach((sel, i) => {
      drawSelection(sel, SEL_COLORS[i % SEL_COLORS.length], kind === "selection" && i === selected);
    });
    (model.get("landmarks") || []).forEach((lm, i) => {
      if (lm.hidden) return;
      drawLandmark(lm, COLORS[i % COLORS.length], kind === "landmark" && i === selected);
    });
    drawDraft();
  }

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", handleMouseLeave);
  canvas.addEventListener("dblclick", handleDblClick);
  canvas.addEventListener("keydown", handleKeyDown);

  chartImage.onload = () => { imageLoaded = true; draw(); };
  chartImage.src = model.get("chart_base64");
  model.on("change:chart_base64", () => { imageLoaded = false; chartImage.src = model.get("chart_base64"); });
  ["landmarks", "selections", "selected_index", "selected_kind"].forEach((k) => {
    model.on(`change:${k}`, () => { updateUI(); draw(); });
  });
  model.on("change:mode", () => { currentMode = model.get("mode"); updateModeButtons(); });
  model.on("change:width", () => { canvas.width = model.get("width"); draw(); });
  model.on("change:height", () => { canvas.height = model.get("height"); draw(); });

  updateModeButtons();
  updateUI();
  draw();
}

export default { render };

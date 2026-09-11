/** Shared traitlet write recipes for the landmarks widget (engine + React chrome). */

export const DEFAULT_HOOD = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12,
};

/** Keep in sync with frontend helpers MAX_ACTIVE_GENES. */
export const MAX_ACTIVE_GENES = 3;

export function withHood(item) {
  return { ...DEFAULT_HOOD, ...item };
}

/** Replace landmarks on the model. */
export function setLandmarks(model, landmarks) {
  model.set("landmarks", landmarks);
}

export function applyActiveCategory(model, col) {
  model.set("active_category", col.name);
  model.set("active_genes", []);
  model.set("point_palette", col.palette || []);
  model.set("legend_labels", col.labels || []);
  model.set("legend_title", col.name || "");
  model.set("color_by", "categorical");
  model.save_changes();
}

export function setActiveGenes(model, names) {
  const geneCols = model.get("gene_columns") || [];
  const known = new Set(geneCols.map((g) => g.name));
  const next = [];
  for (const name of names || []) {
    if (!known.has(name) || next.includes(name)) continue;
    next.push(name);
    if (next.length >= MAX_ACTIVE_GENES) break;
  }
  model.set("active_genes", next);
  if (!next.length) {
    const cols = model.get("category_columns") || [];
    const active = model.get("active_category") || "";
    const col = cols.find((c) => c.name === active) || cols[0];
    if (col) {
      applyActiveCategory(model, col);
      return;
    }
    model.set("color_by", "categorical");
    model.set("legend_title", "");
    model.save_changes();
    return;
  }
  model.set("color_by", "continuous");
  if (next.length === 1) {
    const g = geneCols.find((x) => x.name === next[0]);
    model.set("legend_title", next[0]);
    model.set("color_vmin", g?.vmin ?? 0);
    model.set("color_vmax", g?.vmax ?? 1);
  } else {
    model.set("legend_title", next.join(", "));
  }
  model.save_changes();
}

export function setGeneScaleMode(model, mode) {
  model.set("gene_scale_mode", mode === "shared" ? "shared" : "independent");
  model.save_changes();
}

export function setGeneLog1p(model, enabled) {
  if (model.get("gene_expression_logged")) {
    model.set("gene_log1p", false);
    model.save_changes();
    return;
  }
  model.set("gene_log1p", !!enabled);
  model.save_changes();
}

export function setRenderMode(model, mode) {
  const next = mode === "raster" ? "raster" : "points";
  model.set("render_mode", next);
  model.save_changes();
}

export function setRasterBinSize(model, size) {
  const v = Number(size);
  if (!Number.isFinite(v) || v <= 0) return;
  model.set("raster_bin_size", v);
  model.save_changes();
}

export function setRasterBasis(model, basis) {
  const allowed = new Set(["genes", "embedding", "composition"]);
  if (!allowed.has(basis)) return;
  model.set("raster_basis", basis);
  model.save_changes();
}

export function setRasterEmbeddingKey(model, key) {
  model.set("raster_embedding_key", String(key || ""));
  model.save_changes();
}

export function setRasterThreshold(model, value) {
  const v = Number(value);
  if (!Number.isFinite(v)) return;
  model.set("raster_threshold", Math.max(0, Math.min(1, v)));
  model.save_changes();
}

export function clearRasterQuery(model) {
  model.set("raster_query_bin", -1);
  model.save_changes();
}

export function neighborhoodFor(
  kind,
  index,
  selections,
  typeNeighborhoods,
  legendLabels,
  activeCategory,
) {
  if (kind === "selection") {
    const sel = selections[index];
    return sel ? { ...DEFAULT_HOOD, ...sel } : null;
  }
  if (kind === "type") {
    const label = legendLabels[index];
    if (!label) return null;
    const row = typeNeighborhoods.find(
      (r) => r.id === label && (!r.column || r.column === activeCategory),
    );
    return { ...DEFAULT_HOOD, id: label, column: activeCategory, ...(row || {}) };
  }
  return null;
}

export function patchNeighborhood(
  model,
  kind,
  index,
  patch,
  selections,
  typeNeighborhoods,
  legendLabels,
  activeCategory,
) {
  if (kind === "selection") {
    model.set(
      "selections",
      selections.map((sel, i) =>
        i === index ? { ...DEFAULT_HOOD, ...sel, ...patch } : sel,
      ),
    );
    model.save_changes();
    return;
  }
  if (kind !== "type") return;
  const label = legendLabels[index];
  if (!label) return;
  const rows = [...typeNeighborhoods];
  const i = rows.findIndex(
    (r) => r.id === label && (!r.column || r.column === activeCategory),
  );
  const nextRow = {
    ...DEFAULT_HOOD,
    id: label,
    column: activeCategory,
    ...(i >= 0 ? rows[i] : {}),
    ...patch,
  };
  if (i >= 0) rows[i] = nextRow;
  else rows.push(nextRow);
  model.set("type_neighborhoods", rows);
  model.save_changes();
}

export function patchLandmark(model, index, patch, landmarks) {
  setLandmarks(model, landmarks.map((lm, i) => (i === index ? { ...lm, ...patch } : lm)));
  model.save_changes();
}

export function setSelected(model, kind, index) {
  model.set("selected_kind", kind || "");
  model.set("selected_index", index);
  model.save_changes();
}

export function setMode(model, mode) {
  model.set("mode", mode);
  model.save_changes();
}

export function removeAt(items, index) {
  return items.filter((_, i) => i !== index);
}

export function nextSelectedIndex(kind, selectedKind, selectedIndex, removed) {
  if (selectedKind !== kind) return { kind: selectedKind, index: selectedIndex };
  if (selectedIndex === removed) return { kind: "", index: -1 };
  if (selectedIndex > removed) return { kind: selectedKind, index: selectedIndex - 1 };
  return { kind: selectedKind, index: selectedIndex };
}

export function deleteSelection(
  model,
  index,
  selections,
  selectedKind,
  selectedIndex,
) {
  const next = nextSelectedIndex("selection", selectedKind, selectedIndex, index);
  model.set("selections", removeAt(selections, index));
  model.set("selected_kind", next.kind);
  model.set("selected_index", next.index);
  model.save_changes();
}

export function deleteLandmark(
  model,
  index,
  landmarks,
  selectedKind,
  selectedIndex,
) {
  const next = nextSelectedIndex("landmark", selectedKind, selectedIndex, index);
  setLandmarks(model, removeAt(landmarks, index));
  model.set("selected_kind", next.kind);
  model.set("selected_index", next.index);
  model.save_changes();
}

function cloneJson(value) {
  try {
    return structuredClone(value);
  } catch {
    return JSON.parse(JSON.stringify(value));
  }
}

function nextLandmarkDuplicateId(landmarks) {
  const used = new Set((landmarks || []).map((x) => String(x.id)));
  for (let i = 1; ; i++) {
    const id = `landmark ${i}`;
    if (!used.has(id)) return id;
  }
}

/** Clone a landmark with a new id and a slight world-space offset. */
export function duplicateLandmark(model, index, landmarks) {
  const src = landmarks[index];
  if (!src) return;
  const item = cloneJson(src);
  item.id = nextLandmarkDuplicateId(landmarks);
  const [xMin, xMax] = model.get("x_bounds") || [0, 1];
  const [yMin, yMax] = model.get("y_bounds") || [0, 1];
  const span = Math.max(
    Math.abs(xMax - xMin),
    Math.abs(yMax - yMin),
    1,
  );
  const dx = 0.02 * span;
  const dy = 0.02 * span;
  if (Array.isArray(item.vertices)) {
    item.vertices = item.vertices.map((v) => {
      if (!Array.isArray(v) || v.length < 2) return v;
      return [Number(v[0]) + dx, Number(v[1]) + dy, ...v.slice(2)];
    });
  }
  const next = [...landmarks, item];
  setLandmarks(model, next);
  model.set("selected_kind", "landmark");
  model.set("selected_index", next.length - 1);
  model.save_changes();
}

export function renameSelection(model, index, name, selections) {
  const next = String(name || "").trim();
  if (!next) return;
  model.set(
    "selections",
    selections.map((sel, i) => (i === index ? { ...sel, id: next } : sel)),
  );
  model.save_changes();
}

export function renameLandmark(model, index, name, landmarks) {
  const next = String(name || "").trim();
  if (!next) return;
  setLandmarks(
    model,
    landmarks.map((lm, i) => (i === index ? { ...lm, id: next } : lm)),
  );
  model.save_changes();
}

export function toggleLandmarkHidden(model, index, landmarks) {
  setLandmarks(
    model,
    landmarks.map((lm, i) =>
      i === index ? { ...lm, hidden: !lm.hidden } : lm,
    ),
  );
  model.save_changes();
}

export function toggleSelectionHidden(model, index, selections) {
  model.set(
    "selections",
    selections.map((sel, i) =>
      i === index ? { ...sel, hidden: !sel.hidden } : sel,
    ),
  );
  model.save_changes();
}

/** Ask Python to freeze the active neighborhood into a selection. */
export function promoteNeighborhoodToSelection(model) {
  const tick = Number(model.get("promote_tick") || 0) + 1;
  model.set("promote_tick", tick);
  model.save_changes();
}

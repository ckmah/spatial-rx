---
name: shadcn-anywidget
description: >-
  Integrates shadcn/ui into spatial-rx anywidgets via the bundled React frontend.
  Use when adding or changing a React/shadcn anywidget, fixing stale widget UI /
  HMR / hot-reload in marimo, running shadcn CLI from frontend/, wiring Vite
  widget entries, or pointing Python at bundled assets.
---

# shadcn anywidget

anywidget ESM cannot import React/shadcn source directly. Compose UI in
`frontend/`, ship per-widget bundles under `spatial_rx/static/bundled/`.

Landmarks chrome (panels, toolbar, forms) is React/shadcn. The deck.gl canvas
engine stays in `spatial_rx/static/landmarks.js` (`mountEngine`) and is imported
by the landmarks Vite entry. Chrome reads/writes via `useLandmarksModel` (not
raw `model.set`); shared write recipes live in `spatial_rx/static/landmarks_state.js`.

shadcn APIs: [../shadcn/SKILL.md](../shadcn/SKILL.md) (CLI from `frontend/`).
Humans: [../../docs/shadcn-frontend.md](../../docs/shadcn-frontend.md),
[../../docs/widget-packaging.md](../../docs/widget-packaging.md),
[../../docs/widget-scaffold.md](../../docs/widget-scaffold.md).
Domain: [../../CONTEXT.md](../../CONTEXT.md).

## Reload contract (file-watch HMR)

Authoring reload is **anywidget file-watch**, not the Vite dev server.

| Piece | Value |
| --- | --- |
| `_esm` / `_css` | `pathlib.Path` from `widget_esm` / `widget_css` → `spatial_rx/static/bundled/` |
| Rebuild | `cd frontend && npm run watch:<name>` (`vite build --watch`) |
| Python | `ANYWIDGET_HMR=1` set **before** starting marimo/jupyter |
| Dep | `watchfiles` (`uv sync --group dev`) |

Done when: save a TSX/CSS file → bundled `.mjs` / `widgets.css` mtime changes →
widget UI updates in the open notebook **without** remounting the cell or
opening a new tab.

Hard rules for `_esm` / `_css`:

- Keep them as `Path` objects (anywidget watches Paths).
- Resolve via `spatial_rx._assets.widget_esm` / `widget_css` (or scaffold output).
- Set `ANYWIDGET_HMR=1` on the process that imports the widget class.

Stale-UI triage (in order):

1. Confirm `ANYWIDGET_HMR=1` in the shell that launched Python (`echo $ANYWIDGET_HMR`).
2. Confirm `_esm` is a Path / `FileContents`, not a long JS string and not an `http://` URL.
3. Confirm Vite `--watch` is rewriting the bundle (mtime moves on save).
4. Confirm `watchfiles` is installed.

Longer rationale and packaging roles: [widget-packaging.md](../../docs/widget-packaging.md).

## Reference

| Layer | Path |
| --- | --- |
| Python widget | `spatial_rx/gallery.py` |
| Asset resolver | `spatial_rx/_assets.py` |
| React UI | `frontend/src/widgets/gallery/Gallery.tsx` |
| anywidget entry | `frontend/src/widgets/gallery/index.tsx` |
| shadcn primitives | `frontend/src/components/ui/` |
| Build config | `frontend/vite.config.ts` |
| Shipped bundles | `spatial_rx/static/bundled/{name}.mjs`, `widgets.css` |
| Landmarks canvas CSS | `frontend/src/widgets/landmarks/landmarks.css` (in bundle) |
| Demo | `demos/gallery.py` |

## Add a widget

Declare the Python↔browser contract as **named traitlets** (any shape — not
gallery's `items` / `selected_index` / `columns`). See
[widget scaffold](../../docs/widget-scaffold.md).

Complete every step.

1. **Write a traitlet spec** (YAML or CLI flags) — e.g. `points:List[Dict]`,
   `color:Unicode`, `radius:Float`. Do not copy gallery fields unless building a
   gallery.

2. **Scaffold**:

   ```bash
   uv run scripts/scaffold_widget.py <kebab-name> --traitlet '...' --demo
   # or: uv run scripts/scaffold_widget.py --spec widgets/<name>.yaml --demo
   ```

   See [widget-scaffold.md](../../docs/widget-scaffold.md#run-the-scaffold).

3. **Add shadcn components** from `frontend/` (if needed):

   ```bash
   cd frontend
   npx shadcn@latest add button dialog
   ```

4. **Implement `<Name>View.tsx`** — presentation only; read via `useModel(model,
   [/* spec traitlet names */])`; on user action `model.set(...)` then
   `model.save_changes()`. Wrap in `useNotebookTheme(hostEl.parentElement)`.

5. **Implement Python validation** in `__init__` if needed (optional; not generated).

6. **Build and verify**:

   ```bash
   cd frontend && npm run build
   uv run pytest
   ```

   Done when `spatial_rx/static/bundled/<name>.mjs` exists and the demo renders
   under the [reload contract](#reload-contract-file-watch-hmr).

7. **Commit** `spatial_rx/static/bundled/*` (shipped in the wheel). See
   [widget packaging](../../docs/widget-packaging.md).

## Do / don't

| Do | Don't |
| --- | --- |
| `Path` `_esm` + `npm run watch:<name>` + `ANYWIDGET_HMR=1` | Point `_esm` at `localhost:5173`, use `npm run dev`, or add `@anywidget/vite` for the normal loop |
| `widget_esm` / `widget_css` returning `Path` | `_esm = path.read_text()` (kills watching) |
| `npx shadcn@latest add` from `frontend/` | Copy registry JSON from GitHub |
| One Vite entry per widget | One monolithic bundle for all widgets |
| `@/components/ui/*` imports | Hand-port `data-slot` CSS into `spatial_rx/static/` |
| Shared `widgets.css` theme tokens | Per-widget duplicate CSS variables |
| Python traitlets as the state API | Notebook business logic in React |

## React checklist

Follow the [shadcn skill](../shadcn/SKILL.md), especially:

- Built-in variants before custom `className` styling
- Semantic tokens (`bg-muted`, `text-muted-foreground`), not raw colors
- `flex` + `gap-*`, not `space-x-*` / `space-y-*`
- Full composition (`ItemHeader` + `ItemContent`, not a styled `div`)
- `npx shadcn@latest docs <component>` before guessing APIs

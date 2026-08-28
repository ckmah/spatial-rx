---
name: shadcn-anywidget
description: >-
  Integrates shadcn/ui into spatial-rx anywidgets via the bundled React frontend.
  Use when adding or changing a React/shadcn anywidget, running shadcn CLI from
  frontend/, wiring Vite widget entries, or pointing Python at bundled assets.
---

# shadcn anywidget

anywidget ESM cannot import React/shadcn source directly. Compose UI in
`frontend/`, ship per-widget bundles under `spatial_rx/static/bundled/`.

Vanilla ESM stays the default for canvas-heavy widgets (`landmarks.js`). Use
this skill for forms, lists, overlays, and other shadcn composition.

shadcn component APIs and composition rules: [../shadcn/SKILL.md](../shadcn/SKILL.md)
(run CLI from `frontend/`). Architecture for humans: [../../docs/shadcn-frontend.md](../../docs/shadcn-frontend.md),
[../../docs/widget-packaging.md](../../docs/widget-packaging.md),
[../../docs/widget-scaffold.md](../../docs/widget-scaffold.md).
Domain language: [../../CONTEXT.md](../../CONTEXT.md).

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

   Done when `spatial_rx/static/bundled/<name>.mjs` exists and the demo renders.

7. **Commit** `spatial_rx/static/bundled/*` (shipped in the wheel). See
   [widget packaging](../../docs/widget-packaging.md).

## Dev loop (HMR)

```bash
cd frontend && npm run dev
SPATIAL_RX_WIDGET_DEV=<name> uv run --extra demo marimo edit demos/<demo>.py
```

`_assets.py` serves the Vite entry when `SPATIAL_RX_WIDGET_DEV` matches.
Vanilla widgets (`landmarks`): same env var, or `ANYWIDGET_HMR=1` with no Vite
(see `docs/widget-packaging.md`).

## Do / don't

| Do | Don't |
| --- | --- |
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

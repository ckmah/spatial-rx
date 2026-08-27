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
(run CLI from `frontend/`). Architecture for humans: [../../docs/shadcn-frontend.md](../../docs/shadcn-frontend.md).

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

Complete every step.

1. **Add shadcn components** from `frontend/`:

   ```bash
   cd frontend
   npx shadcn@latest add button dialog
   ```

   Done when files exist under `frontend/src/components/ui/`.

2. **Scaffold** `frontend/src/widgets/<name>/`:
   - `<Name>.tsx` — React view; import `@/components/ui/*`
   - `index.tsx` — `export default { render }`; import `@/styles/globals.css`; mount with `createRoot`

   Done when `index.tsx` matches gallery (`render({ model, el })`).

3. **Wire traitlets** with `frontend/src/hooks/use-model.ts`. On user actions: `model.set(...)` then `model.save_changes()`.

4. **Notebook theme** — `use-notebook-theme.ts`; wrap root in `dark` when needed; pass `hostEl` from `el`.

5. **Vite entry** in `frontend/vite.config.ts` → `widgetEntries`:

   ```ts
   "my-widget": path.resolve(rootDir, "src/widgets/my-widget/index.tsx"),
   ```

   Done when the key matches the bundle basename (`my-widget.mjs`).

6. **Python class**:

   ```python
   from spatial_rx._assets import widget_css, widget_esm

   class MyWidget(AnyWidget):
       _esm = widget_esm("my-widget")
       _css = widget_css("my-widget")
   ```

   Traitlets own state; keep business logic in Python unless purely presentational.

7. **Build and verify**:

   ```bash
   cd frontend && npm run build
   uv run pytest
   ```

   Done when `spatial_rx/static/bundled/my-widget.mjs` exists and the demo renders.

8. **Commit** `spatial_rx/static/bundled/*` (shipped in the wheel). CI runs `npm ci && npm run build` before tests.

## Dev loop (HMR)

```bash
cd frontend && npm run dev
SPATIAL_RX_WIDGET_DEV=<name> uv run --extra demo marimo run demos/<demo>.py
```

`_assets.py` serves `http://localhost:5173/src/widgets/<name>/index.tsx?anywidget` when `SPATIAL_RX_WIDGET_DEV` matches.

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

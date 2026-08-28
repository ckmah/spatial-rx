# Widget packaging

How spatial-rx ships browser code so `pip install spatial-rx` never requires Node.

See also: [shadcn frontend](./shadcn-frontend.md),
[widget scaffold](./widget-scaffold.md).

## Roles

| Role | Toolchain | Gets |
| ---- | --------- | ---- |
| Widget consumer | Python only | Pre-built bundles in the wheel |
| Python contributor | Python only | Vanilla widgets (`landmarks.js`) and Python modules |
| Widget author | Python + Node | `frontend/` source, Vite build, HMR dev loop |

A **widget consumer** installs the package and embeds widgets in marimo or Jupyter.
All React widget assets are already inside the wheel.

A **widget author** edits `frontend/`, runs the build, and commits the output under
`spatial_rx/static/bundled/`. CI verifies that committed bundles match source.

## What ships in the wheel

```
spatial_rx/static/
├── bundled/{name}.mjs    one ESM entry per React widget
├── bundled/widgets.css   shared Tailwind + shadcn theme (all React widgets)
└── landmarks.js          vanilla widget (no build step)
```

Hatch includes `spatial_rx/static/*` as build artifacts. The installed package is
self-contained.

## Install paths

**Consumer** (notebooks, analysis):

```bash
pip install spatial-rx
```

No Node, no `frontend/`, no build step.

**Contributor** (Python-only changes):

```bash
uv sync --extra demo --group dev
uv run pytest
```

**Widget author** (UI changes):

```bash
cd frontend && npm install && npm run build
uv run pytest
```

Commit both source changes and updated files in `spatial_rx/static/bundled/`.

## CI

The default CI job builds `frontend/` before running pytest and `uv build`. This
proves bundles are fresh and reproducible — it does not mean consumers run Node.

A path-filtered job (frontend or bundled assets changed) is sufficient for PRs
that touch only Python; see [ADR 0001](./adr/0001-prebuilt-bundles-node-free-install.md).

## Dev loop (widget authors)

### React / shadcn widgets

Vite HMR without rebuilding on every save:

```bash
cd frontend && npm run dev
SPATIAL_RX_WIDGET_DEV=<name> uv run --extra demo marimo edit demos/<demo>.py
```

`_assets.py` serves the Vite entry (`frontend/src/widgets/<name>/index.tsx`) when
`SPATIAL_RX_WIDGET_DEV` matches the widget name. Restart the Python process after
changing the env var (it is read at import time).

### Vanilla widgets (`landmarks.js`)

Two options; pick one.

**A. anywidget native HMR (no Vite)** — best for CSS/JS tweaks on Path-backed
widgets. Edits to `spatial_rx/static/landmarks.{js,css}` hot-swap in the open
notebook without remounting:

```bash
ANYWIDGET_HMR=1 uv run --extra demo marimo edit demos/landmarks.py
```

**B. Same Vite loop as React** — useful when you already have `npm run dev`
running, or want one workflow for every widget:

```bash
cd frontend && npm run dev
SPATIAL_RX_WIDGET_DEV=landmarks uv run --extra demo marimo edit demos/landmarks.py
```

This serves `frontend/src/widgets/landmarks/index.js`, which re-exports the
vanilla static files. Production still ships `spatial_rx/static/landmarks.*`
directly (no bundle step).

You do not need marimo specifically — JupyterLab / VS Code notebooks work the
same with `ANYWIDGET_HMR=1` or `SPATIAL_RX_WIDGET_DEV`.

## Adding a React widget

Use the [widget scaffold](./widget-scaffold.md) — do not copy an existing widget
by hand. Gallery is one instance of the pattern, not the template.

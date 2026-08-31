# Widget packaging

How spatial-rx ships browser code so `pip install spatial-rx` never requires Node.

See also: [shadcn frontend](./shadcn-frontend.md),
[widget scaffold](./widget-scaffold.md).

## Roles

| Role | Toolchain | Gets |
| ---- | --------- | ---- |
| Widget consumer | Python only | Pre-built bundles in the wheel |
| Python contributor | Python only | Python modules; UI changes need Node |
| Widget author | Python + Node | `frontend/` source, Vite build, file-watch HMR |

A **widget consumer** installs the package and embeds widgets in marimo or Jupyter.
All React widget assets are already inside the wheel.

A **widget author** edits `frontend/`, runs the build, and commits the output under
`spatial_rx/static/bundled/`. CI verifies that committed bundles match source.

## What ships in the wheel

```
spatial_rx/static/
├── bundled/{name}.mjs    one ESM entry per React widget
├── bundled/widgets.css   shared Tailwind + shadcn theme (all React widgets)
├── landmarks.js          canvas engine imported by the landmarks bundle
└── landmarks_state.js    shared traitlet write recipes (engine + React chrome)
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

Reload uses **anywidget's file watcher**, not the Vite dev server.

`_esm` / `_css` are `pathlib.Path` objects pointing at
`spatial_rx/static/bundled/`. Vite rewrites those files on save; anywidget
detects the mtime change and hot-swaps the widget over the notebook Comm
channel.

```bash
# terminal 1 — rebuild the bundle you are editing
cd frontend && npm run watch:landmarks
# or: npm run watch:gallery

# terminal 2 — ANYWIDGET_HMR must be set before Python starts
ANYWIDGET_HMR=1 uv run --extra demo marimo edit demos/neighbors.py
```

Requirements:

1. `_esm` is a `Path` (never `.read_text()`, never a `http://localhost:5173` URL)
2. `ANYWIDGET_HMR=1` on the marimo/Python process
3. `watchfiles` installed (in the `dev` dependency group)
4. The watched file's mtime actually changes when you save (Vite `--watch` running)

Do not use `npm run dev` / `@anywidget/vite` for the normal loop. That path needs
a Vite websocket from the notebook origin and is easy to leave half-wired. Prefer
`build --watch` + Path + `ANYWIDGET_HMR=1` ([anywidget getting started](https://anywidget.dev/en/getting-started/),
[bundling](https://anywidget.dev/en/bundling/)).

Vanilla engine source (`spatial_rx/static/landmarks.js`) is imported into the
landmarks Vite entry. Canvas CSS lives at
`frontend/src/widgets/landmarks/landmarks.css` and ships inside `widgets.css`.
With `ANYWIDGET_HMR=1`, editing the engine JS hot-swaps after the next bundle
rewrite from `npm run watch:landmarks`.

## Adding a React widget

Use the [widget scaffold](./widget-scaffold.md) — do not copy an existing widget
by hand. Gallery is one instance of the pattern, not the template.

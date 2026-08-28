# AGENTS.md

Guidance for agents working in **spatial-rx**.

Domain language: [`CONTEXT.md`](CONTEXT.md).

## Widgets

Default: vanilla ESM under `spatial_rx/static/` (see `landmarks.js`).

**shadcn anywidgets** — when adding or changing a React/shadcn widget (forms, lists, overlays, `frontend/` bundles): read [`.agents/skills/shadcn-anywidget/SKILL.md`](.agents/skills/shadcn-anywidget/SKILL.md). Architecture: [`docs/widget-packaging.md`](docs/widget-packaging.md), [`docs/widget-scaffold.md`](docs/widget-scaffold.md).

## Widget UI development (default)

Always use HMR when editing widget front-end code. Do not remount notebook cells
or hard-reload to pick up JS/CSS changes unless HMR is unavailable.

**Vanilla** (`spatial_rx/static/*.js`, `landmarks`):

```bash
ANYWIDGET_HMR=1 uv run --extra demo marimo edit demos/landmarks.py
```

**React / shadcn** (`frontend/src/widgets/<name>/`):

```bash
cd frontend && npm run dev
SPATIAL_RX_WIDGET_DEV=<name> uv run --extra demo marimo edit demos/<demo>.py
```

`SPATIAL_RX_WIDGET_DEV` is read at import time — restart the Python process after
changing it. Details: [`docs/widget-packaging.md`](docs/widget-packaging.md).

# AGENTS.md

Guidance for agents working in **spatial-rx**.

Domain language: [`CONTEXT.md`](CONTEXT.md).

## Widgets

React/shadcn widgets live in `frontend/src/widgets/`. Canvas drawing for landmarks
stays in `spatial_rx/static/landmarks.js` (`mountEngine`) and is bundled with the
React chrome.

**Widget UI must use shadcn/ui primitives** from `frontend/src/components/ui/`.
Compose with `@/components/ui/*` (Button, Card, Slider, Field, Accordion, etc.).
Add missing components via `npx shadcn@latest add` from `frontend/`; the **ReUI**
registry (`@reui/*`, free `c-*` components) is configured in `frontend/components.json`.
Do not hand-roll styled `div`/`button`/`input` markup when a shadcn or ReUI component exists. See
[`.agents/skills/shadcn-anywidget/SKILL.md`](.agents/skills/shadcn-anywidget/SKILL.md)
and [`.agents/skills/shadcn/SKILL.md`](.agents/skills/shadcn/SKILL.md).

When adding or changing a React/shadcn widget: read
[`.agents/skills/shadcn-anywidget/SKILL.md`](.agents/skills/shadcn-anywidget/SKILL.md).
Architecture: [`docs/widget-packaging.md`](docs/widget-packaging.md),
[`docs/widget-scaffold.md`](docs/widget-scaffold.md).

## Widget UI development

Use anywidget file-watch HMR (not the Vite dev server):

```bash
cd frontend && npm run watch:landmarks
ANYWIDGET_HMR=1 uv run --extra demo marimo edit demos/<demo>.py
```

`_esm` must remain a `pathlib.Path` to the bundled `.mjs`. Do not `.read_text()`
it and do not point it at `http://localhost:5173`. Details:
[`docs/widget-packaging.md`](docs/widget-packaging.md).

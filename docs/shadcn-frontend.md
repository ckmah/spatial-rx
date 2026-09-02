# shadcn frontend

React/shadcn anywidgets live in `frontend/` and compile to ESM under
`spatial_rx/static/bundled/`.

Docs: [widget packaging](./widget-packaging.md),
[widget scaffold](./widget-scaffold.md) (traitlet-driven, not gallery-shaped).
Agent workflow:
[`.agents/skills/shadcn-anywidget/SKILL.md`](../.agents/skills/shadcn-anywidget/SKILL.md).

```
frontend/                          npm package (UI source of truth)
├── components.json                shadcn CLI config
├── src/
│   ├── styles/globals.css         theme tokens + Tailwind
│   ├── components/ui/             `npx shadcn@latest add …`
│   ├── hooks/                     traitlets + notebook theme bridges
│   └── widgets/<name>/            one Vite entry per widget
│       └── landmarks/landmarks.css   canvas CSS (emitted into widgets.css)
└── vite.config.ts                 → spatial_rx/static/bundled/

spatial_rx/static/
├── bundled/{name}.mjs, widgets.css   committed; shipped in the wheel
└── landmarks.js                      canvas engine for the landmarks widget
```

Build: `cd frontend && npm install && npm run build`.

Authoring reload (anywidget file watcher, not Vite `dev`):

```bash
cd frontend && npm run watch:landmarks
ANYWIDGET_HMR=1 uv run --extra demo marimo edit demos/<demo>.py
```

CI builds `frontend/` before tests and publish so wheels include bundles.
`pip install` does not require Node.

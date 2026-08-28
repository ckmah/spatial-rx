# Widget scaffold

Generate starter files for a new widget from a **traitlet specification** — not
from the shape of an existing widget like gallery.

See also: [widget packaging](./widget-packaging.md),
[shadcn frontend](./shadcn-frontend.md),
[ADR 0002](./adr/0002-named-traitlets-as-widget-contract.md).

## Contract: named traitlets

Each widget's Python↔browser contract is a set of **named, typed traitlets**.
Gallery happens to use `items`, `selected_index`, and `columns`; another widget
might use `points`, `color`, and `radius`, or `form_values` alone.

The scaffold takes an arbitrary traitlet list and generates matching wiring on
both sides. The author fills in presentation (React JSX) and validation (Python
`__init__`); the generator handles everything mechanical.

### Supported traitlet types

| Spec type | Python | Notes |
| --------- | ------ | ----- |
| `Int` | `traitlets.Int` | |
| `Float` | `traitlets.Float` | |
| `Bool` | `traitlets.Bool` | |
| `Unicode` | `traitlets.Unicode` | strings |
| `List` | `traitlets.List` | optional element type: `List[Dict]`, `List[Unicode]` |
| `Dict` | `traitlets.Dict` | JSON-serializable values |
| `Tuple` | `traitlets.Tuple` | fixed-length, typed elements |

Any synced traitlet whose value is JSON-serializable can cross the boundary.
Nested lists and dicts (e.g. `{ "points": [{"x": 1, "y": 2}, ...] }`) are fine.

### What is *not* assumed

The scaffold does **not** assume:

- a list of card-shaped dicts with `title` / `description` / `image`
- a selection index
- a column count
- any particular shadcn component

Those are gallery-specific choices made in `GalleryView.tsx` and
`GalleryWidget.__init__`, not part of the generator.

## Specification format

A widget is declared in a small YAML file (convention: `widgets/<kebab-name>.yaml`):

```yaml
name: scatter-overlay          # kebab-case; drives bundle filename and paths
class: ScatterOverlayWidget    # Python class name
traitlets:
  - name: points
    type: List
    element: Dict
    default: []
    sync: true
  - name: color
    type: Unicode
    default: "#ff2d95"
    sync: true
  - name: radius
    type: Float
    default: 4.0
    sync: true
  - name: selected_ids
    type: List
    element: Unicode
    default: []
    sync: true
```

Equivalent CLI (for agents and quick iteration):

```bash
uv run scripts/scaffold_widget.py scatter-overlay \
  --traitlet 'points:List[Dict]=[]' \
  --traitlet 'color:Unicode="#ff2d95"' \
  --traitlet 'radius:Float=4.0' \
  --traitlet 'selected_ids:List[Unicode]=[]' \
  --demo
```

## Generated outputs

From one spec, the scaffold creates:

| File | Generated content |
| ---- | ----------------- |
| `frontend/src/widgets/<name>/index.tsx` | anywidget mount (`createRoot`, `export default { render }`) |
| `frontend/src/widgets/<name>/<Class>View.tsx` | `useModel` subscribed to **all spec traitlets**; `useNotebookTheme` wrapper; `{/* UI */}` stub |
| `spatial_rx/<module>.py` | `AnyWidget` subclass with `_esm` / `_css` and declared traitlets |
| `frontend/vite.config.ts` | new entry in `widgetEntries` |
| `spatial_rx/__init__.py` | export |
| `demos/<name>.py` | minimal marimo demo with placeholder initial values |

Shared infrastructure is **not** regenerated per widget:

- `frontend/src/hooks/use-model.ts`
- `frontend/src/hooks/use-notebook-theme.ts`
- `frontend/src/styles/globals.css`
- `spatial_rx/_assets.py`

## Author fills in

### React (`<Class>View.tsx`)

Presentation only: layout, shadcn components, event handlers. On user action:

```tsx
model.set("selected_ids", next);
model.save_changes();
```

Read state via `useModel<…>(model, [/* traitlet names from spec */])`.

Add shadcn primitives separately:

```bash
cd frontend && npx shadcn@latest add button dialog
```

### Python (`spatial_rx/<module>.py`)

Optional `__init__` for validation, normalization, and convenience kwargs.
Gallery's title-required check lives here — it is not part of the scaffold.

### Build and ship

```bash
cd frontend && npm run build
uv run pytest
```

Commit updated files in `spatial_rx/static/bundled/`.

## Data flow (any widget)

```
Python                          Browser
──────                          ───────
widget.points = [...]    →      change:points → useModel re-renders
widget.color = "#abc"    →      change:color  → useModel re-renders

model.set("radius", 6)   ←      user drags slider
model.save_changes()     ←      (required for Python to see it)
```

Each traitlet is independent. A widget with one `Dict` traitlet holding all state
is valid; so is a widget with a dozen flat traitlets. The spec declares the
shape — the scaffold does not prefer either.

## Example: gallery as a spec

Gallery is not the template, but it can be expressed as:

```yaml
name: gallery
class: GalleryWidget
traitlets:
  - { name: items,          type: List, element: Dict, default: [], sync: true }
  - { name: selected_index, type: Int,  default: -1,   sync: true }
  - { name: columns,        type: Int,  default: 4,    sync: true }
```

The generated `GalleryView.tsx` would still need the card grid UI and
`GalleryWidget.__init__` would still need item validation — only the wiring
is automated.

## Example: form widget (different shape)

```yaml
name: filter-form
class: FilterFormWidget
traitlets:
  - name: schema
    type: List
    element: Dict
    default: []
    sync: true
  - name: values
    type: Dict
    default: {}
    sync: true
  - name: submitted
    type: Bool
    default: false
    sync: true
```

Same scaffold command, different spec — no gallery concepts involved.

## Agent workflow (after scaffold exists)

1. Write or edit the traitlet spec (YAML or CLI flags).
2. Run `scaffold_widget.py`.
3. `npx shadcn add …` if new primitives are needed.
4. Implement `<Class>View.tsx` and Python validation.
5. Build, demo, commit bundles.

Steps the scaffold replaces: manual `index.tsx`, Vite entry, Python class shell,
`__init__.py` export, and demo stub.

## Run the scaffold

From the repo root:

```bash
# CLI traitlets
uv run scripts/scaffold_widget.py scatter-overlay \
  --traitlet 'points:List[Dict]=[]' \
  --traitlet 'color:Unicode="#ff2d95"' \
  --traitlet 'radius:Float=4.0' \
  --demo

# Or from YAML (see widgets/gallery.yaml for a reference spec)
uv run scripts/scaffold_widget.py --spec widgets/scatter-overlay.yaml --demo
```

Templates live in `scripts/templates/`. Use `--force` to overwrite generated
files. Gallery was written by hand before the scaffold existed; new widgets
should start from the generator.

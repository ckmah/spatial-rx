# spatial-rx

Interactive notebook widgets for spatial omics exploration. Python owns analysis
logic; the browser owns presentation. State crosses the boundary through named,
typed fields.

Point scatter, landmarks, selections, and drafts use deck.gl orthographic
layers via `LandmarksWidget.from_points(...)`.

## Language

**Widget**:
An interactive control embedded in a notebook cell whose state stays in sync with
Python without re-running the cell.
_Avoid_: anywidget, component, view

**Synced state**:
A named value that flows between Python and a widget in either direction when it
changes.
_Avoid_: data blob, payload, props

**Traitlet**:
The name of one synced field on a widget's Python model. Each traitlet has a type
and an optional default.
_Avoid_: property, attribute, key

**Vanilla widget**:
A widget whose browser code is hand-written JavaScript, shipped as source in the
package.
_Avoid_: ESM widget, canvas widget, landmarks widget

**React widget**:
A widget whose browser code is composed with React and shadcn/ui, compiled ahead
of time into a bundle.
_Avoid_: shadcn widget, frontend widget

**Bundle**:
The pre-compiled browser assets for a React widget, shipped inside the installed
package so consumers need no build toolchain.
_Avoid_: static files, .mjs, dist

**Widget consumer**:
A notebook user who installs spatial-rx and embeds widgets. No frontend toolchain
required.
_Avoid_: user, end user

**Widget author**:
A contributor who adds or changes widget UI. Works in the frontend source tree
and rebuilds bundles before release.
_Avoid_: developer, maintainer

**Widget scaffold**:
Generated starter files for a new widget, driven by a traitlet specification
rather than copied from an existing widget.
_Avoid_: template, boilerplate generator

**Landmark**:
A user-placed geometric annotation on tissue coordinates.

**Selection**:
A region of tissue coordinates chosen for downstream analysis.

**Gallery item**:
One card in a gallery widget: a required title with optional description and
image.

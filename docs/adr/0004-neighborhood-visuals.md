# Neighborhood visuals: radius soft-gradient vs kNN edges

## Context

LandmarksWidget subsets precomputed k-NN / radius neighbor graphs from
`obsp` (see CONTEXT.md). An early GPU overlay drew both modes as
`PathLayer` seed→neighbor edges. Radius mode looked like dense edge
spaghetti. The next iteration used per-seed outlined `ScatterplotLayer`
disks at `neighborhood_radius`; those strokes read as hard rings and
stacked poorly when many seeds overlapped.

`@deck.gl/extensions` (`DataFilterExtension`, `BrushingExtension`,
`MaskExtension`, …) can filter or mask layer attributes on the GPU. Our
neighbor sets already come from CSR subsetting on the CPU (`neighbor_*` /
`radius_*` traitlets + slider k/r). Re-encoding distances into per-point
filter attributes would duplicate that work and grow the bundle without
changing the traitlet contract.

## Decision

- **Radius mode:** soft gradient field only — **no** per-seed disk strokes
  or rings. Kernel radius = `neighborhood_radius` in **world/common (µm)**
  units so the field stays correct under orthographic zoom.
- **Implementation:** bake a low-res float/RGBA texture from seed
  positions (smooth radial kernel, max-blend + clamped peak alpha so
  unions do not blow out) and draw with `BitmapLayer` over the plot.
  One bake path for small and large selections; texture size caps down
  for very large seed counts. Rebake when seeds / radius change (cached
  by key) — **not** every pan frame.
- **kNN mode:** keep `PathLayer` edges from active selection/type seeds
  only; restyle with DESIGN.md `neighborhood-teal` (`#b3f2e8`), thinner
  stroke, lower opacity.
- **Do not** add `@deck.gl/extensions` for this overlay. Point role
  highlighting (seed / neighbor / other) stays on the points layer.

## Consequences

- Shift+wheel and neighborhood traitlets are unchanged.
- Playwright asserts `getNeighborhoodOverlay()` gradient fields
  (`radiusGradient`, `gradientKind: "bitmap"`, `radiusDiskCount === 0`)
  vs kNN edge counts.
- If GPU masking of the full scatter by a radius hull is needed later,
  revisit `MaskExtension` without replacing CSR ingestion.

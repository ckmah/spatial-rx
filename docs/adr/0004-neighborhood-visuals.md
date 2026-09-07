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
  or rings. Kernel distances are in **world/common (µm)** units so the
  field stays correct under orthographic zoom.
- **Bake once at r_max:** when the seed set (or `maxNeighborhoodRadius()` /
  `neighbor_radius_max`) changes, bake a low-res **min-distance-to-nearest-
  seed** field over an AABB expanded by r_max. Seed world positions stay
  fixed — never uniformly scale the AABB when the slider r changes (that
  would pull multi-seed clusters together).
- **Remap for current r:** for the slider/wheel radius, do **not** restamp
  seeds. Derive the visible RGBA by remapping the distance field with a
  smoothstep falloff at current r in O(texture) time. Min-distance +
  monotonic falloff is equivalent to max-blend of per-seed kernels; peak
  alpha is clamped (muted teal wash) so unions do not overwhelm scatter +
  point roles.
- **Draw:** `BitmapLayer` over the plot. Texture size caps down for very
  large seed counts. Rebake on seeds / r_max only — **not** every pan frame
  and **not** every current-r change (remap only).
- **kNN mode:** keep `PathLayer` edges from active selection/type seeds
  only; restyle with DESIGN.md `neighborhood-teal` (`#b3f2e8`), thinner
  stroke, lower opacity.
- **Do not** add `@deck.gl/extensions` for this overlay. Point role
  highlighting (seed / neighbor / other) stays on the points layer.

## Consequences

- Shift+wheel and neighborhood traitlets are unchanged.
- Playwright asserts `getNeighborhoodOverlay()` gradient fields
  (`radiusGradient`, `gradientKind: "bitmap"`, `radiusDiskCount === 0`,
  `gradientBakeRadius >= radius`) vs kNN edge counts.
- If GPU masking of the full scatter by a radius hull is needed later,
  revisit `MaskExtension` without replacing CSR ingestion.

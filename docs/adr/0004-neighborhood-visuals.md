# Neighborhood visuals: radius disks vs kNN edges

## Context

LandmarksWidget subsets precomputed k-NN / radius neighbor graphs from
`obsp` (see CONTEXT.md). The first GPU overlay drew both modes as
`PathLayer` seed→neighbor edges. Radius mode looked like dense edge
spaghetti; kNN edges were thick and high-contrast against Soft Float
chrome.

`@deck.gl/extensions` (`DataFilterExtension`, `BrushingExtension`,
`MaskExtension`, …) can filter or mask layer attributes on the GPU. Our
neighbor sets already come from CSR subsetting on the CPU (`neighbor_*` /
`radius_*` traitlets + slider k/r). Re-encoding distances into per-point
filter attributes would duplicate that work and grow the bundle without
changing the traitlet contract.

## Decision

- **Radius mode:** outlined disks via `ScatterplotLayer` (`radiusUnits:
  "common"`, stroked + light fill) centered on seed points at
  `neighborhood_radius`. No edge paths.
- **kNN mode:** keep `PathLayer` edges from active selection/type seeds
  only; restyle with DESIGN.md `neighborhood-teal` (`#b3f2e8`), thinner
  stroke, lower opacity.
- **Do not** add `@deck.gl/extensions` for this overlay. Point role
  highlighting (seed / neighbor / other) stays on the points layer.

## Consequences

- Shift+wheel and neighborhood traitlets are unchanged.
- Playwright asserts `getNeighborhoodOverlay()` disk vs edge counts.
- If GPU masking of the full scatter by a radius hull is needed later,
  revisit `MaskExtension` without replacing CSR ingestion.

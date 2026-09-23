# VolumeCubeWidget feature map

Poteto-style verification index for agents. Each file maps **one user-visible
capability** to existing Playwright coverage — not a product roadmap.

**CI specs:** `frontend/e2e/volume-cube/`  
**Harness docs:** [`frontend/e2e/README.md`](../../../frontend/e2e/README.md)  
**Skill entrypoint:** [`../SKILL.md`](../SKILL.md)

## Mapped features

| Feature | Spec source | Visual anchor |
| --- | --- | --- |
| [harness-boots-volume](harness-boots-volume.md) | `volume-cube.spec.ts` — `"harness boots and OME-Zarr volume renders"` | `rest` |
| [inspect-window-placement](inspect-window-placement.md) | `volume-cube.spec.ts` — `"toy inspect drag updates synced window traits"` | `window-on-sphere` |
| [window-trait-readout](window-trait-readout.md) | `volume-cube.spec.ts` — `"model patch updates window readout without inspect drag"` | — |
| [labels-toggle](labels-toggle.md) | `volume-cube.spec.ts` — `"labels switch hides the labels VolumeViewer overlay"` | `labels-off` |
| [axis-slice-traits](axis-slice-traits.md) | `volume-cube.spec.ts` — `"model patch updates axis slice readout"` | — |
| [landmarks-inspect-drives-cube](landmarks-inspect-drives-cube.md) | `notebook-link.spec.ts` — `"Landmarks inspect click updates VolumeCube window readout"` | — |

## Not yet mapped (spec exists, no feature file)

These tests have e2e coverage but no dedicated feature file yet. Extend the map
when agents routinely need them:

- Iso / Reset buttons (functional only today; no separate spec assertion beyond boot)

## Adding a feature

1. Confirm a spec exists under `frontend/e2e/volume-cube/`.
2. Copy an existing feature file shape (four H2 sections).
3. Cite real `getByRole` names, helpers from `frontend/e2e/helpers.ts`, and traitlet keys.
4. Link the spec test title and any named screenshot from the e2e README.

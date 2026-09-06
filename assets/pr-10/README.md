# PR #10 screenshots

Captured from a static harness that mounts the shipped `landmarks.mjs` bundle
with synthetic synced state (`harness.html` + `harness-state.json`).

- `landmarks-chrome-current.png` — full Landmarks chrome (shadcn panels + zoom/reset)
- `zoom-reset-shadcn.png` — zoom in / zoom out / reset control group
- `after-zoom-in.png` / `after-reset.png` — same chrome after native-backed zoom/reset

Stock `@deck.gl/widgets` ZoomWidget / ResetViewWidget nodes are mounted with
`display: none` (verified in capture); React chrome remains the visible UI.

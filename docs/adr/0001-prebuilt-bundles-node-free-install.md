# Pre-built widget bundles for node-free install

React widgets need a Node toolchain to compile, but notebook users should not.
We commit compiled bundles under `spatial_rx/static/bundled/` and ship them inside
the wheel via Hatch artifacts. CI rebuilds frontend on every run to verify bundles
match source; consumers only `pip install spatial-rx`.

**Considered:** build bundles at `pip install` time (requires Node on every install);
fetch bundles from a CDN at runtime (network dependency, versioning pain); inline
React via EsmWidget CDN imports (no shadcn/Tailwind without a build step).

**Consequences:** widget authors must run `npm run build` and commit bundle output
before release. Bundle diffs appear in PRs that touch `frontend/`.

#!/usr/bin/env python3
"""Regenerate Polyrender harness tiles + fixture.json from the liver crop sample.

Writes::

    frontend/dev/polyrender/public/tiles.json
    frontend/dev/polyrender/public/tiles/*.glb
    frontend/dev/polyrender/fixture.json

Run from repo root::

    cd frontend && npm run dev:fixture:polyrender
"""

from __future__ import annotations

import base64
import json
import shutil
import sys
import tempfile
from pathlib import Path

import geopandas as gpd
import numpy as np

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT))

from spatial_rx.polyrender import meshify  # noqa: E402

HARNESS_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = HARNESS_DIR / "public"
FIXTURE_PATH = HARNESS_DIR / "fixture.json"
SAMPLE = ROOT / "demos" / "data" / "polyrender" / "liver_crop_sample.parquet"

# Keep the committed GLB small enough for review / git while still looking like real cells.
N_CELLS = 12


def _centroids_payload(gdf: gpd.GeoDataFrame) -> tuple[str, str]:
    areas = gdf.geometry.area.astype("float64")
    cents = gdf.geometry.centroid
    cx = cents.x.astype("float64")
    cy = cents.y.astype("float64")
    w = areas.to_numpy()
    w = np.where(np.isfinite(w) & (w > 0), w, 1.0)
    tmp = gpd.GeoDataFrame(
        {"cell_id": gdf["cell_id"], "wx": cx * w, "wy": cy * w, "w": w},
    )
    grp = tmp.groupby("cell_id", sort=False)[["wx", "wy", "w"]].sum()
    cxy = np.empty((len(grp), 2), dtype=np.float32)
    cxy[:, 0] = (grp["wx"] / grp["w"]).to_numpy(dtype=np.float32, copy=False)
    cxy[:, 1] = (grp["wy"] / grp["w"]).to_numpy(dtype=np.float32, copy=False)
    return (
        base64.b64encode(cxy.tobytes()).decode("ascii"),
        json.dumps([str(x) for x in grp.index.tolist()], separators=(",", ":")),
    )


def main() -> None:
    if not SAMPLE.is_file():
        raise SystemExit(f"Missing sample parquet: {SAMPLE}")

    gdf = gpd.read_parquet(SAMPLE)
    cells = sorted(gdf["cell_id"].unique())[:N_CELLS]
    gdf = gdf[gdf["cell_id"].isin(cells)].copy()

    with tempfile.TemporaryDirectory(prefix="polyrender-harness-") as td:
        info = meshify(
            gdf,
            out_dir=td,
            smooth=False,
            use_cache=False,
            show_progress=False,
        )
        run_dir = Path(info["out_dir"])

        if PUBLIC_DIR.exists():
            shutil.rmtree(PUBLIC_DIR)
        PUBLIC_DIR.mkdir(parents=True)
        shutil.copy2(run_dir / "tiles.json", PUBLIC_DIR / "tiles.json")
        tiles_src = run_dir / "tiles"
        tiles_dst = PUBLIC_DIR / "tiles"
        shutil.copytree(tiles_src, tiles_dst)

    centroids_xy_b64, centroids_cell_ids_json = _centroids_payload(gdf)
    fixture = {
        "tile_server_url": "",
        "tiles_json_path": "tiles.json",
        "bbox": [float(x) for x in info["scene_bbox"]],
        "color": "#4aa3ff",
        "max_concurrent_fetches": 4,
        "centroids_xy_b64": centroids_xy_b64,
        "centroids_cell_ids_json": centroids_cell_ids_json,
        "on_demand": False,
        "max_orbit_distance": 0.0,
    }
    FIXTURE_PATH.write_text(json.dumps(fixture, indent=2) + "\n", encoding="utf-8")

    glb_bytes = sum(p.stat().st_size for p in tiles_dst.rglob("*.glb"))
    print(
        f"Wrote {FIXTURE_PATH.relative_to(ROOT)} and "
        f"{PUBLIC_DIR.relative_to(ROOT)} "
        f"({len(info['tiles'])} tiles, {glb_bytes} bytes GLB, "
        f"{N_CELLS} cells).",
    )


if __name__ == "__main__":
    main()

import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/globals.css";
import "@/widgets/landmarks/landmarks.css";
import type { AnyModel } from "@/widgets/landmarks/helpers";
import { LandmarksView } from "@/widgets/landmarks/LandmarksView";
import { VolumeCubeView } from "@/widgets/volume-cube/VolumeCubeView";

import { createMockModel, loadFixtureModel } from "../mock-model";

const EXTENT_XY = 256;
const EXTENT_Z = 64;

function linkInspectToCube(landmarks: AnyModel, cube: AnyModel) {
  const sync = () => {
    const cx = landmarks.get("inspect_cx");
    const cy = landmarks.get("inspect_cy");
    if (cx == null || cy == null) return;
    cube.set("window_cx", Number(cx));
    cube.set("window_cy", Number(cy));
    cube.save_changes();
  };
  landmarks.on("change:inspect_cx", sync);
  landmarks.on("change:inspect_cy", sync);
  sync();
}

function NotebookLinkHarness() {
  const [landmarksHost, setLandmarksHost] = useState<HTMLElement | null>(null);
  const [cubeHost, setCubeHost] = useState<HTMLElement | null>(null);
  const [landmarksModel, setLandmarksModel] = useState<AnyModel | null>(null);
  const [loadError, setLoadError] = useState("");

  const cubeModel = useMemo(() => {
    const model = createMockModel({
      image_url: "/toy.ome.zarr/",
      labels_url: "/toy.ome.zarr/labels/cells/",
      window_cx: EXTENT_XY / 2,
      window_cy: EXTENT_XY / 2,
      window_size_um: 100,
      slice_x_min: 0,
      slice_x_max: EXTENT_XY,
      slice_y_min: 0,
      slice_y_max: EXTENT_XY,
      slice_z_min: 0,
      slice_z_max: EXTENT_Z,
    });
    (window as unknown as { __volumeCubeModel?: AnyModel }).__volumeCubeModel = model;
    return model;
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadFixtureModel()
      .then((model) => {
        if (cancelled) return;
        setLandmarksModel(model);
        linkInspectToCube(model, cubeModel);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : String(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [cubeModel]);

  if (loadError) {
    return <p className="p-4 text-sm text-destructive">{loadError}</p>;
  }

  return (
    <div className="dark flex min-h-screen flex-col gap-2 bg-neutral-950 p-3 text-neutral-100">
      <p
        className="text-xs uppercase tracking-wide text-amber-400"
        data-testid="notebook-link-banner"
      >
        Notebook link harness — mirrors demos/volume-cube.py (Landmarks inspect → cube window)
      </p>
      <div className="flex min-h-0 flex-1 gap-3">
        <div ref={setLandmarksHost} className="min-w-0 flex-1">
          {landmarksHost && landmarksModel ? (
            <LandmarksView
              model={landmarksModel}
              hostEl={landmarksHost}
              defaultHeight={780}
            />
          ) : (
            <p className="p-4 text-sm text-muted-foreground">Loading landmarks fixture…</p>
          )}
        </div>
        <div ref={setCubeHost} className="min-w-0 flex-1">
          {cubeHost ? (
            <VolumeCubeView model={cubeModel} hostEl={cubeHost} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("missing #root");
createRoot(root).render(<NotebookLinkHarness />);

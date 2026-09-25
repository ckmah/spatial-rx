import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { cn } from "@/lib/utils";

import type { HighlightGroup } from "@/widgets/volume-cube/cell-lut-extension";
import type { CubeCut } from "@/widgets/volume-cube/VolumeCube";

import { decodeF32Base64, decodeI32Base64 } from "./binary";
import {
  LayersPanel,
  MinimapPanel,
  SelectionToolbar,
  Topbar,
  LandmarkCanvasMenu,
  ViewCta,
  RightChromeStack,
  CanvasRulers,
  CubeWindow,
  InspectToolbar,
  InspectNoVolumePill,
} from "./chrome";
import { FLOAT_PANEL } from "./chrome/sections";
import { cubeHighlightGroups } from "./cube-highlight";
import { mountEngine, type EngineHandle } from "./engine";
import {
  GEOMETRY_MODE_IDS,
  INTERACTION_MODE_IDS,
  LANDMARK_MODE_IDS,
  type AnyModel,
} from "./helpers";
import { wrapLandmarksModel } from "./model";
import { followWindowCut, useCubeSettings } from "./use-cube-settings";
import { useLandmarksModel } from "./use-landmarks-model";
import { useWidgetFullscreen } from "./use-widget-fullscreen";

const SHELL_HEIGHT = 550;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 1400;
const NARROW_BREAKPOINT = 640;
/** No cut yet (e.g. `volume_cut == []`): the cube clamps it to the window and stack. */
const UNCUT: CubeCut = [-Infinity, Infinity, -Infinity, Infinity, -Infinity, Infinity];
const DEFAULT_CONTRAST: [number, number] = [0, 255];
const NO_GROUPS: HighlightGroup[] = [];

const ALL_MODES = [
  ...INTERACTION_MODE_IDS,
  ...GEOMETRY_MODE_IDS,
  ...LANDMARK_MODE_IDS,
];

export function LandmarksView({
  model,
  hostEl,
  defaultHeight = SHELL_HEIGHT,
}: {
  hostEl: HTMLElement;
  model: AnyModel;
  /** Dev harness can pass a taller initial shell height; notebooks keep 550px default. */
  defaultHeight?: number;
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const facade = useMemo(() => wrapLandmarksModel(model), [model]);
  const lm = useLandmarksModel(facade);
  const plotHostRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);
  const engineRef = useRef<EngineHandle | null>(null);
  const [engine, setEngine] = useState<EngineHandle | null>(null);
  const [shellHeight, setShellHeight] = useState(defaultHeight);
  const [narrow, setNarrow] = useState(false);
  const savedHeightRef = useRef<number | null>(null);
  const wasFullscreenRef = useRef(false);

  // Inspect cube: open on a placement, closed by Esc or the window's close button.
  const hasVolume = Boolean(lm.volume?.image_url);
  const volumeCut = lm.volume_cut?.length === 6 ? (lm.volume_cut as CubeCut) : null;
  const [cube, patchCube] = useCubeSettings(
    lm.volume?.contrast_limits ?? DEFAULT_CONTRAST,
    volumeCut ?? UNCUT,
  );
  const volumeCutKey = volumeCut?.join(",") ?? "";
  useEffect(() => {
    if (volumeCut) patchCube({ cut: volumeCut });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volumeCutKey, patchCube]);
  useEffect(() => {
    if (!engine || !hasVolume) return;
    return engine.subscribeInspect((e) => patchCube({ open: e.type === "place" }));
  }, [engine, hasVolume, patchCube]);
  useEffect(() => {
    engine?.setInspectWindowVisible(cube.open);
    // A reopened cube reloads; its cut ranges wait for the new bounds.
    if (!cube.open) patchCube({ bounds: null });
  }, [engine, cube.open, patchCube]);

  const onCommitCut = useCallback(
    (cut: CubeCut) => {
      patchCube({ cut });
      facade.set("volume_cut", cut);
      facade.save_changes();
    },
    [facade, patchCube],
  );

  // Partial X/Y cuts keep their place in the window as it moves (a cut across
  // the whole window stays whole), so a pan never cuts the cube away.
  const windowRef = useRef<{ cx: number; cy: number } | null>(null);
  useEffect(() => {
    const { inspect_cx: cx, inspect_cy: cy } = lm;
    if (cx == null || cy == null) return;
    const prev = windowRef.current;
    windowRef.current = { cx, cy };
    if (!prev) return;
    const next = followWindowCut(cube.cut, prev, { cx, cy }, lm.inspect_size_um || 100);
    if (next) onCommitCut(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lm.inspect_cx, lm.inspect_cy]);

  // Decode each packed buffer once per string, and only when there is a cube.
  const points = useMemo(
    () => (hasVolume ? decodeF32Base64(lm.points_data) : null),
    [hasVolume, lm.points_data],
  );
  const labelIds = useMemo(
    () => (hasVolume && lm.volume_label_ids ? decodeI32Base64(lm.volume_label_ids) : null),
    [hasVolume, lm.volume_label_ids],
  );
  const codes = useMemo(
    () => (hasVolume && lm.category_codes ? decodeI32Base64(lm.category_codes) : null),
    [hasVolume, lm.category_codes],
  );
  const groups = useMemo(() => {
    if (!cube.open || !points || lm.inspect_cx == null || lm.inspect_cy == null) return NO_GROUPS;
    return cubeHighlightGroups({
      points,
      xBounds: lm.x_bounds,
      yBounds: lm.y_bounds,
      labelIds,
      codes,
      columns: lm.category_columns.map((c) => ({
        name: c.name,
        labels: c.labels ?? [],
        palette: c.palette ?? [],
      })),
      activeCategory: lm.active_category,
      colorBy: lm.color_by,
      focus: { kind: lm.selected_kind, index: lm.selected_index },
      selections: lm.selections,
      window: { cx: lm.inspect_cx, cy: lm.inspect_cy, size: lm.inspect_size_um || 100 },
    });
  }, [
    cube.open,
    points,
    lm.x_bounds,
    lm.y_bounds,
    labelIds,
    codes,
    lm.category_columns,
    lm.active_category,
    lm.color_by,
    lm.selected_kind,
    lm.selected_index,
    lm.selections,
    lm.inspect_cx,
    lm.inspect_cy,
    lm.inspect_size_um,
  ]);
  const inspecting = lm.mode === "inspect";

  const syncEngineLayout = useCallback(() => {
    engineRef.current?.resize();
  }, []);

  const { isFullscreen, overlay, toggle } = useWidgetFullscreen(
    rootRef,
    syncEngineLayout,
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onToggle = () => {
      void toggle();
    };
    el.addEventListener("landmarks-toggle-fullscreen", onToggle);
    return () => {
      el.removeEventListener("landmarks-toggle-fullscreen", onToggle);
    };
  }, [toggle]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      setNarrow(width < NARROW_BREAKPOINT);
    });
    ro.observe(el);
    setNarrow(el.clientWidth < NARROW_BREAKPOINT);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (isFullscreen && !wasFullscreenRef.current) {
      savedHeightRef.current = shellHeight;
    }
    if (!isFullscreen && wasFullscreenRef.current && savedHeightRef.current != null) {
      setShellHeight(savedHeightRef.current);
      savedHeightRef.current = null;
      syncEngineLayout();
    }
    wasFullscreenRef.current = isFullscreen;
  }, [isFullscreen, shellHeight, syncEngineLayout]);

  useEffect(() => {
    hostEl.style.width = "100%";
    hostEl.style.maxWidth = "100%";
    hostEl.style.minWidth = "0";
    hostEl.style.display = "block";
  }, [hostEl]);

  useEffect(() => {
    const host = plotHostRef.current;
    if (!host) return;
    const engine = mountEngine({ model: facade, host });
    engineRef.current = engine;
    setEngine(engine);
    return () => {
      engine.destroy();
      engineRef.current = null;
      setEngine(null);
    };
    // Remount when Vite HMR replaces mountEngine (landmarks.js changes).
  }, [facade, mountEngine]);

  const onResizePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const maxH = Math.min(window.innerHeight * 0.9, MAX_HEIGHT);
      const start = {
        y: event.clientY,
        h: shellHeight,
        maxH,
      };
      const move = (ev: PointerEvent) => {
        setShellHeight(
          Math.round(
            Math.min(start.maxH, Math.max(MIN_HEIGHT, start.h + (ev.clientY - start.y))),
          ),
        );
        syncEngineLayout();
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        syncEngineLayout();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [shellHeight, syncEngineLayout],
  );

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        setRootEl((prev) => (prev === node ? prev : node));
      }}
      className={cn(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        dark && "dark landmarks--dark",
        !dark && "landmarks--light",
        narrow && "landmarks--narrow",
        isFullscreen && "landmarks--fs",
        overlay && "landmarks--overlay-fs",
        lm.show_rulers && "landmarks--rulers",
      )}
      data-rulers={lm.show_rulers ? "on" : "off"}
    >
      <div
        className="landmarks__body"
        style={isFullscreen ? undefined : { height: shellHeight }}
      >
        <div className="landmarks__figure">
          <div className="landmarks__main landmarks__main--plot relative">
            <div
              ref={plotHostRef}
              className="landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
            />
            <CanvasRulers lm={lm} engine={engine} />
          </div>
        </div>
        {isFullscreen ? null : (
          <button
            type="button"
            className="landmarks__resize"
            aria-label="Resize height"
            title="Resize height"
            onPointerDown={onResizePointerDown}
          />
        )}
      </div>
      <div className="landmarks__chrome">
        <div
          className="landmarks__chrome-tools"
          onMouseDown={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <Topbar
            modes={ALL_MODES}
            mode={lm.mode}
            onMode={(mode) => lm.setMode(mode)}
            fullscreen={isFullscreen}
            onToggleFullscreen={() => {
              toggle();
            }}
            onZoomIn={() => engineRef.current?.zoomBy(1)}
            onZoomOut={() => engineRef.current?.zoomBy(-1)}
            onReset={() => engineRef.current?.resetZoom()}
          />
        </div>

        {inspecting && hasVolume && cube.open ? (
          <InspectToolbar
            settings={cube}
            patch={patchCube}
            labelsAvailable={Boolean(lm.volume?.labels_url)}
            onCommitCut={onCommitCut}
          />
        ) : inspecting && !hasVolume ? (
          <InspectNoVolumePill />
        ) : (
          <SelectionToolbar lm={lm} engine={engine} />
        )}

        {hasVolume && cube.open ? (
          <CubeWindow lm={lm} settings={cube} patch={patchCube} dark={dark} groups={groups} />
        ) : null}

        <div
          className="landmarks__chrome-view"
          onMouseDown={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <ViewCta lm={lm} />
        </div>

        {narrow ? (
          <div
            className="landmarks__chrome-dock landmarks__chrome-dock--left landmarks__chrome-dock--narrow-stack"
            onMouseDown={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                FLOAT_PANEL,
                "flex h-full min-h-0 max-h-full flex-1 flex-col",
              )}
              data-testid="info-explore-stack"
            >
              <RightChromeStack lm={lm} engine={engine} />
            </div>
            <LayersPanel lm={lm} />
          </div>
        ) : (
          <>
            <div
              className="landmarks__chrome-dock landmarks__chrome-dock--left"
              onMouseDown={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <LayersPanel lm={lm} />
            </div>
            <div
              className="landmarks__chrome-dock landmarks__chrome-dock--right"
              onMouseDown={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div
                className={cn(
                  FLOAT_PANEL,
                  "flex h-full min-h-0 max-h-full w-full flex-1 flex-col",
                )}
                data-testid="info-explore-stack"
              >
                <RightChromeStack lm={lm} engine={engine} />
              </div>
            </div>
            <div
              className="landmarks__chrome-minimap"
              onMouseDown={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <MinimapPanel lm={lm} engine={engine} dark={dark} />
            </div>
          </>
        )}
        <LandmarkCanvasMenu lm={lm} engine={engine} rootEl={rootEl} />
      </div>
    </div>
  );
}

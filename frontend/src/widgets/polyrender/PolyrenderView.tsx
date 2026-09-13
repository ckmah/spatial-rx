import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { cn } from "@/lib/utils";

import { PolyrenderScene } from "./engine.jsx";

type AnyModel = {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off?(event: string, callback: () => void): void;
};

function useTrait<T>(model: AnyModel, key: string): T {
  const [val, setVal] = useState(() => model.get(key) as T);
  useEffect(() => {
    const fn = () => setVal(model.get(key) as T);
    model.on(`change:${key}`, fn);
    return () => {
      model.off?.(`change:${key}`, fn);
    };
  }, [model, key]);
  return val;
}

type ViewCommand = { id: number; preset: "top" | "side" | "reset" } | null;

const SHELL_HEIGHT = 800;

export function PolyrenderView({
  model,
  hostEl,
}: {
  model: AnyModel;
  hostEl: HTMLElement;
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const bbox = useTrait<number[]>(model, "bbox");

  const hasBbox = Array.isArray(bbox) && bbox.length === 6;
  const bboxKey = hasBbox ? bbox.join(",") : "";
  const bz0 = hasBbox ? bbox[2]! : 0;
  const bz1 = hasBbox ? bbox[5]! : 1;
  const zSpan = Math.max(bz1 - bz0, 1e-9);
  const zStep = Math.max(zSpan / 400, 1e-6);

  const [opacity, setOpacity] = useState(1);
  const [wireframe, setWireframe] = useState(false);
  const [background, setBackground] = useState("#111418");
  const [showGrid, setShowGrid] = useState(true);
  const [zMin, setZMin] = useState(() => (hasBbox ? bbox[2]! : 0));
  const [zMax, setZMax] = useState(() => (hasBbox ? bbox[5]! : 1));
  const [frameTick, setFrameTick] = useState(0);
  const [viewCommand, setViewCommand] = useState<ViewCommand>(null);

  useEffect(() => {
    hostEl.style.width = "100%";
    hostEl.style.maxWidth = "100%";
    hostEl.style.minWidth = "0";
    hostEl.style.display = "block";
  }, [hostEl]);

  useEffect(() => {
    if (!hasBbox) return;
    setZMin(bbox[2]!);
    setZMax(bbox[5]!);
  }, [hasBbox, bboxKey, bbox]);

  useEffect(() => {
    setViewCommand(null);
  }, [bboxKey]);

  const resetCamera = useCallback(() => setFrameTick((t) => t + 1), []);
  const preset = useCallback((p: "top" | "side") => {
    setViewCommand({ id: Date.now(), preset: p });
  }, []);

  return (
    <div
      className={cn(
        "spatial-rx-widget polyrender relative min-w-0 w-full",
        dark && "dark polyrender--dark",
        !dark && "polyrender--light",
      )}
    >
      <div className="polyrender__body" style={{ height: SHELL_HEIGHT }}>
        <div className="polyrender__figure">
          <div className="polyrender__canvas-host relative min-h-0 flex-1 w-full h-full">
            <PolyrenderScene
              model={model}
              opacity={opacity}
              wireframe={wireframe}
              background={background}
              showGrid={showGrid}
              zMin={zMin}
              zMax={zMax}
              viewCommand={viewCommand}
              frameTick={frameTick}
            />
          </div>
        </div>

        <div
          className="polyrender__chrome"
          onMouseDown={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="polyrender-float polyrender-float--toolbar polyrender-cambar flex flex-wrap items-center gap-2 px-2 py-1.5 text-card-foreground">
            <Button type="button" variant="outline" size="xs" onClick={resetCamera}>
              Reset
            </Button>
            <Button type="button" variant="outline" size="xs" onClick={() => preset("top")}>
              Top
            </Button>
            <Button type="button" variant="outline" size="xs" onClick={() => preset("side")}>
              Side
            </Button>

            <div className="flex items-center gap-1.5">
              <Switch
                id="polyrender-grid"
                size="sm"
                checked={showGrid}
                onCheckedChange={setShowGrid}
              />
              <Label htmlFor="polyrender-grid" className="text-xs font-normal text-muted-foreground">
                Grid
              </Label>
            </div>

            <div className="flex items-center gap-1.5">
              <Switch
                id="polyrender-wireframe"
                size="sm"
                checked={wireframe}
                onCheckedChange={setWireframe}
              />
              <Label
                htmlFor="polyrender-wireframe"
                className="text-xs font-normal text-muted-foreground"
              >
                Wireframe
              </Label>
            </div>

            <div className="flex min-w-[140px] items-center gap-2">
              <span className="shrink-0 text-[0.6875rem] text-muted-foreground">Opacity</span>
              <Slider
                min={0}
                max={1}
                step={0.02}
                value={[opacity]}
                onValueChange={(v) => setOpacity(v[0] ?? opacity)}
                aria-label="Opacity"
                className="w-24"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Label htmlFor="polyrender-bg" className="text-xs font-normal text-muted-foreground">
                BG
              </Label>
              <input
                id="polyrender-bg"
                type="color"
                className="polyrender-color-input"
                value={background.length === 7 ? background : "#111418"}
                onChange={(e) => setBackground(e.target.value)}
                aria-label="Background color"
              />
            </div>

            <span className="text-[0.6875rem] text-muted-foreground">
              Orbit / zoom (limited) / pan
            </span>
          </div>

          {hasBbox ? (
            <div className="polyrender-float polyrender-float--toolbar polyrender-cambar polyrender-cambar--row2 flex flex-wrap items-center gap-3 px-2 py-1.5 text-card-foreground">
              <div className="flex min-w-[200px] items-center gap-2">
                <span className="shrink-0 text-[0.6875rem] text-muted-foreground">Z min</span>
                <Slider
                  min={bz0}
                  max={bz1}
                  step={zStep}
                  value={[Math.min(Math.max(zMin, bz0), bz1)]}
                  onValueChange={(v) => {
                    const x = Math.min(Math.max(v[0] ?? zMin, bz0), bz1);
                    setZMin(x);
                    setZMax((zm) => (x > zm ? x : zm));
                  }}
                  aria-label="Z min"
                  className="w-28"
                />
                <span className="tabular-nums text-[0.6875rem] text-muted-foreground">
                  {zMin.toFixed(4)}
                </span>
              </div>
              <div className="flex min-w-[200px] items-center gap-2">
                <span className="shrink-0 text-[0.6875rem] text-muted-foreground">Z max</span>
                <Slider
                  min={bz0}
                  max={bz1}
                  step={zStep}
                  value={[Math.min(Math.max(zMax, bz0), bz1)]}
                  onValueChange={(v) => {
                    const x = Math.min(Math.max(v[0] ?? zMax, bz0), bz1);
                    setZMax(x);
                    setZMin((zm) => (x < zm ? x : zm));
                  }}
                  aria-label="Z max"
                  className="w-28"
                />
                <span className="tabular-nums text-[0.6875rem] text-muted-foreground">
                  {zMax.toFixed(4)}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() => {
                  setZMin(bz0);
                  setZMax(bz1);
                }}
              >
                Z full
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

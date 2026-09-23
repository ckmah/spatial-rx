import type { LayerSummary, LuxarApp } from "@luxar/viewer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export function LuxarChrome({
  layers,
  onToggle,
  onOpacity,
  onReset,
}: {
  layers: LayerSummary[];
  onToggle: (path: string, visible: boolean) => void;
  onOpacity: (path: string, opacity: number) => void;
  onReset: () => void;
}) {
  return (
    <Card className="luxar-chrome pointer-events-auto absolute top-2 left-2 z-10 w-56 gap-3 py-3 shadow-md">
      <CardHeader className="gap-2 px-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm">Layers</CardTitle>
          <Button type="button" size="xs" variant="outline" onClick={onReset}>
            Reset view
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-3">
        {layers.length === 0 ? (
          <p className="text-xs text-muted-foreground">No layers in this scene.</p>
        ) : (
          <ScrollArea className="max-h-72">
            <ul className="flex flex-col gap-3 pr-2">
              {layers.map((layer) => (
                <li key={layer.path} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-medium" title={layer.name}>
                      {layer.name}
                    </span>
                    <Switch
                      size="sm"
                      checked={layer.visible}
                      aria-label={`Show ${layer.name}`}
                      onCheckedChange={(checked) => onToggle(layer.path, checked)}
                    />
                  </div>
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={[layer.opacity]}
                    aria-label={`${layer.name} opacity`}
                    disabled={!layer.visible}
                    onValueChange={(value) => {
                      const next = value[0];
                      if (next == null) return;
                      onOpacity(layer.path, next);
                    }}
                  />
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

export function readLuxarLayers(app: LuxarApp): LayerSummary[] {
  if (!app.initialized) return [];
  return app.getLayers().filter((layer) => layer.type !== "sound");
}

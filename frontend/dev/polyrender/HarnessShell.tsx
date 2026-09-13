import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PolyrenderView } from "@/widgets/polyrender/PolyrenderView";

import fixture from "./fixture.json";
import { createMockModel } from "./mock-model";

type HarnessTheme = "light" | "dark";

const STORAGE_KEY = "spatial-rx-harness-theme";

function readStoredTheme(): HarnessTheme {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

function applyHarnessTheme(theme: HarnessTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark", "dark-theme", "light-theme");
  if (theme === "dark") {
    root.classList.add("dark", "dark-theme");
  } else {
    root.classList.add("light", "light-theme");
  }
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function HarnessShell() {
  const [theme, setTheme] = useState<HarnessTheme>(() => readStoredTheme());
  const [hostEl, setHostEl] = useState<HTMLElement | null>(null);

  // Serve committed GLB tiles from Vite publicDir (same origin as the harness).
  const model = useMemo(
    () =>
      createMockModel({
        ...(fixture as Record<string, unknown>),
        tile_server_url: window.location.origin,
      }),
    [],
  );

  useEffect(() => {
    applyHarnessTheme(theme);
  }, [theme]);

  return (
    <div className="harness-shell">
      <div className="harness-toolbar">
        <p className="harness-banner">
          polyrender harness — not production · Soft Float + Fiber tiles
        </p>
        <div
          className={cn(
            "spatial-rx-widget inline-flex",
            theme === "dark" && "dark",
          )}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "Switch to light" : "Switch to dark"}
          </Button>
        </div>
      </div>
      <div className="harness-cell-output">
        <div ref={setHostEl} className="w-full min-w-0">
          {hostEl ? <PolyrenderView model={model} hostEl={hostEl} /> : null}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LandmarksView } from "@/widgets/landmarks/LandmarksView";

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

function devShellHeight() {
  return Math.round(Math.min(1400, Math.max(820, window.innerHeight * 0.86)));
}

export function HarnessShell() {
  const [theme, setTheme] = useState<HarnessTheme>(() => readStoredTheme());
  const [hostEl, setHostEl] = useState<HTMLElement | null>(null);
  const modelRef = useRef(createMockModel());

  useEffect(() => {
    applyHarnessTheme(theme);
  }, [theme]);

  return (
    <div className="harness-shell">
      <div className="harness-toolbar">
        <p className="harness-banner">
          dev harness — not production · marimo notebook preview
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
          {hostEl ? (
            <LandmarksView
              model={modelRef.current}
              hostEl={hostEl}
              defaultHeight={devShellHeight()}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

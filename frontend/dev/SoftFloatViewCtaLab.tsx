import { useEffect, useState, type ReactNode } from "react";
import { CircleDot, Grid2x2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type HarnessTheme = "light" | "dark";
type ViewMode = "points" | "raster";
type Verdict = "candidate" | "strong-cta" | "quiet" | "anti-pattern";

const STORAGE_KEY = "spatial-rx-harness-theme";

function readStoredTheme(): HarnessTheme {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(STORAGE_KEY) === "light"
    ? "light"
    : "dark";
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

/** Tissue field with a free-floating chrome dock (not nested in Explore). */
function TissueStage({
  dock,
  label,
}: {
  dock: ReactNode;
  label: string;
}) {
  return (
    <div
      className={cn(
        "relative h-44 overflow-hidden rounded-xl sm:h-48",
        "bg-[radial-gradient(120%_80%_at_20%_10%,#3a2a24_0%,#1a1512_45%,#0e0c0b_100%)]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 28% 42%, rgba(255,80,120,0.2), transparent 40%), radial-gradient(circle at 72% 58%, rgba(80,180,255,0.14), transparent 36%), radial-gradient(circle at 52% 22%, rgba(180,255,80,0.1), transparent 34%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.55) 0 1px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          backgroundPosition: "6px 8px",
          maskImage:
            "radial-gradient(ellipse at 45% 55%, black 0%, transparent 72%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-3 flex justify-center px-3">
        {dock}
      </div>
      <p className="absolute left-3 top-2.5 m-0 text-[10px] font-medium uppercase tracking-wide text-white/55">
        {label}
      </p>
    </div>
  );
}

function SoftFloatDock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "landmarks-float landmarks-float--toolbar pointer-events-auto",
        "inline-flex max-w-full items-center gap-1 px-1.5 py-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

function VariantCard({
  title,
  verdict,
  note,
  children,
}: {
  title: string;
  verdict: Verdict;
  note: string;
  children: ReactNode;
}) {
  const badge =
    verdict === "strong-cta"
      ? "Strong CTA"
      : verdict === "candidate"
        ? "Candidate"
        : verdict === "quiet"
          ? "Quiet"
          : "Anti-pattern";

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="m-0 text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <span
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
            verdict === "strong-cta" && "bg-foreground text-background",
            verdict === "candidate" && "bg-foreground/10 text-foreground/80",
            verdict === "quiet" && "bg-muted text-foreground/70",
            verdict === "anti-pattern" && "bg-destructive/15 text-destructive",
          )}
        >
          {badge}
        </span>
      </div>
      <p className="m-0 text-[12px] leading-snug text-foreground/65">{note}</p>
      {children}
    </section>
  );
}

/** A — Twin solid buttons; active is primary fill (CTA energy). */
function VariantTwinSolidButtons() {
  const [view, setView] = useState<ViewMode>("points");

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock>
          <Button
            type="button"
            size="sm"
            variant={view === "points" ? "default" : "ghost"}
            className="min-w-20"
            onClick={() => setView("points")}
            aria-pressed={view === "points"}
          >
            Points
          </Button>
          <Button
            type="button"
            size="sm"
            variant={view === "raster" ? "default" : "ghost"}
            className="min-w-20"
            onClick={() => setView("raster")}
            aria-pressed={view === "raster"}
          >
            Bins
          </Button>
        </SoftFloatDock>
      }
    />
  );
}

/** B — Joined ButtonGroup; continuous CTA bar. */
function VariantButtonGroupCta() {
  const [view, setView] = useState<ViewMode>("raster");

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock className="gap-0 p-1">
          <ButtonGroup aria-label="View">
            <Button
              type="button"
              size="sm"
              variant={view === "points" ? "default" : "secondary"}
              onClick={() => setView("points")}
              aria-pressed={view === "points"}
            >
              Points
            </Button>
            <Button
              type="button"
              size="sm"
              variant={view === "raster" ? "default" : "secondary"}
              onClick={() => setView("raster")}
              aria-pressed={view === "raster"}
            >
              Bins
            </Button>
          </ButtonGroup>
        </SoftFloatDock>
      }
    />
  );
}

/** C — Icon + label dual buttons (tool-like CTA). */
function VariantIconLabelButtons() {
  const [view, setView] = useState<ViewMode>("points");

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock>
          <Button
            type="button"
            size="sm"
            variant={view === "points" ? "default" : "ghost"}
            onClick={() => setView("points")}
            aria-pressed={view === "points"}
          >
            <CircleDot />
            Points
          </Button>
          <Button
            type="button"
            size="sm"
            variant={view === "raster" ? "default" : "ghost"}
            onClick={() => setView("raster")}
            aria-pressed={view === "raster"}
          >
            <Grid2x2 />
            Bins
          </Button>
        </SoftFloatDock>
      }
    />
  );
}

/** D — Soft Float labeled switch (Bins as the “on” mode). */
function VariantLabeledSwitch() {
  const [view, setView] = useState<ViewMode>("points");
  const binsOn = view === "raster";

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock className="gap-2 px-2.5 py-1.5">
          <span
            className={cn(
              "text-xs font-medium",
              !binsOn ? "text-foreground" : "text-foreground/45",
            )}
          >
            Points
          </span>
          <Switch
            checked={binsOn}
            onCheckedChange={(on) => setView(on ? "raster" : "points")}
            aria-label="Show bins instead of points"
          />
          <span
            className={cn(
              "text-xs font-medium",
              binsOn ? "text-foreground" : "text-foreground/45",
            )}
          >
            Bins
          </span>
        </SoftFloatDock>
      }
    />
  );
}

/** E — Switch + mode chip. */
function VariantSwitchWithChip() {
  const [view, setView] = useState<ViewMode>("raster");
  const binsOn = view === "raster";

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock className="gap-2 px-2 py-1.5">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="pointer-events-none min-w-16 shadow-none"
            tabIndex={-1}
          >
            {binsOn ? "Bins" : "Points"}
          </Button>
          <Switch
            checked={binsOn}
            onCheckedChange={(on) => setView(on ? "raster" : "points")}
            className="data-checked:bg-foreground"
            aria-label="Toggle bins view"
          />
        </SoftFloatDock>
      }
    />
  );
}

/** F — Text-in-thumb flip (custom; max mode legibility). */
function VariantTextThumbFlip() {
  const [view, setView] = useState<ViewMode>("points");
  const binsOn = view === "raster";

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock className="p-1">
          <button
            type="button"
            role="switch"
            aria-checked={binsOn}
            aria-label={binsOn ? "Bins view" : "Points view"}
            onClick={() => setView(binsOn ? "points" : "raster")}
            className={cn(
              "relative h-9 w-[9.5rem] rounded-full outline-none",
              "bg-foreground/[0.08] focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "dark:bg-foreground/[0.14]",
            )}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-center text-[11px] font-medium text-foreground/45"
            >
              Points
            </span>
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-center text-[11px] font-medium text-foreground/45"
            >
              Bins
            </span>
            <span
              className={cn(
                "absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full",
                "bg-foreground text-background shadow-sm transition-transform",
                "flex items-center justify-center text-[11px] font-semibold",
                binsOn ? "translate-x-[calc(100%+2px)]" : "translate-x-0.5",
              )}
            >
              {binsOn ? "Bins" : "Points"}
            </span>
          </button>
        </SoftFloatDock>
      }
    />
  );
}

/** G — Single primary CTA that cycles. */
function VariantSingleCtaCycle() {
  const [view, setView] = useState<ViewMode>("points");

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock>
          <Button
            type="button"
            size="sm"
            variant="default"
            className="min-w-28"
            onClick={() => setView(view === "points" ? "raster" : "points")}
            aria-label={`View is ${view === "points" ? "Points" : "Bins"}; click to switch`}
          >
            {view === "points" ? "Points → Bins" : "Bins → Points"}
          </Button>
        </SoftFloatDock>
      }
    />
  );
}

/** H — Outline buttons (anti Soft Float CTA). */
function VariantOutlineAntiPattern() {
  const [view, setView] = useState<ViewMode>("points");

  return (
    <TissueStage
      label="Floating dock"
      dock={
        <SoftFloatDock>
          <Button
            type="button"
            size="sm"
            variant="outline"
            aria-pressed={view === "points"}
            onClick={() => setView("points")}
          >
            Points
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            aria-pressed={view === "raster"}
            onClick={() => setView("raster")}
          >
            Bins
          </Button>
        </SoftFloatDock>
      }
    />
  );
}

export function SoftFloatViewCtaLab() {
  const [theme, setTheme] = useState<HarnessTheme>(() => readStoredTheme());

  useEffect(() => {
    applyHarnessTheme(theme);
  }, [theme]);

  return (
    <div
      className={cn(
        "spatial-rx-widget box-border min-h-screen px-4 py-3 sm:px-6",
        theme === "dark" && "dark",
      )}
    >
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="m-0 text-[10px] font-medium uppercase tracking-[0.08em] text-amber-700 dark:text-amber-300">
            Soft Float · View CTA lab · not production
          </p>
          <h1 className="m-0 text-lg font-semibold tracking-tight text-foreground">
            Floating Points / Bins CTA
          </h1>
          <p className="m-0 max-w-2xl text-[13px] leading-snug text-foreground/65">
            Promote View out of Explore into its own Soft Float dock. Button and
            switch variants only — no tabs. Pick a candidate before baking into
            the widget.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/tabs.html">Tabs lab</a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/">Landmarks harness</a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
          >
            {theme === "dark" ? "Switch to light" : "Switch to dark"}
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <VariantCard
          title="A · Twin solid buttons"
          verdict="strong-cta"
          note="Active = primary fill, idle = ghost. Reads as a clear mode CTA in its own float."
        >
          <VariantTwinSolidButtons />
        </VariantCard>

        <VariantCard
          title="B · Joined button group"
          verdict="candidate"
          note="Continuous bar — slightly more ‘control’, slightly less ‘two actions’."
        >
          <VariantButtonGroupCta />
        </VariantCard>

        <VariantCard
          title="C · Icon + label buttons"
          verdict="candidate"
          note="Tool-like CTA. Icons help scan; keep Soft Float primary/ghost pairing."
        >
          <VariantIconLabelButtons />
        </VariantCard>

        <VariantCard
          title="D · Labeled Soft Float switch"
          verdict="candidate"
          note="Bins as the switched-on mode. Compact; mode names stay visible on both sides."
        >
          <VariantLabeledSwitch />
        </VariantCard>

        <VariantCard
          title="E · Switch + mode chip"
          verdict="quiet"
          note="Chip restates mode; switch does the work. Quieter CTA, more chrome."
        >
          <VariantSwitchWithChip />
        </VariantCard>

        <VariantCard
          title="F · Text-in-thumb flip"
          verdict="strong-cta"
          note="Custom flip with the active label on the thumb. High legibility; custom a11y."
        >
          <VariantTextThumbFlip />
        </VariantCard>

        <VariantCard
          title="G · Single cycling CTA"
          verdict="quiet"
          note="One primary button that flips mode. Compact but weaker discoverability."
        >
          <VariantSingleCtaCycle />
        </VariantCard>

        <VariantCard
          title="H · Outline pair"
          verdict="anti-pattern"
          note="Hairline outline fights Soft Float shadow-only docks and dilutes CTA weight."
        >
          <VariantOutlineAntiPattern />
        </VariantCard>
      </div>
    </div>
  );
}

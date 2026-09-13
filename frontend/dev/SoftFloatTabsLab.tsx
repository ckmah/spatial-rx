import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  FIELD_CAPTION,
  FLOAT_PANEL,
  PANEL_INSET,
  SEGMENT_ITEM,
  SEGMENT_TRAY,
} from "@/widgets/landmarks/chrome/sections";

type HarnessTheme = "light" | "dark";
type Verdict = "incumbent" | "candidate" | "anti-pattern" | "stock";

const STORAGE_KEY = "spatial-rx-harness-theme";

const VIEW_OPTIONS = [
  { value: "points", label: "Points" },
  { value: "raster", label: "Bins" },
] as const;

const COLOR_OPTIONS = [
  { value: "categories", label: "Category" },
  { value: "genes", label: "Genes" },
  { value: "embedding", label: "Embedding" },
] as const;

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

function FloatStage({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-[radial-gradient(120%_80%_at_20%_10%,#3a2a24_0%,#1a1512_45%,#0e0c0b_100%)]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(255,80,120,0.18), transparent 42%), radial-gradient(circle at 70% 55%, rgba(80,180,255,0.12), transparent 38%), radial-gradient(circle at 55% 25%, rgba(180,255,80,0.08), transparent 35%)",
        }}
      />
      <div className="relative p-4 sm:p-5">
        <Card className={cn(FLOAT_PANEL, "w-full max-w-sm")}>
          <CardContent className={cn("flex flex-col gap-3", PANEL_INSET)}>
            {children}
          </CardContent>
        </Card>
      </div>
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
    verdict === "incumbent"
      ? "Incumbent"
      : verdict === "candidate"
        ? "Candidate"
        : verdict === "anti-pattern"
          ? "Anti-pattern"
          : "Stock shadcn";

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="m-0 text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <span
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
            verdict === "candidate" && "bg-foreground text-background",
            verdict === "incumbent" && "bg-foreground/10 text-foreground/80",
            verdict === "anti-pattern" && "bg-destructive/15 text-destructive",
            verdict === "stock" && "bg-muted text-foreground/70",
          )}
        >
          {badge}
        </span>
      </div>
      <p className="m-0 text-[12px] leading-snug text-foreground/65">{note}</p>
      <FloatStage>{children}</FloatStage>
    </section>
  );
}

function DemoCaption({ children }: { children: ReactNode }) {
  return <p className={FIELD_CAPTION}>{children}</p>;
}

function DemoBody({ label }: { label: string }) {
  return (
    <p className="m-0 text-xs leading-relaxed text-foreground/70">
      Active: <span className="font-medium text-foreground">{label}</span>. This
      lab is exploratory — nothing here is wired into the widget yet.
    </p>
  );
}

function VariantIncumbentSegment() {
  const [view, setView] = useState("points");
  const [colorBy, setColorBy] = useState("categories");

  return (
    <>
      <div className="flex flex-col gap-1">
        <DemoCaption>View</DemoCaption>
        <ToggleGroup
          type="single"
          variant="default"
          size="sm"
          spacing={0}
          value={view}
          onValueChange={(v) => v && setView(v)}
          className={SEGMENT_TRAY}
          aria-label="View"
        >
          {VIEW_OPTIONS.map((opt) => (
            <ToggleGroupItem
              key={opt.value}
              value={opt.value}
              className={SEGMENT_ITEM}
            >
              {opt.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-1">
        <DemoCaption>Color by</DemoCaption>
        <ToggleGroup
          type="single"
          variant="default"
          size="sm"
          spacing={0}
          value={colorBy}
          onValueChange={(v) => v && setColorBy(v)}
          className={SEGMENT_TRAY}
          aria-label="Color by"
        >
          {COLOR_OPTIONS.map((opt) => (
            <ToggleGroupItem
              key={opt.value}
              value={opt.value}
              className={SEGMENT_ITEM}
            >
              {opt.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <DemoBody
        label={`${VIEW_OPTIONS.find((o) => o.value === view)?.label} · ${COLOR_OPTIONS.find((o) => o.value === colorBy)?.label}`}
      />
    </>
  );
}

function VariantSoftPillTabs() {
  const [view, setView] = useState("points");

  return (
    <Tabs value={view} onValueChange={setView} className="gap-2">
      <DemoCaption>View</DemoCaption>
      <TabsList
        className={cn(
          "h-8 w-full rounded-md bg-foreground/[0.07] p-0.5 text-foreground/70",
          "dark:bg-foreground/[0.12]",
        )}
      >
        {VIEW_OPTIONS.map((opt) => (
          <TabsTrigger
            key={opt.value}
            value={opt.value}
            className={cn(
              "h-full flex-1 rounded-[calc(var(--radius)-2px)] text-xs",
              "text-foreground/70 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
              "dark:data-[state=active]:bg-foreground dark:data-[state=active]:text-background",
              "dark:data-[state=active]:border-transparent",
            )}
          >
            {opt.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {VIEW_OPTIONS.map((opt) => (
        <TabsContent key={opt.value} value={opt.value} className="mt-0">
          <DemoBody label={opt.label} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function VariantSoftLineTabs() {
  const [colorBy, setColorBy] = useState("categories");

  return (
    <Tabs value={colorBy} onValueChange={setColorBy} className="gap-2">
      <DemoCaption>Color by</DemoCaption>
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-0 rounded-none bg-transparent p-0"
      >
        {COLOR_OPTIONS.map((opt) => (
          <TabsTrigger
            key={opt.value}
            value={opt.value}
            className={cn(
              "h-7 flex-1 rounded-none px-1.5 text-xs font-medium",
              "text-foreground/60 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
              "after:bg-foreground after:opacity-0 data-[state=active]:after:opacity-100",
              "dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-transparent",
            )}
          >
            {opt.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {COLOR_OPTIONS.map((opt) => (
        <TabsContent key={opt.value} value={opt.value} className="mt-0">
          <DemoBody label={opt.label} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function VariantQuietTextTabs() {
  const [view, setView] = useState("points");

  return (
    <Tabs value={view} onValueChange={setView} className="gap-2">
      <DemoCaption>View</DemoCaption>
      <TabsList className="h-auto w-full justify-start gap-3 rounded-none bg-transparent p-0">
        {VIEW_OPTIONS.map((opt) => (
          <TabsTrigger
            key={opt.value}
            value={opt.value}
            className={cn(
              "h-auto flex-none rounded-none px-0 py-0.5 text-xs shadow-none",
              "text-foreground/45 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none",
              "after:hidden dark:data-[state=active]:bg-transparent",
            )}
          >
            {opt.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {VIEW_OPTIONS.map((opt) => (
        <TabsContent key={opt.value} value={opt.value} className="mt-0">
          <DemoBody label={opt.label} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function VariantFrostedInsetTabs() {
  const [colorBy, setColorBy] = useState("genes");

  return (
    <Tabs value={colorBy} onValueChange={setColorBy} className="gap-2">
      <DemoCaption>Color by</DemoCaption>
      <TabsList
        className={cn(
          "h-8 w-full rounded-[calc(var(--radius)+0.1rem)] p-0.5",
          "bg-card/45 text-foreground/70 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)]",
          "backdrop-blur-md",
        )}
      >
        {COLOR_OPTIONS.map((opt) => (
          <TabsTrigger
            key={opt.value}
            value={opt.value}
            className={cn(
              "h-full flex-1 rounded-md text-xs",
              "data-[state=active]:bg-background/90 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
              "dark:data-[state=active]:bg-foreground/90 dark:data-[state=active]:text-background dark:data-[state=active]:border-transparent",
            )}
          >
            {opt.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {COLOR_OPTIONS.map((opt) => (
        <TabsContent key={opt.value} value={opt.value} className="mt-0">
          <DemoBody label={opt.label} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function VariantStockShadcn() {
  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue="points" className="gap-2">
        <DemoCaption>Default variant</DemoCaption>
        <TabsList className="w-full">
          <TabsTrigger value="points" className="flex-1 text-xs">
            Points
          </TabsTrigger>
          <TabsTrigger value="raster" className="flex-1 text-xs">
            Bins
          </TabsTrigger>
        </TabsList>
        <TabsContent value="points" className="mt-0">
          <DemoBody label="Points (stock)" />
        </TabsContent>
        <TabsContent value="raster" className="mt-0">
          <DemoBody label="Bins (stock)" />
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="categories" className="gap-2">
        <DemoCaption>Line variant</DemoCaption>
        <TabsList variant="line" className="w-full">
          <TabsTrigger value="categories" className="flex-1 text-xs">
            Category
          </TabsTrigger>
          <TabsTrigger value="genes" className="flex-1 text-xs">
            Genes
          </TabsTrigger>
          <TabsTrigger value="embedding" className="flex-1 text-xs">
            Embedding
          </TabsTrigger>
        </TabsList>
        <TabsContent value="categories" className="mt-0">
          <DemoBody label="Category (stock line)" />
        </TabsContent>
        <TabsContent value="genes" className="mt-0">
          <DemoBody label="Genes (stock line)" />
        </TabsContent>
        <TabsContent value="embedding" className="mt-0">
          <DemoBody label="Embedding (stock line)" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function VariantOutlineAntiPattern() {
  const [view, setView] = useState("points");

  return (
    <>
      <DemoCaption>View</DemoCaption>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        spacing={0}
        value={view}
        onValueChange={(v) => v && setView(v)}
        className="w-full"
        aria-label="View outline"
      >
        {VIEW_OPTIONS.map((opt) => (
          <ToggleGroupItem
            key={opt.value}
            value={opt.value}
            className="flex-1 text-xs"
          >
            {opt.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <DemoBody
        label={VIEW_OPTIONS.find((o) => o.value === view)?.label ?? view}
      />
    </>
  );
}

export function SoftFloatTabsLab() {
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
            Soft Float · tabs lab · not production
          </p>
          <h1 className="m-0 text-lg font-semibold tracking-tight text-foreground">
            Tab / segment variants
          </h1>
          <p className="m-0 max-w-2xl text-[13px] leading-snug text-foreground/65">
            Explore how selection chrome sits on Soft Float glass over tissue.
            Pick a candidate here before baking into Explore / View controls.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/">Landmarks harness</a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/view-cta.html">View CTA lab</a>
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
          title="A · Incumbent Soft Float segments"
          verdict="incumbent"
          note="Current Explore tokens (SEGMENT_TRAY / SEGMENT_ITEM) on ToggleGroup. Solid on-state; no hairline border."
        >
          <VariantIncumbentSegment />
        </VariantCard>

        <VariantCard
          title="B · Soft Float pill Tabs"
          verdict="candidate"
          note="shadcn Tabs with Soft Float tray + solid chip. Same language as A, but real Tabs semantics/panels."
        >
          <VariantSoftPillTabs />
        </VariantCard>

        <VariantCard
          title="C · Soft Float line Tabs"
          verdict="candidate"
          note="No tray — underline + foreground weight. Quieter on dense panels; weaker hit target."
        >
          <VariantSoftLineTabs />
        </VariantCard>

        <VariantCard
          title="D · Quiet text Tabs"
          verdict="candidate"
          note="Typography-only selection. Maximal Soft Float quiet; needs careful spacing/focus."
        >
          <VariantQuietTextTabs />
        </VariantCard>

        <VariantCard
          title="E · Frosted inset Tabs"
          verdict="candidate"
          note="Nested glass tray inside the float. Richer depth; risk of double-frost noise."
        >
          <VariantFrostedInsetTabs />
        </VariantCard>

        <VariantCard
          title="F · Stock shadcn Tabs"
          verdict="stock"
          note="Default muted tray + line variant as shipped. Reads generic vs Soft Float neutrals."
        >
          <VariantStockShadcn />
        </VariantCard>

        <VariantCard
          title="G · Outline segment"
          verdict="anti-pattern"
          note="Hairline outline + shadow fights Soft Float shadow-only elevation. Shown to reject."
        >
          <VariantOutlineAntiPattern />
        </VariantCard>
      </div>
    </div>
  );
}

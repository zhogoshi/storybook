"use client";

import { useState } from "react";
import { Button, Card, CardDescription, CardHeader, CardTitle, Counter, Tabs, TabsContent, TabsList, TabsTrigger } from "@hogoshi/ui";

const SWATCHES = ["bg", "bg-elevated", "bg-subtle", "bg-muted", "fg", "fg-muted", "accent", "success", "warning", "danger"] as const;
const CHARTS = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-6"] as const;
const SPACES = [
  { name: "--row-h", value: "2.5rem / 2.125rem compact" },
  { name: "--gap", value: "0.75rem / 0.5rem compact" },
  { name: "page px", value: "px-4 lg:px-8" },
  { name: "page py", value: "py-6 lg:py-8" },
  { name: "stack", value: "gap-1.5 · gap-2 · gap-3" },
];
const RADII = [
  { name: "--radius-sm", box: "rounded-[var(--radius-sm)]" },
  { name: "--radius-md", box: "rounded-[var(--radius-md)]" },
  { name: "--radius-lg", box: "rounded-[var(--radius-lg)]" },
];
const MOTION = [
  { name: "item-in", className: "animate-[item-in_calc(var(--motion-duration)*2)_var(--motion-ease)]" },
  { name: "photo-next", className: "animate-[photo-next_calc(var(--motion-duration)*2)_var(--motion-ease)]" },
  { name: "otp-in", className: "animate-[otp-in_calc(var(--motion-duration)*2)_var(--motion-ease)]" },
  { name: "fade-in", className: "animate-[fade-in_calc(var(--motion-duration)*2)_var(--motion-ease)]" },
];

function Swatch({ name }: { name: string }) {
  return (
    <div className="border-border overflow-hidden rounded-[var(--radius-md)] border">
      <div className="h-16" style={{ background: `var(--${name})` }} />
      <p className="text-fg-muted px-3 py-2 font-mono text-xs">--{name}</p>
    </div>
  );
}

function ColorSection() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SWATCHES.map((name) => (
          <Swatch key={name} name={name} />
        ))}
      </div>
      <div>
        <h2 className="mb-3 text-sm font-semibold">Charts</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CHARTS.map((name) => (
            <Swatch key={name} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpaceSection() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        {SPACES.map((item) => (
          <div key={item.name} className="border-border bg-bg-elevated flex items-center justify-between rounded-[var(--radius-md)] border px-3 py-2">
            <span className="font-mono text-xs">{item.name}</span>
            <span className="text-fg-muted text-xs">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {RADII.map((item) => (
          <div key={item.name} className="grid justify-items-center gap-2">
            <div className={`bg-accent-muted border-border size-16 border ${item.box}`} />
            <p className="text-fg-muted font-mono text-xs">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="bg-bg-elevated border-border rounded-[var(--radius-lg)] border p-4">
        <div className="bg-accent-muted h-[var(--row-h)] rounded-[var(--radius-md)]" />
        <p className="text-fg-muted mt-2 text-xs">Row height</p>
      </div>
    </div>
  );
}

function MotionSection() {
  const [play, setPlay] = useState(0);
  const [count, setCount] = useState(128);
  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-2">
        <Button onClick={() => setPlay((value) => value + 1)}>Play</Button>
        <Button
          variant="ghost"
          onClick={() => setCount((value) => value + 17)}
        >
          Count
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MOTION.map((item) => (
          <div key={`${item.name}-${play}`} className="border-border bg-bg-elevated grid h-28 place-items-center rounded-[var(--radius-lg)] border">
            <span className={`bg-accent size-10 rounded-[var(--radius-md)] ${item.className}`} />
            <p className="text-fg-muted font-mono text-[11px]">{item.name}</p>
          </div>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Duration</CardTitle>
          <CardDescription>full 180ms · reduced 90ms · off 0ms</CardDescription>
        </CardHeader>
        <Counter value={count} />
      </Card>
    </div>
  );
}

function TypeSection() {
  return (
    <div className="grid gap-4">
      <p className="text-3xl font-semibold tracking-tight">Heading 3xl</p>
      <p className="text-lg font-semibold">Heading lg</p>
      <p>Body inherits --text-base.</p>
      <p className="text-fg-muted text-sm">Secondary sm</p>
      <p className="text-fg-subtle text-xs">Hint xs</p>
      <p className="font-mono text-sm">Mono numbers 1 2 3</p>
    </div>
  );
}

export function StorybookTokensPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-fg-subtle text-sm">Foundation</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Tokens</h1>
        <p className="text-fg-muted mt-2 max-w-xl text-sm">
          Color, space, motion, and type. Play the motion samples. Values come from @hogoshi/tokens.
        </p>
      </header>
      <Tabs defaultValue="color">
        <TabsList>
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="space">Space</TabsTrigger>
          <TabsTrigger value="motion">Motion</TabsTrigger>
          <TabsTrigger value="type">Type</TabsTrigger>
        </TabsList>
        <TabsContent value="color">
          <ColorSection />
        </TabsContent>
        <TabsContent value="space">
          <SpaceSection />
        </TabsContent>
        <TabsContent value="motion">
          <MotionSection />
        </TabsContent>
        <TabsContent value="type">
          <TypeSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

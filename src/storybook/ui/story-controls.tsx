"use client";

import { useEffect, useState } from "react";
import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Slider, Switch } from "@hogoshi/ui";
import type { StoryDefinition, StoryProps } from "../model/types";

function NumberControl({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  useEffect(() => {
    if (local === value) return;
    const timer = window.setTimeout(() => onChange(local), 120);
    return () => window.clearTimeout(timer);
  }, [local, onChange, value]);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-fg-muted text-sm">{local}</span>
      <Slider value={local} min={min} max={max} step={step} onValueChange={setLocal} />
    </div>
  );
}

export function StoryControls({
  story,
  props,
  onChange,
}: {
  story: StoryDefinition;
  props: StoryProps;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Object.entries(story.controls).map(([key, def]) => (
        <div key={key} className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Label>{def.label}</Label>
          {def.type === "boolean" ? (
            <label className="border-border bg-bg-elevated hover:border-border-strong flex w-full cursor-pointer items-center justify-between rounded-[var(--radius-md)] border px-3 text-sm [height:var(--row-h)]">
              <span>State</span>
              <Switch checked={Boolean(props[key])} onCheckedChange={(checked) => onChange(key, Boolean(checked))} />
            </label>
          ) : null}
          {def.type === "text" ? (
            <Input value={String(props[key] ?? "")} onChange={(event) => onChange(key, event.target.value)} />
          ) : null}
          {def.type === "number" ? (
            <NumberControl
              value={Number(props[key] ?? 0)}
              min={def.min}
              max={def.max}
              step={def.step}
              onChange={(next) => onChange(key, next)}
            />
          ) : null}
          {def.type === "select" ? (
            <Select value={String(props[key] ?? "")} onValueChange={(value) => onChange(key, value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {def.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>
      ))}
    </div>
  );
}

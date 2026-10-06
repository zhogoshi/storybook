"use client";

import { AreaChart, BarChart, DonutChart, LineChart, Sparkline, type ChartConfig } from "@hogoshi/ui";
import { defineStory } from "../define-story";
import { jsx } from "../story-code";

const weeks = [
  { week: "W1", visits: 420, sales: 180, refunds: 24 },
  { week: "W2", visits: 510, sales: 220, refunds: 18 },
  { week: "W3", visits: 390, sales: 160, refunds: 32 },
  { week: "W4", visits: 640, sales: 280, refunds: 16 },
  { week: "W5", visits: 580, sales: 250, refunds: 21 },
  { week: "W6", visits: 720, sales: 310, refunds: 14 },
];

const series: ChartConfig = {
  visits: { label: "Visits" },
  sales: { label: "Sales" },
  refunds: { label: "Refunds" },
};

const share = [
  { name: "pro", value: 48 },
  { name: "team", value: 27 },
  { name: "free", value: 25 },
];

const shareConfig: ChartConfig = {
  pro: { label: "Pro" },
  team: { label: "Team" },
  free: { label: "Free" },
};

const kinds = ["area", "bar", "line", "donut", "spark"] as const;

export const chartStory = defineStory({
  slug: "chart",
  title: "Chart",
  category: "Display",
  description: "Recharts wrappers on kit tokens. Area, bar, line, donut, and spark.",
  controls: {
    kind: {
      type: "select",
      label: "kind",
      default: "area",
      options: kinds.map((value) => ({ value, label: value })),
    },
    stacked: { type: "boolean", label: "stacked", default: false },
  },
  render: (props) => {
    const kind = kinds.includes(props.kind as (typeof kinds)[number]) ? (props.kind as (typeof kinds)[number]) : "area";
    const stacked = Boolean(props.stacked);
    if (kind === "bar") return <BarChart data={weeks} index="week" config={series} stacked={stacked} legend />;
    if (kind === "line") return <LineChart data={weeks} index="week" config={series} legend />;
    if (kind === "donut") return <DonutChart data={share} nameKey="name" valueKey="value" config={shareConfig} label="Plans" />;
    if (kind === "spark") return <Sparkline data={weeks} dataKey="sales" className="w-64" />;
    return <AreaChart data={weeks} index="week" config={series} stacked={stacked} legend />;
  },
  code: (props) => jsx(props.kind === "donut" ? "DonutChart" : "AreaChart", ["data={rows}", 'index="week"', "config={config}"]),
});

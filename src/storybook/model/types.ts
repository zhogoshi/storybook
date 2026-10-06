import type { ReactNode } from "react";

export type ControlDef =
  | { type: "boolean"; label: string; default?: boolean }
  | { type: "select"; label: string; options: { value: string; label: string }[]; default?: string }
  | { type: "text"; label: string; default?: string }
  | { type: "number"; label: string; min?: number; max?: number; step?: number; default?: number };

export type StoryTab = "preview" | "code";
export type StoryDevice = "phone" | "tablet" | "desktop";
export type IconStyle = "ios" | "basic";
export type StoryProps = Record<string, unknown>;

export type StoryDefinition = {
  slug: string;
  title: string;
  category: string;
  description?: string;
  component?: string;
  childrenKey?: string;
  fill?: boolean;
  controls: Record<string, ControlDef>;
  render: (props: StoryProps) => ReactNode;
  code: (props: StoryProps) => string;
};

export type StoryDefinitionInput<T extends StoryProps> = Omit<StoryDefinition, "render" | "code"> & {
  render: (props: T) => ReactNode;
  code?: (props: T) => string;
};

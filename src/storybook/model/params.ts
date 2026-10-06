import type { ControlDef, IconStyle, StoryDefinition, StoryDevice, StoryProps, StoryTab } from "./types";

export const STORY_TAB_PARAM = "tab";
export const STORY_DEVICE_PARAM = "device";
export const STORY_ICONS_PARAM = "icons";

export const DEVICE_PRESETS: Record<StoryDevice, { width: number; height: number; label: string }> = {
  phone: { width: 390, height: 844, label: "Phone" },
  tablet: { width: 834, height: 1112, label: "Tablet" },
  desktop: { width: 1280, height: 800, label: "Desktop" },
};

function parseControlValue(def: ControlDef, raw: string | null): unknown {
  if (raw === null) return def.default;
  if (def.type === "boolean") return raw === "true";
  if (def.type === "number") {
    const parsed = Number(raw);
    return Number.isNaN(parsed) ? (def.default ?? 0) : parsed;
  }
  return raw;
}

export function parseStoryTab(searchParams: URLSearchParams): StoryTab {
  return searchParams.get(STORY_TAB_PARAM) === "code" ? "code" : "preview";
}

export function parseStoryDevice(searchParams: URLSearchParams): StoryDevice {
  const device = searchParams.get(STORY_DEVICE_PARAM);
  if (device === "phone" || device === "tablet" || device === "desktop") return device;
  return "desktop";
}

export function parseIconStyle(searchParams: URLSearchParams): IconStyle {
  return searchParams.get(STORY_ICONS_PARAM) === "basic" ? "basic" : "ios";
}

export function parseStoryProps(story: StoryDefinition, searchParams: URLSearchParams): StoryProps {
  const props: StoryProps = {};
  for (const [key, def] of Object.entries(story.controls)) {
    props[key] = parseControlValue(def, searchParams.get(key));
  }
  return props;
}

export function serializeControlValue(value: unknown): string {
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value ?? "");
}

export function isDefaultControlValue(def: ControlDef, value: unknown) {
  return value === def.default;
}

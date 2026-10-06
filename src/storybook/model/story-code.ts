import type { ControlDef, StoryProps } from "./types";

function isDefault(def: ControlDef, value: unknown) {
  if (def.type === "boolean") return Boolean(value) === Boolean(def.default);
  if (def.type === "number") return Number(value) === Number(def.default ?? 0);
  return String(value ?? "") === String(def.default ?? "");
}

function attr(key: string, def: ControlDef, value: unknown) {
  if (def.type === "boolean") return value ? key : `${key}={false}`;
  if (def.type === "number") return `${key}={${Number(value)}}`;
  const text = String(value ?? "").replaceAll('"', '\\"');
  return `${key}="${text}"`;
}

export function jsx(tag: string, attrs: string[] = [], children?: string) {
  const body = children
    ?.split("\n")
    .filter((line) => line.length > 0)
    .map((line) => `  ${line}`);
  if (!attrs.length) {
    if (!body?.length) return `<${tag} />`;
    return [`<${tag}>`, ...body, `</${tag}>`].join("\n");
  }
  const props = attrs.map((line) => `  ${line}`);
  if (!body?.length) return [`<${tag}`, ...props, `/>`].join("\n");
  return [`<${tag}`, ...props, `>`, ...body, `</${tag}>`].join("\n");
}

export function storyCode(
  component: string,
  controls: Record<string, ControlDef>,
  props: StoryProps,
  childrenKey?: string,
) {
  const attrs = Object.entries(controls)
    .filter(([key]) => key !== childrenKey && !isDefault(controls[key], props[key]))
    .map(([key, def]) => attr(key, def, props[key]));
  const child = childrenKey ? String(props[childrenKey] ?? "") : "";
  return jsx(component, attrs, childrenKey ? child : undefined);
}

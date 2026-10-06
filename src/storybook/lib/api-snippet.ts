import type { StoryDefinition } from "../model/types";

function formatControlLine(key: string, def: StoryDefinition["controls"][string]) {
  if (def.type === "select") {
    const values = def.options.map((option) => `"${option.value}"`).join(" | ");
    return `  ${key}={${values}}`;
  }
  if (def.type === "boolean") return `  ${key}?`;
  if (def.type === "number") return `  ${key}=number`;
  return `  ${key}=string`;
}

export function buildStoryApiSnippet(story: StoryDefinition) {
  const entries = Object.entries(story.controls);
  if (!story.component || entries.length === 0) return null;
  const lines = entries
    .filter(([key]) => key !== story.childrenKey)
    .map(([key, def]) => formatControlLine(key, def));
  const hasChildren = Boolean(story.childrenKey) || "children" in story.controls;
  if (hasChildren) {
    return [`<${story.component}`, ...lines, ">", "  children", `</${story.component}>`].join("\n");
  }
  return [`<${story.component}`, ...lines, "/>"].join("\n");
}

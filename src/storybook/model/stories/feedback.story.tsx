"use client";

import { Button, CodeBlock, PageLoader, ScrollArea, Spinner, ThemeToggle, toast } from "@hogoshi/ui";
import { Notification01Icon } from "@hugeicons-pro/core-solid-rounded";
import { Copy01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { Icon } from "@hogoshi/ui";
import { defineStory } from "../define-story";
import { jsx } from "../story-code";

export const iconStory = defineStory({
  slug: "icon",
  title: "Icon",
  category: "Actions",
  description: "Hugeicons Pro. Fill is the default. Stroke is for outline actions such as copy.",
  controls: {
    variant: {
      type: "select",
      label: "variant",
      default: "fill",
      options: [
        { value: "fill", label: "fill" },
        { value: "stroke", label: "stroke" },
      ],
    },
  },
  component: "Icon",
  render: (props) =>
    props.variant === "stroke" ? <Icon icon={Copy01Icon} variant="stroke" /> : <Icon icon={Notification01Icon} />,
});

export const scrollStory = defineStory({
  slug: "scroll-area",
  title: "Scroll area",
  category: "Layout",
  description: "Nested scrollport. The thumb appears only while scrolling.",
  controls: {},
  render: () => (
    <ScrollArea className="border-border h-40 w-64 rounded-[var(--radius-md)] border">
      <div className="flex flex-col gap-2 p-3">
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index} className="text-fg-muted text-sm">
            Row {index + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
  code: () => jsx("ScrollArea", [], "Row"),
});

export const toastStory = defineStory({
  slug: "toast",
  title: "Toast",
  category: "Feedback",
  description: "Transient notice, bottom-right.",
  controls: { message: { type: "text", label: "message", default: "Saved" } },
  render: (props) => <Button onClick={() => toast(String(props.message))}>Show toast</Button>,
  code: (props) => `toast("${String(props.message).replaceAll('"', '\\"')}")`,
});

export const spinnerStory = defineStory({
  slug: "spinner",
  title: "Spinner",
  category: "Feedback",
  component: "Spinner",
  description: "Stroke loader.",
  controls: {
    size: {
      type: "select",
      label: "size",
      default: "md",
      options: ["sm", "md", "lg"].map((value) => ({ value, label: value })),
    },
  },
  render: (props) => <Spinner size={props.size === "sm" || props.size === "lg" ? props.size : "md"} />,
});

export const pageLoaderStory = defineStory({
  slug: "page-loader",
  title: "Page loader",
  category: "Feedback",
  description: "Centered outline ring. Scale and opacity pulse for a route wait.",
  controls: {},
  render: () => <PageLoader className="h-40" />,
  code: () => jsx("PageLoader"),
});

export const themeStory = defineStory({
  slug: "theme",
  title: "Theme",
  category: "Actions",
  component: "ThemeToggle",
  description: "Switches light and dark. The circle grows from the click.",
  controls: { label: { type: "text", label: "label", default: "Switch theme" } },
  render: (props) => <ThemeToggle label={String(props.label) || undefined} />,
});

export const codeStory = defineStory({
  slug: "code",
  title: "Code",
  category: "Feedback",
  description: "Highlighted source with a copy button. The check turns green.",
  controls: {
    variant: {
      type: "select",
      label: "variant",
      default: "full",
      options: ["full", "snippet"].map((value) => ({ value, label: value })),
    },
    language: {
      type: "select",
      label: "language",
      default: "auto",
      options: ["auto", "ts", "json", "bash"].map((value) => ({ value, label: value })),
    },
    showLanguage: { type: "boolean", label: "language label", default: true },
    scroll: { type: "boolean", label: "scroll", default: false },
    source: { type: "text", label: "code", default: "export const n = 1" },
  },
  render: (props) => (
    <CodeBlock
      code={String(props.source)}
      language={String(props.language)}
      variant={props.variant === "snippet" ? "snippet" : "full"}
      showLanguage={Boolean(props.showLanguage)}
      scroll={Boolean(props.scroll)}
      className="max-w-md"
    />
  ),
  code: (props) => {
    const attrs = [
      props.language === "ts" ? "" : `language="${props.language}"`,
      props.source === "export const n = 1" ? "" : `code={"${String(props.source).replaceAll('"', '\\"')}"}`,
    ].filter(Boolean);
    return jsx("CodeBlock", attrs);
  },
});

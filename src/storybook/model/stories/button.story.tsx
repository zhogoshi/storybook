"use client";

import { Button } from "@hogoshi/ui";
import { defineStory } from "../define-story";

const options = (values: string[]) => values.map((value) => ({ value, label: value }));

export const buttonStory = defineStory({
  slug: "button",
  title: "Button",
  category: "Actions",
  component: "Button",
  childrenKey: "children",
  description: "Core action. Default variant is secondary, default size is md.",
  controls: {
    variant: {
      type: "select",
      label: "variant",
      default: "secondary",
      options: options(["primary", "secondary", "ghost", "danger", "outline", "link"]),
    },
    size: {
      type: "select",
      label: "size",
      default: "md",
      options: options(["sm", "md", "lg", "icon"]),
    },
    children: { type: "text", label: "children", default: "Click me" },
    disabled: { type: "boolean", label: "disabled", default: false },
    loading: { type: "boolean", label: "loading", default: false },
  },
  render: (props) => (
    <Button
      variant={props.variant as "primary"}
      size={props.size as "md"}
      disabled={Boolean(props.disabled)}
      loading={Boolean(props.loading)}
    >
      {props.size === "icon" ? "+" : String(props.children)}
    </Button>
  ),
});

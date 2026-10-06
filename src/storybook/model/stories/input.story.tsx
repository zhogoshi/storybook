"use client";

import { Input, Otp, Textarea } from "@hogoshi/ui";
import { defineStory } from "../define-story";

const options = (values: string[]) => values.map((value) => ({ value, label: value }));

export const inputStory = defineStory({
  slug: "input",
  title: "Input",
  category: "Forms",
  component: "Input",
  description: "Text, email, password, number, and search. Search shows a clear control while the field has a value.",
  controls: {
    type: {
      type: "select",
      label: "type",
      default: "text",
      options: options(["text", "email", "password", "number", "search"]),
    },
    placeholder: { type: "text", label: "placeholder", default: "Type here" },
    disabled: { type: "boolean", label: "disabled", default: false },
  },
  render: (props) => (
    <div className="w-72">
      <Input
        type={String(props.type) as "text"}
        placeholder={String(props.placeholder)}
        disabled={Boolean(props.disabled)}
      />
    </div>
  ),
});

export const textareaStory = defineStory({
  slug: "textarea",
  title: "Textarea",
  category: "Forms",
  component: "Textarea",
  description: "Multiline field with the same chrome as Input.",
  controls: {
    placeholder: { type: "text", label: "placeholder", default: "A longer note" },
    disabled: { type: "boolean", label: "disabled", default: false },
  },
  render: (props) => (
    <Textarea className="w-72" placeholder={String(props.placeholder)} disabled={Boolean(props.disabled)} />
  ),
});

export const otpStory = defineStory({
  slug: "otp",
  title: "OTP",
  category: "Forms",
  component: "Otp",
  description: "One-time code. Paste fills every slot.",
  controls: {
    mask: { type: "boolean", label: "hide", default: false },
    disabled: { type: "boolean", label: "disabled", default: false },
  },
  render: (props) => <Otp mask={Boolean(props.mask)} disabled={Boolean(props.disabled)} />,
});

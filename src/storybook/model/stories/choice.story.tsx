"use client";

import { Checkbox, Counter, Slider, Switch } from "@hogoshi/ui";
import { defineStory } from "../define-story";
import { useStoryChange } from "../story-state";

function CheckboxPreview(props: { checked: boolean; disabled: boolean; children: string }) {
  const set = useStoryChange();
  return (
    <label className="flex w-56 cursor-pointer items-center gap-3">
      <Checkbox
        checked={props.checked}
        disabled={props.disabled}
        onCheckedChange={(checked) => set("checked", Boolean(checked))}
      />
      <span className="text-sm font-medium">{props.children}</span>
    </label>
  );
}

function SwitchPreview(props: { checked: boolean; disabled: boolean }) {
  const set = useStoryChange();
  return (
    <Switch
      checked={props.checked}
      disabled={props.disabled}
      onCheckedChange={(checked) => set("checked", Boolean(checked))}
    />
  );
}

function SliderPreview(props: { value: number; disabled: boolean }) {
  const set = useStoryChange();
  return (
    <div className="w-64">
      <Slider value={props.value} disabled={props.disabled} onValueChange={(next) => set("value", next)} />
    </div>
  );
}

export const checkboxStory = defineStory({
  slug: "checkbox",
  title: "Checkbox",
  category: "Forms",
  component: "Checkbox",
  description: "Accent when checked. The mark is a filled icon.",
  controls: {
    checked: { type: "boolean", label: "checked", default: true },
    disabled: { type: "boolean", label: "disabled", default: false },
  },
  render: (props) => (
    <CheckboxPreview checked={Boolean(props.checked)} disabled={Boolean(props.disabled)} children="Accept" />
  ),
});

export const switchStory = defineStory({
  slug: "switch",
  title: "Switch",
  category: "Forms",
  component: "Switch",
  description: "Accent when on.",
  controls: {
    checked: { type: "boolean", label: "checked", default: true },
    disabled: { type: "boolean", label: "disabled", default: false },
  },
  render: (props) => <SwitchPreview checked={Boolean(props.checked)} disabled={Boolean(props.disabled)} />,
});

export const counterStory = defineStory({
  slug: "counter",
  title: "Counter",
  category: "Display",
  component: "Counter",
  description: "Digits roll toward the next value and blur while they move.",
  controls: { value: { type: "number", label: "value", default: 128, min: 0, max: 999 } },
  render: (props) => <Counter value={Number(props.value)} />,
});

export const sliderStory = defineStory({
  slug: "slider",
  title: "Slider",
  category: "Forms",
  component: "Slider",
  description: "Accent range on a muted track.",
  controls: {
    value: { type: "number", label: "value", default: 40, min: 0, max: 100 },
    disabled: { type: "boolean", label: "disabled", default: false },
  },
  render: (props) => <SliderPreview value={Number(props.value)} disabled={Boolean(props.disabled)} />,
});

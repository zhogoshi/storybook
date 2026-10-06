"use client";

import { useState } from "react";
import {
  Button,
  Calendar,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  ContextMenu,
  type ContextMenuEntry,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Pophover,
  PophoverContent,
  PophoverTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@hogoshi/ui";
import { Delete02Icon, Edit02Icon } from "@hugeicons-pro/core-stroke-rounded";
import { defineStory } from "../define-story";
import { jsx } from "../story-code";
import { useStoryChange } from "../story-state";
import type { ControlDef, StoryProps } from "../types";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

const placement = (side: Side, align: Align): Record<"side" | "align", ControlDef> => ({
  side: {
    type: "select",
    label: "side",
    default: side,
    options: ["top", "right", "bottom", "left"].map((value) => ({ value, label: value })),
  },
  align: {
    type: "select",
    label: "align",
    default: align,
    options: ["start", "center", "end"].map((value) => ({ value, label: value })),
  },
});

const placementAttrs = (props: StoryProps, side: Side, align: Align) =>
  [props.side !== side ? `side="${String(props.side)}"` : "", props.align !== align ? `align="${String(props.align)}"` : ""].filter(Boolean);

const fileItems: ContextMenuEntry[] = [
  {
    id: "file",
    label: "File",
    items: [
      { id: "rename", label: "Rename", icon: Edit02Icon },
      { id: "delete", label: "Delete", icon: Delete02Icon, destructive: true },
    ],
  },
];

function CommandPreview({ placeholder }: { placeholder: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Command
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup heading="Files">
              <CommandItem>New file</CommandItem>
              <CommandItem>Open tokens</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

function CalendarPreview({
  mode,
  allowPast,
  allowFuture,
}: {
  mode: "single" | "range";
  allowPast: boolean;
  allowFuture: boolean;
}) {
  const [value, setValue] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
  return (
    <Calendar
      mode={mode}
      allowPast={allowPast}
      allowFuture={allowFuture}
      value={value}
      onChange={setValue}
      range={range}
      onRangeChange={setRange}
    />
  );
}

function ConfirmPreview({ title, description }: { title: string; description: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="danger" />}>Delete project</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className="flex justify-end gap-2">
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <Button variant="danger" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const selectStory = defineStory({
  slug: "select",
  title: "Select",
  category: "Forms",
  component: "Select",
  description: "Trigger matches Input. The popup uses menu motion.",
  controls: { disabled: { type: "boolean", label: "disabled", default: false } },
  render: (props) => (
    <Select defaultValue="one" disabled={Boolean(props.disabled)}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">One</SelectItem>
        <SelectItem value="two">Two</SelectItem>
      </SelectContent>
    </Select>
  ),
  code: (props) => jsx("Select", ["defaultValue=\"one\"", ...(props.disabled ? ["disabled"] : [])]),
});

function TabsPreview({ value }: { value: string }) {
  const set = useStoryChange();
  return (
    <Tabs value={value} onValueChange={(next) => set("value", next)}>
      <TabsList>
        <TabsTrigger value="a">Alpha</TabsTrigger>
        <TabsTrigger value="b">Beta</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Alpha panel</TabsContent>
      <TabsContent value="b">Beta panel</TabsContent>
    </Tabs>
  );
}

export const tabsStory = defineStory({
  slug: "tabs",
  title: "Tabs",
  category: "Navigation",
  description: "Pill tabs. The indicator slides to the active tab.",
  controls: {
    value: {
      type: "select",
      label: "value",
      default: "a",
      options: [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta" },
      ],
    },
  },
  component: "Tabs",
  render: (props) => <TabsPreview value={String(props.value)} />,
});

export const dialogStory = defineStory({
  slug: "dialog",
  title: "Dialog",
  category: "Overlay",
  component: "Dialog",
  description: "Confirmation modal. Cancel and the destructive action sit in the footer.",
  controls: {
    title: { type: "text", label: "title", default: "Delete this project?" },
    description: { type: "text", label: "description", default: "The files are removed and cannot be restored." },
  },
  render: (props) => <ConfirmPreview title={String(props.title)} description={String(props.description)} />,
  code: (props) =>
    jsx(
      "Dialog",
      [],
      [jsx("DialogTitle", [], String(props.title)), jsx("DialogDescription", [], String(props.description))].join("\n"),
    ),
});

export const sheetStory = defineStory({
  slug: "sheet",
  title: "Sheet",
  category: "Overlay",
  description: "Floating panel. Swipe the whole sheet toward its edge to dismiss. Taps and scrolling inside still work.",
  controls: {
    side: {
      type: "select",
      label: "side",
      default: "right",
      options: ["right", "left", "bottom", "top"].map((value) => ({ value, label: value })),
    },
  },
  render: (props) => (
    <Sheet key={String(props.side)} side={props.side as SheetSide}>
      <SheetTrigger render={<Button variant="secondary" />}>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetTitle>Sheet</SheetTitle>
        <SheetDescription>Swipe toward the edge to close.</SheetDescription>
        <Button variant="secondary">Still clickable</Button>
      </SheetContent>
    </Sheet>
  ),
  code: (props) =>
    jsx(
      "Sheet",
      props.side === "right" ? [] : [`side="${String(props.side)}"`],
      [jsx("SheetTrigger", [], "Open sheet"), jsx("SheetContent", [], jsx("SheetTitle", [], "Sheet"))].join("\n"),
    ),
});

export const popoverStory = defineStory({
  slug: "popover",
  title: "Popover",
  category: "Overlay",
  component: "Popover",
  description: "Surface that opens on click. Pick the side and alignment.",
  controls: {
    label: { type: "text", label: "content", default: "Popover content" },
    ...placement("bottom", "start"),
  },
  render: (props) => (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>Open</PopoverTrigger>
      <PopoverContent side={props.side as Side} align={props.align as Align}>
        {String(props.label)}
      </PopoverContent>
    </Popover>
  ),
  code: (props) => jsx("PopoverContent", placementAttrs(props, "bottom", "start"), String(props.label)),
});

export const pophoverStory = defineStory({
  slug: "pophover",
  title: "Pophover",
  category: "Overlay",
  component: "Pophover",
  description: "Popover that opens on hover and stays open while the pointer is over it.",
  controls: {
    label: { type: "text", label: "content", default: "Opened on hover" },
    ...placement("bottom", "center"),
  },
  render: (props) => (
    <Pophover>
      <PophoverTrigger render={<Button variant="secondary" />}>Hover me</PophoverTrigger>
      <PophoverContent side={props.side as Side} align={props.align as Align} className="w-56">
        <p className="text-sm font-medium">{String(props.label)}</p>
        <p className="text-fg-muted mt-1 text-xs">Move the pointer into the card to keep it open.</p>
      </PophoverContent>
    </Pophover>
  ),
  code: (props) =>
    jsx(
      "Pophover",
      [],
      [jsx("PophoverTrigger", [], "Hover me"), jsx("PophoverContent", placementAttrs(props, "bottom", "center"), String(props.label))].join("\n"),
    ),
});

export const tooltipStory = defineStory({
  slug: "tooltip",
  title: "Tooltip",
  category: "Overlay",
  component: "Tooltip",
  description: "Compact label. Inverted foreground on the page background.",
  controls: {
    label: { type: "text", label: "label", default: "Tooltip" },
    ...placement("top", "center"),
  },
  render: (props) => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" />}>Hover</TooltipTrigger>
      <TooltipContent side={props.side as Side} align={props.align as Align}>
        {String(props.label)}
      </TooltipContent>
    </Tooltip>
  ),
  code: (props) => jsx("TooltipContent", placementAttrs(props, "top", "center"), String(props.label)),
});

export const menuStory = defineStory({
  slug: "menu",
  title: "Menu",
  category: "Overlay",
  component: "DropdownMenu",
  description: "Dropdown menu. A submenu opens on hover, with a chevron on the parent item.",
  controls: { disabled: { type: "boolean", label: "disabled", default: false } },
  render: (props) => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Copy</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Switch account</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>hogoshi</DropdownMenuItem>
            <DropdownMenuItem>ada</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem disabled={Boolean(props.disabled)}>Rename</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  code: (props) => {
    const rename = props.disabled ? jsx("DropdownMenuItem", ["disabled"], "Rename") : jsx("DropdownMenuItem", [], "Rename");
    return jsx("DropdownMenu", [], [jsx("DropdownMenuTrigger", [], "Menu"), jsx("DropdownMenuItem", [], "Copy"), rename].join("\n"));
  },
});

export const contextMenuStory = defineStory({
  slug: "context-menu",
  title: "Context menu",
  category: "Overlay",
  component: "ContextMenu",
  description: "Right-click the target.",
  controls: { label: { type: "text", label: "label", default: "Right click" } },
  render: (props) => (
    <ContextMenu items={fileItems}>
      <span className="border-border text-fg-muted flex h-24 w-64 items-center justify-center rounded-[var(--radius-md)] border border-dashed text-sm">
        {String(props.label)}
      </span>
    </ContextMenu>
  ),
  code: (props) => jsx("ContextMenu", [], String(props.label)),
});

export const commandStory = defineStory({
  slug: "command",
  title: "Command",
  category: "Overlay",
  component: "Command",
  description: "Searchable list inside a dialog.",
  controls: { placeholder: { type: "text", label: "placeholder", default: "Search" } },
  render: (props) => <CommandPreview placeholder={String(props.placeholder)} />,
  code: (props) => {
    const input =
      props.placeholder === "Search"
        ? "<CommandInput />"
        : jsx("CommandInput", [`placeholder="${String(props.placeholder).replaceAll('"', '\\"')}"`]);
    return jsx("CommandDialog", [], [input, "<CommandList />"].join("\n"));
  },
});

export const calendarStory = defineStory({
  slug: "calendar",
  title: "Calendar",
  category: "Forms",
  description: "Single day or a range. Past and future can be blocked. Month and year open their own menus.",
  controls: {
    mode: {
      type: "select",
      label: "mode",
      default: "single",
      options: [
        { value: "single", label: "single" },
        { value: "range", label: "range" },
      ],
    },
    allowPast: { type: "boolean", label: "allow past", default: true },
    allowFuture: { type: "boolean", label: "allow future", default: true },
  },
  component: "Calendar",
  render: (props) => (
    <CalendarPreview
      mode={props.mode === "range" ? "range" : "single"}
      allowPast={Boolean(props.allowPast)}
      allowFuture={Boolean(props.allowFuture)}
    />
  ),
});

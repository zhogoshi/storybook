"use client";

import { useState } from "react";
import { ArrowRight01Icon } from "@hugeicons-pro/core-stroke-rounded";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  Kbd,
  Logo,
  Progress,
  Result,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@hogoshi/ui";
import { defineStory } from "../define-story";
import { jsx } from "../story-code";

const options = (values: string[]) => values.map((value) => ({ value, label: value }));

export const logoStory = defineStory({
  slug: "logo",
  title: "Logo",
  category: "Display",
  component: "Logo",
  description: "Mark. Color comes from the variant, and currentColor still overrides it.",
  controls: {
    variant: {
      type: "select",
      label: "variant",
      default: "primary",
      options: options(["primary", "secondary", "ghost", "outline"]),
    },
    size: {
      type: "select",
      label: "size",
      default: "md",
      options: options(["sm", "md", "lg"]),
    },
  },
  render: (props) => <Logo variant={props.variant as "primary"} size={props.size as "md"} />,
});

export const badgeStory = defineStory({
  slug: "badge",
  title: "Badge",
  category: "Display",
  description: "Compact status label.",
  component: "Badge",
  childrenKey: "label",
  controls: {
    tone: {
      type: "select",
      label: "tone",
      default: "neutral",
      options: ["neutral", "accent", "success", "warning", "danger", "outline"].map((value) => ({ value, label: value })),
    },
    label: { type: "text", label: "children", default: "Badge" },
  },
  render: (props) => <Badge tone={props.tone as "neutral"}>{String(props.label)}</Badge>,
});

export const avatarStory = defineStory({
  slug: "avatar",
  title: "Avatar",
  category: "Display",
  description: "Image with initials when the picture is missing.",
  controls: { label: { type: "text", label: "fallback", default: "HK" } },
  render: (props) => (
    <Avatar>
      <AvatarFallback>{String(props.label)}</AvatarFallback>
    </Avatar>
  ),
  code: (props) => jsx("Avatar", [], props.label === "HK" ? "" : jsx("AvatarFallback", [], String(props.label))),
});

export const separatorStory = defineStory({
  slug: "separator",
  title: "Separator",
  category: "Display",
  component: "Separator",
  description: "One pixel rule in the border token.",
  controls: {
    orientation: {
      type: "select",
      label: "orientation",
      default: "horizontal",
      options: options(["horizontal", "vertical"]),
    },
  },
  render: (props) =>
    props.orientation === "vertical" ? (
      <div className="flex h-16 items-center">
        <Separator orientation="vertical" />
      </div>
    ) : (
      <Separator className="w-64" />
    ),
});

export const skeletonStory = defineStory({
  slug: "skeleton",
  title: "Skeleton",
  category: "Display",
  description: "Muted pulse. It stops when motion is off.",
  controls: {},
  render: () => <Skeleton className="h-8 w-48" />,
  code: () => jsx("Skeleton", ['className="h-8 w-48"']),
});

export const kbdStory = defineStory({
  slug: "kbd",
  title: "Kbd",
  category: "Display",
  description: "Key cap. Mono, 10px.",
  component: "Kbd",
  childrenKey: "label",
  controls: { label: { type: "text", label: "children", default: "⌘" } },
  render: (props) => <Kbd>{String(props.label)}</Kbd>,
});

export const cardStory = defineStory({
  slug: "card",
  title: "Card",
  category: "Display",
  description: "Elevated surface for a title, description, and body.",
  controls: {},
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <p className="text-2xl font-semibold tabular-nums">$48.2k</p>
    </Card>
  ),
  code: () => jsx("Card", [], [jsx("CardHeader", [], [jsx("CardTitle", [], "Revenue"), jsx("CardDescription", [], "Last 30 days")].join("\n")), "$48.2k"].join("\n")),
});

function TableDemo() {
  const [dir, setDir] = useState<"asc" | "desc" | null>("asc");
  const rows = dir === "desc" ? ["Grace", "Ada"] : ["Ada", "Grace"];
  const cycle = () => setDir(dir === "asc" ? "desc" : dir === "desc" ? null : "asc");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sort={dir ?? false} onSort={cycle}>
            Name
          </TableHead>
          <TableHead>Plan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((name) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>Pro</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const tableStory = defineStory({
  slug: "table",
  title: "Table",
  category: "Display",
  description: "Rows with a sortable column. The icon switches between ascending and descending.",
  controls: {},
  render: () => <TableDemo />,
  code: () => jsx("Table", [], jsx("TableHead", ["sort=\"asc\"", "onSort={sort}"], "Name")),
});

export const breadcrumbStory = defineStory({
  slug: "breadcrumb",
  title: "Breadcrumb",
  category: "Navigation",
  description: "Trail of links. Pass separator to change the splitter.",
  controls: {},
  render: () => (
    <Breadcrumb
      separator={<Icon icon={ArrowRight01Icon} variant="stroke" size={14} />}
      items={[{ href: "/", label: "Home" }, { href: "/customers", label: "Customers" }, { label: "Northwind" }]}
    />
  ),
  code: () => jsx("Breadcrumb", ['separator="/"'], ""),
});

export const resultStory = defineStory({
  slug: "result",
  title: "Result",
  category: "Feedback",
  description: "Centered status for a missing page or a failed load.",
  controls: {},
  render: () => (
    <Result title="Page not found" description="That address is not in this app.">
      <Button>Home</Button>
      <Button variant="ghost">Back</Button>
    </Result>
  ),
  code: () => jsx("Result", ['title="Page not found"'], "Home"),
});

export const progressStory = defineStory({
  slug: "progress",
  title: "Progress",
  category: "Display",
  description: "Fill that grows to a value. Used for plan limits.",
  controls: { value: { type: "number", label: "value", default: 64, min: 0, max: 100 } },
  render: (props) => <Progress value={Number(props.value)} className="w-64" />,
  code: (props) => jsx("Progress", [`value={${props.value}}`]),
});

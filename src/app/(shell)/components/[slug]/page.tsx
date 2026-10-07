import { StorybookComponentPage } from "@/storybook/pages/component-page";

const SLUGS = [
  "button",
  "icon",
  "input",
  "otp",
  "textarea",
  "file-upload",
  "image",
  "video",
  "checkbox",
  "switch",
  "slider",
  "select",
  "tabs",
  "sidebar",
  "navbar",
  "bottom-bar",
  "theme",
  "spinner",
  "page-loader",
  "result",
  "calendar",
  "logo",
  "badge",
  "avatar",
  "separator",
  "counter",
  "skeleton",
  "card",
  "progress",
  "chart",
  "table",
  "breadcrumb",
  "kbd",
  "dialog",
  "sheet",
  "popover",
  "pophover",
  "tooltip",
  "menu",
  "context-menu",
  "command",
  "scroll-area",
  "toast",
  "code",
];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <StorybookComponentPage slug={slug} />;
}

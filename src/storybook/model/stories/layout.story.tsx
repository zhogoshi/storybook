"use client";

import { useState } from "react";
import { Home01Icon, Search01Icon, Settings01Icon } from "@hugeicons-pro/core-stroke-rounded";
import {
  Home01Icon as Home01FillIcon,
  BookOpen01Icon,
  Mail01Icon,
  News01Icon,
  Robot01Icon,
  Search01Icon as Search01FillIcon,
  Settings01Icon as Settings01FillIcon,
  Shield01Icon,
  SourceCodeIcon,
  UserGroupIcon,
} from "@hugeicons-pro/core-solid-rounded";
import {
  BottomBar,
  BottomBarItem,
  Logo,
  Navbar,
  NavbarItem,
  NavbarMenu,
  NavbarMenuLink,
  NavbarMenus,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarNav,
  SidebarProvider,
  SidebarTrigger,
  ThemeToggle,
  useSidebar,
} from "@hogoshi/ui";
import { defineStory } from "../define-story";
import { usePreviewIconStyle } from "../preview-channel";
import { jsx } from "../story-code";

function useNavIcon() {
  const style = usePreviewIconStyle();
  return function iconFor(active: boolean, item: { stroke: typeof Home01Icon; fill: typeof Home01FillIcon }) {
    const filled = style === "ios" && active;
    return { icon: filled ? item.fill : item.stroke, iconVariant: filled ? ("fill" as const) : ("stroke" as const) };
  };
}

const sections = [
  { id: "home", label: "Home", stroke: Home01Icon, fill: Home01FillIcon },
  { id: "search", label: "Search", stroke: Search01Icon, fill: Search01FillIcon },
  { id: "settings", label: "Settings", stroke: Settings01Icon, fill: Settings01FillIcon },
] as const;

type SectionId = (typeof sections)[number]["id"];

function SidebarDemo({ collapsed }: { collapsed: boolean }) {
  const [active, setActive] = useState<SectionId>("home");
  const current = sections.find((item) => item.id === active)!;
  return (
    <SidebarProvider defaultCollapsed={collapsed}>
      <div className="bg-bg flex h-app w-full overflow-hidden">
        <Sidebar className="flex">
          <SidebarChrome active={active} onSelect={setActive} />
        </Sidebar>
        <SidebarInset className="bg-bg text-fg-muted p-4 text-sm">{current.label}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function SidebarChrome({ active, onSelect }: { active: SectionId; onSelect: (id: SectionId) => void }) {
  const { collapsed } = useSidebar();
  const iconFor = useNavIcon();
  return (
    <>
      <SidebarHeader className={collapsed ? "justify-center px-2" : undefined}>
        {collapsed ? (
          <div className="group/header relative size-8">
            <Logo size="sm" />
            <SidebarTrigger className="pointer-events-none absolute inset-0 opacity-0 group-hover/header:pointer-events-auto group-hover/header:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100" />
          </div>
        ) : (
          <>
            <span className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-sm font-semibold">hogoshi</span>
            </span>
            <SidebarTrigger />
          </>
        )}
      </SidebarHeader>
      <SidebarNav>
        {sections.map((item) => (
          <SidebarItem key={item.id} {...iconFor(active === item.id, item)} active={active === item.id} onClick={() => onSelect(item.id)}>
            {item.label}
          </SidebarItem>
        ))}
      </SidebarNav>
      <SidebarFooter>
        <ThemeToggle label="Switch theme" hideLabel={collapsed} />
      </SidebarFooter>
    </>
  );
}

export const sidebarStory = defineStory({
  slug: "sidebar",
  title: "Sidebar",
  category: "Navigation",
  description: "Logo in the header, hide control, theme switch in the footer. The active item glides to the selection.",
  fill: true,
  controls: { collapsed: { type: "boolean", label: "collapsed", default: false } },
  render: (props) => <SidebarDemo collapsed={Boolean(props.collapsed)} />,
  code: (props) => jsx("SidebarProvider", props.collapsed ? ["defaultCollapsed"] : [], "<Sidebar />"),
});

const pages = [
  { id: "home", label: "Home" },
  { id: "pricing", label: "Pricing" },
] as const;

const menus = [
  {
    label: "Products",
    links: [
      { icon: Shield01Icon, title: "Obfuscator", description: "Hashes DOM, styles, variables, and scripts." },
      { icon: SourceCodeIcon, title: "UI kit", description: "Tokens and components built on Base UI." },
    ],
  },
  {
    label: "Resources",
    links: [
      { icon: BookOpen01Icon, title: "Docs", description: "Guides and API reference." },
      { icon: News01Icon, title: "Changelog", description: "What shipped this week." },
    ],
  },
  {
    label: "Company",
    links: [
      { icon: UserGroupIcon, title: "About", description: "Who builds Hogoshi." },
      { icon: Mail01Icon, title: "Contact", description: "Write to the team." },
    ],
  },
];

function NavbarDemo() {
  const [active, setActive] = useState<string>("home");
  return (
    <div className="bg-bg flex min-h-app w-full flex-col">
      <Navbar className="static">
        <Logo size="sm" className="mr-2" />
        {pages.map((item) => (
          <NavbarItem key={item.id} active={active === item.id} onClick={() => setActive(item.id)}>
            {item.label}
          </NavbarItem>
        ))}
        <NavbarMenus>
          {menus.map((menu) => (
            <NavbarMenu key={menu.label} label={menu.label} className={menu.links.length > 2 ? "w-[22rem]" : "w-72"}>
              {menu.links.map((link) => (
                <NavbarMenuLink key={link.title} href={`#${link.title.toLowerCase()}`} {...link} />
              ))}
            </NavbarMenu>
          ))}
        </NavbarMenus>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </Navbar>
      <div className="text-fg-muted flex-1 p-6 text-sm">{pages.find((item) => item.id === active)?.label}</div>
    </div>
  );
}

export const navbarStory = defineStory({
  slug: "navbar",
  title: "Navbar",
  category: "Navigation",
  description: "Links and hover menus. One popup moves and resizes between menus while the content slides, fades, and blurs.",
  fill: true,
  controls: {},
  render: () => <NavbarDemo />,
  code: () =>
    jsx(
      "Navbar",
      [],
      [
        jsx("NavbarItem", ["active"], "Home"),
        jsx(
          "NavbarMenus",
          [],
          [
            jsx("NavbarMenu", ['label="Resources"'], jsx("NavbarMenuLink", ['href="/docs"', 'title="Docs"'])),
          ].join("\n"),
        ),
      ].join("\n"),
    ),
});

function BottomBarDemo() {
  const [active, setActive] = useState<SectionId>("home");
  const iconFor = useNavIcon();
  const current = sections.find((item) => item.id === active)!;
  return (
    <div className="bg-bg min-h-app">
      <p className="text-fg-muted p-6 text-sm">{current.label}</p>
      <BottomBar className="md:flex">
        {sections.map((item) => (
          <BottomBarItem key={item.id} {...iconFor(active === item.id, item)} active={active === item.id} onClick={() => setActive(item.id)}>
            {item.label}
          </BottomBarItem>
        ))}
      </BottomBar>
    </div>
  );
}

export const bottomBarStory = defineStory({
  slug: "bottom-bar",
  title: "Bottom bar",
  category: "Navigation",
  component: "BottomBar",
  description: "Floating item row for small screens. The active pill glides to the tapped item.",
  fill: true,
  controls: {},
  render: () => <BottomBarDemo />,
  code: () => jsx("BottomBar", [], sections.map((item) => jsx("BottomBarItem", item.id === "home" ? ["active"] : [], item.label)).join("\n")),
});

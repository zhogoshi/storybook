"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown01Icon } from "@hugeicons-pro/core-stroke-rounded";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Icon,
  Logo,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarTrigger,
  ThemeToggle,
  sidebarLabel,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useSidebar,
} from "@hogoshi/ui";
import { getStoriesByCategory } from "../model/registry";
import type { StoryDefinition } from "../model/types";
import { getStoryIcon } from "../lib/story-icons";
import { StorybookCommandTrigger } from "./storybook-command";

function NavLink({
  href,
  slug,
  active,
  children,
}: {
  href: string;
  slug: string;
  active: boolean;
  children: string;
}) {
  const icons = getStoryIcon(slug);
  return (
    <SidebarItem
      active={active}
      icon={active ? icons.fill : icons.stroke}
      iconVariant={active ? "fill" : "stroke"}
      className={active ? "bg-bg-subtle text-fg hover:text-fg font-medium" : undefined}
      render={<Link href={href} />}
    >
      {children}
    </SidebarItem>
  );
}

function CategoryGroup({
  category,
  stories,
  pathname,
}: {
  category: string;
  stories: StoryDefinition[];
  pathname: string;
}) {
  const { collapsed } = useSidebar();
  const activeInGroup = stories.some((story) => pathname === `/components/${story.slug}`);
  const [open, setOpen] = useState(activeInGroup);
  const [wasActive, setWasActive] = useState(activeInGroup);

  if (activeInGroup !== wasActive) {
    setWasActive(activeInGroup);
    if (activeInGroup) setOpen(true);
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-2 flex flex-col">
      <Tooltip disabled={!collapsed}>
        <TooltipTrigger
          render={
            <CollapsibleTrigger
              aria-label={category}
              className="group/cat text-fg-muted hover:bg-bg-subtle hover:text-fg h-8 gap-2 overflow-hidden px-3 text-xs font-medium tracking-wide whitespace-nowrap uppercase"
            />
          }
        >
          <Icon
            icon={ArrowDown01Icon}
            variant="stroke"
            size={16}
            className="shrink-0 -rotate-90 transition-transform duration-[var(--motion-duration)] ease-[var(--motion-ease)] group-data-[panel-open]/cat:rotate-0"
          />
          <span className={`${sidebarLabel} ${collapsed ? "opacity-0" : ""}`}>{category}</span>
        </TooltipTrigger>
        <TooltipContent side="right">{category}</TooltipContent>
      </Tooltip>
      <CollapsiblePanel>
        <div className="mt-0.5 flex flex-col gap-0.5">
          {stories.map((story) => (
            <NavLink
              key={story.slug}
              href={`/components/${story.slug}`}
              slug={story.slug}
              active={pathname === `/components/${story.slug}`}
            >
              {story.title}
            </NavLink>
          ))}
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}

function StorybookSidebarHeader() {
  const { collapsed } = useSidebar();

  return (
    <SidebarHeader className="group/header relative overflow-hidden px-2">
      <Link
        href="/"
        aria-label="Home"
        className={`flex min-w-0 items-center gap-2 rounded-[var(--radius-sm)] px-1 whitespace-nowrap outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-ring ${collapsed ? "group-hover/header:pointer-events-none group-hover/header:opacity-0 [@media(hover:none)]:pointer-events-none [@media(hover:none)]:opacity-0" : ""}`}
      >
        <Logo size="sm" className="shrink-0" />
        <span className={`text-sm font-semibold tracking-tight ${sidebarLabel} ${collapsed ? "opacity-0" : ""}`}>
          hogoshi
        </span>
      </Link>
      <SidebarTrigger
        className={
          collapsed
            ? "pointer-events-none absolute top-3 left-3 opacity-0 transition-opacity group-hover/header:pointer-events-auto group-hover/header:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
            : "shrink-0"
        }
      />
    </SidebarHeader>
  );
}

export function StorybookNavItems() {
  const pathname = usePathname();
  const groups = getStoriesByCategory();

  return (
    <>
      <NavLink href="/" slug="home" active={pathname === "/"}>
        Home
      </NavLink>
      <NavLink href="/tokens" slug="tokens" active={pathname === "/tokens"}>
        Tokens
      </NavLink>
      {groups.map(([category, stories]) => (
        <CategoryGroup key={category} category={category} stories={stories} pathname={pathname} />
      ))}
    </>
  );
}

export function StorybookSidebar() {
  const { collapsed } = useSidebar();

  return (
    <Sidebar>
      <StorybookSidebarHeader />
      <div className="shrink-0 px-2 pb-2">
        <StorybookCommandTrigger compact={collapsed} />
      </div>
      <SidebarNav indicatorClassName="bg-bg-subtle/55">
        <StorybookNavItems />
      </SidebarNav>
      <SidebarFooter>
        <ThemeToggle label="Switch theme" hideLabel={collapsed} />
      </SidebarFooter>
    </Sidebar>
  );
}

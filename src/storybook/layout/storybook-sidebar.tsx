"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon } from "@hugeicons-pro/core-solid-rounded";
import { ArrowDown01Icon, ArrowLeft01Icon } from "@hugeicons-pro/core-stroke-rounded";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Icon,
  ShellBrand,
  Sidebar,
  SidebarFooter,
  SidebarItem,
  SidebarNav,
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

const SITE = "https://hogoshi.dev";
const REPO = "https://github.com/zhogoshi/storybook";

export function RepoLink({ hideLabel = false }: { hideLabel?: boolean }) {
  const link = (
    <a
      href={REPO}
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub"
      className="text-fg-muted hover:bg-bg-subtle hover:text-fg inline-flex h-[calc(var(--row-h)-0.25rem)] w-full cursor-pointer items-center gap-2 overflow-hidden rounded-[var(--radius-sm)] px-3 text-sm whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon icon={GithubIcon} size={16} className="shrink-0" />
      <span className={`${sidebarLabel} ${hideLabel ? "opacity-0" : ""}`}>GitHub</span>
    </a>
  );
  if (!hideLabel) return link;
  return (
    <Tooltip>
      <TooltipTrigger render={link} />
      <TooltipContent side="right">GitHub</TooltipContent>
    </Tooltip>
  );
}

export function SiteBack({ hideLabel = false }: { hideLabel?: boolean }) {
  const link = (
    <a
      href={SITE}
      aria-label="Back"
      className="text-fg-muted hover:bg-bg-subtle hover:text-fg inline-flex h-[calc(var(--row-h)-0.25rem)] w-full cursor-pointer items-center gap-2 overflow-hidden rounded-[var(--radius-sm)] px-3 text-sm whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon icon={ArrowLeft01Icon} variant="stroke" size={16} className="shrink-0" />
      <span className={`${sidebarLabel} ${hideLabel ? "opacity-0" : ""}`}>Back</span>
    </a>
  );
  if (!hideLabel) return link;
  return (
    <Tooltip>
      <TooltipTrigger render={link} />
      <TooltipContent side="right">Back</TooltipContent>
    </Tooltip>
  );
}

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
      <ShellBrand href={SITE} label="hogoshi" />
      <StorybookCommandTrigger />
      <SidebarNav indicatorClassName="bg-bg-subtle/55">
        <StorybookNavItems />
      </SidebarNav>
      <SidebarFooter>
        <RepoLink hideLabel={collapsed} />
        <ThemeToggle label="Switch theme" hideLabel={collapsed} />
        <SiteBack hideLabel={collapsed} />
      </SidebarFooter>
    </Sidebar>
  );
}

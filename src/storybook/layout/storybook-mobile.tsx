"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu01Icon, Search01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { GithubIcon, Menu01Icon as Menu01FillIcon } from "@hugeicons-pro/core-solid-rounded";
import { BottomBar, BottomBarItem, Icon, ShellLogo, ShellMenu, SidebarNav, ThemeToggle, TopBar } from "@hogoshi/ui";
import { getStoryIcon } from "../lib/story-icons";
import { useStorybookCommand } from "./storybook-command";
import { SiteBack, StorybookNavItems } from "./storybook-sidebar";

export function StorybookMobileHeader() {
  return (
    <TopBar contained className="md:hidden">
      <ShellLogo href="https://hogoshi.dev" label="hogoshi" className="text-sm font-semibold tracking-tight">
        hogoshi
      </ShellLogo>
      <a
        href="https://github.com/zhogoshi/storybook"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="text-fg-muted hover:bg-bg-subtle hover:text-fg ml-auto grid size-8 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon icon={GithubIcon} size={16} />
      </a>
      <ThemeToggle />
    </TopBar>
  );
}

export function StorybookMobileBar() {
  const pathname = usePathname();
  const openSearch = useStorybookCommand();
  const [menu, setMenu] = useState(false);
  const home = getStoryIcon("home");

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <BottomBar>
        <BottomBarItem
          active={pathname === "/"}
          icon={pathname === "/" ? home.fill : home.stroke}
          iconVariant={pathname === "/" ? "fill" : "stroke"}
          render={<Link href="/" />}
        >
          Home
        </BottomBarItem>
        <BottomBarItem icon={Search01Icon} onClick={() => openSearch?.()}>
          Search
        </BottomBarItem>
        <BottomBarItem
          active={menu}
          icon={menu ? Menu01FillIcon : Menu01Icon}
          iconVariant={menu ? "fill" : "stroke"}
          onClick={() => setMenu(true)}
        >
          Menu
        </BottomBarItem>
      </BottomBar>
      <ShellMenu
        open={menu}
        onOpenChange={setMenu}
        brand={
          <ShellLogo href="https://hogoshi.dev" label="hogoshi">
            hogoshi
          </ShellLogo>
        }
      >
        <SidebarNav indicatorClassName="bg-bg-subtle/55" className="px-0">
          <StorybookNavItems />
        </SidebarNav>
        <div className="shrink-0 pt-2">
          <SiteBack />
        </div>
      </ShellMenu>
    </>
  );
}

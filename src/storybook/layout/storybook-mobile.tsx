"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu01Icon, Search01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { Menu01Icon as Menu01FillIcon } from "@hugeicons-pro/core-solid-rounded";
import {
  BottomBar,
  BottomBarItem,
  Logo,
  Sheet,
  SheetContent,
  SheetTitle,
  SidebarNav,
  SidebarProvider,
  ThemeToggle,
} from "@hogoshi/ui";
import { getStoryIcon } from "../lib/story-icons";
import { useStorybookCommand } from "./storybook-command";
import { StorybookNavItems } from "./storybook-sidebar";

export function StorybookMobileHeader() {
  return (
    <header className="border-border bg-bg-elevated/90 flex items-center justify-between gap-3 border-b px-4 pt-[calc(0.75rem+var(--safe-top))] pb-3 backdrop-blur-md md:hidden">
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Logo size="sm" />
        hogoshi
      </Link>
      <ThemeToggle />
    </header>
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
      <Sheet side="left" open={menu} onOpenChange={setMenu}>
        <SheetContent className="px-2">
          <SheetTitle className="flex items-center gap-2 px-3 pt-1 text-sm font-semibold">
            <Logo size="sm" />
            hogoshi
          </SheetTitle>
          <SidebarProvider>
            <SidebarNav indicatorClassName="bg-bg-subtle/55" className="px-0">
              <StorybookNavItems />
            </SidebarNav>
          </SidebarProvider>
        </SheetContent>
      </Sheet>
    </>
  );
}

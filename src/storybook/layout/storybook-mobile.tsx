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
import { SiteBack, StorybookNavItems } from "./storybook-sidebar";

export function StorybookMobileHeader() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const root = document.querySelector("[data-scroll-root]");
    const read = () => setCompact((root instanceof HTMLElement ? root.scrollTop : window.scrollY) > 24);
    read();
    const target: EventTarget = root instanceof HTMLElement ? root : window;
    target.addEventListener("scroll", read, { passive: true });
    return () => target.removeEventListener("scroll", read);
  }, []);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[var(--z-sticky)] flex justify-center md:hidden">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-3 transition-[width,height,margin,border-radius,background-color,border-color,box-shadow] duration-500 ease-[var(--motion-ease)] motion-reduce:transition-none ${
          compact
            ? "border-border bg-bg-elevated mt-[calc(var(--safe-top)+0.75rem)] h-12 w-[min(40rem,calc(100%-1.5rem))] rounded-full border px-3 shadow-[var(--shadow-md)]"
            : "mt-[calc(var(--safe-top)+0.5rem)] h-14 w-full border border-transparent bg-transparent px-4"
        }`}
      >
        <a href="https://hogoshi.dev" aria-label="hogoshi" className="flex items-center gap-2 rounded-[var(--radius-sm)] text-sm font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Logo size="sm" />
          hogoshi
        </a>
        <ThemeToggle />
      </div>
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
      <BottomBar className="right-[max(0.75rem,var(--safe-right))] bottom-2 left-[max(0.75rem,var(--safe-left))]">
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
        <SheetContent className="top-[calc(var(--safe-top)+0.75rem)] right-auto bottom-2 left-[max(0.75rem,var(--safe-left))] px-2">
          <SheetTitle className="px-3 pt-1 text-sm font-semibold">
            <a href="https://hogoshi.dev" aria-label="hogoshi" className="flex items-center gap-2 rounded-[var(--radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Logo size="sm" />
              hogoshi
            </a>
          </SheetTitle>
          <SidebarProvider>
            <div className="flex min-h-0 flex-1 flex-col">
              <SidebarNav indicatorClassName="bg-bg-subtle/55" className="px-0">
                <StorybookNavItems />
              </SidebarNav>
              <div className="shrink-0 pt-2">
                <SiteBack />
              </div>
            </div>
          </SidebarProvider>
        </SheetContent>
      </Sheet>
    </>
  );
}

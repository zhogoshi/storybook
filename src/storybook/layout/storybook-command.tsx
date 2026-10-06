"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Icon,
  Kbd,
  sidebarLabel,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@hogoshi/ui";
import { getStoriesByCategory } from "../model/registry";
import { getStoryIcon } from "../lib/story-icons";

const CommandContext = createContext<(() => void) | null>(null);

export function useStorybookCommand() {
  return useContext(CommandContext);
}

export function StorybookCommandProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const groups = getStoriesByCategory();
  const show = useMemo(() => () => setOpen(true), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      setOpen((current) => !current);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandContext.Provider value={show}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components" />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup heading="Foundation">
            <CommandItem value="home" onSelect={() => go("/")}>
              <Icon icon={getStoryIcon("home").stroke} variant="stroke" />
              Home
            </CommandItem>
            <CommandItem value="tokens" onSelect={() => go("/tokens")}>
              <Icon icon={getStoryIcon("tokens").stroke} variant="stroke" />
              Tokens
            </CommandItem>
          </CommandGroup>
          {groups.map(([category, stories]) => (
            <CommandGroup key={category} heading={category}>
              {stories.map((story) => {
                const icons = getStoryIcon(story.slug);
                return (
                  <CommandItem key={story.slug} value={story.title} onSelect={() => go(`/components/${story.slug}`)}>
                    <Icon icon={icons.stroke} altIcon={icons.fill} showAlt variant="stroke" />
                    {story.title}
                    <CommandShortcut>{story.slug}</CommandShortcut>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </CommandContext.Provider>
  );
}

export function StorybookCommandTrigger({ compact = false }: { compact?: boolean }) {
  const open = useContext(CommandContext);
  if (!open) return null;
  const fade = `${sidebarLabel} ${compact ? "opacity-0" : ""}`;
  const button = (
    <Button
      variant="outline"
      aria-label="Search"
      className="w-full justify-between overflow-hidden px-3 font-normal whitespace-nowrap [&>span]:w-full [&>span>span]:w-full"
      onClick={open}
    >
      <span className="flex w-full items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2">
          <Icon icon={getStoryIcon("search").stroke} variant="stroke" className="shrink-0" />
          <span className={fade}>Jump to a component</span>
        </span>
        <Kbd className={`shrink-0 ${fade}`}>⌘K</Kbd>
      </span>
    </Button>
  );
  return (
    <Tooltip disabled={!compact}>
      <TooltipTrigger render={button} />
      <TooltipContent side="right">Search</TooltipContent>
    </Tooltip>
  );
}

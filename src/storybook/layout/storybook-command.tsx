"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Icon,
  ShellSearch,
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

export function StorybookCommandTrigger() {
  const open = useContext(CommandContext);
  if (!open) return null;
  return <ShellSearch onOpen={open} label="Jump to a component" />;
}

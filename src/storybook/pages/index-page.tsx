"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger, Icon, Kbd } from "@hogoshi/ui";
import { getStoriesByCategory } from "../model/registry";
import type { StoryDefinition } from "../model/types";
import { getCategoryIcon, getStoryIcon } from "../lib/story-icons";

function CategoryAccordion({ category, stories }: { category: string; stories: StoryDefinition[] }) {
  const [open, setOpen] = useState(false);
  const icons = getCategoryIcon(category);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="border-border bg-bg-elevated overflow-hidden rounded-[var(--radius-lg)] border"
    >
      <CollapsibleTrigger className="hover:bg-bg-subtle px-3 py-2.5 text-sm font-medium">
        <Icon icon={open ? icons.fill : icons.stroke} variant={open ? "fill" : "stroke"} size={16} />
        <span className="min-w-0 flex-1 truncate">{category}</span>
        <Icon
          icon={ArrowDown01Icon}
          variant="stroke"
          size={16}
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="flex flex-col gap-0.5 px-1.5 pb-1.5">
          {stories.map((story) => {
            const storyIcons = getStoryIcon(story.slug);
            return (
              <Link
                key={story.slug}
                href={`/components/${story.slug}`}
                className="text-fg-muted hover:bg-bg-subtle hover:text-fg flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm"
              >
                <Icon icon={storyIcons.stroke} variant="stroke" size={16} />
                {story.title}
              </Link>
            );
          })}
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export function StorybookIndexPage() {
  const groups = getStoriesByCategory();
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Storybook</h1>
        <p className="text-fg-muted mt-2 max-w-2xl text-sm">
          Preview, controls, and the snippet for every component. Press <Kbd>⌘K</Kbd> to jump.
        </p>
      </header>
      <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([category, stories]) => (
          <CategoryAccordion key={category} category={category} stories={stories} />
        ))}
      </div>
    </div>
  );
}

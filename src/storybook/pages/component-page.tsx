"use client";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CodeBlock } from "@hogoshi/ui";
import { buildStoryApiSnippet } from "../lib/api-snippet";
import { getStoryBySlug } from "../model/registry";
import { useStoryParams } from "../model/use-story-params";
import { StoryControls } from "../ui/story-controls";
import { StoryPlayground } from "../ui/story-playground";

export function StorybookComponentPage({ slug }: { slug: string }) {
  const story = getStoryBySlug(slug);
  if (!story) notFound();
  return (
    <Suspense>
      <StorybookComponentContent slug={slug} />
    </Suspense>
  );
}

function StorybookComponentContent({ slug }: { slug: string }) {
  const story = getStoryBySlug(slug);
  if (!story) return null;
  const { props, tab, device, icons, setProp, setTab, setDevice, setIcons } = useStoryParams(story);
  const snippet = buildStoryApiSnippet(story);
  const hasControls = Object.keys(story.controls).length > 0;
  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-fg-muted text-sm">{story.category}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{story.title}</h1>
        {story.description ? <p className="text-fg-muted mt-2 max-w-2xl text-sm">{story.description}</p> : null}
      </header>
      {snippet ? <CodeBlock code={snippet} language="tsx" /> : null}
      {hasControls ? (
        <section className="border-border bg-bg-elevated rounded-[var(--radius-lg)] border p-4">
          <h2 className="mb-3 text-sm font-semibold">Settings</h2>
          <StoryControls story={story} props={props} onChange={setProp} />
        </section>
      ) : null}
      <StoryPlayground
        story={story}
        props={props}
        tab={tab}
        device={device}
        icons={icons}
        onTabChange={setTab}
        onDeviceChange={setDevice}
        onIconsChange={setIcons}
        onPropChange={setProp}
      />
    </div>
  );
}

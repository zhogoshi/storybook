"use client";

import { Suspense, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { PageLoader } from "@hogoshi/ui";
import { getStoryBySlug } from "../model/registry";
import { PREVIEW_CHANGE, PREVIEW_MESSAGE, PREVIEW_READY, PreviewIconStyle } from "../model/preview-channel";
import { StoryState } from "../model/story-state";
import type { IconStyle, StoryProps } from "../model/types";

export function StoryPreview({ slug }: { slug: string }) {
  const story = getStoryBySlug(slug);
  if (!story) notFound();
  return (
    <Suspense fallback={<PageLoader className="min-h-app" />}>
      <StoryPreviewContent slug={slug} />
    </Suspense>
  );
}

function StoryPreviewContent({ slug }: { slug: string }) {
  const story = getStoryBySlug(slug);
  const [props, setProps] = useState<StoryProps | null>(null);
  const [icons, setIcons] = useState<IconStyle>("ios");

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== PREVIEW_MESSAGE) return;
      setProps(event.data.props);
      setIcons(event.data.icons === "basic" ? "basic" : "ios");
    };
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: PREVIEW_READY }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!story) return null;
  if (!props) return <PageLoader className="min-h-app" />;

  const setProp = (key: string, value: unknown) => {
    window.parent.postMessage({ type: PREVIEW_CHANGE, key, value }, window.location.origin);
  };

  return (
    <PreviewIconStyle value={icons}>
      <div className={story.fill ? "bg-bg min-h-app" : "bg-bg grid min-h-app place-items-center p-6"}>
        <StoryState onChange={setProp}>{story.render(props)}</StoryState>
      </div>
    </PreviewIconStyle>
  );
}

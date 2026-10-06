"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  isDefaultControlValue,
  parseIconStyle,
  parseStoryDevice,
  parseStoryProps,
  parseStoryTab,
  serializeControlValue,
  STORY_DEVICE_PARAM,
  STORY_ICONS_PARAM,
  STORY_TAB_PARAM,
} from "./params";
import type { IconStyle, StoryDefinition, StoryDevice, StoryTab } from "./types";

export function useStoryParams(story: StoryDefinition) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const props = useMemo(() => parseStoryProps(story, searchParams), [story, searchParams]);
  const tab = useMemo(() => parseStoryTab(searchParams), [searchParams]);
  const device = useMemo(() => parseStoryDevice(searchParams), [searchParams]);
  const icons = useMemo(() => parseIconStyle(searchParams), [searchParams]);

  const update = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const next = new URLSearchParams(searchParams);
      updater(next);
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setProp = useCallback(
    (key: string, value: unknown) => {
      update((params) => {
        const def = story.controls[key];
        if (def && isDefaultControlValue(def, value)) params.delete(key);
        else params.set(key, serializeControlValue(value));
      });
    },
    [story.controls, update],
  );

  const setTab = useCallback(
    (next: StoryTab) => {
      update((params) => {
        if (next === "preview") params.delete(STORY_TAB_PARAM);
        else params.set(STORY_TAB_PARAM, next);
      });
    },
    [update],
  );

  const setDevice = useCallback(
    (next: StoryDevice) => {
      update((params) => {
        if (next === "desktop") params.delete(STORY_DEVICE_PARAM);
        else params.set(STORY_DEVICE_PARAM, next);
      });
    },
    [update],
  );

  const setIcons = useCallback(
    (next: IconStyle) => {
      update((params) => {
        if (next === "ios") params.delete(STORY_ICONS_PARAM);
        else params.set(STORY_ICONS_PARAM, next);
      });
    },
    [update],
  );

  return { props, tab, device, icons, setProp, setTab, setDevice, setIcons };
}

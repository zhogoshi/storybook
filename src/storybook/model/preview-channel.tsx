"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { IconStyle, StoryProps } from "./types";

export const PREVIEW_MESSAGE = "hogoshi-preview";
export const PREVIEW_READY = "hogoshi-preview-ready";
export const PREVIEW_CHANGE = "hogoshi-preview-change";

export type PreviewPayload = { type: typeof PREVIEW_MESSAGE; props: StoryProps; icons: IconStyle };

const IconStyleContext = createContext<IconStyle>("ios");

export function PreviewIconStyle({ value, children }: { value: IconStyle; children: ReactNode }) {
  return <IconStyleContext.Provider value={value}>{children}</IconStyleContext.Provider>;
}

export function usePreviewIconStyle() {
  return useContext(IconStyleContext);
}

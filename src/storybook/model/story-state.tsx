"use client";

import { createContext, useContext, type ReactNode } from "react";

const StoryChangeContext = createContext<(key: string, value: unknown) => void>(() => undefined);

export function StoryState({
  onChange,
  children,
}: {
  onChange: (key: string, value: unknown) => void;
  children: ReactNode;
}) {
  return <StoryChangeContext.Provider value={onChange}>{children}</StoryChangeContext.Provider>;
}

export function useStoryChange() {
  return useContext(StoryChangeContext);
}

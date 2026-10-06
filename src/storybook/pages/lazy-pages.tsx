"use client";

import dynamic from "next/dynamic";
import { RouteFallback, StoryFallback, TokensFallback } from "./route-fallback";

export const LazyIndexPage = dynamic(() => import("./index-page").then((mod) => mod.StorybookIndexPage), {
  loading: () => <RouteFallback />,
});

export const LazyTokensPage = dynamic(() => import("./tokens-page").then((mod) => mod.StorybookTokensPage), {
  loading: () => <TokensFallback />,
});

export const LazyComponentPage = dynamic(() => import("./component-page").then((mod) => mod.StorybookComponentPage), {
  loading: () => <StoryFallback />,
});

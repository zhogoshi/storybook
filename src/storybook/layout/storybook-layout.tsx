"use client";

import { AppShell } from "@hogoshi/ui";
import { StorybookCommandProvider } from "./storybook-command";
import { StorybookMobileBar, StorybookMobileHeader } from "./storybook-mobile";
import { StorybookSidebar } from "./storybook-sidebar";

export function StorybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorybookCommandProvider>
      <AppShell sidebar={<StorybookSidebar />} topBar={<StorybookMobileHeader />} bottomBar={<StorybookMobileBar />} contentClassName="md:pt-0">
        <div className="mx-auto w-full min-w-0 max-w-4xl px-4 md:px-8 md:py-8">{children}</div>
      </AppShell>
    </StorybookCommandProvider>
  );
}

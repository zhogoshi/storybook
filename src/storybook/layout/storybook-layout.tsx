"use client";

import { ScrollArea, SidebarInset, SidebarProvider } from "@hogoshi/ui";
import { StorybookCommandProvider } from "./storybook-command";
import { StorybookMobileBar, StorybookMobileHeader } from "./storybook-mobile";
import { StorybookSidebar } from "./storybook-sidebar";

export function StorybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorybookCommandProvider>
        <SidebarProvider>
          <div className="bg-bg flex h-dvh overflow-hidden">
            <StorybookSidebar />
            <SidebarInset className="flex min-h-0 min-w-0 flex-1 flex-col pr-[var(--safe-right)] pl-[var(--safe-left)] md:pl-0">
              <StorybookMobileHeader />
              <ScrollArea className="min-h-0 flex-1">
                <div className="mx-auto w-full max-w-4xl px-4 pt-8 pb-[calc(6rem+var(--safe-bottom))] md:px-8 md:pt-[calc(2rem+var(--safe-top))] md:pb-[calc(2rem+var(--safe-bottom))]">
                  {children}
                </div>
              </ScrollArea>
            </SidebarInset>
          </div>
          <StorybookMobileBar />
        </SidebarProvider>
    </StorybookCommandProvider>
  );
}

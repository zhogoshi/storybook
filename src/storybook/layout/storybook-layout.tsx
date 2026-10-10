"use client";

import { SidebarInset, SidebarProvider } from "@hogoshi/ui";
import { StorybookCommandProvider } from "./storybook-command";
import { StorybookMobileBar, StorybookMobileHeader } from "./storybook-mobile";
import { StorybookSidebar } from "./storybook-sidebar";

export function StorybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorybookCommandProvider>
        <SidebarProvider>
          <div className="bg-bg fixed inset-0 flex h-dvh min-h-dvh overflow-hidden">
            <StorybookSidebar />
            <SidebarInset className="relative flex min-h-0 min-w-0 flex-1 flex-col">
              <StorybookMobileHeader />
              <div data-scroll-root className="min-h-0 min-w-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-contain">
                <div className="mx-auto w-full min-w-0 max-w-4xl px-4 pt-[calc(3.5rem+var(--safe-top)+0.5rem)] pb-[calc(4rem+var(--safe-bottom))] md:px-8 md:pt-8 md:pb-[calc(2rem+var(--safe-bottom))]">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </div>
          <StorybookMobileBar />
        </SidebarProvider>
    </StorybookCommandProvider>
  );
}

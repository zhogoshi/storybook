import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BootScreen, SmoothScroll, THEME_INIT_SCRIPT, ThemeProvider, Toaster } from "@hogoshi/ui";
import { TooltipProvider } from "@hogoshi/ui";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Hogoshi storybook",
  description: "Controls, preview, and code for the Hogoshi UI kit.",
  applicationName: "Hogoshi storybook",
  appleWebApp: { capable: true, title: "Storybook", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f2" },
    { media: "(prefers-color-scheme: dark)", color: "#040404" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="bg-bg text-fg h-dvh min-h-dvh overflow-hidden antialiased">
        <ThemeProvider>
          <TooltipProvider>
            <SmoothScroll>
              {children}
              <Toaster />
              <BootScreen />
            </SmoothScroll>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

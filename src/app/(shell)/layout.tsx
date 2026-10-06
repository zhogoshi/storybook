import { StorybookLayout } from "@/storybook/layout/storybook-layout";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <StorybookLayout>{children}</StorybookLayout>;
}

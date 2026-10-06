import { StoryPreview } from "@/storybook/pages/story-preview";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <StoryPreview slug={slug} />;
}

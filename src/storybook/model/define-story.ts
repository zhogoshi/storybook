import { storyCode } from "./story-code";
import type { StoryDefinition, StoryDefinitionInput, StoryProps } from "./types";

export function defineStory<T extends StoryProps>(story: StoryDefinitionInput<T>): StoryDefinition {
  const code =
    story.code ??
    ((props: StoryProps) =>
      story.component ? storyCode(story.component, story.controls, props, story.childrenKey) : "");
  return {
    ...story,
    render: (props) => story.render(props as T),
    code: (props) => code(props as T),
  };
}

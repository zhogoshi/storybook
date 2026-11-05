import { avatarStory, badgeStory, breadcrumbStory, cardStory, kbdStory, logoStory, progressStory, resultStory, separatorStory, skeletonStory, tableStory } from "./stories/display.story";
import { chartStory } from "./stories/chart.story";
import { buttonStory } from "./stories/button.story";
import { calendarStory, commandStory, contextMenuStory, dialogStory, menuStory, popoverStory, pophoverStory, selectStory, sheetStory, tabsStory, tooltipStory } from "./stories/overlay.story";
import { checkboxStory, counterStory, sliderStory, switchStory } from "./stories/choice.story";
import { codeStory, iconStory, pageLoaderStory, scrollStory, spinnerStory, themeStory, toastStory } from "./stories/feedback.story";
import { inputStory, otpStory, textareaStory } from "./stories/input.story";
import { chatStory, composerStory } from "./stories/chat.story";
import { appShellStory, bottomBarStory, navbarStory, sidebarStory } from "./stories/layout.story";
import { fileUploadStory, imageStory, videoStory } from "./stories/media.story";
import type { StoryDefinition } from "./types";

export const STORY_REGISTRY: StoryDefinition[] = [
  buttonStory,
  iconStory,
  themeStory,
  inputStory,
  otpStory,
  textareaStory,
  fileUploadStory,
  checkboxStory,
  switchStory,
  sliderStory,
  selectStory,
  tabsStory,
  appShellStory,
  sidebarStory,
  navbarStory,
  bottomBarStory,
  calendarStory,
  logoStory,
  badgeStory,
  avatarStory,
  separatorStory,
  counterStory,
  skeletonStory,
  cardStory,
  progressStory,
  tableStory,
  breadcrumbStory,
  chartStory,
  kbdStory,
  imageStory,
  videoStory,
  dialogStory,
  sheetStory,
  popoverStory,
  pophoverStory,
  tooltipStory,
  menuStory,
  contextMenuStory,
  commandStory,
  scrollStory,
  toastStory,
  spinnerStory,
  pageLoaderStory,
  resultStory,
  codeStory,
  chatStory,
  composerStory,
];

export const STORY_BY_SLUG = Object.fromEntries(STORY_REGISTRY.map((story) => [story.slug, story]));

export function getStoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return STORY_BY_SLUG[slug];
}

export function getStoriesByCategory() {
  const groups = new Map<string, StoryDefinition[]>();
  for (const story of STORY_REGISTRY) {
    const list = groups.get(story.category) ?? [];
    list.push(story);
    groups.set(story.category, list);
  }
  return [...groups.entries()];
}

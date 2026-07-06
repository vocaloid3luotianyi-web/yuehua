import { storyTimeline } from "./timeline";

export function sectionIdForTitle(title: string): string | undefined {
  const node = storyTimeline.find((n) => title.includes(n.match));
  return node?.id;
}

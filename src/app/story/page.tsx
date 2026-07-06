import { StoryArticle } from "@/components/StoryArticle";
import { getStorySections } from "@/lib/article";

export default function StoryPage() {
  const sections = getStorySections();

  return <StoryArticle sections={sections} />;
}

import type { Metadata } from "next";
import { StoryArticle } from "@/components/StoryArticle";
import { getStorySections } from "@/lib/article";

export const metadata: Metadata = {
  title: "她的生平",
  description: "符月华生平传记，记录她从童年到离世的完整人生轨迹。",
};

export default function StoryPage() {
  const sections = getStorySections();

  return <StoryArticle sections={sections} />;
}

import type { Metadata } from "next";
import { JusticeArticle } from "@/components/JusticeArticle";
import { getJusticeSections } from "@/lib/article";

export const metadata: Metadata = {
  title: "公义与追问",
  description: "符月华案司法进程与公共讨论，记录对校园安全与制度反思的追问。",
};

export default function JusticePage() {
  const sections = getJusticeSections();

  return <JusticeArticle sections={sections} />;
}

import { JusticeArticle } from "@/components/JusticeArticle";
import { getJusticeSections } from "@/lib/article";

export default function JusticePage() {
  const sections = getJusticeSections();

  return <JusticeArticle sections={sections} />;
}

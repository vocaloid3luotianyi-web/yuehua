import type { Metadata } from "next";
import { HelpPage } from "@/components/HelpPage";
import { getHelpData, getHelpSafetySections } from "@/lib/help";

export const metadata: Metadata = {
  title: "求助与互助 · 符月华",
  description:
    "性别暴力、精神控制受害者求助渠道与相关资源链接。你并不孤单。",
};

export default function HelpRoute() {
  const data = getHelpData();
  const safetySections = getHelpSafetySections();

  return <HelpPage data={data} safetySections={safetySections} />;
}

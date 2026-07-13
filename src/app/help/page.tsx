import type { Metadata } from "next";
import { HelpPage } from "@/components/HelpPage";
import { getHelpData } from "@/lib/help";

export const metadata: Metadata = {
  title: "求助与互助",
  description:
    "延续月华温暖陌生人的精神，整理性别暴力与精神控制相关求助渠道与延伸阅读，供有需要时参考。",
};

export default function HelpRoute() {
  const data = getHelpData();

  return <HelpPage data={data} />;
}
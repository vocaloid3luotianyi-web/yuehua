import type { Metadata } from "next";
import { AbuseTypesArticle } from "@/components/AbuseTypesArticle";
import { getAbuseTypesSections } from "@/lib/abuse-types";

export const metadata: Metadata = {
  title: "识别伤害与自我保护",
  description:
    "对照性别暴力中常见的侵害信号，并了解留证、隐私保护与断联等自我保护方法，帮助看清处境并寻求支持。",
};

export default function AbuseTypesPage() {
  const sections = getAbuseTypesSections();

  return <AbuseTypesArticle sections={sections} />;
}

import type { Metadata } from "next";
import { ReportsPage } from "@/components/ReportsPage";
import { getReports } from "@/lib/reports";

export const metadata: Metadata = {
  title: "相关报道",
  description: "符月华事件相关公开报道与资料外链索引",
};

export default function ReportsRoute() {
  const data = getReports();

  return <ReportsPage data={data} />;
}

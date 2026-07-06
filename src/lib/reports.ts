import fs from "fs";
import path from "path";

const REPORTS_PATH = path.join(process.cwd(), "res/reports/reports.json");

export type ReportLink = {
  label: string;
  url: string;
};

export type ReportItem = {
  id: number;
  media: string;
  title: string;
  date?: string;
  url?: string;
  links?: ReportLink[];
  note?: string;
};

export type ReportsData = {
  intro: string;
  items: ReportItem[];
};

export function getReports(): ReportsData {
  const raw = fs.readFileSync(REPORTS_PATH, "utf-8");
  return JSON.parse(raw) as ReportsData;
}

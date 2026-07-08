import fs from "fs";
import path from "path";
import { parseSections, type Section } from "@/lib/article";

const HELP_DIR = path.join(process.cwd(), "res/help");
const HELP_JSON_PATH = path.join(HELP_DIR, "help.json");
const SAFETY_MD_PATH = path.join(HELP_DIR, "safety.md");

export type HelpContact = {
  type: "phone" | "wechat" | "email";
  label: string;
  value: string;
};

export type HelpOrgItem = {
  id: string;
  name: string;
  summary: string;
  contacts: HelpContact[];
  url?: string;
  tags?: string[];
  region?: string;
};

export type HelpLinkItem = {
  id: string;
  name: string;
  summary: string;
  url: string;
  locale?: string;
};

export type HelpLinkCategory = {
  id: string;
  title: string;
  items: HelpLinkItem[];
};

export type HelpEmergencyItem = {
  id: string;
  label: string;
  value: string;
  type: "phone";
  note: string;
};

export type HelpOrgSection = {
  id: string;
  title: string;
  description: string;
  items: HelpOrgItem[];
  categories?: never;
};

export type HelpLinksSection = {
  id: string;
  title: string;
  description: string;
  items?: never;
  categories: HelpLinkCategory[];
};

export type HelpSection = HelpOrgSection | HelpLinksSection;

export type HelpData = {
  meta: {
    title: string;
    subtitle: string;
    disclaimer: string;
    lastUpdated: string;
  };
  quickExit: {
    enabled: boolean;
    label: string;
    url: string;
  };
  emergency: HelpEmergencyItem[];
  sections: HelpSection[];
};

export function getHelpData(): HelpData {
  const raw = fs.readFileSync(HELP_JSON_PATH, "utf-8");
  return JSON.parse(raw) as HelpData;
}

export function getHelpSafetySections(): Section[] {
  const raw = fs.readFileSync(SAFETY_MD_PATH, "utf-8");
  return parseSections(raw);
}

export function phoneHref(value: string): string {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

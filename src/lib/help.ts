import fs from "fs";
import path from "path";

const HELP_DIR = path.join(process.cwd(), "res/help");
const HELP_JSON_PATH = path.join(HELP_DIR, "help.json");
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

export type HelpLinkLocale = "zh-Hans" | "zh-Hant" | "en";

export type HelpLinkItem = {
  id: string;
  name: string;
  summary: string;
  url: string;
  locale?: HelpLinkLocale;
};

const LINK_LOCALE_LABELS: Record<HelpLinkLocale, string> = {
  "zh-Hans": "简体中文",
  "zh-Hant": "繁体中文",
  en: "英文",
};

export function helpLinkLocaleLabel(locale?: string): string | null {
  if (!locale) return null;
  if (locale in LINK_LOCALE_LABELS) {
    return LINK_LOCALE_LABELS[locale as HelpLinkLocale];
  }
  if (locale === "zh") return "简体中文";
  return null;
}

export function linkCategoryAnchorId(categoryId: string) {
  return `help-links-${categoryId}`;
}

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
    intro?: string;
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

export function phoneHref(value: string): string {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}
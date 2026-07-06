import fs from "fs";
import path from "path";

const ARTICLE_DIR = path.join(process.cwd(), "res/article/0.1");

const PATHS = {
  hero: path.join(ARTICLE_DIR, "hero.md"),
  story: path.join(ARTICLE_DIR, "符月华传_生平.md"),
  justice: path.join(ARTICLE_DIR, "符月华传_正义与反思.md"),
  about: path.join(ARTICLE_DIR, "愿逐月华.md"),
} as const;

export type Section = {
  title: string;
  body: string;
};

function readFile(relative: keyof typeof PATHS): string {
  return fs.readFileSync(PATHS[relative], "utf-8");
}

export function parseSections(markdown: string): Section[] {
  const parts = markdown.split(/\n(?=## )/);
  return parts
    .filter((p) => p.startsWith("## "))
    .map((part) => {
      const newline = part.indexOf("\n");
      const title = part.slice(3, newline).trim();
      const body = part.slice(newline + 1).trim();
      return { title, body };
    });
}

function findSection(sections: Section[], keyword: string): Section | undefined {
  return sections.find((s) => s.title.includes(keyword));
}

function parseHeroPrologue(body: string): { lastWords: string; narrative: string[] } {
  const lines = body.split("\n");
  const quoteParts: string[] = [];
  const narrativeParts: string[] = [];
  let inQuote = false;

  for (const line of lines) {
    if (line.startsWith(">")) {
      inQuote = true;
      const text = line.replace(/^>\s?/, "").trim();
      if (text) quoteParts.push(text);
    } else if (inQuote && line.trim() === "") {
      continue;
    } else {
      inQuote = false;
      const text = line.trim();
      if (text) narrativeParts.push(text);
    }
  }

  return {
    lastWords: quoteParts.join("\n"),
    narrative: narrativeParts,
  };
}

export function getHeroContent() {
  const sections = parseSections(readFile("hero"));
  const prologue = findSection(sections, "引子");
  const { lastWords, narrative } = parseHeroPrologue(prologue?.body ?? "");
  return {
    lastWords,
    narrative,
    name: "符月华",
    dates: "2002.6.1 — 2025.1.18",
  };
}

export function getStorySections(): Section[] {
  return parseSections(readFile("story"));
}

export function getJusticeSections(): Section[] {
  return parseSections(readFile("justice"));
}

export function getAboutSections(): Section[] {
  return parseSections(readFile("about"));
}

/** Content between the H1 title and the first ## section (e.g. epigraph). */
export function getAboutPreamble(): string {
  const raw = readFile("about");
  const idx = raw.indexOf("\n## ");
  if (idx === -1) return "";
  const afterTitle = raw.indexOf("\n") + 1;
  return raw.slice(afterTitle, idx).trim();
}

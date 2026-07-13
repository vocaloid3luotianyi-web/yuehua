import fs from "fs";
import path from "path";
import type { Section, Subsection } from "@/lib/article";

const ABUSE_TYPES_MD_PATH = path.join(
  process.cwd(),
  "res/help/abuse-types.md",
);

const SECTION_SLUGS: Record<string, string> = {
  伤害的常见类型: "overview",
  面对持续伤害时的自我保护: "self-protection",
};

const SUBSECTION_SLUGS: Record<string, string> = {
  身体暴力: "physical",
  精神与言语暴力: "emotional",
  性暴力: "sexual",
  经济控制: "financial",
  数字暴力: "digital",
  跟踪骚扰: "stalking",
  "先留证，再行动": "document",
  守住隐私: "privacy",
  彻底断绝联系: "no-contact",
  面对校园中的权力侵害: "campus-power",
  "外界支持与自我保护可以并用": "legal-support",
};

function parseSubsection(part: string): Subsection {
  const newline = part.indexOf("\n");
  const title = part.slice(4, newline).trim();
  const body = part.slice(newline + 1).trim();
  return { title, body };
}

export function parseAbuseTypesSections(markdown: string): Section[] {
  const parts = markdown.split(/\n(?=## )/);

  return parts
    .filter((part) => part.startsWith("## "))
    .map((part) => {
      const newline = part.indexOf("\n");
      const title = part.slice(3, newline).trim();
      const rest = part.slice(newline + 1).trim();
      const subParts = rest.split(/\n(?=### )/);

      if (subParts[0]?.startsWith("### ")) {
        return {
          title,
          body: "",
          subsections: subParts.map(parseSubsection),
        };
      }

      const body = subParts[0]?.trim() ?? "";
      const subsections =
        subParts.length > 1 ? subParts.slice(1).map(parseSubsection) : undefined;

      return {
        title,
        body,
        subsections: subsections?.length ? subsections : undefined,
      };
    });
}

export function abuseTypesSectionId(title: string, index: number): string {
  const clean = title.replace(/^##\s*/, "").trim();
  const slug = SECTION_SLUGS[clean] ?? `section-${index}`;
  return `abuse-types-${slug}`;
}

export function abuseTypesSubsectionId(title: string, index: number): string {
  const slug = SUBSECTION_SLUGS[title] ?? `subsection-${index}`;
  return `abuse-types-${slug}`;
}

export function getAbuseTypesSections(): Section[] {
  const raw = fs.readFileSync(ABUSE_TYPES_MD_PATH, "utf-8");
  return parseAbuseTypesSections(raw);
}

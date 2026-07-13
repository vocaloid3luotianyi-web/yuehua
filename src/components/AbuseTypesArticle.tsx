import Link from "next/link";
import { ArticleReadingLayout } from "@/components/ArticleReadingLayout";
import type { Section } from "@/lib/article";
import { abuseTypesSectionId, abuseTypesSubsectionId } from "@/lib/abuse-types";
import { memorialLinkClassName } from "@/lib/link-styles";

type AbuseTypesArticleProps = {
  sections: Section[];
};

export function AbuseTypesArticle({ sections }: AbuseTypesArticleProps) {
  return (
    <ArticleReadingLayout
      footerVariant="help-abuse-types"
      sections={sections}
      sectionId={(section, index) => abuseTypesSectionId(section.title, index)}
      subsectionId={(_section, _sectionIndex, subsection, subsectionIndex) =>
        abuseTypesSubsectionId(subsection.title, subsectionIndex)
      }
      navTitle="目录"
      navDrawerTitle="识别伤害与自我保护"
      header={
        <header className="animate-fade-up mb-12 text-center">
          <p className="mb-4 text-xs tracking-[0.2em] text-memorial-muted">
            <Link
              href="/help"
              className={memorialLinkClassName}
            >
              求助与互助
            </Link>
            <span className="mx-2 text-memorial-border">/</span>
            <span className="text-memorial-warm">识别伤害与自我保护</span>
          </p>
          <h1 className="font-serif text-2xl tracking-[0.15em] text-memorial-ink md:text-3xl">
            识别伤害与自我保护
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-memorial-muted">
            对照性别暴力中常见的侵害类型，并了解留证、隐私保护与断联等方法——包括校园中的权力侵害。
          </p>
        </header>
      }
      footerNote={
        <p className="mb-10 text-center text-sm text-memorial-muted">
          若你需要紧急联系、援助机构或心理支持，请前往{" "}
          <Link
            href="/help"
            className={memorialLinkClassName}
          >
            求助与互助
          </Link>
          。
        </p>
      }
    />
  );
}

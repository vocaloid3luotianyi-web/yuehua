import { ArticleReadingLayout } from "@/components/ArticleReadingLayout";
import { MarkdownProse } from "@/components/MarkdownProse";
import type { Section } from "@/lib/article";

type AboutArticleProps = {
  preamble?: string;
  sections: Section[];
};

export function AboutArticle({ preamble, sections }: AboutArticleProps) {
  return (
    <ArticleReadingLayout
      footerVariant="about"
      sections={sections}
      sectionId={(_, index) => `about-${index}`}
      navDrawerTitle="页面目录"
      header={
        <header className="animate-fade-up mb-12 text-center">
          <h1 className="font-serif text-2xl tracking-[0.15em] text-memorial-ink md:text-3xl">
            愿逐月华
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-memorial-muted">
            关于这座纪念站的意义
          </p>
          {preamble && (
            <div className="prose-memorial mx-auto mt-10 max-w-lg text-center font-serif text-memorial-ink/85 [&_blockquote]:my-0 [&_blockquote]:border-none [&_blockquote]:p-0 [&_blockquote]:text-lg [&_blockquote]:italic [&_blockquote]:leading-relaxed [&_blockquote]:md:text-xl [&_em]:not-italic [&_p]:leading-relaxed [&_p]:text-memorial-muted">
              <MarkdownProse content={preamble} />
            </div>
          )}
        </header>
      }
    />
  );
}

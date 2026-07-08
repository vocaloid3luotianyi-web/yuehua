import { ArticleReadingLayout } from "@/components/ArticleReadingLayout";
import type { Section } from "@/lib/article";

type JusticeArticleProps = {
  sections: Section[];
};

export function JusticeArticle({ sections }: JusticeArticleProps) {
  return (
    <ArticleReadingLayout
      footerVariant="justice"
      sections={sections}
      sectionId={(_, index) => `justice-${index}`}
      header={
        <header className="animate-fade-up mb-12 text-center">
          <h1 className="font-serif text-2xl tracking-[0.15em] text-memorial-ink md:text-3xl">
            公义与追问
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-memorial-muted">
            司法进程 · 公共讨论
          </p>
        </header>
      }
    />
  );
}

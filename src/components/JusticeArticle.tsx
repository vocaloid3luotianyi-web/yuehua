import { MarkdownProse } from "@/components/MarkdownProse";
import { PageFooter } from "@/components/PageFooter";
import type { Section } from "@/lib/article";

type JusticeArticleProps = {
  sections: Section[];
};

export function JusticeArticle({ sections }: JusticeArticleProps) {
  return (
    <div className="relative mx-auto max-w-prose px-5 pb-8 pt-12">
      <header className="animate-fade-up mb-12 text-center">
        <h1 className="font-serif text-2xl tracking-[0.15em] text-memorial-ink md:text-3xl">
          公义与追问
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-memorial-muted">
          司法进程 · 公共讨论
        </p>
      </header>

      <article className="space-y-14">
        {sections.map((section, index) => (
          <section
            key={section.title}
            id={`justice-${index}`}
            className="border-b border-memorial-border/50 pb-14 last:border-none"
          >
            <h2 className="mb-8 font-serif text-xl text-memorial-ink md:text-2xl">
              {section.title.replace(/^##\s*/, "")}
            </h2>
            <MarkdownProse content={section.body} />
          </section>
        ))}
      </article>

      <PageFooter variant="justice" />
    </div>
  );
}

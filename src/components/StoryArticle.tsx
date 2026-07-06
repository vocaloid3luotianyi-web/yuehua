import { MarkdownProse } from "@/components/MarkdownProse";
import { TimelineNav } from "@/components/TimelineNav";
import { PageFooter } from "@/components/PageFooter";
import { sectionIdForTitle } from "@/lib/section-id";
import type { Section } from "@/lib/article";
import { storyTimeline } from "@/lib/timeline";

type StoryArticleProps = {
  sections: Section[];
};

export function StoryArticle({ sections }: StoryArticleProps) {
  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-8 lg:pt-12">
      <div className="animate-fade-up mb-10 text-center lg:mb-14">
        <h1 className="font-serif text-2xl tracking-[0.2em] text-memorial-ink md:text-3xl">
          愿逐月华流照君
        </h1>
        <p className="mt-3 text-sm text-memorial-muted">符月华传 · 生平</p>
      </div>

      <div className="lg:grid lg:grid-cols-[11rem_1fr] lg:gap-12 xl:grid-cols-[12rem_1fr] xl:gap-16">
        <aside className="mb-6 lg:mb-0 lg:self-stretch">
          <TimelineNav nodes={storyTimeline} />
        </aside>

        <article className="min-w-0 max-w-prose lg:max-w-none xl:mx-auto xl:max-w-prose">
          {sections.map((section, index) => {
            const id = sectionIdForTitle(section.title) ?? `section-${index}`;
            return (
              <section
                key={id}
                id={id}
                className="scroll-mt-32 border-b border-memorial-border/50 pb-14 pt-4 last:border-none lg:scroll-mt-28"
              >
                <h2 className="mb-8 font-serif text-xl leading-snug text-memorial-ink md:text-2xl">
                  {section.title.replace(/^##\s*/, "")}
                </h2>
                <MarkdownProse content={section.body} />
              </section>
            );
          })}
        </article>
      </div>

      <PageFooter variant="story" />
    </div>
  );
}

import { ArticleReadingLayout } from "@/components/ArticleReadingLayout";
import { TimelineNav } from "@/components/TimelineNav";
import { sectionIdForTitle } from "@/lib/section-id";
import type { Section } from "@/lib/article";
import { storyTimeline } from "@/lib/timeline";

type StoryArticleProps = {
  sections: Section[];
};

export function StoryArticle({ sections }: StoryArticleProps) {
  return (
    <ArticleReadingLayout
      footerVariant="story"
      sections={sections}
      sectionId={(section, index) =>
        sectionIdForTitle(section.title) ?? `section-${index}`
      }
      sidebar={<TimelineNav nodes={storyTimeline} />}
      header={
        <div className="animate-fade-up mb-10 text-center lg:mb-14">
          <h1 className="font-serif text-2xl tracking-[0.2em] text-memorial-ink md:text-3xl">
            愿逐月华流照君
          </h1>
          <p className="mt-3 text-sm text-memorial-muted">符月华传 · 生平</p>
        </div>
      }
    />
  );
}

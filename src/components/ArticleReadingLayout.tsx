import { MarkdownProse } from "@/components/MarkdownProse";
import { PageFooter } from "@/components/PageFooter";
import { SectionNav } from "@/components/SectionNav";
import type { Section } from "@/lib/article";
import {
  MIN_SECTIONS_FOR_SIDEBAR,
  sectionTitle,
  type NavItem,
} from "@/lib/section-nav";
import type { ReactNode } from "react";

type FooterVariant = "story" | "justice" | "about";

type ArticleReadingLayoutProps = {
  header: ReactNode;
  sections: Section[];
  sectionId: (section: Section, index: number) => string;
  footerVariant: FooterVariant;
  sidebar?: ReactNode;
  navTitle?: string;
  navDrawerTitle?: string;
};

function buildNavItems(
  sections: Section[],
  sectionId: (section: Section, index: number) => string,
): NavItem[] {
  return sections.map((section, index) => ({
    id: sectionId(section, index),
    label: sectionTitle(section.title),
  }));
}

export function ArticleReadingLayout({
  header,
  sections,
  sectionId,
  footerVariant,
  sidebar,
  navTitle = "目录",
  navDrawerTitle,
}: ArticleReadingLayoutProps) {
  const useDualColumn =
    sidebar != null || sections.length >= MIN_SECTIONS_FOR_SIDEBAR;
  const navItems = buildNavItems(sections, sectionId);

  return (
    <div
      className={`relative mx-auto px-5 pb-8 pt-8 lg:pt-12 ${
        useDualColumn ? "max-w-6xl" : "max-w-3xl"
      }`}
    >
      {header}

      <div
        className={
          useDualColumn
            ? "lg:grid lg:grid-cols-[11rem_1fr] lg:gap-12 xl:grid-cols-[12rem_1fr] xl:gap-16"
            : undefined
        }
      >
        {useDualColumn && (
          <aside className="mb-6 lg:mb-0 lg:self-stretch">
            {sidebar ?? (
              <SectionNav
                items={navItems}
                title={navTitle}
                drawerTitle={navDrawerTitle}
              />
            )}
          </aside>
        )}

        <article
          className={
            useDualColumn
              ? "min-w-0 max-w-prose lg:max-w-none xl:mx-auto xl:max-w-prose"
              : undefined
          }
        >
          {sections.map((section, index) => {
            const id = sectionId(section, index);
            return (
              <section
                key={id}
                id={id}
                className={`border-b border-memorial-border/50 pb-14 pt-4 last:border-none ${
                  useDualColumn ? "scroll-mt-32 lg:scroll-mt-28" : "scroll-mt-28"
                }`}
              >
                <h2 className="mb-8 font-serif text-xl leading-snug text-memorial-ink md:text-2xl">
                  {sectionTitle(section.title)}
                </h2>
                <MarkdownProse content={section.body} />
              </section>
            );
          })}
        </article>
      </div>

      <PageFooter variant={footerVariant} />
    </div>
  );
}

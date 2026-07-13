import { MarkdownProse, type MarkdownProseVariant } from "@/components/MarkdownProse";
import { PageFooter } from "@/components/PageFooter";
import { SectionNav } from "@/components/SectionNav";
import type { Section, Subsection } from "@/lib/article";
import {
  MIN_SECTIONS_FOR_SIDEBAR,
  sectionTitle,
  type NavItem,
} from "@/lib/section-nav";
import type { ReactNode } from "react";
import type { FooterVariant } from "@/lib/site-pages";

type ArticleReadingLayoutProps = {
  header: ReactNode;
  sections: Section[];
  sectionId: (section: Section, index: number) => string;
  subsectionId?: (
    section: Section,
    sectionIndex: number,
    subsection: Subsection,
    subsectionIndex: number,
  ) => string;
  footerVariant: FooterVariant;
  sidebar?: ReactNode;
  navTitle?: string;
  navDrawerTitle?: string;
  footerNote?: ReactNode;
  proseVariant?: MarkdownProseVariant;
};

function buildNavItems(
  sections: Section[],
  sectionId: (section: Section, index: number) => string,
  subsectionId?: (
    section: Section,
    sectionIndex: number,
    subsection: Subsection,
    subsectionIndex: number,
  ) => string,
): NavItem[] {
  const items: NavItem[] = [];

  sections.forEach((section, sectionIndex) => {
    items.push({
      id: sectionId(section, sectionIndex),
      label: sectionTitle(section.title),
    });

    section.subsections?.forEach((subsection, subsectionIndex) => {
      if (!subsectionId) return;
      items.push({
        id: subsectionId(section, sectionIndex, subsection, subsectionIndex),
        label: subsection.title,
        indent: true,
      });
    });
  });

  return items;
}

export function ArticleReadingLayout({
  header,
  sections,
  sectionId,
  subsectionId,
  footerVariant,
  sidebar,
  navTitle = "目录",
  navDrawerTitle,
  footerNote,
  proseVariant = "default",
}: ArticleReadingLayoutProps) {
  const navItems = buildNavItems(sections, sectionId, subsectionId);
  const hasToc = sidebar != null || navItems.length >= MIN_SECTIONS_FOR_SIDEBAR;

  return (
    <div
      className={`relative mx-auto px-5 pb-8 pt-8 lg:pt-12 ${
        hasToc ? "max-w-3xl lg:max-w-6xl" : "max-w-3xl"
      }`}
    >
      {header}

      <div
        className={
          hasToc
            ? "lg:grid lg:grid-cols-[11rem_1fr] lg:gap-12 xl:grid-cols-[12rem_1fr] xl:gap-16"
            : undefined
        }
      >
        {hasToc && (
          <aside className="hidden lg:block lg:self-stretch">
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
            hasToc
              ? "min-w-0 lg:max-w-none xl:mx-auto xl:max-w-prose"
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
                  hasToc ? "scroll-mt-32 lg:scroll-mt-28" : "scroll-mt-28"
                }`}
              >
                <h2 className="mb-8 font-serif text-xl leading-snug text-memorial-ink md:text-2xl">
                  {sectionTitle(section.title)}
                </h2>
                {section.body ? (
                  <MarkdownProse content={section.body} variant={proseVariant} />
                ) : null}
                {section.subsections?.map((subsection, subsectionIndex) => {
                  const subId =
                    subsectionId?.(
                      section,
                      index,
                      subsection,
                      subsectionIndex,
                    ) ?? `${id}-${subsectionIndex}`;
                  return (
                    <div
                      key={subId}
                      id={subId}
                      className={`scroll-mt-32 lg:scroll-mt-28 ${
                        section.body || subsectionIndex > 0 ? "mt-10" : ""
                      }`}
                    >
                      <h3 className="mb-6 font-serif text-lg leading-snug text-memorial-ink md:text-xl">
                        {subsection.title}
                      </h3>
                      <MarkdownProse
                        content={subsection.body}
                        variant={proseVariant}
                      />
                    </div>
                  );
                })}
              </section>
            );
          })}
        </article>
      </div>

      {footerNote}

      <PageFooter variant={footerVariant} />
    </div>
  );
}

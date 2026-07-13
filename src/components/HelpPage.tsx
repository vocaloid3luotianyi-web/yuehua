import Link from "next/link";
import { PageFooter } from "@/components/PageFooter";
import { SectionNav } from "@/components/SectionNav";
import type {
  HelpContact,
  HelpData,
  HelpEmergencyItem,
  HelpLinkItem,
  HelpLinksSection,
  HelpOrgItem,
  HelpOrgSection,
  HelpSection,
} from "@/lib/help";
import { helpLinkLocaleLabel, linkCategoryAnchorId, phoneHref } from "@/lib/help";
import { memorialLinkClassName } from "@/lib/link-styles";
import type { NavItem } from "@/lib/section-nav";

type HelpPageProps = {
  data: HelpData;
};
const SECTION_SCROLL_CLASS = "scroll-mt-32 lg:scroll-mt-28";
const SECTION_DIVIDER_CLASS =
  "border-b border-memorial-border/50 pb-14 pt-4 first:pt-0 last:border-none";

const cardClassName =
  "rounded-2xl border border-memorial-border/70 bg-memorial-surface/50 px-5 py-5 transition-colors duration-300 hover:border-memorial-warm/40 hover:bg-memorial-surface/80 sm:px-6 sm:py-6";

const externalTitleLinkClassName = `inline-flex items-center gap-1 ${memorialLinkClassName}`;

const HELP_NAV_BASE: NavItem[] = [
  { id: "help-emergency", label: "紧急联系" },
  { id: "help-abuse-types", label: "识别伤害与自我保护" },
  { id: "help-organizations", label: "援助机构" },
  { id: "help-crisis", label: "心理支持" },
  { id: "help-links", label: "延伸阅读" },
];

function buildHelpNavItems(linksSection?: HelpLinksSection): NavItem[] {
  const items: NavItem[] = [...HELP_NAV_BASE];

  if (linksSection) {
    for (const category of linksSection.categories) {
      items.push({
        id: linkCategoryAnchorId(category.id),
        label: category.title,
        indent: true,
      });
    }
  }

  return items;
}
function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-memorial-border px-2 py-0.5 text-xs text-memorial-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function contactHref(contact: HelpContact): string | null {
  if (contact.type === "phone") return phoneHref(contact.value);
  if (contact.type === "email") return `mailto:${contact.value}`;
  return null;
}

function ContactList({ contacts }: { contacts: HelpContact[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {contacts.map((contact) => {
        const href = contactHref(contact);
        const isPhone = contact.type === "phone";

        return (
          <li
            key={`${contact.type}-${contact.label}-${contact.value}`}
            className="flex flex-wrap items-baseline gap-x-2"
          >
            <span className="text-xs text-memorial-muted">{contact.label}</span>
            {href ? (
              <a
                href={href}
                className={
                  isPhone
                    ? `font-serif text-lg tracking-wide ${memorialLinkClassName}`
                    : `text-sm ${memorialLinkClassName}`
                }
              >
                {contact.value}
              </a>
            ) : (
              <span className="text-sm text-memorial-ink">{contact.value}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function AbuseTypesHubCard() {
  return (
    <Link
      href="/help/abuse_types"
      className={`${cardClassName} group block`}
    >
      <h3 className="font-serif text-base text-memorial-ink transition-colors group-hover:text-memorial-gold">
        识别伤害与自我保护
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-memorial-muted">
        对照六类常见侵害信号，并了解留证、隐私保护与断联等自我保护方法。
      </p>
      <p className="mt-3 text-xs tracking-wide text-memorial-warm transition-colors group-hover:text-memorial-gold">
        阅读对照指南 →
      </p>
    </Link>
  );
}

function EmergencyCard({ item }: { item: HelpEmergencyItem }) {
  return (
    <div className="rounded-2xl border border-memorial-gold/30 bg-memorial-gold/5 px-5 py-5 sm:px-6 sm:py-6">
      <p className="font-serif text-sm tracking-wide text-memorial-warm">{item.label}</p>
      <a
        href={phoneHref(item.value)}
        className="mt-1 block font-serif text-3xl tracking-wider text-memorial-gold transition-opacity hover:opacity-80"
      >
        {item.value}
      </a>
      <p className="mt-2 text-xs leading-relaxed text-memorial-muted">{item.note}</p>
    </div>
  );
}

function OrgCard({ item }: { item: HelpOrgItem }) {
  return (
    <article className={cardClassName}>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-serif text-base">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={externalTitleLinkClassName}
            >
              {item.name}
              <span aria-hidden className="text-memorial-muted">
                ↗
              </span>
            </a>
          ) : (
            <span className="text-memorial-ink">{item.name}</span>
          )}
        </h3>
        {item.region && (
          <span className="text-xs text-memorial-muted">{item.region}</span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-memorial-muted">{item.summary}</p>
      <ContactList contacts={item.contacts} />
      <TagList tags={item.tags} />
    </article>
  );
}

function LinkCard({ item }: { item: HelpLinkItem }) {
  const localeLabel = helpLinkLocaleLabel(item.locale);

  return (
    <article className={`${cardClassName} flex h-full flex-col`}>
      <h3 className="mb-1 font-serif text-base">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={externalTitleLinkClassName}
        >
          {item.name}
          <span aria-hidden className="text-memorial-muted">
            ↗
          </span>
        </a>
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-memorial-muted">{item.summary}</p>
      {localeLabel && (
        <p className="mt-3 text-xs text-memorial-muted/70">{localeLabel}</p>
      )}
    </article>
  );
}

function isOrgSection(section: HelpSection): section is HelpOrgSection {
  return "items" in section && Array.isArray(section.items);
}

function sectionAnchorId(sectionId: string) {
  return `help-${sectionId}`;
}

function SectionBlock({ section }: { section: HelpSection }) {
  const anchorId = sectionAnchorId(section.id);

  if (isOrgSection(section)) {
    return (
      <section id={anchorId} className={`${SECTION_DIVIDER_CLASS} ${SECTION_SCROLL_CLASS}`}>
        <header className="mb-8">
          <h2 className="font-serif text-xl leading-snug text-memorial-ink md:text-2xl">
            {section.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-memorial-muted">
            {section.description}
          </p>
        </header>
        <ul className="space-y-4">
          {section.items.map((item) => (
            <li key={item.id}>
              <OrgCard item={item} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id={anchorId} className={`${SECTION_DIVIDER_CLASS} ${SECTION_SCROLL_CLASS}`}>
      <header className="mb-8">
        <h2 className="font-serif text-xl leading-snug text-memorial-ink md:text-2xl">
          {section.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-memorial-muted">
          {section.description}
        </p>
      </header>
      <div className="space-y-10">
        {section.categories.map((category) => (
          <div
            key={category.id}
            id={linkCategoryAnchorId(category.id)}
            className={SECTION_SCROLL_CLASS}
          >
            <h3 className="mb-4 font-serif text-sm tracking-wide text-memorial-warm">
              {category.title}
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {category.items.map((item) => (
                <li key={item.id} className="h-full">
                  <LinkCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HelpPage({ data }: HelpPageProps) {
  const orgSection = data.sections.find((s) => s.id === "organizations");
  const crisisSection = data.sections.find((s) => s.id === "crisis");
  const linksSection = data.sections.find(
    (s): s is HelpLinksSection => s.id === "links" && "categories" in s,
  );
  const otherSections = data.sections.filter(
    (s) => !["organizations", "crisis", "links"].includes(s.id),
  );
  const navItems = buildHelpNavItems(linksSection);
  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-8 lg:pt-12">
      <header className="animate-fade-up mb-12 text-center">
        <h1 className="font-serif text-2xl tracking-[0.15em] text-memorial-ink md:text-3xl">
          {data.meta.title}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-memorial-muted">
          {data.meta.subtitle}
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[11rem_1fr] lg:gap-12 xl:grid-cols-[12rem_1fr] xl:gap-16">
        <aside className="mb-6 lg:mb-0 lg:self-stretch">
          <SectionNav items={navItems} drawerTitle="页面目录" />
        </aside>

        <article className="min-w-0 max-w-prose lg:max-w-none xl:mx-auto xl:max-w-prose">
          {data.meta.intro && (
            <p className="mb-10 text-sm leading-relaxed text-memorial-muted/90">
              {data.meta.intro}
            </p>
          )}

          <section
            id="help-emergency"
            aria-label="紧急联系"
            className={`${SECTION_DIVIDER_CLASS} ${SECTION_SCROLL_CLASS}`}
          >
            <header className="mb-8">
              <h2 className="font-serif text-xl leading-snug text-memorial-ink md:text-2xl">
                紧急联系
              </h2>
            </header>
            <ul className="grid gap-4 sm:grid-cols-1">
              {data.emergency.map((item) => (
                <li key={item.id}>
                  <EmergencyCard item={item} />
                </li>
              ))}
            </ul>
          </section>

          <section
            id="help-abuse-types"
            aria-label="识别伤害与自我保护"
            className={`${SECTION_DIVIDER_CLASS} ${SECTION_SCROLL_CLASS}`}
          >
            <header className="mb-8">
              <h2 className="font-serif text-xl leading-snug text-memorial-ink md:text-2xl">
                识别伤害与自我保护
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-memorial-muted">
                若你不确定正在经历什么，可先对照侵害信号，并了解自我保护方法。
              </p>
            </header>
            <AbuseTypesHubCard />
          </section>

          {orgSection && <SectionBlock section={orgSection} />}          {crisisSection && <SectionBlock section={crisisSection} />}
          {linksSection && <SectionBlock section={linksSection} />}
          {otherSections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}

          <p className="mt-14 text-center text-xs leading-relaxed text-memorial-muted">            {data.meta.disclaimer}
            <br />
            <span className="mt-1 inline-block">信息更新：{data.meta.lastUpdated}</span>
          </p>
        </article>
      </div>

      <PageFooter variant="help" />
    </div>
  );
}

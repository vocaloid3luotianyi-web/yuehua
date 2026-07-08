import { MarkdownProse } from "@/components/MarkdownProse";
import { PageFooter } from "@/components/PageFooter";
import { QuickExitButton } from "@/components/QuickExitButton";
import type { Section } from "@/lib/article";
import type {
  HelpContact,
  HelpData,
  HelpEmergencyItem,
  HelpLinkItem,
  HelpOrgItem,
  HelpOrgSection,
  HelpSection,
} from "@/lib/help";
import { phoneHref } from "@/lib/help";

type HelpPageProps = {
  data: HelpData;
  safetySections: Section[];
};

const cardClassName =
  "group rounded-2xl border border-memorial-border/70 bg-memorial-surface/50 px-5 py-5 transition-colors duration-300 hover:border-memorial-warm/40 hover:bg-memorial-surface/80 sm:px-6 sm:py-6";

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

function ContactList({ contacts }: { contacts: HelpContact[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {contacts.map((contact) => (
        <li key={`${contact.type}-${contact.value}`} className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-xs text-memorial-muted">{contact.label}</span>
          {contact.type === "phone" ? (
            <a
              href={phoneHref(contact.value)}
              className="font-serif text-lg tracking-wide text-memorial-ink transition-colors hover:text-memorial-gold"
            >
              {contact.value}
            </a>
          ) : (
            <span className="text-sm text-memorial-ink">{contact.value}</span>
          )}
        </li>
      ))}
    </ul>
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
  const content = (
    <>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-serif text-base text-memorial-ink">{item.name}</h3>
        {item.region && (
          <span className="text-xs text-memorial-muted">{item.region}</span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-memorial-muted">{item.summary}</p>
      <ContactList contacts={item.contacts} />
      <TagList tags={item.tags} />
    </>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardClassName} block`}
      >
        {content}
        <span aria-hidden className="mt-2 inline-block text-memorial-muted">↗</span>
      </a>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

function LinkCard({ item }: { item: HelpLinkItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardClassName} flex h-full flex-col`}
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="font-serif text-base text-memorial-ink transition-colors group-hover:text-memorial-ink">
          {item.name}
        </h3>
        <span aria-hidden className="shrink-0 text-memorial-muted transition-transform group-hover:translate-x-0.5">
          ↗
        </span>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-memorial-muted">{item.summary}</p>
      {item.locale && (
        <p className="mt-3 text-xs text-memorial-muted/70">{item.locale.toUpperCase()}</p>
      )}
    </a>
  );
}

function isOrgSection(section: HelpSection): section is HelpOrgSection {
  return "items" in section && Array.isArray(section.items);
}

function SectionBlock({ section }: { section: HelpSection }) {
  if (isOrgSection(section)) {
    return (
      <section className="mt-14">
        <header className="mb-6">
          <h2 className="font-serif text-lg tracking-wide text-memorial-ink">{section.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-memorial-muted">{section.description}</p>
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
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="font-serif text-lg tracking-wide text-memorial-ink">{section.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-memorial-muted">{section.description}</p>
      </header>
      <div className="space-y-10">
        {section.categories.map((category) => (
          <div key={category.id}>
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

export function HelpPage({ data, safetySections }: HelpPageProps) {
  const safetyIntro = safetySections[0];

  return (
    <div className="relative mx-auto max-w-2xl px-5 pb-8 pt-12">
      {data.quickExit.enabled && (
        <QuickExitButton label={data.quickExit.label} url={data.quickExit.url} />
      )}

      <header className="animate-fade-up mb-10 text-center">
        <h1 className="font-serif text-2xl tracking-[0.15em] text-memorial-ink md:text-3xl">
          {data.meta.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-memorial-muted">
          {data.meta.subtitle}
        </p>
      </header>

      {safetyIntro && (
        <aside
          className="animate-fade-up animation-delay-100 mb-10 rounded-2xl border border-amber-200/60
            bg-amber-50/70 px-5 py-5 sm:px-6"
          aria-label="浏览安全提示"
        >
          <h2 className="font-serif text-sm tracking-wide text-memorial-ink">
            {safetyIntro.title}
          </h2>
          <div className="mt-3 text-sm leading-relaxed text-memorial-ink/85 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:mb-0 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <MarkdownProse content={safetyIntro.body} />
          </div>
        </aside>
      )}

      <section aria-label="紧急求助">
        <h2 className="mb-4 font-serif text-lg tracking-wide text-memorial-ink">紧急求助</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {data.emergency.map((item) => (
            <li key={item.id}>
              <EmergencyCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      {data.sections.map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}

      {safetySections.length > 1 && (
        <section className="mt-14 border-t border-memorial-border/60 pt-12">
          <h2 className="mb-8 text-center font-serif text-lg tracking-wide text-memorial-ink">
            自测与证据保全
          </h2>
          <div className="space-y-10">
            {safetySections.slice(1).map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 font-serif text-base tracking-wide text-memorial-warm">
                  {section.title}
                </h3>
                <MarkdownProse content={section.body} />
              </div>
            ))}
          </div>
        </section>
      )}

      <p className="mt-14 text-center text-xs leading-relaxed text-memorial-muted">
        {data.meta.disclaimer}
        <br />
        <span className="mt-1 inline-block">信息更新：{data.meta.lastUpdated}</span>
      </p>

      <PageFooter variant="help" />
    </div>
  );
}

import { PageFooter } from "@/components/PageFooter";
import type { ReportItem, ReportsData } from "@/lib/reports";

type ReportsPageProps = {
  data: ReportsData;
};

function formatDate(date?: string): string | null {
  if (!date) return null;
  return date;
}

function ReportEntry({ item }: { item: ReportItem }) {
  const dateLabel = formatDate(item.date) ?? item.note;
  const hasLinks = item.links && item.links.length > 0;

  return (
    <li className="group rounded-2xl border border-memorial-border/70 bg-memorial-surface/50 px-5 py-5 transition-colors
      duration-300 hover:border-memorial-warm/40 hover:bg-memorial-surface/80 sm:px-6 sm:py-6">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-sm tracking-wide text-memorial-warm">
          {item.media}
        </span>
        {dateLabel && (
          <time className="text-xs text-memorial-muted">{dateLabel}</time>
        )}
      </div>

      {item.url && !hasLinks ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[1.05rem] leading-relaxed text-memorial-ink transition-colors
            group-hover:text-memorial-ink hover:underline hover:decoration-memorial-warm/60
            hover:underline-offset-4"
        >
          {item.title}
          <span
            aria-hidden
            className="ml-1.5 inline-block text-memorial-muted transition-transform group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      ) : (
        <p className="text-[1.05rem] leading-relaxed text-memorial-ink/90">{item.title}</p>
      )}

      {hasLinks && (
        <ul className="mt-3 space-y-2">
          {item.links!.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-memorial-ink/85
                  transition-colors hover:text-memorial-ink hover:underline hover:decoration-memorial-warm/60
                  hover:underline-offset-4"
              >
                {link.label}
                <span aria-hidden className="text-memorial-muted">↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {!item.url && !hasLinks && item.note && item.date && (
        <p className="mt-2 text-xs text-memorial-muted">{item.note}</p>
      )}
    </li>
  );
}

export function ReportsPage({ data }: ReportsPageProps) {
  return (
    <div className="relative mx-auto max-w-prose px-5 pb-8 pt-12">
      <header className="animate-fade-up mb-12 text-center">
        <h1 className="font-serif text-2xl tracking-[0.15em] text-memorial-ink md:text-3xl">
          相关报道
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-memorial-muted">
          公开报道与资料索引
        </p>
      </header>

      <ol className="space-y-4">
        {data.items.map((item) => (
          <ReportEntry key={item.id} item={item} />
        ))}
      </ol>

      <PageFooter variant="reports" />
    </div>
  );
}

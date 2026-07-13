import Link from "next/link";
import { MoonLogo } from "@/components/MoonLogo";
import {
  footerVariantToHref,
  getAdjacentPages,
  type FooterVariant,
} from "@/lib/site-pages";
import { SITE_TITLE } from "@/lib/site";

type PageFooterProps = {
  variant?: FooterVariant;
};

const footerLinkClassName =
  "group inline-flex items-center gap-2 rounded-full border border-memorial-border bg-memorial-surface px-6 py-2.5 text-sm text-memorial-ink shadow-sm transition-all duration-300 hover:border-memorial-warm/50 hover:shadow-md";

export function PageFooter({ variant = "home" }: PageFooterProps) {
  const { prev, next } = getAdjacentPages(footerVariantToHref[variant]);
  const showNav = variant !== "home" && (prev || next);

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-memorial-border py-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_top,rgba(196,168,130,0.1)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-5 text-center">
        {showNav && (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
            {prev ? (
              <Link href={prev.href} className={footerLinkClassName}>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                >
                  ←
                </span>
                {prev.label}
              </Link>
            ) : null}
            {next ? (
              <Link href={next.href} className={footerLinkClassName}>
                {next.label}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            ) : null}
          </div>
        )}

        <div className="animate-fade-in">
          <div
            className="mx-auto mb-5 flex w-32 items-center gap-3 text-memorial-gold/70"
            aria-hidden
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-memorial-gold/35" />
            <MoonLogo size={14} />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-memorial-gold/35" />
          </div>

          <p className="font-serif text-sm tracking-[0.35em] text-memorial-ink/85 md:text-base">
            愿逐月华流照君
          </p>
          <p className="mt-3 text-xs tracking-[0.25em] text-memorial-muted/60">
            符月华纪念站
          </p>

        </div>
      </div>
    </footer>
  );
}

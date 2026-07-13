"use client";

import { MobileTocDrawer } from "@/components/MobileTocDrawer";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import type { NavItem } from "@/lib/section-nav";

type SectionNavProps = {
  items: NavItem[];
  title?: string;
  drawerTitle?: string;
};

export function SectionNav({
  items,
  title = "目录",
  drawerTitle,
}: SectionNavProps) {
  const { activeId, scrollTo } = useSectionScroll(items);

  return (
    <>
      <nav
        aria-label={title}
        className="hidden lg:sticky lg:top-24 lg:z-10 lg:block"
      >
        <p className="mb-6 font-serif text-xs tracking-[0.25em] text-memorial-muted">
          {title}
        </p>
        <ol className="space-y-1">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`group w-full rounded-lg py-2 pr-2 text-left transition-colors duration-300 ${
                    item.indent ? "py-1.5 text-xs" : "text-sm"
                  } ${
                    active
                      ? "text-memorial-ink"
                      : "text-memorial-muted hover:text-memorial-ink/80"
                  }`}
                >
                  <span
                    className={`block border-l-2 transition-colors duration-300 ${
                      item.indent ? "pl-6" : "pl-3"
                    } ${
                      active
                        ? "border-memorial-warm text-memorial-ink"
                        : "border-transparent group-hover:border-memorial-border"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <MobileTocDrawer
        items={items}
        activeId={activeId}
        onNavigate={scrollTo}
        title={drawerTitle ?? title}
      />
    </>
  );
}

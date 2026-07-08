"use client";

import { MobileTocDrawer } from "@/components/MobileTocDrawer";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import type { TimelineNode } from "@/lib/timeline";

type TimelineNavProps = {
  nodes: TimelineNode[];
};

export function TimelineNav({ nodes }: TimelineNavProps) {
  const items = nodes.map((node) => ({
    id: node.id,
    label: node.label,
    sublabel: node.year,
  }));
  const { activeId, scrollTo } = useSectionScroll(items);

  return (
    <>
      <nav
        aria-label="生平时间线"
        className="hidden lg:sticky lg:top-24 lg:z-10 lg:block"
      >
        <p className="mb-6 font-serif text-xs tracking-[0.25em] text-memorial-muted">
          人生脉络
        </p>
        <ol className="relative space-y-0">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-memorial-warm/40 via-memorial-border to-memorial-border" />
          {nodes.map((node) => {
            const active = activeId === node.id;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(node.id)}
                  className="group flex w-full items-start gap-4 rounded-lg py-2.5 pl-0 pr-2 text-left transition-colors duration-300"
                >
                  <span
                    className={`relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 transition-[transform,background-color,border-color,box-shadow] duration-300 ${
                      active
                        ? "scale-110 border-memorial-warm bg-memorial-warm shadow-[0_0_12px_rgba(196,168,130,0.45)]"
                        : "border-memorial-border bg-memorial-bg group-hover:border-memorial-warm/60"
                    }`}
                  />
                  <span className="min-w-0">
                    <span
                      className={`block font-serif text-[11px] tracking-wider transition-colors duration-300 ${
                        active ? "text-memorial-warm" : "text-memorial-muted"
                      }`}
                    >
                      {node.year}
                    </span>
                    <span
                      className={`block text-sm transition-colors duration-300 ${
                        active
                          ? "text-memorial-ink"
                          : "text-memorial-muted group-hover:text-memorial-ink/80"
                      }`}
                    >
                      {node.label}
                    </span>
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
        title="故事章节"
      />
    </>
  );
}

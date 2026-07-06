"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TimelineNode } from "@/lib/timeline";

type TimelineNavProps = {
  nodes: TimelineNode[];
};

function getScrollOffset() {
  return window.matchMedia("(min-width: 1024px)").matches ? 112 : 128;
}

function activeSectionFromScroll(nodes: TimelineNode[], offset: number) {
  let active = nodes[0]?.id ?? "";
  for (const node of nodes) {
    const el = document.getElementById(node.id);
    if (el && el.getBoundingClientRect().top <= offset + 8) {
      active = node.id;
    }
  }
  return active;
}

export function TimelineNav({ nodes }: TimelineNavProps) {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  const scrollTargetRef = useRef<string | null>(null);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const releaseScrollLock = useCallback(() => {
    scrollTargetRef.current = null;
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
      scrollLockTimerRef.current = null;
    }
  }, []);

  const syncActiveFromScroll = useCallback(() => {
    if (scrollTargetRef.current) return;
    const next = activeSectionFromScroll(nodes, getScrollOffset());
    if (next) setActiveId(next);
  }, [nodes]);

  useEffect(() => {
    syncActiveFromScroll();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncActiveFromScroll();
        ticking = false;
      });
    };

    const onScrollEnd = () => {
      if (scrollTargetRef.current) {
        setActiveId(scrollTargetRef.current);
        releaseScrollLock();
      } else {
        syncActiveFromScroll();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", syncActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", syncActiveFromScroll);
      releaseScrollLock();
    };
  }, [nodes, releaseScrollLock, syncActiveFromScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }

    scrollTargetRef.current = id;
    setActiveId(id);

    const offset = getScrollOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    const delta = Math.abs(window.scrollY - top);

    if (delta < 2) {
      releaseScrollLock();
      return;
    }

    scrollLockTimerRef.current = setTimeout(releaseScrollLock, 1200);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop sidebar */}
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

      {/* Mobile horizontal strip */}
      <div className="lg:hidden">
        <div className="sticky top-14 z-40 -mx-5 border-b border-memorial-border/80 bg-memorial-bg/90 px-5 py-3 backdrop-blur-md">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {nodes.map((node) => {
              const active = activeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => scrollTo(node.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors duration-300 ${
                    active
                      ? "bg-memorial-ink text-memorial-bg shadow-sm"
                      : "bg-memorial-surface text-memorial-muted ring-1 ring-memorial-border"
                  }`}
                >
                  {node.year} · {node.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

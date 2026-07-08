"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  activeSectionFromScroll,
  getScrollOffset,
  type NavItem,
} from "@/lib/section-nav";

export function useSectionScroll(items: NavItem[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
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
    const next = activeSectionFromScroll(items, getScrollOffset());
    if (next) setActiveId(next);
  }, [items]);

  useEffect(() => {
    setActiveId(items[0]?.id ?? "");
  }, [items]);

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
  }, [items, releaseScrollLock, syncActiveFromScroll]);

  const scrollTo = useCallback(
    (id: string) => {
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
    },
    [releaseScrollLock],
  );

  return { activeId, scrollTo };
}

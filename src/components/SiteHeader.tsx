"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MoonLogo } from "@/components/MoonLogo";
import { SiteNav } from "@/components/SiteNav";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-memorial-border/80 bg-memorial-bg/85 backdrop-blur-md relative">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-memorial-ink transition-opacity hover:opacity-70"
        >
          <MoonLogo
            size={18}
            className="text-memorial-gold transition-opacity group-hover:opacity-80"
          />
          <span className="font-serif text-sm tracking-widest">符月华纪念站</span>
        </Link>

        <SiteNav pathname={pathname} variant="desktop" />

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-memorial-ink transition-colors hover:bg-memorial-border/50 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "关闭菜单" : "打开菜单"}</span>
          {menuOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-40 bg-memorial-ink/15 md:hidden"
            aria-label="关闭菜单"
            onClick={() => setMenuOpen(false)}
          />
          <SiteNav
            pathname={pathname}
            variant="mobile"
            onNavigate={() => setMenuOpen(false)}
          />
        </>
      ) : null}
    </header>
  );
}

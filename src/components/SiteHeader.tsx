"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MoonLogo } from "@/components/MoonLogo";
import { sitePages } from "@/lib/site-pages";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function navLinkClass(active: boolean, variant: "pill" | "menu") {
  const base = "transition-all duration-300";
  if (variant === "pill") {
    return `${base} rounded-full px-3 py-1.5 text-sm ${
      active
        ? "bg-memorial-ink text-memorial-bg"
        : "text-memorial-muted hover:bg-memorial-border/50 hover:text-memorial-ink"
    }`;
  }
  return `${base} block rounded-lg px-4 py-3 font-serif text-base ${
    active
      ? "bg-memorial-ink text-memorial-bg"
      : "text-memorial-ink hover:bg-memorial-border/50"
  }`;
}

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

        <nav
          aria-label="站点导航"
          className="hidden gap-1 md:flex md:gap-2"
        >
          {sitePages.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={navLinkClass(active, "pill")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

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
          <nav
            id="mobile-nav"
            aria-label="站点导航"
            className="absolute inset-x-0 top-full z-50 border-b border-memorial-border/80 bg-memorial-bg/95 px-5 py-4 shadow-lg shadow-memorial-ink/5 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {sitePages.map(({ href, label }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={navLinkClass(active, "menu")}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}

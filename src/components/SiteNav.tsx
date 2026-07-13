"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  isNavGroupActive,
  isNavItemActive,
  navGroups,
  type NavGroup,
} from "@/lib/site-pages";

type SiteNavProps = {
  pathname: string;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function NavGroupLinks({
  group,
  pathname,
  linkClassName,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  linkClassName: (active: boolean) => string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-0.5">
      {group.items.map(({ href, label }) => {
        const active = isNavItemActive(pathname, href, group.items);
        return (
          <li key={href}>
            <Link
              href={href}
              className={linkClassName(active)}
              onClick={onNavigate}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function DesktopNavGroup({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const groupActive = isNavGroupActive(pathname, group);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        id={`${menuId}-trigger`}
        aria-expanded={open}
        aria-controls={`${menuId}-menu`}
        aria-haspopup="true"
        className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all duration-300 ${
          groupActive
            ? "bg-memorial-ink text-memorial-bg"
            : "text-memorial-muted hover:bg-memorial-border/50 hover:text-memorial-ink"
        }`}
        onClick={() => setOpen((value) => !value)}
      >
        {group.label}
        <Chevron open={open} />
      </button>

      {open ? (
        <div className="absolute left-1/2 top-full z-50 min-w-[11rem] -translate-x-1/2 pt-1.5">
          <div
            id={`${menuId}-menu`}
            role="menu"
            aria-labelledby={`${menuId}-trigger`}
            className="rounded-xl border border-memorial-border/80 bg-memorial-bg/95 p-1.5 shadow-lg shadow-memorial-ink/5 backdrop-blur-md"
          >
            <NavGroupLinks
              group={group}
              pathname={pathname}
              linkClassName={(active) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-memorial-ink text-memorial-bg"
                    : "text-memorial-ink hover:bg-memorial-border/50"
                }`
              }
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileNavGroup({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate?: () => void;
}) {
  const groupActive = isNavGroupActive(pathname, group);
  const [expanded, setExpanded] = useState(groupActive);
  const singleItem = group.items.length === 1;

  if (singleItem) {
    const { href, label } = group.items[0];
    const active = isNavItemActive(pathname, href, group.items);
    return (
      <li>
        <Link
          href={href}
          className={`block rounded-lg px-4 py-3 font-serif text-base transition-all duration-300 ${
            active
              ? "bg-memorial-ink text-memorial-bg"
              : "text-memorial-ink hover:bg-memorial-border/50"
          }`}
          onClick={onNavigate}
        >
          {group.label}
          <span className="mt-0.5 block text-xs tracking-wide text-inherit/70">
            {label}
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 font-serif text-base transition-all duration-300 ${
          groupActive
            ? "bg-memorial-ink/10 text-memorial-ink"
            : "text-memorial-ink hover:bg-memorial-border/50"
        }`}
        onClick={() => setExpanded((value) => !value)}
      >
        {group.label}
        <Chevron open={expanded} />
      </button>
      {expanded ? (
        <div className="mt-1 pl-2">
          <NavGroupLinks
            group={group}
            pathname={pathname}
            linkClassName={(active) =>
              `block rounded-lg px-4 py-2.5 font-serif text-sm transition-all duration-300 ${
                active
                  ? "bg-memorial-ink text-memorial-bg"
                  : "text-memorial-muted hover:bg-memorial-border/50 hover:text-memorial-ink"
              }`
            }
            onNavigate={onNavigate}
          />
        </div>
      ) : null}
    </li>
  );
}

export function SiteNav({ pathname, variant, onNavigate }: SiteNavProps) {
  if (variant === "desktop") {
    return (
      <nav aria-label="站点导航" className="hidden items-center gap-1 md:flex">
        {navGroups.map((group) => (
          <DesktopNavGroup key={group.id} group={group} pathname={pathname} />
        ))}
      </nav>
    );
  }

  return (
    <nav
      id="mobile-nav"
      aria-label="站点导航"
      className="absolute inset-x-0 top-full z-50 border-b border-memorial-border/80 bg-memorial-bg/95 px-5 py-4 shadow-lg shadow-memorial-ink/5 backdrop-blur-md md:hidden"
    >
      <ul className="flex flex-col gap-1">
        {navGroups.map((group) => (
          <MobileNavGroup
            key={group.id}
            group={group}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  );
}

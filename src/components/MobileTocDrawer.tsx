"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { NavItem } from "@/lib/section-nav";

type MobileTocDrawerProps = {
  items: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  title?: string;
};

function ListIcon() {
  return (
    <svg
      aria-hidden
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm-.375 5.25h.007v.008H3.75V18zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export function MobileTocDrawer({
  items,
  activeId,
  onNavigate,
  title = "目录",
}: MobileTocDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen]);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  if (items.length === 0 || !mounted) return null;

  return createPortal(
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="打开目录"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-memorial-border/50 bg-memorial-bg/90 text-memorial-ink shadow-lg backdrop-blur transition-transform active:scale-95"
      >
        <ListIcon />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-memorial-border/50 bg-memorial-bg p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between border-b border-memorial-border/40 pb-4">
              <h3 className="font-serif text-base text-memorial-ink">{title}</h3>
              <button
                type="button"
                aria-label="关闭目录"
                onClick={() => setIsOpen(false)}
                className="text-memorial-ink/60"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {items.map((item) => {
                const active = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`rounded-lg py-2.5 text-left transition-colors ${
                      item.indent ? "pl-4" : ""
                    } ${
                      active
                        ? "text-memorial-gold"
                        : "text-memorial-ink/80 active:text-memorial-gold"
                    }`}
                  >
                    {item.sublabel && (
                      <span className="mb-0.5 block font-serif text-[11px] tracking-wider text-memorial-muted">
                        {item.sublabel}
                      </span>
                    )}
                    <span
                      className={`block border-b border-memorial-border/20 pb-2 font-serif ${
                        item.indent ? "text-xs" : "text-sm"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>,
    document.body,
  );
}

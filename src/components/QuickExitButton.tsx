"use client";

import { useEffect } from "react";

type QuickExitButtonProps = {
  label: string;
  url: string;
};

export function QuickExitButton({ label, url }: QuickExitButtonProps) {
  const handleQuickExit = () => {
    window.location.replace(url);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.location.replace(url);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [url]);

  return (
    <button
      type="button"
      onClick={handleQuickExit}
      className="fixed bottom-5 right-5 z-40 rounded-full border border-memorial-border
        bg-memorial-surface/95 px-4 py-2.5 text-xs font-medium text-memorial-ink shadow-md
        shadow-memorial-ink/10 backdrop-blur-sm transition-all duration-300
        hover:border-memorial-warm/50 hover:shadow-lg sm:bottom-6 sm:right-6 sm:px-5 sm:text-sm"
      aria-label={`${label}，按 Esc 键也可触发`}
    >
      {label}
    </button>
  );
}

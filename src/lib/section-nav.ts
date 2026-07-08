export type NavItem = {
  id: string;
  label: string;
  sublabel?: string;
};

export function getScrollOffset() {
  if (typeof window === "undefined") return 128;
  return window.matchMedia("(min-width: 1024px)").matches ? 112 : 128;
}

export function activeSectionFromScroll(items: NavItem[], offset: number) {
  let active = items[0]?.id ?? "";
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (el && el.getBoundingClientRect().top <= offset + 8) {
      active = item.id;
    }
  }
  return active;
}

export function sectionTitle(title: string) {
  return title.replace(/^##\s*/, "");
}

export const MIN_SECTIONS_FOR_SIDEBAR = 3;

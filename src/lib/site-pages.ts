export type SitePage = {
  href: string;
  label: string;
};

export const sitePages: SitePage[] = [
  { href: "/", label: "首页" },
  { href: "/story", label: "她的生平" },
  { href: "/justice", label: "公义与追问" },
  { href: "/about", label: "愿逐月华" },
  { href: "/reports", label: "相关报道" },
];

export function getAdjacentPages(href: string) {
  const index = sitePages.findIndex((page) => page.href === href);
  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? sitePages[index - 1] : null,
    next: index < sitePages.length - 1 ? sitePages[index + 1] : null,
  };
}

export const footerVariantToHref = {
  home: "/",
  story: "/story",
  justice: "/justice",
  about: "/about",
  reports: "/reports",
} as const;

export type FooterVariant = keyof typeof footerVariantToHref;

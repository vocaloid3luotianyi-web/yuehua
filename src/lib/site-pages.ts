export type SitePage = {
  href: string;
  label: string;
};

export type NavGroup = {
  id: string;
  label: string;
  items: SitePage[];
};

/** 顶栏三大模块；首页仅通过 Logo 进入 */
export const navGroups: NavGroup[] = [
  {
    id: "story",
    label: "她的故事",
    items: [
      { href: "/story", label: "她的生平" },
      { href: "/justice", label: "公义与追问" },
      { href: "/reports", label: "相关报道" },
    ],
  },
  {
    id: "about",
    label: "关于本站",
    items: [{ href: "/about", label: "愿逐月华" }],
  },
  {
    id: "help",
    label: "帮助支持",
    items: [
      { href: "/help", label: "求助与互助" },
      { href: "/help/abuse_types", label: "识别伤害与自我保护" },
    ],
  },
];

/** 页脚「上一页 / 下一页」阅读顺序：首页 + 顶栏各组条目顺序 */
export const readingOrder: SitePage[] = [
  { href: "/", label: "首页" },
  ...navGroups.flatMap((group) => group.items),
];

/** @deprecated 使用 navGroups；保留以兼容旧引用 */
export const sitePages = readingOrder;

export function getActiveHref(pathname: string, items: SitePage[]) {
  let best: string | null = null;
  for (const { href } of items) {
    const matches =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);
    if (matches && (!best || href.length > best.length)) {
      best = href;
    }
  }
  return best;
}

export function isNavItemActive(
  pathname: string,
  href: string,
  siblings: SitePage[],
) {
  return getActiveHref(pathname, siblings) === href;
}

export function isNavGroupActive(pathname: string, group: NavGroup) {
  return getActiveHref(pathname, group.items) !== null;
}

export function getAdjacentPages(href: string) {
  const index = readingOrder.findIndex((page) => page.href === href);
  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? readingOrder[index - 1] : null,
    next: index < readingOrder.length - 1 ? readingOrder[index + 1] : null,
  };
}

export const footerVariantToHref = {
  home: "/",
  story: "/story",
  justice: "/justice",
  about: "/about",
  help: "/help",
  "help-abuse-types": "/help/abuse_types",
  reports: "/reports",
} as const;

export type FooterVariant = keyof typeof footerVariantToHref;

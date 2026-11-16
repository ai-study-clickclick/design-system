// 라이브러리 왼쪽 메뉴. 순서대로 이전 · 다음 문서 링크도 만든다
export type NavItem = { href: string; title: string; ready?: boolean };
export type NavGroup = { title: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    title: "시작",
    items: [{ href: "/docs", title: "개요", ready: true }],
  },
  {
    title: "토큰",
    items: [
      { href: "/docs/tokens/color", title: "색", ready: true },
      { href: "/docs/tokens/typography", title: "글자", ready: true },
      { href: "/docs/tokens/spacing", title: "간격", ready: true },
      { href: "/docs/tokens/radius", title: "라운드", ready: true },
      { href: "/docs/tokens/shadow", title: "그림자", ready: true },
    ],
  },
  {
    title: "컴포넌트",
    items: [{ href: "/docs/components", title: "MVP 컴포넌트 19개" }],
  },
];

const readyItems = navGroups.flatMap((g) => g.items).filter((i) => i.ready);

export function neighbors(href: string) {
  const index = readyItems.findIndex((i) => i.href === href);
  return { prev: readyItems[index - 1], next: readyItems[index + 1] };
}

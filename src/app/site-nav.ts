// 사이트 메뉴. 위 메뉴(라이브러리 · 프로토타입)를 고르면 왼쪽 메뉴(LNB)가 그 영역의 목록으로 바뀐다
// 라이브러리 목록 순서대로 이전 · 다음 문서 링크도 만든다
export type NavItem = { href: string; title: string; ready?: boolean };
export type NavGroup = { title: string; items: NavItem[] };
export type Section = { key: "docs" | "prototypes"; href: string; title: string };

export const sections: Section[] = [
  { key: "docs", href: "/docs/tokens/color", title: "라이브러리" },
  { key: "prototypes", href: "/prototypes", title: "프로토타입" },
];

export const libraryGroups: NavGroup[] = [
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

export function prototypeGroups(screens: string[]): NavGroup[] {
  return [
    { title: "프로토타입", items: [{ href: "/prototypes", title: "전체 화면", ready: true }] },
    { title: "화면", items: screens.map((name) => ({ href: `/prototypes/${name}`, title: name, ready: true })) },
  ];
}

export const sectionOf = (pathname: string): Section["key"] =>
  pathname.startsWith("/prototypes") ? "prototypes" : "docs";

const readyLibraryItems = libraryGroups.flatMap((g) => g.items).filter((i) => i.ready);

export function neighbors(href: string) {
  const index = readyLibraryItems.findIndex((i) => i.href === href);
  if (index === -1) return {};
  return { prev: readyLibraryItems[index - 1], next: readyLibraryItems[index + 1] };
}

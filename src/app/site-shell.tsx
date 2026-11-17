"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { libraryGroups, prototypeGroups, sectionOf, sections, type NavGroup } from "./site-nav";

// 사이트 전체 틀: 위 메뉴 + 왼쪽 메뉴(LNB) + 본문. 어느 페이지로 가도 같은 틀 안에서 본문만 바뀐다
// 위 메뉴의 지금 영역은 굵기와 글자색으로 구분한다(밑줄 없음)
// PC · 태블릿(768px 이상)은 LNB가 늘 보이고, 그보다 좁으면 위 메뉴 버튼으로 LNB를 연다
// 프로토타입 화면 목록. 화면 틀(ScreenFrame)의 화면 이동 드롭다운이 쓴다
const ScreensContext = createContext<string[]>([]);
export const useScreens = () => useContext(ScreensContext);

export default function SiteShell({ screens, children }: { screens: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const section = sectionOf(pathname);
  const groups = section === "prototypes" ? prototypeGroups(screens) : libraryGroups;
  const [open, setOpen] = useState(false);

  // 다른 페이지로 가면 열려 있던 메뉴를 닫는다
  useEffect(() => setOpen(false), [pathname]);

  return (
    <ScreensContext.Provider value={screens}>
    <div className="min-h-screen bg-layer-default">
      <header className="sticky top-0 z-20 border-b border-neutral-weak bg-layer-default">
        <div className="mx-auto flex h-56 max-w-[1280px] items-center gap-16 px-16 md:gap-32 md:px-24">
          <button
            type="button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-ml-8 flex size-touch-min items-center justify-center rounded-sm hover:bg-transparent-pressed md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/" className="whitespace-nowrap text-title-sm">
            딸깍<span className="hidden sm:inline"> 디자인 시스템</span>
          </Link>
          <nav aria-label="사이트 영역" className="flex gap-4">
            {sections.map((s) => {
              const active = s.key === section;
              return (
                <Link
                  key={s.key}
                  href={s.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-touch-min items-center whitespace-nowrap rounded-sm px-12 hover:bg-transparent-pressed ${
                    active ? "text-label-md text-neutral" : "text-body-md text-neutral-muted"
                  }`}
                >
                  {s.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1280px] gap-32 px-16 md:px-24 lg:gap-40">
        <aside className="sticky top-56 hidden h-[calc(100vh-56px)] w-[240px] shrink-0 overflow-y-auto py-32 md:block">
          <Lnb groups={groups} pathname={pathname} />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>

      {open && (
        <div className="fixed inset-0 top-56 z-10 md:hidden">
          <button type="button" aria-label="메뉴 닫기" className="absolute inset-0 bg-overlay" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-[280px] overflow-y-auto border-r border-neutral-weak bg-layer-floating px-16 py-24">
            <Lnb groups={groups} pathname={pathname} />
          </aside>
        </div>
      )}
    </div>
    </ScreensContext.Provider>
  );
}

// 왼쪽 메뉴. SEED 문서 사이트 크기: 한 줄 높이 40px · 줄 사이 2px · 글자 14px 보통 굵기
// 지금 보는 페이지는 글자색과 함께 면(bg.transparent-selected)으로 표시해 색만으로 구분하지 않는다
// 누르는 영역은 40px로 44px보다 작지만 24px 이상이고 줄마다 떨어져 있다(UX.md "손가락으로 쓰기 쉽게")
function Lnb({ groups, pathname }: { groups: NavGroup[]; pathname: string }) {
  return (
    <nav aria-label="페이지 목록" className="space-y-20">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="px-8 pb-4 text-caption text-neutral-subtle">{group.title}</p>
          <ul className="space-y-2">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  {item.ready ? (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex h-40 items-center rounded-sm px-8 text-body-md ${
                        active ? "bg-transparent-selected text-neutral" : "text-neutral-muted hover:bg-transparent-pressed"
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                    </Link>
                  ) : (
                    <span className="flex h-40 items-center gap-8 px-8 text-body-md text-disabled">
                      {item.title}
                      <span className="text-caption text-neutral-muted">준비 중</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

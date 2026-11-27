"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Menu, X } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
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
  // 휴대폰에서 프로토타입 화면을 볼 때는 위 메뉴를 고정하지 않는다. 스크롤하면 올라가서 앱의 Top bar가 맨 위에 붙는다
  const isScreen = /^\/prototypes\/[^/]+/.test(pathname);
  const [open, setOpen] = useState(false);

  // 다른 페이지로 가면 열려 있던 메뉴를 닫는다
  useEffect(() => setOpen(false), [pathname]);

  // 포커스 표시는 Tab 키로 움직일 때만 보인다. 누르거나 터치하면 숨긴다(globals.css)
  useEffect(() => {
    const root = document.documentElement;
    const onKey = (e: KeyboardEvent) => e.key === "Tab" && root.classList.add("keyboard-nav");
    const onPointer = () => root.classList.remove("keyboard-nav");
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <ScreensContext.Provider value={screens}>
    <div className="min-h-screen bg-layer-default">
      <header className={`${isScreen ? "md:sticky" : "sticky"} top-0 z-20 border-b border-neutral-weak bg-layer-default`}>
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
          <ThemeControls />
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
    <nav aria-label="페이지 목록" className="space-y-32">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="px-8 pb-8 text-caption text-brand-contrast">{group.title}</p>
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

// 임시 미리보기: 메인 컬러 · 다크모드(src/styles/temp-theme.css). 고른 값은 이 브라우저에만 기억한다
// 견본 원 색은 각 메인 컬러의 대표 단계(600)다. 사이트 틀이라 색 값을 직접 쓴다
const brands = [
  { value: "orange", label: "Orange", swatch: "var(--palette-orange-600)" },
  { value: "blue", label: "Blue", swatch: "var(--palette-blue-700)" },
  { value: "green", label: "Green", swatch: "var(--palette-green-600)" },
  { value: "red", label: "Red", swatch: "var(--palette-red-700)" },
  { value: "yellow", label: "Yellow", swatch: "var(--palette-yellow-300)" },
  { value: "purple", label: "Purple", swatch: "#8a5cf6" },
  { value: "pink", label: "Pink", swatch: "#f5468c" },
  { value: "sky", label: "Sky", swatch: "#12a5e3" },
];
const modes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function readSaved(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function ThemeControls() {
  const [mode, setMode] = useState("light");
  const [brand, setBrand] = useState("orange");

  useEffect(() => {
    setMode(readSaved("ds-mode", "light"));
    setBrand(readSaved("ds-brand", "orange"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", mode === "dark");
    if (brand === "orange") root.removeAttribute("data-brand");
    else root.setAttribute("data-brand", brand);
    try {
      localStorage.setItem("ds-mode", mode);
      localStorage.setItem("ds-brand", brand);
    } catch {}
  }, [mode, brand]);

  return (
    <div className="ml-auto hidden items-center gap-8 sm:flex">
      <BrandMenu value={brand} onChange={setBrand} />
      <SegmentedControl size="sm" aria-label="화면 모드" options={modes} value={mode} onValueChange={setMode} />
    </div>
  );
}

// 메인 컬러 고르기 메뉴. 누르면 버튼 바로 아래에 같은 폭으로 목록이 펼쳐지고, 색 원 · 이름 · 고른 표시를 보여 준다. 원(12) · 글자(label-sm)는 버튼과 목록이 같다
// 바깥을 누르거나 Esc를 누르면 닫힌다. 위아래 화살표로 항목을 옮겨 다닐 수 있다
function BrandMenu({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const current = brands.find((b) => b.value === value) ?? brands[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    // 열리면 고른 항목에 포커스
    wrap.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus();
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    items[(i + (e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length]?.focus();
  };

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`메인 컬러: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        className="flex h-32 w-[112px] items-center gap-8 rounded-sm border border-neutral-weak bg-layer-default pr-8 pl-10 text-label-sm text-neutral hover:bg-layer-default-pressed"
      >
        <span aria-hidden className="size-12 shrink-0 rounded-full" style={{ background: current.swatch }} />
        <span className="flex-1 text-left">{current.label}</span>
        <ChevronDown aria-hidden className={`size-14 text-neutral-subtle transition-transform duration-(--duration-d3) ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="메인 컬러"
          onKeyDown={onListKey}
          className="absolute inset-x-0 top-[calc(100%+6px)] z-30 rounded-md border border-neutral-weak bg-layer-floating p-4 shadow-s2"
        >
          {brands.map((b) => {
            const selected = b.value === value;
            return (
              <li key={b.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(b.value);
                    setOpen(false);
                  }}
                  className="flex h-32 w-full items-center gap-8 rounded-sm px-6 text-left text-label-sm text-neutral hover:bg-transparent-pressed focus-visible:bg-transparent-pressed focus-visible:outline-none"
                >
                  <span aria-hidden className="size-12 shrink-0 rounded-full" style={{ background: b.swatch }} />
                  <span className="flex-1">{b.label}</span>
                  {selected && <Check aria-hidden className="size-14 shrink-0 text-neutral" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

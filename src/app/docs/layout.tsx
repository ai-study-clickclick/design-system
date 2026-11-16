import Link from "next/link";
import DocsSidebar from "./docs-sidebar";

// 라이브러리 사이트 틀. PC에서 보는 문서 사이트라 앱 화면 기준(375px)을 따르지 않는다
// 구성: 위 메뉴 · 왼쪽 문서 목록 · 가운데 본문 · 오른쪽 목차(SEED 문서 사이트 구성)
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-layer-default">
      <header className="sticky top-0 z-10 border-b border-neutral-subtle bg-layer-default">
        <div className="mx-auto flex h-56 max-w-[1280px] items-center gap-32 px-24">
          <Link href="/" className="text-title-sm">
            딸깍 디자인 시스템
          </Link>
          <nav className="flex gap-8 text-label-md">
            <Link href="/docs" className="rounded-sm px-12 py-6 hover:bg-neutral-muted">
              라이브러리
            </Link>
            <Link href="/prototypes" className="rounded-sm px-12 py-6 text-neutral-muted hover:bg-neutral-muted">
              프로토타입
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1280px] gap-40 px-24">
        <aside className="sticky top-56 hidden h-[calc(100vh-56px)] w-[200px] shrink-0 overflow-y-auto py-32 lg:block">
          <DocsSidebar />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

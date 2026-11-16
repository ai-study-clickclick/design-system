import Link from "next/link";
import { neighbors } from "./site-nav";
import TocNav from "./toc-nav";

// 문서 한 장의 틀: 분류 · 제목 · 한 줄 설명 · 본문 · 이전/다음 문서, 오른쪽 목차
// 글자 크기는 4단계(title-lg 24 · title-sm 18 · 14 · 12)만 쓴다(DESIGN.md "색 · 글자")
export type TocItem = { id: string; title: string; depth?: 1 | 2 };

export default function DocPage({
  href,
  category,
  title,
  description,
  toc,
  children,
}: {
  href: string;
  category: string;
  title: string;
  description: string;
  toc: TocItem[];
  children: React.ReactNode;
}) {
  const { prev, next } = neighbors(href);

  return (
    <div className="flex gap-40">
      <article className="min-w-0 max-w-[760px] flex-1 py-40">
        <p className="text-label-md text-neutral-muted">{category}</p>
        <h1 className="mt-8 text-title-lg">{title}</h1>
        <p className="mt-8 text-body-md text-neutral-muted">{description}</p>
        <div className="mt-40">{children}</div>

        {(prev || next) && (
          <nav aria-label="이전 · 다음 문서" className="mt-64 grid grid-cols-2 gap-16">
            {prev ? (
              <Link href={prev.href} className="rounded-md bg-neutral-muted p-16 hover:bg-neutral-weak-pressed">
                <span className="block text-label-sm text-neutral-muted">← 이전 문서</span>
                <span className="mt-4 block text-label-md">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={next.href} className="rounded-md bg-neutral-muted p-16 text-right hover:bg-neutral-weak-pressed">
                <span className="block text-label-sm text-neutral-muted">다음 문서 →</span>
                <span className="mt-4 block text-label-md">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </article>

      {toc.length > 0 && (
        <aside className="sticky top-56 hidden h-fit w-[180px] shrink-0 py-40 xl:block">
          <TocNav toc={toc} />
        </aside>
      )}
    </div>
  );
}

// 본문 안의 장 제목. 목차 링크가 이 id로 이동한다(위 메뉴 높이만큼 띄워 멈춤)
export function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-56 scroll-mt-64 first:mt-0">
      <h2 className="text-title-sm">{title}</h2>
      {description && <p className="mt-4 text-body-md text-neutral-muted">{description}</p>}
      <div className="mt-16">{children}</div>
    </section>
  );
}

export function SubSection({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mt-32 scroll-mt-64 first:mt-0">
      <h3 className="text-label-md">{title}</h3>
      {description && <p className="mt-4 text-body-md text-neutral-muted">{description}</p>}
      <div className="mt-12">{children}</div>
    </div>
  );
}

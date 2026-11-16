import Link from "next/link";
import { neighbors } from "./nav-items";

// 문서 한 장의 틀: 분류 · 제목 · 한 줄 설명 · 본문 · 이전/다음 문서, 오른쪽 목차
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
      <article className="min-w-0 max-w-[760px] flex-1 py-48">
        <p className="text-label-md text-neutral-subtle">{category}</p>
        <h1 className="mt-8 text-[32px] leading-[40px] font-bold">{title}</h1>
        <p className="mt-12 text-body-lg text-neutral-muted">{description}</p>
        <div className="mt-40">{children}</div>

        <nav aria-label="이전 · 다음 문서" className="mt-64 grid grid-cols-2 gap-16">
          {prev ? (
            <Link href={prev.href} className="rounded-md bg-neutral-muted p-16 hover:bg-neutral-weak">
              <span className="block text-label-sm text-neutral-subtle">← 이전 문서</span>
              <span className="mt-4 block text-label-base">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className="rounded-md bg-neutral-muted p-16 text-right hover:bg-neutral-weak">
              <span className="block text-label-sm text-neutral-subtle">다음 문서 →</span>
              <span className="mt-4 block text-label-base">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      {toc.length > 0 && (
        <aside className="sticky top-56 hidden h-fit w-[180px] shrink-0 py-48 xl:block">
          <p className="text-label-sm text-neutral-subtle">목차</p>
          <ul className="mt-8 space-y-6 border-l border-neutral-weak">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-body-sm text-neutral-muted hover:text-neutral ${
                    item.depth === 2 ? "pl-24" : "pl-12"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

// 본문 안의 장 제목. 목차 링크가 이 id로 이동한다
export function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-56 scroll-mt-[80px] first:mt-0">
      <h2 className="text-title-md">{title}</h2>
      {description && <p className="mt-8 text-body-md text-neutral-muted">{description}</p>}
      <div className="mt-20">{children}</div>
    </section>
  );
}

export function SubSection({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mt-32 scroll-mt-[80px] first:mt-0">
      <h3 className="text-title-sm">{title}</h3>
      {description && <p className="mt-4 text-body-md text-neutral-muted">{description}</p>}
      <div className="mt-12">{children}</div>
    </div>
  );
}

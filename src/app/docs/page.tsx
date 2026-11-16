import Link from "next/link";

const sections = [
  { href: "/docs/tokens", title: "토큰", description: "색 · 글자 · 간격 · 라운드 · 그림자" },
  { href: null, title: "컴포넌트", description: "MVP 컴포넌트 19개. 2-4에서 채운다" },
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-2xl px-24 py-64">
      <Link href="/" className="text-body-md text-neutral-subtle hover:underline">
        ← 처음으로
      </Link>
      <h1 className="mt-16 text-title-lg">라이브러리</h1>
      <p className="mt-8 text-body-md text-neutral-muted">기본 테마 기준이다</p>
      <ul className="mt-32 space-y-12">
        {sections.map((section) =>
          section.href ? (
            <li key={section.title}>
              <Link
                href={section.href}
                className="block rounded-lg border border-neutral-weak p-20 hover:bg-layer-default-pressed"
              >
                <p className="text-title-sm">{section.title}</p>
                <p className="mt-4 text-body-md text-neutral-muted">{section.description}</p>
              </Link>
            </li>
          ) : (
            <li key={section.title} className="rounded-lg border border-dashed border-neutral-weak p-20">
              <p className="text-title-sm">{section.title}</p>
              <p className="mt-4 text-body-md text-neutral-subtle">{section.description}</p>
            </li>
          ),
        )}
      </ul>
    </main>
  );
}

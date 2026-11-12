import Link from "next/link";

const sections = [
  { title: "토큰", description: "색 · 글자 · 간격 · 라운드 · 그림자. 2-2에서 채운다" },
  { title: "컴포넌트", description: "MVP 컴포넌트 19개. 2-3에서 채운다" },
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← 처음으로
      </Link>
      <h1 className="mt-4 text-2xl font-bold">라이브러리</h1>
      <p className="mt-2 text-sm text-gray-600">기본 테마 기준이다</p>
      <ul className="mt-8 space-y-3">
        {sections.map((section) => (
          <li key={section.title} className="rounded-lg border border-dashed border-gray-300 p-5">
            <p className="font-semibold">{section.title}</p>
            <p className="mt-1 text-sm text-gray-500">{section.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

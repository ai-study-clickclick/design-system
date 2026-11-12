import Link from "next/link";

const sections = [
  {
    href: "/docs",
    title: "라이브러리",
    description: "기본 테마의 토큰과 컴포넌트를 모아 본다",
  },
  {
    href: "/prototypes",
    title: "프로토타입",
    description: "화면별 프로토타입을 연다. 폴더 하나가 화면 하나다",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold">딸깍 디자인 시스템</h1>
      <ul className="mt-8 space-y-3">
        {sections.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="block rounded-lg border border-gray-200 p-5 hover:bg-gray-50"
            >
              <p className="font-semibold">{section.title}</p>
              <p className="mt-1 text-sm text-gray-600">{section.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

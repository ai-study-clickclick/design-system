import Link from "next/link";
import DocPage from "../doc-page";

export const metadata = { title: "Library · 딸깍 디자인 시스템" };

// 라이브러리 첫 문서. 내용은 임시이고 2-4에서 다시 정한다
const parts = [
  { href: "/docs/tokens/color", title: "Tokens", description: "색 · 글자 · 간격 · 라운드 · 그림자 값을 눈으로 확인해요", status: null },
  { href: null, title: "Components", description: "MVP 컴포넌트 19개의 모양과 쓰는 법을 봐요", status: "준비 중" },
];

export default function DocsPage() {
  return (
    <DocPage
      href="/docs"
      category="Library"
      title="Overview"
      description="DESIGN.md의 값으로 만든 기본 테마 라이브러리예요"
      toc={[]}
    >
      <ul className="grid gap-12 sm:grid-cols-2">
        {parts.map((part) => (
          <li key={part.title}>
            {part.href ? (
              <Link href={part.href} className="block h-full rounded-md bg-neutral-muted p-20 hover:bg-neutral-weak-pressed">
                <PartText {...part} />
              </Link>
            ) : (
              <div className="h-full rounded-md bg-neutral-muted p-20">
                <PartText {...part} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-24 text-body-md text-neutral-muted">
        만든 화면은{" "}
        <Link href="/prototypes" className="text-label-md text-neutral underline">
          Prototypes
        </Link>
        에서 볼 수 있어요
      </p>
    </DocPage>
  );
}

function PartText({ title, description, status }: { title: string; description: string; status: string | null }) {
  return (
    <>
      <p className="flex items-center gap-8 text-label-md">
        {title}
        {status && <span className="text-caption text-neutral-muted">{status}</span>}
      </p>
      <p className="mt-4 text-body-md text-neutral-muted">{description}</p>
    </>
  );
}

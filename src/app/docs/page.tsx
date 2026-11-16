import Link from "next/link";
import DocPage from "./doc-page";

// 라이브러리 첫 화면. 문서마다 카드 하나 (SEED Foundations 개요 구성)
const cards = [
  { href: "/docs/tokens/color", title: "색", description: "쓰임새 색과 기본 색표", tile: "bg-brand-solid" },
  { href: "/docs/tokens/typography", title: "글자", description: "Pretendard 글자 스타일", tile: "bg-neutral-solid" },
  { href: "/docs/tokens/spacing", title: "간격", description: "여백과 간격 단계", tile: "bg-informative-weak" },
  { href: "/docs/tokens/radius", title: "라운드", description: "모서리 단계와 기준값", tile: "bg-positive-weak" },
  { href: "/docs/tokens/shadow", title: "그림자", description: "떠 있는 면의 그림자", tile: "bg-neutral-weak" },
  { href: null, title: "컴포넌트", description: "MVP 컴포넌트 19개 · 준비 중", tile: "bg-layer-basement" },
];

export default function DocsPage() {
  return (
    <DocPage
      href="/docs"
      category="라이브러리"
      title="딸깍 디자인 시스템"
      description="기본 테마(주황) 기준의 토큰과 컴포넌트다. 값은 DESIGN.md에서 자동으로 만든다"
      toc={[]}
    >
      <ul className="grid grid-cols-2 gap-20 xl:grid-cols-3">
        {cards.map((card) => {
          const body = (
            <>
              <div className={`h-[120px] rounded-md ${card.tile}`} />
              <p className="mt-12 text-title-sm">{card.title}</p>
              <p className="mt-4 text-body-md text-neutral-muted">{card.description}</p>
            </>
          );
          return (
            <li key={card.title}>
              {card.href ? (
                <Link href={card.href} className="block rounded-md hover:opacity-80">
                  {body}
                </Link>
              ) : (
                <div className="opacity-50">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </DocPage>
  );
}

import Link from "next/link";
import DocPage from "../doc-page";

export const metadata = { title: "Library · 딸깍 디자인 시스템" };

// 라이브러리 첫 문서. 문서마다 썸네일 카드 하나(SEED Foundations 개요 구성)
// 썸네일 · 문구는 임시이고 2-4에서 다시 정한다
const cards = [
  { href: "/docs/tokens/color", title: "Color", description: "쓰임새 색과 기본 색표", thumb: <ColorThumb /> },
  { href: "/docs/tokens/typography", title: "Typography", description: "Pretendard 글자 스타일", thumb: <TypeThumb /> },
  { href: "/docs/tokens/spacing", title: "Spacing", description: "여백과 간격 단계", thumb: <SpacingThumb /> },
  { href: "/docs/tokens/radius", title: "Radius", description: "모서리 단계와 기준값", thumb: <RadiusThumb /> },
  { href: "/docs/tokens/shadow", title: "Shadow", description: "떠 있는 면의 그림자", thumb: <ShadowThumb /> },
  { href: null, title: "Components", description: "MVP 컴포넌트 19개", thumb: null },
];

export default function DocsPage() {
  return (
    <DocPage
      href="/docs"
      category="Library"
      title="딸깍 디자인 시스템"
      description="기본 테마(주황) 기준의 토큰과 컴포넌트예요. 값은 DESIGN.md에서 자동으로 만들어요"
      toc={[]}
    >
      <ul className="grid gap-20 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const body = (
            <>
              <div className="flex h-[120px] items-center justify-center overflow-hidden rounded-md bg-neutral-muted">
                {card.thumb ?? <span className="text-label-md text-neutral-muted">준비 중</span>}
              </div>
              <p className="mt-12 text-title-sm">{card.title}</p>
              <p className="mt-4 text-body-md text-neutral-muted">{card.description}</p>
            </>
          );
          return (
            <li key={card.title}>
              {card.href ? (
                <Link href={card.href} className="block rounded-md p-8 -m-8 hover:bg-transparent-pressed">
                  {body}
                </Link>
              ) : (
                <div>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </DocPage>
  );
}

function ColorThumb() {
  return (
    <div className="flex gap-8">
      {["bg-brand-solid", "bg-informative-solid", "bg-positive-solid", "bg-critical-solid", "bg-neutral-solid"].map((c) => (
        <span key={c} className={`size-24 rounded-full ${c}`} />
      ))}
    </div>
  );
}

function TypeThumb() {
  return <span className="text-title-lg">Aa 가</span>;
}

function SpacingThumb() {
  return (
    <div className="flex items-end gap-8">
      {["h-8", "h-16", "h-24", "h-32", "h-40"].map((h) => (
        <span key={h} className={`w-12 rounded-xs bg-informative-solid ${h}`} />
      ))}
    </div>
  );
}

function RadiusThumb() {
  return <span className="size-56 rounded-xl border-2 border-positive-solid bg-positive-weak" />;
}

function ShadowThumb() {
  return <span className="size-56 rounded-md border border-neutral-weak bg-layer-floating" />;
}

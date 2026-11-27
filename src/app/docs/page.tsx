import Link from "next/link";
import DocPage from "../doc-page";

export const metadata = { title: "Library · 딸깍 디자인 시스템" };

// 라이브러리 첫 문서. 문서마다 썸네일 카드 하나(SEED Foundations 개요 구성)
// 썸네일은 사이트 틀이라 기본 색표(palette)를 직접 쓴다. 칸마다 밝은 단계(100~500) 색 하나로 배경을 칠해 알록달록하게 둔다
const cards = [
  { href: "/docs/tokens/color", title: "Color", description: "쓰임새 색과 기본 색표", bg: "bg-(--palette-yellow-200)", thumb: <ColorThumb /> },
  { href: "/docs/tokens/typography", title: "Typography", description: "Pretendard 글자 스타일", bg: "bg-(--palette-blue-300)", thumb: <TypeThumb /> },
  { href: "/docs/tokens/spacing", title: "Spacing", description: "여백과 간격 단계", bg: "bg-(--palette-green-300)", thumb: <SpacingThumb /> },
  { href: "/docs/tokens/radius", title: "Radius", description: "모서리 단계와 기준값", bg: "bg-(--palette-red-300)", thumb: <RadiusThumb /> },
  { href: "/docs/tokens/shadow", title: "Shadow", description: "떠 있는 면의 그림자", bg: "bg-(--palette-orange-300)", thumb: <ShadowThumb /> },
  { href: "/docs/components", title: "Components", description: "MVP 컴포넌트 19개와 임시 추가", bg: "bg-(--palette-blue-200)", thumb: <ComponentsThumb /> },
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
              <div
                className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-[1.02] ${card.bg}`}
              >
                {card.thumb}
              </div>
              <p className="mt-12 text-title-sm">{card.title}</p>
              <p className="mt-4 text-body-md text-neutral-muted">{card.description}</p>
            </>
          );
          return (
            <li key={card.title}>
              <Link href={card.href} className="group block">
                {body}
              </Link>
            </li>
          );
        })}
      </ul>
    </DocPage>
  );
}

// 색 칩 다섯 장을 부채처럼 펼친다
function ColorThumb() {
  const chips = ["--palette-orange-500", "--palette-red-500", "--palette-blue-500", "--palette-green-500", "--palette-yellow-300"];
  return (
    <div className="relative h-[96px] w-[160px]">
      {chips.map((c, i) => (
        <span
          key={c}
          className="absolute bottom-0 left-1/2 h-[88px] w-[48px] origin-bottom rounded-md border-2 border-(--palette-static-white) shadow-s2"
          style={{ background: `var(${c})`, transform: `translateX(-50%) rotate(${(i - 2) * 16}deg)` }}
        />
      ))}
    </div>
  );
}

function TypeThumb() {
  return (
    <div className="flex items-baseline gap-12 text-(--palette-blue-900)">
      <span className="text-[64px] leading-none font-bold">Aa</span>
      <span className="text-[44px] leading-none font-medium">가</span>
      <span className="text-[28px] leading-none font-normal opacity-60">가</span>
    </div>
  );
}

// 간격 단계가 커지는 막대
function SpacingThumb() {
  return (
    <div className="flex items-end gap-10">
      {[16, 28, 40, 56, 72].map((h) => (
        <span key={h} className="w-[20px] rounded-sm bg-(--palette-green-700)" style={{ height: h }} />
      ))}
    </div>
  );
}

// 같은 크기 면에 라운드가 커지는 모서리 세 개
function RadiusThumb() {
  return (
    <div className="flex items-center gap-10">
      {["rounded-xs", "rounded-lg", "rounded-2xl", "rounded-full"].map((r) => (
        <span key={r} className={`size-[52px] border-[3px] border-(--palette-red-700) bg-(--palette-static-white) ${r}`} />
      ))}
    </div>
  );
}

// 겹쳐 뜬 면 세 장(그림자 s1 · s2 · s3)
function ShadowThumb() {
  return (
    <div className="relative h-[96px] w-[150px]">
      {["shadow-s1", "shadow-s2", "shadow-s3"].map((sh, i) => (
        <span
          key={sh}
          className={`absolute h-[64px] w-[96px] rounded-md bg-(--palette-static-white) ${sh}`}
          style={{ left: i * 26, top: 24 - i * 12 }}
        />
      ))}
    </div>
  );
}

// 작은 화면 조각: 스위치 · 체크 · 버튼
function ComponentsThumb() {
  return (
    <div className="flex w-[180px] flex-col gap-8 rounded-lg bg-(--palette-static-white) p-12 shadow-s2">
      <div className="flex items-center justify-between">
        <span className="h-[8px] w-[64px] rounded-full bg-(--palette-gray-400)" />
        <span className="flex h-[16px] w-[26px] items-center justify-end rounded-full bg-(--palette-orange-500) px-2">
          <span className="size-[12px] rounded-full bg-(--palette-static-white)" />
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="flex size-[14px] items-center justify-center rounded-xs bg-(--palette-blue-500) text-[10px] leading-none text-(--palette-static-white)">✓</span>
        <span className="h-[8px] w-[80px] rounded-full bg-(--palette-gray-300)" />
      </div>
      <span className="mt-2 h-[24px] rounded-sm bg-(--palette-orange-500)" />
    </div>
  );
}

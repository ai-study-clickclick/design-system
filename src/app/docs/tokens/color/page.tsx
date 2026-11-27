import DocPage, { Section, SubSection, type TocItem } from "../../../doc-page";
import { readTokens, type Token } from "../read-tokens";
import { ColorDot, TokenRow, TokenTable, tokenDetail, tokenValue } from "../token-table";

export const metadata = { title: "Color · 딸깍 디자인 시스템" };

// 역할(쓰임새 이름의 두 번째 단어)별 설명. 우리 기준(DESIGN.md)에 맞춰 새로 쓴 문장이다
const roles: { key: string; title: string; description: string }[] = [
  { key: "brand", title: "Brand", description: "브랜드 색. 주된 행동(CTA)과 강조에 쓴다" },
  { key: "neutral", title: "Neutral", description: "기본 글자 · 면 · 테두리에 쓰는 무채색" },
  { key: "critical", title: "Critical", description: "오류 · 삭제처럼 되돌리기 어렵거나 위험한 상태" },
  { key: "positive", title: "Positive", description: "완료 · 성공 상태" },
  { key: "warning", title: "Warning", description: "주의가 필요한 상태" },
  { key: "informative", title: "Informative", description: "안내 · 정보를 알릴 때 쓴다" },
  { key: "layer", title: "Layer", description: "화면의 면 층. 바탕(basement) · 기본(default) · 떠 있는 면(floating)" },
  { key: "on", title: "On color", description: "진한 배경(solid) 위에 올리는 글자 · 아이콘" },
  { key: "disabled", title: "Disabled", description: "쓸 수 없는 상태" },
  { key: "placeholder", title: "Placeholder", description: "입력창 안의 예시 글자" },
  { key: "overlay", title: "Overlay", description: "Modal · Bottom sheet 뒤를 덮는 배경" },
  { key: "transparent", title: "Transparent", description: "투명 배경과 그 눌림 · 선택 상태" },
  { key: "focus", title: "Focus", description: "키보드로 고른 요소를 감싸는 테두리" },
];

const roleOf = (t: Token) => t.name.split(".")[1].split("-")[0];

const properties = [
  { key: "bg", id: "bg", title: "Background", description: "bg.* · 화면 전체나 UI 요소의 면에 쓴다", kind: "fill" as const },
  { key: "fg", id: "fg", title: "Foreground", description: "fg.* · 글자와 아이콘처럼 면 위에 올라가는 요소에 쓴다", kind: "text" as const },
  { key: "stroke", id: "stroke", title: "Stroke", description: "stroke.* · 요소의 윤곽선과 구분선에 쓴다", kind: "stroke" as const },
];

const paletteNames: Record<string, string> = {
  gray: "Gray",
  orange: "Orange",
  brand: "Brand (테마의 대표 컬러에서 계산)",
  blue: "Blue",
  red: "Red",
  green: "Green",
  yellow: "Yellow",
  static: "Static (라이트 · 다크 공통)",
};

export default function ColorPage() {
  const { semantic, paletteGroups } = readTokens();

  const toc: TocItem[] = [
    { id: "structure", title: "Structure" },
    { id: "naming", title: "Naming" },
    { id: "roles", title: "Semantic" },
    ...properties.map((p) => ({ id: p.id, title: p.title, depth: 2 as const })),
    { id: "palette", title: "Palette" },
  ];

  return (
    <DocPage
      href="/docs/tokens/color"
      category="Tokens"
      title="Color"
      description="화면의 계층 · 상태 · 브랜드를 색으로 나타낸다. 화면과 컴포넌트에는 쓰임새 색만 쓴다."
      toc={toc}
    >
      <Section id="structure" title="Structure" description="색은 두 단으로 나뉜다. 쓰임새 색이 기본 색표의 색을 가리킨다.">
        <div className="grid gap-16 sm:grid-cols-2">
          <div className="rounded-md bg-neutral-muted p-20">
            <p className="text-caption text-neutral-subtle">1단</p>
            <p className="mt-4 text-label-md">기본 색표 palette.*</p>
            <p className="mt-8 text-body-md text-neutral-muted">실제 색 값이다. 화면에 바로 쓰지 않는다.</p>
            <p className="mt-12 text-body-md">palette.orange-600 = #ff6600</p>
          </div>
          <div className="rounded-md bg-brand-weak p-20">
            <p className="text-caption text-brand-contrast">2단</p>
            <p className="mt-4 text-label-md">쓰임새 색 bg · fg · stroke</p>
            <p className="mt-8 text-body-md text-neutral">어디에 쓰는지를 이름으로 나타낸다. 화면에는 이것만 쓴다.</p>
            <p className="mt-12 text-body-md">bg.brand-solid → palette.brand-600</p>
          </div>
        </div>
      </Section>

      <Section id="naming" title="Naming" description="쓰임새 색 이름은 네 부분으로 읽는다">
        <div className="rounded-md bg-neutral-muted px-24 py-32 text-center">
          <p className="text-title-lg">
            <span>bg</span>.<span className="text-brand-contrast">brand</span>-<span className="text-informative">solid</span>-
            <span className="text-positive">pressed</span>
          </p>
          <div className="mt-16 flex flex-wrap justify-center gap-x-24 gap-y-8 text-caption">
            <span>속성: 칠할 곳</span>
            <span className="text-brand-contrast">역할: 의미</span>
            <span className="text-informative">변형: 진하기</span>
            <span className="text-positive">상태: 눌림 등</span>
          </div>
        </div>
      </Section>

      <Section
        id="roles"
        title="Semantic"
        description="클래스로 쓸 때는 앞의 속성을 클래스 앞말로 바꾼다. bg.brand-solid → bg-brand-solid, fg.neutral → text-neutral, stroke.neutral-weak → border-neutral-weak"
      >
        {properties.map((p) => {
          const tokens = semantic[p.key as keyof typeof semantic];
          return (
            <SubSection key={p.id} id={p.id} title={p.title} description={p.description}>
              {roles
                .filter((r) => tokens.some((t) => roleOf(t) === r.key))
                .map((r) => (
                  <div key={r.key} className="mt-24 first:mt-0">
                    <p className="text-caption">{r.title}</p>
                    <p className="mb-8 text-label-sm text-neutral-muted">{r.description}</p>
                    <TokenTable>
                      {tokens
                        .filter((t) => roleOf(t) === r.key)
                        .map((t) => (
                          <TokenRow
                            key={t.name}
                            name={t.name}
                            preview={<ColorDot cssVar={t.cssVar} kind={p.kind} />}
                            value={tokenValue(t)}
                            detail={tokenDetail(t)}
                          />
                        ))}
                    </TokenTable>
                  </div>
                ))}
            </SubSection>
          );
        })}
      </Section>

      <Section id="palette" title="Palette" description="쓰임새 색이 가리키는 실제 색이다. 쓰임새 색으로 나타낼 수 없는 예외에만 쓴다.">
        <div className="space-y-24">
          {paletteGroups.map(([group, tokens]) => (
            <div key={group}>
              <p className="text-label-md">{paletteNames[group] ?? group}</p>
              <div className="mt-8 grid grid-cols-5 overflow-hidden rounded-md border border-neutral-weak lg:flex">
                {tokens.map((t) => (
                  <div key={t.name} className="min-w-0 flex-1">
                    <div className="h-48" style={{ background: `var(${t.cssVar})` }} />
                    <div className="px-6 py-8">
                      <p className="text-label-sm">{t.name.split("-").pop()}</p>
                      <p className="text-label-sm text-neutral-muted">{t.resolved}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </DocPage>
  );
}

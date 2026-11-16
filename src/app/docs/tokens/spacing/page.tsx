import DocPage, { Section } from "../../doc-page";
import { readTokens } from "../read-tokens";
import { TokenRow, TokenTable } from "../token-table";

export const metadata = { title: "간격 · 딸깍 디자인 시스템" };

// 쓰임새가 있는 간격 토큰의 설명. DESIGN.md "Layout" 기준
const usage: Record<string, string> = {
  "space.component-default": "컴포넌트 사이 기본 간격",
  "space.nav-to-title": "상단 바에서 화면 제목까지",
  "space.screen-bottom": "화면 맨 아래 여백",
  "space.between-text": "글자 줄 사이",
  "space.screen-width": "기준 화면 폭",
  "space.screen-max": "넓은 화면에서 콘텐츠 최대 폭",
  "space.screen-margin": "화면 좌우 여백",
  "space.gutter": "칸 사이 간격",
  "space.touch-min": "누르는 영역 기본 크기",
  "space.touch-min-sm": "공간이 부족한 곳의 누르는 영역 최소 크기",
};

export default function SpacingPage() {
  const { spacing } = readTokens();
  const scale = spacing.filter((t) => /^space\.\d+$/.test(t.name));
  const named = spacing.filter((t) => !/^space\.\d+$/.test(t.name));

  return (
    <DocPage
      href="/docs/tokens/spacing"
      category="토큰"
      title="간격"
      description="여백과 간격은 이 토큰만 쓴다. 이름의 숫자가 곧 px 값이다"
      toc={[
        { id: "scale", title: "간격 단계" },
        { id: "named", title: "쓰임새 간격" },
      ]}
    >
      <Section id="scale" title="간격 단계" description="클래스: p-16 · gap-8 · mt-24처럼 space 뒤 이름을 쓴다">
        <TokenTable>
          {scale.map((t) => (
            <TokenRow
              key={t.name}
              name={t.name}
              value={t.resolved}
              preview={<span className="h-12 shrink-0 rounded-xs bg-brand-solid" style={{ width: `var(${t.cssVar})` }} />}
            />
          ))}
        </TokenTable>
      </Section>
      <Section id="named" title="쓰임새 간격" description="화면 단위로 정한 값이다. 클래스: px-screen-margin · max-w-screen-max">
        <TokenTable>
          {named.map((t) => (
            <TokenRow key={t.name} name={t.name} description={usage[t.name]} value={t.resolved} />
          ))}
        </TokenTable>
      </Section>
    </DocPage>
  );
}

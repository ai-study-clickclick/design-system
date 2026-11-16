import DocPage, { Section } from "../../doc-page";
import { readTokens } from "../read-tokens";
import { TokenRow, TokenTable } from "../token-table";

export const metadata = { title: "라운드 · 딸깍 디자인 시스템" };

// 단계별 쓰는 곳. DESIGN.md "Shapes" 기준
const usage: Record<string, string> = {
  "radius.xs": "배지",
  "radius.sm": "보통 버튼 · Toast · Skeleton 글자 줄",
  "radius.md": "큰 버튼 · 입력창",
  "radius.lg": "카드",
  "radius.xl": "Modal",
  "radius.2xl": "Bottom sheet",
  "radius.full": "아바타처럼 동그란 요소",
};

export default function RadiusPage() {
  const { radius, radiusBase } = readTokens();

  return (
    <DocPage
      href="/docs/tokens/radius"
      category="토큰"
      title="라운드"
      description="면이 크고 위로 뜰수록 라운드가 커진다. 테마는 기준값 하나만 정하고 나머지 단계는 비율로 계산한다"
      toc={[
        { id: "base", title: "기준값" },
        { id: "tokens", title: "라운드 단계" },
      ]}
    >
      <Section id="base" title="기준값" description="radius.base = radius.lg. 다른 단계는 이 값에 0.375 · 0.5 · 0.75 · 1 · 1.25 · 1.5를 곱한다">
        <p className="rounded-md bg-neutral-muted p-20 text-body-md">기본 테마 radius.base: {radiusBase}</p>
      </Section>
      <Section id="tokens" title="라운드 단계" description="클래스: rounded-<이름>. 예: rounded-md">
        <TokenTable>
          {radius.map((t) => (
            <TokenRow
              key={t.name}
              name={t.name}
              description={usage[t.name]}
              value={t.resolved}
              preview={
                <span
                  className="size-40 shrink-0 border-2 border-brand-solid bg-brand-weak"
                  style={{ borderRadius: `var(${t.cssVar})` }}
                />
              }
            />
          ))}
        </TokenTable>
      </Section>
    </DocPage>
  );
}

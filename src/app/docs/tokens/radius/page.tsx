import DocPage, { Section } from "../../../doc-page";
import { readTokens } from "../read-tokens";

export const metadata = { title: "Radius · 딸깍 디자인 시스템" };

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

// 작은 견본에서는 20px 이상이 모두 원처럼 보여서, 모든 단계를 같은 큰 면(가로로 긴 사각형)에 그려 비교한다
export default function RadiusPage() {
  const { radius, radiusBase } = readTokens();

  return (
    <DocPage
      href="/docs/tokens/radius"
      category="Tokens"
      title="Radius"
      description="면이 크고 위로 뜰수록 라운드가 커진다. 테마는 기준값 하나만 정하고 나머지 단계는 비율로 계산한다."
      toc={[
        { id: "base", title: "Base" },
        { id: "tokens", title: "Scale" },
        { id: "compare", title: "Corner zoom" },
      ]}
    >
      <Section
        id="base"
        title="Base"
        description="radius.base = radius.lg다. 다른 단계는 이 값에 0.375 · 0.5 · 0.75 · 1 · 1.25 · 1.5를 곱한다."
      >
        <p className="rounded-md bg-neutral-muted p-20 text-body-md">기본 테마 radius.base: {radiusBase}</p>
      </Section>

      <Section id="tokens" title="Scale" description="같은 크기의 면에 그려 단계마다 차이가 보이게 했다. 웹에서는 corner smoothing 보정(라운드 1.45배 + 부드러운 곡선)으로 그리고, full만 보정하지 않는다. 클래스: rounded-<이름>">
        <ul className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {radius.map((t) => (
            <li key={t.name} className="rounded-md border border-neutral-weak p-16">
              <div
                aria-hidden
                className={`h-[120px] border-2 border-brand-solid bg-brand-weak ${t.name === "radius.full" ? "rounded-full" : ""}`}
                style={{ borderRadius: `var(${t.cssVar})` }}
              />
              <div className="mt-12 flex items-baseline justify-between gap-8">
                <p className="text-label-md">{t.name}</p>
                <p className="text-body-md">{t.resolved}</p>
              </div>
              <p className="mt-2 text-label-sm text-neutral-muted">{usage[t.name]}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="compare" title="Corner zoom" description="모서리 하나를 4배로 키워 나란히 그렸다. 단계마다 곡선 크기를 비교할 수 있다.">
        <ul className="flex flex-wrap gap-16 rounded-md bg-neutral-muted p-24">
          {radius
            .filter((t) => t.name !== "radius.full")
            .map((t) => (
              <li key={t.name}>
                <div
                  aria-hidden
                  className="size-[112px] border-l-2 border-t-2 border-brand-solid bg-layer-default"
                  style={{ borderTopLeftRadius: `calc(var(${t.cssVar}) * 4)` }}
                />
                <p className="mt-8 text-label-md">{t.name.replace("radius.", "")}</p>
                <p className="text-label-sm text-neutral-muted">{t.resolved}</p>
              </li>
            ))}
        </ul>
      </Section>
    </DocPage>
  );
}

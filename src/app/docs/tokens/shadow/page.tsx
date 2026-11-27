import DocPage, { Section } from "../../../doc-page";
import { readTokens } from "../read-tokens";

export const metadata = { title: "Shadow · 딸깍 디자인 시스템" };

// 단계별 쓰는 곳. DESIGN.md "Elevation" 기준
const usage: Record<string, string> = {
  "shadow.s1": "스위치 손잡이 · 고른 칸처럼 작은 요소",
  "shadow.s2": "Bottom sheet · 메뉴",
  "shadow.s3": "Modal(확인 요청)",
};

export default function ShadowPage() {
  const { shadows } = readTokens();

  return (
    <DocPage
      href="/docs/tokens/shadow"
      category="Tokens"
      title="Shadow"
      description="면은 색과 테두리로 먼저 나누고, 그림자는 떠 있는 면(Bottom sheet · Modal)에만 써요"
      toc={[{ id: "tokens", title: "Scale" }]}
    >
      <Section id="tokens" title="Scale" description="클래스: shadow-<이름>. 예: shadow-s2">
        {shadows.length === 0 ? (
          <p className="rounded-md bg-neutral-muted p-20 text-body-md text-neutral-muted">
            아직 DESIGN.md에 그림자 값이 없어요. 값이 들어가면 /sync로 여기에 나와요
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {shadows.map((t) => (
              <li key={t.name} className="rounded-md border border-neutral-weak p-16">
                {/* 그림자가 잘 보이게 연한 회색 바닥 위에 흰 면을 띄운다 */}
                <div className="flex h-[120px] items-center justify-center rounded-sm bg-neutral-muted">
                  <span aria-hidden className="h-[64px] w-[112px] rounded-md bg-layer-floating" style={{ boxShadow: `var(${t.cssVar})` }} />
                </div>
                <div className="mt-12 flex items-baseline justify-between gap-8">
                  <p className="text-label-md">{t.name}</p>
                </div>
                <p className="mt-2 text-body-sm text-neutral-muted">{t.resolved}</p>
                <p className="mt-2 text-label-sm text-neutral-muted">{usage[t.name]}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </DocPage>
  );
}

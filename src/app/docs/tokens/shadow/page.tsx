import DocPage, { Section } from "../../doc-page";
import { readTokens } from "../read-tokens";
import { TokenRow, TokenTable } from "../token-table";

export const metadata = { title: "그림자 · 딸깍 디자인 시스템" };

export default function ShadowPage() {
  const { shadows } = readTokens();

  return (
    <DocPage
      href="/docs/tokens/shadow"
      category="토큰"
      title="그림자"
      description="면은 색과 테두리로 먼저 나누고, 그림자는 떠 있는 면(Bottom sheet · Modal)에만 쓴다"
      toc={[{ id: "tokens", title: "그림자 단계" }]}
    >
      <Section id="tokens" title="그림자 단계" description="클래스: shadow-<이름>. 예: shadow-s2">
        {shadows.length === 0 ? (
          <p className="rounded-md bg-neutral-muted p-20 text-body-md text-neutral-muted">
            아직 DESIGN.md YAML에 그림자 값이 없다. 값이 들어가면 /sync로 여기에 나온다
          </p>
        ) : (
          <TokenTable>
            {shadows.map((t) => (
              <TokenRow
                key={t.name}
                name={t.name}
                value={t.resolved}
                preview={<span className="size-40 shrink-0 rounded-sm bg-layer-floating" style={{ boxShadow: `var(${t.cssVar})` }} />}
              />
            ))}
          </TokenTable>
        )}
      </Section>
    </DocPage>
  );
}

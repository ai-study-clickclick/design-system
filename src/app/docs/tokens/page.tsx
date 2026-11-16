import Link from "next/link";
import { readTokens, type Token } from "./read-tokens";

// 토큰 화면. 기본 테마 기준이다. 값은 src/styles/tokens.css에서 읽는다
export const metadata = { title: "토큰 · 딸깍 디자인 시스템" };

const cssVar = (name: string) => `var(--${name.replace(".", "-")})`;

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-64">
      <h2 className="text-title-md">{title}</h2>
      <p className="mt-4 text-body-md text-neutral-muted">{description}</p>
      <div className="mt-24">{children}</div>
    </section>
  );
}

function Swatch({ token, wide }: { token: Token; wide?: boolean }) {
  return (
    <div className={wide ? "flex items-center gap-12" : ""}>
      <div
        className={`${wide ? "size-40 shrink-0" : "h-48 w-full"} rounded-sm border border-neutral-subtle`}
        style={{ background: cssVar(token.name) }}
      />
      <div className={wide ? "min-w-0" : "mt-8"}>
        <p className="text-label-sm break-all">{token.name}</p>
        <p className="text-body-sm text-neutral-subtle break-all">{token.ref ?? token.value}</p>
      </div>
    </div>
  );
}

function SemanticColors({ title, tokens, kind }: { title: string; tokens: Token[]; kind: "bg" | "fg" | "stroke" }) {
  return (
    <div className="mt-32 first:mt-0">
      <h3 className="text-title-sm">{title}</h3>
      <ul className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token) => (
          <li key={token.name} className="flex items-center gap-12">
            {kind === "fg" ? (
              <span className="flex size-40 shrink-0 items-center justify-center rounded-sm border border-neutral-subtle text-title-sm" style={{ color: cssVar(token.name) }}>
                가
              </span>
            ) : kind === "stroke" ? (
              <span className="size-40 shrink-0 rounded-sm border-2" style={{ borderColor: cssVar(token.name) }} />
            ) : (
              <span className="size-40 shrink-0 rounded-sm border border-neutral-subtle" style={{ background: cssVar(token.name) }} />
            )}
            <span className="min-w-0">
              <span className="block text-label-sm break-all">{token.name}</span>
              <span className="block text-body-sm text-neutral-subtle break-all">{token.ref ?? token.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TokensPage() {
  const { paletteGroups, semantic, typography, spacing, radius, shadows } = readTokens();

  const nav = [
    ["semantic", "쓰임새 색"],
    ["palette", "기본 색표"],
    ["typography", "글자"],
    ["spacing", "간격"],
    ["radius", "라운드"],
    ["shadow", "그림자"],
  ];

  return (
    <main className="mx-auto max-w-5xl px-24 py-64">
      <Link href="/docs" className="text-body-md text-neutral-subtle hover:underline">
        ← 라이브러리
      </Link>
      <h1 className="mt-16 text-title-lg">토큰</h1>
      <p className="mt-8 text-body-md text-neutral-muted">
        기본 테마 기준이다. 원본은 DESIGN.md이고, /sync를 실행하면 이 화면도 바뀐다
      </p>
      <nav className="mt-24 flex flex-wrap gap-8">
        {nav.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="rounded-full bg-neutral-weak px-12 py-6 text-label-md hover:bg-neutral-weak-pressed">
            {label}
          </a>
        ))}
      </nav>

      <Section id="semantic" title="쓰임새 색" description="화면 · 컴포넌트에는 이 이름만 쓴다. 클래스: bg-* · text-* · border-*">
        <SemanticColors title="배경 bg.*" tokens={semantic.bg} kind="bg" />
        <SemanticColors title="글자 · 아이콘 fg.*" tokens={semantic.fg} kind="fg" />
        <SemanticColors title="테두리 stroke.*" tokens={semantic.stroke} kind="stroke" />
      </Section>

      <Section id="palette" title="기본 색표" description="쓰임새 색이 가리키는 실제 색이다. 화면에 바로 쓰지 않는다">
        {paletteGroups.map(([group, tokens]) => (
          <div key={group} className="mt-32 first:mt-0">
            <h3 className="text-title-sm">{group}</h3>
            <ul className="mt-12 grid grid-cols-3 gap-12 sm:grid-cols-5 lg:grid-cols-10">
              {tokens.map((token) => (
                <li key={token.name}>
                  <Swatch token={token} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="typography" title="글자" description="글꼴 Pretendard. 클래스: text-<이름> (크기 · 굵기 · 줄 높이를 함께 정한다)">
        <ul className="divide-y divide-neutral-weak border-y border-neutral-weak">
          {typography.map((t) => (
            <li key={t.name} className="flex flex-col gap-8 py-16 sm:flex-row sm:items-center sm:gap-24">
              <span className="w-[160px] shrink-0">
                <span className="block text-label-md">{t.name}</span>
                <span className="block text-body-sm text-neutral-subtle">
                  {t.fontSize} · {t.fontWeight} · {t.lineHeight}
                </span>
              </span>
              <span style={{ fontSize: t.fontSize, fontWeight: Number(t.fontWeight), lineHeight: t.lineHeight }}>
                다람쥐 헌 쳇바퀴에 타고파 123
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="spacing" title="간격" description="클래스: p-16 · gap-8 · mt-24처럼 space 뒤 이름을 쓴다">
        <ul className="space-y-8">
          {spacing.map((t) => (
            <li key={t.name} className="flex items-center gap-16">
              <span className="w-[200px] shrink-0">
                <span className="block text-label-md">{t.name}</span>
                <span className="block text-body-sm text-neutral-subtle">{t.value}</span>
              </span>
              <span className="h-16 bg-brand-weak" style={{ width: cssVar(t.name) }} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="radius" title="라운드" description="테마의 radius.base(= radius.lg)에서 비율로 계산한다. 클래스: rounded-<이름>">
        <ul className="flex flex-wrap gap-24">
          {radius.map((t) => (
            <li key={t.name} className="w-[96px]">
              <div className="size-[96px] border border-neutral-weak bg-neutral-muted" style={{ borderRadius: t.value }} />
              <p className="mt-8 text-label-sm">{t.name}</p>
              <p className="text-body-sm text-neutral-subtle">{t.value}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="shadow" title="그림자" description="떠 있는 면(Bottom sheet · Modal)에만 쓴다. 클래스: shadow-<이름>">
        {shadows.length === 0 ? (
          <p className="rounded-sm bg-neutral-muted p-16 text-body-md text-neutral-muted">
            아직 DESIGN.md YAML에 그림자 값이 없다. 값이 들어가면 /sync로 여기에 나온다.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-24">
            {shadows.map((t) => (
              <li key={t.name} className="w-[160px]">
                <div className="h-96 rounded-lg bg-layer-floating" style={{ boxShadow: t.value }} />
                <p className="mt-12 text-label-sm">{t.name}</p>
                <p className="text-body-sm text-neutral-subtle">{t.value}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}

import type { Token } from "./read-tokens";

// 토큰 목록 한 줄: 왼쪽 토큰 이름 · 설명, 오른쪽 견본 · 가리키는 값 (SEED 토큰 표 구성)
export function TokenTable({ children }: { children: React.ReactNode }) {
  return <ul className="divide-y divide-neutral-weak border-y border-neutral-weak">{children}</ul>;
}

export function TokenRow({
  name,
  description,
  preview,
  value,
  detail,
}: {
  name: string;
  description?: string;
  preview?: React.ReactNode;
  value: string;
  detail?: string;
}) {
  return (
    <li className="flex items-center gap-16 py-12">
      <div className="min-w-0 flex-1">
        <p className="text-label-md break-all">{name}</p>
        {description && <p className="mt-2 text-body-sm text-neutral-subtle">{description}</p>}
      </div>
      <div className="flex w-[280px] shrink-0 items-center gap-8">
        {preview}
        <span className="min-w-0">
          <span className="block text-body-md break-all">{value}</span>
          {detail && <span className="block text-body-sm text-neutral-subtle">{detail}</span>}
        </span>
      </div>
    </li>
  );
}

// 색 견본 동그라미. 흰색 계열도 보이게 옅은 테두리를 두른다
export function ColorDot({ cssVar, kind = "fill" }: { cssVar: string; kind?: "fill" | "text" | "stroke" }) {
  if (kind === "text") {
    return (
      <span className="flex size-24 shrink-0 items-center justify-center text-label-md" style={{ color: `var(${cssVar})` }}>
        가
      </span>
    );
  }
  if (kind === "stroke") {
    return <span className="size-24 shrink-0 rounded-full border-2" style={{ borderColor: `var(${cssVar})` }} />;
  }
  return (
    <span className="size-24 shrink-0 rounded-full border border-neutral-subtle" style={{ background: `var(${cssVar})` }} />
  );
}

export const tokenValue = (t: Token) => t.ref ?? t.resolved;
export const tokenDetail = (t: Token) => (t.ref && t.resolved !== t.ref ? t.resolved : undefined);

// 컴포넌트 갤러리 틀. 사이트 틀이라 견본 배치에만 대괄호 값을 쓴다(docs/CONVENTIONS.md "코드에서 쓰기" 예외)
// 견본 설명 레이블은 고정폭 회색 글자로 써서 컴포넌트 안 글자와 구분한다

/** 견본 하나 + 위에 기준 레이블(예: variant=primary · size=lg) */
export function Example({ label, children, grow }: { label: string; children: React.ReactNode; grow?: boolean }) {
  return (
    <figure className={grow ? "flex min-w-0 flex-1 flex-col gap-8" : "flex flex-col gap-8"}>
      <figcaption className="font-mono text-[11px] leading-[16px] text-neutral-subtle">{label}</figcaption>
      <div className="flex flex-wrap items-center gap-12">{children}</div>
    </figure>
  );
}

/** 견본 묶음 판. 기준이 같은 견본을 한 줄에 */
export function Board({ title, children, column }: { title?: string; children: React.ReactNode; column?: boolean }) {
  return (
    <div className="rounded-lg border border-neutral-weak bg-layer-default p-24">
      {title && <p className="mb-16 text-label-md text-neutral-muted">{title}</p>}
      <div className={column ? "flex flex-col gap-24" : "flex flex-wrap items-start gap-x-32 gap-y-24"}>{children}</div>
    </div>
  );
}

/** 실제 화면 폭(375)으로 보는 판 */
export function Phone({ label, children, bare }: { label: string; children: React.ReactNode; bare?: boolean }) {
  return (
    <figure className="flex w-[375px] max-w-full flex-col gap-8">
      <figcaption className="font-mono text-[11px] leading-[16px] text-neutral-subtle">{label}</figcaption>
      <div className={bare ? "overflow-hidden rounded-lg border border-neutral-weak bg-layer-default" : "flex flex-col gap-16 rounded-lg border border-neutral-weak bg-layer-default p-16"}>
        {children}
      </div>
    </figure>
  );
}

export function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-start gap-24">{children}</div>;
}

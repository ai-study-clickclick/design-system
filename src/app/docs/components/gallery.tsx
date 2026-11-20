// 컴포넌트 갤러리 틀. 사이트 틀이라 견본 배치에만 대괄호 값을 쓴다(docs/CONVENTIONS.md "코드에서 쓰기" 예외)
// 같은 컴포넌트의 케이스는 큰 판 하나에 모으고, 케이스 사이는 넓게 띄운다
// 견본 설명 레이블은 고정폭 회색 글자로 써서 컴포넌트 안 글자와 구분한다
const caption = "font-mono text-[11px] leading-[16px] text-neutral-subtle";

/** 견본 하나 + 위에 기준 레이블(예: variant=primary · size=lg) */
export function Example({ label, children, grow }: { label: string; children: React.ReactNode; grow?: boolean }) {
  return (
    <figure className={grow ? "flex min-w-0 flex-1 flex-col gap-12" : "flex flex-col gap-12"}>
      <figcaption className={caption}>{label}</figcaption>
      <div className="flex flex-wrap items-center gap-12">{children}</div>
    </figure>
  );
}

/** 견본 묶음 판. title은 판 안의 공통 기준 */
export function Board({ title, children, column }: { title?: string; children: React.ReactNode; column?: boolean }) {
  return (
    <div className="rounded-lg border border-neutral-weak bg-layer-default p-32">
      {title && <p className="mb-24 text-label-md text-neutral-muted">{title}</p>}
      <div className={column ? "flex flex-col gap-40" : "flex flex-wrap items-start gap-x-48 gap-y-40"}>{children}</div>
    </div>
  );
}

/** 실제 화면 폭(375)으로 보는 견본. bare는 면이 판과 같은 색이라 경계선을 둔다(TopBar · 목록 등) */
export function Phone({ label, children, bare }: { label: string; children: React.ReactNode; bare?: boolean }) {
  return (
    <figure className="flex w-[375px] max-w-full flex-col gap-12">
      <figcaption className={caption}>{label}</figcaption>
      <div className={bare ? "overflow-hidden rounded-md border border-neutral-weak" : "flex flex-col gap-16"}>{children}</div>
    </figure>
  );
}

/** 같은 컴포넌트의 화면 폭 견본을 큰 판 하나에 */
export function Grid({ children }: { children: React.ReactNode }) {
  return <Board>{children}</Board>;
}

/** 큰 판 안의 한 묶음. 묶음 사이는 줄로 나눈다 */
export function Part({ title, children, column }: { title?: string; children: React.ReactNode; column?: boolean }) {
  return (
    <section className="flex flex-col gap-24 border-t border-neutral-weak pt-40 first:border-t-0 first:pt-0">
      {title && <p className="text-label-md text-neutral-muted">{title}</p>}
      <div className={column ? "flex flex-col gap-40" : "flex flex-wrap items-start gap-x-48 gap-y-40"}>{children}</div>
    </section>
  );
}

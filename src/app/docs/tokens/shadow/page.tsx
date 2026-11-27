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
      toc={[
        { id: "tokens", title: "Scale" },
        { id: "usage", title: "실제 화면" },
      ]}
    >
      <Section id="tokens" title="Scale" description="클래스: shadow-<이름>. 예: shadow-s2">
        {shadows.length === 0 ? (
          <p className="rounded-md bg-neutral-muted p-20 text-body-md text-neutral-muted">
            아직 DESIGN.md에 그림자 값이 없어요. 값이 들어가면 /sync로 여기에 나와요
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {shadows.map((t) => (
              <li key={t.name} className="overflow-hidden rounded-md border border-neutral-weak">
                {/* Color 견본처럼 회색 바닥을 카드 위쪽 끝까지 채우고, 그 위에 흰 면을 띄운다 */}
                <div className="flex h-[140px] items-center justify-center bg-neutral-muted">
                  <span aria-hidden className="h-[64px] w-[112px] rounded-md bg-layer-floating" style={{ boxShadow: `var(${t.cssVar})` }} />
                </div>
                <div className="p-16">
                  <p className="text-label-md">{t.name}</p>
                  <p className="mt-2 text-body-sm text-neutral-muted">{t.resolved}</p>
                  <p className="mt-2 text-label-sm text-neutral-muted">{usage[t.name]}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="usage" title="실제 화면" description="화면 위로 더 높이 뜰수록 그림자가 진해져요. 평소 면(카드)에는 그림자 없이 테두리를 써요">
        <ul className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
          <UsageCard name="shadow.s1" title="화면 안 작은 요소" note="스위치 손잡이 · SegmentedControl 고른 칸">
            <div className="flex w-full flex-col gap-16 rounded-md bg-layer-default p-16">
              <div className="flex rounded-(--segmented-control-rounded) bg-neutral-weak p-(--segmented-control-md-padding) text-label-md">
                <span className="flex h-(--segmented-control-md-item-height) flex-1 items-center justify-center rounded-(--segmented-control-md-item-rounded) bg-layer-default shadow-s1">국내</span>
                <span className="flex h-(--segmented-control-md-item-height) flex-1 items-center justify-center text-neutral-subtle">해외</span>
              </div>
              <div className="flex items-center justify-between text-body-md">
                <span>알림 받기</span>
                <span className="flex h-(--switch-md-height) w-(--switch-md-width) items-center justify-end rounded-full bg-brand-solid px-(--switch-md-padding)">
                  <span className="size-(--switch-md-thumb-size) rounded-full bg-layer-default shadow-s1" />
                </span>
              </div>
            </div>
          </UsageCard>
          <UsageCard name="shadow.s2" title="화면 위에 뜬 면" note="Bottom sheet · 메뉴">
            <div className="relative h-full w-full overflow-hidden rounded-md bg-layer-default">
              <div className="flex flex-col gap-8 p-16">
                <span className="h-8 w-2/3 rounded-full bg-neutral-weak" />
                <span className="h-8 w-1/2 rounded-full bg-neutral-weak" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 rounded-t-2xl bg-layer-floating p-16 shadow-s2">
                <p className="text-title-sm">계좌 고르기</p>
                <span className="h-8 w-3/4 rounded-full bg-neutral-weak" />
                <span className="h-8 w-1/2 rounded-full bg-neutral-weak" />
              </div>
            </div>
          </UsageCard>
          <UsageCard name="shadow.s3" title="가장 높이 뜬 면" note="Modal(확인 요청). 뒤 배경 bg.overlay와 함께">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-overlay">
              <div className="flex w-3/4 flex-col gap-8 rounded-xl bg-layer-floating p-16 shadow-s3">
                <p className="text-label-base">해지할까요?</p>
                <span className="h-8 w-full rounded-full bg-neutral-weak" />
                <span className="h-24 w-full rounded-sm bg-brand-solid" />
              </div>
            </div>
          </UsageCard>
        </ul>
      </Section>
    </DocPage>
  );
}

function UsageCard({ name, title, note, children }: { name: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <li className="overflow-hidden rounded-md border border-neutral-weak">
      <div className="flex h-[200px] items-center justify-center bg-neutral-muted p-16">{children}</div>
      <div className="p-16">
        <p className="text-label-md">{name} · {title}</p>
        <p className="mt-2 text-label-sm text-neutral-muted">{note}</p>
      </div>
    </li>
  );
}

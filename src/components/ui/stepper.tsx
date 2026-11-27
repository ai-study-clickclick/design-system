import { cn } from "./cn";

// Stepper: 여러 단계 흐름에서 지금 몇 번째 단계인지 보여 주는 진행 막대. MVP 19개 밖 임시 추가
// Top bar 바로 아래에 화면 폭으로 둔다. 확인 · 결과 화면에는 두지 않는다(docs/PATTERNS.md 여러 단계 흐름)
// 높이 4 · 트랙 bg.neutral-weak · 채움 bg.brand-solid, 단계가 바뀌면 d4로 늘어난다
export type StepperProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** 지금 단계(1부터) */
  value: number;
  /** 전체 단계 수 */
  total: number;
};

export function Stepper({ value, total, className, ...props }: StepperProps) {
  const current = Math.min(Math.max(value, 0), total);
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`${total}단계 중 ${current}단계`}
      data-slot="stepper"
      className={cn("h-(--stepper-height) w-full overflow-hidden bg-neutral-weak", className)}
      {...props}
    >
      <div
        className="h-full rounded-r-full bg-brand-solid transition-[width] duration-(--duration-d4) ease-(--timing-function-enter)"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";

// Spinner: 기다림을 알리는 원형 표시(DESIGN.md "로딩과 알림 시간")
// size sm 24(요소 안) · md 40(전체 화면). tone은 버튼 밖에서만 쓰고, 버튼 안은 버튼 글자색(inherit)
// tone 색은 임시 토큰(src/styles/temp-tokens.css, SEED Progress Circle 값)
const spinnerVariants = cva("inline-block shrink-0 animate-spin", {
  variants: {
    size: {
      sm: "size-(--spinner-small-size)",
      md: "size-(--spinner-size)",
    },
  },
  defaultVariants: { size: "md" },
});

const toneColors = {
  neutral: ["var(--spinner-neutral-track-color)", "var(--spinner-neutral-range-color)"],
  brand: ["var(--spinner-brand-track-color)", "var(--spinner-brand-range-color)"],
  staticWhite: ["var(--spinner-static-white-track-color)", "var(--spinner-static-white-range-color)"],
  inherit: ["transparent", "currentColor"],
} as const;

export type SpinnerProps = Omit<React.ComponentProps<"svg">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    /** neutral(기본) · brand · staticWhite(어두운 덮개 위). inherit은 Button 안에서만 */
    tone?: keyof typeof toneColors;
    /** 화면 읽기 프로그램에 읽어 줄 말 */
    label?: string;
  };

export function Spinner({ size, tone = "neutral", label = "불러오는 중", className, ...props }: SpinnerProps) {
  const [track, range] = toneColors[tone];
  return (
    <svg
      viewBox="0 0 40 40"
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4" style={{ stroke: track }} />
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="25 100"
        style={{ stroke: range }}
      />
    </svg>
  );
}

export { spinnerVariants };

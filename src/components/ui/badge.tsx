import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";

// Badge: 상태 · 분류를 짧게 보여 주는 표시. 눌러지지 않는다
// variant solid · weak · outline, tone 6가지. 색 규칙은 DESIGN.md "컴포넌트별 사용 규칙"의 Badge
// 크기 하나(최소 높이 24)라 size 없음(3-2 비교표)
const badgeVariants = cva(
  "inline-flex min-h-(--badge-brand-min-height) max-w-full items-center rounded-xs px-8 py-4 text-label-sm whitespace-nowrap",
  {
    variants: {
      variant: {
        solid: "font-bold",
        weak: "font-medium",
        outline: "border font-bold",
      },
      tone: {
        neutral: "",
        brand: "",
        informative: "",
        positive: "",
        warning: "",
        critical: "",
      },
    },
    compoundVariants: [
      // solid = bg.<톤>-solid + fg.on-<톤>-solid. neutral solid는 [결정 필요] 임시 값
      { variant: "solid", tone: "neutral", className: "bg-neutral-solid text-on-neutral-solid" },
      { variant: "solid", tone: "brand", className: "bg-brand-solid text-on-brand-solid" },
      { variant: "solid", tone: "informative", className: "bg-informative-solid text-on-informative-solid" },
      { variant: "solid", tone: "positive", className: "bg-positive-solid text-on-positive-solid" },
      { variant: "solid", tone: "warning", className: "bg-warning-solid text-on-warning-solid" },
      { variant: "solid", tone: "critical", className: "bg-critical-solid text-on-critical-solid" },
      // weak = 배경 <톤> 200(neutral gray-300, 임시 badge-weak-* 토큰) + fg.<톤>-contrast. neutral만 fg.neutral-muted
      { variant: "weak", tone: "neutral", className: "bg-(--badge-weak-neutral-background-color) text-neutral-muted" },
      { variant: "weak", tone: "brand", className: "bg-(--badge-weak-brand-background-color) text-brand-contrast" },
      { variant: "weak", tone: "informative", className: "bg-(--badge-weak-informative-background-color) text-informative-contrast" },
      { variant: "weak", tone: "positive", className: "bg-(--badge-weak-positive-background-color) text-positive-contrast" },
      { variant: "weak", tone: "warning", className: "bg-(--badge-weak-warning-background-color) text-warning-contrast" },
      { variant: "weak", tone: "critical", className: "bg-(--badge-weak-critical-background-color) text-critical-contrast" },
      // outline = stroke.<톤>-weak + fg.<톤>. brand 글자는 fg.brand-contrast, neutral은 stroke.neutral-muted + fg.neutral-muted
      { variant: "outline", tone: "neutral", className: "border-neutral-muted text-neutral-muted" },
      { variant: "outline", tone: "brand", className: "border-brand-weak text-brand-contrast" },
      { variant: "outline", tone: "informative", className: "border-informative-weak text-informative" },
      { variant: "outline", tone: "positive", className: "border-positive-weak text-positive" },
      { variant: "outline", tone: "warning", className: "border-warning-weak text-warning" },
      { variant: "outline", tone: "critical", className: "border-critical-weak text-critical" },
    ],
    defaultVariants: { variant: "weak", tone: "neutral" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ variant, tone, className, children, ...props }: BadgeProps) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant, tone }), className)} {...props}>
      <span className="truncate">{children}</span>
    </span>
  );
}

export { badgeVariants };

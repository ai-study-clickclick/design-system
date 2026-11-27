"use client";

import { useId } from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check, Minus } from "lucide-react";
import { cn } from "./cn";

// Checkbox: 여러 개를 고르거나 하나를 켜고 끈다
// label · checked(indeterminate 포함) · disabled · invalid / size md · lg / variant square · ghost(3-2 비교표)
// 상자 md 20 · lg 24, 줄 높이 md 32 · lg 36, 라운드 radius.xs. DESIGN.md checkbox-* 토큰
// 미선택 테두리 · Ghost 꺼짐 체크는 stroke.unselected · fg.unselected(임시, temp-tokens.css)
// 묶음(전체 동의 + 하위 항목)은 부모 square, 자식 ghost로 둔다
// 라벨까지 누르는 영역이다(DESIGN.md "Checkbox · Radio · Switch")
export type CheckboxProps = Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "asChild"> & {
  label?: React.ReactNode;
  size?: "md" | "lg";
  /** square: 필수이거나 꼭 알아야 할 때 · ghost: 필수가 아니고 3개 이하 */
  variant?: "square" | "ghost";
  invalid?: boolean;
};

export function Checkbox({
  id,
  label,
  size = "md",
  variant = "square",
  invalid,
  disabled,
  checked,
  className,
  ...props
}: CheckboxProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const square = variant === "square";
  return (
    <div
      data-slot="checkbox"
      className={cn("inline-flex items-center", square ? "gap-8" : "gap-(--checkbox-ghost-gap)", size === "md" ? "min-h-32" : "min-h-36", className)}
    >
      <CheckboxPrimitive.Root
        id={inputId}
        disabled={disabled}
        checked={checked}
        aria-invalid={invalid || undefined}
        className={cn(
          "peer flex shrink-0 items-center justify-center rounded-xs",
          square ? (size === "md" ? "size-20" : "size-24") : size === "md" ? "size-(--checkbox-ghost-md-box-size)" : "size-24",
          square
            ? cn(
                "border bg-layer-default text-on-brand-solid",
                invalid ? "border-critical-solid" : "border-unselected",
                "aria-checked:border-0 aria-checked:bg-brand-solid",
                checked === "indeterminate" && "border-0 bg-brand-solid",
                "disabled:border-0 disabled:bg-disabled disabled:text-disabled disabled:aria-checked:bg-disabled",
              )
            : cn("text-unselected aria-checked:text-brand disabled:text-disabled", checked === "indeterminate" && "text-brand"),
        )}
        {...props}
      >
        {square ? (
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            {checked === "indeterminate" ? (
              <Minus aria-hidden strokeWidth={3} className={size === "md" ? "size-12" : "size-14"} />
            ) : (
              <Check aria-hidden strokeWidth={3} className={size === "md" ? "size-12" : "size-14"} />
            )}
          </CheckboxPrimitive.Indicator>
        ) : checked === "indeterminate" ? (
          <Minus aria-hidden strokeWidth={3} className={size === "md" ? "size-14" : "size-18"} />
        ) : (
          <Check aria-hidden strokeWidth={3} className={size === "md" ? "size-14" : "size-18"} />
        )}
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "cursor-pointer select-none",
            size === "md" ? "text-body-md" : "text-body-lg",
            disabled ? "cursor-not-allowed text-disabled" : "text-neutral",
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

/** 부모 square(전체 동의) 아래 자식 ghost 묶음. 자식의 체크 가운데 · 글자 시작을 부모(lg)에 맞춘다 */
export function CheckboxGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="checkbox-group" className={cn("flex flex-col", className)} {...props} />;
}

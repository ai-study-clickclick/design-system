"use client";

import { useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "./cn";
import { usePressScale } from "./press";
import { Spinner } from "./spinner";

// Button: variant primary · secondary · critical · outline, size sm(36, 임시) · md(44) · lg(52)
// 폭은 Button이 아니라 놓는 자리가 정한다(fullWidth 없음, 3-2 비교표 결정 3)
// 채움 버튼은 한 화면에 하나(DESIGN.md "컴포넌트별 사용 규칙")
const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-8 whitespace-nowrap select-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-solid text-on-brand-solid active:bg-brand-solid-pressed disabled:bg-disabled disabled:text-disabled",
        secondary: "bg-neutral-weak text-neutral active:bg-neutral-weak-pressed disabled:bg-disabled disabled:text-disabled",
        critical: "bg-critical-solid text-on-critical-solid active:bg-critical-solid-pressed disabled:bg-disabled disabled:text-disabled",
        // outline md는 DESIGN.md에 아직 없어 크기만 md를 쓴다(button-outline-md 추가 요청)
        outline: "border border-neutral-muted bg-transparent text-neutral active:bg-transparent-pressed disabled:text-disabled",
      },
      size: {
        lg: "h-(--button-primary-height) rounded-md px-20 text-label-lg",
        md: "h-(--button-medium-height) rounded-(--button-md-rounded) px-16 text-label-md",
        sm: "h-(--button-sm-height) rounded-sm px-14 text-label-md",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

// 로딩이 1초를 넘으면 배경을 -pressed로 고정한다(DESIGN.md "상태와 피드백"의 로딩)
const loadingBackground = {
  primary: "bg-brand-solid-pressed",
  secondary: "bg-neutral-weak-pressed",
  critical: "bg-critical-solid-pressed",
  outline: "bg-transparent-pressed",
} as const;

const LOADING_DELAY = 1000;

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** 누른 뒤 처리 중. 바로 다시 누를 수 없고, 1초가 넘으면 글자 대신 Spinner를 보인다 */
    loading?: boolean;
    /** 링크 등 다른 요소를 버튼 모양으로 쓸 때 */
    asChild?: boolean;
  };

export function Button({
  variant,
  size,
  loading = false,
  asChild = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const press = usePressScale<HTMLButtonElement>();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowSpinner(false);
      return;
    }
    const timer = setTimeout(() => setShowSpinner(true), LOADING_DELAY);
    return () => clearTimeout(timer);
  }, [loading]);

  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, size }),
        loading && "pointer-events-none",
        showSpinner && loadingBackground[variant ?? "primary"],
        className,
      )}
      {...(disabled || loading ? {} : press)}
      {...props}
    >
      {showSpinner ? (
        <>
          <span className="invisible inline-flex items-center gap-8">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner size="sm" tone="inherit" />
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { buttonVariants };

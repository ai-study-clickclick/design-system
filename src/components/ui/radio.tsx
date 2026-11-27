"use client";

import { createContext, useContext, useId } from "react";
import { RadioGroup as RadioPrimitive } from "radix-ui";
import { cn } from "./cn";

// Radio: 여러 개 중 하나를 고른다. 세로 배치가 기본
// RadioGroup(name · value · disabled) · RadioGroupItem(value · label · disabled) / size md · lg(3-2 비교표)
// 동그라미 md 20(점 8, 비활성 10) · lg 24(점 10, 비활성 12). DESIGN.md radio-* 토큰
const SizeContext = createContext<"md" | "lg">("md");
// 묶음 전체 비활성도 라벨 · 점에 반영되게 묶음의 disabled를 함께 넘긴다
const DisabledContext = createContext<boolean | undefined>(undefined);

export type RadioGroupProps = React.ComponentProps<typeof RadioPrimitive.Root> & { size?: "md" | "lg" };

export function RadioGroup({ size = "md", className, ...props }: RadioGroupProps) {
  return (
    <SizeContext.Provider value={size}>
      <DisabledContext.Provider value={props.disabled}>
        <RadioPrimitive.Root data-slot="radio-group" className={cn("flex flex-col", className)} {...props} />
      </DisabledContext.Provider>
    </SizeContext.Provider>
  );
}

export type RadioGroupItemProps = Omit<React.ComponentProps<typeof RadioPrimitive.Item>, "asChild"> & {
  label?: React.ReactNode;
};

export function RadioGroupItem({ id, label, disabled: itemDisabled, className, ...props }: RadioGroupItemProps) {
  const size = useContext(SizeContext);
  const groupDisabled = useContext(DisabledContext);
  const disabled = itemDisabled || groupDisabled;
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <div data-slot="radio" className={cn("flex items-center", size === "md" ? "min-h-(--radio-md-min-height) gap-(--radio-md-gap)" : "min-h-(--radio-lg-min-height) gap-(--radio-lg-gap)", className)}>
      <RadioPrimitive.Item
        id={inputId}
        disabled={disabled}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-unselected bg-layer-default",
          "aria-checked:border-0 aria-checked:bg-brand-solid disabled:border-0 disabled:bg-disabled disabled:aria-checked:bg-disabled",
          size === "md" ? "size-(--radio-md-size)" : "size-(--radio-lg-size)",
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          className={cn(
            // 안쪽 점은 fg.on-brand-solid(DESIGN.md "상태와 피드백"). 다크에서도 흰 점
            "rounded-full bg-(--fg-on-brand-solid)",
            disabled && "bg-(--radio-disabled-dot-color)",
            size === "md"
              ? disabled ? "size-(--radio-md-disabled-dot-size)" : "size-(--radio-md-dot-size)"
              : disabled ? "size-(--radio-lg-disabled-dot-size)" : "size-(--radio-lg-dot-size)",
          )}
        />
      </RadioPrimitive.Item>
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

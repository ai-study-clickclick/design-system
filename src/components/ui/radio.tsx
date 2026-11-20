"use client";

import { createContext, useContext, useId } from "react";
import { RadioGroup as RadioPrimitive } from "radix-ui";
import { cn } from "./cn";

// Radio: 여러 개 중 하나를 고른다. 세로 배치가 기본
// RadioGroup(name · value · disabled) · RadioGroupItem(value · label · disabled) / size md · lg(3-2 비교표)
// 동그라미 md 20(점 8) · lg 24(점 10)는 SEED 값 임시(DESIGN.md 추가 요청)
const SizeContext = createContext<"md" | "lg">("md");

export type RadioGroupProps = React.ComponentProps<typeof RadioPrimitive.Root> & { size?: "md" | "lg" };

export function RadioGroup({ size = "md", className, ...props }: RadioGroupProps) {
  return (
    <SizeContext.Provider value={size}>
      <RadioPrimitive.Root data-slot="radio-group" className={cn("flex flex-col", className)} {...props} />
    </SizeContext.Provider>
  );
}

export type RadioGroupItemProps = Omit<React.ComponentProps<typeof RadioPrimitive.Item>, "asChild"> & {
  label?: React.ReactNode;
};

export function RadioGroupItem({ id, label, disabled, className, ...props }: RadioGroupItemProps) {
  const size = useContext(SizeContext);
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <div data-slot="radio" className={cn("flex items-center gap-8", size === "md" ? "min-h-32" : "min-h-36", className)}>
      <RadioPrimitive.Item
        id={inputId}
        disabled={disabled}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-neutral-weak bg-layer-default",
          "aria-checked:border-0 aria-checked:bg-brand-solid disabled:border-0 disabled:bg-disabled",
          size === "md" ? "size-20" : "size-24",
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          className={cn("rounded-full bg-layer-default", disabled && "bg-neutral-weak-pressed", size === "md" ? "size-8" : "size-10")}
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

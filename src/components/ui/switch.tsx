"use client";

import { useId } from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "./cn";

// Switch: 켜면 바로 반영되는 설정. label · checked · disabled / size sm · md · lg(16 · 24 · 32)
// 트랙 · 손잡이 · 여백은 DESIGN.md switch-* 토큰. 켜짐 이동 = 트랙 폭 − 손잡이 − 여백 2개(10 · 14 · 20). 켜짐 트랙 bg.brand-solid
// 손잡이 크기 켜짐 1 · 꺼짐 0.8, 비활성은 투명도 0.38(DESIGN.md "상태와 피드백")
const sizes = {
  sm: { track: "h-(--switch-sm-height) w-(--switch-sm-width) px-(--switch-sm-padding)", thumb: "size-(--switch-sm-thumb-size)", on: "group-aria-checked:translate-x-10", gap: "gap-(--switch-sm-gap)", min: "min-h-(--switch-sm-min-height)", label: "text-body-sm" },
  md: { track: "h-(--switch-md-height) w-(--switch-md-width) px-(--switch-md-padding)", thumb: "size-(--switch-md-thumb-size)", on: "group-aria-checked:translate-x-14", gap: "gap-(--switch-md-gap)", min: "min-h-(--switch-md-min-height)", label: "text-body-md" },
  lg: { track: "h-(--switch-lg-height) w-(--switch-lg-width) px-(--switch-lg-padding)", thumb: "size-(--switch-lg-thumb-size)", on: "group-aria-checked:translate-x-20", gap: "gap-(--switch-lg-gap)", min: "min-h-(--switch-lg-min-height)", label: "text-body-lg" },
};

export type SwitchProps = Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "asChild"> & {
  label?: React.ReactNode;
  size?: keyof typeof sizes;
};

export function Switch({ id, label, size = "md", disabled, className, ...props }: SwitchProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const s = sizes[size];
  return (
    <div
      data-slot="switch"
      className={cn("inline-flex items-center", s.gap, s.min, disabled && "opacity-38", className)}
    >
      <SwitchPrimitive.Root
        id={inputId}
        disabled={disabled}
        className={cn(
          "group flex shrink-0 items-center rounded-full bg-neutral-weak-pressed transition-colors duration-150 aria-checked:bg-brand-solid",
          s.track,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block scale-80 rounded-full bg-layer-default shadow-s1 transition-transform duration-150 group-aria-checked:scale-100",
            s.thumb,
            s.on,
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={inputId} className={cn("cursor-pointer font-medium select-none", s.label, "text-neutral")}>
          {label}
        </label>
      )}
    </div>
  );
}

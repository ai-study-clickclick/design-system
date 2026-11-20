"use client";

import { useId } from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "./cn";

// Switch: 켜면 바로 반영되는 설정. label · checked · disabled / size sm · md · lg(16 · 24 · 32)
// 트랙 폭과 손잡이 크기는 SEED Switchmark 값 임시(DESIGN.md 추가 요청). 켜짐 트랙 bg.brand-solid
// 손잡이 크기 켜짐 1 · 꺼짐 0.8, 비활성은 투명도 0.38(DESIGN.md "상태와 피드백")
const sizes = {
  sm: { track: "h-16 w-(--switch-sm-width)", thumb: "size-12", on: "group-aria-checked:translate-x-10", gap: "gap-6", label: "text-body-sm" },
  md: { track: "h-24 w-(--switch-md-width)", thumb: "size-20", on: "group-aria-checked:translate-x-14", gap: "gap-8", label: "text-body-md" },
  lg: { track: "h-32 w-(--switch-lg-width)", thumb: "size-(--switch-lg-thumb)", on: "group-aria-checked:translate-x-(--switch-lg-travel)", gap: "gap-10", label: "text-body-lg" },
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
      className={cn("inline-flex items-center", s.gap, size === "lg" ? "min-h-32" : "min-h-24", disabled && "opacity-38", className)}
    >
      <SwitchPrimitive.Root
        id={inputId}
        disabled={disabled}
        className={cn(
          "group flex shrink-0 items-center rounded-full bg-neutral-weak-pressed px-2 transition-colors duration-150 aria-checked:bg-brand-solid",
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

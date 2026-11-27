"use client";

import { createContext, useContext, useState } from "react";
import { ToggleGroup } from "radix-ui";
import { cn } from "./cn";

// Chip: 누르면 켜지고 꺼지는 둥근 칩(기간 · 카테고리 필터 등). MVP 19개 밖 임시 추가
// 높이 36 · 좌우 14 · 글자 14(label-md)
// variant solid(탭처럼 하나만 고를 때, 단독 칩): 꺼짐 bg.neutral-weak + fg.neutral-muted · 켜짐 bg.neutral-solid + fg.on-neutral-solid
// variant outline(여러 개 고를 때): 꺼짐 bg.layer-default + stroke.neutral-weak · 켜짐 brand-600 줄 1.5(1 + 안쪽 링 0.5) + 글자(임시)
// ChipGroup: type single(하나만, 다시 눌러도 안 풀림, 기본 solid) · multiple(여러 개, 기본 outline). layout wrap(줄바꿈) · scroll(가로 스크롤)
// 금액 빠른 입력(+1만 원)처럼 켜고 끄지 않고 바로 실행하면 Chip을 단독으로 쓴다(누르면 onClick)
type ChipVariant = "solid" | "outline";
const chipBase = "inline-flex h-(--chip-height) shrink-0 items-center justify-center gap-4 rounded-full px-14 text-label-md whitespace-nowrap disabled:text-disabled";
const chipVariants: Record<ChipVariant, string> = {
  solid: cn(
    "bg-neutral-weak text-neutral-muted active:bg-neutral-weak-pressed disabled:bg-disabled",
    "data-[state=on]:bg-neutral-solid data-[state=on]:text-on-neutral-solid data-[state=on]:active:bg-neutral-solid-pressed",
  ),
  outline: cn(
    "border border-neutral-weak bg-layer-default text-neutral-muted active:bg-layer-default-pressed disabled:border-neutral-muted",
    "data-[state=on]:border-(--chip-outline-selected-color) data-[state=on]:text-(--chip-outline-selected-color) data-[state=on]:ring-(length:--chip-outline-selected-ring-width) data-[state=on]:ring-(color:--chip-outline-selected-color) data-[state=on]:ring-inset",
  ),
};
const chipClass = (variant: ChipVariant) => cn(chipBase, chipVariants[variant]);
const VariantContext = createContext<ChipVariant>("solid");

type ChipGroupBase = { layout?: "wrap" | "scroll"; variant?: ChipVariant; className?: string; children: React.ReactNode; "aria-label"?: string; disabled?: boolean };
export type ChipGroupProps =
  | (ChipGroupBase & { type: "single"; value?: string; defaultValue?: string; onValueChange?: (value: string) => void })
  | (ChipGroupBase & { type: "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void });

export function ChipGroup({ layout = "wrap", variant, className, ...props }: ChipGroupProps) {
  const v = variant ?? (props.type === "multiple" ? "outline" : "solid");
  const layoutClass = cn("flex gap-8", layout === "wrap" ? "flex-wrap" : "overflow-x-auto", className);
  if (props.type === "single") return <SingleChipGroup {...props} variant={v} className={layoutClass} />;
  return (
    <VariantContext.Provider value={v}>
      <ToggleGroup.Root data-slot="chip-group" className={layoutClass} {...props} />
    </VariantContext.Provider>
  );
}

// 하나만 고르는 묶음은 이미 고른 칩을 다시 눌러도 선택이 풀리지 않게 값을 직접 쥔다
function SingleChipGroup({ value, defaultValue, onValueChange, variant, className, ...rest }: Extract<ChipGroupProps, { type: "single" }>) {
  const [inner, setInner] = useState(defaultValue);
  return (
    <VariantContext.Provider value={variant ?? "solid"}>
      <ToggleGroup.Root
        data-slot="chip-group"
        className={className}
        {...rest}
        type="single"
        value={value ?? inner}
        onValueChange={(next: string) => {
          if (!next) return;
          setInner(next);
          onValueChange?.(next);
        }}
      />
    </VariantContext.Provider>
  );
}

export function ChipGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroup.Item>) {
  const variant = useContext(VariantContext);
  return <ToggleGroup.Item data-slot="chip" className={cn(chipClass(variant), className)} {...props} />;
}

/** 단독 칩(solid). 바로 실행하는 칩이거나 selected로 켜짐을 직접 정할 때 */
export function Chip({ selected, className, type = "button", ...props }: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type={type}
      data-slot="chip"
      data-state={selected ? "on" : "off"}
      aria-pressed={selected}
      className={cn(chipClass("solid"), className)}
      {...props}
    />
  );
}

"use client";

import { ToggleGroup } from "radix-ui";
import { cn } from "./cn";

// Chip: 누르면 켜지고 꺼지는 둥근 칩(기간 · 카테고리 필터 등). MVP 19개 밖 임시 추가
// 높이 36 · 좌우 14 · 글자 14(label-md), 꺼짐 bg.neutral-weak + fg.neutral-muted · 켜짐 bg.neutral-solid + fg.on-neutral-solid
// ChipGroup: type single(하나만, 다시 눌러도 안 풀림) · multiple(여러 개). layout wrap(줄바꿈) · scroll(가로 스크롤)
// 금액 빠른 입력(+1만 원)처럼 켜고 끄지 않고 바로 실행하면 Chip을 단독으로 쓴다(누르면 onClick)
const chipClass = cn(
  "inline-flex h-(--chip-height) shrink-0 items-center justify-center gap-4 rounded-full bg-neutral-weak px-14 text-label-md whitespace-nowrap text-neutral-muted",
  "active:bg-neutral-weak-pressed disabled:bg-disabled disabled:text-disabled",
  "data-[state=on]:bg-neutral-solid data-[state=on]:text-on-neutral-solid data-[state=on]:active:bg-neutral-solid-pressed",
);

type ChipGroupBase = { layout?: "wrap" | "scroll"; className?: string; children: React.ReactNode; "aria-label"?: string; disabled?: boolean };
export type ChipGroupProps =
  | (ChipGroupBase & { type: "single"; value?: string; defaultValue?: string; onValueChange?: (value: string) => void })
  | (ChipGroupBase & { type: "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void });

export function ChipGroup({ layout = "wrap", className, ...props }: ChipGroupProps) {
  const layoutClass = cn("flex gap-8", layout === "wrap" ? "flex-wrap" : "overflow-x-auto", className);
  if (props.type === "single") {
    const { onValueChange, ...rest } = props;
    // 하나만 고르는 묶음은 이미 고른 칩을 다시 눌러도 선택이 풀리지 않게 한다
    return <ToggleGroup.Root data-slot="chip-group" className={layoutClass} onValueChange={(v: string) => v && onValueChange?.(v)} {...rest} />;
  }
  return <ToggleGroup.Root data-slot="chip-group" className={layoutClass} {...props} />;
}

export function ChipGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroup.Item>) {
  return <ToggleGroup.Item data-slot="chip" className={cn(chipClass, className)} {...props} />;
}

/** 단독 칩. 바로 실행하는 칩이거나 selected로 켜짐을 직접 정할 때 */
export function Chip({ selected, className, type = "button", ...props }: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type={type}
      data-slot="chip"
      data-state={selected ? "on" : "off"}
      aria-pressed={selected}
      className={cn(chipClass, className)}
      {...props}
    />
  );
}

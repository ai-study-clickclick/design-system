"use client";

import { ToggleGroup } from "radix-ui";
import { cn } from "./cn";

// SegmentedControl: 2~3개 중 하나를 골라 보기 · 값을 바로 바꾼다(예: 국내 / 해외, 1개월 / 3개월 / 6개월)
// MVP 19개 밖 임시 추가. 값은 SEED SegmentedControl 참고 임시(src/styles/temp-tokens.css)
// size md: 높이 40, 놓인 자리 폭을 칸 수만큼 똑같이 나눈다 · sm: 높이 32, 글자만큼
// 바깥 bg.neutral-weak(여백 4, 임시), 고른 칸 bg.layer-default + 그림자 s1
export type SegmentedControlOption = { value: string; label: React.ReactNode; disabled?: boolean };

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "md" | "sm";
  /** 화면 읽기 프로그램용 이름 */
  "aria-label"?: string;
  className?: string;
};

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <ToggleGroup.Root
      type="single"
      data-slot="segmented-control"
      value={value}
      defaultValue={defaultValue ?? options[0]?.value}
      // 이미 고른 칸을 다시 눌러도 선택이 풀리지 않게 한다
      onValueChange={(v) => v && onValueChange?.(v)}
      className={cn(
        "rounded-(--segmented-control-rounded) bg-neutral-weak p-(--segmented-control-padding)",
        size === "md" ? "flex w-full" : "inline-flex w-fit",
        className,
      )}
      {...props}
    >
      {options.map((o) => (
        <ToggleGroup.Item
          key={o.value}
          value={o.value}
          disabled={o.disabled}
          className={cn(
            "flex items-center justify-center rounded-(--segmented-control-item-rounded) whitespace-nowrap text-neutral-subtle transition-colors duration-150",
            "aria-checked:bg-layer-default aria-checked:text-neutral aria-checked:shadow-s1 disabled:text-disabled",
            size === "md" ? "h-(--segmented-control-md-item-height) flex-1 px-12 text-label-md" : "h-(--segmented-control-sm-item-height) px-12 text-label-sm",
          )}
        >
          {o.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

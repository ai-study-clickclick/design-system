"use client";

import { ChevronRight } from "lucide-react";
import { Slot } from "radix-ui";
import { cn } from "./cn";

// TextButton: 글자만 있는 가벼운 버튼(전체 보기 · 다시 보내기 등). MVP 19개 밖 임시 추가
// size sm 12 · md 14(label), tone neutral(fg.neutral-muted, 임시) · brand(fg.brand-contrast)
// withArrow: 다른 화면으로 가면 오른쪽 화살표. 눌리는 면은 글자 밖으로 4씩 넓히고, 글자 줄은 내용 끝에 맞춘다(-mx-4)
export type TextButtonProps = React.ComponentProps<"button"> & {
  size?: "sm" | "md";
  tone?: "neutral" | "brand";
  withArrow?: boolean;
  asChild?: boolean;
};

export function TextButton({ size = "md", tone = "neutral", withArrow, asChild, className, children, type = "button", ...props }: TextButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      {...(asChild ? {} : { type })}
      data-slot="text-button"
      className={cn(
        "-mx-4 inline-flex min-h-touch-min-sm items-center gap-2 rounded-xs px-4 active:bg-transparent-pressed disabled:pointer-events-none disabled:text-disabled",
        size === "sm" ? "text-label-sm" : "text-label-md",
        tone === "neutral" ? "text-(--text-button-neutral-color)" : "text-brand-contrast",
        className,
      )}
      {...props}
    >
      {asChild ? children : (
        <>
          {children}
          {withArrow && <ChevronRight aria-hidden className={size === "sm" ? "size-14" : "size-16"} />}
        </>
      )}
    </Comp>
  );
}

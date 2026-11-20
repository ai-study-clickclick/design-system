"use client";

import { ChevronLeft, X } from "lucide-react";
import { cn } from "./cn";

// TopBar: 화면 맨 위 제목 줄. 높이 44, 당근 AppBar 참고
// title · left(뒤로 · 닫기) · right(아이콘 버튼) · tone default · transparent(3-2 비교표)
// 뒤로가기와 닫기 중 무엇을 쓸지는 docs/UX.md "뒤로가기와 닫기는 다르다"
export type TopBarProps = Omit<React.ComponentProps<"header">, "title"> & {
  title?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  /** transparent: 이미지 위 등 배경 없이 */
  tone?: "default" | "transparent";
};

export function TopBar({ title, left, right, tone = "default", className, ...props }: TopBarProps) {
  return (
    <header
      data-slot="top-bar"
      className={cn(
        "relative flex h-(--top-bar-height) w-full shrink-0 items-center px-6",
        tone === "default" ? "bg-layer-default text-neutral" : "bg-transparent",
        className,
      )}
      {...props}
    >
      <div className="z-10 flex min-w-touch-min items-center">{left}</div>
      {title && (
        <h1 className="pointer-events-none absolute inset-x-0 mx-auto max-w-2/3 truncate text-center text-title-sm">{title}</h1>
      )}
      <div className="z-10 ml-auto flex min-w-touch-min items-center justify-end">{right}</div>
    </header>
  );
}

/** TopBar 안 아이콘 버튼. 누르는 영역 44 */
export function TopBarIconButton({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn("flex size-touch-min items-center justify-center rounded-full active:bg-transparent-pressed", className)}
      {...props}
    />
  );
}

export function TopBarBackButton({ label = "뒤로가기", ...props }: React.ComponentProps<"button"> & { label?: string }) {
  return (
    <TopBarIconButton aria-label={label} {...props}>
      <ChevronLeft aria-hidden className="size-24" />
    </TopBarIconButton>
  );
}

export function TopBarCloseButton({ label = "닫기", ...props }: React.ComponentProps<"button"> & { label?: string }) {
  return (
    <TopBarIconButton aria-label={label} {...props}>
      <X aria-hidden className="size-24" />
    </TopBarIconButton>
  );
}

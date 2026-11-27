"use client";

import { ChevronLeft, X } from "lucide-react";
import { cn } from "./cn";
import { IconButton, type IconButtonProps } from "./icon-button";

// TopBar: 화면 맨 위 제목 줄. 높이 44, 당근 AppBar 참고
// title · left(뒤로 · 닫기) · right(아이콘 버튼) · tone default · transparent(3-2 비교표)
// 뒤로가기와 닫기 중 무엇을 쓸지는 docs/UX.md "뒤로가기와 닫기는 다르다"
// 아이콘은 top-bar-icon-size(24). 뒤로가기 · 닫기는 선 하나짜리라 작아 보여 top-bar-icon-optical-size(28)로 보정한다(임시)
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

/** TopBar 안 아이콘 버튼. IconButton md(보이는 크기 40 · 누르는 영역 44), 안의 아이콘은 top-bar-icon-size(24) */
export function TopBarIconButton({ className, ...props }: IconButtonProps) {
  return <IconButton size="md" variant="ghost" className={cn("[&_svg]:size-(--top-bar-icon-size)", className)} {...props} />;
}

export function TopBarBackButton({ label = "뒤로가기", ...props }: Omit<IconButtonProps, "aria-label"> & { label?: string }) {
  return (
    <TopBarIconButton aria-label={label} {...props} className={cn("[&_svg]:size-(--top-bar-icon-optical-size)", props.className)}>
      <ChevronLeft aria-hidden />
    </TopBarIconButton>
  );
}

export function TopBarCloseButton({ label = "닫기", ...props }: Omit<IconButtonProps, "aria-label"> & { label?: string }) {
  return (
    <TopBarIconButton aria-label={label} {...props} className={cn("[&_svg]:size-(--top-bar-icon-optical-size)", props.className)}>
      <X aria-hidden />
    </TopBarIconButton>
  );
}

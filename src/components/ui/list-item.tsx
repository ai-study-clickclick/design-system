"use client";

import { ChevronRight } from "lucide-react";
import { Slot } from "radix-ui";
import { cn } from "./cn";

// ListItem: 글이 주인 항목(알림 · 내역 · 설정 등)의 한 줄
// title · description · prefix · suffix · withArrow · disabled(3-2 비교표)
// 위아래 12 · 좌우 16 · 제목 16(body-lg) · 보조 13(body-sm, fg.neutral-subtle) · 눌림 bg.transparent-pressed
export type ListItemProps = Omit<React.HTMLAttributes<HTMLElement>, "title" | "prefix"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 왼쪽(Avatar · 아이콘 · 썸네일) */
  prefix?: React.ReactNode;
  /** 오른쪽(Badge · Switch · 값 등) */
  suffix?: React.ReactNode;
  /** 다른 화면으로 이동하는 줄이면 오른쪽 화살표 */
  withArrow?: boolean;
  disabled?: boolean;
  /** 누를 수 있는 줄. 링크면 asChild로 a/Link를 감싼다 */
  asChild?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export function ListItem({
  title,
  description,
  prefix,
  suffix,
  withArrow,
  disabled,
  asChild,
  onClick,
  className,
  children,
  ...props
}: ListItemProps) {
  const pressable = !disabled && (asChild || onClick || withArrow);
  const Comp = asChild ? Slot.Root : onClick ? "button" : "div";
  const content = (
    <>
      {prefix && <span className="flex shrink-0 items-center">{prefix}</span>}
      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span className={cn("text-body-lg", disabled ? "text-disabled" : "text-neutral")}>{title}</span>
        {description && <span className={cn("text-body-sm", disabled ? "text-disabled" : "text-neutral-subtle")}>{description}</span>}
      </span>
      {suffix && <span className="flex shrink-0 items-center gap-8">{suffix}</span>}
      {withArrow && <ChevronRight aria-hidden className={cn("size-20 shrink-0", disabled ? "text-disabled" : "text-neutral-subtle")} />}
    </>
  );
  return (
    <Comp
      data-slot="list-item"
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...(Comp === "button" ? { type: "button" as const, disabled } : {})}
      className={cn(
        "flex w-full items-center gap-12 px-16 py-12 text-left",
        pressable && "active:bg-transparent-pressed",
        className,
      )}
      {...props}
    >
      {asChild ? children : content}
    </Comp>
  );
}

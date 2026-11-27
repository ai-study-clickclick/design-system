"use client";

import { cn } from "./cn";
import { usePressScale } from "./press";

// IconButton: 아이콘만 있는 버튼. MVP 19개 밖 임시 추가. aria-label을 꼭 준다
// size sm 32(아이콘 20) · md 40(아이콘 24). 보이는 크기가 44보다 작아도 누르는 영역은 44(space.touch-min)로 넓힌다
// variant ghost(배경 없음, 눌리면 bg.transparent-pressed) · weak(회색 연한 면, Button secondary와 같은 bg.button-weak 임시)
export type IconButtonProps = React.ComponentProps<"button"> & {
  "aria-label": string;
  size?: "sm" | "md";
  variant?: "ghost" | "weak";
};

export function IconButton({ size = "md", variant = "ghost", className, type = "button", ...props }: IconButtonProps) {
  const press = usePressScale<HTMLButtonElement>();
  return (
    <button
      type={type}
      data-slot="icon-button"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full text-neutral disabled:pointer-events-none disabled:text-disabled",
        "before:absolute before:content-['']",
        size === "sm"
          ? "size-(--icon-button-sm-size) before:-inset-(--icon-button-sm-hit-inset) [&_svg]:size-(--icon-button-sm-icon-size)"
          : "size-(--icon-button-md-size) before:-inset-(--icon-button-md-hit-inset) [&_svg]:size-(--icon-button-md-icon-size)",
        variant === "ghost" ? "active:bg-transparent-pressed disabled:text-(--icon-button-ghost-disabled-color)" : "bg-button-weak active:bg-button-weak-pressed disabled:bg-disabled",
        className,
      )}
      {...(props.disabled ? {} : press)}
      {...props}
    />
  );
}

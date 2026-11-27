import { cn } from "./cn";

// Divider: 내용 사이를 나누는 줄. MVP 19개 밖 임시 추가
// variant line(1px, stroke.neutral-muted): 목록 · 묶음 사이 · thick(8, bg.layer-basement): 화면 안 큰 구역 사이
// orientation vertical은 line만(글자 사이 세로줄 등)
export type DividerProps = React.ComponentProps<"div"> & {
  variant?: "line" | "thick";
  orientation?: "horizontal" | "vertical";
};

export function Divider({ variant = "line", orientation = "horizontal", className, ...props }: DividerProps) {
  const vertical = orientation === "vertical" && variant === "line";
  return (
    <div
      role="separator"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      data-slot="divider"
      className={cn(
        "shrink-0",
        variant === "thick"
          ? "h-(--divider-thick-height) w-full bg-layer-basement"
          : vertical
            ? "w-px self-stretch bg-(--stroke-neutral-muted)"
            : "h-px w-full bg-(--stroke-neutral-muted)",
        className,
      )}
      {...props}
    />
  );
}

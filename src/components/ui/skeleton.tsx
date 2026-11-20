import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";

// Skeleton: 불러올 내용 자리를 회색 면으로 미리 보여 준다
// radius sm(글자 줄 8) · lg(카드 · 썸네일 16) · full(아바타). 테두리 없이 bg.layer-default 면 안에 둔다
// 크기는 쓰는 자리에서 w-* · h-*로 정한다
const skeletonVariants = cva("animate-pulse bg-neutral-weak", {
  variants: {
    radius: {
      sm: "rounded-sm",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: { radius: "sm" },
});

export type SkeletonProps = React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>;

export function Skeleton({ radius, className, ...props }: SkeletonProps) {
  return <div data-slot="skeleton" aria-hidden className={cn(skeletonVariants({ radius }), className)} {...props} />;
}

export { skeletonVariants };

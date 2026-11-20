import { cn } from "./cn";

// Card: 사진이 주인 항목이나 묶음을 담는 면. shadcn 구조 그대로, variant 없음
// 라운드 16 · 여백 16 · bg.layer-default · stroke.neutral-weak 1px · 그림자 없음
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("flex flex-col gap-12 rounded-lg border border-neutral-weak bg-layer-default p-16 text-neutral", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex items-start gap-8", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("min-w-0 flex-1 text-title-sm", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-body-md text-neutral-subtle", className)} {...props} />;
}

/** 제목 오른쪽 보조 행동(아이콘 버튼 등) */
export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("shrink-0", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("text-body-lg", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center gap-8", className)} {...props} />;
}

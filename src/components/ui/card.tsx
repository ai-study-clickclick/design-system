import { cn } from "./cn";

// Card: 사진이 주인 항목이나 묶음을 담는 면. shadcn 구조 그대로
// 라운드 16 · 여백 16 · bg.layer-default · stroke.neutral-weak 1px · 그림자 없음
export type CardProps = React.ComponentProps<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-16 rounded-lg border border-neutral-weak bg-layer-default p-16 text-neutral",
        className,
      )}
      {...props}
    />
  );
}

/** 제목 · 부제 · 오른쪽 행동을 묶는 머리. 제목과 부제는 붙여 둔다
 * 왼쪽 아이콘 · 오른쪽 태그 · 버튼 · 화살표는 제목 묶음의 세로 가운데에 맞춘다 */
export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex items-center gap-12", className)} {...props} />;
}

/** 제목과 부제를 위아래로 붙인다(간격 4) */
export function CardHeading({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-heading" className={cn("flex min-w-0 flex-1 flex-col gap-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("text-title-sm", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-body-md text-neutral-subtle", className)} {...props} />;
}

/** 제목 오른쪽 보조 행동(아이콘 버튼 등) */
export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("shrink-0", className)} {...props} />;
}

/** 카드 안 이미지. 안쪽 라운드 = 카드 라운드 − 여백(16 − 16 = 0)이 0 이하라 최소값 radius.sm 8(임시 기준, DESIGN.md "Shapes"는 0) */
export function CardImage({ className, alt = "", ...props }: React.ComponentProps<"img">) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img data-slot="card-image" alt={alt} className={cn("w-full rounded-(--card-image-rounded) object-cover", className)} {...props} />;
}

/** 이미지 자리(이미지가 아직 없을 때). CardImage와 같은 라운드 */
export function CardImageSlot({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-image" className={cn("w-full overflow-hidden rounded-(--card-image-rounded)", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("text-body-lg", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center gap-8", className)} {...props} />;
}

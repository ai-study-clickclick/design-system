"use client";

import { Avatar as AvatarPrimitive } from "radix-ui";
import { User } from "lucide-react";
import { cn } from "./cn";

// Avatar: 사람 · 가게를 나타내는 동그란 사진. 크기 하나(48)라 size 없음
// 사진을 못 불러오면 fallback(글자)이나 기본 아이콘을 보여 준다
export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  src?: string;
  alt?: string;
  /** 사진이 없을 때 보여 줄 글자(이름 첫 글자 등) */
  fallback?: React.ReactNode;
};

export function Avatar({ src, alt = "", fallback, className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-(--avatar-size) shrink-0 overflow-hidden rounded-full bg-neutral-weak", className)}
      {...props}
    >
      {src && <AvatarPrimitive.Image src={src} alt={alt} className="size-full object-cover" />}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center text-label-md text-neutral-muted">
        {fallback ?? <User aria-hidden className="size-24" />}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

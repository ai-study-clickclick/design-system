"use client";

import { Drawer } from "vaul";
import { X } from "lucide-react";
import { cn } from "./cn";

// BottomSheet: 아래에서 올라오는 시트. 선택 목록 · 옵션 목록에 쓴다(DESIGN.md "피드백 종류별 컴포넌트")
// 뼈대는 shadcn Drawer(vaul), 모양은 당근 · 토스 참고. 라운드 24 · 여백 16 · 그림자 s2
// open · title · description · footer(하단 버튼) · showHandle · showCloseButton(3-2 비교표)
// 핸들과 닫기는 함께 쓰지 않는다. showCloseButton을 켜면 핸들은 숨긴다
// 높이: 최소 240, 최대 화면 − 48. 그 사이는 내용만큼. 넘치면 내용만 스크롤하고 제목 · 버튼은 고정(임시 기준)
// 버튼 2개는 비율 없이 5:5로 나눈다(3:7은 화면 하단 고정 버튼에만, DESIGN.md "Layout")
// 아래 여백: 버튼이 없으면 내용 아래 24, 있으면 내용과 버튼 사이 16 · 버튼 아래 16(+ 안전 영역)
export type BottomSheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 시트를 여는 요소(버튼 등). 없으면 open으로만 연다 */
  trigger?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 시트 아래 고정 버튼 자리 */
  footer?: React.ReactNode;
  showHandle?: boolean;
  showCloseButton?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function BottomSheet({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  showHandle = true,
  showCloseButton = false,
  className,
  children,
}: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <Drawer.Content
          data-slot="bottom-sheet"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-(--bottom-sheet-max-height) min-h-(--bottom-sheet-min-height) w-full max-w-(--space-screen-max) flex-col rounded-t-2xl bg-layer-floating text-neutral shadow-s2 outline-none",
            className,
          )}
        >
          {showHandle && !showCloseButton && <div aria-hidden className="mx-auto mt-8 h-4 w-36 shrink-0 rounded-full bg-neutral-weak-pressed" />}
          <div className={cn("flex items-start gap-8 px-16", showHandle && !showCloseButton ? "pt-12" : "pt-20")}>
            <div className="min-w-0 flex-1">
              <Drawer.Title className="text-title-md">{title}</Drawer.Title>
              {description ? (
                <Drawer.Description className="mt-6 text-body-md text-neutral-subtle">{description}</Drawer.Description>
              ) : (
                <Drawer.Description className="sr-only">{title}</Drawer.Description>
              )}
            </div>
            {showCloseButton && (
              <Drawer.Close aria-label="닫기" className="-m-10 flex size-touch-min shrink-0 items-center justify-center rounded-full active:bg-transparent-pressed">
                <X aria-hidden className="size-24" />
              </Drawer.Close>
            )}
          </div>
          <div className={cn("min-h-0 flex-1 overflow-y-auto px-16 pt-16", footer ? "pb-16" : "pb-(--bottom-sheet-content-bottom)")}>{children}</div>
          {footer && <div className="flex gap-8 px-16 pb-(--bottom-sheet-footer-bottom) *:flex-1!">{footer}</div>}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export const BottomSheetClose = Drawer.Close;

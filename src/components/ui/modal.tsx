"use client";

import { AlertDialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "./cn";

// Modal: 확인 요청 전용(DESIGN.md "피드백 종류별 컴포넌트"). 바깥을 눌러도 닫히지 않는다
// 뼈대는 shadcn AlertDialog. 라운드 20 · 최대 폭 272 · 여백 20 · 제목 20 bold · 내용 16 · 그림자 s3
// open · title · description · ModalFooter(버튼 최대 2개)(3-2 비교표)
// showCloseButton(오른쪽 위 X, 기본 끔)은 3-2 비교표에 없는 임시 추가. 답하지 않고 빠져나가도 되는 확인에만 쓴다
export type ModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Modal을 여는 요소(버튼 등) */
  trigger?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** ModalFooter에 버튼을 최대 2개 */
  children?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
};

export function Modal({ open, onOpenChange, trigger, title, description, children, showCloseButton = false, className }: ModalProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <AlertDialog.Content
          data-slot="modal"
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex w-(--modal-max-width) max-w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-20 rounded-xl bg-layer-floating p-20 text-neutral shadow-s3 outline-none",
            className,
          )}
        >
          {showCloseButton && (
            <AlertDialog.Cancel
              aria-label="닫기"
              className="absolute top-8 right-8 flex size-touch-min items-center justify-center rounded-full text-neutral-subtle active:bg-transparent-pressed"
            >
              <X aria-hidden className="size-20" />
            </AlertDialog.Cancel>
          )}
          <div className={cn("flex flex-col gap-8", showCloseButton && "pr-24")}>
            <AlertDialog.Title className="text-title-md">{title}</AlertDialog.Title>
            {description ? (
              <AlertDialog.Description className="text-body-lg text-neutral-muted">{description}</AlertDialog.Description>
            ) : (
              <AlertDialog.Description className="sr-only">{title}</AlertDialog.Description>
            )}
          </div>
          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

/** 버튼 자리. 버튼은 최대 2개, 나란히 같은 폭 */
export function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="modal-footer" className={cn("flex gap-8 *:flex-1", className)} {...props} />;
}

/** 누르면 Modal이 닫히는 버튼(취소). asChild로 Button을 감싼다 */
export const ModalCancel = AlertDialog.Cancel;
/** 누르면 Modal이 닫히는 확인 버튼. asChild로 Button을 감싼다 */
export const ModalAction = AlertDialog.Action;

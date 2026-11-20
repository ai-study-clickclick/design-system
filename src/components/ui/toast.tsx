"use client";

import { Toaster as Sonner, toast as sonnerToast } from "sonner";

// Toast: 일시 알림. 한 번에 하나, 기본 4초, 손을 대면 멈춘다(docs/UX.md "일시 알림")
// message · action(최대 1개) · duration. variant 없음(3-2 비교표)
// 라운드 8 · 여백 10 · 최소 높이 44 · 최대 폭 464 · 글자 14 · bg.neutral-solid
const DURATION = 4000;

/** 앱 맨 바깥(레이아웃)에 한 번만 둔다 */
export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      visibleToasts={1}
      duration={DURATION}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex min-h-(--toast-min-height) w-full max-w-(--toast-max-width) items-center gap-8 rounded-sm bg-neutral-solid p-10 text-body-md text-on-neutral-solid",
          title: "min-w-0 flex-1",
          actionButton: "shrink-0 px-6 text-label-md text-on-neutral-solid underline underline-offset-2",
        },
      }}
    />
  );
}

export type ToastOptions = {
  /** 버튼 1개(되돌리기 등) */
  action?: { label: string; onClick: () => void };
  /** 밀리초. 기본 4000, 긴 문장은 더 길게 */
  duration?: number;
};

/** toast("저장했어요") 처럼 부른다 */
export function toast(message: string, { action, duration }: ToastOptions = {}) {
  sonnerToast(message, {
    duration: duration ?? DURATION,
    action: action ? { label: action.label, onClick: action.onClick } : undefined,
  });
}

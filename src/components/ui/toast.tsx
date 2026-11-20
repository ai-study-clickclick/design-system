"use client";

import { Toaster as Sonner, toast as sonnerToast } from "sonner";

// Toast: 일시 알림. 한 번에 하나, 기본 4초, 손을 대면 멈춘다(docs/UX.md "일시 알림")
// message · action(최대 1개) · duration · icon. variant 없음(3-2 비교표). icon은 임시 추가
// 라운드 8 · 여백 10 · 최소 높이 44 · 최대 폭 464 · 글자 14 · bg.neutral-solid
// 글자는 왼쪽, 버튼은 오른쪽 끝에 둔다. 글자가 길면 여러 줄로 내려간다
const DURATION = 4000;

/** 앱 맨 바깥(레이아웃)에 한 번만 둔다 */
export function Toaster() {
  return <Sonner position="bottom-center" visibleToasts={1} duration={DURATION} toastOptions={{ unstyled: true }} />;
}

export type ToastOptions = {
  /** 버튼 1개(되돌리기 등) */
  action?: { label: string; onClick: () => void };
  /** 밀리초. 기본 4000, 긴 문장은 더 길게 */
  duration?: number;
  /** 왼쪽 아이콘(Lucide 20px). 결과를 한눈에 보여 줄 때만 */
  icon?: React.ReactNode;
};

function ToastView({
  id,
  message,
  action,
  icon,
}: {
  id: string | number;
  message: string;
  action?: ToastOptions["action"];
  icon?: React.ReactNode;
}) {
  return (
    <div
      data-slot="toast"
      className="flex min-h-(--toast-min-height) w-(--toast-max-width) max-w-full items-center gap-8 rounded-sm bg-neutral-solid p-10 text-body-md text-on-neutral-solid"
    >
      {icon && <span className="flex size-20 shrink-0 items-center justify-center *:size-20">{icon}</span>}
      <p className="min-w-0 flex-1">{message}</p>
      {action && (
        <button
          type="button"
          onClick={() => {
            action.onClick();
            sonnerToast.dismiss(id);
          }}
          className="flex min-h-touch-min-sm shrink-0 items-center rounded-xs px-6 text-label-md text-on-neutral-solid active:bg-neutral-solid-pressed"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

/** toast("저장했어요") 처럼 부른다 */
export function toast(message: string, { action, duration, icon }: ToastOptions = {}) {
  sonnerToast.custom((id) => <ToastView id={id} message={message} action={action} icon={icon} />, {
    duration: duration ?? DURATION,
  });
}

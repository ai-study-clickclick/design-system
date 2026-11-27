"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

// Toast: 일시 알림. 한 번에 하나, 기본 4초, 손을 대면 멈춘다(docs/UX.md "일시 알림")
// message · action(최대 1개) · duration · icon. variant 없음(3-2 비교표). icon은 임시 추가
// 라운드 12 · 여백 좌우 16 · 위아래 10 · 최소 높이 44 · 최대 폭 464 · 글자 14 · bg.neutral-solid
// 라운드 · 좌우 여백은 DESIGN.md(8 · 10)보다 키운 임시 값
// 글자는 왼쪽(굵기 500, 임시), 버튼은 오른쪽 끝에 둔다. 글자가 길면 여러 줄로 내려간다
// 버튼은 Button sm staticWhiteWeak(어두운 면 위 흰 막, 임시)
const DURATION = 4000;
// 사라지는 시간: DESIGN.md "나타나고 사라지는 값" Toast d2. 움직임 값은 temp-tokens.css
const EXIT_MS = 100;

export type ToastOptions = {
  /** 버튼 1개(되돌리기 등) */
  action?: { label: string; onClick: () => void };
  /** 밀리초. 기본 4000, 긴 문장은 더 길게 */
  duration?: number;
  /** 왼쪽 아이콘(Lucide 20px). 결과를 한눈에 보여 줄 때만 */
  icon?: React.ReactNode;
};

type ToastItem = ToastOptions & { id: number; message: string };

// 한 번에 하나만 보여 준다. 새 알림이 오면 앞의 것을 바꾼다
// 화면(페이지)과 Toaster(레이아웃)가 따로 묶여도 이어지도록 window 이벤트로 알린다
const EVENT = "ds-toast";
const DISMISS = "ds-toast-dismiss";
let seq = 0;

/** toast("저장했어요") 처럼 부른다 */
export function toast(message: string, options: ToastOptions = {}) {
  const item: ToastItem = { id: Date.now() + ++seq, message, ...options };
  window.dispatchEvent(new CustomEvent<ToastItem>(EVENT, { detail: item }));
}

function dismiss(id: number) {
  window.dispatchEvent(new CustomEvent<number>(DISMISS, { detail: id }));
}

/** 앱 맨 바깥(레이아웃)에 한 번만 둔다 */
export function Toaster() {
  const [item, setItem] = useState<ToastItem | null>(null);
  // 닫히는 알림 id. 사라지는 움직임(d2 100ms)이 끝난 뒤 지운다
  const [closing, setClosing] = useState<number | null>(null);
  useEffect(() => {
    const show = (e: Event) => {
      setClosing(null);
      setItem((e as CustomEvent<ToastItem>).detail);
    };
    const hide = (e: Event) => {
      const id = (e as CustomEvent<number>).detail;
      setClosing(id);
      setTimeout(() => setItem((cur) => (cur?.id === id ? null : cur)), EXIT_MS);
    };
    window.addEventListener(EVENT, show);
    window.addEventListener(DISMISS, hide);
    return () => {
      window.removeEventListener(EVENT, show);
      window.removeEventListener(DISMISS, hide);
    };
  }, []);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-16 pb-24">
      {item && <ToastView key={item.id} item={item} closing={closing === item.id} />}
    </div>
  );
}

function ToastView({ item, closing }: { item: ToastItem; closing: boolean }) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const start = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => dismiss(item.id), item.duration ?? DURATION);
  };
  const stop = () => clearTimeout(timer.current);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  return (
    <div
      data-slot="toast"
      data-state={closing ? "closed" : "open"}
      role="status"
      onPointerEnter={stop}
      onPointerLeave={start}
      onTouchStart={stop}
      onTouchEnd={start}
      className="pointer-events-auto flex min-h-(--toast-min-height) w-full max-w-(--toast-max-width) items-center gap-8 rounded-md bg-neutral-solid py-10 pr-10 pl-16 text-body-md font-(--toast-typography-font-weight) text-on-neutral-solid"
    >
      {item.icon && <span className="flex size-20 shrink-0 items-center justify-center *:size-20">{item.icon}</span>}
      <p className="min-w-0 flex-1">{item.message}</p>
      {item.action && (
        <Button
          size="sm"
          variant="staticWhiteWeak"
          onClick={() => {
            item.action?.onClick();
            dismiss(item.id);
          }}
        >
          {item.action.label}
        </Button>
      )}
    </div>
  );
}

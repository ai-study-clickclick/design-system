"use client";

import { useRef, useState } from "react";

// 프로토타입 화면 틀. 모든 프로토타입 화면은 이 틀로 감싼다
// 앱 화면 폭: 기준 375px, 최대 480px (`DESIGN.md` "Layout"). 최소 320px는 작은 폰 확인용 사이트 값이다
// PC(768px 이상): 375px로 시작하고, 오른쪽 손잡이를 끌거나 위 버튼으로 320~480px 사이를 바꿔 본다
// 휴대폰(768px 미만): 손잡이 없이 화면 폭을 다 쓴다(최대 480px)
const MIN = 320;
const BASE = 375;
const MAX = 480;
const PRESETS = [MIN, BASE, MAX];

const clamp = (w: number) => Math.min(MAX, Math.max(MIN, Math.round(w)));

export default function ScreenFrame({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(BASE);
  const drag = useRef<{ x: number; w: number } | null>(null);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, w: width };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    // 틀이 가운데 정렬이라 한쪽을 끈 거리의 2배만큼 폭이 바뀐다
    setWidth(clamp(drag.current.w + (e.clientX - drag.current.x) * 2));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowRight") setWidth((w) => clamp(w + step));
    else if (e.key === "ArrowLeft") setWidth((w) => clamp(w - step));
    else return;
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-layer-basement md:py-24">
      <div className="mb-12 hidden items-center justify-center gap-8 text-label-md text-neutral-muted md:flex">
        <span className="w-48 text-right tabular-nums">{width}px</span>
        {PRESETS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWidth(w)}
            aria-pressed={width === w}
            className="h-40 rounded-md border border-neutral-weak px-12 hover:bg-layer-default-pressed aria-pressed:bg-neutral-solid aria-pressed:text-on-neutral-solid"
          >
            {w === BASE ? `${w} 기준` : w}
          </button>
        ))}
      </div>
      <div
        className="relative mx-auto min-h-screen w-full max-w-screen-max bg-layer-default md:min-h-[720px] md:w-[var(--frame-w)] md:border md:border-neutral-weak"
        style={{ "--frame-w": `${width}px` } as React.CSSProperties}
      >
        {children}
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="화면 폭 조절"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={width}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => (drag.current = null)}
          onKeyDown={onKeyDown}
          className="absolute top-0 -right-16 hidden h-full w-16 cursor-ew-resize touch-none items-center justify-center md:flex"
        >
          <div className="h-48 w-4 rounded-full bg-neutral-weak-pressed" />
        </div>
      </div>
    </div>
  );
}

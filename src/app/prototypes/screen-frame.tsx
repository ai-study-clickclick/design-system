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
    <div className="min-h-screen bg-gray-100 md:py-6">
      <div className="mb-3 hidden items-center justify-center gap-2 text-sm text-gray-600 md:flex">
        <span className="w-12 text-right font-semibold tabular-nums">{width}px</span>
        {PRESETS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWidth(w)}
            aria-pressed={width === w}
            className="h-8 rounded-md border border-gray-300 px-3 hover:bg-gray-200 aria-pressed:bg-gray-800 aria-pressed:text-white"
          >
            {w === BASE ? `${w} 기준` : w}
          </button>
        ))}
      </div>
      <div
        className="relative mx-auto min-h-screen w-full max-w-[480px] bg-white md:min-h-[720px] md:w-[var(--frame-w)] md:shadow-sm"
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
          className="absolute top-0 -right-4 hidden h-full w-4 cursor-ew-resize touch-none items-center justify-center md:flex"
        >
          <div className="h-12 w-1 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
}

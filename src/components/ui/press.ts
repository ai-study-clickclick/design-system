"use client";

import { useCallback } from "react";

// 눌림 줄어듦(DESIGN.md "상태와 피드백"): 세로 2px만큼 가운데 기준으로 줄어든다
// basis = max(높이, 너비 ÷ 4, 24), scale = (basis − 2) ÷ basis, 150ms
// '동작 줄이기'가 켜지면 줄이지 않는다
const PRESS = "transform 150ms cubic-bezier(0, 0, 0.15, 1)";

function setScale(el: HTMLElement, pressed: boolean) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!pressed || reduce) {
    el.style.transform = "";
    return;
  }
  const { width, height } = el.getBoundingClientRect();
  const basis = Math.max(height, width / 4, 24);
  el.style.transition = `${PRESS}, background-color 150ms cubic-bezier(0.35, 0, 0.35, 1)`;
  el.style.transform = `scale(${(basis - 2) / basis})`;
}

export function usePressScale<T extends HTMLElement>() {
  const down = useCallback((e: React.PointerEvent<T>) => setScale(e.currentTarget, true), []);
  const up = useCallback((e: React.PointerEvent<T>) => setScale(e.currentTarget, false), []);
  return { onPointerDown: down, onPointerUp: up, onPointerLeave: up, onPointerCancel: up };
}

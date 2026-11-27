"use client";

import { useLayoutEffect, useRef, useState } from "react";

// 고른 칸을 따라 움직이는 표시(Tabs 아래 줄 · SegmentedControl 흰 칸)의 위치와 폭을 잰다
// 목록 안에서 selector에 맞는 요소를 찾아, 고른 칸이 바뀌거나 크기가 바뀌면 다시 잰다
export function useActiveIndicator<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const list = ref.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>(selector);
      setRect(active ? { left: active.offsetLeft, width: active.offsetWidth } : null);
    };
    measure();
    // 고른 칸이 바뀌면 data-state · aria-selected가 바뀐다
    const mutation = new MutationObserver(measure);
    mutation.observe(list, { subtree: true, attributes: true, attributeFilter: ["data-state", "aria-selected", "aria-checked"] });
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    return () => {
      mutation.disconnect();
      resize.disconnect();
    };
  }, [selector]);

  return { ref, rect };
}

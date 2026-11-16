"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "./doc-page";

// 오른쪽 목차. SEED 문서 사이트처럼 지금 화면에 보이는 장들을 진한 글자로 바꾸고,
// 왼쪽 세로줄에 그 장들의 범위만큼 진한 막대를 채운다. 스크롤하면 막대가 따라 움직인다
const HEADER = 56; // 위 메뉴 높이(space.56)

export default function TocNav({ toc }: { toc: TocItem[] }) {
  const [active, setActive] = useState<string[]>([]);
  const [bar, setBar] = useState<{ top: number; height: number } | null>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  // 보이는 장 찾기
  useEffect(() => {
    const update = () => {
      const visible = toc
        .filter((item) => {
          const el = document.getElementById(item.id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > HEADER;
        })
        .map((item) => item.id);
      setActive(visible);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [toc]);

  // 보이는 장들의 첫 줄부터 마지막 줄까지 막대를 채운다
  useEffect(() => {
    const items = active.map((id) => itemRefs.current[id]).filter((el): el is HTMLLIElement => !!el);
    if (items.length === 0) {
      setBar(null);
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    setBar({ top: first.offsetTop, height: last.offsetTop + last.offsetHeight - first.offsetTop });
  }, [active]);

  return (
    <nav aria-label="목차">
      <p className="text-caption text-neutral-subtle">목차</p>
      <ul className="relative mt-8 border-l border-neutral-weak">
        {bar && (
          <span
            aria-hidden
            className="absolute -left-px w-[2px] bg-neutral-solid motion-safe:transition-all motion-safe:duration-150"
            style={{ top: bar.top, height: bar.height }}
          />
        )}
        {toc.map((item) => {
          const on = active.includes(item.id);
          return (
            <li key={item.id} ref={(el) => { itemRefs.current[item.id] = el; }}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`block py-4 text-label-sm ${item.depth === 2 ? "pl-24" : "pl-12"} ${
                  on ? "text-neutral" : "text-neutral-muted hover:text-neutral"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

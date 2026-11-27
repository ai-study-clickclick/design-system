"use client";

import { Slot } from "radix-ui";
import { cn } from "./cn";

// BottomNavigation: 앱 최상위 화면 사이를 오가는 하단 탭 바. MVP 19개 밖 임시 추가
// 항목 3~5개, 아이콘 24 + 글자 12(label-sm). 높이 56 + 기기 안전 영역, 위 줄 stroke.neutral-muted, bg.layer-default
// 선택 fg.neutral + 아이콘 선 조금 굵게(2.25) · 미선택 글자 fg.neutral-subtle · 아이콘 gray-500(임시). 대표 컬러는 쓰지 않는다
// 최상위 화면(홈 · 혜택 · 전체 등)에만 두고, 들어간 화면에는 두지 않는다
export type BottomNavigationItem = { value: string; label: string; icon: React.ReactNode };

export type BottomNavigationProps = {
  items: BottomNavigationItem[];
  value: string;
  onValueChange?: (value: string) => void;
  /** 링크로 이동하면 항목을 감쌀 요소(Next Link 등)를 돌려준다 */
  renderItem?: (item: BottomNavigationItem, children: React.ReactNode) => React.ReactElement;
  className?: string;
};

export function BottomNavigation({ items, value, onValueChange, renderItem, className }: BottomNavigationProps) {
  return (
    <nav
      data-slot="bottom-navigation"
      aria-label="주요 메뉴"
      className={cn(
        "flex w-full shrink-0 border-t border-(--stroke-neutral-muted) bg-layer-default pb-(--bottom-navigation-bottom)",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        const inner = (
          <>
            <span className={cn("flex size-(--bottom-navigation-icon-size) items-center justify-center *:size-full", active ? "[&_svg]:stroke-(length:--bottom-navigation-selected-icon-stroke)" : "text-(--bottom-navigation-unselected-icon-color)")}>{item.icon}</span>
            <span className="text-label-sm">{item.label}</span>
          </>
        );
        const itemClass = cn(
          "relative isolate flex h-(--bottom-navigation-height) flex-1 flex-col items-center justify-center gap-2",
          // 눌림 면은 칸을 꽉 채우지 않고 위아래 4 · 좌우 8 띄운 둥근 면(radius.sm)
          "before:absolute before:inset-x-8 before:inset-y-4 before:-z-10 before:rounded-sm active:before:bg-transparent-pressed",
          active ? "text-neutral" : "text-neutral-subtle",
        );
        if (renderItem) {
          return (
            <Slot.Root key={item.value} aria-current={active ? "page" : undefined} className={itemClass}>
              {renderItem(item, inner)}
            </Slot.Root>
          );
        }
        return (
          <button key={item.value} type="button" aria-current={active ? "page" : undefined} onClick={() => onValueChange?.(item.value)} className={itemClass}>
            {inner}
          </button>
        );
      })}
    </nav>
  );
}

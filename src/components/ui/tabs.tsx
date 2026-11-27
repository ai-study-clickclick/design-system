"use client";

import { createContext, useContext } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "./cn";

// Tabs: 같은 화면 안에서 내용을 나눠 보여 준다
// size md(44, 16px) · sm(40, 14px), layout fill(5개 이하) · hug(6개 이상이거나 라벨이 길 때)
// 선택 fg.neutral · 굵기 700, 미선택 fg.neutral-subtle · 굵기 600, 비활성 gray-500(임시). line 선택 줄 md 2 · sm 3(임시)
// 둥근 칩 모양 고르기는 Tabs가 아니라 ChipGroup을 쓴다
type TabsStyle = { size: "sm" | "md"; layout: "fill" | "hug" };
const TabsStyleContext = createContext<TabsStyle>({ size: "md", layout: "fill" });

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & Partial<TabsStyle>;

export function Tabs({ size = "md", layout = "fill", className, ...props }: TabsProps) {
  return (
    <TabsStyleContext.Provider value={{ size, layout }}>
      <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col", className)} {...props} />
    </TabsStyleContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { layout } = useContext(TabsStyleContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex border-b border-neutral-weak",
        layout === "hug" && "overflow-x-auto px-6",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { size, layout } = useContext(TabsStyleContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative flex items-center justify-center whitespace-nowrap disabled:text-disabled",
        "-mb-px border-b-(length:--tabs-md-indicator-width) border-transparent px-10 font-(--tabs-unselected-font-weight) aria-selected:border-neutral-solid aria-selected:text-neutral",
        size === "md"
          ? "h-(--tabs-md-height) text-label-base aria-selected:font-(--tabs-md-typography-font-weight) text-(--tabs-md-unselected-text-color) disabled:text-(--tabs-md-disabled-text-color)"
          : "h-(--tabs-sm-height) border-b-(length:--tabs-sm-indicator-width) text-label-md aria-selected:font-(--tabs-sm-typography-font-weight) text-(--tabs-sm-unselected-text-color) disabled:text-(--tabs-sm-disabled-text-color)",
        layout === "fill" && "flex-1",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("outline-none", className)} {...props} />;
}

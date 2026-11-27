"use client";

import { createContext, useContext } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "./cn";

// Tabs: 같은 화면 안에서 내용을 나눠 보여 준다
// size md(44, 16px) · sm(40, 14px), layout fill(5개 이하) · hug(6개 이상이거나 라벨이 길 때)
// 선택 fg.neutral · 굵기 700, 미선택 gray-600 · 굵기 600, 비활성 gray-500(임시, tabs-*-unselected · disabled 토큰)
// variant line(아래 2px 줄, 기본) · solid(둥근 칩, 선택은 bg.neutral-solid). solid는 3-2 · DESIGN.md에 없는 임시 추가
type TabsStyle = { size: "sm" | "md"; layout: "fill" | "hug"; variant: "line" | "solid" };
const TabsStyleContext = createContext<TabsStyle>({ size: "md", layout: "fill", variant: "line" });

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & Partial<TabsStyle>;

export function Tabs({ size = "md", layout = "fill", variant = "line", className, ...props }: TabsProps) {
  return (
    <TabsStyleContext.Provider value={{ size, layout, variant }}>
      <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col", className)} {...props} />
    </TabsStyleContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { layout, variant } = useContext(TabsStyleContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex",
        variant === "line" ? "border-b border-neutral-weak" : "gap-8",
        layout === "hug" && "overflow-x-auto",
        layout === "hug" && variant === "line" && "px-6",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { size, layout, variant } = useContext(TabsStyleContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative flex items-center justify-center whitespace-nowrap disabled:text-disabled",
        variant === "line"
          ? cn(
              "-mb-px border-b-2 border-transparent px-10 font-(--tabs-unselected-font-weight) aria-selected:border-neutral-solid aria-selected:text-neutral",
              size === "md"
                ? "h-(--tabs-md-height) text-label-base aria-selected:font-(--tabs-md-typography-font-weight) text-(--tabs-md-unselected-text-color) disabled:text-(--tabs-md-disabled-text-color)"
                : "h-(--tabs-sm-height) text-label-md aria-selected:font-(--tabs-sm-typography-font-weight) text-(--tabs-sm-unselected-text-color) disabled:text-(--tabs-sm-disabled-text-color)",
            )
          : "h-(--tabs-solid-height) shrink-0 rounded-full bg-neutral-weak px-14 text-label-md text-neutral-muted active:bg-neutral-weak-pressed aria-selected:bg-neutral-solid aria-selected:text-on-neutral-solid",
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

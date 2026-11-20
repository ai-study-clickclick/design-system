"use client";

import { createContext, useContext } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "./cn";

// Tabs: 같은 화면 안에서 내용을 나눠 보여 준다
// size md(44, 16px) · sm(40, 14px), layout fill(5개 이하) · hug(6개 이상이거나 라벨이 길 때)
// 선택 fg.neutral · 미선택 fg.neutral-subtle · 비활성 fg.disabled. 선택 표시는 아래 2px 줄
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
        "relative -mb-px flex items-center justify-center border-b-2 border-transparent px-10 whitespace-nowrap text-neutral-subtle",
        "aria-selected:border-neutral-solid aria-selected:text-neutral disabled:text-disabled",
        size === "md" ? "h-(--tabs-medium-height) text-label-base" : "h-(--tabs-small-height) text-label-md",
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

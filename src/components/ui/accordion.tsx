"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

// Accordion: 눌러서 펼치고 접는 묶음(자주 묻는 질문 · 약관 · 유의 사항). MVP 19개 밖 임시 추가
// 뼈대는 shadcn Accordion(Radix). type single(하나만 펼침) · multiple
// 제목 16 · 굵기 500(ListItem 제목과 같음), 위아래 16, 화살표 20(fg.neutral-subtle, 펼치면 뒤집힘)
// 내용 14 fg.neutral-muted, 아래 여백 16. 항목 사이는 Divider line과 같은 줄
export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-(--stroke-neutral-muted) last:border-b-0", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex min-h-touch-min flex-1 items-center gap-12 py-16 text-left text-body-lg font-(--list-item-typography-font-weight) text-neutral disabled:text-disabled",
          className,
        )}
        {...props}
      >
        <span className="min-w-0 flex-1">{children}</span>
        <ChevronDown
          aria-hidden
          className="size-(--chevron-size) shrink-0 text-neutral-subtle transition-transform duration-(--duration-d3) group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="overflow-hidden text-body-md text-neutral-muted" {...props}>
      <div className={cn("pb-16", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

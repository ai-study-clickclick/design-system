"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./cn";

// Calendar: 날짜 고르기. MVP 19개 밖에서 추가한 컴포넌트(임시, 8차 미팅 확정 전)
// 뼈대는 shadcn Calendar(react-day-picker), 값은 SEED 참고 임시. 날짜 칸 44(누르는 영역)
// mode="single" · "range" · "multiple"은 react-day-picker 속성을 그대로 쓴다
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const d = getDefaultClassNames();
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      data-slot="calendar"
      className={cn("w-fit text-neutral", className)}
      classNames={{
        root: cn(d.root, "relative"),
        months: "flex flex-col",
        month: "flex flex-col gap-8",
        nav: "absolute inset-x-0 top-0 flex h-(--calendar-day-size) items-center justify-between",
        button_previous: "flex size-(--calendar-day-size) items-center justify-center rounded-full active:bg-transparent-pressed disabled:text-disabled",
        button_next: "flex size-(--calendar-day-size) items-center justify-center rounded-full active:bg-transparent-pressed disabled:text-disabled",
        month_caption: "flex h-(--calendar-day-size) items-center justify-center",
        caption_label: "text-title-sm",
        month_grid: "border-collapse",
        weekdays: "flex",
        weekday: "flex size-(--calendar-day-size) items-center justify-center text-label-sm text-neutral-subtle",
        week: "flex",
        day: "flex size-(--calendar-day-size) items-center justify-center p-0 text-body-lg",
        day_button:
          "flex size-40 items-center justify-center rounded-full active:bg-transparent-pressed disabled:pointer-events-none",
        today: "text-brand-contrast",
        selected: "*:bg-brand-solid *:text-on-brand-solid *:text-label-base",
        range_start: "rounded-l-full bg-brand-weak",
        range_middle: "bg-brand-weak *:bg-transparent! *:text-brand-contrast! *:text-body-lg! *:font-medium!",
        range_end: "rounded-r-full bg-brand-weak",
        outside: "text-disabled",
        disabled: "text-disabled",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: c }) =>
          orientation === "left" ? (
            <ChevronLeft aria-hidden className={cn("size-24", c)} />
          ) : (
            <ChevronRight aria-hidden className={cn("size-24", c)} />
          ),
      }}
      {...props}
    />
  );
}

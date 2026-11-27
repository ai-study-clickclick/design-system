"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./cn";

// Calendar: 날짜 고르기. MVP 19개 밖에서 추가한 컴포넌트(임시, 8차 미팅 확정 전)
// 뼈대는 shadcn Calendar(react-day-picker), 값은 SEED 참고 임시. 날짜 칸 44(누르는 영역)
// mode="single" · "range" · "multiple"은 react-day-picker 속성을 그대로 쓴다
// 폭은 놓인 자리를 꽉 채우고 7칸을 똑같이 나눈다. 칸 높이 44, 날짜 원 40
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// 날짜 칸(44)과 날짜 원(40)의 차이만큼 위아래를 비운 띠
const band = "relative isolate before:absolute before:inset-y-2 before:-z-10 before:bg-brand-weak";

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const d = getDefaultClassNames();
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      data-slot="calendar"
      className={cn("w-full text-neutral", className)}
      classNames={{
        root: cn(d.root, "relative"),
        months: "flex w-full flex-col",
        month: "flex w-full flex-col gap-8",
        nav: "absolute inset-x-0 top-0 flex h-(--calendar-day-size) items-center justify-between",
        button_previous: "flex size-(--calendar-day-size) items-center justify-center rounded-full active:bg-transparent-pressed disabled:text-disabled",
        button_next: "flex size-(--calendar-day-size) items-center justify-center rounded-full active:bg-transparent-pressed disabled:text-disabled",
        month_caption: "flex h-(--calendar-day-size) items-center justify-center",
        caption_label: "text-title-sm",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "flex h-(--calendar-day-size) flex-1 items-center justify-center text-label-sm text-neutral-subtle",
        week: "flex",
        day: "flex h-(--calendar-day-size) flex-1 items-center justify-center p-0 text-body-lg",
        day_button:
          "flex size-40 items-center justify-center rounded-full active:bg-transparent-pressed disabled:pointer-events-none",
        today: "text-brand-contrast *:font-(--typography-label-base-font-weight)",
        selected: "*:bg-brand-solid *:text-on-brand-solid *:text-label-base",
        // 기간 띠는 날짜 원(40)과 같은 높이로, 첫날은 원 가운데부터 오른쪽만 · 마지막 날은 왼쪽만 칠한다
        range_start: cn(band, "ds-range-start before:right-0 before:left-1/2"),
        range_middle: cn(band, "before:inset-x-0 *:bg-transparent! *:text-brand-contrast! *:text-body-lg! *:font-medium!"),
        // 하루만 고른 기간(첫날 = 마지막 날)은 띠 없이 원만 둔다
        range_end: cn(band, "before:right-1/2 before:left-0 [&.ds-range-start]:before:hidden"),
        outside: "text-(--calendar-disabled-text-color)",
        disabled: "text-(--calendar-disabled-text-color)",
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

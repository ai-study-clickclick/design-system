"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { BottomSheet, BottomSheetClose } from "./bottom-sheet";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { cn } from "./cn";
import { Field, fieldBoxClass, fieldIconClass, useFieldIds, type FieldProps } from "./field";

// DateInput: 날짜 입력. Input 모양이고 누르면 BottomSheet로 Calendar가 열린다(Select와 같은 방식)
// MVP 19개 밖 임시 추가(Calendar와 함께 8차 미팅에서 확정)
export type DateInputProps = FieldProps & {
  id?: string;
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** 고를 수 없는 날짜(지난 날 등) */
  disabledDates?: React.ComponentProps<typeof Calendar>["disabled"];
  className?: string;
};

export function DateInput({
  id,
  label,
  description,
  errorMessage,
  invalid,
  disabled,
  value,
  defaultValue,
  onValueChange,
  placeholder = "날짜를 골라 주세요",
  disabledDates,
  className,
}: DateInputProps) {
  const { inputId, messageId } = useFieldIds(id);
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState(defaultValue);
  const [draft, setDraft] = useState<Date | undefined>(value ?? defaultValue);
  const current = value ?? inner;

  return (
    <Field
      label={label}
      description={description}
      errorMessage={errorMessage}
      invalid={invalid}
      disabled={disabled}
      inputId={inputId}
      messageId={messageId}
      className={className}
    >
      <button
        id={inputId}
        type="button"
        data-slot="date-input"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={description || (invalid && errorMessage) ? messageId : undefined}
        onClick={() => {
          setDraft(current);
          setOpen(true);
        }}
        className={cn(fieldBoxClass({ invalid, disabled }), "h-(--input-height) text-left focus-visible:outline-none")}
      >
        <span className={cn("min-w-0 flex-1 truncate", !current && "text-placeholder")}>
          {current ? format(current, "yyyy.MM.dd") : placeholder}
        </span>
        <CalendarDays aria-hidden className={cn(fieldIconClass, disabled && "text-disabled")} />
      </button>
      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title={label ?? "날짜"}
        showCloseButton
        footer={
          <BottomSheetClose asChild>
            <Button
              className="flex-1"
              disabled={!draft}
              onClick={() => {
                if (value === undefined) setInner(draft);
                onValueChange?.(draft);
              }}
            >
              선택하기
            </Button>
          </BottomSheetClose>
        }
      >
        <Calendar mode="single" selected={draft} onSelect={setDraft} disabled={disabledDates} defaultMonth={draft} />
      </BottomSheet>
    </Field>
  );
}

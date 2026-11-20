"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { BottomSheet } from "./bottom-sheet";
import { cn } from "./cn";
import { Field, fieldBoxClass, useFieldIds, type FieldProps } from "./field";

// Select: 입력 버튼(고른 값만 보임)을 누르면 BottomSheet로 선택 목록이 열린다. 드롭다운은 쓰지 않는다
// label · placeholder · errorMessage · invalid · disabled(3-2 비교표)
export type SelectOption = { value: string; label: React.ReactNode; disabled?: boolean };

export type SelectProps = FieldProps & {
  id?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** 시트 제목. 없으면 label을 쓴다 */
  sheetTitle?: React.ReactNode;
  className?: string;
};

export function Select({
  id,
  label,
  description,
  errorMessage,
  invalid,
  disabled,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "선택해 주세요",
  sheetTitle,
  className,
}: SelectProps) {
  const { inputId, messageId } = useFieldIds(id);
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const selected = options.find((o) => o.value === current);

  const choose = (next: string) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
    setOpen(false);
  };

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
        data-slot="select"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={description || (invalid && errorMessage) ? messageId : undefined}
        onClick={() => setOpen(true)}
        className={cn(fieldBoxClass({ invalid, disabled }), "h-(--input-height) text-left focus-visible:outline-none")}
      >
        <span className={cn("min-w-0 flex-1 truncate", !selected && "text-placeholder")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown aria-hidden className="size-20 shrink-0 text-neutral-subtle" />
      </button>
      <BottomSheet open={open} onOpenChange={setOpen} title={sheetTitle ?? label ?? placeholder}>
        <ul role="listbox" aria-label={typeof label === "string" ? label : undefined} className="-mx-16">
          {options.map((o) => {
            const isSelected = o.value === current;
            return (
              <li key={o.value} role="option" aria-selected={isSelected} aria-disabled={o.disabled || undefined}>
                <button
                  type="button"
                  disabled={o.disabled}
                  onClick={() => choose(o.value)}
                  className={cn(
                    "flex min-h-touch-min w-full items-center gap-8 px-16 py-12 text-left text-body-lg active:bg-transparent-pressed disabled:text-disabled",
                    isSelected && "text-label-base",
                  )}
                >
                  <span className="min-w-0 flex-1">{o.label}</span>
                  {isSelected && <Check aria-hidden className="size-20 shrink-0 text-brand-contrast" />}
                </button>
              </li>
            );
          })}
        </ul>
      </BottomSheet>
    </Field>
  );
}

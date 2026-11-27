"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BottomSheet } from "./bottom-sheet";
import { cn } from "./cn";
import { Field, fieldBoxClass, fieldIconClass, useFieldIds, type FieldProps } from "./field";
import { ListItem } from "./list-item";

// Select: 입력 버튼(고른 값만 보임)을 누르면 BottomSheet로 선택 목록이 열린다. 드롭다운은 쓰지 않는다
// label · placeholder · errorMessage · invalid · disabled(3-2 비교표)
// variant box(입력칸, 기본) · plain(테두리 없는 작은 글자, 정렬 · 필터 등). plain은 3-2 · DESIGN.md에 없는 임시 추가
// plain 글자는 fg.neutral-muted(box 값보다 한 단계 연하게), 화살표는 box와 같은 fieldIconClass
// 시트 안 선택 목록은 ListItem selected(오른쪽 끝 체크: 꺼짐 · 켜짐)
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
  variant?: "box" | "plain";
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
  variant = "box",
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
        className={
          variant === "box"
            ? cn(fieldBoxClass({ invalid, disabled }), "h-(--input-height) text-left focus-visible:outline-none")
            : cn(
                "inline-flex h-(--select-plain-height) w-fit items-center gap-2 rounded-sm px-4 text-label-md active:bg-transparent-pressed disabled:text-disabled",
                invalid ? "text-critical" : "text-neutral-muted",
              )
        }
      >
        <span className={cn("min-w-0 truncate", variant === "box" && "flex-1", !selected && variant === "box" && "text-placeholder")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown aria-hidden className={cn(fieldIconClass, disabled && "text-disabled")} />
      </button>
      <BottomSheet open={open} onOpenChange={setOpen} title={sheetTitle ?? label ?? placeholder}>
        <ul role="listbox" aria-label={typeof label === "string" ? label : undefined} className="-mx-16">
          {options.map((o) => {
            const isSelected = o.value === current;
            return (
              <li key={o.value} role="option" aria-selected={isSelected} aria-disabled={o.disabled || undefined}>
                <ListItem title={o.label} selected={isSelected} disabled={o.disabled} onClick={() => choose(o.value)} />
              </li>
            );
          })}
        </ul>
      </BottomSheet>
    </Field>
  );
}

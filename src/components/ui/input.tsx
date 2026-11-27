"use client";

import { cn } from "./cn";
import { Field, fieldBoxClass, useFieldIds, type FieldProps } from "./field";

// Input: 한 줄 입력. 높이 52 하나라 size 없음
// label · placeholder · description · errorMessage · invalid · disabled · prefix · suffix(3-2 비교표)
export type InputProps = Omit<React.ComponentProps<"input">, "prefix"> &
  FieldProps & {
    /** 입력칸 안 왼쪽(아이콘 · 단위 등) */
    prefix?: React.ReactNode;
    /** 입력칸 안 오른쪽(단위 · 지우기 버튼 등) */
    suffix?: React.ReactNode;
  };

export function Input({
  id,
  label,
  description,
  errorMessage,
  invalid,
  disabled,
  prefix,
  suffix,
  className,
  ...props
}: InputProps) {
  const { inputId, messageId } = useFieldIds(id);
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
      <div className={cn(fieldBoxClass({ invalid, disabled }), "h-(--input-height)")}>
        {prefix && <span className="flex shrink-0 items-center text-neutral-subtle">{prefix}</span>}
        <input
          id={inputId}
          data-slot="input"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={description || (invalid && errorMessage) ? messageId : undefined}
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-placeholder placeholder:font-(--input-placeholder-font-weight) focus-visible:outline-none disabled:cursor-not-allowed"
          {...props}
        />
        {suffix && <span className="flex shrink-0 items-center text-neutral-subtle">{suffix}</span>}
      </div>
    </Field>
  );
}

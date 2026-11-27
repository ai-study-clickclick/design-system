"use client";

import { cn } from "./cn";
import { Field, fieldBoxClass, useFieldIds, type FieldProps } from "./field";

// Textarea: 여러 줄 입력. Input과 같은 속성 + maxLength(글자 수 표시) · autoSize
// autoSize 켬(기본): 3줄(95px)에서 시작해 글이 늘면 칸도 늘어난다. 최대 높이는 쓰는 자리에서 정한다
// autoSize 끔: 2줄(70px) 고정, 넘치면 안에서 스크롤(3-2 비교표 결정 5)
export type TextareaProps = React.ComponentProps<"textarea"> &
  FieldProps & {
    autoSize?: boolean;
  };

export function Textarea({
  id,
  label,
  description,
  errorMessage,
  invalid,
  disabled,
  autoSize = true,
  maxLength,
  value,
  defaultValue,
  className,
  ...props
}: TextareaProps) {
  const { inputId, messageId } = useFieldIds(id);
  const length = String(value ?? defaultValue ?? "").length;
  return (
    <Field
      label={label}
      description={description}
      errorMessage={errorMessage}
      invalid={invalid}
      disabled={disabled}
      inputId={inputId}
      messageId={messageId}
      trailing={maxLength ? `${length}/${maxLength}` : undefined}
      className={className}
    >
      <div
        className={cn(
          fieldBoxClass({ invalid, disabled }),
          "items-stretch py-12",
          autoSize ? "min-h-(--textarea-auto-min-height)" : "h-(--textarea-fixed-height)",
        )}
      >
        <textarea
          id={inputId}
          data-slot="textarea"
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={invalid || undefined}
          aria-describedby={description || (invalid && errorMessage) ? messageId : undefined}
          className={cn(
            "w-full flex-1 resize-none bg-transparent outline-none placeholder:text-placeholder placeholder:font-(--input-placeholder-font-weight) focus-visible:outline-none disabled:cursor-not-allowed",
            autoSize ? "field-sizing-content" : "overflow-y-auto",
          )}
          {...props}
        />
      </div>
    </Field>
  );
}

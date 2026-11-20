"use client";

import { useId } from "react";
import { cn } from "./cn";

// Input · Textarea · Select가 함께 쓰는 틀: 라벨 → 입력칸 → 도움말 또는 오류 문구
// 오류 문구가 있으면 도움말 대신 오류만 보인다(3-2 비교표 결정 1, docs/UX.md와 같음)
export type FieldProps = {
  label?: React.ReactNode;
  /** 도움말 */
  description?: React.ReactNode;
  /** 오류 문구. invalid일 때만 보인다 */
  errorMessage?: React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
};

export function useFieldIds(id?: string) {
  const auto = useId();
  const base = id ?? auto;
  return { inputId: base, messageId: `${base}-message` };
}

export function Field({
  label,
  description,
  errorMessage,
  invalid,
  disabled,
  inputId,
  messageId,
  trailing,
  className,
  children,
}: FieldProps & {
  inputId: string;
  messageId: string;
  /** 오른쪽 아래(글자 수 등) */
  trailing?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const message = invalid && errorMessage ? errorMessage : description;
  return (
    <div data-slot="field" className={cn("flex flex-col gap-8", className)}>
      {label && (
        <label htmlFor={inputId} className={cn("text-label-md", disabled ? "text-disabled" : "text-neutral")}>
          {label}
        </label>
      )}
      {children}
      {(message || trailing) && (
        <div className="flex items-start gap-8">
          {message && (
            <p
              id={messageId}
              role={invalid && errorMessage ? "alert" : undefined}
              className={cn("min-w-0 flex-1 text-body-sm", invalid && errorMessage ? "text-critical" : "text-neutral-subtle")}
            >
              {message}
            </p>
          )}
          {trailing && <span className="ml-auto shrink-0 text-body-sm text-neutral-subtle">{trailing}</span>}
        </div>
      )}
    </div>
  );
}

// 입력칸 테두리: 기본 1px stroke.neutral-weak, 포커스 2px stroke.neutral-contrast, 오류 2px stroke.critical-solid(포커스 중에도)
// 2px는 1px 테두리 + 안쪽 1px 링으로 만들어 글자 자리가 움직이지 않게 한다
export function fieldBoxClass({ invalid, disabled }: { invalid?: boolean; disabled?: boolean }) {
  return cn(
    "flex w-full items-center gap-8 rounded-md border bg-layer-default px-16 text-body-lg text-neutral",
    invalid
      ? "border-critical-solid ring-1 ring-critical-solid ring-inset"
      : "border-neutral-weak focus-within:border-neutral-contrast focus-within:ring-1 focus-within:ring-neutral-contrast focus-within:ring-inset",
    disabled && "border-neutral-weak bg-disabled text-disabled ring-0",
  );
}

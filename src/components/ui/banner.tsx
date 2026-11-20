"use client";

import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "./cn";

// Banner: 화면 전체의 상태나 중요한 메시지를 알리는 지속 안내. 화면 맨 위 전체 폭, 한 화면에 하나
// tone 5가지 · title · description · icon · dismissible(경고 · 오류에는 안 씀). 눌러서 이동(action)은 MVP에서 뺌(3-2 비교표)
// 좌우 16 · 위아래 10 · 간격 6 · 최소 높이 40 · 제목 14 bold · 내용 14 medium · 모서리 없음
const bannerVariants = cva("flex min-h-(--banner-informative-min-height) w-full items-start gap-6 px-16 py-10", {
  variants: {
    tone: {
      neutral: "bg-neutral-weak text-neutral",
      informative: "bg-informative-weak text-informative-contrast",
      positive: "bg-positive-weak text-positive-contrast",
      warning: "bg-warning-weak text-warning-contrast",
      critical: "bg-critical-weak text-critical-contrast",
    },
  },
  defaultVariants: { tone: "informative" },
});

const icons = {
  neutral: Info,
  informative: Info,
  positive: CheckCircle2,
  warning: AlertTriangle,
  critical: XCircle,
};

export type BannerProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof bannerVariants> & {
    title?: React.ReactNode;
    description: React.ReactNode;
    /** 기본은 tone별 아이콘. false면 아이콘 없음 */
    icon?: React.ReactNode | false;
    /** 한 번만 보여 줘도 되는 정보에만. warning · critical에는 쓰지 않는다 */
    dismissible?: boolean;
    onDismiss?: () => void;
  };

export function Banner({ tone, title, description, icon, dismissible, onDismiss, className, ...props }: BannerProps) {
  const [hidden, setHidden] = useState(false);
  const t = tone ?? "informative";
  const Icon = icons[t];
  const canDismiss = dismissible && t !== "warning" && t !== "critical";
  if (hidden) return null;
  return (
    <div
      data-slot="banner"
      role={t === "critical" || t === "warning" ? "alert" : "status"}
      className={cn(bannerVariants({ tone }), className)}
      {...props}
    >
      {icon !== false && <span className="flex h-20 shrink-0 items-center">{icon ?? <Icon aria-hidden className="size-16" />}</span>}
      <div className="min-w-0 flex-1 text-emphasis-md">
        {title && <p className="text-label-md">{title}</p>}
        <p>{description}</p>
      </div>
      {canDismiss && (
        <button
          type="button"
          aria-label="닫기"
          onClick={() => {
            setHidden(true);
            onDismiss?.();
          }}
          className="-my-2 flex size-touch-min-sm shrink-0 items-center justify-center rounded-full active:bg-transparent-pressed"
        >
          <X aria-hidden className="size-16" />
        </button>
      )}
    </div>
  );
}

export { bannerVariants };

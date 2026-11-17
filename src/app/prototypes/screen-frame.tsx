"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, RotateCcw } from "lucide-react";
import { useScreens } from "../site-shell";

// 프로토타입 화면 틀. 모든 프로토타입 화면은 이 틀로 감싼다
// 위 막대: 목록으로 가기 · 다른 화면으로 이동 · 기기 크기(Chrome 개발자 도구처럼 기기 고르기 · 폭 × 높이 · 기준 크기로)
// 앱 콘텐츠 폭은 기준 375px, 최대 480px(`DESIGN.md` "Layout")라서, 480px보다 넓은 기기에서는 콘텐츠가 가운데에 놓인다
// 기기 크기는 CSS 픽셀(브라우저가 쓰는 크기) 기준이다
// 휴대폰(768px 미만)에서는 기기 크기 조절 없이 화면 폭을 다 쓴다
type Size = { w: number; h: number };

const BASE: Size = { w: 375, h: 812 };
const LIMIT = { minW: 320, maxW: 540, minH: 480, maxH: 960 };

const DEVICES: { name: string; size: Size }[] = [
  { name: "iPhone SE (1세대)", size: { w: 320, h: 568 } },
  { name: "iPhone SE (2 · 3세대)", size: { w: 375, h: 667 } },
  { name: "iPhone 13 mini · 기준", size: BASE },
  { name: "iPhone 16", size: { w: 393, h: 852 } },
  { name: "iPhone 16 Pro", size: { w: 402, h: 874 } },
  { name: "iPhone 16 Pro Max", size: { w: 440, h: 956 } },
  { name: "Galaxy S24", size: { w: 360, h: 780 } },
  { name: "Galaxy Z Fold 5 (접었을 때)", size: { w: 344, h: 882 } },
  { name: "Surface Duo", size: { w: 540, h: 720 } },
];

const RESPONSIVE = "반응형";

const clamp = ({ w, h }: Size): Size => ({
  w: Math.round(Math.min(LIMIT.maxW, Math.max(LIMIT.minW, w))),
  h: Math.round(Math.min(LIMIT.maxH, Math.max(LIMIT.minH, h))),
});

const deviceOf = (size: Size) => DEVICES.find((d) => d.size.w === size.w && d.size.h === size.h)?.name ?? RESPONSIVE;

export default function ScreenFrame({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState<Size>(BASE);
  const drag = useRef<{ x: number; y: number; size: Size; axis: "w" | "h" | "both" } | null>(null);
  const device = deviceOf(size);

  function startDrag(axis: "w" | "h" | "both") {
    return (e: React.PointerEvent<HTMLDivElement>) => {
      drag.current = { x: e.clientX, y: e.clientY, size, axis };
      e.currentTarget.setPointerCapture(e.pointerId);
    };
  }

  function onDrag(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    // 틀이 가로 가운데 정렬이라 가로는 끈 거리의 2배, 세로는 끈 거리만큼 바뀐다
    setSize(
      clamp({
        w: d.axis === "h" ? d.size.w : d.size.w + (e.clientX - d.x) * 2,
        h: d.axis === "w" ? d.size.h : d.size.h + (e.clientY - d.y),
      }),
    );
  }

  function onKey(axis: "w" | "h") {
    return (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 10 : 1;
      const keys = axis === "w" ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
      const i = keys.indexOf(e.key);
      if (i === -1) return;
      e.preventDefault();
      const delta = i === 0 ? -step : step;
      setSize((s) => clamp({ ...s, [axis]: s[axis] + delta }));
    };
  }

  const handle = "absolute hidden touch-none items-center justify-center md:flex";
  const grip = "rounded-full bg-neutral-weak-pressed group-hover:bg-neutral-solid";

  return (
    <div className="-mx-16 md:mx-0 md:py-24">
      <Toolbar size={size} device={device} onSize={(s) => setSize(clamp(s))} />

      <div className="md:mt-16 md:overflow-x-auto md:pb-32">
        <div
          className="relative mx-auto w-full bg-layer-default md:w-[var(--frame-w)] md:rounded-lg md:border md:border-neutral-weak"
          style={{ "--frame-w": `${size.w}px`, "--frame-h": `${size.h}px` } as React.CSSProperties}
        >
          <div className="min-h-[calc(100vh-56px)] md:h-[var(--frame-h)] md:min-h-0 md:overflow-y-auto md:rounded-lg">
            <div className="mx-auto w-full max-w-screen-max">{children}</div>
          </div>

          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="화면 폭 조절"
            aria-valuemin={LIMIT.minW}
            aria-valuemax={LIMIT.maxW}
            aria-valuenow={size.w}
            tabIndex={0}
            onPointerDown={startDrag("w")}
            onPointerMove={onDrag}
            onPointerUp={() => (drag.current = null)}
            onKeyDown={onKey("w")}
            className={`group top-0 -right-24 h-full w-24 cursor-ew-resize ${handle}`}
          >
            <span className={`h-48 w-4 ${grip}`} />
          </div>
          <div
            role="separator"
            aria-orientation="horizontal"
            aria-label="화면 높이 조절"
            aria-valuemin={LIMIT.minH}
            aria-valuemax={LIMIT.maxH}
            aria-valuenow={size.h}
            tabIndex={0}
            onPointerDown={startDrag("h")}
            onPointerMove={onDrag}
            onPointerUp={() => (drag.current = null)}
            onKeyDown={onKey("h")}
            className={`group -bottom-24 left-0 h-24 w-full cursor-ns-resize ${handle}`}
          >
            <span className={`h-4 w-48 ${grip}`} />
          </div>
          <div
            aria-hidden
            onPointerDown={startDrag("both")}
            onPointerMove={onDrag}
            onPointerUp={() => (drag.current = null)}
            className={`group -right-24 -bottom-24 size-24 cursor-nwse-resize ${handle}`}
          >
            <span className={`size-8 ${grip}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 위 막대. 왼쪽: 목록으로 · 화면 이동, 오른쪽(PC): 기기 · 폭 × 높이 · 기준 크기로
function Toolbar({ size, device, onSize }: { size: Size; device: string; onSize: (s: Size) => void }) {
  const screens = useScreens();
  const pathname = usePathname();
  const router = useRouter();
  const current = pathname.split("/")[2] ?? "";

  return (
    <div className="flex flex-wrap items-center justify-between gap-8 border-b border-neutral-weak px-16 py-8 md:rounded-lg md:border md:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/prototypes"
          aria-label="화면 목록으로"
          className="flex size-40 shrink-0 items-center justify-center rounded-sm hover:bg-transparent-pressed"
        >
          <ChevronLeft size={20} />
        </Link>
        <SelectBox
          label="다른 화면으로 이동"
          value={current}
          onChange={(name) => router.push(`/prototypes/${name}`)}
          options={screens.map((name) => ({ value: name, label: name }))}
        />
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <SelectBox
          label="기기 크기"
          value={device}
          onChange={(name) => {
            const found = DEVICES.find((d) => d.name === name);
            if (found) onSize(found.size);
          }}
          options={[
            ...(device === RESPONSIVE ? [{ value: RESPONSIVE, label: RESPONSIVE }] : []),
            ...DEVICES.map((d) => ({ value: d.name, label: d.name })),
          ]}
        />
        <div className="flex h-40 items-center gap-4 text-label-md text-neutral-muted">
          <SizeInput label="폭" value={size.w} onCommit={(w) => onSize({ ...size, w })} />
          <span aria-hidden>×</span>
          <SizeInput label="높이" value={size.h} onCommit={(h) => onSize({ ...size, h })} />
        </div>
        <button
          type="button"
          aria-label="기준 크기(375 × 812)로"
          title="기준 크기(375 × 812)로"
          onClick={() => onSize(BASE)}
          className="flex size-40 items-center justify-center rounded-sm text-neutral-muted hover:bg-transparent-pressed hover:text-neutral"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="relative flex min-w-0 items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-40 min-w-0 cursor-pointer appearance-none truncate rounded-sm bg-transparent pr-32 pl-12 text-label-md hover:bg-transparent-pressed"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-12 text-neutral-muted" />
    </label>
  );
}

// 숫자를 바로 고칠 수 있는 칸. Enter를 누르거나 칸을 벗어나면 적용한다
function SizeInput({ label, value, onCommit }: { label: string; value: number; onCommit: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    const n = Number(draft);
    if (draft !== null && Number.isFinite(n) && n > 0) onCommit(n);
    setDraft(null);
  };

  return (
    <input
      aria-label={label}
      inputMode="numeric"
      value={draft ?? String(value)}
      onChange={(e) => setDraft(e.target.value.replace(/\D/g, ""))}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
      className="h-32 w-48 rounded-sm border border-neutral-weak bg-layer-default text-center text-label-md text-neutral tabular-nums"
    />
  );
}

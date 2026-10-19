---
version: alpha
name: clickclick-design-system
description: "[초안 v0.1] 딸깍딸깍 디자인 시스템의 디자인 값 원본. YAML 토큰이 원본이고 본문은 근거와 쓰는 법이다. 앱 화면(모바일), 라이트 모드, 기본 테마는 주황 + 큰 라운드."

# ─────────────────────────────────────────────────────────────
# 작성 규칙 (docs/CONVENTIONS.md)
# - 토큰·키는 영어, 설명은 한글. 이름은 소문자 + 대시, 점(.)은 그룹 구분.
# - 1단 palette.* → 2단 쓰임새(bg.*, fg.*, stroke.*). 화면·컴포넌트에는 쓰임새 이름만 쓴다.
# - 점이 들어간 키는 따옴표로 감싼다. (Stitch 린트 v0.4.0으로 확인: 에러 없이 통과, 참조도 정상 해석)
# - ❗ = Claude가 정한 값 (근거 문서에 값이 없거나 내가 고른 것). 팀이 다시 보고 확정해야 함. 전체 목록: Overview > Known Gaps
# - ⚠ = 근거 문서에도 값이 없어서 비워 둔 칸 (팀 결정 대기)
# ─────────────────────────────────────────────────────────────
colors:
  # ── 1단: 기본 색표 ──
  # 주황 (기본 테마의 대표 컬러). ❗ 값은 Tailwind orange 스케일에서 Claude가 가져옴 → 브랜드 확정값으로 교체 필요
  "palette.orange-50": "#fff7ed"
  "palette.orange-100": "#ffedd5"
  "palette.orange-200": "#fed7aa"
  "palette.orange-300": "#fdba74"
  "palette.orange-400": "#fb923c"
  "palette.orange-500": "#f97316"
  "palette.orange-600": "#ea580c"
  "palette.orange-700": "#c2410c"
  "palette.orange-800": "#9a3412"
  "palette.orange-900": "#7c2d12"
  # 브랜드 색 단계: 테마 프리셋의 brand.primary에서 /sync가 자동 생성(OKLCH).
  # 기본 테마에서는 주황 단계를 그대로 가리킨다.
  "palette.brand-50": "{colors.palette.orange-50}"
  "palette.brand-100": "{colors.palette.orange-100}"
  "palette.brand-200": "{colors.palette.orange-200}"
  "palette.brand-300": "{colors.palette.orange-300}"
  "palette.brand-400": "{colors.palette.orange-400}"
  "palette.brand-500": "{colors.palette.orange-500}"
  "palette.brand-600": "{colors.palette.orange-600}"
  "palette.brand-700": "{colors.palette.orange-700}"
  "palette.brand-800": "{colors.palette.orange-800}"
  "palette.brand-900": "{colors.palette.orange-900}"
  # 회색 ❗ (Tailwind neutral 스케일. 토스 공식 grey 스케일로 바꿀지는 팀 결정)
  "palette.gray-0": "#ffffff"
  "palette.gray-50": "#fafafa"
  "palette.gray-100": "#f5f5f5"
  "palette.gray-200": "#e5e5e5"
  "palette.gray-300": "#d4d4d4"
  "palette.gray-400": "#a3a3a3"
  "palette.gray-500": "#737373"
  "palette.gray-700": "#404040"
  "palette.gray-900": "#171717"
  # 상태색 ❗ (Tailwind 값. 단계 규칙: weak=100, weak 눌림=200, solid=600, solid 눌림=700)
  "palette.red-100": "#fee2e2"
  "palette.red-200": "#fecaca"
  "palette.red-600": "#dc2626"
  "palette.red-700": "#b91c1c"
  "palette.green-100": "#dcfce7"
  "palette.green-200": "#bbf7d0"
  "palette.green-700": "#15803d"
  "palette.blue-100": "#dbeafe"
  "palette.blue-200": "#bfdbfe"
  "palette.blue-600": "#2563eb"
  "palette.blue-700": "#1d4ed8"
  "palette.yellow-100": "#fef9c3"
  "palette.yellow-200": "#fef08a"
  "palette.yellow-400": "#facc15"
  "palette.yellow-700": "#a16207"

  # ── 대표 컬러 ──
  "brand.primary": "{colors.palette.orange-600}"
  primary: "{colors.brand.primary}"   # Stitch 린트가 요구하는 이름. brand.primary와 같은 값

  # ── 2단: 쓰임새 이름 (역할: Brand · Neutral · Positive · Warning · Critical · Informative) ──
  # 배경 bg.*  (밝은 단계 = 배경)
  "bg.layer-basement": "{colors.palette.gray-100}"
  "bg.layer-default": "{colors.palette.gray-0}"
  "bg.layer-floating": "{colors.palette.gray-0}"
  "bg.overlay": "rgba(0, 0, 0, 0.5)"
  "bg.neutral-weak": "{colors.palette.gray-100}"
  "bg.neutral-weak-pressed": "{colors.palette.gray-200}"
  "bg.neutral-solid": "{colors.palette.gray-900}"
  "bg.neutral-solid-pressed": "{colors.palette.gray-700}"
  "bg.brand-solid": "{colors.palette.brand-600}"
  "bg.brand-solid-pressed": "{colors.palette.brand-700}"
  "bg.brand-weak": "{colors.palette.brand-100}"
  "bg.brand-weak-pressed": "{colors.palette.brand-200}"
  "bg.critical-solid": "{colors.palette.red-600}"
  "bg.critical-solid-pressed": "{colors.palette.red-700}"
  "bg.critical-weak": "{colors.palette.red-100}"
  "bg.positive-weak": "{colors.palette.green-100}"
  "bg.informative-weak": "{colors.palette.blue-100}"
  "bg.warning-weak": "{colors.palette.yellow-100}"
  "bg.disabled": "{colors.palette.gray-100}"
  # ❗ SEED 스펙이 쓰는 이름만 먼저 추가. 값은 임시(화면을 보고 다시 정함)
  "bg.transparent-pressed": "#17171714"
  # 글자·아이콘 fg.*  (진한 단계 = 글자)
  "fg.neutral": "{colors.palette.gray-900}"
  "fg.neutral-muted": "{colors.palette.gray-500}"
  "fg.on-brand-solid": "{colors.palette.gray-0}"
  "fg.on-neutral-solid": "{colors.palette.gray-0}"
  "fg.brand": "{colors.palette.brand-700}"
  "fg.critical": "{colors.palette.red-700}"
  "fg.positive": "{colors.palette.green-700}"
  "fg.informative": "{colors.palette.blue-700}"
  "fg.warning": "{colors.palette.yellow-700}"
  "fg.disabled": "{colors.palette.gray-400}"
  "fg.placeholder": "{colors.palette.gray-500}"
  # 테두리 stroke.*  (중간 단계 = 테두리)
  "stroke.neutral": "{colors.palette.gray-200}"
  "stroke.neutral-strong": "{colors.palette.gray-300}"
  "stroke.focus": "{colors.palette.blue-600}"
  "stroke.critical": "{colors.palette.red-600}"
  # ❗ SEED 스펙 이름. 값 임시
  "stroke.neutral-weak": "{colors.palette.gray-500}"
  "stroke.neutral-muted": "{colors.palette.gray-100}"
  "stroke.neutral-contrast": "{colors.palette.gray-900}"
  "stroke.critical-solid": "{colors.palette.red-600}"

# 테마 프리셋. brand.primary와 radius.base만 정함 (Stitch 린트는 모르는 그룹이라 경고만 나옴)
theme:
  default:
    brand.primary: "{colors.palette.orange-600}"
    radius.base: 16px

typography:
  # 기본 글꼴 Pretendard. 크기·줄 높이는 당근 SEED 스케일(t9·t7·t6·t5·t4·t2) 값을 참고.
  # 크기·줄 높이 값은 SEED 문서 값. 어떤 단계를 어디에 쓸지는 ❗ Claude가 고름.
  # 굵기 600(라벨)은 ❗ 토스 TDS에 Semibold가 있어 가져옴 (SEED는 400/500/700만 사용)
  title-lg: { fontFamily: Pretendard, fontSize: 24px, fontWeight: 700, lineHeight: 32px }
  title-md: { fontFamily: Pretendard, fontSize: 20px, fontWeight: 700, lineHeight: 27px }
  title-sm: { fontFamily: Pretendard, fontSize: 18px, fontWeight: 700, lineHeight: 24px }
  body-lg: { fontFamily: Pretendard, fontSize: 16px, fontWeight: 400, lineHeight: 22px }
  body-md: { fontFamily: Pretendard, fontSize: 14px, fontWeight: 400, lineHeight: 19px }
  caption: { fontFamily: Pretendard, fontSize: 12px, fontWeight: 400, lineHeight: 16px }
  label-lg: { fontFamily: Pretendard, fontSize: 16px, fontWeight: 600, lineHeight: 22px }
  label-md: { fontFamily: Pretendard, fontSize: 14px, fontWeight: 600, lineHeight: 19px }
  label-sm: { fontFamily: Pretendard, fontSize: 12px, fontWeight: 600, lineHeight: 16px }

rounded:
  # 테마 프리셋은 radius.base 하나만 정하고 나머지는 /sync가 비율로 계산한다.
  # ❗ 비율 0.5 / 0.75 / 1 / 1.5 는 Claude가 정함 (기본값 16px일 때 8 / 12 / 16 / 24)
  "radius.base": 16px
  "radius.sm": 8px
  "radius.md": 12px
  "radius.lg": 16px
  "radius.xl": 24px
  "radius.full": 9999px

spacing:
  # ❗ 4px 단위 스케일(4~48)은 Claude가 정함
  "space.4": 4px
  "space.8": 8px
  "space.12": 12px
  "space.16": 16px
  "space.20": 20px
  "space.24": 24px
  "space.32": 32px
  "space.48": 48px
  # 화면 단위 값 (UX.md 9장이 DESIGN.md에 넘긴 값)
  "space.screen-width": 375px   # ❗ 기준 화면 폭 (SEED·토스 문서에 숫자 없음)
  "space.screen-max": 480px     # ❗ 넓은 화면에서 콘텐츠 최대 폭 (SEED sm 구간 상한 479px 참고)
  "space.screen-margin": 16px   # ❗ 화면 좌우 여백 (SEED 모바일 base는 12px)
  "space.gutter": 16px          # SEED 모바일 gutter 16px
  "space.touch-min": 44px       # 누르는 영역 최소 크기 (UX.md 4-3)

components:
  # 이름·속성은 코드와 피그마가 같게 (예: Button · variant=primary).
  # 상태(pressed·disabled·loading·selected)는 별도 키로 둔다.
  # ❗ 컴포넌트 변형·높이(56/44/52)·패딩은 Claude가 정함. 높이 56px은 비공식 토스 정리 사이트 값이라 공식 문서로 검증 못 함.
  # MVP 19개 중 아래에 없는 것은 "Components" 섹션 표의 TODO 참고.
  button-primary:
    backgroundColor: "{colors.bg.brand-solid}"
    textColor: "{colors.fg.on-brand-solid}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.lg}"
    height: 56px
    padding: "{spacing.space.20}"
  button-primary-pressed:
    backgroundColor: "{colors.bg.brand-solid-pressed}"
    textColor: "{colors.fg.on-brand-solid}"
  button-primary-disabled:
    backgroundColor: "{colors.bg.disabled}"
    textColor: "{colors.fg.disabled}"
  button-secondary:
    backgroundColor: "{colors.bg.neutral-weak}"
    textColor: "{colors.fg.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.lg}"
    height: 56px
    padding: "{spacing.space.20}"
  button-secondary-pressed:
    backgroundColor: "{colors.bg.neutral-weak-pressed}"
    textColor: "{colors.fg.neutral}"
  button-critical:
    backgroundColor: "{colors.bg.critical-solid}"
    textColor: "{colors.fg.on-brand-solid}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.lg}"
    height: 56px
  button-critical-pressed:
    backgroundColor: "{colors.bg.critical-solid-pressed}"
    textColor: "{colors.fg.on-brand-solid}"
  button-medium:
    backgroundColor: "{colors.bg.brand-solid}"
    textColor: "{colors.fg.on-brand-solid}"
    typography: "{typography.label-md}"
    rounded: "{rounded.radius.md}"
    height: 44px
    padding: "{spacing.space.16}"
  input:
    backgroundColor: "{colors.bg.layer-default}"
    textColor: "{colors.fg.neutral}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.radius.md}"
    height: 52px
    padding: "{spacing.space.16}"
  input-disabled:
    backgroundColor: "{colors.bg.disabled}"
    textColor: "{colors.fg.disabled}"
  card:
    backgroundColor: "{colors.bg.layer-default}"
    textColor: "{colors.fg.neutral}"
    rounded: "{rounded.radius.lg}"
    padding: "{spacing.space.16}"
  badge-brand:
    backgroundColor: "{colors.bg.brand-weak}"
    textColor: "{colors.fg.brand}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.radius.sm}"
    padding: "{spacing.space.8}"
  toast:
    backgroundColor: "{colors.bg.neutral-solid}"
    textColor: "{colors.fg.on-neutral-solid}"
    typography: "{typography.body-md}"
    rounded: "{rounded.radius.md}"
    padding: "{spacing.space.16}"
  banner-informative:
    backgroundColor: "{colors.bg.informative-weak}"
    textColor: "{colors.fg.informative}"
    typography: "{typography.body-md}"
    rounded: "{rounded.radius.md}"
    padding: "{spacing.space.16}"
  banner-critical:
    backgroundColor: "{colors.bg.critical-weak}"
    textColor: "{colors.fg.critical}"
    typography: "{typography.body-md}"
    rounded: "{rounded.radius.md}"
    padding: "{spacing.space.16}"
  bottom-sheet:
    backgroundColor: "{colors.bg.layer-floating}"
    textColor: "{colors.fg.neutral}"
    rounded: "{rounded.radius.xl}"
    padding: "{spacing.space.24}"
  modal:
    backgroundColor: "{colors.bg.layer-floating}"
    textColor: "{colors.fg.neutral}"
    rounded: "{rounded.radius.xl}"
    padding: "{spacing.space.24}"
---

## Overview

딸깍딸깍 디자인 시스템에서 **보이는 값**(색·글자·간격·모서리·그림자·움직임·컴포넌트 모양)을 정하는 원본 파일이에요. 앱 화면(모바일)과 라이트 모드가 기준이고, 다크모드는 나중에 추가해요. 이 파일이 바뀌면 코드 테마와 피그마 Variables가 `/sync`로 따라와요.

**초안 v0.1** — 팀 검토 전 첫 버전이에요. ❗(Claude가 정한 값)과 ⚠(비워 둔 값)은 검토하면서 확정해요. 다크모드·PC↔MO는 Backlog라 뺐어요.

한 라이브러리를 그대로 쓰지 않고, 필요한 것만 가져와 우리 것으로 만들었어요.

| 영역 | 기준 | 이 파일에서 반영한 곳 |
| --- | --- | --- |
| 부품 뼈대(구성·구조) | shadcn/ui. 없는 앱 부품(Top bar, Bottom sheet, 하단 고정 버튼)은 당근·토스 참고 | Components |
| 색·글자 토큰 | 당근 SEED + 토스 TDS (이번 초안은 SEED의 3단 구조·역할 이름·글자 스케일 위주. 토스 공식 색·글자 값은 아직 반영 안 함) | Colors, Typography |
| 색 단계 용도·모서리·그림자 | Vercel 일부 | Colors, Shapes, Elevation |
| 움직임·눌림 | 당근 SEED (토스 공식 버튼 문서는 눌림을 어둡게 덮는 방식이라 SEED의 "줄어듦"과 다름) | Components > 상태와 피드백 |
| 문구·말투 | 토스 (규칙만 참고) | 여기서 다루지 않음 → `docs/WRITING.md` |
| 사용성·접근성·상태 규칙 | 팀 결정 | 여기서 다루지 않음 → `docs/UX.md` (값만 이 파일이 정함) |

- 기본 글꼴은 Pretendard, 아이콘은 Lucide예요.
- 이 파일에 없는 토큰·스타일·컴포넌트는 Claude가 만들지 않고 사람에게 먼저 물어요.
- 기본 테마는 아래 `theme.default`예요(`brand.primary` = 주황 600, `radius.base` 16px).
- 테마 프리셋(`theme.이름`)은 `brand.primary`와 `radius.base` 두 값만 정해요. 나머지는 자동 계산하고, 기본 토큰은 바뀌지 않아요.

### ❗ Claude가 정한 값 (팀이 다시 봐야 해요)

근거 문서(UX.md·SEED·토스·Vercel)에 값이 없거나, 여러 선택지 중 Claude가 고른 값이에요. 본문과 YAML 주석에도 ❗로 표시했어요.

| # | 항목 | 정한 값 | 왜 이 값인지 | 위치 |
| --- | --- | --- | --- | --- |
| 1 | 기준 화면 폭·최대 폭·화면 여백 | 375 / 480 / 16px | SEED·토스 문서에 숫자가 없어서 일반적인 모바일 값으로 | `spacing`, Layout |
| 2 | 색 값 전부(주황·회색·상태색) | Tailwind 스케일 | 브랜드 확정값이 없어 임시. 토스 공식 grey/blue 스케일을 쓸지도 결정 필요 | `colors` |
| 3 | 쓰임새 토큰 목록 (`bg`/`fg`/`stroke`에 무엇을 둘지) | SEED 역할 구조에서 추림 | 어떤 토큰이 필요한지는 컴포넌트가 정해지면 다시 봐야 함 | `colors` |
| 4 | 라운드 비율 | 0.5 / 0.75 / 1 / 1.5 (8·12·16·24px) | 근거 없음 | `rounded` |
| 5 | 그림자 값 | s1 / s2 / s3 | SEED는 단계만 있고 값은 안 줌 | Elevation |
| 6 | 컴포넌트 높이 | 56 / 44 / 52px | 44는 UX.md 최소. 56은 비공식 정리 사이트 값이라 공식 문서로 검증 못 함 | `components` |
| 7 | 간격 스케일 | 4px 단위 4~48 | 근거 없음 | `spacing` |
| 8 | 글자 단계 선택·라벨 굵기 600 | SEED 값 6단계 선택, 라벨 600 | 토스 공식에 Semibold가 있고 SEED는 400/500/700 | `typography` |
| 9 | 색 대비 기준값 | APCA 기준. 가독성 텍스트 Lc 75 이상(Lc 90 권장), 다른 텍스트 Lc 60 이상(16px 미만이면 굵게), placeholder·disabled 글자 Lc 30 이상 | SEED 포용적 디자인 문서의 기준을 그대로 씀(https://seed-design.io/llms/foundations/inclusive-design.txt). 팀이 WCAG 대신 APCA로 정함. APCA는 W3C 공식 권고가 아니고 2026년 4월 WCAG 3 초안에도 없어요(https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html) | Colors |
| 10 | 키보드 포커스 링 2px 선 + 2px 띄움, 색 `stroke.focus`(blue-600, Lc 74.9) | SEED CSS(@seed-design/css 3.0.3) 값 | SEED 규칙 문서엔 없고 배포 CSS에만 있어요. 모바일에 맞는지 확인 필요 | Components |
| 11 | 일시 알림·확인 요청·선택 목록의 컴포넌트 | Toast / Modal / Bottom sheet | UX.md 6-1이 "DESIGN.md를 따른다"고 넘김 | Components |
| 12 | 컴포넌트 변형과 연결 토큰 (`button-critical`, `badge-brand` 등) | YAML `components` | 컴포넌트 스펙이 아직 없음 | `components` |

### ⚠ 근거 문서에도 값이 없어 비워 둔 것

- 나머지 컴포넌트(Select, Textarea, Checkbox, Radio, Switch, Avatar, Tabs, List item, Top bar, Spinner, Skeleton)의 토큰 연결.
- 다크모드(Notion 6-3)와 PC↔MO 변환(6-4)은 Backlog라 이번 초안에서 뺐어요. 나중에 추가해요.

### Stitch 형식의 한계

- Stitch 스펙에는 `motion`·`shadow` 토큰 그룹이 없어서 YAML에 넣으면 린트가 "무시됨" 경고를 내요. 값 자체는 SEED(모션)·Vercel(그림자 단계)에서 왔지만 이 파일 형식(Stitch)이 그 칸을 안 줘서, 지금은 본문 표가 원본이에요. `/sync`가 이 표를 읽을지, 별도 칸을 둘지는 팀 결정이에요.

## Colors

토큰은 3층으로 읽어요. **기본 색표(`palette.*`) → 쓰임새 이름(`bg.*`·`fg.*`·`stroke.*`) → 컴포넌트**. 화면과 컴포넌트에는 쓰임새 이름만 써요.

- 역할 6개: Brand, Neutral, Positive, Warning, Critical, Informative (SEED 역할 구조).
- 단계 용도 (Vercel): 밝은 단계는 배경, 중간 단계는 테두리, 진한 단계는 글자.
- 변형: `-solid`(채움), `-weak`(연한 배경), `-pressed`(눌림). 눌림은 표면 색만 바꾸고 글자·아이콘 색은 그대로예요.
- 브랜드 색 단계(`palette.brand-50~900`)는 `brand.primary`에서 자동 생성돼요. 대표 컬러만 바꿔도 `bg.brand-solid` 등이 함께 바뀌어요.
- 눌림 색 연결은 SEED와 같아요(brand-solid 600 → pressed 700).

**색 대비 기준값** (팀 결정: SEED와 같은 APCA 기준)

| 대상 | 기준 (APCA, 흰 배경 위 Lc 값은 절댓값) |
| --- | --- |
| 가독성 텍스트(본문) | Lc 75 이상, Lc 90 이상 권장 |
| 다른 텍스트 | Lc 60 이상. 글자 크기가 16px 미만이면 굵게(bold) |
| placeholder·disabled 글자 | Lc 30 이상 |
| 색만으로 의미 전달 금지 | 글자나 아이콘을 함께 (SEED 포용적 디자인, UX.md) |

출처: SEED 포용적 디자인 문서(https://seed-design.io/llms/foundations/inclusive-design.txt). 점수는 APCA 공식 패키지 apca-w3 0.1.9로 계산했어요.

- 주황 600(`bg.brand-solid`) 위 흰 버튼 라벨(16px 굵게)은 Lc 67.6이라 "다른 텍스트" Lc 60 이상을 통과해요. 주황 700 위는 Lc 79.9예요.
- 흰 배경 위 글자색 점수: `fg.neutral` 104.7, `fg.critical` 80.2, `fg.informative` 82.2, `fg.positive` 74.2, `fg.warning` 73.7, `fg.neutral-muted` 72.9, `fg.brand`(주황 700) 74.5. 마지막 네 개는 Lc 75에 조금 못 미치므로 본문이 아닌 보조 글자·라벨에만 써요(Lc 60 이상 통과).
- `fg.disabled`(gray-400) Lc 49.5, `fg.placeholder`(gray-500) Lc 72.9로 둘 다 Lc 30 이상이에요.
- SEED 문서에는 테두리·아이콘 같은 글자가 아닌 요소의 Lc 기준이 없어요. 그래서 이 파일도 정하지 않고, 기준이 생기면 추가해요.
- Stitch 린트의 `contrast-ratio` 검사는 WCAG 4.5:1 기준이라 주황 600 버튼에서 경고가 계속 나와요. APCA 기준으로는 정상이에요.

## Typography

- 글꼴은 Pretendard 하나만 써요. SEED는 Pretendard를 Windows에만 쓰고 iOS·Android는 시스템 글꼴을 써요. 우리는 앱 화면 전체에 Pretendard를 웹폰트로 넣어요.
- 위계: 화면 제목 `title-lg`, 섹션 제목 `title-md`·`title-sm`, 본문 `body-lg`·`body-md`, 보조 `caption`, 버튼·라벨 `label-*`.
- 제목과 본문의 계층을 분명히 나눠요. 한 화면에서 쓰는 글자 크기는 4단계 이내예요.
- 글자 크기는 사용자 설정을 존중해요(UX.md 11장). 고정 크기가 필요한 곳만 예외로 해요.
- 라벨 굵기 600 ❗: 토스 TDS에는 Semibold가 있고 SEED는 400/500/700만 써요.

## Layout

- **기준 화면 폭**: 375px ❗. 그보다 좁은 화면에서도 글자가 잘리거나 겹치지 않아야 해요.
- **화면 여백** `space.screen-margin`: 16px ❗. **간격** `space.gutter`: 16px (SEED).
- **최대 폭** `space.screen-max`: 480px ❗. 넓은 화면에서는 콘텐츠를 늘리지 않고 가운데에 둬요.
- **누르는 영역**: `space.touch-min` 44×44px 이상. 아이콘이 작아도 누르는 영역은 이 크기를 확보해요. 촘촘한 목록의 보조 아이콘, 문장 속 링크처럼 공간이 부족한 곳은 예외지만 주변과 충분히 떨어뜨려요(UX.md 4-3).
- 누를 수 있는 요소·읽어야 하는 정보·고정 바는 안전 영역 안에 둬요. 배경과 구분선은 화면 끝까지 쓸 수 있어요.
- 간격은 `spacing`의 `space.*`만 써요.
- 컴포넌트 높이 ❗: Large 버튼·CTA 56px, 보통 44px(누르는 영역 최소), 입력창 52px. 56px은 비공식 정리 사이트의 값이라 토스 공식 문서로 검증하지 못했어요.

## Elevation & Depth

구분 방법은 세 가지예요: **면 색(`bg.layer-*`), 테두리(`stroke.*`), 그림자**. 그림자는 정말 주목해야 하는 몇 개에만 써요(SEED). 카드 같은 평소 면은 그림자 대신 `stroke.neutral`로 나누고, 한 번에 무겁게 떨어지는 그림자는 피해요(Vercel).

| 층 | 쓰는 곳 | 구분 방법 | 그림자 |
| --- | --- | --- | --- |
| 0 `layer-basement` | 스크롤 콘텐츠 뒤 바탕 | 면 색 | 없음 |
| 1 `layer-default` | 카드·목록·입력창·상단 바 | 면 색 + 테두리 | 없음 |
| 2 `layer-floating` | Bottom sheet, 메뉴 | 면 색 + 그림자 | `shadow.s2` |
| 3 | Modal(확인 요청) | 면 색 + 그림자 + 뒤 배경 `bg.overlay` | `shadow.s3` |
| 일시 알림 | Toast | 면 색(`bg.neutral-solid`) | 없음 |

| 그림자 토큰 ❗ | 값 |
| --- | --- |
| `shadow.s1` | 0 1px 3px rgba(0,0,0,0.08) |
| `shadow.s2` | 0 4px 12px rgba(0,0,0,0.12) |
| `shadow.s3` | 0 8px 24px rgba(0,0,0,0.16) |

## Shapes

- 기본 테마는 큰 라운드예요. `radius.base` 16px에서 나머지 단계를 계산해요.
- 큰 버튼·카드는 `radius.lg`, 44px 버튼·입력은 `radius.md` ❗, 칩·배지는 `radius.sm`, 시트·모달은 `radius.xl`, 동그란 요소는 `radius.full`.
- Skeleton은 글자 줄 `radius.sm`, 카드·썸네일 `radius.lg`, 아바타 `radius.full`(SEED Skeleton 규칙).

## Components

shadcn 구성을 뼈대로 하고, 모양은 당근·토스를 참고해 우리 기준으로 맞춰요. 이름·속성은 코드와 피그마가 같아요(`Button` · `variant=primary`).

### 상태와 피드백

UX.md 5장이 넘긴 "상태 모양"과 4장·10장이 넘긴 "눌림·움직임 값"이에요.

4곳 문서를 나란히 놓은 표예요. "—"는 그 문서에 값이 없다는 뜻이에요. SEED 값은 공식 스펙 파일(rootage JSON)에서 읽었어요: [action-button](https://seed-design.io/rootage/components/action-button.json), [text-input](https://seed-design.io/rootage/components/text-input.json), [checkmark](https://seed-design.io/rootage/components/checkmark.json), [switchmark](https://seed-design.io/rootage/components/switchmark.json). 스펙은 토큰 이름만 주고 색 값은 주지 않아요.

| 상태 | 당근 SEED (스펙) | 토스 TDS (문서) | Vercel | shadcn (코드) | 우리 선택 (기준) |
| --- | --- | --- | --- | --- | --- |
| 기본 | 버튼 `bg.brand-solid` + `fg.on-brand-solid`. 입력 테두리 `stroke.neutral-weak` 1px | 기본 | 기본 | 기본 | **SEED** 토큰 구조 |
| 눌림 | 배경을 `-pressed` 토큰으로 교체 + 고정 2px 줄어듦. 투명 배경은 `bg.transparent-pressed` | 어두운 층을 덮음(줄어듦 없음). 스위치는 터치 효과 | `-deep` 톤 | — (hover만 `/90`) | **SEED** (눌림·움직임 = 당근) |
| 선택 | 체크박스 `bg.brand-solid` + 체크 `fg.on-brand-solid`, 테두리 없음. 스위치 트랙 `bg.brand-solid`, 손잡이 크기 1(꺼짐 0.8) | `checked`와 `aria-checked`만, 모양 값 없음 | 글자 선택만 | `bg-primary border-primary text-primary-foreground` | **SEED** (토큰 = 당근+토스). shadcn은 구조만 |
| 비활성 | 버튼·체크박스: `bg.disabled` + `fg.disabled`. 윤곽 버튼은 배경 투명 + 테두리 `stroke.neutral-muted`. 스위치: 트랙 투명도 **0.38**. 라벨도 비활성색 | 눌러도 안 바뀌고 좌우로 흔들림(체크박스). 값 없음 | — | `opacity-50` + 클릭 막기 | **SEED** (값 있음) |
| 로딩 | 버튼 배경이 `-pressed` 토큰으로 고정 + 진행 표시. disabled는 따로 | 인디케이터 3개, 너비 유지, `aria-busy` | — | — | **SEED + 토스** |
| 포커스 | 입력: 테두리 `stroke.neutral-contrast` **2px**. 버튼·체크박스는 값 없음 | 값 없음(포커스 이벤트만) | — | `ring-[3px] ring-ring/50` (키보드 포커스, 쓰지 않음) | 입력은 **SEED** 2px. 키보드 포커스 링은 SEED CSS 값(`stroke.focus` 2px 선 + 2px 띄움) ❗ |
| 오류 | 입력: `stroke.critical-solid` 2px (포커스 중에도 유지) | `hasError` + 도움말 문구 | `error-deep` | `aria-invalid:border-destructive ring-destructive/20` | **SEED** 2px |

**섞어 쓸 때 맞출 점**: ① 비활성은 SEED 하나(색 교체)로 통일하고 shadcn의 `opacity-50`은 쓰지 않아요. 스위치만 SEED 스펙대로 0.38. ② 눌림·선택·비활성·오류가 전부 SEED 토큰 구조라 서로 어긋나지 않아요. ③ 키보드 포커스 링도 SEED CSS 값이라 섞임이 없어요. 입력창은 포커스 2px 테두리 하나만 쓰고 링은 겹쳐 쓰지 않아요. ④ 이 스펙의 토큰은 모두 YAML에 추가했어요(값은 ❗ 임시). `fg.on-brand`는 SEED 이름에 맞춰 `fg.on-brand-solid`로 바꿨어요.

**눌림 줄어듦** (SEED 방식, 토스 버튼과 같은 결과)

- 비율이 아니라 **고정 거리**로 정해요: 세로로 2px 줄어요. 큰 요소와 작은 요소의 느낌이 같아요.
- 기준 길이 `basis = max(높이, 너비 ÷ 4, 24)`, 배율 `scale = (basis − 2) ÷ basis`. 56px 버튼은 54px가 돼요. (비공식 정리 사이트는 토스 버튼이 0.96으로 줄어든다고 적었지만, 토스 공식 버튼 문서에는 줄어듦 없이 어둡게 덮는 방식으로만 나와요.)
- 시간 `duration.pressed-scale` 150ms, 곡선 `timing-function.pressed-scale`.

**움직임 값** (SEED. 소동작 0.2초 이하, 큰 동작 0.2초 초과)

| 토큰 | 값 | 쓰는 곳 |
| --- | --- | --- |
| `duration.d1` ~ `d6` | 50 / 100 / 150 / 200 / 250 / 300ms | |
| `duration.color-transition` | 150ms (d3) | 눌림 색 변화 |
| `duration.pressed-scale` | 150ms (d3) | 눌림 줄어듦 |
| `timing-function.easing` | cubic-bezier(0.35, 0, 0.35, 1) | 버튼·포커스 같은 소동작 |
| `timing-function.enter` | cubic-bezier(0, 0, 0.15, 1) | 시트·팝업 나타남 |
| `timing-function.exit` | cubic-bezier(0.35, 0, 1, 1) | 시트·팝업 사라짐 |
| `timing-function.pressed-scale` | cubic-bezier(0, 0, 0.15, 1) | 눌림 줄어듦 |

- 움직임은 원인과 결과를 설명할 때만 써요. 시트는 들어온 방향으로 나가요.
- '동작 줄이기'가 켜지면 크기·위치 변화는 끄고 색 변화와 나타나기만 남겨요(UX.md 10장).

### 로딩과 알림 시간

| 항목 | 값 | 근거 |
| --- | --- | --- |
| 짧은 로딩(저장·부분 새로고침) | Spinner, 1~4초 | SEED Progress Circle |
| 긴 로딩(목록·카드) | Skeleton, 1~10초 | SEED Skeleton |
| 진행 정도를 알 수 없는 요청 | 10초 안에 안 끝나면 오류 상태 + 다시 시도 | UX.md 5-3·15장 결정 5 |
| 로딩 표시 지연 | 약 0.2초 (시간을 미리 알 수 없는 요청은 바로 보여 주지 않고 기다렸다가 표시. 항상 1초 안에 끝나는 일은 표시하지 않음). 1~4초: 처리 중 표시 또는 콘텐츠 자리 미리 보기 | UX.md 5-3·14장 (제안 시작값) |
| 4~10초 | 위에 더해 진행 중이라는 안내 문장 | UX.md 5-3 |
| 10초 이상 | 진행 정도나 예상 시간 | UX.md 5-3 |
| 1분 이상 | 진행 정도 + 취소 + 다른 일을 하며 기다릴 방법 | UX.md 5-3 |
| 로딩 최소 유지 시간 | 약 0.4초 (한 번 보이면 번쩍이지 않게 유지) | UX.md 14장 (제안 시작값, 화면에서 확인 후 확정) |
| Toast 노출 시간 | 4초. 긴 문장은 더 길게, 길게 누르면 멈춤 | SEED Snackbar |
| Toast 동시 표시 | 한 번에 1개, 나머지는 줄 세움 | SEED Snackbar |

Spinner와 Skeleton은 같이 쓰지 않아요.

### 피드백 종류별 컴포넌트

UX.md 6-1은 5종 중 **제자리 메시지**(Input·Textarea·Select의 오류·도움말, 별도 부품 없음)와 **지속 안내**(Banner, 15장 결정 4)만 컴포넌트를 정했어요. 나머지 3종은 "DESIGN.md를 따른다"고 넘겼고, ❗가 Claude가 정한 연결이에요.

| 피드백 | 컴포넌트 | 누가 정했나 | UX.md 6장 규칙 (지켜야 함) |
| --- | --- | --- | --- |
| 일시 알림 | Toast | ❗ Claude | 한 번에 하나만. 읽을 시간을 주고 손을 대고 있으면 안 사라짐. 행동 버튼은 최대 1개("되돌리기"처럼 구체적으로). 고정 버튼을 가리지 않음. 결정이 필요한 내용에는 쓰지 않음 |
| 확인 요청 | Modal | ❗ Claude | 되돌릴 수 없는 행동에만. 선택지 2개 이하. 바깥을 눌러도 안 닫히고 버튼으로만 닫힘 |
| 선택 목록 | Bottom sheet (Select를 열 때도) | ❗ Claude | 고르기·닫기·바깥 누르기로 닫힘 |
| 제자리 메시지 | Input·Textarea·Select의 안내·오류 문구 | UX.md | 별도 컴포넌트를 만들지 않음. `fg.critical` 등 사용 |
| 지속 안내 | Banner | UX.md (15장 결정 4) | 상태가 바뀌면 닫힘. `banner-informative`·`banner-critical` |

### MVP 컴포넌트 19개

| 컴포넌트 | 토큰 연결 | 비고 |
| --- | --- | --- |
| Button | YAML 있음 (`button-*`) | variant: primary / secondary / critical, 크기 Large·Medium |
| Input | YAML 있음 | 포커스·오류·비활성 상태 TODO |
| Card | YAML 있음 | |
| Badge | YAML 있음 (`badge-brand`) | 상태색 변형 TODO |
| Toast | YAML 있음 | |
| Banner | YAML 있음 | |
| Bottom sheet | YAML 있음 | shadcn에 없음. 당근·토스 참고 |
| Modal | YAML 있음 | |
| Select, Textarea, Checkbox, Radio, Switch | TODO | 선택 상태는 `bg.brand-weak`/`bg.brand-solid` |
| Avatar, Tabs, List item | TODO | List item 눌림은 `bg.neutral-weak-pressed` |
| Top bar | TODO | shadcn에 없음. 당근·토스 참고 |
| Spinner, Skeleton | TODO | 시간 값은 위 표 |

- 위 목록에 없는 UI는 만들지 않고 사람에게 물어요.

## Do's and Don'ts

`/ui-review`가 이 목록을 그대로 점검표로 씁니다. "(웹 프로토타입에서 확인 불가)" 표시가 있는 항목은 건너뜁니다.

### 토큰

- [ ] 화면과 컴포넌트에는 쓰임새 이름 토큰(`bg.*`·`fg.*`·`stroke.*`)만 쓴다.
- [ ] 간격은 `space.*`, 모서리는 `radius.*`만 쓴다.
- [ ] `palette.*`를 화면이나 컴포넌트에서 직접 쓰지 않는다.
- [ ] 토큰에 없는 색·간격·모서리·그림자 값을 새로 만들지 않는다.
- [ ] 다크모드 값을 지금 추가하지 않는다.

### 색·글자

- [ ] 브랜드 색 글자가 필요하면 `fg.brand`를 쓴다.
- [ ] 주황(`bg.brand-solid`) 위 흰 글자는 16px 이상 굵게로만 쓴다(APCA Lc 60 이상). 16px 미만은 굵게, 본문 글자는 쓰지 않는다.
- [ ] 아이콘은 Lucide만 쓴다.

### 컴포넌트·상태

- [ ] 누르는 영역은 `space.touch-min`(44px) 이상으로 잡는다.
- [ ] 눌림은 `-pressed` 토큰과 150ms 줄어듦으로 표현한다.
- [ ] 비활성 요소에 눌림·선택 모양을 겹쳐 쓰지 않는다.
- [ ] 로딩 중인 버튼은 너비를 유지하고 연속 누름을 막는다.
- [ ] 토스·당근의 디자인 자산을 그대로 복사하지 않고 규칙만 참고한다. (웹 프로토타입에서 확인 불가)

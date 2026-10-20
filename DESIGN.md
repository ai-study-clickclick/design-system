---
version: alpha
name: clickclick-design-system
description: "[초안 v0.2] 딸깍딸깍 디자인 시스템의 디자인 값 원본. YAML 토큰이 원본이고 본문은 근거와 쓰는 법이다. 앱 화면(모바일), 라이트 모드, 기본 테마는 주황 + 큰 라운드. 값은 SEED 기준."

# ─────────────────────────────────────────────────────────────
# 작성 규칙 (docs/CONVENTIONS.md)
# - 토큰·키는 영어, 설명은 한글. 이름은 소문자 + 대시, 점(.)은 그룹 구분.
# - 1단 palette.* → 2단 쓰임새(bg.*, fg.*, stroke.*). 화면·컴포넌트에는 쓰임새 이름만 쓴다.
# - 점이 들어간 키는 따옴표로 감싼다. (Stitch 린트 v0.4.0으로 확인: 에러 없이 통과, 참조도 정상 해석)
# - ❗ = Claude가 정한 값 (근거 문서에 값이 없거나 내가 고른 것). 팀이 다시 보고 확정해야 함. 전체 목록: Overview > ❗ Claude가 정한 값
# - ⚠ = 근거 문서에도 값이 없어서 비워 둔 칸 (팀 결정 대기)
# ─────────────────────────────────────────────────────────────
colors:
  # ── 1단: 기본 색표 (값은 전부 SEED 팔레트, 라이트 모드) ──
  # 출처: https://seed-design.io/llms/foundations/color/palette.txt
  # 이름 `orange` = SEED `carrot`의 값. 브랜드 확정값이 나오면 이 단계 값만 바꾼다. SEED 팔레트에는 50 단계가 없다.
  # gray
  "palette.gray-00": "#ffffff"
  "palette.gray-100": "#f7f8f9"
  "palette.gray-200": "#f3f4f5"
  "palette.gray-300": "#eeeff1"
  "palette.gray-400": "#dcdee3"
  "palette.gray-500": "#d1d3d8"
  "palette.gray-600": "#b0b3ba"
  "palette.gray-700": "#868b94"
  "palette.gray-800": "#555d6d"
  "palette.gray-900": "#2a3038"
  "palette.gray-1000": "#1a1c20"
  # orange (SEED carrot)
  "palette.orange-100": "#fff2ec"
  "palette.orange-200": "#ffe8db"
  "palette.orange-300": "#ffd5c0"
  "palette.orange-400": "#ffb999"
  "palette.orange-500": "#ff9364"
  "palette.orange-600": "#ff6600"
  "palette.orange-700": "#e14d00"
  "palette.orange-800": "#b93901"
  "palette.orange-900": "#862b00"
  "palette.orange-1000": "#471601"
  # 브랜드 색 단계: 테마 프리셋의 brand.primary에서 /sync가 자동 생성(OKLCH). 기본 테마에서는 주황 단계를 그대로 가리킨다.
  "palette.brand-100": "{colors.palette.orange-100}"
  "palette.brand-200": "{colors.palette.orange-200}"
  "palette.brand-300": "{colors.palette.orange-300}"
  "palette.brand-400": "{colors.palette.orange-400}"
  "palette.brand-500": "{colors.palette.orange-500}"
  "palette.brand-600": "{colors.palette.orange-600}"
  "palette.brand-700": "{colors.palette.orange-700}"
  "palette.brand-800": "{colors.palette.orange-800}"
  "palette.brand-900": "{colors.palette.orange-900}"
  # blue
  "palette.blue-100": "#eff6ff"
  "palette.blue-200": "#e2edfc"
  "palette.blue-300": "#cbdffa"
  "palette.blue-400": "#aacefd"
  "palette.blue-500": "#85b8fd"
  "palette.blue-600": "#5e98fe"
  "palette.blue-700": "#217cf9"
  "palette.blue-800": "#135fcd"
  "palette.blue-900": "#0b4596"
  "palette.blue-1000": "#032451"
  # red
  "palette.red-100": "#fdf0f0"
  "palette.red-200": "#fde7e7"
  "palette.red-300": "#fed4d2"
  "palette.red-400": "#feb7b3"
  "palette.red-500": "#fe928d"
  "palette.red-600": "#fc6a66"
  "palette.red-700": "#fa342c"
  "palette.red-800": "#ca1d13"
  "palette.red-900": "#921708"
  "palette.red-1000": "#4a1209"
  # green
  "palette.green-100": "#edfaf6"
  "palette.green-200": "#d9f6e9"
  "palette.green-300": "#b9e9d2"
  "palette.green-400": "#7ddcb3"
  "palette.green-500": "#42c593"
  "palette.green-600": "#10ab7d"
  "palette.green-700": "#079171"
  "palette.green-800": "#00745f"
  "palette.green-900": "#075445"
  "palette.green-1000": "#0a2b24"
  # yellow
  "palette.yellow-100": "#fff7de"
  "palette.yellow-200": "#fdefb9"
  "palette.yellow-300": "#fbdc65"
  "palette.yellow-400": "#e9c647"
  "palette.yellow-500": "#d4ab28"
  "palette.yellow-600": "#c49725"
  "palette.yellow-700": "#9b7821"
  "palette.yellow-800": "#755b22"
  "palette.yellow-900": "#4f3e1f"
  "palette.yellow-1000": "#2c2512"
  # 고정색 (라이트·다크 같음). SEED static-black-alpha
  "palette.static-black-alpha-100": "#00000007"
  "palette.static-black-alpha-200": "#0000000c"
  "palette.static-black-alpha-300": "#00000010"
  "palette.static-black-alpha-500": "#0000002c"
  "palette.static-black-alpha-700": "#00000074"
  "palette.static-black-alpha-900": "#000000d0"
  "palette.static-white": "#ffffff"

  # ── 대표 컬러 ──
  "brand.primary": "{colors.palette.orange-600}"
  primary: "{colors.brand.primary}"   # Stitch 린트가 요구하는 이름. brand.primary와 같은 값

  # ── 2단: 쓰임새 이름. 이름과 가리키는 단계 모두 SEED 색 역할 표 그대로 ──
  # 출처: https://seed-design.io/llms/foundations/color/color-role.txt
  # 배경 bg.*
  "bg.brand-solid": "{colors.palette.brand-600}"
  "bg.brand-solid-pressed": "{colors.palette.brand-700}"
  "bg.brand-weak": "{colors.palette.brand-100}"
  "bg.brand-weak-pressed": "{colors.palette.brand-200}"
  "bg.critical-solid": "{colors.palette.red-700}"
  "bg.critical-solid-pressed": "{colors.palette.red-800}"
  "bg.critical-weak": "{colors.palette.red-100}"
  "bg.critical-weak-pressed": "{colors.palette.red-200}"
  "bg.disabled": "{colors.palette.gray-200}"
  "bg.informative-solid": "{colors.palette.blue-700}"
  "bg.informative-solid-pressed": "{colors.palette.blue-800}"
  "bg.informative-weak": "{colors.palette.blue-100}"
  "bg.informative-weak-pressed": "{colors.palette.blue-200}"
  "bg.layer-basement": "{colors.palette.gray-200}"
  "bg.layer-default": "{colors.palette.gray-00}"
  "bg.layer-default-pressed": "{colors.palette.gray-100}"
  "bg.layer-floating": "{colors.palette.gray-00}"
  "bg.layer-floating-pressed": "{colors.palette.gray-100}"
  "bg.neutral-inverted": "{colors.palette.gray-900}"
  "bg.neutral-inverted-pressed": "{colors.palette.gray-800}"
  "bg.neutral-muted": "{colors.palette.gray-100}"
  "bg.neutral-solid": "{colors.palette.gray-900}"
  "bg.neutral-solid-pressed": "{colors.palette.gray-800}"
  "bg.neutral-subtle": "{colors.palette.gray-00}"
  "bg.neutral-weak": "{colors.palette.gray-200}"
  "bg.neutral-weak-alpha": "{colors.palette.static-black-alpha-200}"
  "bg.neutral-weak-alpha-pressed": "{colors.palette.static-black-alpha-300}"
  "bg.neutral-weak-pressed": "{colors.palette.gray-300}"
  "bg.overlay": "{colors.palette.static-black-alpha-700}"
  "bg.overlay-muted": "{colors.palette.static-black-alpha-500}"
  "bg.positive-solid": "{colors.palette.green-700}"
  "bg.positive-solid-pressed": "{colors.palette.green-800}"
  "bg.positive-weak": "{colors.palette.green-100}"
  "bg.positive-weak-pressed": "{colors.palette.green-200}"
  "bg.transparent-pressed": "{colors.palette.static-black-alpha-100}"
  "bg.transparent-selected": "{colors.palette.static-black-alpha-200}"
  "bg.transparent-selected-pressed": "{colors.palette.static-black-alpha-300}"
  "bg.warning-solid": "{colors.palette.yellow-300}"
  "bg.warning-solid-pressed": "{colors.palette.yellow-400}"
  "bg.warning-weak": "{colors.palette.yellow-100}"
  "bg.warning-weak-pressed": "{colors.palette.yellow-200}"
  "bg.transparent": "#00000000"   # SEED는 팔레트 단계 없이 이 값을 씀
  # 글자·아이콘 fg.*
  "fg.brand": "{colors.palette.brand-600}"
  "fg.brand-contrast": "{colors.palette.brand-700}"
  "fg.critical": "{colors.palette.red-700}"
  "fg.critical-contrast": "{colors.palette.red-900}"
  "fg.disabled": "{colors.palette.gray-500}"
  "fg.informative": "{colors.palette.blue-700}"
  "fg.informative-contrast": "{colors.palette.blue-900}"
  "fg.neutral": "{colors.palette.gray-1000}"
  "fg.neutral-inverted": "{colors.palette.gray-00}"
  "fg.neutral-muted": "{colors.palette.gray-800}"
  "fg.neutral-subtle": "{colors.palette.gray-700}"
  "fg.on-brand-solid": "{colors.palette.static-white}"
  "fg.on-critical-solid": "{colors.palette.static-white}"
  "fg.on-informative-solid": "{colors.palette.static-white}"
  "fg.on-neutral-solid": "{colors.palette.gray-00}"
  "fg.on-positive-solid": "{colors.palette.static-white}"
  "fg.on-warning-solid": "{colors.palette.static-black-alpha-900}"
  "fg.placeholder": "{colors.palette.gray-600}"
  "fg.positive": "{colors.palette.green-700}"
  "fg.positive-contrast": "{colors.palette.green-900}"
  "fg.warning": "{colors.palette.yellow-700}"
  "fg.warning-contrast": "{colors.palette.yellow-900}"
  # 테두리 stroke.*
  "stroke.brand-solid": "{colors.palette.brand-700}"
  "stroke.brand-weak": "{colors.palette.brand-300}"
  "stroke.critical-solid": "{colors.palette.red-700}"
  "stroke.critical-weak": "{colors.palette.red-300}"
  "stroke.focus-ring": "{colors.palette.blue-600}"
  "stroke.informative-solid": "{colors.palette.blue-700}"
  "stroke.informative-weak": "{colors.palette.blue-300}"
  "stroke.neutral-contrast": "{colors.palette.gray-1000}"
  "stroke.neutral-muted": "{colors.palette.static-black-alpha-300}"
  "stroke.neutral-solid": "{colors.palette.gray-800}"
  "stroke.neutral-subtle": "{colors.palette.static-black-alpha-200}"
  "stroke.neutral-weak": "{colors.palette.gray-400}"
  "stroke.positive-solid": "{colors.palette.green-700}"
  "stroke.positive-weak": "{colors.palette.green-300}"
  "stroke.warning-solid": "{colors.palette.yellow-700}"
  "stroke.warning-weak": "{colors.palette.yellow-300}"

# 테마 프리셋. brand.primary와 radius.base만 정함 (Stitch 린트는 모르는 그룹이라 경고만 나옴)
theme:
  default:
    brand.primary: "{colors.palette.orange-600}"
    radius.base: 16px

typography:
  # 기본 글꼴 Pretendard. 크기·줄 높이는 당근 SEED 스케일(t9·t7·t6·t5·t4·t2) 값을 참고.
  # 크기·줄 높이 값은 SEED 문서 값. 어떤 단계를 어디에 쓸지는 ❗ Claude가 고름.
  # 라벨 굵기는 SEED 스펙에 맞춤: 버튼 라벨 bold 700, 배지(weak) 라벨 medium 500. Large 버튼 라벨은 SEED t6(18px).
  title-lg: { fontFamily: Pretendard, fontSize: 24px, fontWeight: 700, lineHeight: 32px }
  title-md: { fontFamily: Pretendard, fontSize: 20px, fontWeight: 700, lineHeight: 27px }
  title-sm: { fontFamily: Pretendard, fontSize: 18px, fontWeight: 700, lineHeight: 24px }
  body-lg: { fontFamily: Pretendard, fontSize: 16px, fontWeight: 400, lineHeight: 22px }
  body-md: { fontFamily: Pretendard, fontSize: 14px, fontWeight: 400, lineHeight: 19px }
  caption: { fontFamily: Pretendard, fontSize: 12px, fontWeight: 700, lineHeight: 16px }
  label-lg: { fontFamily: Pretendard, fontSize: 18px, fontWeight: 700, lineHeight: 24px }
  label-md: { fontFamily: Pretendard, fontSize: 14px, fontWeight: 700, lineHeight: 19px }
  label-sm: { fontFamily: Pretendard, fontSize: 12px, fontWeight: 500, lineHeight: 16px }

rounded:
  # 기본 테마는 큰 라운드(AGENTS.md 확정 기준). 값 8·12·16·24px는 모두 SEED 라운드 단계(https://seed-design.io/llms/foundations/radius.txt)예요.
  # 테마는 radius.base 하나만 정하고 나머지는 /sync가 비율로 계산한다. 비율 = 0.5 / 0.75 / 1 / 1.5 (기본값 16px일 때 8/12/16/24)
  "radius.base": 16px
  "radius.sm": 8px      # 배지, Skeleton 글자 줄 (SEED r2)
  "radius.md": 12px     # 보통 버튼, 입력창, Toast, Banner (SEED r3)
  "radius.lg": 16px     # 큰 버튼, 카드 (SEED r4)
  "radius.xl": 24px     # Bottom sheet, Modal (SEED r6)
  "radius.full": 9999px

spacing:
  # SEED 간격 스케일($dimension) 전체. 이름이 px 값이에요. 출처: https://seed-design.io/llms/foundations/spacing.txt
  "space.2": 2px
  "space.4": 4px
  "space.6": 6px
  "space.8": 8px
  "space.10": 10px
  "space.12": 12px
  "space.14": 14px
  "space.16": 16px
  "space.18": 18px
  "space.20": 20px
  "space.24": 24px
  "space.28": 28px
  "space.32": 32px
  "space.36": 36px
  "space.40": 40px
  "space.48": 48px
  "space.52": 52px
  "space.56": 56px
  "space.64": 64px
  # SEED 의미 간격 (global-gutter 16px은 아래 space.screen-margin이 같은 값)
  "space.between-chips": 8px
  "space.component-default": 12px
  "space.nav-to-title": 20px
  "space.screen-bottom": 56px
  "space.between-text": 6px
  # 화면 단위 값 (UX.md 9장이 DESIGN.md에 넘긴 값)
  "space.screen-width": 375px   # ❗ 기준 화면 폭 (SEED·토스 문서에 숫자 없음)
  "space.screen-max": 480px     # ❗ 넓은 화면에서 콘텐츠 최대 폭 (SEED sm 구간 상한 479px 참고)
  "space.screen-margin": 16px   # 화면 좌우 여백 (SEED 간격 문서의 global-gutter 16px)
  "space.gutter": 16px          # SEED 모바일 gutter 16px
  "space.touch-min": 44px       # 누르는 영역 최소 크기 (UX.md 4-3)

components:
  # 이름·속성은 코드와 피그마가 같게 (예: Button · variant=primary).
  # 상태(pressed·disabled·loading·selected)는 별도 키로 둔다.
  # 값은 SEED 컴포넌트 스펙 파일(https://seed-design.io/rootage/components/<이름>.json)에서 가져왔어요.
  # SEED에 스펙이 없어 ❗ Claude가 정한 곳: card(라운드·여백), 보통 버튼 높이 44px(UX.md 최소 누르는 영역, SEED는 40px). top-bar 높이는 SEED iOS 값(44), avatar 48·spinner 40은 SEED 크기 목록에서 고른 값.
  # MVP 19개 중 아래에 없는 것은 "Components" 섹션 표의 TODO 참고.
  button-primary:
    backgroundColor: "{colors.bg.brand-solid}"
    textColor: "{colors.fg.on-brand-solid}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.lg}"
    height: 52px
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
    height: 52px
    padding: "{spacing.space.20}"
  button-secondary-pressed:
    backgroundColor: "{colors.bg.neutral-weak-pressed}"
    textColor: "{colors.fg.neutral}"
  button-critical:
    backgroundColor: "{colors.bg.critical-solid}"
    textColor: "{colors.fg.on-critical-solid}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.lg}"
    height: 52px
    padding: "{spacing.space.20}"
  button-critical-pressed:
    backgroundColor: "{colors.bg.critical-solid-pressed}"
    textColor: "{colors.fg.on-critical-solid}"
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
    textColor: "{colors.fg.brand-contrast}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.radius.sm}"
    padding: "{spacing.space.8}"
  toast:
    backgroundColor: "{colors.bg.neutral-solid}"
    textColor: "{colors.fg.on-neutral-solid}"
    typography: "{typography.body-md}"
    rounded: "{rounded.radius.md}"
    height: 44px
    padding: "{spacing.space.10}"
  banner-informative:
    backgroundColor: "{colors.bg.informative-weak}"
    textColor: "{colors.fg.informative-contrast}"
    typography: "{typography.body-md}"
    rounded: "{rounded.radius.md}"
    padding: "{spacing.space.14}"
  banner-critical:
    backgroundColor: "{colors.bg.critical-weak}"
    textColor: "{colors.fg.critical-contrast}"
    typography: "{typography.body-md}"
    rounded: "{rounded.radius.md}"
    padding: "{spacing.space.14}"
  bottom-sheet:
    backgroundColor: "{colors.bg.layer-floating}"
    textColor: "{colors.fg.neutral}"
    rounded: "{rounded.radius.xl}"
    padding: "{spacing.space.16}"
  modal:
    backgroundColor: "{colors.bg.layer-floating}"
    textColor: "{colors.fg.neutral}"
    rounded: "{rounded.radius.xl}"
    width: 272px
    padding: "{spacing.space.20}"
  list-item:
    backgroundColor: "{colors.bg.transparent}"
    textColor: "{colors.fg.neutral}"
    typography: "{typography.body-lg}"
    padding: "{spacing.space.12}"
  list-item-pressed:
    backgroundColor: "{colors.bg.transparent-pressed}"
    textColor: "{colors.fg.neutral}"
  top-bar:
    backgroundColor: "{colors.bg.layer-default}"
    textColor: "{colors.fg.neutral}"
    typography: "{typography.title-sm}"
    height: 44px
    padding: "{spacing.space.16}"
  avatar:
    rounded: "{rounded.radius.full}"
    size: 48px
  spinner:
    rounded: "{rounded.radius.full}"
    size: 40px
  skeleton:
    backgroundColor: "{colors.bg.neutral-weak}"
    rounded: "{rounded.radius.sm}"
---

## Overview

딸깍딸깍 디자인 시스템에서 **보이는 값**(색·글자·간격·모서리·그림자·움직임·컴포넌트 모양)을 정하는 원본 파일이에요. 앱 화면(모바일)과 라이트 모드가 기준이고, 다크모드는 나중에 추가해요. 이 파일이 바뀌면 코드 테마와 피그마 Variables가 `/sync`로 따라와요.

**초안 v0.2** — v0.1(PR #9)이 머지된 뒤 SEED 문서를 다시 확인해, 색 값 전체(색표·역할 표)와 그림자·버튼 높이·화면 여백·라벨 굵기·글자 대비 토큰(`-contrast`)·라운드·간격·컴포넌트 값을 SEED 값으로 맞췄어요. ❗(Claude가 정한 값)과 ⚠(비워 둔 값)은 검토하면서 확정해요. 다크모드·PC↔MO는 Backlog라 뺐어요.

한 라이브러리를 그대로 쓰지 않고, 필요한 것만 가져와 우리 것으로 만들었어요.

| 영역 | 기준 | 이 파일에서 반영한 곳 |
| --- | --- | --- |
| 부품 뼈대(구성·구조) | shadcn/ui. 없는 앱 부품(Top bar, Bottom sheet, 하단 고정 버튼)은 당근·토스 참고 | Components |
| 색·글자 토큰 | 당근 SEED + 토스 TDS (이번 초안은 SEED의 3단 구조·역할 이름·글자 스케일 위주. 토스 공식 색·글자 값은 아직 반영 안 함) | Colors, Typography |
| 색 단계 용도·모서리 | Vercel 일부 | Colors, Shapes |
| 간격·그림자 값 | 당근 SEED | `spacing`, Elevation |
| 움직임·눌림 | 당근 SEED (토스 공식 버튼 문서는 눌림을 어둡게 덮는 방식이라 SEED의 "줄어듦"과 다름) | Components > 상태와 피드백 |
| 문구·말투 | 토스 (규칙만 참고) | 여기서 다루지 않음 → `docs/WRITING.md` |
| 사용성·접근성·상태 규칙 | 팀 결정 | 여기서 다루지 않음 → `docs/UX.md` (값만 이 파일이 정함) |

- 기본 글꼴은 Pretendard, 아이콘은 Lucide예요.
- 이 파일에 없는 토큰·스타일·컴포넌트는 Claude가 만들지 않고 사람에게 먼저 물어요.
- 기본 테마는 아래 `theme.default`예요(`brand.primary` = 주황 600, `radius.base` 16px, 큰 라운드).
- 테마 프리셋(`theme.이름`)은 `brand.primary`와 `radius.base` 두 값만 정해요. 나머지는 자동 계산하고, 기본 토큰은 바뀌지 않아요.

### 출처 (SEED)

값은 아래 SEED 문서에서 가져왔어요. 문서에 없거나 우리가 정한 것은 ❗ 표와 YAML 주석에 따로 적었어요.

| 값 | 출처 |
| --- | --- |
| 색 역할 이름·단계(`fg.*-contrast`, `stroke.focus-ring`, `bg.overlay` 등) | https://seed-design.io/llms/foundations/color/color-role.txt |
| 라운드·간격·그림자·레이아웃 | https://seed-design.io/llms/foundations/radius.txt · spacing.txt · elevation.txt · layout.txt |
| 글자·움직임·눌림 | https://seed-design.io/llms/foundations/typography.txt · motion.txt · feedback.txt · state.txt |
| 색 대비 기준(APCA) | https://seed-design.io/llms/foundations/inclusive-design.txt |
| 컴포넌트 값 | https://seed-design.io/rootage/components/<이름>.json (action-button, text-input, snackbar, callout, alert-dialog, bottom-sheet, badge, list-item, top-navigation, avatar, progress-circle, skeleton, checkbox, radio, switch, select-box) |

우리가 직접 정한 것: 색 이름 `orange`(값은 SEED carrot), 팔레트에서 50 단계를 뺀 것, APCA 점수(apca-w3 0.1.9로 직접 계산), 라운드 이름(`sm`~`xl`)과 컴포넌트별 단계(❗ 4번), ❗ 12번의 컴포넌트 값, Do's 문장.

### ❗ Claude가 정한 값 (팀이 다시 봐야 해요)

근거 문서(UX.md·SEED·토스·Vercel)에 값이 없거나, 여러 선택지 중 Claude가 고른 값이에요. 본문과 YAML 주석에도 ❗로 표시했어요.

| # | 항목 | 정한 값 | 왜 이 값인지 | 위치 |
| --- | --- | --- | --- | --- |
| 1 | 기준 화면 폭·최대 폭 | 375 / 480px | 375는 SEED·토스 문서에 숫자가 없어 일반적인 모바일 값으로 정했어요. 480은 SEED 레이아웃의 sm 구간 시작(480px)이에요. 화면 여백 16px는 SEED 간격 문서의 `global-gutter` 값이에요(레이아웃 문서 표에는 12px로 나와 문서끼리 달라요) | `spacing`, Layout |
| 2 | 브랜드 주황의 값과 이름 | SEED carrot 값(orange-600 = #ff6600). 이름은 `orange` | #ff6600은 당근의 브랜드색이에요. 우리 브랜드 주황을 따로 정할지는 팀 결정이에요(정해지면 `orange-*` 값만 바꿔요). 이름 `orange`는 우리가 붙였어요(SEED 이름은 `carrot`). 회색·빨강·초록·파랑·노랑도 SEED 값이에요. SEED 값 그대로라서 APCA 기준에 못 미치는 곳이 있어요: `fg.brand` Lc 54.8, `fg.disabled` Lc 23.4(아래 "색 대비 기준값"). 브랜드 글자는 `fg.brand-contrast`를 쓰는 것으로 **확정**(짧은 강조에만, 본문 문장은 `fg.neutral`). 비활성 글자는 SEED 값을 그대로 두고 팀에 물어요 | `colors` |
| 3 | 쓰임새 토큰 목록 | SEED 색 역할 표 전체(`bg` 41개 · `fg` 22개 · `stroke` 16개) | 이름과 가리키는 단계 모두 SEED 그대로예요. 안 쓰는 토큰은 린트 경고로 보여요. 쓰는 것만 추릴지는 컴포넌트가 정해진 뒤 봐요 | `colors` |
| 4 | 큰 라운드 기본 테마와 컴포넌트별 라운드 단계 | 기준 16px. sm 8 / md 12 / lg 16 / xl 24px, 컴포넌트마다 SEED 값보다 한 단계 큰 값 | **확정.** 팀이 정한 기본 테마(AGENTS.md "주황 + 큰 라운드")와 PR #9 리뷰에서 승인받은 모양이에요. 단계 값 8·12·16·24px는 모두 SEED 라운드 단계 안이에요. SEED 컴포넌트 값(큰 버튼 12 · 보통 버튼 8 · Toast 8 · Banner 10 · Modal 20 · 배지 6 · Sheet 24)과 다른 점은 아래 "SEED 컴포넌트 스펙과 비교" 표에 적었어요. 이름(`sm`~`xl`)과 컴포넌트마다 어느 단계를 쓸지는 우리가 정했어요 | `rounded` |
| 5 | 컴포넌트 높이 | 52 / 44 / 52px | Large 버튼·CTA 52px는 SEED 값이에요. SEED Medium 버튼은 40px인데 UX.md 최소 누르는 영역(44px)에 맞춰 44px로 키웠어요. 입력창 52px도 SEED 텍스트 필드 Large 값이에요 | `components` |
| 6 | 간격 스케일 | SEED 간격 스케일 전체(2~64px)와 의미 간격 | 값·이름 모두 SEED예요. 어떤 단계를 어디에 쓸지는 컴포넌트에서 정해요 | `spacing` |
| 7 | 글자 단계 선택 | SEED 값 6단계 선택 | 라벨 굵기는 SEED 스펙(700·500)에 맞췄어요. 어떤 단계를 어디에 쓸지만 Claude가 골랐어요 | `typography` |
| 8 | 키보드 포커스 링 | 2px 선 + 2px 띄움, 색 `stroke.focus-ring`(blue-600, 흰 배경 Lc 54.2). SEED CSS(@seed-design/css 3.0.3) 값 | **확정**(SEED 배포 CSS 값 그대로). SEED 규칙 문서엔 없고 배포 CSS에만 있어요. 주황 브랜드와 같이 놓았을 때 어울리지 않으면 화면을 보고 다시 열어요 | Components |
| 9 | 일시 알림·확인 요청·선택 목록의 컴포넌트 | Toast / Modal / Bottom sheet | UX.md 6-1이 "DESIGN.md를 따른다"고 넘김. 이름은 Toast로 확정(SEED는 Snackbar라고 불러요, 규칙은 같아요: https://seed-design.io/llms/components/snackbar.txt) | Components |
| 10 | 컴포넌트 변형과 연결 토큰 (`button-critical`, `badge-brand` 등) | YAML `components` | 컴포넌트 스펙이 아직 없음 | `components` |
| 11 | 브랜드 색 단계 수 | `palette.brand-100`~`900` (50 없음) | SEED 팔레트에 50 단계가 없어 100~900만 뒀어요. CONVENTIONS.md는 "brand-50 ~ brand-900"으로 적혀 있어서 단계 수를 맞춰야 해요. 팀 결정 필요 | `colors` |
| 12 | SEED에 값이 없거나 우리가 골라야 했던 컴포넌트 값 | Card(라운드 16·여백 16), 보통 버튼 높이 44px, Top bar 높이 44px | Card는 SEED 컴포넌트에 없고 기초 상자 Box(https://seed-design.io/react/components/layout/box)로 조합해요. 라운드·여백은 SEED 토큰 중에서 우리가 골랐어요. 보통 버튼은 UX.md 최소 누르는 영역(44px)이 SEED Medium(40px)보다 커서 키웠어요. Top bar는 SEED가 iOS 44 / Android 56이라 iOS 값을 골랐어요. Avatar 48(SEED 크기 목록의 "작은 리스트" 크기)과 Spinner 40(SEED Progress Circle의 "전체 페이지 로딩" 크기)은 SEED 값이에요 | `components` |
| 13 | `caption` 굵기 | 12px · 굵기 700(bold) | SEED는 "다른 텍스트는 Lc 60 이상, 16px 미만이면 bold"라고 해요. 캡션 예외는 SEED에 없어서 그대로 따랐어요. UX.md 11-1 표가 캡션·날짜를 "다른 텍스트"로 분류했어요(지수 님 PR #10 의견). **확정**(SEED 규칙 그대로). 화면에서 너무 무거우면 다시 열어요 | `typography` |
| 14 | 로딩 최소 표시 시간 | 0.4초 | UX.md 제안값이에요. SEED 로딩 문서(Skeleton·Progress Circle)에도 최소 표시 시간은 없어요. 화면에서 확인한 뒤 확정해요 | `motion` |
| 15 | 주된 CTA 버튼 색 | `button-primary`가 주황(`bg.brand-solid`) | SEED는 대부분 화면의 주된 CTA를 neutral-solid(검정 계열)로 하고 brand-solid는 핵심 기능 순간에만 쓰라고 해요(화면당 1개). 우리 기본 테마는 주황이라 어디에 주황을 쓸지 팀 결정 필요: https://seed-design.io/llms/components/action-button.txt | `components` |
| 16 | Banner의 종류 | SEED Callout 값(본문 중간, 로컬)으로 만든 `banner-*` | SEED에는 Callout(본문 중간, 콘텐츠 너비)과 Page Banner(화면 맨 위, 전체 너비, 한 화면에 하나)가 따로 있어요. UX.md는 "지속 안내"라고만 해서 어느 쪽인지 팀 결정 필요: https://seed-design.io/llms/components/callout.txt · https://seed-design.io/llms/components/page-banner.txt | `components` |
| 17 | 입력용 Select의 열리는 방식 | 정하지 않음 | SEED Select는 입력창 아래로 펼쳐지는 드롭다운(최대 높이 480px)이고, 선택지 6개 이상이면 입력 버튼 + Bottom sheet를 쓰라고 해요. 모바일에서 어느 쪽으로 할지 팀 결정 필요: https://seed-design.io/llms/components/select.txt · https://seed-design.io/llms/components/radio.txt | `components` |

### ⚠ 근거 문서에도 값이 없어 비워 둔 것

- 나머지 컴포넌트(Select, Textarea, Checkbox, Radio, Switch, Avatar, Tabs, List item, Top bar, Spinner, Skeleton)의 토큰 연결.
- 다크모드(Notion 6-3)와 PC↔MO 변환(6-4)은 Backlog라 이번 초안에서 뺐어요. 나중에 추가해요.
- 비활성 버튼과 보조(secondary) 버튼 배경이 같은 연회색(gray-200)이라 글자색으로만 구분돼요. SEED도 두 배경이 같은 색(gray-200)이고 글자색(`fg.neutral` / `fg.disabled`)으로 구분해요. 컴포넌트를 만들 때 같이 놓고 확인해요.
- Stitch에는 테두리 속성이 없어 입력창 테두리 색을 YAML `input`에 연결하지 못했어요. 입력 테두리는 위 "상태와 피드백" 표를 따라요(기본 `stroke.neutral-weak` 1px).

### Stitch 형식의 한계

- Stitch 스펙에는 `motion`·`shadow` 토큰 그룹이 없어서 YAML에 넣으면 린트가 "무시됨" 경고를 내요. 값 자체는 SEED(모션·그림자)에서 왔지만 이 파일 형식(Stitch)이 그 칸을 안 줘서, 지금은 본문 표가 원본이에요. `/sync`가 이 표를 읽을지, 별도 칸을 둘지는 팀 결정이에요.

## Colors

토큰은 3층으로 읽어요. **기본 색표(`palette.*`) → 쓰임새 이름(`bg.*`·`fg.*`·`stroke.*`) → 컴포넌트**. 화면과 컴포넌트에는 쓰임새 이름만 써요.

- 역할 6개: Brand, Neutral, Positive, Warning, Critical, Informative (SEED 역할 구조).
- 단계 용도 (Vercel): 밝은 단계는 배경, 중간 단계는 테두리, 진한 단계는 글자.
- 변형: `-solid`(채움), `-weak`(연한 배경), `-pressed`(눌림). 눌림은 표면 색만 바꾸고 글자·아이콘 색은 그대로예요.
- 브랜드 색 단계(`palette.brand-100~900`)는 `brand.primary`에서 자동 생성돼요. 대표 컬러만 바꿔도 `bg.brand-solid` 등이 함께 바뀌어요.
- 눌림 색 연결은 SEED와 같아요(brand-solid 600 → pressed 700).

**색 대비 기준값** (팀 결정: SEED와 같은 APCA 기준)

| 대상 | 기준 (APCA, 흰 배경 위 Lc 값은 절댓값) |
| --- | --- |
| 가독성 텍스트(본문) | Lc 75 이상, Lc 90 이상 권장 |
| 다른 텍스트 | Lc 60 이상. 글자 크기가 16px 미만이면 굵게(bold) |
| placeholder·disabled 글자 | Lc 30 이상 |
| 색만으로 의미 전달 금지 | 글자나 아이콘을 함께 (SEED 포용적 디자인, UX.md) |

출처: SEED 포용적 디자인 문서(https://seed-design.io/llms/foundations/inclusive-design.txt). 점수는 APCA 공식 패키지 apca-w3 0.1.9로 계산했어요. APCA는 W3C 공식 권고가 아니고 2026년 4월 WCAG 3 초안에도 없어서 법·인증 근거로는 쓰지 않아요(https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html).

- 값은 전부 SEED 색표라서, SEED 자신의 기준에 못 미치는 곳도 SEED와 똑같이 남아 있어요. 아래 점수가 그래요.
- 주황 600(`bg.brand-solid`) 위 흰 버튼 라벨(Large 18px·Medium 14px, 굵게)은 Lc 60.1이라 "다른 텍스트" Lc 60 이상을 겨우 통과해요. 주황 700 위는 Lc 71.5예요.
- 흰 배경 위 글자색 점수: `fg.neutral` 104.0, `fg.neutral-muted` 82.7(본문 75 통과), `fg.neutral-subtle` 61.8, `fg.warning` 68.1, `fg.positive` 66.4, `fg.informative` 66.2, `fg.critical` 63.3, `fg.brand`(주황 600) 54.8. `fg.brand`는 "다른 텍스트" 기준 60에도 못 미쳐요. 글자에 브랜드 색을 쓰려면 `fg.brand-contrast`(주황 700, 흰 배경 Lc 66.0)를 써요. 66.0은 "다른 텍스트" 기준 60은 넘지만 본문 기준 75에는 못 미쳐서, 본문 글자색으로는 쓰지 않아요.
- 연한 배경(`bg.*-weak`) 위 글자: `fg.*` 700단계는 Lc 56~63(브랜드 48.5)이라 쓰기 어려워요. `fg.*-contrast`는 critical 81.6, informative 84.5, positive 85.2, warning 89.1로 본문 기준 75를 넘어요. 브랜드는 주황 700이 Lc 59.7로 60에 조금 못 미쳐요. 그래서 Banner·Badge 글자는 `-contrast`를 써요(SEED Callout·Badge와 같아요).
- `fg.disabled`(gray-500)는 흰 배경 위 Lc 23.4, 비활성 배경(`bg.disabled`, gray-200) 위 Lc 16.7로 기준 30에 못 미쳐요(SEED 값 그대로). `fg.placeholder`(gray-600)는 Lc 41.1이라 통과해요.
- SEED 문서에는 테두리·아이콘 같은 글자가 아닌 요소의 Lc 기준이 없어요. 그래서 이 파일도 정하지 않고, 기준이 생기면 추가해요.
- Stitch 린트의 `contrast-ratio` 검사는 WCAG 2 기준(4.5:1)이라 경고가 나요(흰 글자 on 주황 600 버튼 2.94:1, 주황 700 눌림 3.99:1, 빨강 버튼 3.76:1). 팀이 APCA 기준으로 정했으므로(PR #9 리뷰) 이 경고는 예상된 거예요. 다만 APCA는 법·인증 근거가 아니에요.

## Typography

- 글꼴은 Pretendard 하나만 써요. SEED는 Pretendard를 Windows에만 쓰고 iOS·Android는 시스템 글꼴을 써요. 우리는 앱 화면 전체에 Pretendard를 웹폰트로 넣어요.
- 위계: 화면 제목 `title-lg`, 섹션 제목 `title-md`·`title-sm`, 본문 `body-lg`·`body-md`, 보조 `caption`, 버튼·라벨 `label-*`.
- 제목과 본문의 계층을 분명히 나눠요. 한 화면에서 쓰는 글자 크기는 4단계 이내예요.
- 글자 크기는 사용자 설정을 존중해요(UX.md 11장). 고정 크기가 필요한 곳만 예외로 해요.
- 라벨 굵기: SEED 버튼 스펙에 맞춰 `label-lg`·`label-md`는 700(bold), 배지 weak에 쓰는 `label-sm`은 500(medium)이에요. Large 버튼 라벨은 18px(SEED t6)예요.
- 글꼴: SEED는 iOS·Android·macOS에서 시스템 글꼴을 쓰고 Pretendard는 Windows에서만 써요. 우리는 팀 결정(Notion 1-2 카드)대로 Pretendard로 통일해요.

## Layout

- **기준 화면 폭**: 375px ❗. 그보다 좁은 화면에서도 글자가 잘리거나 겹치지 않아야 해요.
- **화면 여백** `space.screen-margin`: 16px (SEED `global-gutter`). **간격** `space.gutter`: 16px (SEED).
- **최대 폭** `space.screen-max`: 480px ❗. 넓은 화면에서는 콘텐츠를 늘리지 않고 가운데에 둬요.
- **누르는 영역**: `space.touch-min` 44×44px 이상. 아이콘이 작아도 누르는 영역은 이 크기를 확보해요. 촘촘한 목록의 보조 아이콘, 문장 속 링크처럼 공간이 부족한 곳은 예외지만 주변과 충분히 떨어뜨려요(UX.md 4-3).
- 누를 수 있는 요소·읽어야 하는 정보·고정 바는 안전 영역 안에 둬요. 배경과 구분선은 화면 끝까지 쓸 수 있어요.
- 간격은 `spacing`의 `space.*`만 써요.
- 컴포넌트 높이: Large 버튼·CTA 52px(SEED), 보통 44px(누르는 영역 최소 ❗: SEED Medium은 40px), 입력창 52px(SEED 텍스트 필드 Large).

## Elevation & Depth

구분 방법은 세 가지예요: **면 색(`bg.layer-*`), 테두리(`stroke.*`), 그림자**. 그림자는 정말 주목해야 하는 몇 개에만 써요(SEED). 카드 같은 평소 면은 그림자 대신 `stroke.neutral-weak`로 나누고, 한 번에 무겁게 떨어지는 그림자는 피해요(Vercel).

| 층 | 쓰는 곳 | 구분 방법 | 그림자 |
| --- | --- | --- | --- |
| 0 `layer-basement` | 스크롤 콘텐츠 뒤 바탕 | 면 색 | 없음 |
| 1 `layer-default` | 카드·목록·입력창·상단 바 | 면 색 + 테두리 | 없음 |
| 2 `layer-floating` | Bottom sheet, 메뉴 | 면 색 + 그림자 | `shadow.s2` |
| 3 | Modal(확인 요청) | 면 색 + 그림자 + 뒤 배경 `bg.overlay` | `shadow.s3` |
| 일시 알림 | Toast | 면 색(`bg.neutral-solid`) | 없음 |

| 그림자 토큰 (SEED, 라이트 모드) | 값 |
| --- | --- |
| `shadow.s1` | 0 1px 4px rgba(0,0,0,0.08) |
| `shadow.s2` | 0 2px 10px rgba(0,0,0,0.10) |
| `shadow.s3` | 0 4px 16px rgba(0,0,0,0.12) |

## Shapes

- 기본 테마는 큰 라운드예요(AGENTS.md 확정 기준). 단계 값 8·12·16·24px는 SEED 라운드 단계이고, `radius.base`(= `radius.lg`) 16px에서 나머지를 비율로 계산해요(테마는 이 값만 바꿔요).
- 큰 버튼·카드 `radius.lg`(16), 보통 버튼·입력·Toast·Banner `radius.md`(12), 배지 `radius.sm`(8), Modal·Bottom sheet `radius.xl`(24), 동그란 요소 `radius.full`. 컴포넌트별 단계 선택은 ❗ 4번.
- Skeleton은 글자 줄 `radius.sm`(8), 카드·썸네일 `radius.lg`(16), 아바타 `radius.full`(SEED Skeleton 규칙과 같은 값).
  - 출처: https://seed-design.io/llms/components/skeleton.txt
- 라운드가 있는 상자 안에 라운드가 있는 요소를 넣을 때는 안쪽 라운드 = 바깥 라운드 − 안쪽 여백이에요. 예: 카드 16에 여백 6이면 안쪽은 10.
  - 출처: https://seed-design.io/llms/components/list.txt (Concentric Radius)

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
| 포커스 | 입력: 테두리 `stroke.neutral-contrast` **2px**. 버튼·체크박스: `stroke.focus-ring` 2px 선 + 2px 띄움 | 값 없음(포커스 이벤트만) | — | `ring-[3px] ring-ring/50` (쓰지 않음) | 입력은 **SEED** 2px. 버튼·체크박스 포커스 링은 SEED 배포 CSS 값이에요(규칙 문서엔 없음) ❗ |
| 오류 | 입력: `stroke.critical-solid` 2px (포커스 중에도 유지) | `hasError` + 도움말 문구 | `error-deep` | `aria-invalid:border-destructive ring-destructive/20` | **SEED** 2px |

**섞어 쓸 때 맞출 점**: ① 비활성은 SEED 하나(색 교체)로 통일하고 shadcn의 `opacity-50`은 쓰지 않아요. 스위치만 SEED 스펙대로 0.38. ② 눌림·선택·비활성·오류가 전부 SEED 토큰 구조라 서로 어긋나지 않아요. ③ 키보드 포커스 링도 SEED CSS 값이라 섞임이 없어요. 입력창은 포커스 2px 테두리 하나만 쓰고 링은 겹쳐 쓰지 않아요. ④ 이 스펙의 토큰은 모두 YAML에 추가했어요(값은 ❗ 임시). `fg.on-brand`는 SEED 이름에 맞춰 `fg.on-brand-solid`로 바꿨어요.

**눌림 줄어듦** (SEED 방식: https://seed-design.io/llms/foundations/feedback/scale.txt, 토스 버튼과 같은 결과)

- 비율이 아니라 **고정 거리**로 정해요: 세로로 2px 줄어요. 큰 요소와 작은 요소의 느낌이 같아요.
- 기준 길이 `basis = max(높이, 너비 ÷ 4, 24)`, 배율 `scale = (basis − 2) ÷ basis`. 52px 버튼은 50px가 돼요. (비공식 정리 사이트는 토스 버튼이 0.96으로 줄어든다고 적었지만, 토스 공식 버튼 문서에는 줄어듦 없이 어둡게 덮는 방식으로만 나와요.)
- 2px, 폭 ÷ 4, 최소 24는 SEED가 모든 화면에 공통으로 정한 고정값이라 바꾸지 않아요. 축소는 가운데 기준이고 주변 요소는 움직이지 않아요.
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
| `timing-function.enter-expressive` | cubic-bezier(0.03, 0.4, 0.1, 1) | 모달·시트 나타남(강조) |
| `timing-function.exit-expressive` | cubic-bezier(0.35, 0, 0.95, 0.55) | 강조해서 사라짐 |
| `timing-function.linear` | cubic-bezier(0, 0, 1, 1) | |
| `timing-function.pressed-scale` | cubic-bezier(0, 0, 0.15, 1) | 눌림 줄어듦 |

- 움직임은 원인과 결과를 설명할 때만 써요. 시트는 들어온 방향으로 나가요.

**나타나고 사라지는 값** (SEED 컴포넌트 스펙)

| 컴포넌트 | 나타남 | 사라짐 |
| --- | --- | --- |
| Toast | 투명 0 + 크기 0.8에서 시작, `d3` 150ms, `enter` | `d2` 100ms, `exit`(같은 크기·투명으로) |
| Modal | 뒤 배경 `d2` `enter`. 내용은 크기 1.3에서 시작, `d4` 200ms, `enter-expressive` | 뒤 배경·내용 모두 `d2` 100ms, `exit` |
| Bottom sheet | 뒤 배경 `enter` `d6` 300ms. 내용 `d6` 300ms, `enter-expressive` | 뒤 배경·내용 `d4` 200ms, `exit` |
- '동작 줄이기'가 켜지면(SEED: 배율을 1로 계산) 크기·위치 변화는 끄고 색 변화와 나타나기만 남겨요(UX.md 10장).

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
| 선택 목록 | Bottom sheet (행동·옵션 목록, 선택지가 6개 이상이면 입력 버튼으로 열기). 입력용 Select의 열리는 방식은 ❗ 17 | ❗ Claude | 고르기·닫기·바깥 누르기로 닫힘 |
| 제자리 메시지 | Input·Textarea·Select의 안내·오류 문구 | UX.md | 별도 컴포넌트를 만들지 않음. `fg.critical` 등 사용 |
| 지속 안내 | Banner | UX.md (15장 결정 4) | 상태가 바뀌면 닫힘. `banner-informative`·`banner-critical` |

### MVP 컴포넌트 19개

| 컴포넌트 | 토큰 연결 | 비고 |
| --- | --- | --- |
| Button | YAML 있음 (`button-*`) | variant: primary / secondary / critical, 크기 Large·Medium |
| Input | YAML 있음 | 포커스·오류·비활성 상태 TODO |
| Card | YAML 있음 | |
| Badge | YAML 있음 (`badge-brand`) | 상태색 톤은 아래 "컴포넌트별 SEED 사용 규칙" 참고. YAML 변형은 TODO |
| Toast | YAML 있음 | |
| Banner | YAML 있음 | |
| Bottom sheet | YAML 있음 | shadcn에 없음. 당근·토스 참고 |
| Modal | YAML 있음 | |
| Select, Textarea, Checkbox, Radio, Switch | TODO | SEED 스펙 파일에 박스·손잡이 크기가 없어 비워 뒀어요(아래 비교표). 선택 상태는 `bg.brand-weak`/`bg.brand-solid` |
| Tabs | TODO | SEED Tab 스펙 값은 아래 "컴포넌트별 SEED 사용 규칙"에 적었어요. YAML 연결은 TODO |
| List item | YAML 있음 | 눌림은 `bg.transparent-pressed`(SEED) |
| Top bar | YAML 있음 (`top-bar`) | shadcn에 없음. SEED Top navigation 값 |
| Avatar, Spinner, Skeleton | YAML 있음 | 시간 값은 위 표 |

- 위 목록에 없는 UI는 만들지 않고 사람에게 물어요.

### SEED 컴포넌트 스펙과 비교

SEED 공식 스펙 파일(rootage JSON)의 값과 우리 값을 나란히 놓았어요. "같음"은 그대로 SEED 값이에요. 스펙 파일에 없는 값은 비워 뒀어요.

| 컴포넌트 | SEED 값 (스펙 파일) | 우리 값 | 판정 | 출처 |
| --- | --- | --- | --- | --- |
| Button Large | 높이 52 · 라운드 12 · 좌우 20 · 라벨 18 bold (action-button) | 높이 52 · 라운드 16 · 좌우 20 · 라벨 18 bold | 큰 라운드 테마라 SEED(12)보다 한 단계 큼 ❗ 4 | [action-button](https://seed-design.io/llms/components/action-button.txt) |
| Button Medium | 높이 40 · 라운드 8 · 좌우 16 · 라벨 14 bold | 높이 44 · 라운드 12 · 좌우 16 · 라벨 14 bold | 높이: UX.md 최소 누르는 영역 ❗ 12 / 라운드: 큰 라운드 ❗ 4 | [action-button](https://seed-design.io/llms/components/action-button.txt) |
| Input Large | 높이 52 · 라운드 12 · 좌우 16 · 글자 16 · 테두리 1px, 포커스·오류 2px (text-input) | 높이 52 · 라운드 12 · 좌우 16 · 글자 16 · 테두리 1px, 포커스·오류 2px | 라운드가 SEED(12)와 같은 값(큰 라운드의 md) ❗ 4 | [text-input](https://seed-design.io/llms/components/text-input.txt) |
| Toast | 라운드 8 · 여백 10 · 최소 높이 44 · 최대 폭 464 · 글자 14 (snackbar) | 라운드 12 · 여백 10 · 최소 높이 44 · 최대 폭 464 · 글자 14 | 큰 라운드 ❗ 4 | [snackbar](https://seed-design.io/llms/components/snackbar.txt) |
| Banner | 라운드 10 · 여백 14 · 간격 12 · 최소 높이 50 · 글자 14, 글자색 `-contrast` (callout) | 라운드 12 · 여백 14 · 간격 12 · 최소 높이 50 · 글자 14, 글자색 `-contrast` | 큰 라운드 ❗ 4 | [callout](https://seed-design.io/llms/components/callout.txt) |
| Modal | 라운드 20 · 최대 폭 272 · 여백 20 · 제목 20 bold · 내용 16 (alert-dialog) | 라운드 24 · 최대 폭 272 · 여백 20 · 제목 20 bold · 내용 16 | 큰 라운드 ❗ 4 | [alert-dialog](https://seed-design.io/llms/components/alert-dialog.txt) |
| Bottom sheet | 위쪽 라운드 24 · 최대 폭 480 · 최대 높이 90% · 좌우 여백 16 · 위 여백 24 (bottom-sheet) | 라운드 24 · 여백 16 | 같음 | [bottom-sheet](https://seed-design.io/llms/components/bottom-sheet.txt) |
| Badge | 큰 크기 라운드 6 · 여백 8×4 · 최소 높이 24 · 글자 12 (weak 500, solid·outline 700) (badge) | 라운드 8 · 여백 8×4 · 최소 높이 24 · 글자 12 (weak 500, solid·outline 700) | 큰 라운드 ❗ 4 | [badge](https://seed-design.io/llms/components/badge.txt) |
| List item | 위아래 12 · 좌우 16 · 제목 16 · 보조 13 (list-item) | 같음 | 같음 | [list](https://seed-design.io/llms/components/list.txt) |
| Top bar | iOS 높이 44 / Android 56 · 좌우 16 · 제목 18 bold (top-navigation) | 높이 44 | iOS 값을 골랐어요 ❗ 12 | [top-navigation](https://seed-design.io/llms/components/top-navigation.txt) |
| Avatar | 크기 20~108(용도별), 원형, 테두리 1px `stroke.neutral-subtle` (avatar) | 48 | SEED 크기 목록의 값(작은 리스트용) | [avatar](https://seed-design.io/llms/components/avatar.txt) |
| Spinner | 크기 24·40, 두께 3·5px (progress-circle) | 40 | SEED 값(전체 페이지 로딩용). 요소 안에서는 24 | [progress-circle](https://seed-design.io/llms/components/progress-circle.txt) |
| Skeleton | 라운드 0·8·16·full, 반짝임 1.5초 (skeleton) | 라운드 8·16·full | 같음 | [skeleton](https://seed-design.io/llms/components/skeleton.txt) |
| Checkbox · Radio | 글자 14(보통)·16(큼) 최소 높이 32·36 · 간격 8 · 글자 비활성 `fg.disabled` (checkbox, radio) | TODO | 박스 크기는 SEED 스펙 파일에 없음 | [checkbox](https://seed-design.io/llms/components/checkbox.txt) · [radio](https://seed-design.io/llms/components/radio.txt) |
| Switch | 높이 16·24·32 · 비활성 투명도 0.58(라벨) (switch) | TODO | 손잡이·트랙 크기는 SEED 스펙 파일에 없음 | [switch](https://seed-design.io/llms/components/switch.txt) |
| Select box | 라운드 12 · 테두리 1px, 선택 2px · 글자 16 (select-box) | TODO | 높이는 SEED 스펙 파일에 없음 | [select-box](https://seed-design.io/llms/components/select-box.txt) |
| Card | SEED 컴포넌트에 없음. 기초 상자 Box로 조합 | 라운드 16 · 여백 16 · 배경 `bg.layer-default` · 테두리 `stroke.neutral-weak` 1px · 그림자 없음 | 값은 SEED 토큰 중에서 우리가 골랐어요 ❗ 12 | [box](https://seed-design.io/react/components/layout/box) |

### 컴포넌트별 SEED 사용 규칙

위 비교표에 없는 SEED 규칙이에요. 값(px)은 SEED 스펙 파일에 있는 것만 적었고, 항목마다 아래에 출처를 붙였어요.

**Badge**

- 톤 6가지: neutral · brand · informative · positive · warning · critical. 스타일 3가지: solid(배경이 복잡하거나 이미지 위, 강하게 강조), outline(중간 강조), weak(반복되는 화면, 카테고리 태그·보조 정보).
- weak는 색이 있는 배경 위에 쓰지 않는다. 브랜드 톤은 브랜드를 드러내는 곳에만 아껴 쓴다.
- 한 대상에 1~2개까지, 라벨은 2~3단어이고 10자를 넘으면 말줄임이다. 눌러지는 요소가 아니므로 행동은 Chip·Toggle Button·Action Button을 쓴다.
- 출처: https://seed-design.io/llms/components/badge.txt

**Checkbox · Radio · Switch**

- Checkbox: 크기 Medium·Large. 모양은 Square(필수 선택이거나 꼭 알아야 할 때)와 Ghost(필수가 아니고 3개 이하). 상태는 선택·미선택·일부 선택(Indeterminate). 그룹은 부모를 고르면 자식이 모두 선택되고, 일부만 선택되면 부모가 일부 선택으로 표시된다.
  - 출처: https://seed-design.io/llms/components/checkbox.txt
- Radio: 크기 Medium·Large. 단일 선택이고 권장 옵션을 기본 선택으로 둔다. 세로 배치가 기본이다. 선택지 2~6개는 Radio Group, 6개 이상이거나 늘어날 수 있으면 입력 버튼으로 열고 Bottom sheet에 전체 목록을 보여 준다.
  - 출처: https://seed-design.io/llms/components/radio.txt
- Switch: 높이 16·24·32. 16은 터치 영역을 높이 24로 잡는다. 켜자마자 적용되는 설정에 쓰고, 마지막에 저장해야 적용되면 Checkbox를 쓴다. 각 Switch는 독립적으로 동작하고, 비활성이면 마크와 라벨 모두 비활성 색이다.
  - 출처: https://seed-design.io/llms/components/switch.txt
- 세 가지 모두 라벨을 포함한 영역(목록에 넣으면 행 전체)이 터치 영역이다.
  - 출처: https://seed-design.io/llms/components/checkbox.txt

**Textarea · 입력 서식**

- Textarea 높이: 자동 크기를 켜면 최소 3줄(95px), 최대는 정하기 나름이다. 끄면 최소 2줄(70px)이고 최대 높이를 반드시 정하며 넘으면 안에서 스크롤된다.
- 주민번호·전화번호처럼 형식이 있는 값은 입력칸을 나누지 않고 한 칸에서 자동으로 서식을 맞춘다.
- 출처: https://seed-design.io/llms/components/text-input.txt

**Divider**

- 두께 1px. 기본 색 `stroke.neutral-muted`, 더 약하게는 `stroke.neutral-subtle`. 가로(위아래 쌓을 때)와 세로(나란히 놓을 때)가 있다.
- 구분 강도는 세 단계다: 같은 그룹 안은 안쪽 여백이 있는 구분선(약), 그룹 사이나 행동 영역은 전체 너비 구분선(중), 완전히 다른 내용은 8px 간격(강, 구분선 부품이 아니라 바탕 층 사이 간격).
- 꼭 필요할 때만 쓰고, 목록처럼 반복되는 화면은 구분선 없이도 나뉘는지 먼저 본다. 화면 맨 아래 요소에는 두지 않는다.
- 출처: https://seed-design.io/llms/components/divider.txt

**Tabs**

- SEED Tab 스펙: 높이 44(medium)·40(small), 좌우·상하 여백 10px, 글자 16px(medium)·14px(small) 굵게. 색은 선택 `fg.neutral`, 미선택 `fg.neutral-subtle`, 비활성 `fg.disabled`.
  - 출처: https://seed-design.io/rootage/components/tab.json
- 탭이 5개 이하면 칸을 꽉 채우는 Fill, 6개 이상이거나 라벨이 길면 라벨 길이에 맞추는 Hug를 쓴다. 알림 배지는 여러 탭에 동시에 달지 않고, 내용을 확인하면 사라진다.
  - 출처: https://seed-design.io/llms/components/tabs.txt

## Do's and Don'ts

`/ui-review`가 이 목록을 그대로 점검표로 씁니다. "(웹 프로토타입에서 확인 불가)" 표시가 있는 항목은 건너뜁니다.

### 토큰

- [ ] 화면과 컴포넌트에는 쓰임새 이름 토큰(`bg.*`·`fg.*`·`stroke.*`)만 쓴다.
- [ ] 간격은 `space.*`, 모서리는 `radius.*`만 쓴다.
- [ ] `palette.*`를 화면이나 컴포넌트에서 직접 쓰지 않는다.
- [ ] 토큰에 없는 색·간격·모서리·그림자 값을 새로 만들지 않는다.
- [ ] 다크모드 값을 지금 추가하지 않는다.

### 색·글자

- [ ] 글자에 브랜드 색을 쓸 때는 `fg.brand-contrast`를 쓴다. `fg.brand`는 글자로 쓰지 않는다(Lc 54.8로 기준 60에 못 미침).
- [ ] 연한 배경(`bg.*-weak`) 위 글자는 `fg.*-contrast`를 쓴다. `fg.critical`·`fg.informative` 같은 700단계 글자는 쓰지 않는다.
- [ ] 주황(`bg.brand-solid`) 위 흰 글자는 굵은 버튼 라벨에만 쓴다(APCA Lc 60.1). 본문 글자에는 쓰지 않는다.
- [ ] `fg.brand-contrast`(Lc 66.0)는 링크·짧은 강조 글자에만 쓴다. 두 줄 이상 본문 문장은 `fg.neutral`을 쓴다.
- [ ] 아이콘은 Lucide만 쓴다.

### 컴포넌트·상태

- [ ] 누르는 영역은 `space.touch-min`(44px) 이상으로 잡는다.
- [ ] 눌림은 `-pressed` 토큰과 150ms 줄어듦으로 표현한다.
- [ ] 비활성 요소에 눌림·선택 모양을 겹쳐 쓰지 않는다.
- [ ] 로딩 중인 버튼은 너비를 유지하고 연속 누름을 막는다.
  - 출처: https://seed-design.io/llms/components/action-button.txt (로딩 상태는 비활성을 포함하지 않으므로 연속 누름은 따로 막아요)
- [ ] 채움 버튼(`button-primary`·`button-critical`)은 한 화면에 하나만 둔다. 보조 버튼(`button-secondary`)은 여러 개 둘 수 있다.
  - 출처: https://seed-design.io/llms/components/action-button.txt (강조가 큰 버튼은 화면당 1개)
- [ ] 버튼을 4개 이상 나란히 두지 않고, 3개 이상도 피한다. 행동이 셋 이상이면 나머지는 아이콘 버튼으로 뺀다.
  - 출처: https://seed-design.io/llms/components/action-button.txt (나란히 놓기 규칙)
- [ ] 닫기 성격의 보조 버튼과 채움 버튼을 나란히 둘 때 너비 비율은 3:7로 한다.
  - 출처: https://seed-design.io/llms/components/action-button.txt (Neutral Weak + Solid 배치)
- [ ] 버튼 라벨은 사용자 입장의 짧은 동사형으로 쓰고 같은 동작에는 같은 말을 쓴다. 앞 아이콘과 뒤 아이콘을 함께 쓰지 않는다.
  - 출처: https://seed-design.io/llms/components/action-button.txt (Labels and icons)
- [ ] 토스·당근의 디자인 자산을 그대로 복사하지 않고 규칙만 참고한다. (웹 프로토타입에서 확인 불가)

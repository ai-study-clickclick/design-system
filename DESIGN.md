---
version: alpha
name: clickclick-design-system
description: "딸깍딸깍 디자인 시스템의 디자인 값 원본. YAML 토큰이 원본이고 본문은 쓰는 법이다. 앱 화면(모바일), 라이트 모드, 기본 테마는 주황. 값은 SEED 기준이며 주황 CTA, 비활성 글자색, 보통 버튼 높이가 다르다"

# 토큰 이름은 docs/CONVENTIONS.md "디자인 토큰"을 따른다
# 1단 palette.* → 2단 쓰임새(bg.*, fg.*, stroke.*). 화면·컴포넌트에는 쓰임새 이름만 쓴다
# 점이 들어간 키는 따옴표로 감싼다
colors:
  # ── 1단: 기본 색표 (값은 전부 SEED 팔레트, 라이트 모드) ──
  # 이름 `orange` = SEED `carrot`의 값. 브랜드 색이 정해지면 이 단계 값만 바꾼다. 50 단계는 없다
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
  # 브랜드 색 단계: 테마 프리셋의 brand.primary에서 /sync가 자동 생성(OKLCH). 기본 테마에서는 주황 단계를 그대로 가리킨다
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
  "fg.disabled": "{colors.palette.gray-600}"  # SEED의 gray-500 대신 gray-600. 흰 배경 Lc 41.1, 비활성 배경 Lc 34.5로 기준 30을 넘는다
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

# 테마 프리셋. brand.primary와 radius.base만 정한다
theme:
  default:
    brand.primary: "{colors.palette.orange-600}"
    radius.base: 16px

typography:
  # 기본 글꼴 Pretendard. 크기·줄 높이는 당근 SEED 스케일(t9·t7·t6·t5·t4·t3·t2) 값을 참고
  # 라벨 굵기: 버튼·탭 라벨 bold 700, 배지(weak) 라벨 medium 500. Large 버튼 라벨은 SEED t6(18px), Tabs medium 라벨은 t5(16px)
  title-lg: { fontFamily: Pretendard, fontSize: 24px, fontWeight: 700, lineHeight: 32px }
  title-md: { fontFamily: Pretendard, fontSize: 20px, fontWeight: 700, lineHeight: 27px }
  title-sm: { fontFamily: Pretendard, fontSize: 18px, fontWeight: 700, lineHeight: 24px }
  body-lg: { fontFamily: Pretendard, fontSize: 16px, fontWeight: 400, lineHeight: 22px }
  body-md: { fontFamily: Pretendard, fontSize: 14px, fontWeight: 400, lineHeight: 19px }
  body-sm: { fontFamily: Pretendard, fontSize: 13px, fontWeight: 400, lineHeight: 18px }
  caption: { fontFamily: Pretendard, fontSize: 12px, fontWeight: 700, lineHeight: 16px }
  label-lg: { fontFamily: Pretendard, fontSize: 18px, fontWeight: 700, lineHeight: 24px }
  label-base: { fontFamily: Pretendard, fontSize: 16px, fontWeight: 700, lineHeight: 22px }
  label-md: { fontFamily: Pretendard, fontSize: 14px, fontWeight: 700, lineHeight: 19px }
  label-sm: { fontFamily: Pretendard, fontSize: 12px, fontWeight: 500, lineHeight: 16px }

rounded:
  # 컴포넌트마다 SEED 라운드 값을 쓴다. 값 6·8·12·16·20·24px는 SEED 라운드 단계(r1.5·r2·r3·r4·r5·r6)다
  # 테마는 radius.base 하나만 정하고 나머지는 /sync가 비율로 계산한다. 비율 = 0.375 / 0.5 / 0.75 / 1 / 1.25 / 1.5 (기본값 16px일 때 6/8/12/16/20/24)
  "radius.base": 16px
  "radius.xs": 6px      # 배지 (SEED r1.5)
  "radius.sm": 8px      # 보통 버튼, Toast, Skeleton 글자 줄 (SEED r2)
  "radius.md": 12px     # 큰 버튼, 입력창 (SEED r3)
  "radius.lg": 16px     # 카드 (SEED r4)
  "radius.xl": 20px     # Modal (SEED r5)
  "radius.2xl": 24px    # Bottom sheet (SEED r6)
  "radius.full": 9999px

spacing:
  # SEED 간격 스케일 전체. 이름이 px 값이다
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
  # 화면 단위 값
  "space.screen-width": 375px   # 기준 화면 폭
  "space.screen-max": 480px     # 넓은 화면에서 콘텐츠 최대 폭
  "space.screen-margin": 16px   # 화면 좌우 여백 (SEED global-gutter)
  "space.gutter": 16px          # SEED 모바일 gutter 16px
  "space.touch-min": 44px       # 누르는 영역 기본 크기 (docs/UX.md "손가락으로 쓰기 쉽게")
  "space.touch-min-sm": 24px    # 공간이 부족한 곳의 누르는 영역 최소 크기

components:
  # 이름·속성은 코드와 피그마가 같게 (예: Button · variant=primary)
  # 상태(pressed·disabled·loading·selected)는 별도 키로 둔다
  # padding은 가로 값이다. 가로·세로가 다르면 paddingX · paddingY를 함께 둔다
  # 값은 SEED 컴포넌트 스펙 값. SEED와 다른 값: 보통 버튼 높이 44px(SEED 40, 기본 누르는 영역)
  # SEED에 없는 값: card(라운드·여백)
  # top-bar 높이는 SEED iOS 값(44), avatar 48·spinner 40은 SEED 크기 목록의 값
  # MVP 19개 중 아래에 없는 것은 "Components"의 "MVP 컴포넌트 19개" 표를 따른다
  button-primary:
    backgroundColor: "{colors.bg.brand-solid}"
    textColor: "{colors.fg.on-brand-solid}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.md}"
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
    rounded: "{rounded.radius.md}"
    height: 52px
    padding: "{spacing.space.20}"
  button-secondary-pressed:
    backgroundColor: "{colors.bg.neutral-weak-pressed}"
    textColor: "{colors.fg.neutral}"
  button-secondary-disabled:
    backgroundColor: "{colors.bg.disabled}"
    textColor: "{colors.fg.disabled}"
  button-critical:
    backgroundColor: "{colors.bg.critical-solid}"
    textColor: "{colors.fg.on-critical-solid}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.md}"
    height: 52px
    padding: "{spacing.space.20}"
  button-critical-pressed:
    backgroundColor: "{colors.bg.critical-solid-pressed}"
    textColor: "{colors.fg.on-critical-solid}"
  button-critical-disabled:
    backgroundColor: "{colors.bg.disabled}"
    textColor: "{colors.fg.disabled}"
  button-medium:
    backgroundColor: "{colors.bg.brand-solid}"
    textColor: "{colors.fg.on-brand-solid}"
    typography: "{typography.label-md}"
    rounded: "{rounded.radius.sm}"
    height: 44px
    padding: "{spacing.space.16}"
  button-medium-pressed:
    backgroundColor: "{colors.bg.brand-solid-pressed}"
    textColor: "{colors.fg.on-brand-solid}"
  button-medium-disabled:
    backgroundColor: "{colors.bg.disabled}"
    textColor: "{colors.fg.disabled}"
  # 윤곽 버튼은 SEED neutralOutline 값. 테두리는 비활성일 때도 같다
  button-outline:
    backgroundColor: "{colors.bg.transparent}"
    textColor: "{colors.fg.neutral}"
    borderColor: "{colors.stroke.neutral-muted}"
    borderWidth: 1px
    typography: "{typography.label-lg}"
    rounded: "{rounded.radius.md}"
    height: 52px
    padding: "{spacing.space.20}"
  button-outline-pressed:
    backgroundColor: "{colors.bg.transparent-pressed}"
    textColor: "{colors.fg.neutral}"
  button-outline-disabled:
    backgroundColor: "{colors.bg.transparent}"
    textColor: "{colors.fg.disabled}"
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
    rounded: "{rounded.radius.xs}"
    height: 24px
    padding: "{spacing.space.8}"
    paddingX: "{spacing.space.8}"
    paddingY: "{spacing.space.4}"
  toast:
    backgroundColor: "{colors.bg.neutral-solid}"
    textColor: "{colors.fg.on-neutral-solid}"
    typography: "{typography.body-md}"
    rounded: "{rounded.radius.sm}"
    height: 44px
    maxWidth: 464px
    padding: "{spacing.space.10}"
  # Banner는 SEED Page Banner 값. 화면 전체 폭이라 모서리를 두지 않는다
  banner-informative:
    backgroundColor: "{colors.bg.informative-weak}"
    textColor: "{colors.fg.informative-contrast}"
    typography: "{typography.body-md}"
    height: 40px
    padding: "{spacing.space.16}"
    paddingX: "{spacing.space.16}"
    paddingY: "{spacing.space.10}"
    gap: "{spacing.space.6}"
  banner-critical:
    backgroundColor: "{colors.bg.critical-weak}"
    textColor: "{colors.fg.critical-contrast}"
    typography: "{typography.body-md}"
    height: 40px
    padding: "{spacing.space.16}"
    paddingX: "{spacing.space.16}"
    paddingY: "{spacing.space.10}"
    gap: "{spacing.space.6}"
  bottom-sheet:
    backgroundColor: "{colors.bg.layer-floating}"
    textColor: "{colors.fg.neutral}"
    rounded: "{rounded.radius.2xl}"
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
    padding: "{spacing.space.16}"
    paddingX: "{spacing.space.16}"
    paddingY: "{spacing.space.12}"
  list-item-detail:
    textColor: "{colors.fg.neutral-subtle}"
    typography: "{typography.body-sm}"
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
  spinner-small:
    rounded: "{rounded.radius.full}"
    size: 24px
  tabs-medium:
    textColor: "{colors.fg.neutral}"
    typography: "{typography.label-base}"
    height: 44px
    padding: "{spacing.space.10}"
  tabs-small:
    textColor: "{colors.fg.neutral}"
    typography: "{typography.label-md}"
    height: 40px
    padding: "{spacing.space.10}"
  tabs-unselected:
    textColor: "{colors.fg.neutral-subtle}"
  tabs-disabled:
    textColor: "{colors.fg.disabled}"
  skeleton:
    backgroundColor: "{colors.bg.neutral-weak}"
    rounded: "{rounded.radius.sm}"
---

> 상태: 초안 v0.3 · 태스크: 1-2
> 이 문서는 **보이는 값**(색 · 글자 · 간격 · 모서리 · 그림자 · 움직임 · 컴포넌트 모양)을 정하는 원본이다
> 다루는 범위: 기본 테마의 토큰과 MVP 컴포넌트 값. 다크모드와 PC↔MO 변환은 나중에 추가한다
> 동작은 `docs/UX.md`, 문구는 `docs/WRITING.md`, 화면 유형별 구성은 `docs/PATTERNS.md`를 따른다

## Overview

앱 화면(모바일)과 라이트 모드가 기준이다. 이 파일이 바뀌면 코드 테마와 피그마 Variables가 `/sync`로 따라온다

한 라이브러리를 그대로 쓰지 않고, 필요한 것만 가져와 우리 것으로 만든다

| 영역 | 따를 기준 | 이 파일의 장 |
| --- | --- | --- |
| 부품 뼈대(구성 · 구조) | shadcn/ui. 없는 앱 부품(Top bar, Bottom sheet, 하단 고정 버튼)은 당근 · 토스 | Components |
| 색 · 글자 토큰 | 당근 SEED + 토스 TDS | Colors, Typography |
| 색 단계 용도 · 모서리 | Vercel | Colors, Shapes |
| 간격 · 그림자 값 | 당근 SEED | `spacing`, Elevation & Depth |
| 움직임 · 눌림 | 당근 SEED | Components |
| 문구 · 말투 | 토스(규칙만 참고) | 여기서 다루지 않음 → `docs/WRITING.md` |
| 사용성 · 접근성 · 상태 규칙 | 팀 결정 | 여기서 다루지 않음 → `docs/UX.md`(값만 이 파일이 정한다) |

- 기본 글꼴은 Pretendard, 아이콘은 Lucide다
- 이 파일에 없는 토큰 · 스타일 · 컴포넌트는 만들지 않는다. 필요하면 사람에게 먼저 묻는다
- 기본 테마는 `theme.default`다(`brand.primary` = 주황 600, `radius.base` 16px)
- 테마 프리셋(`theme.<name>`)은 `brand.primary`와 `radius.base` 두 값만 정한다. 나머지는 자동 계산하고 기본 토큰은 바뀌지 않는다

## Colors

토큰은 3층으로 읽는다. **기본 색표(`palette.*`) → 쓰임새 이름(`bg.*` · `fg.*` · `stroke.*`) → 컴포넌트**. 화면과 컴포넌트에는 쓰임새 이름만 쓴다

- 역할 6개: Brand, Neutral, Positive, Warning, Critical, Informative
- 단계 용도: 밝은 단계는 배경, 중간 단계는 테두리, 진한 단계는 글자
- 변형: `-solid`(채움), `-weak`(연한 배경), `-pressed`(눌림). 눌림은 표면 색만 바꾸고 글자 · 아이콘 색은 그대로다
- 브랜드 색 단계(`palette.brand-100` ~ `palette.brand-900`)는 `brand.primary`에서 자동 생성한다. 대표 컬러만 바꿔도 `bg.brand-solid` 등이 함께 바뀐다
- 눌림 색 연결은 brand-solid 600 → pressed 700이다

**색 대비 기준값** (APCA 방식. 흰 배경 위 Lc는 절댓값)

| 대상 | 기준 |
| --- | --- |
| 가독성 텍스트(본문) | Lc 75 이상, Lc 90 이상 권장 |
| 다른 텍스트 | Lc 60 이상. 글자 크기가 16px 미만이면 굵게(bold) |
| placeholder · disabled 글자 | Lc 30 이상 |
| 색만으로 의미 전달 금지 | 글자나 아이콘을 함께 쓴다 |

APCA는 W3C 공식 표준이 아니므로 법 · 인증 근거로는 쓰지 않는다

- 값은 전부 SEED 색표라서 SEED 자신의 기준에 못 미치는 곳도 똑같이 남아 있다. 아래 점수가 그렇다
- 주황 600(`bg.brand-solid`) 위 흰 버튼 라벨(Large 18px · Medium 14px, 굵게)은 Lc 60.1로 "다른 텍스트" 기준 60을 겨우 넘는다. 주황 700 위는 Lc 71.5다
- 흰 배경 위 글자색 점수: `fg.neutral` 104.0, `fg.neutral-muted` 82.7(본문 75 통과), `fg.neutral-subtle` 61.8, `fg.warning` 68.1, `fg.positive` 66.4, `fg.informative` 66.2, `fg.critical` 63.3, `fg.brand`(주황 600) 54.8
- `fg.brand`는 기준 60에도 못 미친다. 글자에 브랜드 색을 쓰려면 `fg.brand-contrast`(주황 700, 흰 배경 Lc 66.0)를 쓴다. 66.0은 기준 60은 넘지만 본문 기준 75에는 못 미쳐서 본문 글자색으로는 쓰지 않는다
- 연한 배경(`bg.*-weak`) 위 `fg.*` 700단계 글자는 Lc 56~63(브랜드 48.5)이라 쓰기 어렵다. `fg.*-contrast`는 critical 81.6, informative 84.5, positive 85.2, warning 89.1로 본문 기준 75를 넘는다. 브랜드는 주황 700이 Lc 59.7로 60에 조금 못 미친다. 그래서 Banner · Badge 글자는 `-contrast`를 쓴다(Badge weak의 굵기 예외는 Components의 Badge 규칙을 따른다)
- `fg.disabled`는 SEED 값(gray-500)이 흰 배경 위 Lc 23.4, 비활성 배경(`bg.disabled`, gray-200) 위 Lc 16.7로 기준 30에 못 미쳐서 gray-600으로 올렸다(흰 배경 Lc 41.1, 비활성 배경 Lc 34.5). `fg.placeholder`(gray-600)와 같은 색이다
- `[결정 필요]` 글자가 아닌 요소(입력칸 테두리 · 체크박스 · 라디오 · 스위치의 테두리 · 의미 있는 아이콘 · 포커스 표시)의 대비 기준값. 임시 값이 없으므로 이런 요소에 기존 토큰 외의 색을 정해야 하면 사람에게 묻는다
- Stitch 린트의 `contrast-ratio` 검사는 WCAG 2 기준(4.5:1)이라 흰 글자 on 주황 600 버튼, 주황 700 눌림, 빨강 버튼에서 경고가 나온다. APCA 기준으로 정했으므로 예상된 경고다

## Typography

- 글꼴은 Pretendard 하나만 쓴다. 앱 화면 전체에 웹폰트로 넣는다
- 위계: 화면 제목 `title-lg`, 섹션 제목 `title-md` · `title-sm`, 본문 `body-lg` · `body-md`, 목록 보조 글자 `body-sm`, 보조 `caption`, 버튼 · 탭 · 라벨 `label-*`
- 제목과 본문의 계층을 분명히 나눈다. 한 화면에서 쓰는 글자 크기는 4단계 이내다
- 기기 글자 크기 설정을 따르는 규칙은 `docs/UX.md` "글자 크기와 콘텐츠 길이"와 "개인 설정 존중"을 따른다
- 라벨 굵기: `label-lg` · `label-base` · `label-md`는 700(bold), 배지 weak에 쓰는 `label-sm`은 500(medium)이다. Large 버튼 라벨은 18px(`label-lg`), Tabs medium 라벨은 16px(`label-base`)다
- `body-sm`(13px 보통 굵기)에는 `fg.neutral` · `fg.neutral-muted`만 쓴다. Lc 75 미만 글자색은 16px 미만이면 굵게 써야 해서다. List item 보조 글자(`fg.neutral-subtle`)는 SEED List item을 그대로 따르는 예외다

## Layout

- **기준 화면 폭** `space.screen-width`: 375px. 좁은 화면 · 큰 글자에서의 동작은 `docs/UX.md` "글자 크기와 콘텐츠 길이"를 따른다
- **화면 여백** `space.screen-margin`: 16px. **간격** `space.gutter`: 16px
- **최대 폭** `space.screen-max`: 480px. 넓은 화면에서는 콘텐츠를 늘리지 않고 가운데에 둔다
- **누르는 영역** `space.touch-min`: 44×44px. 공간이 부족한 곳의 최소값은 `space.touch-min-sm` 24×24px다. 언제 줄여도 되는지는 `docs/UX.md` "손가락으로 쓰기 쉽게"를 따른다
- 안전 영역 배치는 `docs/UX.md` "가려지면 안 되는 것"을 따른다
- 간격은 `spacing`의 `space.*`만 쓴다
- 컴포넌트 높이: Large 버튼 · CTA 52px, 보통 버튼 44px(기본 누르는 영역에 맞춘 값), 입력창 52px

## Elevation & Depth

구분 방법은 세 가지다: **면 색(`bg.layer-*`), 테두리(`stroke.*`), 그림자**. 그림자는 정말 주목해야 하는 몇 개에만 쓴다. 카드 같은 평소 면은 그림자 대신 `stroke.neutral-weak`로 나누고, 한 번에 무겁게 떨어지는 그림자는 피한다

| 층 | 쓰는 곳 | 구분 방법 | 그림자 |
| --- | --- | --- | --- |
| 0 `layer-basement` | 스크롤 콘텐츠 뒤 바탕 | 면 색 | 없음 |
| 1 `layer-default` | 카드 · 목록 · 입력창 · 상단 바 | 면 색 + 테두리 | 없음 |
| 2 `layer-floating` | Bottom sheet, 메뉴 | 면 색 + 그림자 | `shadow.s2` |
| 3 | Modal(확인 요청) | 면 색 + 그림자 + 뒤 배경 `bg.overlay` | `shadow.s3` |
| 일시 알림 | Toast | 면 색(`bg.neutral-solid`) | 없음 |

- 면 색이 바로 뒤 바탕과 같으면 `stroke.neutral-weak` 1px 테두리로 구분한다. 예: `bg.neutral-weak`(보조 버튼 · Skeleton) · `bg.disabled` 면을 `bg.layer-basement` 위에 둘 때(모두 gray-200)

| 그림자 토큰 (라이트 모드) | 값 |
| --- | --- |
| `shadow.s1` | 0 1px 4px rgba(0,0,0,0.08) |
| `shadow.s2` | 0 2px 10px rgba(0,0,0,0.10) |
| `shadow.s3` | 0 4px 16px rgba(0,0,0,0.12) |

## Shapes

- 라운드는 컴포넌트마다 SEED 값을 쓴다. 단계 값 6 · 8 · 12 · 16 · 20 · 24px는 SEED 라운드 단계이고, `radius.base`(= `radius.lg`) 16px에서 나머지를 비율로 계산한다. 테마는 이 값만 바꾼다
- 큰 버튼 · 입력 `radius.md`(12), 보통 버튼 · Toast `radius.sm`(8), 배지 `radius.xs`(6), 카드 `radius.lg`(16), Modal `radius.xl`(20), Bottom sheet `radius.2xl`(24), 동그란 요소 `radius.full`. Banner는 화면 전체 폭이라 모서리를 두지 않는다
- Skeleton은 글자 줄 `radius.sm`(8), 카드 · 썸네일 `radius.lg`(16), 아바타 `radius.full`이다
- 라운드가 있는 상자 안에 라운드가 있는 요소를 넣을 때는 안쪽 라운드 = 바깥 라운드 − 안쪽 여백이다. 예: 카드 16에 여백 6이면 안쪽은 10

## Components

shadcn 구성을 뼈대로 하고, 모양은 당근 · 토스를 참고해 우리 기준으로 맞춘다. 이름 · 속성은 코드와 피그마가 같다(`Button` · `variant=primary`)

### 상태와 피드백

상태 모양과 눌림 · 움직임 값을 정한다. 언제 어떤 상태가 되는지는 `docs/UX.md` "상태"를 따른다

| 상태 | 모양 |
| --- | --- |
| 기본 | 버튼 `bg.brand-solid` + `fg.on-brand-solid`. 입력 테두리 `stroke.neutral-weak` 1px |
| 눌림 | 배경을 `-pressed` 토큰으로 바꾸고 2px 줄어든다. 투명 배경은 `bg.transparent-pressed` |
| 선택 | 체크박스 `bg.brand-solid` + 체크 `fg.on-brand-solid`, 테두리 없음. 스위치 트랙 `bg.brand-solid`, 손잡이 크기 1(꺼짐 0.8) |
| 비활성 | 버튼 · 체크박스는 `bg.disabled` + `fg.disabled`. 윤곽 버튼은 배경 투명 + 테두리 `stroke.neutral-muted`. 스위치는 트랙 투명도 0.38. 라벨도 비활성 색 |
| 로딩 | 버튼 배경이 `-pressed` 토큰으로 고정되고 인디케이터 3개를 보인다. 너비를 유지하고 `aria-busy`를 둔다. 비활성과는 따로 다룬다 |
| 포커스 | 입력은 테두리 `stroke.neutral-contrast` 2px. 버튼 · 체크박스는 `stroke.focus-ring` 2px 선 + 2px 띄움 |
| 오류 | 입력은 `stroke.critical-solid` 2px(포커스 중에도 유지) |

- 비활성은 색 교체 하나로 통일한다. `opacity-50`은 쓰지 않고, 스위치만 투명도 0.38을 쓴다
- 눌림 · 선택 · 비활성 · 오류는 모두 같은 토큰 구조를 쓴다. 이 표의 토큰은 모두 YAML `colors`에 있다
- 입력창은 포커스 2px 테두리 하나만 쓰고 포커스 링을 겹쳐 쓰지 않는다

**눌림 줄어듦**

- 비율이 아니라 **고정 거리**로 정한다. 세로로 2px 줄어들어서 큰 요소와 작은 요소의 느낌이 같다
- 기준 길이 `basis = max(높이, 너비 ÷ 4, 24)`, 배율 `scale = (basis − 2) ÷ basis`. 52px 버튼은 50px가 된다
- 2px, 폭 ÷ 4, 최소 24는 모든 화면에 공통인 고정값이라 바꾸지 않는다. 축소는 가운데 기준이고 주변 요소는 움직이지 않는다
- 시간 `duration.pressed-scale` 150ms, 곡선 `timing-function.pressed-scale`

**움직임 값** (소동작 0.2초 이하, 큰 동작 0.2초 초과)

| 토큰 | 값 | 쓰는 곳 |
| --- | --- | --- |
| `duration.d1` ~ `d6` | 50 / 100 / 150 / 200 / 250 / 300ms | |
| `duration.color-transition` | 150ms (d3) | 눌림 색 변화 |
| `duration.pressed-scale` | 150ms (d3) | 눌림 줄어듦 |
| `timing-function.easing` | cubic-bezier(0.35, 0, 0.35, 1) | 버튼 · 포커스 같은 소동작 |
| `timing-function.enter` | cubic-bezier(0, 0, 0.15, 1) | 시트 · 팝업 나타남 |
| `timing-function.exit` | cubic-bezier(0.35, 0, 1, 1) | 시트 · 팝업 사라짐 |
| `timing-function.enter-expressive` | cubic-bezier(0.03, 0.4, 0.1, 1) | 모달 · 시트 나타남(강조) |
| `timing-function.exit-expressive` | cubic-bezier(0.35, 0, 0.95, 0.55) | 강조해서 사라짐 |
| `timing-function.linear` | cubic-bezier(0, 0, 1, 1) | |
| `timing-function.pressed-scale` | cubic-bezier(0, 0, 0.15, 1) | 눌림 줄어듦 |

- 움직임을 언제 쓰고 끌지는 `docs/UX.md` "모션"을 따른다
- '동작 줄이기'가 켜지면 눌림 배율을 1로 계산한다. 무엇을 끌지는 `docs/UX.md` "사용자를 방해하지 않기"를 따른다

**나타나고 사라지는 값**

| 컴포넌트 | 나타남 | 사라짐 |
| --- | --- | --- |
| Toast | 투명 0 + 크기 0.8에서 시작, `d3` 150ms, `enter` | `d2` 100ms, `exit`(같은 크기 · 투명으로) |
| Modal | 뒤 배경 `d2` `enter`. 내용은 크기 1.3에서 시작, `d4` 200ms, `enter-expressive` | 뒤 배경 · 내용 모두 `d2` 100ms, `exit` |
| Bottom sheet | 뒤 배경 `enter` `d6` 300ms. 내용 `d6` 300ms, `enter-expressive` | 뒤 배경 · 내용 `d4` 200ms, `exit` |

### 로딩과 알림 시간

| 항목 | 값 |
| --- | --- |
| 짧은 로딩(저장 · 부분 새로고침) | Spinner, 1~4초 |
| 긴 로딩(목록 · 카드) | Skeleton, 1~10초 |
| 로딩 표시 지연 | 약 0.2초 |
| 로딩 최소 유지 시간 | 약 0.4초 |
| Toast 노출 시간 | 4초. 긴 문장은 더 길게 |

- 걸리는 시간별 로딩 표현(1 · 4 · 10초 · 1분), 시간 초과 10초, 로딩 표현을 겹쳐 쓰지 않는 규칙은 `docs/UX.md` "로딩"을 따른다
- Toast를 한 번에 하나만 보여 주고 손을 대면 멈추는 규칙은 `docs/UX.md` "일시 알림"을 따른다

### 피드백 종류별 컴포넌트

`docs/UX.md` "피드백의 종류"는 5종 중 제자리 메시지와 지속 안내만 컴포넌트를 정했고, 나머지 3종은 이 파일을 따르게 했다. 언제 쓰고 어떻게 닫히는지는 `docs/UX.md` "피드백의 종류"와 "일시 알림"을 따르고, 여기서는 컴포넌트와 토큰만 정한다

| 피드백 | 컴포넌트 | 토큰 |
| --- | --- | --- |
| 일시 알림 | Toast | `toast` |
| 확인 요청 | Modal | `modal` |
| 선택 목록 | Bottom sheet(행동 · 옵션 목록, 선택지가 6개 이상이면 입력 버튼으로 연다) | `bottom-sheet` |
| 제자리 메시지 | Input · Textarea · Select의 안내 · 오류 문구 | `fg.critical` 등 |
| 지속 안내 | Banner | `banner-informative` · `banner-critical` |

### MVP 컴포넌트 19개

| 컴포넌트 | 토큰 연결 | 비고 |
| --- | --- | --- |
| Button | `button-*` | variant: primary / secondary / critical / outline, 크기 Large · Medium |
| Input | `input` · `input-disabled` | 포커스 · 오류 상태는 "상태와 피드백" 표를 따른다 |
| Card | `card` | |
| Badge | `badge-brand` | 다른 톤은 "컴포넌트별 사용 규칙"의 Badge를 따른다 |
| Toast | `toast` | |
| Banner | `banner-informative` · `banner-critical` | |
| Bottom sheet | `bottom-sheet` | shadcn에 없다. 당근 · 토스를 따른다 |
| Modal | `modal` | |
| Select, Textarea, Checkbox, Radio, Switch | 연결 없음 | "컴포넌트별 사용 규칙"에 있는 크기만 쓴다. 거기 없는 박스 · 손잡이 값은 만들기 전에 사람에게 묻는다. 선택 상태는 `bg.brand-weak` / `bg.brand-solid` |
| Tabs | `tabs-*` | 쓰는 법은 "컴포넌트별 사용 규칙"의 Tabs를 따른다 |
| List item | `list-item` · `list-item-detail` · `list-item-pressed` | 눌림은 `bg.transparent-pressed` |
| Top bar | `top-bar` | shadcn에 없다 |
| Avatar, Spinner, Skeleton | `avatar` · `spinner` · `spinner-small` · `skeleton` | 시간 값은 "로딩과 알림 시간" 표를 따른다 |

### 컴포넌트 값

| 컴포넌트 | 값 |
| --- | --- |
| Button Large | 높이 52 · 라운드 12 · 좌우 20 · 라벨 18 bold |
| Button Medium | 높이 44 · 라운드 8 · 좌우 16 · 라벨 14 bold |
| Button outline | Large와 크기가 같다. 배경 투명 · 테두리 `stroke.neutral-muted` 1px · 글자 `fg.neutral`. 눌림 `bg.transparent-pressed` |
| Input Large | 높이 52 · 라운드 12 · 좌우 16 · 글자 16 · 테두리 1px, 포커스 · 오류 2px |
| Toast | 라운드 8 · 여백 10 · 최소 높이 44 · 최대 폭 464 · 글자 14 |
| Banner | 좌우 여백 16 · 위아래 여백 10 · 간격 6 · 최소 높이 40 · 제목 14 bold · 내용 14 medium, 글자 · 아이콘색 `-contrast`, 모서리 없음 |
| Modal | 라운드 20 · 최대 폭 272 · 여백 20 · 제목 20 bold · 내용 16 |
| Bottom sheet | 라운드 24 · 여백 16 |
| Badge | 라운드 6 · 여백 8×4 · 최소 높이 24 · 글자 12(weak 500, solid · outline 700) |
| List item | 위아래 12 · 좌우 16 · 제목 16(`body-lg`) · 보조 13(`body-sm`, `fg.neutral-subtle`) |
| Top bar | 높이 44 |
| Avatar | 크기 48 |
| Spinner | 크기 40(전체 페이지 로딩용). 요소 안에서는 24 |
| Skeleton | 라운드 8 · 16 · full |
| Card | 라운드 16 · 여백 16 · 배경 `bg.layer-default` · 테두리 `stroke.neutral-weak` 1px · 그림자 없음 |

### 컴포넌트별 사용 규칙

**Button**

- 주된 채움 버튼(CTA)은 주황(`bg.brand-solid`)이다
- 채움 버튼은 한 화면에 하나만 둔다

**Banner**

- 화면 맨 위(상단 이미지가 있으면 그 바로 아래)에 전체 폭으로 둔다. 한 화면에 하나만 둔다
- 화면 전체의 상태나 중요한 메시지를 알린다. 특정 입력칸이나 영역에 대한 안내는 제자리 메시지를 쓴다
- 톤은 neutral · informative · positive · warning · critical이다. 글자와 아이콘은 `-contrast` 색을 쓴다
- 제목은 선택이고, 쓸 때는 상태를 나타내는 짧은 말로 한다. 내용은 제목을 반복하지 않는다
- 닫기(X)는 한 번만 보여 줘도 되는 정보에만 쓴다. 경고 · 오류에는 쓰지 않고, 닫은 메시지는 다시 보여 주지 않는다

**Select**

- 입력용 Select는 입력 버튼(고른 값만 보임)을 누르면 Bottom sheet로 선택 목록이 열린다. 입력창 아래로 펼치는 드롭다운은 쓰지 않는다

**Badge**

- 톤 6가지: neutral · brand · informative · positive · warning · critical. 스타일 3가지: solid(배경이 복잡하거나 이미지 위, 강하게 강조), outline(중간 강조), weak(반복되는 화면, 카테고리 태그 · 보조 정보)
- weak는 색이 있는 배경 위에 쓰지 않는다. 브랜드 톤은 브랜드를 드러내는 곳에만 아껴 쓴다
- 한 대상에 1~2개까지, 라벨은 2~3단어이고 10자를 넘으면 말줄임이다. 눌러지는 요소가 아니므로 행동은 Chip · Toggle Button · Action Button을 쓴다
- 글자 굵기와 대비는 SEED Badge를 그대로 따르는 예외다. weak 라벨은 12px · 굵기 500(medium)이고 solid · outline 라벨은 bold(700)다. 브랜드 weak(`fg.brand-contrast` 글자, `bg.brand-weak` 배경)는 Lc 59.7로 60에 조금 못 미친다

**Checkbox · Radio · Switch**

- Checkbox: 크기 Medium · Large. 모양은 Square(필수 선택이거나 꼭 알아야 할 때)와 Ghost(필수가 아니고 3개 이하). 상태는 선택 · 미선택 · 일부 선택(Indeterminate). 그룹은 부모를 고르면 자식이 모두 선택되고, 일부만 선택되면 부모가 일부 선택으로 표시된다
- Radio: 크기 Medium · Large. 단일 선택이다. 세로 배치가 기본이다. 기본 선택 여부와 라디오 대신 선택 목록을 쓰는 기준(선택지 개수)은 `docs/UX.md` "어떤 입력 방식을 쓸지"를 따른다
- Switch: 높이 16 · 24 · 32. 16은 터치 영역을 높이 24로 잡는다. Switch와 Checkbox 중 무엇을 쓸지는 `docs/UX.md` "어떤 입력 방식을 쓸지"를 따른다. 각 Switch는 독립적으로 동작하고, 비활성이면 마크와 라벨 모두 비활성 색이다
- 세 가지 모두 라벨을 포함한 영역(목록에 넣으면 행 전체)이 터치 영역이다

**Textarea · 입력 서식**

- Textarea 높이: 자동 크기를 켜면 최소 3줄(95px), 최대는 정하기 나름이다. 끄면 최소 2줄(70px)이고 최대 높이를 반드시 정하며 넘으면 안에서 스크롤된다
- 주민번호 · 전화번호처럼 형식이 있는 값의 자동 서식은 `docs/UX.md` "입력을 쉽게"를 따른다

**Tabs**

- 높이 44(medium) · 40(small), 좌우 · 상하 여백 10px, 글자 `label-base` 16px(medium) · `label-md` 14px(small) 굵게. 색은 선택 `fg.neutral`, 미선택 `fg.neutral-subtle`, 비활성 `fg.disabled`
- 탭이 5개 이하면 칸을 꽉 채우는 Fill, 6개 이상이거나 라벨이 길면 라벨 길이에 맞추는 Hug를 쓴다. 알림 배지는 여러 탭에 동시에 달지 않고, 내용을 확인하면 사라진다

## Do's and Don'ts

`/ui-review`가 이 목록을 점검표로 쓴다. "(웹 프로토타입에서 확인 불가)" 표시가 있는 항목은 건너뛴다

### 토큰

- [ ] 화면과 컴포넌트에는 쓰임새 이름 토큰(`bg.*` · `fg.*` · `stroke.*`)만 쓴다
- [ ] 간격은 `space.*`, 모서리는 `radius.*`만 쓴다
- [ ] `palette.*`를 화면이나 컴포넌트에서 직접 쓰지 않는다
- [ ] 토큰에 없는 색 · 간격 · 모서리 · 그림자 값을 새로 만들지 않는다
- [ ] 다크모드 값을 지금 추가하지 않는다

### 색 · 글자

- [ ] 글자에 브랜드 색을 쓸 때는 `fg.brand-contrast`를 쓴다
- [ ] `fg.brand`는 글자색으로 쓰지 않는다(Lc 54.8로 기준 60에 못 미침)
- [ ] 연한 배경(`bg.*-weak`) 위 글자는 `fg.*-contrast`를 쓴다
- [ ] 연한 배경(`bg.*-weak`) 위에 `fg.critical` · `fg.informative` 같은 700단계 글자를 쓰지 않는다
- [ ] 주황(`bg.brand-solid`) 위 흰 글자는 굵은 버튼 라벨에만 쓴다(APCA Lc 60.1)
- [ ] `fg.brand-contrast`(Lc 66.0)를 두 줄 이상 본문 문장에 쓰지 않는다. 본문은 `fg.neutral`이다
- [ ] 흰 배경 위 Lc 75 미만 글자색(`fg.neutral-subtle` · `fg.brand-contrast` · `fg.warning` · `fg.positive` · `fg.informative` · `fg.critical`)은 16px 미만이면 굵게(700) 쓴다. Badge weak 라벨(500)과 List item 보조 글자(13px 보통 굵기)는 예외다
- [ ] 한 화면에서 쓰는 글자 크기는 4단계 이내다
- [ ] 아이콘은 Lucide만 쓴다

### 컴포넌트 · 상태

- [ ] 누르는 영역이 공간이 부족한 곳에서도 `space.touch-min-sm`(24×24px) 이상이다
- [ ] 면 색과 바로 뒤 바탕 색이 같으면 `stroke.neutral-weak` 1px 테두리로 구분한다
- [ ] 눌림은 `-pressed` 토큰과 150ms 줄어듦으로 표현한다
- [ ] 비활성 요소에 눌림 · 선택 모양을 겹쳐 쓰지 않는다
- [ ] 로딩 중인 버튼은 로딩 전과 너비가 같다
- [ ] 채움 버튼(`button-primary` · `button-critical`)은 한 화면에 하나만 둔다
- [ ] 닫기 성격의 보조 버튼과 채움 버튼을 나란히 둘 때 너비 비율은 3:7로 한다
- [ ] 한 버튼에 앞 아이콘과 뒤 아이콘을 함께 쓰지 않는다
- [ ] Banner는 한 화면에 하나만 둔다
- [ ] 닫을 수 있는 Banner에 경고 · 오류를 담지 않는다

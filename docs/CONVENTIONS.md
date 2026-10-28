# CONVENTIONS.md

파일 위치 · 이름 · MD 작성 규칙이다. 사람용 요약은 Notion Task "저장소 구조·네이밍 규칙"(1-0) 카드에 있다

> 상태: 초안

## 파일 위치

```plain text
repo/
├─ README.md              # 사람용 첫 안내
├─ AGENTS.md              # AI 작업 지시 (CLAUDE.md가 불러옴)
├─ CLAUDE.md              # Claude Code 진입점
├─ .gitignore             # 올리지 않을 파일(.env 비밀 값, node_modules 등)
├─ PROGRESS.md            # 현재 상태 (CLAUDE.md가 불러옴)
├─ DESIGN.md              # 기본 토큰 + 테마 프리셋(YAML) + 시각 규칙
├─ docs/
│  ├─ CONVENTIONS.md
│  ├─ UX.md
│  ├─ WRITING.md
│  ├─ PATTERNS.md
│  ├─ BRIEF.md
│  └─ components/        # 컴포넌트별 사용법 (자동 생성)
├─ briefs/                # 화면 요청 브리프. `owner` 값이 화면 주인 (화면 작업자)
├─ evals/                 # 평가 시나리오와 결과
├─ src/
│  ├─ components/ui/     # 컴포넌트 코드
│  ├─ styles/tokens.css  # DESIGN.md에서 자동 생성
│  └─ app/
│     ├─ docs/           # 라이브러리: 기본 테마 토큰·컴포넌트 갤러리 (시스템 관리자)
│     └─ prototypes/     # 화면별 프로토타입. 폴더 하나 = 화면 하나 = 링크 하나 (화면 작업자)
├─ .github/
│  ├─ pull_request_template.md
│  └─ assets/            # README 등 문서에 쓰는 이미지
└─ .claude/
   ├─ settings.json      # 팀 공유 차단 설정(main 직접 commit·push, force push 막기)
   ├─ hooks/             # 차단 설정이 실행하는 스크립트
   ├─ rules/             # AGENTS.md에서 나눈 상세 규칙. Claude Code가 자동으로 읽음(일부는 `paths`로 해당 파일을 다룰 때만)
   └─ skills/            # sync, pull, audit, brief, generate-screen, theme, ui-review
```

- "자동 생성" 파일은 직접 고치지 않는다. 원본을 고치고 `/sync`로 다시 만든다

## 공통 이름 규칙

아래 표에 따로 정한 것이 없으면 이 규칙을 따른다

| 대상 | 규칙 | 예시 |
|---|---|---|
| 폴더·파일·브랜치 | 소문자 + 대시(kebab-case). 띄어쓰기·언더바(`_`)·대문자를 쓰지 않는다 | `src/components/ui/`, `bottom-sheet.tsx` |
| 예외: 규칙 문서 | 대문자 이름 + `.md` | `AGENTS.md`, `docs/UX.md` |
| 예외: 컴포넌트·아이콘 이름 | PascalCase (아래 "코드·피그마") | `BottomSheet` |
| `.claude/` 안의 규칙·훅·스킬 | kebab-case | `rules/session-start.md`, `hooks/guard-git.sh`, `skills/generate-screen/` |
| GitHub 조직·저장소 | kebab-case. 주소: `https://github.com/ai-study-clickclick/design-system` | `ai-study-clickclick/design-system` |

## 디자인 토큰

| 대상 | 규칙 | 예시 |
|---|---|---|
| 1단 기본 색표(Primitive) | `palette.<색>-<단계>`. 실제 색 값 | `palette.orange-600`, `palette.gray-1000` |
| 2단 쓰임새 이름(Semantic) | `<쓰임새>.<이름>`. 1단 색을 가리킨다. 화면·컴포넌트에는 쓰임새 이름만 쓴다 | `bg.brand-solid`, `bg.neutral-weak`, `fg.neutral`, `stroke.neutral-weak` |
| 색 외 토큰 | `<종류>.<단계>` | `space.4`, `radius.md` |
| 글자 스타일 | `<역할>-<크기>` | `title-lg`, `body-md`, `label-sm` |
| 토큰 참조 | 중괄호로 다른 토큰을 가리킨다(W3C DTCG 방식) | `{palette.orange-600}` |
| 피그마 Variables | 토큰 이름의 `.`을 `/`로 바꾼다 | `bg/brand-solid` |
| 테마 프리셋 | `theme.<name>`. 대표 컬러 1개(`brand.primary`)와 라운드 기준값(`radius.base`)만 정한다. 기본 토큰은 바꾸지 않는다 | `theme.ocean` |
| 브랜드 색 단계 | `brand.primary`에서 `palette.brand-100` ~ `palette.brand-900` 단계를 자동 생성한다(OKLCH 명도 단계). 쓰임새 이름(`bg.brand-solid` 등)은 이 단계를 가리키므로 대표 컬러만 바꿔도 함께 바뀐다. 예외: 기본 테마(`theme.default`)는 다시 계산하지 않고 `palette.orange-100` ~ `palette.orange-900`을 그대로 가리킨다 | `{palette.brand-600}` |
| 라운드 단계 | `radius.base`에서 나머지 단계를 비율로 계산한다. 단계 이름 · 비율은 `DESIGN.md` `rounded`를 따른다 | `radius.md` |
| DESIGN.md 안의 토큰 참조 | DESIGN.md는 Stitch 형식이라 그룹 이름을 앞에 붙인다. 위의 `{palette.orange-600}`은 `{colors.palette.orange-600}`로 쓴다 | `{colors.palette.orange-600}` |

## 코드·피그마

| 대상 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 이름 | PascalCase. 이름·속성은 shadcn/ui · 당근 · 토스를 비교해 정한다 | `Button` |
| 아이콘 | Lucide 아이콘 이름 그대로 | `ChevronRight` |
| 컴포넌트 파일 | kebab-case | `button.tsx` |
| 피그마 컴포넌트 | 코드와 같은 이름. Variant 속성명·값도 코드 props와 같게 | `Button` → `variant=primary, size=md` |
| 브리프·평가 파일 | `YYMMDD-topic.md` | `261014-login.md` |
| 프로토타입 화면 | 폴더 `src/app/prototypes/YYMMDD-topic/`, 주소 `/prototypes/YYMMDD-topic`. 브리프와 같은 이름 | `/prototypes/261014-login` |
| 피그마 Generated 화면 | 프로토타입과 같은 이름의 프레임 | `261014-login` |

## Git

| 대상 | 규칙 | 예시 |
|---|---|---|
| 브랜치 | `type/step-topic`. 앞의 `docs/`·`feat/`는 작업 종류 표시일 뿐 폴더가 아니다. 파일 위치는 위 "파일 위치"를 따른다(예: `docs/1-3-ux-md` 브랜치에서도 파일은 `docs/UX.md`) | `docs/1-2-design-md` |
| 하위 브랜치 | `type/step-topic-detail`. 태스크 브랜치로 PR한다 | `docs/1-2-design-md-color` |
| 태스크 외 브랜치 | `chore/topic` | `chore/remove-test-md` |
| 화면 작업 브랜치 | `screen/YYMMDD-topic` | `screen/261014-login` |
| 커밋 메시지 | [Conventional Commits](https://www.conventionalcommits.org/) `type(step): 요약`. 화면 작업은 scope에 `screen`, 태스크 외는 scope 생략 | `docs(1-2): 컬러 토큰 추가` · `feat(screen): 로그인 화면` |
| PR 제목 | 커밋 메시지와 같은 형식(Squash merge 시 main 커밋 메시지가 됨) | `docs(1-2): DESIGN.md 초안` |

`type` 값:

| type | 쓰는 경우 |
|---|---|
| `docs` | MD 문서 작성·수정 |
| `feat` | 컴포넌트·스킬·화면 등 새 기능 |
| `fix` | 잘못된 동작·값 수정 |
| `refactor` | 동작 변화 없는 구조 정리 |
| `chore` | 설정·파일 정리 등 그 외 |

## MD 작성

### 적용 범위

| 문서 | 따르는 규칙 |
|---|---|
| 모든 MD (아래 예외 제외) | 공통 |
| 규칙 문서(`DESIGN.md` · `docs/UX.md` · `docs/WRITING.md` · `docs/PATTERNS.md`) | 공통 + 규칙 문서 |
| `README.md` · `.github/pull_request_template.md` | 공통. 사람용이라 말투만 "~합니다" |
| 스킬(`.claude/skills/*/SKILL.md`) | 공통. 머리(frontmatter)는 Claude Code 스킬 형식을 따른다 |
| 자동 생성 문서(`docs/components/*.md`) | 공통. 스킬 템플릿에서 맞추고 파일은 직접 고치지 않는다 |
| 작업 결과물(`briefs/` · `evals/`) | `docs/BRIEF.md` 양식과 파일 이름 규칙만. 사용자 요청 문장은 고치지 않는다 |

### 공통

말투

- 문서 본문은 "~한다"로 쓴다
- 사용자 화면에 들어갈 문구는 `docs/WRITING.md`의 화면 말투를 따른다. 문서 안에 예시로 쓸 때는 따옴표로 감싼다(예: 버튼 "저장하기")
- 화면 문구 예시 · 코드 · 인용은 말투 · 마침표 규칙에서 제외한다

마침표

- 줄 끝(목록 · 표 칸 · 제목 · 문단)에는 찍지 않는다
- 한 줄에 문장이 둘 이상이면 문장 사이에만 찍는다

표기

- 토큰 · 키 · 파일명은 영어, 설명은 한글로 쓴다
- 파일명 · 토큰 · 명령은 백틱으로 감싼다
- 키는 위 "디자인 토큰"의 점 표기와 같게 쓴다

번호 · 링크

- 써도 되는 것: 태스크 번호, 규칙 값(px · 초), 문서 버전, 같은 문서 안 장 번호
- 쓰지 않는 것: Notion 링크, PR 번호, 날짜, 줄 수, 다른 문서의 장 번호
- 다른 문서는 파일 경로 + 장 제목으로 가리킨다(예: `docs/UX.md` "로딩")
- 외부 링크는 규칙을 따르는 데 필요한 표준 문서만 쓴다(예: Conventional Commits)
- 예외: 파일 이름 규칙의 날짜(`YYMMDD`)

쓰는 것과 쓰지 않는 것

| 구분 | MD | 예 |
|---|---|---|
| 규칙 · 값 | 쓴다 | 누르는 영역 44px |
| 판단 근거: AI가 규칙에 없는 상황을 판단할 때 필요한 이유 | 규칙 옆에 한 줄로 쓴다 | 손가락으로 정확히 누를 수 있는 크기 |
| 따를 기준: 값을 정할 때 참고할 라이브러리 | 이름만 쓴다(버전 · 주소 없이) | 배지 글자는 SEED Badge를 따른다 |
| 출처: 값을 가져온 곳 | 쓰지 않는다. PR 본문 "근거" 표에 쓴다 | SEED CSS 3.0.3의 값 |
| 히스토리: 문서 작성 방식 · 형식을 고른 이유 · 비교표 · 결정 과정 · 바뀐 내용 | 쓰지 않는다. 필요하면 Notion · PR에 쓴다 | Stitch 형식을 고른 이유 |
| 담당자 이름 | 쓰지 않는다(`PROGRESS.md` 제외) | — |

- 헷갈리면 "AI가 화면을 만들 때 이 문장이 필요한가"로 판단한다. 필요하면 근거 · 기준, 검수하는 사람만 필요하면 출처다

표시

| 표시 | 뜻 | 쓰는 곳 | AI 행동 |
|---|---|---|---|
| 표시 없음 | 지킨다 | 모든 문서 | 지킬 수 없으면 만들기 전에 사람에게 묻는다 |
| `[권장]` | 기본으로 따른다 | 규칙 문서 | 브리프에 다른 요청이 있으면 그것을 따른다 |
| `[결정 필요]` | 팀 확정 전 | 모든 문서 | 함께 적힌 임시 값을 따른다. 임시 값이 없으면 지어내지 않고 사람에게 묻는다 |
| (웹 프로토타입에서 확인 불가) | 점검 범위 밖 | 규칙 문서 | `/ui-review`가 점검을 건너뛴다. 규칙은 지킨다 |

- 규칙 · 표 · 설명 문장 모두 표시가 없으면 지킨다. 강도가 낮은 규칙에만 `[권장]`을 붙인다
- 기준 문서에서 값을 찾지 못하면 임의로 넣지 않고 `[결정 필요]`로 표시한다
- `[결정 필요]`는 정해지면 지운다. 값의 출처는 MD에 표시하지 않고 PR 본문 "근거" 표에 남긴다(출처가 없으면 "없음")
- 표시의 정의는 이 장에만 둔다. 다른 문서는 이 장을 가리킨다

### 규칙 문서

- 머리: 제목 아래에 `> 상태: 초안 v0.x · 태스크: 1-x`, 이어서 다루는 범위와 다른 문서와의 경계를 한 줄씩 쓴다
- 버전: 내용이 바뀌는 PR마다 0.1 올린다. 팀이 확정하면 v1.0으로 한다
- `DESIGN.md`: 맨 위 YAML(Stitch 형식)은 그대로 두고 머리는 YAML 바로 아래에 둔다. 장 제목은 Stitch 장 이름을 따른다. YAML 주석에는 값 설명만 쓴다
- 맨 끝은 `## Do's and Don'ts`다. 뒤에 다른 장을 두지 않는다
- Do's 항목은 한 줄에 하나씩, 맞는지 확인할 수 있는 문장으로 쓴다(`/ui-review`가 이 목록으로 점검). 항목 아래에 하위 줄(출처 등)을 두지 않는다. 형식:

  ```markdown
  ## Do's and Don'ts

  `/ui-review`가 이 목록을 점검표로 쓴다. "(웹 프로토타입에서 확인 불가)" 표시가 있는 항목은 건너뛴다

  ### <주제>

  - [ ] <해야 할 것: "~한다". 숫자 · 이름을 넣어 확인할 수 있게>
  - [ ] <하지 말 것: "~하지 않는다">
  - [ ] <프로토타입에서 확인할 수 없는 항목> (웹 프로토타입에서 확인 불가)
  ```

- 같은 규칙은 한 문서에만 쓴다. 다른 문서에서는 그 문서를 가리킨다

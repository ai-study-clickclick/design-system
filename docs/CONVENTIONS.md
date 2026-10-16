# CONVENTIONS.md

파일 위치와 이름 규칙입니다. 사람용 요약은 Notion Task "저장소 구조·네이밍 규칙"(1-0) 카드에 있습니다.

> 상태: 초안. 1-0 태스크에서 확정합니다.

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

아래 표에 따로 정한 것이 없으면 이 규칙을 따른다.

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
| 2단 쓰임새 이름(Semantic) | `<쓰임새>.<이름>`. 1단 색을 가리킨다. 화면·컴포넌트에는 쓰임새 이름만 쓴다 | `bg.brand-solid`, `bg.neutral`, `fg.neutral`, `stroke.neutral` |
| 색 외 토큰 | `<종류>.<단계>` | `space.4`, `radius.md`, `font.size.16` |
| 토큰 참조 | 중괄호로 다른 토큰을 가리킨다(W3C DTCG 방식) | `{palette.orange-600}` |
| 피그마 Variables | 토큰 이름의 `.`을 `/`로 바꾼다 | `bg/brand-solid` |
| 테마 프리셋 | `theme.<name>`. 대표 컬러 1개(`brand.primary`)와 라운드 기준값(`radius.base`)만 정한다. 기본 토큰은 바꾸지 않는다 | `theme.ocean` |
| 브랜드 색 단계 | `brand.primary`에서 `palette.brand-50` ~ `palette.brand-900` 단계를 자동 생성한다(OKLCH 명도 단계). 쓰임새 이름(`bg.brand-solid` 등)은 이 단계를 가리키므로 대표 컬러만 바꿔도 함께 바뀐다 | `{palette.brand-600}` |
| 라운드 단계 | `radius.base`에서 `radius.sm` · `radius.md` · `radius.lg`를 비율로 계산한다 | `radius.md` |

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

- 토큰·키·파일명은 영어, 설명은 한글로 쓴다
- 키 표기는 위 토큰 규칙의 점 표기와 같게 쓴다
- 규칙 문서(`DESIGN.md` · `docs/UX.md` · `docs/WRITING.md` · `docs/PATTERNS.md`)는 끝에 `## Do's and Don'ts` 섹션을 둔다. 한 줄에 하나씩, 맞는지 확인할 수 있는 문장으로 쓴다(`/ui-review`가 이 목록으로 점검). 형식:

  ```markdown
  ## Do's and Don'ts

  `/ui-review`가 이 목록을 그대로 점검표로 씁니다. "(웹 프로토타입에서 확인 불가)" 표시가 있는 항목은 건너뜁니다.

  ### <주제>

  - [ ] <해야 할 것: "~한다". 숫자·이름을 넣어 확인할 수 있게>
  - [ ] <하지 말 것: "~하지 않는다">
  - [ ] <프로토타입에서 확인할 수 없는 항목> (웹 프로토타입에서 확인 불가)
  ```
- 같은 규칙은 한 문서에만 쓴다. 다른 문서에서는 그 문서를 가리킨다

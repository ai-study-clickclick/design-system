# PROGRESS.md

현재 상태다. AI는 세션 시작 때 이 파일과 `git log`를 함께 읽는다. 갱신 규칙은 `.claude/rules/docs.md` "PROGRESS.md"를 따른다.
지금 누가 무엇을 하는지는 Notion Task DB와 열린 PR이 기준이다

## 지금 단계

**1 Rules MD 마무리 · 2 Code 시작** — 규칙 문서 `[결정 필요]` 정리, 컴포넌트 코드 · 피그마 Variables 시작

## 진행 중 · 다음 할 일

| Step | 할 일 | 상태 |
|---|---|---|
| 2-3 | MVP 컴포넌트 19개 + Calendar(임시) 코드 · 2-4 갤러리(`/docs/components`). 값이 없는 부분은 SEED 값 임시 | 진행 중 (한나) |
| 1-2 · 1-4 | `DESIGN.md` 쌓인 수정(크기 표기 · 상자 크기 · 하단 고정 배치 값 · 그림자 · Spinner 색) · `WRITING.md` 엄격한 화면 | 다음 할 일 (예은) |
| 1-5 · 4-2 | `PATTERNS.md` `[결정 필요]` 정리 · `/ui-review` | 진행 중 (유진) |
| 1-6 · 1-7 | `BRIEF.md` · `/brief` v0.5 · 평가 가이드 | 다음 할 일 (지수) |
| 3-1 | `/sync` 2단계: 토큰 → 피그마 Variables | 다음 할 일 (수진) |
| 1-6-1 | 브리프 테스트(v0.4) | 진행 중 (예린 · 전원) |

## 주의 사항

- 저장소는 organization(`ai-study-clickclick/design-system`)으로 이전해 공개. main 보호: PR 필수 · 승인 2명 · Squash merge만.
- 2차 미팅에서 MVP 범위 · 참고 라이브러리 · 레인 담당 · GitHub 운영을 정함. 요약은 `AGENTS.md` "확정된 기준", 원문은 Notion Meeting "2차 미팅".
- 3차 미팅에서 A안(새 태스크 대신 작성한 MD 형식 통일 · 교차 검토 1주)을 정함. 다음 태스크(2-1 · 1-4 · 1-5 · 1-7 · 3-3 준비 · 4-x 준비) 담당은 다음 미팅에서 정함.
- 1-2에서 `DESIGN.md` 팀 결정 6개를 확정함: 기준 화면 폭 375px · 최대 480px, 로딩 표시 지연 0.2초(이후 SEED Loading 패턴에 맞춰 1초로 변경) · 최소 유지 0.4초, 주된 CTA는 주황, Banner는 SEED Page Banner 값, Select는 입력 버튼 + Bottom sheet, SEED에 없는 크기. 값은 `DESIGN.md`가 기준.
- 기본 테마 라운드는 SEED 값을 기준으로 한다("큰 라운드"를 SEED 값으로 해석). 화면 작업에서 작게 느껴지면 `radius.base`를 다시 정한다(`DESIGN.md` "Shapes").
- 2-4의 토큰 화면과 사이트 틀(위 메뉴 · 왼쪽 메뉴 · 목차)은 2-2로 옮겼다. 2-4에는 컴포넌트 갤러리만 남는다(2-3 후 `feat/2-4-docs`에서 `git merge origin/main`으로 이어 가고, 겹치는 파일은 main 쪽을 남긴다).
- 컴포넌트 크기 표기는 줄임말(`sm` · `md` · `lg`)로 정했다(`docs/CONVENTIONS.md` "코드·피그마"). `DESIGN.md` 본문 · YAML 토큰 이름은 아직 Large · Medium · `button-medium` 표기라 `DESIGN.md` 담당이 맞춘다.
- 6차 미팅에서 이름 · 표기처럼 작은 결정은 그 내용을 적는 문서의 담당자가 정하기로 함(`AGENTS.md` "확정된 기준")
- 규칙 담당 결정: 하단 고정 버튼은 새 컴포넌트가 아니라 Button 배치 패턴이다(MVP 19개 그대로). 여백 · 안전 영역 · 버튼 뒤 배경 값은 `DESIGN.md`에 아직 없다.
- 2-3에서 `DESIGN.md`에 없는 값(Checkbox · Radio · Switch 크기, outline `md`, Spinner tone 색, 그림자, Textarea 높이, Calendar)은 SEED 값으로 `src/styles/temp-tokens.css`에 임시로 뒀다. `DESIGN.md` 담당이 반영하면 그 파일에서 지운다. Calendar는 MVP 19개 밖 임시 추가라 8차 미팅에서 확정한다.
- 규칙 문서 형식 통일은 `docs/CONVENTIONS.md` "MD 작성"을 따른다
- 6차 미팅에서 화면 상태를 정상 + 조건에 맞는 묶음(기다림 · 비어 있음 · 실패 · 이용 불가)으로 정함. 정의는 `docs/UX.md` "상태", 화면 성격별 장면은 `docs/PATTERNS.md` "화면 성격별 상태 장면"이 기준이다.
- 여러 단계 절차 규칙(`.claude/rules/`의 `session-start.md` · `git.md` · `notion.md`)은 4-x 스킬 작업 때 스킬로 옮긴다
- 4-x에서 `/pull` 스킬을 만들 때 스킬 안에서 `.claude/rules/sync.md`를 읽게 한다(`sync.md`는 `src/` 등을 다룰 때만 자동으로 읽혀서, 말로만 시키면 안 읽힐 수 있음). `/sync`는 2-2에서 반영했다.
- 7차 미팅에서 같은 내용은 한 곳에만 적기로 함. 규칙 · 작업 방식은 저장소(사람용 안내는 `README.md`), Notion에는 회의록 · 테스트 결과 · 일정 · 태스크만 둔다(`.claude/rules/docs.md` "문서 연결").
- Vercel은 무료(Hobby)로 쓰기 위해 한나 개인 계정에 프로젝트를 만들었다. 메인 주소는 `clickclick-design-system.vercel.app`이다. 참고할 점:
  - 미리보기 링크는 누구나 볼 수 있지만, Vercel 관리 화면(빌드 로그 · 설정 · 도메인)은 한나만 들어갈 수 있다. 빌드가 깨지면 한나에게 알린다.
  - 무료 요금제는 계정 주인이 아닌 사람의 커밋 배포를 막을 수 있다. 2-1이 머지된 뒤 처음 브랜치를 올리는 사람은 커밋 옆 Vercel 표시나 PR의 Vercel 댓글에 미리보기 링크가 생겼는지 보고, 안 생기면 한나에게 알린다.
  - 팀원도 관리해야 하면 Vercel 팀 계정(Pro, 유료)을 만들어 프로젝트를 옮긴다. 미리보기 주소 방식은 그대로다.

# PROGRESS.md

현재 상태다. AI는 세션 시작 때 이 파일과 `git log`를 함께 읽는다. 갱신 규칙은 `.claude/rules/docs.md` "PROGRESS.md"를 따른다
지금 누가 무엇을 하는지는 Notion Task DB와 열린 PR이 기준이다

## 지금 단계

**1 Rules MD** — 작성한 규칙 문서 검토 주간: 형식 통일 · 교차 검토

## 진행 중 · 다음 할 일

| Step | 할 일 | 상태 |
|---|---|---|
| 0-5 | 각자 Claude Code ↔ GitHub 연결, 차단 설정 동작 확인 | 진행 중 (전원) |
| 1-0 · 1-1 | `CONVENTIONS.md` 브랜드 색 단계 예외 · 라운드 단계, `AGENTS.md` 기본 라운드 문구 | 진행 중 (한나, 1-2 머지 후 PR) |
| 1-2 | `DESIGN.md` 형식 통일, 팀 결정 6가지 임시 결정 | 다음 할 일 (예은, 1-0 형식 규칙 머지 후) |
| 1-3 | `docs/UX.md` 형식 통일 | 다음 할 일 (유진, 1-0 형식 규칙 머지 후) |
| 1-2 · 1-3 검토 | `DESIGN.md` 교차 검토(수진 · 한나), `docs/UX.md` · `docs/CONVENTIONS.md` 교차 검토(유진) | 진행 중 |
| 1-6 | `docs/BRIEF.md` 초안: 화면 요청 양식, 짧은 요청 처리 기준 | 진행 중 (지수) |
| 3-2 준비 | MVP 컴포넌트 19개 이름 · 속성 비교표(shadcn · 당근 · 토스) | 다음 할 일 (수진, `DESIGN.md` 수정 반영) |

## 주의 사항

- 저장소는 organization(`ai-study-clickclick/design-system`)으로 이전해 공개. main 보호: PR 필수 · 승인 2명 · Squash merge만
- 2차 미팅에서 MVP 범위 · 참고 라이브러리 · 레인 담당 · GitHub 운영을 정함. 요약은 `AGENTS.md` "확정된 기준", 원문은 Notion Meeting "2차 미팅"
- 3차 미팅에서 A안(새 태스크 대신 작성한 MD 형식 통일 · 교차 검토 1주)을 정함. 다음 태스크(2-1 · 1-4 · 1-5 · 1-7 · 3-3 준비 · 4-x 준비) 담당은 다음 미팅에서 정함
- 규칙 문서 형식 통일은 `docs/CONVENTIONS.md` "MD 작성"을 따른다
- 여러 단계 절차 규칙(`.claude/rules/`의 `session-start.md` · `git.md` · `notion.md`)은 4-x 스킬 작업 때 스킬로 옮긴다
- 4-x에서 `/sync` · `/pull` 스킬을 만들 때 스킬 안에서 `.claude/rules/sync.md`를 읽게 한다(`sync.md`는 `src/` 등을 다룰 때만 자동으로 읽혀서, 말로만 `/sync`를 시키면 안 읽힐 수 있음)

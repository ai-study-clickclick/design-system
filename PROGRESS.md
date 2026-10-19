# PROGRESS.md

현재 상태입니다. AI는 세션 시작 때 이 파일과 `git log`를 함께 읽습니다. 갱신 규칙은 `.claude/rules/docs.md`의 "PROGRESS.md"를 따릅니다.
지금 누가 무엇을 하는지는 Notion Task DB와 열린 PR이 기준입니다.

## 지금 단계

**0 Setup** — 준비 마무리 중. 규칙 문서(`AGENTS.md` · `docs/CONVENTIONS.md`)는 초안입니다.

## 진행 중 · 다음 할 일

| Step | 할 일 | 상태 |
|---|---|---|
| 0-2 | 디자인 시스템 라이브러리 분석 | 결정 완료, 카드 Done 처리 남음 |
| 0-5 | 각자 Claude Code ↔ GitHub 연결 확인 | 진행 중 |
| 1-0 | `docs/CONVENTIONS.md` 확정 | PR #8 리뷰 중 (1-1과 함께 확정) |
| 1-1 | `AGENTS.md` 하네스 보완(규칙 분리 `.claude/rules/` · 차단 설정 `.claude/settings.json`) | PR #8 리뷰 중 (한나, 1-0 함께 확정) |
| 1-2 | `DESIGN.md` 공부·검토, 정해야 할 것 정리(시간 되면 초안) | 다음 할 일 (예은) |
| 3-2 준비 | MVP 컴포넌트 19개 이름·속성 비교표 초안(shadcn·당근·토스) | 다음 할 일 (수진) |
| 1-6 | `docs/BRIEF.md` 초안 v0.1 작성 | 진행 중 (지수, PR 대기) |
| 4-x 준비 | Claude Code 스킬 공부, 4-1 `/brief` 흐름 메모 | 다음 할 일 (지수) |

## 주의 사항

- 저장소는 organization(`ai-study-clickclick/design-system`)으로 이전해 공개 전환했고, main 보호 설정(PR 필수 · 승인 2명 · Squash merge만)이 완료됐습니다
- 2차 미팅(2026-10-14)에서 MVP 범위·참고 라이브러리·레인 담당·GitHub 운영을 정했습니다. 요약은 `AGENTS.md` "확정된 기준", 원문은 Notion Meeting "2차 미팅"(https://app.notion.com/p/3f1b2380e7d780fdbba4f8c4191a8ec3)
- 여러 단계 절차 규칙(`.claude/rules/`의 `session-start.md`·`git.md`·`notion.md`)은 4-x 스킬 작업 때 스킬로 옮깁니다(1-1 하네스 리서치 결론)
- 4-x에서 `/sync`·`/pull` 스킬을 만들 때 스킬 안에서 `.claude/rules/sync.md`를 읽게 합니다(`sync.md`는 `src/` 등을 다룰 때만 자동으로 읽혀서, 말로만 `/sync`를 시키면 안 읽힐 수 있음)

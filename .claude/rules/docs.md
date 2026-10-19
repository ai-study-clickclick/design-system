---
paths:
  - "**/*.md"
  - ".claude/**"
  - ".github/**"
---

# 문서 관리

## PROGRESS.md

- 현재 상태만 적는다: 지금 단계 / 진행 중·다음 할 일 / 주의 사항
- 지난 작업 기록은 적지 않는다. 이력은 git log와 PR이 대신한다
- 끝난 태스크는 표에서 지우고, 새로 시작할 수 있게 된 태스크를 올린다

## 문서 연결

한 곳을 바꾸면 아래도 같은 PR(Notion은 같은 날)에서 고친다.

| 바뀐 것 | 함께 고칠 것 |
|---|---|
| `AGENTS.md` · `CLAUDE.md` · `.claude/rules/` · `.claude/settings.json` | Notion 1-1 카드의 사람용 요약 · `.github/pull_request_template.md` 체크리스트 · `AGENTS.md` 규칙 지도 |
| `docs/CONVENTIONS.md` | Notion 1-0 카드의 사람용 요약 |
| 파일 추가·이동 | `docs/CONVENTIONS.md` 파일 위치 · AI가 꼭 읽어야 하면 `CLAUDE.md` |
| 스킬 추가·변경 | `AGENTS.md`의 스킬 표 · `docs/CONVENTIONS.md` 스킬 목록 · Notion 실행 계획의 스킬 표 |
| 태스크 추가·삭제·순서 변경 | `AGENTS.md`의 레인 표 · `PROGRESS.md` |
| 팀 결정 확정 | 해당 규칙 문서 · `PROGRESS.md` 주의 사항 · 결정이 바뀌었으면 Notion Meeting 페이지의 해당 Decisions 아래에 "이후 변경" 메모(원문은 지우지 않음) |

- Notion과 규칙 파일(`AGENTS.md` · `.claude/rules/`)이 다르면 규칙 파일이 기준이다. 사용자에게 알리고 Notion 쪽 수정을 요청한다

## 규칙 추가

새 규칙은 규칙만 모은 파일을 따로 만들지 않는다. 아래 순서로 처음 맞는 곳에 넣는다.

| 순서 | 규칙 성격 | 넣는 곳 |
|---|---|---|
| 1 | 기계로 확인해 막을 수 있다 | 차단 설정(`.claude/settings.json` · `.claude/hooks/`) · GitHub 설정 |
| 2 | 결과물을 점검하면 된다 | 린트 · `/ui-review` · `/audit` |
| 3 | 여러 단계 절차다 | 스킬(`.claude/skills/`). 스킬을 만들기 전(4-x)까지는 `.claude/rules/` |
| 4 | 특정 파일·폴더에서만 필요하다 | `.claude/rules/` + `paths` |
| 5 | 디자인·UX·문구·화면 규칙이다 | 해당 규칙 문서의 Do's and Don'ts(`docs/CONVENTIONS.md` "MD 작성") |
| 6 | 판단이 필요한 핵심 원칙이다 | `AGENTS.md`(짧게) |

- 규칙 파일(`AGENTS.md` · `CLAUDE.md` · `.claude/rules/*.md`)은 각각 200줄 이하로 둔다. 넘으면 성격별로 나눈다
- 규칙은 미리 다 만들지 않는다. AI가 실수하거나 같은 지적이 반복될 때 하나씩 추가한다

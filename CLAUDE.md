@AGENTS.md
@PROGRESS.md
@docs/CONVENTIONS.md

## Claude Code

- `.claude/rules/`의 규칙은 함께 자동으로 읽힌다. 세션을 시작하면 `.claude/rules/session-start.md` 순서부터 따른다
- `.claude/settings.json`의 차단 설정(main 직접 commit·push, force push)은 우회하지 않는다. 막히면 사용자에게 이유를 알리고 브랜치 → PR로 안내한다
- 모델·노력 수준은 Notion 카드의 `AI 설정`(추천값)을 참고해 `/model`에서 고른다

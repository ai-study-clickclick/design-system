#!/bin/sh
# Bash 실행 전에 Claude Code가 호출한다. 아래 Git 명령을 막는다(종료 코드 2 = 차단, 메시지는 Claude에게 전달됨).
# - 어떤 브랜치에서든 force push
# - main으로 push
# - main 브랜치에 있을 때 commit·push
# 규칙 원문: .claude/rules/git.md

input=$(cat)
if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)
else
  # jq가 없는 PC: 입력 전체에서 찾는다(조금 더 많이 막을 수 있지만 놓치지는 않음)
  cmd=$input
fi
[ -z "$cmd" ] && exit 0

block() {
  echo "차단됨: $1 브랜치에서 작업하고 PR로 합쳐 주세요(.claude/rules/git.md)." >&2
  exit 2
}

if printf '%s' "$cmd" | grep -Eq 'git[^;&|]* push'; then
  if printf '%s' "$cmd" | grep -Eq 'git[^;&|]* push[^;&|]*( --force| -f( |"|$)| --force-with-lease| \+)'; then
    block "force push는 어떤 브랜치에서도 하지 않습니다."
  fi
  if printf '%s' "$cmd" | grep -Eq 'git[^;&|]* push[^;&|]*[ :]main( |"|$)'; then
    block "main에 바로 push하지 않습니다."
  fi
fi

if printf '%s' "$cmd" | grep -Eq 'git[^;&|]* (commit|push)'; then
  branch=$(git -C "${CLAUDE_PROJECT_DIR:-.}" branch --show-current 2>/dev/null)
  if [ "$branch" = "main" ]; then
    block "지금 main 브랜치라 commit·push할 수 없습니다."
  fi
fi

exit 0

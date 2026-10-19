#!/bin/sh
# Bash 실행 전에 Claude Code가 호출한다. 아래 Git 명령을 막는다(종료 코드 2 = 차단, 메시지는 Claude에게 전달됨).
# - 어떤 브랜치에서든 force push(--force · -f · --force-with-lease · --mirror · +브랜치)
# - main으로 push(main · HEAD:main · refs/heads/main · --all)
# - main 브랜치에 있을 때 commit·push
# 따옴표 안 글자(커밋 메시지 등)와 heredoc 본문은 검사하지 않고, `git` 바로 뒤 명령어가 push·commit일 때만 본다.
# jq가 없는 PC에서도 같은 방식으로 검사한다.
# 규칙 원문: .claude/rules/git.md

input=$(cat)

block() {
  echo "차단됨: $1 브랜치에서 작업하고 PR로 합쳐 주세요(.claude/rules/git.md)." >&2
  exit 2
}

# 입력(JSON)에서 실행할 명령(tool_input.command)을 꺼낸다.
# jq가 있으면 jq로, 없으면 아래 awk로 꺼낸다. 어느 쪽이든 이후 검사는 같다.
# (GUARD_GIT_NO_JQ=1은 jq 없는 경로를 시험할 때만 쓴다)
extract_command() {
  awk '
    { s = s $0 "\n" }
    END {
      n = length(s); i = 1; key = ""
      while (i <= n) {
        c = substr(s, i, 1)
        if (c != "\"") { i++; continue }
        # 문자열 하나를 읽으며 이스케이프를 푼다
        v = ""; i++
        while (i <= n) {
          c = substr(s, i, 1)
          if (c == "\"") break
          if (c == "\\") {
            i++; e = substr(s, i, 1)
            if (e == "n") v = v "\n"
            else if (e == "t") v = v "\t"
            else if (e == "r" || e == "b" || e == "f") v = v " "
            else if (e == "u") {
              h = tolower(substr(s, i + 1, 4)); i += 4
              if (h == "0022") v = v "\""
              else if (h == "0027") v = v "\047"
              else if (h == "005c") v = v "\\"
              else if (h == "0026") v = v "&"
              else if (h == "003c") v = v "<"
              else if (h == "003e") v = v ">"
              else v = v "X"
            }
            else v = v e
          } else v = v c
          i++
        }
        i++
        # 다음 글자가 ":"이면 키, 아니면 값
        j = i
        while (j <= n && substr(s, j, 1) ~ /[ \t\n\r]/) j++
        if (substr(s, j, 1) == ":") { key = v; i = j + 1; continue }
        if (key == "command") { printf "%s", v; exit }
        key = ""
      }
    }
  '
}

if [ "${GUARD_GIT_NO_JQ:-}" != "1" ] && command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)
else
  cmd=$(printf '%s' "$input" | extract_command)
fi
[ -z "$cmd" ] && exit 0

# 명령 문자열에서 git push·commit 호출만 골라 한 줄씩 출력한다.
#   push 줄: "push <force 0|1> <main 0|1>" · commit 줄: "commit"
calls=$(printf '%s\n' "$cmd" | awk '
  BEGIN { hd = ""; buf = "" }
  {
    line = $0
    # heredoc 본문은 건너뛴다
    if (hd != "") { t = line; sub(/^\t+/, "", t); if (t == hd) hd = ""; next }
    if (match(line, /<<-?[ \t]*["\047]?[A-Za-z_][A-Za-z0-9_]*["\047]?/)) {
      d = substr(line, RSTART, RLENGTH)
      sub(/^<<-?[ \t]*["\047]?/, "", d); sub(/["\047]$/, "", d)
      hd = d
      line = substr(line, 1, RSTART - 1) " " substr(line, RSTART + RLENGTH)
    }
    buf = buf line "\n"
  }
  END {
    # 따옴표 안 글자를 지운다
    out = ""; q = ""; n = length(buf)
    for (i = 1; i <= n; i++) {
      c = substr(buf, i, 1)
      if (q == "") {
        if (c == "\\") { i++; continue }
        if (c == "\047" || c == "\"") { q = c; continue }
        out = out c
      } else if (q == "\"" && c == "\\") { i++ }
      else if (c == q) { q = "" }
    }
    # 명령 구분자로 나눈다
    gsub(/&&|\|\||[;&|()`\n]/, "\n", out)
    m = split(out, segs, "\n")
    for (s = 1; s <= m; s++) {
      k = split(segs[s], tok, /[ \t]+/)
      j = 1
      while (j <= k && tok[j] == "") j++
      # 앞에 붙는 env·VAR=값·sudo·command 등은 건너뛴다
      while (j <= k && (tok[j] ~ /^[A-Za-z_][A-Za-z0-9_]*=/ || tok[j] ~ /^(env|sudo|command|time|nohup|exec)$/)) j++
      if (j > k || tok[j] !~ /(^|\/)git$/) continue
      j++
      # git 전역 옵션 건너뛰기
      while (j <= k && tok[j] ~ /^-/) {
        if (tok[j] ~ /^(-C|-c|--git-dir|--work-tree|--namespace)$/) j++
        j++
      }
      sub_cmd = tok[j]
      if (sub_cmd == "commit") { print "commit"; continue }
      if (sub_cmd != "push") continue
      force = 0; tomain = 0; pos = 0
      for (a = j + 1; a <= k; a++) {
        arg = tok[a]
        if (arg == "") continue
        if (arg ~ /^--force/ || arg == "--mirror") { force = 1; continue }
        if (arg == "--all") { tomain = 1; continue }
        if (arg ~ /^-[^-]/ && arg ~ /f/) { force = 1; continue }
        if (arg ~ /^-/) { if (arg ~ /^(-o|--push-option|--repo|--receive-pack|--exec)$/) a++; continue }
        pos++
        if (pos == 1) continue            # 원격 이름
        if (arg ~ /^\+/) { force = 1; sub(/^\+/, "", arg) }
        dst = arg; sub(/^.*:/, "", dst)
        if (dst ~ /^(refs\/heads\/)?main$/) tomain = 1
      }
      print "push " force " " tomain
    }
  }
')

[ -z "$calls" ] && exit 0

if printf '%s\n' "$calls" | grep -q '^push 1 '; then
  block "force push는 어떤 브랜치에서도 하지 않습니다."
fi
if printf '%s\n' "$calls" | grep -q '^push [01] 1$'; then
  block "main에 바로 push하지 않습니다."
fi

branch=$(git -C "${CLAUDE_PROJECT_DIR:-.}" branch --show-current 2>/dev/null)
if [ "$branch" = "main" ]; then
  block "지금 main 브랜치라 commit·push할 수 없습니다."
fi

exit 0

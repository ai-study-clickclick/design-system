# 세션 시작

세션을 시작하면 이 순서부터 따른다.

1. `PROGRESS.md`와 `git log --oneline -15`로 현재 상태를 파악한다
2. `gh pr list`로 열린 PR을 확인한다. 열린 PR이 있으면 사용자에게 알린다. 작업은 시작해도 되지만, 내 PR은 그 PR이 머지된 뒤 최신 main을 받아 충돌을 해결하고 연다(`.claude/rules/git.md`). 같은 파일을 고치는 PR이면 특히 겹치는 부분을 알려 준다
3. 작업할 태스크 Step(예: `1-2`)을 사용자에게 확인한다. 화면 작업이면 Step 대신 화면 주제를 확인한다. 둘 다 아니면 `chore`로 처리한다. Notion이 연결돼 있으면 그 카드의 `Description`·`Depends`·`Status`·`Assign`을 읽는다(`.claude/rules/notion.md` 참고)
4. 브랜치를 정한다. 사용자에게 묻지 않고 아래 순서로 판단한다
   - 먼저 `git fetch`로 원격 상태를 받는다. 사용자는 회사·집 등 여러 PC에서 같은 브랜치를 이어서 작업할 수 있다
   - 같은 Step의 브랜치가 로컬이나 원격에 이미 있으면(`git branch -a`) 그 브랜치로 전환하고 `git pull`로 다른 PC에서 올린 커밋을 받는다
   - 같은 Step의 브랜치가 없으면 `git switch main && git pull` 후 main에서 새로 만든다. 이름은 `docs/CONVENTIONS.md` 규칙을 따른다
   - 공동 담당 태스크의 하위 작업이면 main이 아니라 태스크 브랜치에서 만든다
   - 커밋하지 않은 변경이 있는데 원격 브랜치에 새 커밋이 있으면, 받거나 덮어쓰기 전에 멈추고 사용자에게 알린다(다른 PC의 작업과 겹침)
   - 지금 main에 있거나 다른 Step 브랜치에 있으면 작업 전에 반드시 전환한다

---
name: sync
description: 코드 → 피그마 방향 동기화. 지금은 1단계(`DESIGN.md` → 코드 테마 `src/styles/tokens.css` · `/docs` 토큰 화면)만 한다. 사용자가 "/sync", "토큰 반영해 줘", "DESIGN.md 바꾼 거 코드에 맞춰 줘"라고 할 때 실행한다. 자동으로 실행하지 않는다
---

# /sync

`DESIGN.md`의 값을 코드 테마에 반영하는 스킬이다. 피그마 반영(Variables · 메인 컴포넌트 · Generated 화면)은 3-1 · 3-4 · 4-5에서 이 스킬에 단계를 더한다.

## 시작 전

1. `.claude/rules/sync.md`를 읽는다. 자동으로 읽히지 않았을 수 있다.
2. 역할을 확인한다(`AGENTS.md` "역할과 작업 범위"). 1단계는 디자인 시스템을 바꾸므로 시스템 관리자만 실행한다. 화면 작업자가 부르면 멈추고 "시스템 관리자에게 요청이 필요하다"고 알린다.

## 1단계: `DESIGN.md` → 코드 테마

1. `npm run tokens`를 실행한다. `scripts/build-tokens.mjs`가 `DESIGN.md` 맨 위 YAML을 읽어 `src/styles/tokens.css`를 다시 만든다.
   - 기본 테마는 `:root`, 다른 테마 프리셋은 `[data-theme="<name>"]`에 들어간다
   - 브랜드 색 단계(`palette.brand-100` ~ `900`)와 라운드 단계는 테마의 `brand.primary` · `radius.base`에서 계산한다(`docs/CONVENTIONS.md` "디자인 토큰")
2. 실행 결과의 "확인 필요" 줄을 사용자에게 그대로 알린다. 오류가 나면 고치지 말고 오류 문장과 `DESIGN.md`의 해당 줄을 보여 준다.
3. `git diff --stat src/styles/tokens.css`로 바뀐 곳을 보고, 바뀐 토큰을 사용자에게 쉬운 말로 요약한다(예: "`bg.brand-solid`가 가리키는 색이 바뀜").
4. `npm run build`로 사이트가 깨지지 않는지 확인한다
5. `/docs/tokens` 화면은 `tokens.css`를 읽어 그리므로 따로 고치지 않는다. 미리보기 주소(`design-system-git-<브랜치>-1nah.vercel.app/docs/tokens`)를 알려 준다.

## 하지 않는 것

- `src/styles/tokens.css`를 손으로 고치지 않는다. 값은 `DESIGN.md`에서만 바꾼다.
- `DESIGN.md`에 없는 값을 지어내 넣지 않는다. 필요한 값이 없으면 멈추고 사용자에게 알린다.
- 사용자가 실행하지 않았는데 동기화하지 않는다

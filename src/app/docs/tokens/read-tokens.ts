import fs from "node:fs";
import path from "node:path";

// src/styles/tokens.css(자동 생성)를 읽어 토큰 화면에 쓸 목록을 만든다
// 토큰 화면은 이 파일만 보므로 DESIGN.md를 고치고 `/sync`를 실행하면 화면도 함께 바뀐다

export type Token = {
  name: string; // 토큰 이름 (예: bg.brand-solid)
  cssVar: string; // CSS 변수 (예: --bg-brand-solid)
  value: string; // tokens.css에 적힌 값
  ref?: string; // 가리키는 토큰 이름 (예: palette.orange-600)
  resolved: string; // 끝까지 따라간 실제 값 (예: #ff6600)
};

type Raw = { name: string; value: string };

function readBlock(css: string, selector: string): Raw[] {
  // 선택자 뒤에 다른 선택자가 이어질 수 있다(예: ":root,\n[data-theme] {")
  const match = css.match(new RegExp(`^${selector.replace(/[[\]]/g, "\\$&")}[^{]*\\{`, "m"));
  if (!match || match.index === undefined) return [];
  const end = css.indexOf("\n}", match.index);
  return [...css.slice(match.index, end).matchAll(/^\s*(--[\w-]+):\s*(.+);/gm)].map(([, name, value]) => ({
    name,
    value: value.replace(/\/\*.*\*\//, "").trim(),
  }));
}

// "--bg-brand-solid" → "bg.brand-solid"
const tokenName = (cssVar: string) =>
  cssVar.slice(2).replace(/^(palette|bg|fg|stroke|space|radius|brand|shadow)-/, "$1.");

const refVar = (value: string) => value.match(/^var\((--[\w-]+)\)$/)?.[1];

export function readTokens() {
  const css = fs.readFileSync(path.join(process.cwd(), "src/styles/tokens.css"), "utf8");
  const root = readBlock(css, ":root");
  const statics = readBlock(css, "@theme static").filter((t) => !t.value.includes("initial"));
  const all = new Map([...root, ...statics].map((t) => [t.name, t.value]));

  const resolve = (value: string, depth = 0): string => {
    const ref = refVar(value);
    if (!ref || depth > 10) return value;
    return resolve(all.get(ref) ?? value, depth + 1);
  };

  const toToken = (t: Raw): Token => {
    const ref = refVar(t.value);
    return {
      name: tokenName(t.name),
      cssVar: t.name,
      value: t.value,
      ref: ref ? tokenName(ref) : undefined,
      resolved: resolve(t.value),
    };
  };

  const pick = (list: Raw[], prefix: string) => list.filter((t) => t.name.startsWith(prefix)).map(toToken);

  // 기본 색표: 색 이름별로 묶는다 (gray · orange · brand · blue ...). static-*은 한 묶음
  const paletteGroups = new Map<string, Token[]>();
  for (const t of pick(root, "--palette-")) {
    const hue = t.name.replace(/^palette\./, "").replace(/-\w+$/, "");
    const key = hue.startsWith("static") ? "static" : hue;
    paletteGroups.set(key, [...(paletteGroups.get(key) ?? []), t]);
  }

  const typographyNames = [
    ...new Set(
      root
        .filter((t) => t.name.startsWith("--typography-"))
        .map((t) => t.name.replace(/^--typography-/, "").replace(/-(font-size|font-weight|line-height)$/, "")),
    ),
  ];
  const typography = typographyNames.map((name) => {
    const get = (prop: string) => all.get(`--typography-${name}-${prop}`) ?? "";
    return { name, fontSize: get("font-size"), fontWeight: get("font-weight"), lineHeight: get("line-height") };
  });

  return {
    paletteGroups: [...paletteGroups.entries()],
    semantic: { bg: pick(root, "--bg-"), fg: pick(root, "--fg-"), stroke: pick(root, "--stroke-") },
    typography,
    spacing: pick(root, "--space-"),
    radius: pick(statics, "--radius-"),
    radiusBase: all.get("--radius-base") ?? "",
    shadows: pick(statics, "--shadow-"),
  };
}

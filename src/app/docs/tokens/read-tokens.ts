import fs from "node:fs";
import path from "node:path";

// src/styles/tokens.css(자동 생성)를 읽어 토큰 화면에 쓸 목록을 만든다
// 토큰 화면은 이 파일만 보므로 DESIGN.md를 고치고 `/sync`를 실행하면 화면도 함께 바뀐다

export type Token = { name: string; value: string; ref?: string };

function readBlock(css: string, selector: string) {
  // 선택자 뒤에 다른 선택자가 이어질 수 있다(예: ":root,\n[data-theme] {")
  const match = css.match(new RegExp(`^${selector.replace(/[[\]]/g, "\\$&")}[^{]*\\{`, "m"));
  if (!match || match.index === undefined) return [];
  const start = match.index;
  const end = css.indexOf("\n}", start);
  return [...css.slice(start, end).matchAll(/^\s*(--[\w-]+):\s*(.+);$/gm)].map(([, name, value]) => ({
    name,
    value: value.trim(),
  }));
}

// "var(--palette-orange-600)" → "palette.orange-600"
function refName(value: string) {
  const match = value.match(/^var\(--([\w-]+)\)$/);
  if (!match) return undefined;
  return match[1].replace(/^(palette|bg|fg|stroke|space|radius|brand)-/, "$1.");
}

// 이름 "--bg-brand-solid" → 토큰 이름 "bg.brand-solid"
const tokenName = (cssVar: string) => refName(`var(${cssVar})`) ?? cssVar.slice(2);

export function readTokens() {
  const css = fs.readFileSync(path.join(process.cwd(), "src/styles/tokens.css"), "utf8");
  const root = readBlock(css, ":root");
  const statics = readBlock(css, "@theme static");

  const pick = (prefix: string) =>
    root
      .filter((t) => t.name.startsWith(prefix))
      .map((t) => ({ name: tokenName(t.name), value: t.value, ref: refName(t.value) }));

  const palette = pick("--palette-");
  const paletteGroups = new Map<string, Token[]>();
  for (const t of palette) {
    const group = t.name.replace(/^palette\./, "").replace(/-\w+$/, "");
    const key = group.startsWith("static") ? "static" : group;
    paletteGroups.set(key, [...(paletteGroups.get(key) ?? []), t]);
  }

  const typography = [...new Set(root.filter((t) => t.name.startsWith("--typography-")).map((t) => t.name.replace(/^--typography-/, "").replace(/-(font-size|font-weight|line-height)$/, "")))].map(
    (name) => {
      const get = (prop: string) => root.find((t) => t.name === `--typography-${name}-${prop}`)?.value ?? "";
      return { name, fontSize: get("font-size"), fontWeight: get("font-weight"), lineHeight: get("line-height") };
    },
  );

  return {
    paletteGroups: [...paletteGroups.entries()],
    semantic: {
      bg: pick("--bg-"),
      fg: pick("--fg-"),
      stroke: pick("--stroke-"),
    },
    typography,
    spacing: pick("--space-"),
    radius: statics
      .filter((t) => t.name.startsWith("--radius-") && !t.value.includes("initial"))
      .map((t) => ({ name: tokenName(t.name), value: t.value })),
    shadows: statics
      .filter((t) => t.name.startsWith("--shadow-") && !t.value.includes("initial"))
      .map((t) => ({ name: t.name.slice(2).replace("-", "."), value: t.value })),
  };
}

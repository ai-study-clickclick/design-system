// src/styles/tokens.css를 읽어 피그마 Variables를 넣는 코드를 만든다
// 실행: node scripts/build-figma-variables.mjs > <임시 파일> (보통 /sync 2단계가 실행한다)
// 결과: 피그마 연결(use_figma)에 그대로 넣는 JavaScript. 같은 이름의 변수는 값만 고치고 지우지 않는다
// 규칙: docs/CONVENTIONS.md "디자인 토큰" (이름의 .은 피그마에서 /)
//
// 묶음(Collection)
// - primitive: palette/* 기본 색표. 목록에 안 보이게 숨긴다
// - theme: palette/brand-100 ~ 900 · brand/primary · radius/base · radius 단계. 테마 프리셋이 바꾸는 값
// - semantic: bg/* · fg/* · stroke/* 쓰임새 색. 기본 색표를 가리킨다
// - space: space/*
// - typography: font-family/base · typography/<스타일>/font-size · font-weight · line-height
// 컴포넌트 토큰(button-* 등)은 3-4에서 더한다

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "src/styles/tokens.css");

// css 블록 하나 꺼내기(":root" · "@theme static")
function block(css, start) {
  const from = css.indexOf(start);
  if (from < 0) throw new Error(`tokens.css에 ${start} 블록이 없다`);
  const rest = css.slice(from);
  return rest.slice(0, rest.indexOf("\n}"));
}

const DECL = /--([\w-]+):\s*([^;]+);/g;
const ref = (v) => (v.trim().match(/^var\(--([\w-]+)\)$/) || [])[1] || null;
const px = (v) => parseFloat(v.replace("px", ""));
// css 변수 이름 → 피그마 이름 ("bg-brand-solid" → "bg/brand-solid")
function figmaName(name) {
  for (const p of ["palette", "bg", "fg", "stroke", "space", "radius", "brand"]) {
    if (name.startsWith(p + "-")) return `${p}/${name.slice(p.length + 1)}`;
  }
  return name;
}
const alias = (v) => ({ a: figmaName(ref(v)) });

// [묶음, 피그마 이름, 종류(C 색 · F 숫자 · S 글자), 값 또는 { a: 가리키는 변수 }]
export function buildTokens(css) {
  const tokens = [];
  for (const [, k, raw] of block(css, "\n:root").matchAll(DECL)) {
    const v = raw.trim();
    let m;
    if (k.startsWith("palette-brand-")) tokens.push(["theme", figmaName(k), "C", alias(v)]);
    else if (k.startsWith("palette-")) tokens.push(["primitive", figmaName(k), "C", v]);
    else if (k === "brand-primary") tokens.push(["theme", "brand/primary", "C", alias(v)]);
    else if (/^(bg|fg|stroke)-/.test(k)) tokens.push(["semantic", figmaName(k), "C", ref(v) ? alias(v) : v]);
    else if (k === "radius-base") tokens.push(["theme", "radius/base", "F", px(v)]);
    else if (k.startsWith("space-")) tokens.push(["space", figmaName(k), "F", px(v)]);
    else if (k === "font-family-base") tokens.push(["typography", "font-family/base", "S", v.split(",")[0].replace(/["']/g, "").trim()]);
    else if ((m = k.match(/^typography-(.+)-(font-size|font-weight|line-height)$/)))
      tokens.push(["typography", `typography/${m[1]}/${m[2]}`, "F", px(v)]);
  }
  for (const [, k, raw] of block(css, "@theme static {").matchAll(DECL)) {
    const v = raw.trim();
    if (k.startsWith("radius-") && !v.startsWith("initial")) tokens.push(["theme", figmaName(k), "F", px(v)]);
  }
  return tokens;
}

// 피그마에서 실행할 코드. T(위 목록)를 받아 묶음·변수를 만들거나 고친다
const UPSERT = `
const TYPE = { C: "COLOR", F: "FLOAT", S: "STRING" };
const hex = h => { const s = h.replace('#',''); const n = i => parseInt(s.slice(i,i+2),16)/255; return { r:n(0), g:n(2), b:n(4), a: s.length===8 ? n(6) : 1 }; };
function scopes(col, name) {
  if (col === 'primitive' || name.startsWith('palette/') || name === 'brand/primary') return [];
  if (name.startsWith('bg/')) return ['FRAME_FILL','SHAPE_FILL'];
  if (name.startsWith('fg/')) return ['TEXT_FILL','SHAPE_FILL','STROKE_COLOR'];
  if (name.startsWith('stroke/')) return ['STROKE_COLOR'];
  if (name.startsWith('radius/')) return name === 'radius/base' ? [] : ['CORNER_RADIUS'];
  // 화면 폭은 간격 목록에 나오지 않게 크기 목록에만 둔다
  if (name === 'space/screen-width' || name === 'space/screen-max') return ['WIDTH_HEIGHT'];
  if (name.startsWith('space/')) return ['GAP','WIDTH_HEIGHT'];
  if (name.startsWith('font-family')) return ['FONT_FAMILY'];
  if (name.endsWith('/font-size')) return ['FONT_SIZE'];
  if (name.endsWith('/font-weight')) return ['FONT_WEIGHT'];
  if (name.endsWith('/line-height')) return ['LINE_HEIGHT'];
  return [];
}
const cssVar = name => 'var(--' + name.replace(/\\//g,'-') + ')';
const existingCols = await figma.variables.getLocalVariableCollectionsAsync();
const cols = {}; const createdCols = [];
for (const name of ['primitive','theme','semantic','space','typography']) {
  let c = existingCols.find(x => x.name === name);
  if (!c) { c = figma.variables.createVariableCollection(name); c.renameMode(c.modes[0].modeId, 'default'); createdCols.push(name); }
  cols[name] = c;
}
const all = await figma.variables.getLocalVariablesAsync();
const byKey = {}; for (const v of all) byKey[v.variableCollectionId + '|' + v.name] = v;
const byName = {}; const created = new Set(); const updated = [], unchanged = [];
for (const [col, name, t] of T) {
  const c = cols[col]; let v = byKey[c.id + '|' + name];
  if (!v) { v = figma.variables.createVariable(name, c, TYPE[t]); created.add(name); }
  byName[name] = v;
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const round = o => (o && typeof o === 'object' && 'r' in o) ? { r:+o.r.toFixed(4), g:+o.g.toFixed(4), b:+o.b.toFixed(4), a:+o.a.toFixed(4) } : o;
for (const [col, name, t, val] of T) {
  const v = byName[name]; const mode = cols[col].modes[0].modeId;
  let next;
  if (val && typeof val === 'object' && val.a) { const target = byName[val.a]; if (!target) throw new Error('alias target missing: ' + val.a); next = { type: 'VARIABLE_ALIAS', id: target.id }; }
  else if (t === 'C') next = hex(val); else next = val;
  let changed = false;
  if (!same(round(v.valuesByMode[mode]), round(next))) { v.setValueForMode(mode, next); changed = true; }
  const sc = scopes(col, name); if (!same([...v.scopes].sort(), [...sc].sort())) { v.scopes = sc; changed = true; }
  if ((v.codeSyntax || {}).WEB !== cssVar(name)) { v.setVariableCodeSyntax('WEB', cssVar(name)); changed = true; }
  if (!created.has(name)) (changed ? updated : unchanged).push(name);
}
const colKey = Object.fromEntries(Object.entries(cols).map(([k,c]) => [c.id, k]));
const want = new Set(T.map(x => x[0] + '|' + x[1]));
const extra = all.filter(v => colKey[v.variableCollectionId] && !want.has(colKey[v.variableCollectionId] + '|' + v.name)).map(v => v.name);
const counts = Object.fromEntries(Object.entries(cols).map(([k,c]) => [k, c.variableIds.length]));
return { createdCollections: createdCols, counts, created: [...created], updated, unchanged: unchanged.length, extraNotInCode: extra };
`;

export function buildFigmaCode(css) {
  return `const T = ${JSON.stringify(buildTokens(css))};\n${UPSERT.trim()}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.stdout.write(buildFigmaCode(fs.readFileSync(SOURCE, "utf8")));
}

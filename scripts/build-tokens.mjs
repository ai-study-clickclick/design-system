// DESIGN.md 맨 위 YAML을 읽어 src/styles/tokens.css를 만든다
// 실행: npm run tokens (보통 /sync 스킬이 실행한다)
// 규칙: docs/CONVENTIONS.md "디자인 토큰"
//
// 만드는 것
// 1. CSS 변수: :root에 기본 테마, [data-theme="<name>"]에 다른 테마의 바뀌는 값
// 2. Tailwind 연결(@theme inline): 토큰 이름이 그대로 클래스가 된다(bg-brand-solid, text-neutral, rounded-md, p-16, text-title-lg)
//
// 테마 계산
// - 브랜드 색 단계: brand.primary에서 palette.brand-100 ~ 900을 OKLCH 명도 단계로 만든다. 기본 테마는 계산하지 않고 주황 단계를 그대로 가리킨다
// - 라운드 단계: radius.base에 비율을 곱한다

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "DESIGN.md");
const OUTPUT = path.join(ROOT, "src/styles/tokens.css");

const BRAND_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const BRAND_REFERENCE = "orange"; // 브랜드 단계를 계산할 때 명도·채도 흐름을 빌려 오는 색표
const DARKEST_L = 0.2; // 어두운 단계가 검정에 가까워지지 않게 막는 최저 명도(OKLCH L)
const RADIUS_RATIOS = { xs: 0.375, sm: 0.5, md: 0.75, lg: 1, xl: 1.25, "2xl": 1.5 };
const FONT_FALLBACK = '-apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';

// ── DESIGN.md 읽기 ──

function readDesign() {
  const text = fs.readFileSync(SOURCE, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error("DESIGN.md 맨 위에 YAML(--- 사이)이 없다");
  return parse(match[1]);
}

// "palette.gray-00" → "--palette-gray-00"
const cssName = (key) => `--${key.replace(/\./g, "-")}`;

// "{colors.palette.orange-600}" → "var(--palette-orange-600)"
function resolveRef(value, design) {
  if (typeof value !== "string") return String(value);
  const match = value.match(/^\{(\w+)\.(.+)\}$/);
  if (!match) return value;
  const [, group, key] = match;
  if (!design[group] || !(key in design[group])) throw new Error(`없는 토큰을 가리킨다: ${value}`);
  if (group === "typography") return { typography: key };
  return `var(${cssName(key)})`;
}

// ── OKLCH 계산 ──

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function hexToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, B), H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

function oklchToRgb({ L, C, H }) {
  const A = C * Math.cos((H * Math.PI) / 180);
  const B = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

// sRGB 밖이면 채도를 줄여 안으로 넣는다
function oklchToHex(color) {
  let { C } = color;
  let rgb = oklchToRgb({ ...color, C });
  while (rgb.some((c) => c < -0.0001 || c > 1.0001) && C > 0) {
    C = Math.max(0, C - 0.002);
    rgb = oklchToRgb({ ...color, C });
  }
  return (
    "#" +
    rgb
      .map((c) => Math.round(Math.min(1, Math.max(0, fromLinear(Math.min(1, Math.max(0, c))))) * 255))
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
  );
}

// 기준 색표(주황)의 명도 흐름을 따라가되, 600 단계가 대표 컬러와 같아지게 맞춘다
// 밝은 쪽(100~500)은 100 단계 밝기까지 비율로 펼치고, 어두운 쪽(700~900)은 주황과 같은 명도 간격으로 내린다
function brandSteps(primaryHex, colors) {
  const ref = Object.fromEntries(
    BRAND_STEPS.map((step) => [step, hexToOklch(colors[`palette.${BRAND_REFERENCE}-${step}`])]),
  );
  const primary = hexToOklch(primaryHex);
  const lightEnd = ref[100].L;
  const refMid = ref[600].L;

  return Object.fromEntries(
    BRAND_STEPS.map((step) => {
      if (step === 600) return [step, primaryHex.toLowerCase()];
      const r = ref[step];
      const L =
        step < 600
          ? primary.L + ((r.L - refMid) / (lightEnd - refMid)) * (lightEnd - primary.L)
          : Math.max(DARKEST_L, primary.L + (r.L - refMid));
      const C = primary.C * (r.C / ref[600].C);
      return [step, oklchToHex({ L, C, H: primary.H })];
    }),
  );
}

function radiusSteps(base) {
  const px = parseFloat(base);
  return Object.fromEntries(
    Object.entries(RADIUS_RATIOS).map(([name, ratio]) => [name, `${Math.round(px * ratio)}px`]),
  );
}

// 테마의 brand.primary는 "{colors.palette.orange-600}" 같은 참조이거나 #hex다
function primaryHex(value, colors) {
  const match = String(value).match(/^\{colors\.(.+)\}$/);
  if (!match) return value;
  const target = colors[match[1]];
  if (!target) throw new Error(`없는 색을 가리킨다: ${value}`);
  return primaryHex(target, colors);
}

// ── CSS 만들기 ──

const block = (selector, lines) => `${selector} {\n${lines.map((l) => `  ${l}`).join("\n")}\n}\n`;
const section = (title) => `\n  /* ${title} */`;

function baseVariables(design, warnings) {
  const lines = [];
  const { colors, typography, rounded, spacing, components } = design;
  const shadows = design.shadows ?? design.elevation;

  lines.push(section("1단 기본 색표"));
  for (const [key, value] of Object.entries(colors)) {
    if (key.startsWith("palette.")) lines.push(`${cssName(key)}: ${resolveRef(value, design)};`);
  }

  lines.push(section("대표 컬러"));
  lines.push(`--brand-primary: ${resolveRef(colors["brand.primary"], design)};`);

  lines.push(section("2단 쓰임새 색"));
  for (const [key, value] of Object.entries(colors)) {
    if (/^(bg|fg|stroke)\./.test(key)) lines.push(`${cssName(key)}: ${resolveRef(value, design)};`);
  }

  lines.push(section("글자"));
  const families = new Set(Object.values(typography).map((t) => t.fontFamily));
  lines.push(`--font-family-base: ${[...families].map((f) => `"${f}"`).join(", ")}, ${FONT_FALLBACK};`);
  for (const [name, t] of Object.entries(typography)) {
    lines.push(`--typography-${name}-font-size: ${t.fontSize};`);
    lines.push(`--typography-${name}-font-weight: ${t.fontWeight};`);
    lines.push(`--typography-${name}-line-height: ${t.lineHeight};`);
  }

  // 라운드는 Tailwind 이름(--radius-*)과 같아서 :root가 아니라 @theme static에 둔다
  const defaultTheme = design.theme?.default;
  if (!defaultTheme) throw new Error("DESIGN.md에 theme.default가 없다");
  const radius = radiusSteps(defaultTheme["radius.base"]);
  lines.push(section("라운드 기준값 (단계는 아래 @theme static)"));
  lines.push(`--radius-base: ${defaultTheme["radius.base"]};`);
  if (rounded["radius.base"] && rounded["radius.base"] !== defaultTheme["radius.base"]) {
    warnings.push(`radius.base: rounded 값 ${rounded["radius.base"]}와 theme.default 값 ${defaultTheme["radius.base"]}가 다르다(theme.default를 쓴다)`);
  }
  const shared = ["--radius-*: initial;"];
  for (const [name, value] of Object.entries(radius)) {
    const yamlValue = rounded[`radius.${name}`];
    if (yamlValue && yamlValue !== value) {
      warnings.push(`radius.${name}: DESIGN.md 값 ${yamlValue}와 계산값 ${value}가 다르다(계산값을 쓴다)`);
    }
    shared.push(`--radius-${name}: ${value};`);
  }
  shared.push(`--radius-full: ${rounded["radius.full"] ?? "9999px"};`);

  lines.push(section("간격"));
  for (const [key, value] of Object.entries(spacing)) lines.push(`${cssName(key)}: ${value};`);

  // 그림자도 Tailwind 이름(--shadow-*)과 같아서 @theme static에 둔다
  shared.push("--shadow-*: initial;");
  if (shadows) {
    for (const [key, value] of Object.entries(shadows)) shared.push(`${cssName(key)}: ${value};`);
  } else {
    warnings.push("그림자: DESIGN.md YAML에 shadows가 없어 건너뛰었다");
  }

  lines.push(section("컴포넌트 값"));
  for (const [component, props] of Object.entries(components ?? {})) {
    for (const [prop, value] of Object.entries(props)) {
      const resolved = resolveRef(value, design);
      const name = `--${component}-${prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
      if (typeof resolved === "object") {
        const t = resolved.typography;
        lines.push(`--${component}-font-size: var(--typography-${t}-font-size);`);
        lines.push(`--${component}-font-weight: var(--typography-${t}-font-weight);`);
        lines.push(`--${component}-line-height: var(--typography-${t}-line-height);`);
      } else {
        lines.push(`${name}: ${resolved};`);
      }
    }
  }

  return { lines: lines.map((l) => l.trimStart()), shared };
}

function themeVariables(design) {
  const blocks = [];
  for (const [name, theme] of Object.entries(design.theme ?? {})) {
    if (name === "default") continue;
    const lines = [];
    const hex = primaryHex(theme["brand.primary"], design.colors);
    lines.push(`--brand-primary: ${hex};`);
    for (const [step, value] of Object.entries(brandSteps(hex, design.colors))) {
      lines.push(`--palette-brand-${step}: ${value};`);
    }
    if (theme["radius.base"]) {
      lines.push(`--radius-base: ${theme["radius.base"]};`);
      for (const [step, value] of Object.entries(radiusSteps(theme["radius.base"]))) {
        lines.push(`--radius-${step}: ${value};`);
      }
    }
    blocks.push(block(`[data-theme="${name}"]`, lines));
  }
  return blocks;
}

// Tailwind 클래스 연결. 기본 색·간격·글자 크기·라운드·그림자는 지워 토큰 밖 값을 쓰지 못하게 한다
function tailwindTheme(design) {
  const { colors, typography, spacing } = design;
  const lines = [
    "--color-*: initial;",
    "--spacing: initial;",
    "--spacing-*: initial;",
    "--text-*: initial;",
    "--font-sans: var(--font-family-base);",
  ];

  lines.push(section("bg-* ← bg.*"));
  for (const key of Object.keys(colors).filter((k) => k.startsWith("bg."))) {
    lines.push(`--background-color-${key.slice(3)}: var(${cssName(key)});`);
  }
  lines.push(section("text-* ← fg.*"));
  for (const key of Object.keys(colors).filter((k) => k.startsWith("fg."))) {
    lines.push(`--text-color-${key.slice(3)}: var(${cssName(key)});`);
  }
  lines.push(section("border-* · outline-* · ring-* ← stroke.*"));
  for (const key of Object.keys(colors).filter((k) => k.startsWith("stroke."))) {
    const name = key.slice(7);
    lines.push(`--border-color-${name}: var(${cssName(key)});`);
    lines.push(`--outline-color-${name}: var(${cssName(key)});`);
    lines.push(`--ring-color-${name}: var(${cssName(key)});`);
  }

  lines.push(section("text-<글자 스타일>"));
  for (const name of Object.keys(typography)) {
    lines.push(`--text-${name}: var(--typography-${name}-font-size);`);
    lines.push(`--text-${name}--line-height: var(--typography-${name}-line-height);`);
    lines.push(`--text-${name}--font-weight: var(--typography-${name}-font-weight);`);
  }

  lines.push(section("p-16 · gap-8 · w-screen-max ← space.*"));
  lines.push("--spacing-0: 0px; /* 토큰은 아니지만 p-0 · top-0 · inset-0을 쓰기 위해 둔다 */");
  for (const key of Object.keys(spacing)) {
    lines.push(`--spacing-${key.slice(6)}: var(${cssName(key)});`);
  }

  return block("@theme inline", lines.map((l) => l.trimStart()));
}

// ── 실행 ──

const design = readDesign();
const warnings = [];
const { lines, shared } = baseVariables(design, warnings);
const themes = themeVariables(design);

const css = [
  "/* 자동 생성 파일이다. 직접 고치지 않는다 */",
  "/* 원본: DESIGN.md 맨 위 YAML · 만드는 법: npm run tokens(/sync) */",
  "",
  // [data-theme]에도 같은 값을 둔다. CSS 변수는 정의된 곳에서 값이 정해져 내려가므로,
  // 테마가 바꾼 palette.brand-* · radius-*를 쓰임새 색 · 컴포넌트 값이 테마 요소에서 다시 읽게 하기 위해서다
  block(":root,\n[data-theme]", lines),
  "/* 라운드 · 그림자: Tailwind와 같은 이름(--radius-* · --shadow-*)이라 여기서 바로 정한다. rounded-md · shadow-s2로 쓴다 */",
  block("@theme static", shared),
  ...themes,
  tailwindTheme(design),
].join("\n");

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, css);

console.log(`tokens.css를 만들었다: ${path.relative(ROOT, OUTPUT)}`);
console.log(`테마: default${themes.length ? ` + ${Object.keys(design.theme).filter((n) => n !== "default").join(", ")}` : ""}`);
for (const w of warnings) console.log(`확인 필요: ${w}`);

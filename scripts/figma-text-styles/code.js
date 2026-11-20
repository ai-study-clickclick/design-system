/* global figma */
// 피그마 typography Variables로 글자 스타일(Text Styles)을 만들고 고친다
// 실행: 피그마 앱 → 플러그인 → 개발 → 매니페스트에서 플러그인 가져오기 → 이 폴더의 manifest.json
// 왜 플러그인인가: /sync가 피그마를 고치는 연결은 피그마 서버에서 돌아 PC에 설치한 Pretendard를 못 쓴다.
//                 피그마 앱에서 직접 실행하면 PC 글꼴을 쓸 수 있다
//
// 하는 일
// 1. typography 묶음의 typography/<스타일>/font-size · font-weight · line-height를 읽는다
// 2. 같은 이름(<스타일>, 예: title-lg)의 글자 스타일을 만들거나 값을 고친다. 지우지는 않는다
// 3. 글꼴·크기·줄 높이·굵기를 Variables에 연결한다
// 4. '토큰' 페이지의 글자를 Pretendard로 바꾸고, 글자 견본에 해당 스타일을 입힌다
// 값(크기·줄 높이·굵기·글꼴)은 Variables에 연결돼 있어 /sync만으로 바뀐다
// 다시 실행하는 때: 글자 스타일이 새로 생기거나 이름이 바뀔 때. 옛 이름 스타일은 지우지 않는다

const FAMILY = "Pretendard";
const WEIGHT_STYLE = {
  100: "Thin",
  200: "ExtraLight",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "SemiBold",
  700: "Bold",
  800: "ExtraBold",
  900: "Black",
};
const TOKEN_PAGE = "토큰";

async function main() {
  // Pretendard가 이 PC에 있는지 확인
  const fonts = await figma.listAvailableFontsAsync();
  const styles = new Set(fonts.filter((f) => f.fontName.family === FAMILY).map((f) => f.fontName.style));
  if (styles.size === 0) {
    figma.closePlugin("Pretendard가 없어요. 글꼴을 설치하고 피그마 앱을 다시 켠 뒤 실행해 주세요");
    return;
  }

  // typography Variables 읽기
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const typo = collections.find((c) => c.name === "typography");
  if (!typo) {
    figma.closePlugin("typography Variables가 없어요. 먼저 /sync로 Variables를 넣어 주세요");
    return;
  }
  const modeId = typo.modes[0].modeId;
  const vars = (await figma.variables.getLocalVariablesAsync()).filter((v) => v.variableCollectionId === typo.id);
  const familyVar = vars.find((v) => v.name === "font-family/base");

  const tokens = {}; // { "title-lg": { "font-size": Variable, ... } }
  for (const v of vars) {
    const m = v.name.match(/^typography\/([^/]+)\/(font-size|font-weight|line-height)$/);
    if (!m) continue;
    (tokens[m[1]] = tokens[m[1]] || {})[m[2]] = v;
  }

  const existing = await figma.getLocalTextStylesAsync();
  const styleByName = {};
  const styleBySizeVar = {}; // 견본 글자에 스타일을 입힐 때 쓴다
  let created = 0;
  let updated = 0;
  const problems = [];

  for (const name of Object.keys(tokens)) {
    const t = tokens[name];
    if (!t["font-size"] || !t["font-weight"] || !t["line-height"]) {
      problems.push(`${name}: 값이 빠짐`);
      continue;
    }
    const weight = t["font-weight"].valuesByMode[modeId];
    const fontStyle = WEIGHT_STYLE[weight];
    if (!fontStyle || !styles.has(fontStyle)) {
      problems.push(`${name}: Pretendard ${weight} 굵기가 없음`);
      continue;
    }
    const fontName = { family: FAMILY, style: fontStyle };
    await figma.loadFontAsync(fontName);

    let style = existing.find((s) => s.name === name);
    if (style) {
      updated++;
    } else {
      style = figma.createTextStyle();
      style.name = name;
      created++;
    }
    style.fontName = fontName;
    style.fontSize = t["font-size"].valuesByMode[modeId];
    style.lineHeight = { unit: "PIXELS", value: t["line-height"].valuesByMode[modeId] };
    style.description = `코드: text-${name}`;

    style.setBoundVariable("fontSize", t["font-size"]);
    style.setBoundVariable("lineHeight", t["line-height"]);
    try {
      style.setBoundVariable("fontWeight", t["font-weight"]);
      if (familyVar) style.setBoundVariable("fontFamily", familyVar);
    } catch (e) {
      problems.push(`${name}: 굵기·글꼴 연결 실패(${e.message})`);
    }

    styleByName[name] = style;
    styleBySizeVar[t["font-size"].id] = style;
  }

  // '토큰' 페이지 글자를 Pretendard로 바꾸고 견본에 스타일 입히기
  let pageTexts = 0;
  const page = figma.root.children.find((p) => p.name === TOKEN_PAGE);
  if (page) {
    await figma.setCurrentPageAsync(page);
    const regular = { family: FAMILY, style: "Regular" };
    const bold = { family: FAMILY, style: styles.has("SemiBold") ? "SemiBold" : "Bold" };
    await figma.loadFontAsync(regular);
    await figma.loadFontAsync(bold);
    for (const node of page.findAll((n) => n.type === "TEXT")) {
      // 지금 글꼴을 먼저 불러와야 바꿀 수 있다
      for (const f of node.getRangeAllFontNames(0, node.characters.length)) await figma.loadFontAsync(f);
      const binding = node.boundVariables && node.boundVariables.fontSize;
      const alias = Array.isArray(binding) ? binding[0] : binding;
      const style = alias && styleBySizeVar[alias.id];
      if (style) {
        await node.setTextStyleIdAsync(style.id);
      } else {
        const isBold = node.fontName !== figma.mixed && /Bold|Semi/i.test(node.fontName.style);
        node.fontName = isBold ? bold : regular;
      }
      pageTexts++;
    }
  }

  const msg = `글자 스타일 ${created}개 만들고 ${updated}개 고쳤어요 · '토큰' 페이지 글자 ${pageTexts}개 Pretendard로 바꿨어요`;
  if (problems.length) console.log("확인 필요:\n" + problems.join("\n"));
  figma.closePlugin(problems.length ? `${msg} · 확인 필요 ${problems.length}개(개발자 콘솔)` : msg);
}

main().catch((e) => figma.closePlugin(`실패: ${e.message}`));

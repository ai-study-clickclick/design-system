import fs from "node:fs";
import path from "node:path";

// 폴더 이름 규칙(YYMMDD-topic)에 맞는 폴더만 화면으로 본다. 최근 화면이 위에 온다
const SCREEN_FOLDER = /^\d{6}-[a-z0-9-]+$/;

export function getScreens() {
  const dir = path.join(process.cwd(), "src/app/prototypes");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && SCREEN_FOLDER.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .reverse();
}

import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

// 폴더 이름 규칙(YYMMDD-topic)에 맞는 폴더만 화면으로 본다
const SCREEN_FOLDER = /^\d{6}-[a-z0-9-]+$/;

function getScreens() {
  const dir = path.join(process.cwd(), "src/app/prototypes");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && SCREEN_FOLDER.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .reverse();
}

export default function PrototypesPage() {
  const screens = getScreens();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← 처음으로
      </Link>
      <h1 className="mt-4 text-2xl font-bold">프로토타입</h1>
      <p className="mt-2 text-sm text-gray-600">최근에 만든 화면이 위에 있다</p>
      {screens.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">아직 만든 화면이 없다</p>
      ) : (
        <ul className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
          {screens.map((name) => (
            <li key={name}>
              <Link href={`/prototypes/${name}`} className="block py-4 hover:bg-gray-50">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

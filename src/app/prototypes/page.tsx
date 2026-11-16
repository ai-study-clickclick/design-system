import Link from "next/link";
import DocPage from "../doc-page";
import { getScreens } from "./screens";

export const metadata = { title: "프로토타입 · 딸깍 디자인 시스템" };

export default function PrototypesPage() {
  const screens = getScreens();

  return (
    <DocPage
      href="/prototypes"
      category="프로토타입"
      title="전체 화면"
      description="화면 하나가 폴더 하나예요. 최근에 만든 화면이 위에 있어요"
      toc={[]}
    >
      {screens.length === 0 ? (
        <p className="rounded-md bg-neutral-muted p-20 text-body-md text-neutral-muted">
          아직 만든 화면이 없어요. 화면을 만들면 여기와 왼쪽 메뉴에 나와요
        </p>
      ) : (
        <ul className="divide-y divide-neutral-weak border-y border-neutral-weak">
          {screens.map((name) => (
            <li key={name}>
              <Link
                href={`/prototypes/${name}`}
                className="flex min-h-touch-min items-center justify-between px-12 text-body-md hover:bg-transparent-pressed"
              >
                {name}
                <span aria-hidden className="text-neutral-muted">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </DocPage>
  );
}

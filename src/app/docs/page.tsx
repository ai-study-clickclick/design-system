import { redirect } from "next/navigation";

// 라이브러리 첫 화면은 두지 않는다. 왼쪽 메뉴의 첫 문서로 보낸다
export default function DocsPage() {
  redirect("/docs/tokens/color");
}

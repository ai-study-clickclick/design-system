import { redirect } from "next/navigation";

// 첫 화면은 따로 두지 않고 라이브러리 첫 문서로 보낸다. 다른 곳은 위 메뉴와 왼쪽 메뉴로 이동한다
export default function Home() {
  redirect("/docs/tokens/color");
}

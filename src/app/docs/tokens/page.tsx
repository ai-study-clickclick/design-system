import { redirect } from "next/navigation";

// 토큰은 종류별 문서로 나눴다. 예전 주소로 들어오면 색 문서로 보낸다
export default function TokensPage() {
  redirect("/docs/tokens/color");
}

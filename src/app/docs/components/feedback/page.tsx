import DocPage, { Section } from "../../../doc-page";
import * as D from "./demos";

export const metadata = { title: "Feedback · 딸깍 디자인 시스템" };

const sections = [
  { id: "modal", title: "Modal", description: "확인 요청 전용. 바깥을 눌러도 닫히지 않고 버튼은 2개까지다. 되돌릴 수 없는 행동은 critical 버튼.", Demo: D.ModalDemo },
  { id: "bottom-sheet", title: "BottomSheet", description: "아래에서 올라오는 시트. 핸들과 닫기는 함께 쓰지 않는다. 버튼 2개는 닫기 + 채움 3:7.", Demo: D.BottomSheetDemo },
  { id: "toast", title: "Toast", description: "일시 알림. 한 번에 하나, 4초 뒤 사라진다. 글자는 왼쪽, 버튼은 오른쪽 끝, 버튼은 1개까지.", Demo: D.ToastDemo },
  { id: "banner", title: "Banner", description: "화면 전체의 상태를 알리는 지속 안내. 화면 맨 위 전체 폭, 경고 · 오류는 닫을 수 없다.", Demo: D.BannerDemo },
  { id: "spinner", title: "Spinner", description: "기다림 표시. 1초가 넘을 때만 보이고, 한 번 보이면 0.4초는 유지한다.", Demo: D.SpinnerDemo },
  { id: "skeleton", title: "Skeleton", description: "긴 로딩(목록 · 카드)의 내용 자리. 테두리 없이 흰 면 안에 둔다.", Demo: D.SkeletonDemo },
];

export default function FeedbackPage() {
  return (
    <DocPage
      href="/docs/components/feedback"
      category="Components"
      wide
      title="Feedback"
      description="상태와 결과를 알려 주는 부품이다. 언제 무엇을 쓰는지는 docs/UX.md “피드백의 종류”를 따른다."
      toc={sections.map(({ id, title }) => ({ id, title }))}
    >
      {sections.map(({ id, title, description, Demo }) => (
        <Section key={id} id={id} title={title} description={description}>
          <Demo />
        </Section>
      ))}
    </DocPage>
  );
}

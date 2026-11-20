import DocPage, { Section } from "../../doc-page";
import * as D from "./demos";

export const metadata = { title: "Components · 딸깍 디자인 시스템" };

// MVP 19개 + 추가(Calendar). 이름 · 속성은 3-2 비교표, 값은 DESIGN.md를 따른다
const components: { id: string; title: string; description: string; Demo: () => React.ReactNode }[] = [
  { id: "button", title: "Button", description: "variant primary · secondary · critical · outline, size lg(52) · md(44). 채움 버튼은 한 화면에 하나다. 처리가 1초를 넘으면 글자 대신 Spinner를 보인다.", Demo: D.ButtonDemo },
  { id: "input", title: "Input", description: "한 줄 입력. 포커스는 2px 진한 테두리, 오류는 빨간 테두리와 아래 문구로 알린다.", Demo: D.InputDemo },
  { id: "textarea", title: "Textarea", description: "여러 줄 입력. autoSize를 켜면 3줄에서 시작해 늘어나고, 끄면 2줄 높이에서 안쪽으로 스크롤한다.", Demo: D.TextareaDemo },
  { id: "select", title: "Select", description: "입력 버튼을 누르면 Bottom sheet로 선택 목록이 열린다. 드롭다운은 쓰지 않는다.", Demo: D.SelectDemo },
  { id: "checkbox", title: "Checkbox", description: "size md · lg, variant square · ghost. 라벨까지 누르는 영역이다.", Demo: D.CheckboxDemo },
  { id: "radio", title: "Radio", description: "여러 개 중 하나를 고른다. 세로 배치가 기본이다.", Demo: D.RadioDemo },
  { id: "switch", title: "Switch", description: "켜면 바로 반영되는 설정. size sm · md · lg(16 · 24 · 32).", Demo: D.SwitchDemo },
  { id: "card", title: "Card", description: "사진이 주인 항목이나 묶음을 담는 면. 그림자 없이 테두리로 나눈다.", Demo: D.CardDemo },
  { id: "list-item", title: "ListItem", description: "글이 주인 항목의 한 줄. 이동하는 줄은 오른쪽 화살표를 둔다.", Demo: D.ListItemDemo },
  { id: "tabs", title: "Tabs", description: "5개 이하는 칸을 채우는 fill, 6개 이상이거나 라벨이 길면 hug.", Demo: D.TabsDemo },
  { id: "top-bar", title: "TopBar", description: "화면 맨 위 제목 줄. 왼쪽 뒤로가기 · 닫기, 오른쪽 보조 행동 2개까지.", Demo: D.TopBarDemo },
  { id: "bottom-sheet", title: "BottomSheet", description: "아래에서 올라오는 시트. 선택 목록 · 옵션 목록에 쓴다.", Demo: D.BottomSheetDemo },
  { id: "modal", title: "Modal", description: "확인 요청 전용. 바깥을 눌러도 닫히지 않고 버튼은 2개까지다.", Demo: D.ModalDemo },
  { id: "toast", title: "Toast", description: "일시 알림. 한 번에 하나, 4초 뒤 사라진다. 버튼은 1개까지다.", Demo: D.ToastDemo },
  { id: "banner", title: "Banner", description: "화면 전체의 상태를 알리는 지속 안내. 화면 맨 위 전체 폭, 경고 · 오류는 닫을 수 없다.", Demo: D.BannerDemo },
  { id: "badge", title: "Badge", description: "상태 · 분류를 짧게 보여 준다. 눌러지지 않는다.", Demo: D.BadgeDemo },
  { id: "avatar", title: "Avatar", description: "사람 · 가게를 나타내는 동그란 사진. 크기 48 하나다.", Demo: D.AvatarDemo },
  { id: "spinner", title: "Spinner", description: "기다림 표시. md 40은 전체 화면, sm 24는 요소 안에 쓴다.", Demo: D.SpinnerDemo },
  { id: "skeleton", title: "Skeleton", description: "불러올 내용 자리. 글자 줄 8 · 카드 16 · 아바타 full 라운드.", Demo: D.SkeletonDemo },
  { id: "calendar", title: "Calendar", description: "날짜 고르기. MVP 밖에서 추가한 임시 컴포넌트로, 값은 SEED를 참고했다.", Demo: D.CalendarDemo },
];

export default function ComponentsPage() {
  return (
    <DocPage
      href="/docs/components"
      category="Components"
      title="Components"
      description="화면을 만드는 부품이다. 이름과 속성은 코드와 피그마에서 같게 쓴다."
      toc={components.map(({ id, title }) => ({ id, title }))}
    >
      {components.map(({ id, title, description, Demo }) => (
        <Section key={id} id={id} title={title} description={description}>
          <Demo />
        </Section>
      ))}
    </DocPage>
  );
}

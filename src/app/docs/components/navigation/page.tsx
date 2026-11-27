import DocPage, { Section } from "../../../doc-page";
import * as D from "./demos";

export const metadata = { title: "Navigation · 딸깍 디자인 시스템" };

const sections = [
  { id: "top-bar", title: "TopBar", description: "화면 맨 위 제목 줄. 첫 화면이 아니면 뒤로가기, 위로 덮은 화면 · 완료 화면은 닫기. 오른쪽 아이콘은 2개까지다.", Demo: D.TopBarDemo },
  { id: "segmented-control", title: "SegmentedControl", description: "2~3개 중 하나를 골라 보기나 값을 바로 바꾼다. 내용 영역을 나누면 Tabs, 같은 내용의 기준만 바꾸면 SegmentedControl. MVP 밖 임시 추가다.", Demo: D.SegmentedControlDemo },
  { id: "tabs", title: "Tabs", description: "같은 화면 안에서 내용을 나눠 보여 준다. 5개 이하는 fill, 6개 이상이거나 라벨이 길면 hug. 둥근 칩 모양 고르기는 Chip을 쓴다.", Demo: D.TabsDemo },
  { id: "stepper", title: "Stepper", description: "여러 단계 흐름에서 지금 단계를 진행 막대로 보여 준다. TopBar 바로 아래에 두고, 확인 · 결과 화면에는 두지 않는다. MVP 밖 임시 추가다.", Demo: D.StepperDemo },
  { id: "bottom-navigation", title: "BottomNavigation", description: "앱 최상위 화면 사이를 오가는 하단 탭 바. 항목 3~5개, 아이콘 + 글자. 들어간 화면에는 두지 않는다. MVP 밖 임시 추가다.", Demo: D.BottomNavigationDemo },
];

export default function NavigationPage() {
  return (
    <DocPage
      href="/docs/components/navigation"
      category="Components"
      wide
      title="Navigation"
      description="지금 위치를 알려 주고 화면 사이를 오가게 하는 부품이다."
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

import DocPage, { Section } from "../../../doc-page";
import * as D from "./demos";

export const metadata = { title: "Navigation · 딸깍 디자인 시스템" };

const sections = [
  { id: "top-bar", title: "TopBar", description: "화면 맨 위 제목 줄. 첫 화면이 아니면 뒤로가기, 위로 덮은 화면 · 완료 화면은 닫기. 오른쪽 아이콘은 2개까지다.", Demo: D.TopBarDemo },
  { id: "tabs", title: "Tabs", description: "같은 화면 안에서 내용을 나눠 보여 준다. 5개 이하는 fill, 6개 이상이거나 라벨이 길면 hug.", Demo: D.TabsDemo },
];

export default function NavigationPage() {
  return (
    <DocPage
      href="/docs/components/navigation"
      category="Components"
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

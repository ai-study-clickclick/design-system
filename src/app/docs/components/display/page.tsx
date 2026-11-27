import DocPage, { Section } from "../../../doc-page";
import * as D from "./demos";

export const metadata = { title: "Display · 딸깍 디자인 시스템" };

const sections = [
  { id: "card", title: "Card", description: "사진이 주인 항목이나 묶음을 담는 면. 그림자 없이 테두리로 나눈다. 작은 행동은 size=sm, 카드 전체 행동은 꽉 찬 버튼으로 둔다.", Demo: D.CardDemo },
  { id: "list-item", title: "ListItem", description: "글이 주인 항목의 한 줄. 이동하는 줄은 오른쪽 화살표를 둔다.", Demo: D.ListItemDemo },
  { id: "badge", title: "Badge", description: "상태 · 분류를 짧게 보여 준다. 눌러지지 않는다. 한 대상에 1~2개까지.", Demo: D.BadgeDemo },
  { id: "divider", title: "Divider", description: "내용 사이를 나누는 줄. 목록 · 묶음 사이는 line, 화면 안 큰 구역 사이는 thick. MVP 밖 임시 추가다.", Demo: D.DividerDemo },
  { id: "accordion", title: "Accordion", description: "눌러서 펼치고 접는 묶음. 자주 묻는 질문 · 약관 · 유의 사항처럼 긴 글을 정리한다. MVP 밖 임시 추가다.", Demo: D.AccordionDemo },
  { id: "avatar", title: "Avatar", description: "사람 · 가게를 나타내는 동그란 사진. 크기 48 하나다.", Demo: D.AvatarDemo },
];

export default function DisplayPage() {
  return (
    <DocPage
      href="/docs/components/display"
      category="Components"
      wide
      title="Display"
      description="내용을 담아 보여 주는 부품이다."
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

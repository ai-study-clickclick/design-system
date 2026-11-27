import DocPage, { Section } from "../../../doc-page";
import { ButtonLayouts, ButtonSizes, ButtonStates, IconButtonDemo, TextButtonDemo } from "./demos";

export const metadata = { title: "Actions · 딸깍 디자인 시스템" };

export default function ActionsPage() {
  return (
    <DocPage
      href="/docs/components/actions"
      category="Components"
      wide
      title="Actions"
      description="누르면 무언가를 실행하는 부품이다. 채움 버튼은 한 화면에 하나만 둔다."
      toc={[
        { id: "button-size", title: "Button · 크기" },
        { id: "button-state", title: "Button · 상태" },
        { id: "button-layout", title: "Button · 배치" },
        { id: "icon-button", title: "IconButton" },
        { id: "text-button", title: "TextButton" },
      ]}
    >
      <Section id="button-size" title="Button · 크기" description="variant 6가지 × size 4가지. 큰 버튼은 하단 고정, 보통 버튼은 본문, 작은 버튼은 카드 · 목록 안, xs는 Toast처럼 좁은 자리에 쓴다. primaryWeak · neutral · sm · xs는 임시이고, staticWhiteWeak(어두운 면 위 흰 막)은 Toast 안에서만 쓴다.">
        <ButtonSizes />
      </Section>
      <Section id="button-state" title="Button · 상태" description="처리가 1초를 넘으면 배경이 눌림 색으로 고정되고 글자 자리에 Spinner가 돈다. 1초 안에 끝나면 모양은 그대로다.">
        <ButtonStates />
      </Section>
      <Section id="button-layout" title="Button · 배치" description="폭은 버튼이 아니라 놓는 자리가 정한다. 화면 하단 고정 영역에 두 개를 나란히 두면 닫기 + 채움은 3:7, 그 밖은 5:5. Bottom sheet 안은 늘 5:5.">
        <ButtonLayouts />
      </Section>
      <Section id="icon-button" title="IconButton" description="아이콘만 있는 버튼. 보이는 크기가 작아도 누르는 영역은 44다. aria-label을 꼭 준다. MVP 밖 임시 추가다.">
        <IconButtonDemo />
      </Section>
      <Section id="text-button" title="TextButton" description="글자만 있는 가벼운 버튼. 다른 화면으로 가면 화살표를 붙인다. 화면의 주된 행동에는 쓰지 않는다. MVP 밖 임시 추가다.">
        <TextButtonDemo />
      </Section>
    </DocPage>
  );
}

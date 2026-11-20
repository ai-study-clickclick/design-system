import DocPage, { Section } from "../../../doc-page";
import { ButtonLayouts, ButtonSizes, ButtonStates } from "./demos";

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
      ]}
    >
      <Section id="button-size" title="Button · 크기" description="variant 6가지 × size 3가지. 큰 버튼은 하단 고정, 보통 버튼은 본문, 작은 버튼은 카드 · 목록 안에 쓴다. primaryWeak · neutral · sm은 임시다.">
        <ButtonSizes />
      </Section>
      <Section id="button-state" title="Button · 상태" description="처리가 1초를 넘으면 배경이 눌림 색으로 고정되고 글자 자리에 Spinner가 돈다. 1초 안에 끝나면 모양은 그대로다.">
        <ButtonStates />
      </Section>
      <Section id="button-layout" title="Button · 배치" description="폭은 버튼이 아니라 놓는 자리가 정한다. 두 개를 나란히 두면 닫기 + 채움은 3:7, 그 밖은 5:5.">
        <ButtonLayouts />
      </Section>
    </DocPage>
  );
}

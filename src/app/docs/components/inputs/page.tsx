import DocPage, { Section } from "../../../doc-page";
import * as D from "./demos";

export const metadata = { title: "Inputs · 딸깍 디자인 시스템" };

const sections = [
  { id: "input", title: "Input", description: "한 줄 입력. 포커스는 2px 진한 테두리, 오류는 빨간 테두리와 아래 문구로 알린다.", Demo: D.InputStates },
  { id: "date-input", title: "DateInput", description: "날짜 입력. 누르면 바텀시트로 캘린더가 열린다. MVP 밖 임시 추가다.", Demo: D.DateInputDemo },
  { id: "textarea", title: "Textarea", description: "여러 줄 입력. autoSize를 켜면 3줄에서 시작해 늘어나고, 끄면 2줄 높이에서 안쪽으로 스크롤한다.", Demo: D.TextareaDemo },
  { id: "select", title: "Select", description: "누르면 바텀시트로 선택 목록이 열린다. 드롭다운은 쓰지 않는다. plain은 임시 추가다.", Demo: D.SelectDemo },
  { id: "checkbox", title: "Checkbox", description: "여러 개를 고르거나 하나를 켜고 끈다. 라벨까지 누르는 영역이다.", Demo: D.CheckboxDemo },
  { id: "radio", title: "Radio", description: "여러 개 중 하나를 고른다. 세로 배치가 기본이다.", Demo: D.RadioDemo },
  { id: "switch", title: "Switch", description: "켜면 바로 반영되는 설정. 저장 버튼을 두지 않는다.", Demo: D.SwitchDemo },
  { id: "calendar", title: "Calendar", description: "날짜 고르기. MVP 밖 임시 추가로, 값은 SEED를 참고했다.", Demo: D.CalendarDemo },
];

export default function InputsPage() {
  return (
    <DocPage
      href="/docs/components/inputs"
      category="Components"
      wide
      title="Inputs"
      description="값을 넣거나 고르는 부품이다. 라벨 → 입력칸 → 도움말 또는 오류 문구 순서로 둔다."
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

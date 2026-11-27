import Link from "next/link";
import DocPage, { Section } from "../../doc-page";

export const metadata = { title: "Components · 딸깍 디자인 시스템" };

// 컴포넌트 묶음. MVP 19개 + 임시 추가(MVP 밖, (임시) 표시). 이름 · 속성은 3-2 비교표, 값은 DESIGN.md를 따른다
const groups = [
  { href: "/docs/components/actions", title: "Actions", description: "누르면 실행하는 부품", items: ["Button", "IconButton(임시)", "TextButton(임시)"] },
  { href: "/docs/components/inputs", title: "Inputs", description: "값을 넣거나 고르는 부품", items: ["Input", "DateInput(임시)", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Chip(임시)", "Calendar(임시)"] },
  { href: "/docs/components/display", title: "Display", description: "내용을 담아 보여 주는 부품", items: ["Card", "ListItem", "Divider(임시)", "Accordion(임시)", "Badge", "Avatar"] },
  { href: "/docs/components/navigation", title: "Navigation", description: "위치를 알려 주고 오가게 하는 부품", items: ["TopBar", "Tabs", "SegmentedControl(임시)", "Stepper(임시)", "BottomNavigation(임시)"] },
  { href: "/docs/components/feedback", title: "Feedback", description: "상태와 결과를 알려 주는 부품", items: ["Modal", "BottomSheet", "Toast", "Banner", "Spinner", "Skeleton"] },
];

export default function ComponentsPage() {
  return (
    <DocPage
      href="/docs/components"
      category="Components"
      title="Overview"
      description="화면을 만드는 부품이다. 이름과 속성은 코드와 피그마에서 같게 쓰고, (임시)는 팀 확정 전이다."
      toc={[{ id: "groups", title: "묶음" }]}
    >
      <Section id="groups" title="묶음">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
          {groups.map((g) => (
            <Link key={g.href} href={g.href} className="flex flex-col gap-8 rounded-lg border border-neutral-weak bg-layer-default p-20 hover:bg-layer-default-pressed">
              <span className="text-title-sm">{g.title}</span>
              <span className="text-body-md text-neutral-muted">{g.description}</span>
              <span className="text-body-sm text-neutral-subtle">{g.items.join(" · ")}</span>
            </Link>
          ))}
        </div>
      </Section>
    </DocPage>
  );
}

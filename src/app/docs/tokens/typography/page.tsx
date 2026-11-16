import DocPage, { Section } from "../../doc-page";
import { readTokens } from "../read-tokens";

export const metadata = { title: "글자 · 딸깍 디자인 시스템" };

const groups = [
  { key: "title", title: "Title", description: "화면 제목과 큰 묶음의 제목에 쓴다" },
  { key: "body", title: "Body", description: "본문과 설명 글에 쓴다" },
  { key: "emphasis", title: "Emphasis", description: "본문 크기에서 조금 힘을 줄 때 쓴다" },
  { key: "label", title: "Label", description: "버튼 · 탭 · 배지처럼 누르거나 고르는 요소의 글자다" },
  { key: "caption", title: "Caption", description: "작은 보조 글자다" },
];

export default function TypographyPage() {
  const { typography } = readTokens();

  return (
    <DocPage
      href="/docs/tokens/typography"
      category="토큰"
      title="글자"
      description="글꼴은 Pretendard 하나를 쓴다. 글자 스타일 하나가 크기 · 굵기 · 줄 높이를 함께 정한다"
      toc={[{ id: "usage", title: "쓰는 법" }, ...groups.map((g) => ({ id: g.key, title: g.title }))]}
    >
      <Section id="usage" title="쓰는 법" description="클래스 text-<이름> 하나로 크기 · 굵기 · 줄 높이가 함께 들어간다. 예: text-title-lg" >
        <p className="rounded-md bg-neutral-muted p-20 text-body-md">
          글꼴: Pretendard · 대체 글꼴: 시스템 기본 글꼴
        </p>
      </Section>
      {groups.map((g) => {
        const styles = typography.filter((t) => t.name.split("-")[0] === g.key);
        if (styles.length === 0) return null;
        return (
          <Section key={g.key} id={g.key} title={g.title} description={g.description}>
            <ul className="divide-y divide-neutral-weak border-y border-neutral-weak">
              {styles.map((t) => (
                <li key={t.name} className="flex items-center gap-24 py-16">
                  <div className="w-[160px] shrink-0">
                    <p className="text-label-md">{t.name}</p>
                    <p className="mt-2 text-body-sm text-neutral-subtle">
                      {t.fontSize} · {t.fontWeight} · {t.lineHeight}
                    </p>
                  </div>
                  <p
                    className="min-w-0 flex-1 truncate"
                    style={{ fontSize: t.fontSize, fontWeight: Number(t.fontWeight), lineHeight: t.lineHeight }}
                  >
                    다람쥐 헌 쳇바퀴에 타고파 0123456789
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
    </DocPage>
  );
}

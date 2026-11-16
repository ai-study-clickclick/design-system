// 프로토타입 화면 틀. 사이트 틀(위 메뉴 · 왼쪽 메뉴) 안의 본문 자리에 앱 화면을 놓는다
// 앱 화면 폭은 기준 375px, 최대 480px(DESIGN.md "Layout")
// 휴대폰(768px 미만)에서는 테두리 없이 화면 폭을 다 써서 실제 앱처럼 보이게 한다
export default function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-16 md:mx-0 md:py-40">
      <div className="mx-auto min-h-[calc(100vh-56px)] w-full max-w-screen-max overflow-hidden bg-layer-default md:min-h-[640px] md:rounded-lg md:border md:border-neutral-weak">
        {children}
      </div>
    </div>
  );
}

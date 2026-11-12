// 프로토타입 화면 틀. 기준 폭 375px, 최대 480px (`DESIGN.md`)
export default function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-white">{children}</div>
    </div>
  );
}

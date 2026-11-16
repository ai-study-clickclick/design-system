import ScreenFrame from "../screen-frame";

// 예시 화면. 프로토타입 폴더 구조 확인용이다. 첫 실제 화면이 생기면 지운다
export default function ExampleScreen() {
  return (
    <ScreenFrame>
      <main className="px-screen-margin py-40">
        <h1 className="text-title-md">예시 화면</h1>
        <p className="mt-8 text-body-md text-neutral-muted">
          프로토타입은 이 틀(기준 폭 375px, 최대 480px) 안에 만든다
        </p>
      </main>
    </ScreenFrame>
  );
}

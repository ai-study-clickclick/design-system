import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "./site-shell";
import { getScreens } from "./prototypes/screens";

export const metadata: Metadata = {
  title: "딸깍 디자인 시스템",
  description: "자연어 요청으로 화면을 만드는 디자인 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <SiteShell screens={getScreens()}>{children}</SiteShell>
      </body>
    </html>
  );
}

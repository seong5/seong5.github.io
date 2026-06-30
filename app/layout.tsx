import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

// UI/본문 라틴 글리프 — 한글은 Pretendard로 폴백 (globals.css의 --font-sans 체인)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 디스플레이 티어 — 영문 대문자 96px 캠페인 로크업 (Futura ND 대체)
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "신성오 — Frontend Developer",
  description:
    "신성오 (Shin Seong-oh) — 사용자 경험 개선의 우선순위를 읽어내고, 끊임없는 도전으로 서비스의 성장을 증명하는 프론트엔드 개발자 포트폴리오.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body
        className={`${pretendard.variable} ${inter.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

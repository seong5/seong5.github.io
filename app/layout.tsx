import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  display: "swap",
});

// IBM Plex Sans KR ships Korean glyphs in a subset next/font can't select,
// so omit `subsets` and disable preload to pull the full face instead.
const ibmPlexSansKR = IBM_Plex_Sans_KR({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-sans",
  display: "swap",
  preload: false,
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
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className={`${ibmPlexMono.variable} ${ibmPlexSansKR.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

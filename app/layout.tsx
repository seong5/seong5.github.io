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

const title = "신성오 — Frontend Developer";
const description =
  "신성오 (Shin Seong-oh) — 사용자 경험 개선의 우선순위를 읽어내고, 끊임없는 도전으로 서비스의 성장을 증명하는 프론트엔드 개발자 포트폴리오.";

export const metadata: Metadata = {
  metadataBase: new URL("https://seong5.github.io"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "신성오 포트폴리오",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-[0.9375rem] focus:font-medium focus:text-on-accent"
        >
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}

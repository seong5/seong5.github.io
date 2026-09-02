import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';

// 디스플레이 티어 — 히어로 h1·섹션 h2·지표 숫자
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// 마이크로 라벨 전담 — 01·STACK·RESULT·CONTENTS·기간·카운트.
// 이 디자인의 시그니처라 폴백으로 밀리면 인상이 크게 달라진다.
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// 한글 본문은 Pretendard (globals.css의 --font-sans 체인)

const title = '신성오 — Frontend Developer';
const description =
  '신성오 (Shin Seong-oh) — 사용자 경험 개선의 우선순위를 읽어내고, 끊임없는 도전으로 서비스의 성장을 증명하는 프론트엔드 개발자 포트폴리오.';

export const metadata: Metadata = {
  metadataBase: new URL('https://seong5.github.io'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: '신성오 포트폴리오',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

/* output:'export' 정적 사이트라 서버가 테마를 못 정한다.
   paint 전에 동기 실행해 data-theme을 세워야 다크 선택 시 흰 화면이 번쩍이지 않는다.
   localStorage 접근은 사생활 보호 모드에서 throw할 수 있어 try/catch로 감싼다. */
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning — 위 스크립트가 서버 HTML에 없던 data-theme을 붙인다
    <html lang="ko" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-chip focus:bg-accent focus:px-4 focus:py-2 focus:text-label focus:font-semibold focus:text-accent-ink"
        >
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}

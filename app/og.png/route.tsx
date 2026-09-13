/* ──────────────────────────────────────────────────────────
   OG 이미지 — 빌드타임 생성.

   예전에는 손으로 만든 public/og-image.png였고, 문구·색이 사이트와 따로 놀았다
   (민트색 구 디자인 + 옛 헤드라인 + 없어진 내비 목록). 문구는 app/content/copy.ts,
   프로필은 app/content/profile.ts 하나만 보게 해서 다시 어긋나지 않게 한다.

   ⚠️ satori 제약 — node_modules/next/dist/docs/.../image-response.md
   · flexbox와 absolute만 된다. grid 불가. 자식이 둘 이상인 컨테이너는
     display:flex를 명시하지 않으면 렌더가 어긋난다.
   · CSS 변수·color-mix()·clamp()를 쓸 수 없다. globals.css 토큰 대신 hex를 박는다.
   · 폰트는 ttf/otf/woff만. next/font/google 산출물은 woff2라 재사용 불가 —
     그래서 assets/ 에 별도 파일을 둔다 (assets/README.md 참조).

   ⚠️ globals.css:96-101 규칙이 여기에도 적용된다. 라임(#c6f24e)은 밝은 배경 위
   텍스트로 쓰면 1.4:1로 죽는다 — 채움에만 쓰고 그 위 글자는 #101410.

   ⚠️ 왜 app/opengraph-image.tsx 가 아니라 라우트 핸들러인가 —
   메타데이터 파일 규약을 쓰면 static export 산출물이 확장자 없는 `out/opengraph-image`
   로 떨어진다. GitHub Pages는 확장자로 Content-Type을 정하므로 그 파일은
   application/octet-stream 으로 나가고 카카오톡·페이스북 스크래퍼가 이미지로
   인식하지 못한다. 라우트 이름을 og.png 로 두면 `out/og.png` 가 그대로 생긴다.
   대신 og:image 메타는 app/layout.tsx 가 직접 선언한다.
   ────────────────────────────────────────────────────────── */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { HEADLINE, INTRO, LEAD } from '../content/copy';
import { PROFILE } from '../content/profile';

/* output:'export' 는 이 선언이 없으면 "dynamic = force-static not configured" 로 멈춘다 */
export const dynamic = 'force-static';

const size = { width: 1200, height: 630 };

/* globals.css :root 라이트 모드 값 */
const LIME = '#2c4a1e'; // --primary(라이트) — 짙은 녹색 채움
const ON_LIME = '#f5f4f0'; // --primary-foreground — 짙은 녹색 위 8.6:1
const SIDEBAR = '#0c0f12'; // 다크 --background
const SIDEBAR_DIM = '#8a939d'; // 다크 --muted-foreground

/* SiteNav.tsx 의 NAV 와 각 섹션의 SectionHead idx 를 그대로 따른다 */
const NAV = ['Journey', 'Projects', 'About', 'Skills', 'Contact'];

const font = (file: string) => readFile(join(process.cwd(), 'assets', file));

export async function GET() {
  const [grotesk, pretendardBold, pretendardRegular] = await Promise.all([
    font('SpaceGrotesk-Bold.ttf'),
    font('Pretendard-Bold.subset.woff'),
    font('Pretendard-Regular.subset.woff'),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', fontFamily: 'Pretendard' }}>
        {/* ── 좌측 사이드바 ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 248,
            padding: '44px 32px',
            background: SIDEBAR,
            color: '#edeff1',
          }}
        >
          <div
            style={{
              fontFamily: 'Space Grotesk',
              fontSize: 13,
              letterSpacing: '0.06em',
              color: SIDEBAR_DIM,
            }}
          >
            Portfolio 2026
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{PROFILE.name}</div>
            <div
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: 13,
                letterSpacing: '0.04em',
                color: SIDEBAR_DIM,
                marginTop: 4,
              }}
            >
              {PROFILE.nameEn}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 52 }}>
            {/* 번호를 붙이지 않는다 — 내비게이션은 순서가 아니다 */}
            {NAV.map((label) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'Space Grotesk', fontSize: 16 }}>{label}</span>
              </div>
            ))}
          </div>

          {/* marginTop:auto 로 하단 고정 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              marginTop: 'auto',
              fontSize: 13,
              color: SIDEBAR_DIM,
            }}
          >
            <span>{PROFILE.location}</span>
            <span>{PROFILE.email}</span>
            <span>github.com/seong5</span>
          </div>
        </div>

        {/* ── 우측 패널 ── */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '58px 56px',
              background: LIME,
              color: ON_LIME,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Space Grotesk',
                fontSize: 78,
                lineHeight: 1.04,
                letterSpacing: '-0.045em',
              }}
            >
              <span>{HEADLINE.line1}</span>
              <span>{HEADLINE.line2}</span>
            </div>

            <div
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: 14,
                letterSpacing: '0.06em',
                marginTop: 22,
              }}
            >
              {PROFILE.role}
            </div>

            {/* Satori는 자식이 둘 이상인 div에 display를 명시해야 한다 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 27,
                fontWeight: 700,
                lineHeight: 1.45,
                marginTop: 34,
              }}
            >
              <span>{LEAD.line1}</span>
              <span>{LEAD.line2}</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                marginTop: 28,
                fontSize: 15,
                lineHeight: 1.55,
              }}
            >
              {INTRO.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* 하단 띠 — 사이드바와 같은 면으로 이어 붙여 카드가 떠 보이게 한다 */}
          <div style={{ display: 'flex', height: 56, background: SIDEBAR }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Space Grotesk', data: grotesk, style: 'normal', weight: 700 },
        { name: 'Pretendard', data: pretendardRegular, style: 'normal', weight: 400 },
        { name: 'Pretendard', data: pretendardBold, style: 'normal', weight: 700 },
      ],
    },
  );
}

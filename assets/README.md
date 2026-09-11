# OG 이미지 전용 폰트

`app/opengraph-image.tsx`(satori)가 `readFile`로 직접 읽는 폰트다. **웹 페이지로는
나가지 않는다** — 사이트 본문 폰트는 `app/layout.tsx`의 `next/font/google`과
`pretendard` 패키지가 담당한다.

여기 따로 두는 이유: satori는 `ttf`/`otf`/`woff`만 읽는데, `next/font/google`이
받아오는 산출물은 전부 `woff2`라 재사용할 수 없다.
(`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/image-response.md:52`)

| 파일 | 출처 | 비고 |
|---|---|---|
| `SpaceGrotesk-Bold.ttf` | Google Fonts CSS API v2 (`wght@700` 정적 인스턴스) | 헤드라인 전용. variable 원본은 기본 인스턴스가 300이라 얇게 나온다 |
| `Pretendard-{Bold,Regular}.subset.woff` | `node_modules/pretendard/dist/web/static/woff-subset/` | 한글 2780자 + 라틴 (`pretendard/subset_glyphs.txt` 기준). 문구를 바꿔도 두부(□)가 나지 않는다 |

## 라이선스

둘 다 SIL Open Font License 1.1.

- Pretendard — Copyright (c) 2021 Kil Hyung-jin, with Reserved Font Name Pretendard.
  https://github.com/orioncactus/pretendard
- Space Grotesk — Copyright (c) 2018 Florian Karsten.
  https://github.com/floriankarsten/space-grotesk

라이선스 전문: https://scripts.sil.org/OFL

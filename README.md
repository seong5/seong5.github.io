# seong5.github.io

신성오(Shin Seong-oh) 프론트엔드 포트폴리오. Next.js 정적 export로 빌드해 GitHub Pages에 배포한다.

## 개발

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # ./out 으로 정적 export
pnpm lint
```

- Next.js 16 (App Router · Turbopack) / React 19 / Tailwind CSS v4
- `output: 'export'` — 서버 런타임이 없다. API route·서버 액션·ISR을 쓸 수 없고 모든 페이지가 빌드타임 프리렌더된다.
- `.github/workflows/deploy.yml` 이 `pnpm install --frozen-lockfile` 로 설치하므로, 의존성을 바꾸면 `pnpm-lock.yaml` 을 반드시 함께 커밋해야 한다.

## 구조

```
app/
  globals.css          디자인 시스템 단일 출처 (@theme 토큰 + 다크 스왑)
  layout.tsx           폰트 · 메타데이터 · 테마 FOUC 방지 스크립트
  page.tsx             메인 — Hero → Projects → About → Skills → Contact
  components/          UI 프리미티브(ui.tsx)와 섹션 컴포넌트
  content/profile.ts   이름·이메일·GitHub 단일 출처
  projects/projects.ts 프로젝트 데이터 + 타입 (상세 페이지의 유일한 소스)
  projects/[slug]/     프로젝트 상세 (generateStaticParams로 프리렌더)
  resume/              A4 입사지원서 — 아래 주의 참조
public/projects/       스크린샷(webp) · 다이어그램(svg)
scripts/               이미지 최적화
```

## 디자인 시스템

색·타이포·radius·컨테이너 토큰은 전부 `app/globals.css` 의 `@theme` 한 곳에 있다.
Tailwind v4 CSS-first 방식이라 `tailwind.config.*` 는 존재하지 않는다.

- **팔레트는 TRACK(잉크 + 라임) 단일.** 보류한 3종(CLAY·SIGNAL·DUSK) 값은 같은 파일 하단 주석에 보존돼 있다.
- **다크 모드는 `dark:` 변형을 쓰지 않는다.** `:root[data-theme="dark"]` 에서 토큰 값만 갈아끼우면 같은 유틸리티가 두 테마에서 각각 해석된다.
- ⚠️ **라임(`--color-accent`)은 라이트 배경에서 텍스트로 쓰면 1.4:1 로 죽는다.** 채움(버튼 배경·보더·좌측 라인) 전용이고, 액센트 텍스트 자리는 `--color-accent-deep` 이 맡는다.
- 모션은 인라인 `style` 이 아니라 클래스(`.rise-line`·`.fade-in`·`.pulse-dot`)로만 건다. `prefers-reduced-motion` 에서 일괄 차단하기 위함이다.

## 주의 — `app/resume/**` 는 동결

명시적 요청 전까지 수정하지 않는다. `.resume-shell` 이 `--color-ink`·`--color-charcoal`·`--color-mute`·`--color-hairline`·`--color-on-primary` 5개를 Warm Editorial 값으로 덮어써서, 사이트 팔레트가 바뀌어도 이력서는 그대로 유지된다. `@theme` 의 이 5개 토큰은 **resume 전용 legacy** 이므로 지우면 안 된다.

`app/resume/page.tsx` 는 `projects.ts` 의 `highlights`·`stack`·`resumeBullets`·`resumeStack` 을 직접 소비한다. 이 필드들의 이름을 바꾸면 이력서가 깨진다.

## 포맷

프리티어 설정 파일이 없다. 저장소 스타일은 `--single-quote --print-width 100` 이며,
기본값(쌍따옴표·80자)으로 돌리면 전 파일이 재포맷된다.

```bash
npx prettier --single-quote --print-width 100 --write <파일>
```

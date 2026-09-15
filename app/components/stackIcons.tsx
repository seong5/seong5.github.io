import {
  siAxios,
  siDeno,
  siDocker,
  siElectron,
  siElectronbuilder,
  siEslint,
  siExpo,
  siGithubactions,
  siJavascript,
  siJest,
  siKakao,
  siLangchain,
  siMockserviceworker,
  siNextdotjs,
  siPostgresql,
  siPrettier,
  siReact,
  siReacthookform,
  siReactquery,
  siSass,
  siStorybook,
  siStyledcomponents,
  siSupabase,
  siTailwindcss,
  siTanstack,
  siTestinglibrary,
  siTypescript,
  siVercel,
  siVite,
  siZod,
} from 'simple-icons';
import { DEVICON_VIEWBOX, devAws, devPlaywright, devZustand } from './deviconPaths';

type Icon = { path: string; hex: string; viewBox?: string };

// 키는 normalize()를 거친 이름이다. simple-icons에 없는 AWS·Zustand·Playwright는 devicon에서
// 가져왔고, 어디에도 로고가 없는 스택(Recharts 등)은 비워 둔다 — 비슷한 로고로 대신하면 틀린 정보가 된다.
const ICONS: Record<string, Icon> = {
  react: siReact,
  'react native': siReact,
  'next.js': siNextdotjs,
  expo: siExpo,
  'expo router': siExpo,
  'expo notifications': siExpo,
  'eas build': siExpo,
  electron: siElectron,
  'electron-builder': siElectronbuilder,
  vite: siVite,
  javascript: siJavascript,
  typescript: siTypescript,
  'styled-components': siStyledcomponents,
  // SCSS는 Sass의 문법이라 공식 로고도 Sass 로고를 쓴다
  scss: siSass,
  sass: siSass,
  storybook: siStorybook,
  docker: siDocker,
  // TanStack 로고의 공식 색(#ECE8D1 크림)은 밝아서 걸러진다 — 제품(Query) 색인 React Query 빨강을 쓴다
  'tanstack query': { ...siTanstack, hex: siReactquery.hex },
  'react hook form': siReacthookform,
  zod: siZod,
  aws: { ...devAws, viewBox: DEVICON_VIEWBOX },
  zustand: { ...devZustand, viewBox: DEVICON_VIEWBOX },
  playwright: { ...devPlaywright, viewBox: DEVICON_VIEWBOX },
  axios: siAxios,
  msw: siMockserviceworker,
  jest: siJest,
  'testing library': siTestinglibrary,
  eslint: siEslint,
  prettier: siPrettier,
  'tailwind css': siTailwindcss,
  supabase: siSupabase,
  postgresql: siPostgresql,
  pg_cron: siPostgresql,
  'edge functions': siDeno,
  vercel: siVercel,
  'github actions': siGithubactions,
  langchain: siLangchain,
  'kakao maps sdk': siKakao,
};

// 'Next.js (App Router)'·'React Native 0.86'처럼 괄호 설명과 버전 꼬리를 떼고 찾는다
function normalize(name: string) {
  return name
    .replace(/\s*\(.*\)$/, '')
    .replace(/\s+[\d.]+$/, '')
    .toLowerCase();
}

// 브랜드 hex는 흰/검정 바탕 기준이라 명도가 극단인 로고(Next.js·Vercel·Expo의 검정,
// TanStack의 크림색)는 한쪽 테마에서 사라진다. 그런 로고는 글자색을 유지한다.
function brandColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.05 || luminance > 0.78 ? 'currentColor' : `#${hex}`;
}

/** 스택의 브랜드 색. 쓸지 말지·어디에 쓸지는 호출부가 정한다(Skills는 hover 때 로고·테두리). */
export function getStackBrand(name: string) {
  const icon = ICONS[normalize(name)];
  return icon ? brandColor(icon.hex) : undefined;
}

/** 스택 이름 앞에 붙는 단색 로고. 매핑이 없으면 아무것도 그리지 않는다. */
export function StackIcon({ name }: { name: string }) {
  const icon = ICONS[normalize(name)];
  if (!icon) return null;
  // 옆에 이름이 같이 있으니 스크린리더에는 장식이다
  return (
    <svg
      viewBox={icon.viewBox ?? '0 0 24 24'}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}

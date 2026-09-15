'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Switch } from './ui/switch';

// 서버에서 useLayoutEffect는 경고를 낸다. 정적 export라 빌드 때 SSR을 거치므로 분기한다.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * 테마 스위치.
 *
 * 정적 export라 서버는 테마를 모른다 — 첫 렌더는 항상 라이트로 나가고,
 * layout.tsx의 인라인 스크립트가 paint 전에 세워둔 data-theme을 읽어 교정한다.
 * useEffect가 아니라 useLayoutEffect인 이유가 이것이다. 교정이 페인트 전에
 * 끝나야 다크로 저장한 사용자의 새로고침에서 노브가 튀지 않는다.
 *
 * 양옆 글리프는 상태를 안 읽고 dark: 변형으로 색이 갈린다 — 하이드레이션과
 * 무관하게 처음부터 맞는 색으로 그려진다.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const toggle = useCallback((next: boolean) => {
    const theme = next ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    setDark(next);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // 사생활 보호 모드 — 이번 세션에만 적용되고 조용히 넘어간다
    }
  }, []);

  return (
    <div className={`flex flex-none items-center gap-2 ${className}`.trim()}>
      <span
        aria-hidden
        className="font-mono text-label text-primary-strong dark:text-muted-foreground"
      >
        ☀
      </span>
      <Switch
        size="lg"
        checked={dark}
        onCheckedChange={toggle}
        aria-label="라이트/다크 테마 전환"
        title="테마 전환"
      />
      <span
        aria-hidden
        className="font-mono text-label text-muted-foreground dark:text-primary-strong"
      >
        ☾
      </span>
    </div>
  );
}

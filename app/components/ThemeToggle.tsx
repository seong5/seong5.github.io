'use client';

import { useCallback } from 'react';

/**
 * 테마 토글.
 *
 * 아이콘을 state로 그리지 않고 두 글리프를 모두 렌더한 뒤 dark: 변형으로
 * 하나만 보인다. layout.tsx의 인라인 스크립트가 paint 전에 data-theme을
 * 세우므로, 이 방식이면 하이드레이션 불일치도 아이콘 깜빡임도 없다.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // 사생활 보호 모드 — 이번 세션에만 적용되고 조용히 넘어간다
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="라이트/다크 테마 전환"
      title="테마 전환"
      className={`grid h-[34px] w-[34px] flex-none cursor-pointer place-items-center rounded-chip border border-border bg-transparent font-mono text-label text-text transition-colors hover:bg-surface-2 ${className}`.trim()}
    >
      <span aria-hidden className="dark:hidden">
        ☾
      </span>
      <span aria-hidden className="hidden dark:inline">
        ☀
      </span>
    </button>
  );
}

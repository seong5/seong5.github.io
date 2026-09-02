'use client';

import { useEffect, useRef } from 'react';

/**
 * 상단 2px 읽기 진행바. 전역(메인·상세 공통).
 *
 * motion 대신 passive 스크롤 리스너로 width만 직접 쓴다 — 레이아웃을 유발하지 않는
 * 속성이고, 라이브러리 하나를 통째로 들이지 않아도 되는 수준의 일이다.
 */
export default function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (ref.current) {
        ref.current.style.width = `${max > 0 ? (el.scrollTop / max) * 100 : 0}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden
      ref={ref}
      className="fixed inset-x-0 top-0 z-90 h-0.5 w-0 bg-accent"
      style={{ width: 0 }}
    />
  );
}

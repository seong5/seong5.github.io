'use client';

import { useCallback, useRef, type ReactNode } from 'react';

/**
 * 커서를 따라 미세하게 기우는 3D 카드.
 *
 * 터치 기기와 prefers-reduced-motion에서는 globals.css가 [data-tilt]의
 * transform을 무력화한다 — JS로 판정하면 SSR/CSR 시점 차이가 생기므로
 * 판정은 CSS에 맡기고 여기서는 값만 쓴다.
 */
export default function Tilt({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${-dy * 2.2}deg) rotateY(${dx * 2.6}deg) translateY(-3px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = '';
  }, []);

  return (
    <div
      ref={ref}
      data-tilt
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 ease-out ${className}`.trim()}
    >
      {children}
    </div>
  );
}

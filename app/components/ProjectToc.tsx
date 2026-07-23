'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type TocSection = { id: string; label: string };

export default function ProjectToc({
  sections,
  slug,
}: {
  sections: TocSection[];
  slug: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const reduceMotion = useReducedMotion();
  const indicatorTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 32 };

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // 상단 sticky 바(약 62~106px)만큼 위를 잘라내고, 화면 하단 70%는 비활성 처리
      { rootMargin: '-110px 0px -70% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <>
      {/* 넓은 화면: 본문 우측 여백에 고정된 세로 목차 */}
      <nav className="fixed left-[calc(50%+460px+40px)] top-[120px] z-[8] hidden w-[168px] toc:block">
        <div className="mb-3 text-[0.6875rem] uppercase tracking-[.12em] text-ink-mute">
          Contents
        </div>
        <ul className="flex flex-col border-l border-hairline">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`relative -ml-px block whitespace-nowrap py-1 pl-[14px] text-[0.78125rem] uppercase leading-[1.5] tracking-[.06em] transition ${
                  active === s.id ? 'font-medium text-accent' : 'text-ink-mute hover:text-accent'
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId={`toc-desktop-indicator-${slug}`}
                    className="absolute inset-y-0 left-0 w-0.5 bg-accent"
                    transition={indicatorTransition}
                  />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 좁은 화면: 상단 바 아래 sticky 가로 탭 목차 */}
      <nav className="sticky top-[62px] z-[8] hidden border-b border-hairline bg-canvas/90 backdrop-blur-[8px] nav:block toc:hidden">
        <ul className="mx-auto flex max-w-[920px] gap-1.5 overflow-x-auto px-8 py-2.5 max-wrap:px-[22px] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`relative block whitespace-nowrap rounded-full px-3 py-1.5 text-[0.75rem] uppercase tracking-[.06em] transition ${
                  active === s.id ? 'font-medium text-accent' : 'text-ink-mute hover:text-accent'
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId={`toc-mobile-indicator-${slug}`}
                    className="absolute inset-0 rounded-full border border-hairline bg-accent-soft"
                    transition={indicatorTransition}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

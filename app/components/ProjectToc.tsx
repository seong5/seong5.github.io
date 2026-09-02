'use client';

import { useEffect, useState, type MouseEvent } from 'react';

export type TocSection = { id: string; label: string };

/**
 * 프로젝트 상세 목차.
 *
 * 넓은 화면에서는 본문 좌측 208px sticky 열, 좁은 화면에서는 가로 스크롤 칩 줄.
 * active 표시는 motion 대신 좌측 2px 보더 + 색 전환으로 처리한다(라이브러리 불필요).
 */
export default function ProjectToc({ sections }: { sections: TocSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

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
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
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
    <aside className="flex-none nav:sticky nav:top-[78px] nav:w-52">
      <span className="mb-2.5 hidden font-mono text-eyebrow tracking-[0.18em] text-muted nav:block">
        CONTENTS
      </span>
      <nav className="flex gap-1 overflow-x-auto pb-2 nav:flex-col nav:overflow-visible nav:pb-0 [&::-webkit-scrollbar]:hidden">
        {sections.map((s, i) => {
          const on = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              aria-current={on ? 'true' : undefined}
              className={`flex flex-none items-baseline gap-2.5 rounded-[8px] px-2.5 py-[7px] text-label font-semibold whitespace-nowrap transition-colors nav:border-l-2 nav:rounded-none ${
                on
                  ? 'bg-surface-2 text-text nav:bg-transparent nav:border-accent'
                  : 'text-muted hover:text-text nav:border-transparent'
              }`}
            >
              <span className="font-mono text-eyebrow">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

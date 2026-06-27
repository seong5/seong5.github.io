'use client';

import { useEffect, useState, type MouseEvent } from 'react';

export type TocSection = { id: string; label: string };

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
      <nav className="fixed left-[calc(50%+460px+40px)] top-[120px] z-[8] hidden w-[150px] toc:block">
        <div className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[.12em] text-muted">
          On this page
        </div>
        <ul className="flex flex-col border-l border-line">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`-ml-px block border-l-2 py-1 pl-3 text-[0.8125rem] leading-[1.5] transition ${
                  active === s.id
                    ? 'border-accent font-medium text-accent'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 좁은 화면: 상단 바 아래 sticky 가로 탭 목차 */}
      <nav className="sticky top-[62px] z-[8] border-b border-line bg-white/90 backdrop-blur-[8px] toc:hidden">
        <ul className="mx-auto flex max-w-[920px] gap-1.5 overflow-x-auto px-8 py-2.5 max-wrap:px-[22px] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`block whitespace-nowrap rounded-[5px] px-3 py-1.5 text-[0.78125rem] transition ${
                  active === s.id
                    ? 'border border-line bg-panel font-medium text-accent'
                    : 'border border-transparent text-muted hover:text-ink'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

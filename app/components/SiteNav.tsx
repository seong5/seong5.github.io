'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { PROFILE } from '../content/profile';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function SiteNav() {
  const [active, setActive] = useState('');
  // 섹션별 현재 가시 여부
  const visibilityRef = useRef<Record<string, boolean>>({});
  // 클릭 직후 스무스 스크롤 동안 scroll-spy 갱신을 멈춤(클릭 항목 유지)
  const lockRef = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 스크롤스파이 — 변경분만 보지 않고 NAV(=DOM 위→아래) 순서로
  // "가장 먼저 보이는" 섹션을 active로.
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibilityRef.current[entry.target.id] = entry.isIntersecting;
        }
        if (lockRef.current) return;
        const topmost = NAV.find((n) => visibilityRef.current[n.id]);
        if (topmost) setActive(topmost.id);
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 순수 앵커는 "이미 해당 해시"면 재스크롤을 안 하므로 항상 JS로 스크롤한다.
  // 다만 preventDefault만 하면 주소창이 계속 "/"에 머물러 섹션 링크를 공유하거나
  // 새로고침으로 복원할 수 없다 → replaceState로 해시는 직접 반영한다.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    lockRef.current = true;
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lockRef.current = false;
    }, 800);
    // sticky 헤더 높이만큼 도착점을 내린다.
    // 헤더는 flex-wrap이라 좁은 폭에서 2~3행(≈100~140px)이 된다 — 고정값을 쓰면
    // 그 구간에서 섹션 제목이 헤더 뒤에 가리므로 실제 높이를 잰다.
    const headerH = document.querySelector('header')?.offsetHeight ?? 64;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <header className="sticky top-0 z-80 border-b border-border bg-background-fade backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-page flex-wrap items-center gap-x-7 gap-y-2 px-7 py-3.5">
        <a href="#top" className="flex flex-col gap-px text-foreground">
          {/* 한 줄 워드마크다 — text-read의 긴 본문 행간(1.8)을 그대로 두면 27px로 벌어진다 */}
          <span className="text-read leading-[1.2] font-bold tracking-[-0.01em]">{PROFILE.name}</span>
          <span className="font-mono text-eyebrow tracking-[0.18em] text-muted-foreground">
            {PROFILE.nameEn.toUpperCase()}
          </span>
        </a>

        <nav aria-label="주요 섹션" className="ml-auto flex flex-wrap gap-1">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => handleNavClick(e, n.id)}
              aria-current={active === n.id ? 'location' : undefined}
              className={`flex items-baseline gap-1.5 rounded-chip px-3 py-2 text-label font-semibold transition-colors ${
                active === n.id ? 'bg-muted text-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span
                className={`font-mono text-eyebrow ${
                  active === n.id ? 'text-primary-strong' : 'text-muted-foreground'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {n.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

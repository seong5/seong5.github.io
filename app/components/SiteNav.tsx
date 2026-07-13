'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function SiteNav() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  // 섹션별 현재 가시 여부
  const visibilityRef = useRef<Record<string, boolean>>({});
  // 클릭 직후 스무스 스크롤 동안 scroll-spy 갱신을 멈춤(클릭 항목 유지)
  const lockRef = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 스크롤스파이 — #experience/#skills가 같은 밴드를 공유하므로,
  // 변경분만 보지 않고 NAV(=DOM 위→아래) 순서로 "가장 먼저 보이는" 섹션을 active로.
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

  // nav 클릭 — 순수 앵커는 "이미 해당 해시"면 재스크롤을 안 하므로 항상 JS로 스크롤.
  // 모바일(<880px)에선 sticky 상단바(56px)만큼 오프셋 보정.
  // 스크롤 동안 observer가 active를 덮어쓰지 않도록 잠금 설정.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    lockRef.current = true;
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lockRef.current = false;
    }, 800);
    const offset = window.innerWidth < 880 ? 56 : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActive(id);
    setOpen(false);
  };

  return (
    <>
      {/* ── 데스크톱: 좌측 고정 사이드바 ── */}
      <aside className="sticky top-0 flex h-screen flex-col justify-between border-r border-hairline bg-canvas px-7 py-9 max-nav:hidden">
        <div>
          <div className="text-[0.75rem] font-medium tracking-[0.08em] text-ink-mute">
            PORTFOLIO 2026
          </div>
          <div className="mt-7">
            <div className="whitespace-nowrap text-[1.25rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink">
              SHIN SEONG-OH
            </div>
          </div>

          {/* 세로 nav — active = 좌측 2px ink 바 */}
          <nav className="mt-10 flex flex-col gap-0.5">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleNavClick(e, n.id)}
                className={`group flex items-center gap-3 border-l-2 py-2 pl-3 text-[0.9375rem] font-medium transition-colors ${
                  active === n.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-ink-mute hover:text-accent'
                }`}
              >
                <span
                  className={`text-[0.75rem] tabular-nums ${
                    active === n.id ? 'text-accent' : 'text-ink-stone group-hover:text-accent'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* 하단: 연락처 */}
        <div className="flex flex-col gap-0.5 text-[0.75rem] leading-[1.7] text-ink-mute">
          <span>Seoul, KR</span>
          <a href="mailto:greenbi0852@gmail.com" className="transition-colors hover:text-accent">
            greenbi0852@gmail.com
          </a>
          <a
            href="https://github.com/seong5"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            github.com/seong5
          </a>
        </div>
      </aside>

      {/* ── 모바일: 상단 바 + 햄버거 드로어 ── */}
      <header className="sticky top-0 z-30 hidden bg-canvas shadow-[inset_0_-1px_0_var(--color-hairline-soft)] max-nav:block">
        <div className="flex h-14 items-center justify-between px-[22px]">
          <Link href="/" className="text-[1rem] font-medium tracking-[-0.01em] text-ink">
            SHIN SEONG-OH
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="메뉴 열기"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cloud text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {open ? (
          <nav className="border-t border-hairline-soft bg-canvas px-[22px] py-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleNavClick(e, n.id)}
                className={`block py-3 text-[1rem] font-medium ${
                  active === n.id ? 'text-accent' : 'text-ink-mute'
                }`}
              >
                {n.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-0.5 border-t border-hairline-soft py-4 text-[0.75rem] leading-[1.7] text-ink-mute">
              <span>Seoul, KR</span>
              <a href="mailto:greenbi0852@gmail.com">greenbi0852@gmail.com</a>
              <a href="https://github.com/seong5" target="_blank" rel="noreferrer">
                github.com/seong5
              </a>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}

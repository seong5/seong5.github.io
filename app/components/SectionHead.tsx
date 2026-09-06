import type { ReactNode } from 'react';

/**
 * 섹션 헤더 — 모노 번호 + Space Grotesk 대형 타이틀 + 하단 헤어라인.
 * action은 우측 정렬 슬롯 (Projects의 "7 PROJECTS" 카운트 등).
 */
export default function SectionHead({
  idx,
  title,
  action,
  className = '',
}: {
  idx: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-end justify-between gap-6 border-b border-border pb-[22px] ${className}`.trim()}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-label tabular-nums text-primary-strong">{idx}</span>
        <h2 className="font-display text-h2 font-bold tracking-[-0.035em]">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

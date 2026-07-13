import type { ReactNode } from 'react';

/* Nike 섹션 헤더 — 1px hairline 디바이더 위 heading-xl(32px) 타이틀.
   idx는 작은 eyebrow 번호로, action은 우측 정렬 슬롯으로 렌더. */
export default function SectionHead({
  idx,
  title,
  action,
}: {
  idx: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4 border-b border-hairline pb-4 max-nav:mb-8">
      <div className="flex items-baseline gap-3">
        <span className="text-[0.75rem] font-medium tabular-nums tracking-[0.04em] text-ink-mute">{idx}</span>
        <h2 className="text-[2rem] font-medium uppercase leading-none tracking-[-0.01em] text-ink">
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

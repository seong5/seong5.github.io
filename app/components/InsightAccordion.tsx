'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Insight } from '../projects/projects';
import { Panel } from './ui';

/**
 * 인사이트 아코디언 — 첫 항목만 열린 채로 시작한다.
 * 항목이 4개까지 가는 프로젝트가 있어 전부 펼쳐두면 상세가 지나치게 길어진다.
 */
export default function InsightAccordion({ insights }: { insights: Insight[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div className="flex flex-col gap-3">
      {insights.map((n, i) => {
        const isOpen = !!open[i];
        return (
          <Panel key={n.title} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-[22px] text-left"
            >
              <span className="flex-none font-mono text-eyebrow text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-read leading-[1.45] font-bold tracking-[-0.02em] text-pretty break-keep">
                {n.title}
              </span>
              <span aria-hidden className="flex-none font-mono text-body text-muted">
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {isOpen ? (
              <div className="fade-in flex flex-col gap-[22px] px-6 pb-[26px]">
                {n.intro ? (
                  <p className="text-body text-muted text-pretty break-keep">{n.intro}</p>
                ) : null}
                {n.steps.map((s) => {
                  // 제목이 "핵심어 — 부연" 구조면 핵심어에만 형광펜을 긋는다.
                  const at = s.title.indexOf(' — ');
                  const lead = at === -1 ? s.title : s.title.slice(0, at);
                  const tail = at === -1 ? '' : s.title.slice(at);
                  return (
                    <div key={s.title} className="flex flex-col gap-2.5 pl-[18px]">
                      <span className="text-body font-bold tracking-[-0.015em] break-keep">
                        {/* 밴드가 줄마다 따라붙어야 하므로 인라인 span에 건다.
                            바깥 span은 flex 자식이라 블록이 되어 그라디언트가 어긋난다. */}
                        <span className="hl-marker">{lead}</span>
                        {tail}
                      </span>
                      <ul className="m-0 flex list-disc flex-col gap-2 pl-[18px]">
                        {s.points.map((pt) => (
                          <li key={pt} className="text-body text-muted text-pretty break-keep">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                {n.image ? (
                  <div className="overflow-hidden rounded-inset border border-border bg-surface-2">
                    <Image
                      src={n.image.src}
                      alt={n.title}
                      width={n.image.w}
                      height={n.image.h}
                      className="w-full"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </Panel>
        );
      })}
    </div>
  );
}

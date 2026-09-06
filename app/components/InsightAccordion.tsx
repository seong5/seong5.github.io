'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { cardAnchor, type Insight } from '../projects/projects';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useHashTarget } from './useHashTarget';

/**
 * 인사이트 아코디언 — 첫 항목만 열린 채로 시작한다.
 * 항목이 4개까지 가는 프로젝트가 있어 전부 펼쳐두면 상세가 지나치게 길어진다.
 *
 * Radix Accordion은 열림 상태(value)를 루트가 모아 들기 때문에, 지표 뱃지 딥링크도
 * 항목이 아니라 여기서 한 번에 처리한다. 딥링크는 "추가로 열기"만 하고 다른 항목을
 * 닫지 않는다(type="multiple").
 */
export default function InsightAccordion({ insights }: { insights: Insight[] }) {
  const anchors = useMemo(
    () => insights.map((_, i) => cardAnchor({ kind: 'insight', index: i + 1 })),
    [insights],
  );
  const [value, setValue] = useState<string[]>(() => anchors.slice(0, 1));

  useHashTarget(
    anchors,
    useCallback((anchor: string) => {
      setValue((v) => (v.includes(anchor) ? v : [...v, anchor]));
    }, []),
  );

  return (
    <Accordion
      type="multiple"
      value={value}
      onValueChange={setValue}
      className="flex flex-col gap-3"
    >
      {insights.map((n, i) => (
        <AccordionItem
          key={n.title}
          id={anchors[i]}
          value={anchors[i]}
          className="scroll-mt-24 overflow-hidden rounded-panel border border-border bg-card"
        >
          <AccordionTrigger className="items-center gap-4 px-6 py-[22px] text-read font-bold">
            <span className="flex-none font-mono text-eyebrow text-muted-foreground">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-left leading-[1.45] tracking-[-0.02em] text-pretty break-keep">
              {n.title}
            </span>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-[22px] px-6 pb-[26px]">
            {n.intro ? (
              <p className="text-body text-muted-foreground text-pretty break-keep">{n.intro}</p>
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
                      <li key={pt} className="text-body text-muted-foreground text-pretty break-keep">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {n.image ? (
              <div className="overflow-hidden rounded-inset border border-border bg-muted">
                <Image
                  src={n.image.src}
                  alt={n.title}
                  width={n.image.w}
                  height={n.image.h}
                  className="w-full"
                />
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

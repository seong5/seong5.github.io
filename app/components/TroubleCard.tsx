'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { cardAnchor, type Trouble } from '../projects/projects';
import { Eyebrow, Panel } from './primitives';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useHashTarget } from './useHashTarget';

/**
 * 트러블슈팅 카드 — 결론 우선.
 *
 * RESULT(무엇이 해결됐나) → CAUSE(왜) 를 펼친 채로 두고, 경위(PROBLEM·ACTION)는
 * 접는다. 방문자 대부분은 결론과 원인만 읽고 넘어가고, 깊이 볼 사람만 펼친다.
 *
 * index는 troubleshooting 배열의 1-based 순번 — 지표 뱃지가 #trouble-N으로 이 카드를
 * 직접 가리키고, 그렇게 도착하면 경위까지 펼친 상태로 보여준다.
 */
export default function TroubleCard({ t, index }: { t: Trouble; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index).padStart(2, '0');
  const anchor = cardAnchor({ kind: 'trouble', index });
  // 지표 뱃지(#trouble-N)로 도착하면 경위까지 펼친 채로 보여준다
  useHashTarget(
    useMemo(() => [anchor], [anchor]),
    useCallback(() => setOpen(true), []),
  );

  return (
    <Panel
      as="article"
      id={anchor}
      className="flex scroll-mt-24 flex-col gap-[18px] rounded-card p-7"
    >
      <div className="flex items-baseline gap-3.5">
        <span className="pt-1 font-mono text-eyebrow text-muted-foreground">{num}</span>
        <div className="flex flex-col gap-2.5">
          <Eyebrow className="text-primary-strong">RESULT</Eyebrow>
          <p className="text-[clamp(1.125rem,2.2vw,1.4375rem)] leading-[1.4] font-bold tracking-[-0.025em] text-pretty break-keep">
            {t.conclusion}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-inset bg-muted px-5 py-[18px]">
        <Eyebrow>CAUSE</Eyebrow>
        <p className="text-body text-pretty break-keep">{t.cause}</p>
      </div>

      {t.compare ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
          {t.compare.map((c) => (
            <figure key={c.label} className="m-0 flex flex-col gap-2">
              <Eyebrow>{c.label}</Eyebrow>
              <div className="overflow-hidden rounded-inset border border-border bg-muted">
                <Image src={c.src} alt={c.label} width={c.w} height={c.h} className="w-full" />
              </div>
            </figure>
          ))}
        </div>
      ) : null}

      {t.image ? (
        <div className="overflow-hidden rounded-inset border border-border bg-muted">
          <Image
            src={t.image.src}
            alt={t.title}
            width={t.image.w}
            height={t.image.h}
            className="w-full"
          />
        </div>
      ) : null}

      <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col gap-[18px]">
        <CollapsibleTrigger className="w-fit cursor-pointer rounded-chip border border-border px-4 py-2.5 text-label font-semibold transition-colors hover:bg-muted">
          {open ? '과정 접기 ↑' : '문제 배경과 조치 과정 보기 ↓'}
        </CollapsibleTrigger>

        {/* Radix가 --radix-collapsible-content-height로 높이를 애니메이션한다.
            tw-animate-css는 reduced-motion을 존중하지 않아 globals.css에서 따로 끈다. */}
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="flex flex-col gap-5 pt-1">
            <div className="flex flex-col gap-2">
              <Eyebrow>PROBLEM</Eyebrow>
              <p className="text-body text-muted-foreground text-pretty break-keep">{t.problem}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <Eyebrow>ACTION</Eyebrow>
              <ul className="m-0 flex list-disc flex-col gap-2.5 pl-5">
                {t.actions.map((a) => (
                  <li key={a} className="text-body text-pretty break-keep">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <Eyebrow>LEARNED</Eyebrow>
        <p className="text-body font-medium text-pretty break-keep">{t.lesson}</p>
      </div>
    </Panel>
  );
}

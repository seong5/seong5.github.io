'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Trouble } from '../projects/projects';
import { Eyebrow, Panel } from './ui';

/**
 * 트러블슈팅 카드 — 결론 우선.
 *
 * RESULT(무엇이 해결됐나) → CAUSE(왜) 를 펼친 채로 두고, 경위(PROBLEM·ACTION)는
 * 접는다. 방문자 대부분은 결론과 원인만 읽고 넘어가고, 깊이 볼 사람만 펼친다.
 */
export default function TroubleCard({ t, num }: { t: Trouble; num: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Panel as="article" className="flex flex-col gap-[18px] rounded-card p-7">
      <div className="flex items-baseline gap-3.5">
        <span className="pt-1 font-mono text-eyebrow text-muted">{num}</span>
        <div className="flex flex-col gap-2.5">
          <Eyebrow className="text-accent-deep">RESULT</Eyebrow>
          <p className="text-[clamp(1.125rem,2.2vw,1.4375rem)] leading-[1.4] font-bold tracking-[-0.025em] text-pretty break-keep">
            {t.conclusion}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-inset bg-surface-2 px-5 py-[18px]">
        <Eyebrow>CAUSE</Eyebrow>
        <p className="text-body text-pretty break-keep">{t.cause}</p>
      </div>

      {t.compare ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
          {t.compare.map((c) => (
            <figure key={c.label} className="m-0 flex flex-col gap-2">
              <Eyebrow>{c.label}</Eyebrow>
              <div className="overflow-hidden rounded-inset border border-border bg-surface-2">
                <Image src={c.src} alt={c.label} width={c.w} height={c.h} className="w-full" />
              </div>
            </figure>
          ))}
        </div>
      ) : null}

      {t.image ? (
        <div className="overflow-hidden rounded-inset border border-border bg-surface-2">
          <Image
            src={t.image.src}
            alt={t.title}
            width={t.image.w}
            height={t.image.h}
            className="w-full"
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-pointer self-start rounded-chip border border-border px-4 py-2.5 text-label font-semibold transition-colors hover:bg-surface-2"
      >
        {open ? '과정 접기 ↑' : '문제 배경과 조치 과정 보기 ↓'}
      </button>

      {open ? (
        <div className="fade-in flex flex-col gap-5 pt-1">
          <div className="flex flex-col gap-2">
            <Eyebrow>PROBLEM</Eyebrow>
            <p className="text-body text-muted text-pretty break-keep">{t.problem}</p>
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
      ) : null}

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <Eyebrow>LEARNED</Eyebrow>
        <p className="text-body font-medium text-pretty break-keep">{t.lesson}</p>
      </div>
    </Panel>
  );
}

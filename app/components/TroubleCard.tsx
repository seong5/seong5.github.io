'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { cardAnchor, type Trouble } from '../projects/projects';
import { Eyebrow, Panel } from './primitives';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useHashTarget } from './useHashTarget';

/**
 * 트러블슈팅 카드 — 접힌 목록, 결론 우선.
 *
 * 접힌 줄은 RESULT(무엇이 해결됐나) 한 줄이다. title은 프로젝트마다 "~던 문제"라
 * 제목만 세워 두면 문제 목록으로 읽혀서, 안 열어도 성과가 전달되는 conclusion을 쓴다.
 * 열면 CAUSE·경위(PROBLEM·ACTION)·LEARNED가 한 번에 나온다 — 바깥이 접히므로
 * 안에서 또 접지 않는다.
 *
 * index는 troubleshooting 배열의 1-based 순번 — #trouble-N으로 직접 들어오면
 * 그 카드가 펼쳐진 채로 도착한다.
 */
export default function TroubleCard({ t, index }: { t: Trouble; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index).padStart(2, '0');
  const anchor = cardAnchor({ kind: 'trouble', index });
  useHashTarget(
    useMemo(() => [anchor], [anchor]),
    useCallback(() => setOpen(true), []),
  );

  return (
    /* 접혔을 때만 살짝 커진다 — 펼친 카드는 이미지까지 붙어 아주 길어서, 확대하면
       옆 카드(gap-5)를 침범하고 움직임이 과해진다. motion-reduce 사용자는 전환 대신
       배경색으로 같은 신호를 받는다. */
    <Panel
      as="article"
      id={anchor}
      className={`scroll-mt-24 overflow-hidden transition-transform duration-200 ease-out motion-reduce:transition-none ${
        open ? '' : 'hover:scale-[1.01] motion-reduce:hover:scale-100 motion-reduce:hover:bg-muted'
      }`}
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <h3 className="m-0 flex">
          {/* Tailwind v4는 button에 cursor:pointer를 주지 않는다 — button.tsx·StackChips처럼 직접 붙인다.
              outline-none을 걸면 globals.css의 전역 :focus-visible 아웃라인이 죽으므로 쓰지 않고,
              Panel의 overflow-hidden에 잘리지 않도록 offset만 음수로 덮어쓴다. */}
          <CollapsibleTrigger className="group/tc flex flex-1 cursor-pointer items-start gap-3.5 p-7 text-left focus-visible:-outline-offset-2">
            <span className="flex-none pt-1 font-mono text-eyebrow text-muted-foreground">
              {num}
            </span>
            <span className="flex flex-1 flex-col gap-2.5">
              <Eyebrow className="text-primary-strong">RESULT</Eyebrow>
              <span className="text-[clamp(1.125rem,2.2vw,1.4375rem)] leading-[1.4] font-bold tracking-[-0.025em] text-pretty break-keep">
                {t.conclusion}
              </span>
            </span>
            {/* 이 사이트는 아이콘을 유니코드 글리프로 통일한다 — accordion과 같은 +/− */}
            <span
              aria-hidden
              className="pointer-events-none flex-none pt-1 font-mono text-body text-muted-foreground transition-colors group-hover/tc:text-primary-strong"
            >
              <span className="group-data-[state=open]/tc:hidden">+</span>
              <span className="hidden group-data-[state=open]/tc:inline">−</span>
            </span>
          </CollapsibleTrigger>
        </h3>

        {/* Radix가 --radix-collapsible-content-height로 높이를 애니메이션한다.
            tw-animate-css는 reduced-motion을 존중하지 않아 globals.css에서 따로 끈다. */}
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="flex flex-col gap-[18px] px-7 pb-7">
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
                      <Image
                        src={c.src}
                        alt={c.label}
                        width={c.w}
                        height={c.h}
                        className="w-full"
                      />
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

            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <Eyebrow>LEARNED</Eyebrow>
              <p className="text-body font-medium text-pretty break-keep">{t.lesson}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Panel>
  );
}

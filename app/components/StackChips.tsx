'use client';

import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const CHIP_ROW = 'flex flex-wrap items-center gap-[7px]';

/**
 * 스택 칩 — 대표 3개는 항상 solid로, 나머지는 "+N more" 뒤에 접는다.
 * 스택이 10개를 넘는 프로젝트가 있어 전부 펼치면 Overview가 칩으로 뒤덮인다.
 *
 * 펼친 칩은 첫 줄에 이어 붙지 않고 아래 줄에서 시작한다 — Collapsible이 높이를
 * 애니메이션하려면 접히는 내용이 자기 블록을 가져야 하기 때문이다.
 */
export default function StackChips({ core, rest }: { core: string[]; rest: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col gap-[7px]">
      <div className={CHIP_ROW}>
        {core.map((s) => (
          <span key={s} className="rounded-chip bg-muted px-3 py-[7px] text-label font-semibold">
            {s}
          </span>
        ))}
        {rest.length > 0 ? (
          <CollapsibleTrigger className="cursor-pointer rounded-chip border border-dashed border-border px-3 py-[7px] font-mono text-meta text-muted-foreground transition-colors hover:bg-muted">
            {open ? '접기' : `+${rest.length} more`}
          </CollapsibleTrigger>
        ) : null}
      </div>

      {/* Radix가 --radix-collapsible-content-height로 높이를 애니메이션한다.
          tw-animate-css는 reduced-motion을 존중하지 않아 globals.css에서 따로 끈다. */}
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className={CHIP_ROW}>
          {rest.map((s) => (
            <span
              key={s}
              className="rounded-chip border border-border px-3 py-[7px] text-label text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

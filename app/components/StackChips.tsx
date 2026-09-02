'use client';

import { useState } from 'react';

/**
 * 스택 칩 — 대표 3개는 항상 solid로, 나머지는 "+N more" 뒤에 접는다.
 * 스택이 10개를 넘는 프로젝트가 있어 전부 펼치면 Overview가 칩으로 뒤덮인다.
 */
export default function StackChips({ core, rest }: { core: string[]; rest: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-[7px]">
      {core.map((s) => (
        <span key={s} className="rounded-chip bg-surface-2 px-3 py-[7px] text-label font-semibold">
          {s}
        </span>
      ))}
      {open
        ? rest.map((s) => (
            <span
              key={s}
              className="rounded-chip border border-border px-3 py-[7px] text-label text-muted"
            >
              {s}
            </span>
          ))
        : null}
      {rest.length > 0 ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="cursor-pointer rounded-chip border border-dashed border-border px-3 py-[7px] font-mono text-meta text-muted transition-colors hover:bg-surface-2"
        >
          {open ? '접기' : `+${rest.length} more`}
        </button>
      ) : null}
    </div>
  );
}

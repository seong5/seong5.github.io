'use client';

import { useState } from 'react';
import { Badge, badgeVariants } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from './ui/cn';
import { StackIcon } from './stackIcons';

const CHIP_ROW = 'flex flex-wrap items-center gap-[7px]';
// Badge base의 [&>svg]:size-3은 text-label 옆에서 작아 보여 한 단계 키운다
const CHIP_ICON = 'gap-1.5 [&>svg]:size-3.5';

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
          <Badge key={s} size="md" className={cn(CHIP_ICON, 'text-label font-semibold text-foreground')}>
            <StackIcon name={s} />
            {s}
          </Badge>
        ))}
        {/* asChild로 Badge를 넣으면 Badge가 span을 렌더해 role·tabindex 없는 트리거가 된다
            (키보드로 도달 불가). 트리거가 자기 button을 렌더하게 두고 칩 모양만 클래스로 준다. */}
        {rest.length > 0 ? (
          <CollapsibleTrigger
            className={cn(
              badgeVariants({ variant: 'dashed', size: 'md' }),
              'cursor-pointer font-mono text-label text-muted-foreground hover:bg-muted',
            )}
          >
            {open ? '접기' : `+${rest.length} more`}
          </CollapsibleTrigger>
        ) : null}
      </div>

      {/* Radix가 --radix-collapsible-content-height로 높이를 애니메이션한다.
          tw-animate-css는 reduced-motion을 존중하지 않아 globals.css에서 따로 끈다. */}
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className={CHIP_ROW}>
          {rest.map((s) => (
            <Badge
              key={s}
              variant="outline"
              size="md"
              className={cn(CHIP_ICON, 'text-label text-muted-foreground')}
            >
              <StackIcon name={s} />
              {s}
            </Badge>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

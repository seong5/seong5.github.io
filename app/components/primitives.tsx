/* ──────────────────────────────────────────────────────────
   TRACK 고유 프리미티브.
   시안(Portfolio / Project Detail Redesign.dc.html)에서 반복 횟수가
   충분한 요소만 뽑았다. 한 번만 쓰이는 모양은 여기 넣지 않는다.

   shadcn 대응물이 있는 것(Button·Badge)은 app/components/ui/ 로 옮겼다.
   여기 남은 셋은 shadcn에 대응 슬롯이 없는 이 사이트 고유 요소다.

   ⚠️ 라임(primary)은 라이트 배경에서 텍스트로 쓰면 1.4:1로 죽는다.
   채움 위 텍스트는 primary-foreground, 액센트 "텍스트" 자리는 primary-strong.
   (globals.css 상단 규칙)
   ────────────────────────────────────────────────────────── */
import type { ReactNode } from 'react';

/* ── Eyebrow ──
   두 시안 합쳐 30회 이상 나오는 마이크로 라벨. STACK · RESULT · CAUSE ·
   CONTENTS · 01 · 기간. 모노가 이 디자인의 시그니처라 여기서 폰트를 고정한다. */
export function Eyebrow({
  children,
  className = '',
  as: Tag = 'span',
}: {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'dt';
}) {
  return (
    <Tag
      className={`font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-muted-foreground ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

/* ── Panel ──
   스킬·트러블슈팅·인사이트가 공유하는 카드 면.
   이 시스템에 그림자 경계는 없다 — 1px border가 유일한 구분이다. */
export function Panel({
  children,
  className = '',
  as: Tag = 'div',
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
  /** 지표 뱃지 딥링크가 걸리는 앵커 (insight-1 · trouble-3 …) */
  id?: string;
}) {
  return (
    <Tag id={id} className={`rounded-panel border border-border bg-card ${className}`.trim()}>
      {children}
    </Tag>
  );
}

/* ── MetaList ──
   ROLE·PERIOD·TEAM·CATEGORY 같은 라벨/값 쌍. <dl>로 의미까지 맞춘다. */
export function MetaList({
  items,
  min = '150px',
  className = '',
}: {
  items: { label: string; value: string }[];
  min?: string;
  className?: string;
}) {
  return (
    <dl
      className={`grid gap-[22px] ${className}`.trim()}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))` }}
    >
      {items.map((m) => (
        <div key={m.label} className="flex flex-col gap-[7px]">
          <Eyebrow as="dt">{m.label}</Eyebrow>
          <dd className="m-0 text-body font-semibold leading-[1.5] break-keep">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

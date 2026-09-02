/* ──────────────────────────────────────────────────────────
   TRACK 디자인 시스템 빌딩 블록.
   시안(Portfolio / Project Detail Redesign.dc.html)에서 반복 횟수가
   충분한 요소만 프리미티브로 뽑았다. 한 번만 쓰이는 모양은 여기 넣지 않는다.

   ⚠️ 라임(accent)은 라이트 배경에서 텍스트로 쓰면 1.4:1로 죽는다.
   채움 위 텍스트는 accent-ink, 액센트 "텍스트" 자리는 accent-deep.
   (globals.css 상단 규칙)
   ────────────────────────────────────────────────────────── */
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

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
      className={`font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-muted ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

/* ── Chip ──
   pill. 스택·org·태그. solid가 기본이고 outline은 "펼친 나머지"처럼
   한 단계 낮은 위계를 나타낼 때 쓴다. */
type ChipVariant = 'solid' | 'outline' | 'accent' | 'dashed';

const CHIP: Record<ChipVariant, string> = {
  solid: 'bg-surface-2 text-text',
  outline: 'border border-border text-muted',
  accent: 'bg-accent text-accent-ink',
  dashed: 'border border-dashed border-border text-muted',
};

export function Chip({
  variant = 'solid',
  children,
  className = '',
}: {
  variant?: ChipVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-chip px-3.5 py-1.5 text-label font-semibold ${CHIP[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

/* ── Button ── */
type ButtonVariant = 'accent' | 'outline' | 'dashed';

const BASE =
  'inline-flex items-center justify-center gap-2.5 rounded-chip font-semibold whitespace-nowrap transition-[transform,background-color,border-color] duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-40';

const VARIANTS: Record<ButtonVariant, string> = {
  // 유일한 primary CTA. 라임 채움 + 근검정 텍스트로 15.4:1
  accent: 'px-[22px] py-3.5 text-body bg-accent text-accent-ink hover:-translate-y-0.5',
  outline: 'px-[22px] py-3.5 text-body border border-border text-text hover:bg-surface-2',
  // "더보기"처럼 아직 내용이 없는 자리 — 점선이 그 미완결을 그대로 표현한다
  dashed:
    'px-4 py-3 text-label border border-dashed border-border text-text hover:bg-surface-2 hover:border-solid',
};

export function buttonClasses(variant: ButtonVariant = 'accent', className = ''): string {
  return `${BASE} ${VARIANTS[variant]} ${className}`.trim();
}

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export function Button({
  variant = 'accent',
  href,
  external,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const cls = buttonClasses(variant, className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

/* ── Panel ──
   스킬·트러블슈팅·인사이트가 공유하는 카드 면.
   이 시스템에 그림자 경계는 없다 — 1px border가 유일한 구분이다. */
export function Panel({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}) {
  return (
    <Tag className={`rounded-panel border border-border bg-surface ${className}`.trim()}>
      {children}
    </Tag>
  );
}

/* ── StatGrid ──
   지표 그리드. gap을 1px로 두고 컨테이너를 border 색으로 칠하면
   셀 사이가 헤어라인이 된다 — 셀마다 border를 주는 것보다 모서리가 깨끗하다. */
export function StatGrid({
  items,
  className = '',
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-px overflow-hidden rounded-card border border-border bg-border ${className}`.trim()}
    >
      {items.map((it) => (
        <div key={it.label} className="flex flex-col gap-2 bg-surface px-6 py-[26px]">
          <span className="font-display text-stat font-bold tracking-[-0.03em] text-accent-deep">
            {it.value}
          </span>
          <span className="text-label leading-[1.55] text-muted break-keep">{it.label}</span>
        </div>
      ))}
    </div>
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

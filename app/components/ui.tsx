/* ──────────────────────────────────────────────────────────
   Nike 디자인 시스템 공통 빌딩 블록 (Phase 1)
   pill geometry · 순흑백 · 평면. button 3종 / filter-chip / badge.
   ────────────────────────────────────────────────────────── */
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium leading-[1.5] whitespace-nowrap transition-transform duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40';

/* button-primary / -secondary / -outline-on-image */
const VARIANTS: Record<ButtonVariant, string> = {
  // bg-ink · 흰 텍스트 — 시스템의 유일한 primary CTA
  primary: 'h-12 px-8 text-[1rem] bg-ink text-on-primary',
  // bg-cloud · 잉크 텍스트 — primary가 이미 있을 때의 저강도 대안
  secondary: 'h-12 px-8 text-[1rem] bg-cloud text-ink',
  // 흰 pill — 풀블리드 사진 위 "shop this image" CTA
  outline: 'px-6 py-3 text-[1rem] bg-canvas text-ink',
};

export function buttonClasses(variant: ButtonVariant = 'primary', className = ''): string {
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
  variant = 'primary',
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

/* filter-chip + filter-chip-active — 선택 시 완전 반전(검정), 중간 상태 없음 */
export function FilterChip({
  active = false,
  children,
  className = '',
  ...rest
}: {
  active?: boolean;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex h-10 items-center rounded-full px-4 text-[1rem] font-medium leading-[1.5] transition-colors ${
        active
          ? 'bg-ink text-on-primary'
          : 'border border-hairline bg-canvas text-ink hover:border-ink'
      } ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

/* badge-promo — 흰 배경 + 1px hairline, 제품 이미지 위 top-left */
export function PromoBadge({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-hairline bg-canvas px-3 py-1 text-[0.75rem] font-medium leading-[1.5] text-ink ${className}`.trim()}
    >
      {children}
    </span>
  );
}

/* badge-sale-text — 컨테이너 없는 유일한 배지, price-row 인라인 텍스트 */
export function SalePrice({
  price,
  original,
  percentOff,
}: {
  price: string;
  original?: string;
  percentOff?: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-2 text-[0.875rem] font-medium leading-[1.5]">
      <span className="text-sale">{price}</span>
      {original ? <span className="text-mute line-through">{original}</span> : null}
      {percentOff ? <span className="text-sale">{percentOff}</span> : null}
    </span>
  );
}

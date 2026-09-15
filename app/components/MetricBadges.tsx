'use client';

import { cardAnchor, type Metric } from '../projects/projects';
import { CARD_TARGET_EVENT } from './useHashTarget';

/* 각진 모노 태그 — 홈 프로젝트 카드의 스택 태그와 같은 언어(rounded-[6px] + 모노 라벨).
   pill(rounded-chip)은 스택·org가 이미 쓰고 있어, 지표는 각진 쪽으로 구분한다. */
const BADGE = 'flex flex-col gap-2 rounded-[6px] border border-border bg-card px-[18px] py-4';

/**
 * 지표 뱃지 — 히어로와 목차 사이의 성과 줄.
 *
 * target이 있는 지표는 그 숫자를 설명하는 인사이트/트러블 카드로 가는 앵커가 되고
 * (누르면 카드가 펼쳐진 채로 도착한다), 대응하는 카드가 없는 지표(1인 · 20명 …)는
 * 같은 모양의 정적 뱃지로 남는다. 테두리·배경을 같게 두고 ↓와 호버 반응으로만
 * 구분해, 둘이 섞여도 위계가 무너지지 않는다.
 */
export default function MetricBadges({ items }: { items: Metric[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2.5">
      {items.map((m) => {
        const value = (
          <span className="font-display text-title font-bold tracking-[-0.03em] text-primary-strong">
            {m.value}
          </span>
        );
        // 라벨이 한글 문장이라 eyebrow(10px)는 가독 한계 아래다. 13px로 올리고
        // 모노는 유지한다 — 한글은 Pretendard로 폴백되고 숫자·영문에만 모노가 걸린다.
        const label = (
          <span className="font-mono text-label tracking-[0.01em] text-muted-foreground break-keep">
            {m.label}
          </span>
        );

        if (!m.target) {
          return (
            <span key={m.label} className={BADGE}>
              <span className="flex items-baseline">{value}</span>
              {label}
            </span>
          );
        }

        const anchor = cardAnchor(m.target);
        return (
          <a
            key={m.label}
            href={`#${anchor}`}
            onClick={() => {
              // 해시가 이미 같으면 hashchange가 안 뜬다 — 재클릭용 신호를 직접 쏜다
              if (window.location.hash === `#${anchor}`) {
                window.dispatchEvent(new Event(CARD_TARGET_EVENT));
              }
            }}
            className={`${BADGE} group text-foreground transition-colors hover:border-primary-strong hover:bg-muted`}
          >
            <span className="flex items-baseline gap-2">
              {value}
              <span
                aria-hidden
                className="ml-auto font-mono text-meta text-muted-foreground transition-colors group-hover:text-primary-strong"
              >
                ↓
              </span>
            </span>
            {label}
          </a>
        );
      })}
    </div>
  );
}

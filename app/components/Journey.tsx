import type { CSSProperties } from 'react';
import Link from 'next/link';
import { JOURNEY, JOURNEY_PROLOGUE } from '../content/career';
import { getProject } from '../projects/projects';
import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';

/**
 * Journey — 홈 최상단의 가로 연대기.
 *
 * 상세가 아니라 지도다. 기간·소속·역할 한 줄·프로젝트 링크까지만 싣고,
 * 나머지는 /resume과 프로젝트 상세로 넘긴다. 높이를 200px 안에서 끝내야
 * 바로 아래 Projects 카드가 첫 화면에서 밀려나지 않는다.
 *
 * 전환 이전 6년(호주·JFounders)은 좌측 한 구간으로 압축했다. 노드로 펼치면
 * 개발 경력 5건이 오른쪽 끝에 몰려 정작 중요한 구간이 읽히지 않는다.
 * 압축 구간은 점선 + 점 없음 — 사건이 아니라 기간이라는 표시다.
 *
 * 1040px(--breakpoint-journey) 아래로는 세로 타임라인으로 전환한다.
 * 그 아래에서는 노드 폭이 166px를 밑돌아 역할 한 줄이 3~4줄로 접힌다.
 */

/** 각 컬럼의 위쪽 절반 — 기간 라벨 + 바 세그먼트. 세그먼트가 이어져 한 줄이 된다. */
function Track({ period, dashed = false }: { period: string; dashed?: boolean }) {
  return (
    <>
      <span className="pr-6 font-mono text-eyebrow tracking-[0.12em] text-muted max-journey:pr-0">
        {period}
      </span>
      {dashed ? (
        <span aria-hidden className="block h-0 border-t-2 border-dashed border-border max-journey:hidden" />
      ) : (
        <span aria-hidden className="relative block h-[2px] bg-border max-journey:hidden">
          <span className="absolute top-1/2 left-0 h-[10px] w-[10px] -translate-y-1/2 rounded-chip bg-accent" />
        </span>
      )}
    </>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead
        idx="01"
        title="Journey"
        className="mb-10"
        action={
          <span className="font-mono text-meta tracking-[0.1em] text-muted">2018 — NOW</span>
        }
      />

      {/* 노드 수를 CSS 변수로 넘긴다 — RevealGroup은 style을 받지 않으므로 부모에서 상속시킨다 */}
      <div style={{ '--journey-nodes': JOURNEY.length } as CSSProperties}>
        <RevealGroup className="journey-track">
        {/* 프롤로그 — 개발 전환 이전 6년을 한 구간으로 */}
        <RevealItem className="flex flex-col gap-2.5 max-journey:border-l-2 max-journey:border-dashed max-journey:border-border max-journey:pb-7 max-journey:pl-5">
          <Track period={JOURNEY_PROLOGUE.span} dashed />
          <div className="flex flex-col gap-2.5 pt-3 pr-6 max-journey:pr-0">
            <span className="text-label font-bold tracking-[-0.01em] break-keep">
              {JOURNEY_PROLOGUE.label}
            </span>
            <div className="flex flex-col gap-2">
              {JOURNEY_PROLOGUE.items.map((it) => (
                <div key={it.org} className="flex flex-col">
                  <span className="text-meta font-medium break-keep">{it.org}</span>
                  <span className="text-meta leading-[1.5] text-muted break-keep">{it.role}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealItem>

        {JOURNEY.map((n) => {
          // 모든 노드가 같은 형태를 갖는다 — 제목은 텍스트, 프로젝트는 아래 뱃지.
          // 개인 프로젝트처럼 소속명과 프로젝트명이 같아도 뱃지를 생략하지 않는다.
          const chips = (n.projectSlugs ?? [])
            .map((slug) => getProject(slug))
            .filter((p) => p !== undefined)
            .map((p) => ({ slug: p.slug, name: p.title.split(' - ')[0] }));

          return (
            <RevealItem
              key={n.id}
              className="flex flex-col gap-2.5 max-journey:border-l-2 max-journey:border-border max-journey:pb-7 max-journey:pl-5"
            >
              <Track period={n.period} />
              <div className="flex flex-col gap-1.5 pt-3 pr-6 max-journey:pr-0">
                <span className="text-label font-bold tracking-[-0.01em] break-keep">{n.org}</span>
                <span className="text-meta leading-[1.5] text-muted break-keep">{n.role}</span>
                {/* 뱃지는 세로로 쌓는다 — 노드 폭이 166px라 두 개가 가로로 붙으면
                    컬럼마다 줄 수가 달라져 바 아래 정렬이 흐트러진다.
                    items-start가 없으면 뱃지가 컬럼 폭만큼 늘어난다. */}
                {chips.length ? (
                  <div className="mt-1 flex flex-col items-start gap-1.5">
                    {chips.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/projects/${c.slug}`}
                        className="rounded-[6px] bg-surface-2 px-2.5 py-1 font-mono text-eyebrow text-text transition-colors hover:bg-accent hover:text-accent-ink"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </RevealItem>
          );
        })}
        </RevealGroup>
      </div>
    </section>
  );
}

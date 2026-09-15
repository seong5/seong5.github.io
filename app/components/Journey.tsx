import type { CSSProperties } from 'react';
import Link from 'next/link';

import { Badge } from './ui/badge';
import { JOURNEY, JOURNEY_INTRO, JOURNEY_KIND_LABEL, JOURNEY_PROLOGUE } from '../content/career';
import { getProject } from '../projects/projects';
import { RevealGroup } from './Reveal';
import SectionHead from './SectionHead';

/**
 * Journey — 히어로 바로 아래 첫 섹션의 가로 연대기.
 *
 * 상세가 아니라 지도다. 기간·소속·역할 한 줄·프로젝트 링크까지만 싣고,
 * 나머지는 /resume과 프로젝트 상세로 넘긴다. 높이를 200px 안에서 끝내
 * 아래 Projects 카드가 한 스크롤 안에 들어오게 한다.
 *
 * 전환 이전 6년(호주·JFounders)은 좌측 한 구간으로 압축했다. 노드로 펼치면
 * 개발 경력 6건이 오른쪽 끝에 몰려 정작 중요한 구간이 읽히지 않는다.
 * 압축 구간은 점선 + 점 없음 — 사건이 아니라 기간이라는 표시다.
 *
 * 1240px(--breakpoint-journey) 아래로는 세로 타임라인으로 전환한다.
 * 그 아래에서는 노드 폭이 166px를 밑돌아 역할 한 줄이 3~4줄로 접힌다.
 * 노드 수(JOURNEY.length)가 바뀌면 그 폭도 함께 바뀐다 — globals.css 의
 * --breakpoint-journey 주석에 계산식을 적어 뒀다.
 *
 * 등장 모션은 "선이 그어진다"다. RevealItem을 쓰지 않는 이유 — 컬럼 전체가
 * 떠오르면 그려지는 중인 바 세그먼트도 함께 움직여 가로 선이 계단처럼 어긋난다.
 * 그래서 선은 제자리에서 그리고, 텍스트만 선이 도착한 뒤 떠오르게 한다.
 * 순서는 컬럼 인덱스(--i)로 넘기고 타이밍은 globals.css 의 .journey-* 에 있다.
 */

/** 각 컬럼의 위쪽 절반 — 기간 라벨 + 바 세그먼트. 세그먼트가 이어져 한 줄이 된다. */
function Track({ period, dashed = false }: { period: string; dashed?: boolean }) {
  return (
    <>
      {/* 자간이 곧 폭이다 — 노드 가용폭 136px에 17자 기간이 들어가야 한다.
          0.12em이면 11px에서 134.6px로 여유가 1.4px뿐이라 2줄이 되고, 그러면 아래 바
          세그먼트가 컬럼마다 다른 높이에서 시작해 가로 바가 어긋난다. */}
      <span className="journey-fade journey-period pr-6 font-mono text-eyebrow tracking-[0.04em] text-muted-foreground max-journey:pr-0">
        {period}
      </span>
      {dashed ? (
        <span aria-hidden className="journey-seg block h-0 border-t-2 border-dashed border-border max-journey:hidden" />
      ) : (
        <span aria-hidden className="relative block max-journey:hidden">
          <span className="journey-seg block h-[2px] bg-border" />
          <span className="journey-dot absolute top-1/2 left-0 h-[10px] w-[10px] -translate-y-1/2 rounded-chip bg-primary" />
        </span>
      )}
    </>
  );
}

/** 컬럼 인덱스를 CSS 변수로 — 모션 속성 자체는 인라인으로 주지 않는다(reduced-motion에서 끌 수 없다). */
const order = (i: number) => ({ '--i': i }) as CSSProperties;

export default function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead
        idx="01"
        title="Journey"
        className="mb-6"
        action={
          <span className="font-mono text-meta tracking-[0.1em] text-muted-foreground">2018 — NOW</span>
        }
      />

      {/* 소개 — 히어로 본문과 같은 read·muted. 넓은 화면에선 문장마다 한 줄(md:block),
          좁은 화면에선 이어 흘린다. 폭 제한만 두면 "인턴을 / 거쳐"처럼 구절 중간에서 끊긴다. */}
      <p className="mb-10 text-read text-muted-foreground text-pretty break-keep">
        {JOURNEY_INTRO.map((sentence, i) => (
          <span key={i} className="md:block">
            {i > 0 ? ' ' : null}
            {sentence}
          </span>
        ))}
      </p>

      {/* 노드 수를 CSS 변수로 넘긴다 — RevealGroup은 style을 받지 않으므로 부모에서 상속시킨다 */}
      <div style={{ '--journey-nodes': JOURNEY.length } as CSSProperties}>
        <RevealGroup className="journey-track">
        {/* 프롤로그 — 개발 전환 이전 6년을 한 구간으로 */}
        <div
          className="journey-node journey-node-dashed flex flex-col gap-2.5 max-journey:pb-7"
          style={order(0)}
        >
          <Track period={JOURNEY_PROLOGUE.span} dashed />
          <div className="journey-fade flex flex-col gap-2.5 pt-3 pr-6 max-journey:pr-0">
            <h3 className="m-0 text-label font-bold tracking-[-0.01em] break-keep">
              {JOURNEY_PROLOGUE.label}
            </h3>
            <div className="flex flex-col gap-2">
              {JOURNEY_PROLOGUE.items.map((it) => (
                <div key={it.org} className="flex flex-col">
                  <span className="text-label font-medium break-keep">{it.org}</span>
                  <span className="text-label text-muted-foreground break-keep">{it.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {JOURNEY.map((n, i) => {
          // 모든 노드가 같은 형태를 갖는다 — 제목은 텍스트, 프로젝트는 아래 뱃지.
          // 개인 프로젝트처럼 소속명과 프로젝트명이 같아도 뱃지를 생략하지 않는다.
          const chips = (n.projectSlugs ?? [])
            .map((slug) => getProject(slug))
            .filter((p) => p !== undefined)
            .map((p) => ({ slug: p.slug, name: p.title.split(' - ')[0] }));

          return (
            <div
              key={n.id}
              className="journey-node flex flex-col gap-2.5 max-journey:pb-7"
              style={order(i + 1)}
            >
              <Track period={n.period} />
              <div className="journey-fade flex flex-col items-start gap-1.5 pt-3 pr-6 max-journey:pr-0">
                {/* 유형 라벨 — 아래 프로젝트 칩(채움 tag, 링크)과 섞이지 않게 outline·비대화형.
                    모든 노드에 한 줄씩 들어가므로 컬럼 간 정렬은 그대로다.
                    색은 유형마다 나누지 않는다 — 액센트 1색 시스템이라 실무(인턴)만 한 단계 올린다.
                    채움은 링크 칩 hover의 어휘라 테두리·글자만 바꾼다. */}
                <Badge
                  variant="outline"
                  size="sm"
                  className={
                    n.kind === 'work'
                      ? 'mb-1 border-primary-strong/40 py-0.5 font-mono text-eyebrow text-primary-strong'
                      : 'mb-1 py-0.5 font-mono text-eyebrow'
                  }
                >
                  {JOURNEY_KIND_LABEL[n.kind]}
                </Badge>
                {/* 연대기 항목의 제목 — span이면 이 섹션에 heading이 하나도 없게 된다 */}
                <h3 className="m-0 text-label font-bold tracking-[-0.01em] break-keep">{n.org}</h3>
                {/* 불릿은 글자 대신 4px 점 — "·"나 "-"는 폰트마다 굵기·높이가 달라 줄 첫 글자와 어긋난다.
                    내어쓰기(pl-3 + 절대위치 점)라 긴 항목이 접혀도 둘째 줄이 글자 시작선에 맞는다.
                    점 높이 0.6em ≈ text-label(14px·1.5) 첫 줄 가운데. */}
                <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                  {n.role.map((r) => (
                    <li
                      key={r}
                      className="relative pl-3 text-label text-muted-foreground break-keep before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-muted-foreground/60"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
                {/* 뱃지는 세로로 쌓는다 — 노드 폭이 160px 남짓이라 두 개가 가로로 붙으면
                    컬럼마다 줄 수가 달라져 바 아래 정렬이 흐트러진다.
                    items-start가 없으면 뱃지가 컬럼 폭만큼 늘어난다. */}
                {chips.length ? (
                  <div className="mt-1 flex flex-col items-start gap-1.5">
                    {chips.map((c) => (
                      <Badge
                        key={c.slug}
                        asChild
                        variant="tag"
                        className="font-mono text-eyebrow text-foreground hover:bg-primary hover:text-primary-foreground"
                      >
                        <Link href={`/projects/${c.slug}`}>{c.name}</Link>
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
        </RevealGroup>
      </div>
    </section>
  );
}

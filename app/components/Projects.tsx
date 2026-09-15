'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PANEL_SHOT, cardPicks, projects, type Project } from '../projects/projects';
import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';
import Tilt from './Tilt';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const INITIAL_COUNT = 3;

/** 상세 히어로 메타 줄(page.tsx)과 같은 데이터라 같은 급으로 맞춘다.
    스트립 패널과 모바일 카드가 같은 조립을 써야 둘이 다른 말을 하지 않는다 */
function MetaLine({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-meta tracking-[0.1em] text-muted-foreground">
      <Badge>{p.org.split(' · ')[0]}</Badge>
      <span>{p.period}</span>
      {p.active ? (
        <span className="text-primary-strong">
          {p.status ?? `진행 중${p.currentTask ? ` · ${p.currentTask}` : ''}`}
        </span>
      ) : null}
    </div>
  );
}

/**
 * 스포트라이트 패널 한 장. 펼침/접힘 판정은 전부 globals.css가 한다 —
 * state를 두면 "마지막 hover 유지 vs 기본 복귀" 정책이 JS에 숨고,
 * 하이드레이션 이전에는 레이아웃이 비게 된다. 여기는 순수 CSS라
 * 정적 HTML이 곧 정답이고 불일치가 생길 여지가 없다.
 */
function SpotlightFrame({ p, i }: { p: Project; i: number }) {
  const shot = p.card?.shot;
  const stack = (p.resumeStack ?? p.stack).slice(0, 2);
  // 접힘 슬리버는 폭이 89px 남짓이라 부제까지 들어가지 않는다.
  // Journey가 쓰는 ' - ' 앞 축약 규약을 그대로 가져온다.
  // 단어 단위로 쪼개 한 줄씩 쌓는다 — 자동 줄바꿈에 맡기면 글꼴 실측값에 따라
  // "도봉라이프 어드민"이 한 줄로 뭉칠 수 있어 폭과 무관하게 모양을 고정한다.
  // 공백 수와 원하는 줄 수가 다르면 card.spine으로 직접 묶는다
  const words = p.card?.spine ?? p.title.split(' - ')[0].split(' ');

  return (
    <li className="spotlight-frame">
      <Link
        href={`/projects/${p.slug}`}
        className="spotlight-frame-in"
        /* Reveal의 40ms/200ms 상한 대신 55ms/385ms — 좌에서 우로 훑히는 게
           이 컴포넌트의 요점이라, 200ms 상한이면 뒤 네 장이 한꺼번에 뜬다.
           인라인은 animation이 아니라 값이므로 reduced-motion에서 무력화된다 */
        style={{ transitionDelay: `${Math.min(i * 55, 385)}ms` }}
      >
        {/* 바로 옆에 제목이 있으므로 장식 이미지. unoptimized라 srcset이 생성되지
            않아 sizes는 무의미하고, 크롭 치수를 알고 있어 fill도 필요 없다 */}
        {shot ? (
          <Image
            src={shot}
            alt=""
            width={PANEL_SHOT.w}
            height={PANEL_SHOT.h}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {/* h3와 같은 말이라 보조기기에는 한 번만 읽히게 한다 */}
        <span aria-hidden className="spotlight-spine">
          {/* 자간을 주지 않는다 — 0.1em이면 GlobalNomad가 접힘 폭을 넘는다 */}
          <span className="spotlight-spine-title font-mono text-eyebrow font-semibold text-muted-foreground">
            {words.map((w, n) => (
              <span key={`${w}-${n}`} className="block">
                {w}
              </span>
            ))}
          </span>
          {/* 굽의 번호 — SectionHead의 idx와 같은 어휘(mono · tabular-nums · primary-strong).
              tabular-nums가 있어야 01~08의 자릿폭이 같아져 8장이 세로로 정렬된다 */}
          <span className="font-mono text-title tabular-nums text-primary-strong">
            {String(i + 1).padStart(2, '0')}
          </span>
        </span>

        <div className="spotlight-body">
          <MetaLine p={p} />
          <h3 className="text-lead font-bold tracking-[-0.025em] break-keep">{p.title}</h3>
          {/* line-clamp-3은 필수 — 태그라인 최장 70자라 클램프가 없으면 다섯 줄까지 간다 */}
          <p className="line-clamp-3 text-body text-muted-foreground text-pretty break-keep">
            {p.card?.tagline ?? p.summary}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {stack.map((s) => (
              <Badge key={s} variant="tag" className="font-mono text-eyebrow text-foreground">
                {s}
              </Badge>
            ))}
            <span className="ml-auto font-mono text-eyebrow tracking-[0.12em] text-primary-strong">
              자세히 보기 →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const stack = (p.resumeStack ?? p.stack).slice(0, 3);
  const picks = cardPicks(p);

  return (
    <Tilt className="h-full">
      <Link
        href={`/projects/${p.slug}`}
        className="flex h-full flex-col gap-4 rounded-card border border-border bg-card p-4 text-foreground transition-colors duration-300 hover:border-primary-strong"
      >
        <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
          <MetaLine p={p} />
          <h3 className="text-lead font-bold tracking-[-0.025em] break-keep">{p.title}</h3>
          <p className="text-body text-muted-foreground text-pretty break-keep">
            {p.card?.tagline ?? p.summary}
          </p>

          {/* 상세 What I did의 굵은 리드인을 그대로 가져온다 — 카드와 상세가 같은 말로 이어진다 */}
          {picks.length > 0 ? (
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {picks.map((k) => (
                <li key={k} className="flex gap-2 text-body font-semibold break-keep">
                  <span aria-hidden className="text-primary-strong">
                    →
                  </span>
                  {k}
                </li>
              ))}
            </ul>
          ) : null}

          {/* 스택을 바닥에 붙여 한 줄에 선 카드들의 기준선을 맞춘다 */}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {stack.map((s) => (
              <Badge key={s} variant="tag" className="font-mono text-eyebrow text-foreground">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </Tilt>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const rest = projects.slice(INITIAL_COUNT);
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead
        idx="02"
        title="Projects"
        className="mb-10"
        action={
          <span className="font-mono text-meta tracking-[0.1em] text-muted-foreground">
            {projects.length} PROJECTS
          </span>
        }
      />

      {/* 760px 이상 — 스포트라이트 스트립. 1000px 아래와 터치에서는 globals.css가
          같은 마크업을 가로 스크롤 필름스트립으로 눕힌다 */}
      <RevealGroup className="max-wrap:hidden">
        <ul className="spotlight-strip">
          {projects.map((p, i) => (
            <SpotlightFrame key={p.slug} p={p} i={i} />
          ))}
        </ul>
      </RevealGroup>

      {/* 760px 미만 폴백 — 그 폭에서는 접힌 패널이 30px대가 되어 스트립이 성립하지 않는다.
          이미지가 없는 텍스트 카드라 데스크톱에서 숨겨도 요청이 0건이다.
          ⚠️ cardPicks()가 card.picks와 work 리드인의 정합을 빌드타임에 강제하는 유일한
          장치다 — 이 그리드를 지우면 그 검사도 같이 사라진다 */}
      <RevealGroup id="project-grid" className="grid grid-cols-1 gap-3.5 wrap:hidden">
        {visible.map((p) => (
          <RevealItem key={p.slug}>
            <ProjectCard p={p} />
          </RevealItem>
        ))}
      </RevealGroup>

      {rest.length > 0 ? (
        <Button
          variant="dashed"
          size="panel"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          aria-controls="project-grid"
          className="mt-4 wrap:hidden"
        >
          {showAll ? (
            <>
              접기
              <span aria-hidden>↑</span>
            </>
          ) : (
            `프로젝트 더보기 (+${rest.length})`
          )}
        </Button>
      ) : null}
    </section>
  );
}

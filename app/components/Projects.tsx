'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cardPicks, projects, type Project } from '../projects/projects';
import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';
import Tilt from './Tilt';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const INITIAL_COUNT = 3;

/** 카드 상단의 스크린샷 매트.
    대표 이미지가 없고 갤러리 첫 장이 세로(모바일)면 폰 프레임으로 세운다 — 16:10 매트에
    cover로 넣으면 상단 일부만 잘려 앱인지 알아볼 수 없다. 카드 전체가 링크라 이미지는 장식(alt=""). */
function Stage({ p }: { p: Project }) {
  const shot = p.gallery?.[0];
  const src = p.image ?? shot?.src;
  if (!src) return null;
  const portrait = !p.image && !!shot && shot.h > shot.w;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-media bg-secondary">
      {portrait ? (
        <div className="absolute inset-0 flex items-center justify-center py-3">
          <div
            className="relative h-full overflow-hidden rounded-[18px] border border-border bg-card transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
          >
            <Image src={src} alt="" fill sizes="120px" className="object-cover object-top" />
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1040px) 50vw, 400px"
          className={`transition-transform duration-500 group-hover:scale-[1.02] ${
            p.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover object-top'
          }`}
        />
      )}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const org = p.org.split(' · ')[0];
  const stack = (p.resumeStack ?? p.stack).slice(0, 3);
  const picks = cardPicks(p);

  return (
    <Tilt className="h-full">
      <Link
        href={`/projects/${p.slug}`}
        className="group flex h-full flex-col gap-4 rounded-card border border-border bg-card p-4 text-foreground transition-colors duration-300 hover:border-primary-strong"
      >
        <Stage p={p} />

        <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-eyebrow tracking-[0.12em] text-muted-foreground">
            <Badge>{org}</Badge>
            <span>{p.period}</span>
            {p.active ? (
              <span className="inline-flex items-center gap-1.5 text-primary-strong">
                <span aria-hidden className="h-1.5 w-1.5 rounded-chip bg-primary" />
                {p.status ?? `진행 중${p.currentTask ? ` · ${p.currentTask}` : ''}`}
              </span>
            ) : null}
          </div>
          <h3 className="text-lead font-bold tracking-[-0.025em] break-keep">{p.title}</h3>
          <p className="text-body text-muted-foreground text-pretty break-keep">
            {p.card?.tagline ?? p.summary}
          </p>

          {/* 상세 What I did의 굵은 리드인을 그대로 가져온다 — 카드와 상세가 같은 말로 이어진다 */}
          {picks.length > 0 ? (
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {picks.map((k) => (
                <li key={k} className="flex gap-2 text-label font-semibold break-keep">
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

      {/* 1040px 이상 3열 · 760~1040px 2열 · 760px 미만 1열. 첫 화면 3장이 한 줄에 선다 */}
      <RevealGroup className="grid grid-cols-3 gap-3.5 max-journey:grid-cols-2 max-wrap:grid-cols-1">
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
          className="mt-4"
        >
          {showAll ? '접기 ↑' : `프로젝트 더보기 (+${rest.length})`}
        </Button>
      ) : null}
    </section>
  );
}

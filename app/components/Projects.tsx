'use client';

import Link from 'next/link';
import { useState } from 'react';
import { projects, type Project } from '../projects/projects';
import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';
import Tilt from './Tilt';
import { Eyebrow } from './primitives';

const INITIAL_COUNT = 3;

/** 카드 우측 레일의 첫 칸. 지표가 있으면 지표, 없으면 규모로 대체한다.
    시안의 "수치 입력 필요" 플레이스홀더 대신 이미 가진 사실을 보여준다. */
function headline(p: Project): { label: string; value: string; caption: string } {
  const m = p.metrics?.[0];
  return m
    ? { label: '지표', value: m.value, caption: m.label }
    : { label: '규모', value: p.scale, caption: p.type };
}

function ProjectCard({ p }: { p: Project }) {
  const org = p.org.split(' · ')[0];
  const stack = (p.resumeStack ?? p.stack).slice(0, 3);
  const head = headline(p);

  return (
    <Tilt>
      <Link
        href={`/projects/${p.slug}`}
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7 rounded-card border border-border bg-card p-[30px] text-foreground transition-[border-color,box-shadow] duration-300 hover:border-primary-strong hover:shadow-[0_18px_40px_-28px_var(--color-shadow)]"
      >
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-eyebrow tracking-[0.12em] text-muted-foreground">
            <span className="rounded-chip bg-muted px-2.5 py-1 text-foreground">{org}</span>
            <span>{p.period}</span>
            {p.active ? (
              <span className="inline-flex items-center gap-1.5 text-primary-strong">
                <span aria-hidden className="h-1.5 w-1.5 rounded-chip bg-primary" />
                진행 중{p.currentTask ? ` · ${p.currentTask}` : ''}
              </span>
            ) : null}
          </div>
          <h3 className="text-title font-bold tracking-[-0.025em] break-keep">{p.title}</h3>
          <p className="text-body text-muted-foreground text-pretty break-keep">{p.summary}</p>
        </div>

        {/* 우측 레일 — 상세로 들어가기 전에 판단할 재료(지표·역할·스택)를 카드에서 노출한다 */}
        <div className="flex flex-col gap-4 border-l border-border pl-7 max-wrap:border-l-0 max-wrap:pl-0">
          <div className="flex flex-col gap-1.5">
            <Eyebrow>{head.label}</Eyebrow>
            <span className="font-display text-title font-bold tracking-[-0.02em] text-primary-strong break-keep">
              {head.value}
            </span>
            <span className="text-label leading-[1.5] text-muted-foreground break-keep">{head.caption}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Eyebrow>담당 역할</Eyebrow>
            <span className="text-label font-medium break-keep">{p.role}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>스택</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-[6px] bg-muted px-2.5 py-1 font-mono text-eyebrow"
                >
                  {s}
                </span>
              ))}
            </div>
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

      <RevealGroup className="flex flex-col gap-3.5">
        {visible.map((p) => (
          <RevealItem key={p.slug}>
            <ProjectCard p={p} />
          </RevealItem>
        ))}
      </RevealGroup>

      {rest.length > 0 ? (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="mt-4 w-full cursor-pointer rounded-panel border border-dashed border-border p-[18px] text-label font-semibold text-foreground transition-colors hover:border-solid hover:bg-muted"
        >
          {showAll ? '접기 ↑' : `프로젝트 더보기 (+${rest.length})`}
        </button>
      ) : null}
    </section>
  );
}

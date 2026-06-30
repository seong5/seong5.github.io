'use client';

import Link from 'next/link';
import { useState } from 'react';
import { projects, type Project } from '../projects/projects';
import SectionHead from './SectionHead';

const INITIAL_COUNT = 3;

function ProjectCard({ p }: { p: Project }) {
  const shown = p.stack.slice(0, 6);
  // GitHub Actions는 stack 뒤쪽에 있어도 카드에 항상 노출
  if (p.stack.includes('GitHub Actions') && !shown.includes('GitHub Actions')) {
    shown.push('GitHub Actions');
  }

  return (
    <Link
      className="group relative block -mx-[22px] rounded-lg border-t border-line px-[22px] py-[34px] transition-all duration-[180ms] first:border-t-0 first:pt-[8px] hover:proj-hover"
      href={`/projects/${p.slug}`}
    >
      <div className="mb-3 flex flex-wrap gap-[14px] text-[0.78125rem] text-muted [&_span]:whitespace-nowrap">
        <span>{p.org}</span>
        <span className="font-mono">{p.period}</span>
      </div>
      <h3 className="flex items-center gap-3 text-[1.4375rem] font-semibold leading-[1.3] tracking-[-.01em]">
        {p.title}{' '}
        <span className="font-mono text-line2 transition duration-[180ms] group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </h3>
      <p className="mt-3 max-w-[78ch] text-pretty text-[0.90625rem] font-normal leading-[1.8] text-ink2 break-keep">
        {p.summary}
      </p>
      <div className="mt-[18px] flex flex-wrap gap-[7px]">
        {shown.map((s) => (
          <span
            className="rounded-badge border border-line bg-panel px-[9px] py-1 font-mono text-[0.75rem] text-muted"
            key={s}
          >
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const initial = projects.slice(0, INITIAL_COUNT);
  const rest = projects.slice(INITIAL_COUNT);

  return (
    <section
      className="max-w-[1080px] border-b border-line px-[72px] pb-[36px] pt-[80px] max-nav:px-[22px] max-nav:pb-[28px] max-nav:pt-[52px]"
      id="projects"
    >
      <SectionHead idx="02" title="Projects" />
      <div className="flex flex-col">
        {initial.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}

        {rest.length > 0 && (
          <button
            type="button"
            className="group -mx-[22px] flex items-center justify-center gap-2 border-t border-line px-[22px] py-[26px] text-[0.9375rem] font-medium text-muted transition-colors hover:bg-accent/[0.04] hover:text-accent"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            <span>{showAll ? '프로젝트 접기' : '그 외 프로젝트 더보기'}</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className={`h-[18px] w-[18px] transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {showAll && rest.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}

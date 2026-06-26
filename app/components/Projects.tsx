'use client';

import Link from 'next/link';
import { useState } from 'react';
import { projects, type Project } from '../projects/projects';
import SectionHead from './SectionHead';

const INITIAL_COUNT = 3;

function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      className="group relative block -mx-[22px] rounded-lg border-t border-line px-[22px] py-[34px] transition-all duration-[180ms] first:border-t-0 hover:proj-hover"
      href={`/projects/${p.slug}`}
    >
      <div className="mb-3 flex flex-wrap gap-[14px] font-mono text-[0.78125rem] text-muted [&_span]:whitespace-nowrap">
        <span>{p.org}</span>
        <span>{p.period}</span>
      </div>
      <h3 className="flex items-center gap-3 text-[1.4375rem] font-semibold leading-[1.3] tracking-[-.01em]">
        {p.title}{' '}
        <span className="font-mono text-line2 transition duration-[180ms] group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </h3>
      <p className="mt-3 max-w-[60ch] text-[0.90625rem] font-normal leading-[1.8] text-ink2">
        {p.summary}
      </p>
      <div className="mt-[18px] flex flex-wrap gap-[7px]">
        {p.stack.slice(0, 6).map((s) => (
          <span
            className="rounded-[3px] border border-line px-[9px] py-1 font-mono text-[0.75rem] text-muted"
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
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  return (
    <section
      className="max-w-[1080px] border-b border-line px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="projects"
    >
      <SectionHead idx="02" title="Projects" />
      <div className="flex flex-col">
        {visible.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-[34px] flex justify-center border-t border-line pt-[34px]">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[5px] border border-line bg-panel px-5 py-2.5 font-mono text-[0.78125rem] text-muted transition hover:border-line2 hover:text-accent"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                접기 <span className="transition group-hover:text-accent">↑</span>
              </>
            ) : (
              <>
                더보기 <span className="text-accent">(+{hiddenCount})</span> ↓
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

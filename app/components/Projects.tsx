'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { projects, type Project } from '../projects/projects';
import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';

const INITIAL_COUNT = 3;

const GRID_CLS =
  'grid grid-cols-3 gap-x-5 gap-y-12 max-nav:grid-cols-2 max-wrap:grid-cols-1 max-wrap:gap-y-10';

/** 카드 대표 이미지 — image 우선, 없으면 gallery 첫 장 */
function cardImage(p: Project): string | undefined {
  return p.image ?? p.gallery?.[0]?.src;
}

function ProjectCard({
  p,
  featured = false,
  priority = false,
}: {
  p: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  const img = cardImage(p);
  const org = p.org.split(' · ')[0];

  return (
    <Link href={`/projects/${p.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-cloud">
        {img ? (
          <Image
            src={img}
            alt={p.title}
            fill
            priority={priority}
            sizes="(max-width: 760px) 100vw, (max-width: 880px) 50vw, 340px"
            className={`transition-transform duration-300 ease-out group-hover:scale-[1.03] ${
              p.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover object-top'
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[0.75rem] font-medium text-mute">
            {p.thumbnail}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-x-2 text-[0.75rem] font-medium text-mute">
          <span>{org}</span>
          <span aria-hidden>·</span>
          <span>{p.period}</span>
        </div>
        <h3 className="text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.01em] text-paper">
          {p.title}
          {!featured && (
            <span className="ml-1.5 inline-block text-mute transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
              →
            </span>
          )}
        </h3>
        <p className="line-clamp-2 text-[0.875rem] leading-[1.6] text-mute break-keep">
          {p.summary}
        </p>
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
      className="max-w-[1080px] px-[72px] pb-[80px] pt-[80px] max-nav:px-[22px] max-nav:pb-[52px] max-nav:pt-[52px]"
      id="projects"
    >
      <SectionHead idx="01" title="Projects" />

      {/* 상단: 대표 3개 */}
      <RevealGroup className={GRID_CLS}>
        {initial.map((p) => (
          <RevealItem key={p.slug}>
            <ProjectCard p={p} featured priority />
          </RevealItem>
        ))}
      </RevealGroup>

      {rest.length > 0 && (
        <>
          {/* 중앙 라벨 + 양옆 가로줄 — 3개 아래에 고정. 펼치면 아래 그리드만 늘어나 제자리. */}
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="projects-rest"
            className="group mt-12 flex w-full items-center gap-4 text-[0.875rem] font-medium text-mute transition-colors group-hover:text-accent max-wrap:mt-10"
          >
            <span className="h-px flex-1 bg-hairline" aria-hidden />
            <span className="flex shrink-0 cursor-pointer items-center gap-2">
              {showAll ? '프로젝트 접기' : `프로젝트 더보기 (+${rest.length})`}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5 ${showAll ? 'rotate-180' : ''}`}
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="h-px flex-1 bg-hairline" aria-hidden />
          </button>

          <RevealGroup
            id="projects-rest"
            className={`${GRID_CLS} mt-12 max-wrap:mt-10 ${showAll ? '' : 'hidden'}`}
          >
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard p={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </>
      )}
    </section>
  );
}

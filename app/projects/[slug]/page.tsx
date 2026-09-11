import type { Metadata } from 'next';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackToTop from '../../components/BackToTop';
import InsightAccordion from '../../components/InsightAccordion';
import ProjectToc, { type TocSection } from '../../components/ProjectToc';
import { RevealGroup, RevealItem } from '../../components/Reveal';
import ScrollProgressBar from '../../components/ScrollProgressBar';
import StackChips from '../../components/StackChips';
import ThemeToggle from '../../components/ThemeToggle';
import TroubleCard from '../../components/TroubleCard';
import { Eyebrow, MetaList } from '../../components/primitives';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { getProject, projects } from '../projects';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };

  const title = `${project.title} — 신성오`;
  const ogImage = project.image ?? project.gallery?.[0]?.src;

  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      url: `/projects/${project.slug}/`,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'article',
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description: project.summary,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/** 상세 본문 섹션 제목 — 히어로 h1과 경쟁하지 않도록 작고 굵게, 헤어라인으로만 구분 */
function H2({ children }: { children: string }) {
  return (
    <h2 className="border-b border-border pb-4 font-display text-read font-bold tracking-[0.02em]">
      {children}
    </h2>
  );
}

/** '==구절==' 을 형광펜으로 바꾼다. InsightAccordion 의 hl-marker 와 같은 밴드다.
    .hl-marker 에 box-decoration-break: clone 이 걸려 있어 줄바꿈돼도 밴드가 따라붙는다. */
function marked(text: string) {
  // 순서가 고정된 조각이라 인덱스를 key 로 쓴다. 원문을 key 에 넣으면
  // 같은 문자열이 RSC 페이로드에 조각 수만큼 중복으로 실린다.
  return text
    .split('==')
    .map((seg, i) =>
      i % 2 === 1 ? (
        <span key={i} className="hl-marker">
          {seg}
        </span>
      ) : (
        <Fragment key={i}>{seg}</Fragment>
      ),
    );
}

export default async function ProjectDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const order = String(index + 1).padStart(2, '0');
  const total = String(projects.length).padStart(2, '0');
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  // 코드가 비공개인 사내 서비스는 links가 비어 있다 — 링크 부재를 그대로 두지 않고 이유를 밝힌다
  const isPrivate = project.links.length === 0;
  const stackCore = (project.resumeStack ?? project.stack).slice(0, 3);
  const stackRest = project.stack.filter((s) => !stackCore.includes(s));
  const shots = project.gallery ?? [];
  const work = project.work;

  const tocSections: TocSection[] = [
    { id: 'overview', label: 'Overview' },
    ...(shots.length > 0 ? [{ id: 'media', label: 'Screens' }] : []),
    { id: 'work', label: 'What I did' },
    ...(project.troubleshooting?.length ? [{ id: 'trouble', label: 'Trouble-Shooting' }] : []),
    ...(project.insights?.length ? [{ id: 'insights', label: 'Insights' }] : []),
  ];

  return (
    <>
      <ScrollProgressBar />

      <header className="sticky top-0 z-80 border-b border-border bg-background-fade backdrop-blur-[14px]">
        <div className="mx-auto flex max-w-detail flex-wrap items-center gap-x-[18px] gap-y-2 px-7 py-3">
          <Link
            href="/#projects"
            className="flex items-center gap-2 font-mono text-meta tracking-[0.1em] text-foreground transition-colors hover:text-primary-strong"
          >
            <span aria-hidden>←</span>
            <span>PROJECTS</span>
          </Link>
          <span aria-hidden className="h-4 w-px bg-border" />
          <span className="text-label font-semibold tracking-[-0.01em]">
            {project.title.split(' - ')[0]}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-meta tabular-nums tracking-[0.08em] text-muted-foreground">
              {order} / {total}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div id="main-content" tabIndex={-1} className="mx-auto max-w-detail px-7">
        {/* ── 히어로 ── */}
        <section className="pt-20" id="top">
          <div className="fade-in-slow flex flex-wrap items-center gap-3 font-mono text-meta tracking-[0.1em] text-muted-foreground">
            <Badge>{project.org}</Badge>
            <span>{project.period}</span>
            {project.active ? (
              <span className="inline-flex items-center gap-1.5 text-primary-strong">
                <span aria-hidden className="h-1.5 w-1.5 rounded-chip bg-primary" />
                {project.status ?? `진행 중${project.currentTask ? ` · ${project.currentTask}` : ''}`}
              </span>
            ) : null}
          </div>

          <h1 className="mt-[26px] max-w-[18em] text-h1-sub font-bold tracking-[-0.04em] text-balance break-keep">
            <span className="rise-mask">
              <span className="rise-line">{project.title}</span>
            </span>
          </h1>

          <div className="mt-[30px] flex flex-wrap gap-2.5">
            {project.links.map((l) => (
              <Button key={l.label} asChild size="track" className="px-[18px] py-2.5">
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                  <span aria-hidden className="font-mono">
                    ↗
                  </span>
                </a>
              </Button>
            ))}
            {isPrivate ? (
              <Badge variant="dashed" size="lg" className="text-label font-semibold text-muted-foreground">
                사내 서비스 · 코드 비공개
              </Badge>
            ) : null}
          </div>

          <p className="mt-[34px] max-w-[44em] text-[clamp(1rem,1.7vw,1.1875rem)] leading-[1.78] text-muted-foreground text-pretty break-keep">
            {project.detail ?? project.summary}
          </p>
        </section>

        {/* ── 좌측 목차 + 본문 ── */}
        <div className="flex flex-wrap items-start gap-12 pt-16">
          <ProjectToc sections={tocSections} />

          <main className="flex min-w-0 flex-1 basis-[560px] flex-col gap-[84px]">
            <section id="overview" className="flex scroll-mt-24 flex-col gap-[22px]">
              <H2>Overview</H2>
              <MetaList
                items={[
                  { label: 'ROLE', value: project.role },
                  { label: 'PERIOD', value: project.period },
                  { label: 'TEAM', value: project.scale },
                  { label: 'CATEGORY', value: project.type },
                ]}
              />
              <div className="flex flex-col gap-2.5 pt-2">
                <Eyebrow>STACK</Eyebrow>
                <StackChips core={stackCore} rest={stackRest} />
              </div>
            </section>

            {shots.length > 0 ? (
              <section id="media" className="flex scroll-mt-24 flex-col gap-[22px]">
                <H2>Screens</H2>
                <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
                  {shots.map((m) => (
                    <RevealItem key={m.src}>
                      <figure className="m-0 flex flex-col gap-2.5">
                        <div className="overflow-hidden rounded-media border border-border bg-muted">
                          <Image
                            src={m.src}
                            alt={m.alt ?? `${project.title} 화면`}
                            width={m.w}
                            height={m.h}
                            className="w-full"
                          />
                        </div>
                        {m.caption ? (
                          <figcaption className="text-label leading-[1.55] text-muted-foreground break-keep">
                            {m.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            ) : null}

            <section id="work" className="flex scroll-mt-24 flex-col gap-[26px]">
              <H2>What I did</H2>
              {work ? (
                <RevealGroup className="flex flex-col gap-[26px]">
                  {work.map((g) => (
                    <RevealItem
                      key={g.tag}
                      className="flex flex-col gap-2 not-first:border-t not-first:border-border not-first:pt-[26px] wrap:grid wrap:grid-cols-[112px_1fr] wrap:items-start wrap:gap-6"
                    >
                      <span className="font-mono text-eyebrow tracking-[0.16em] text-primary-strong wrap:pt-1">
                        {g.tag}
                      </span>
                      <ul className="m-0 flex list-disc flex-col gap-3.5 pl-5 marker:text-primary-strong">
                        {g.items.map((i) => {
                          // InsightAccordion 의 step 제목과 같은 ' — ' 규약.
                          // 구분자가 없으면 통째로 평문이라 다른 프로젝트는 그대로다.
                          const at = i.indexOf(' — ');
                          return (
                            <li
                              key={i}
                              className="max-w-[44em] text-read leading-[1.75] text-pretty break-keep"
                            >
                              {at === -1 ? (
                                marked(i)
                              ) : (
                                <>
                                  <strong className="font-semibold">
                                    {marked(i.slice(0, at))}
                                  </strong>
                                  {marked(i.slice(at))}
                                </>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </RevealItem>
                  ))}
                </RevealGroup>
              ) : (
                <ul className="m-0 flex list-disc flex-col gap-3.5 pl-5 marker:text-primary-strong">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-read leading-[1.75] text-pretty break-keep">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {project.troubleshooting?.length ? (
              <section id="trouble" className="flex scroll-mt-24 flex-col gap-5">
                <H2>Trouble-Shooting</H2>
                <RevealGroup className="flex flex-col gap-5">
                  {project.troubleshooting.map((t, i) => (
                    <RevealItem key={t.title}>
                      <TroubleCard t={t} index={i + 1} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            ) : null}

            {project.insights?.length ? (
              <section id="insights" className="flex scroll-mt-24 flex-col gap-3">
                <H2>Insights</H2>
                <InsightAccordion insights={project.insights} />
              </section>
            ) : null}
          </main>
        </div>

        {/* ── 이전/다음 ── */}
        <nav className="mt-24 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border-y border-border bg-border">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="flex flex-col gap-2.5 bg-background px-[26px] py-[34px] text-foreground transition-colors hover:bg-muted"
            >
              <Eyebrow>← PREVIOUS PROJECT</Eyebrow>
              <span className="text-lead font-bold tracking-[-0.025em] break-keep">
                {prev.title.split(' - ')[0]}
              </span>
            </Link>
          ) : null}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="flex flex-col gap-2.5 bg-background px-[26px] py-[34px] text-foreground transition-colors hover:bg-muted"
            >
              <Eyebrow>NEXT PROJECT →</Eyebrow>
              <span className="text-lead font-bold tracking-[-0.025em] break-keep">
                {next.title.split(' - ')[0]}
              </span>
            </Link>
          ) : null}
        </nav>

        <p className="m-0 py-10 pb-18 font-mono text-meta text-muted-foreground">
          © 2026 신성오 (Shin Seong-oh) — All rights reserved.
        </p>
      </div>

      {/* 본문을 다 지난 뒤 탭 순서 마지막에 닿도록 여기 둔다 */}
      <BackToTop />
    </>
  );
}

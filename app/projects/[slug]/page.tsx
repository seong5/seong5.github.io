import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '../projects';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — 신성오`,
    description: project.summary,
  };
}

export default async function ProjectDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const order = String(index + 1).padStart(2, '0');
  const prev = index > 0 ? projects[index - 1] : null;
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur-[8px]">
        <div className="mx-auto flex h-[62px] max-w-[920px] items-center justify-between px-8 max-wrap:px-[22px]">
          <Link
            className="flex items-center gap-2 text-[0.78125rem] text-muted transition hover:text-accent"
            href="/#projects"
          >
            <span className="font-mono">←</span> <span>메인으로 돌아가기</span>
          </Link>
          <span className="font-mono text-[0.75rem] text-muted">PROJECT / {order}</span>
        </div>
      </nav>

      <div className="mx-auto max-w-[920px] px-8 max-wrap:px-[22px]">
        <header className="pb-[50px] pt-[74px]">
          <div className="mb-[22px] flex flex-wrap items-center justify-between gap-[10px] text-[0.78125rem] text-muted">
            <div className="flex flex-wrap gap-[10px]">
              <span>{project.org}</span>
              <span className="font-mono">{project.period}</span>
            </div>
            {project.links.length > 0 && (
              <div className="flex shrink-0 gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    className="whitespace-nowrap rounded-[5px] border border-line bg-panel px-3 py-1.5 text-[0.75rem] text-ink transition hover:border-line2 hover:text-accent"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
          <h1 className="text-[clamp(1.75rem,4.4vw,2.625rem)] font-semibold leading-[1.2] tracking-[-.02em]">
            {project.title}
          </h1>
          <p className="mt-[18px] text-[1rem] font-normal leading-[1.8] text-ink2 break-keep">
            {project.detail ?? project.summary}
          </p>
          <div className="mt-[34px] grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-line bg-line max-wrap:grid-cols-2">
            <div className="bg-panel px-[18px] py-4">
              <div className="mb-[6px] font-mono text-[0.75rem] tracking-[.08em] text-muted">
                ROLE
              </div>
              <div className="text-[0.84375rem] font-medium">{project.role}</div>
            </div>
            <div className="bg-panel px-[18px] py-4">
              <div className="mb-[6px] font-mono text-[0.75rem] tracking-[.08em] text-muted">
                PERIOD
              </div>
              <div className="text-[0.84375rem] font-medium">{project.period}</div>
            </div>
            <div className="bg-panel px-[18px] py-4">
              <div className="mb-[6px] font-mono text-[0.75rem] tracking-[.08em] text-muted">
                SCALE
              </div>
              <div className="text-[0.84375rem] font-medium">{project.scale}</div>
            </div>
            <div className="bg-panel px-[18px] py-4">
              <div className="mb-[6px] font-mono text-[0.75rem] tracking-[.08em] text-muted">
                TYPE
              </div>
              <div className="text-[0.84375rem] font-medium">{project.type}</div>
            </div>
          </div>
        </header>

        {project.gallery ? (
          <div className="mb-2 mt-[14px] flex flex-col gap-[14px]">
            <div className="grid grid-cols-2 gap-[14px] max-wrap:grid-cols-1">
              {project.gallery.slice(0, 2).map((g, i) => (
                <div className="flex justify-center" key={g.src}>
                  <Image
                    src={g.src}
                    alt={`${project.title} 스크린샷 ${i + 1}`}
                    width={g.w}
                    height={g.h}
                    sizes="(max-width: 920px) 50vw, 460px"
                    className="h-auto max-h-[440px] w-auto max-w-full"
                    priority
                  />
                </div>
              ))}
            </div>
            {project.gallery.slice(2).map((g, i) => (
              <div className="flex justify-center" key={g.src}>
                <Image
                  src={g.src}
                  alt={`${project.title} 스크린샷 ${i + 3}`}
                  width={g.w}
                  height={g.h}
                  sizes="(max-width: 920px) 100vw, 920px"
                  className="h-auto w-auto max-w-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-2 mt-[14px]">
            {project.image ? (
              <div
                className={`relative aspect-[16/8] w-full overflow-hidden rounded-[10px] ${
                  project.imageNoBorder ? '' : 'border border-line2'
                } ${project.imageFit === 'contain' ? 'bg-panel' : ''}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 920px) 100vw, 920px"
                  className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}
                  priority
                />
              </div>
            ) : (
              <div className="ph-frame flex aspect-[16/8] w-full items-end rounded-[10px] border border-line2 p-4">
                <span className="font-mono text-[0.75rem] leading-[1.4] text-muted">
                  [img] {project.thumbnail}
                </span>
              </div>
            )}
          </div>
        )}

        <section className="border-t border-line py-12">
          <h2 className="mb-[26px] flex items-baseline gap-[14px] font-mono text-[0.8125rem] font-medium uppercase tracking-[.1em] text-ink">
            <span className="text-[0.75rem] text-accent">/</span> What I did
          </h2>
          <div className="flex flex-col">
            {project.highlights.map((h, i) => (
              <div
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-line py-[15px] first:border-t-0"
                key={i}
              >
                <span className="mt-0.5 font-mono text-[0.8125rem] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[0.9375rem] font-normal leading-[1.7] text-ink2">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {project.metrics && project.metrics.length > 0 && (
          <section className="border-t border-line py-12">
            <h2 className="mb-[26px] flex items-baseline gap-[14px] font-mono text-[0.8125rem] font-medium uppercase tracking-[.1em] text-ink">
              <span className="text-[0.75rem] text-accent">/</span> Key results
            </h2>
            <div className="grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-line bg-line max-wrap:grid-cols-2">
              {project.metrics.map((m, i) => (
                <div className="bg-panel px-[18px] py-5" key={i}>
                  <div className="font-mono text-[clamp(1.375rem,3vw,1.75rem)] font-semibold leading-none tracking-[-.02em] text-accent">
                    {m.value}
                  </div>
                  <div className="mt-[10px] text-[0.78125rem] font-normal leading-[1.5] text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.troubleshooting && project.troubleshooting.length > 0 && (
          <section className="border-t border-line py-12">
            <h2 className="mb-[26px] flex items-baseline gap-[14px] font-mono text-[0.8125rem] font-medium uppercase tracking-[.1em] text-ink">
              <span className="text-[0.75rem] text-accent">/</span> Troubleshooting
            </h2>
            <div className="flex flex-col gap-[18px]">
              {project.troubleshooting.map((t, i) => (
                <div className="overflow-hidden rounded-[10px] border border-line" key={i}>
                  <div className="flex items-baseline gap-[14px] border-b border-line bg-panel px-6 py-[18px] max-wrap:px-5">
                    <span className="font-mono text-[0.8125rem] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-[0.96875rem] font-semibold leading-[1.5] tracking-[-.01em] text-ink">
                      {t.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-6 bg-panel p-6 max-wrap:p-5">
                    <div className="grid grid-cols-[64px_1fr] gap-x-4 gap-y-1 max-wrap:grid-cols-1 max-wrap:gap-y-1.5">
                      <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[.08em] text-ink">
                        Problem
                      </span>
                      <p className="text-[0.90625rem] font-normal leading-[1.7] text-ink2">
                        {t.situation}
                      </p>
                    </div>
                    <div className="grid grid-cols-[64px_1fr] gap-x-4 gap-y-1 max-wrap:grid-cols-1 max-wrap:gap-y-1.5">
                      <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[.08em] text-ink">
                        Goal
                      </span>
                      <p className="text-[0.90625rem] font-normal leading-[1.7] text-ink2">{t.task}</p>
                    </div>
                    {t.taskImage && (
                      <Image
                        src={t.taskImage.src}
                        alt={`${t.title} 문제 구조 다이어그램`}
                        width={t.taskImage.w}
                        height={t.taskImage.h}
                        sizes="(max-width: 920px) 100vw, 860px"
                        className="h-auto w-full rounded-[8px] border border-line bg-panel"
                        unoptimized={t.taskImage.src.endsWith('.svg')}
                      />
                    )}
                    <div className="grid grid-cols-[64px_1fr] gap-x-4 gap-y-2 max-wrap:grid-cols-1">
                      <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[.08em] text-ink">
                        Action
                      </span>
                      <ul className="flex flex-col gap-[10px]">
                        {t.action.map((a, j) => (
                          <li
                            className="relative pl-[18px] text-[0.90625rem] font-normal leading-[1.7] text-ink2 before:absolute before:left-0 before:top-[11px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-line2"
                            key={j}
                          >
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {t.actionImage && (
                      <Image
                        src={t.actionImage.src}
                        alt={`${t.title} 해결 구조 다이어그램`}
                        width={t.actionImage.w}
                        height={t.actionImage.h}
                        sizes="(max-width: 920px) 100vw, 860px"
                        className="h-auto w-full rounded-[8px] border border-line bg-panel"
                        unoptimized={t.actionImage.src.endsWith('.svg')}
                      />
                    )}
                    <div className="grid grid-cols-[64px_1fr] gap-x-4 gap-y-2 rounded-[8px] border-l-2 border-accent bg-accent/5 p-4 max-wrap:grid-cols-1">
                      <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[.08em] text-accent">
                        Result
                      </span>
                      <ul className="flex flex-col gap-[10px]">
                        {t.result.map((r, j) => (
                          <li
                            className="relative pl-[18px] text-[0.90625rem] font-normal leading-[1.7] text-ink2 before:absolute before:left-0 before:top-[10px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-accent"
                            key={j}
                          >
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {t.image && (
                      <Image
                        src={t.image.src}
                        alt={`${t.title} 다이어그램`}
                        width={t.image.w}
                        height={t.image.h}
                        sizes="(max-width: 920px) 100vw, 860px"
                        className="mt-1 h-auto w-full rounded-[8px] border border-line"
                        unoptimized={t.image.src.endsWith('.svg')}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.insights && project.insights.length > 0 && (
          <section className="border-t border-line py-12">
            <h2 className="mb-[26px] flex items-baseline gap-[14px] font-mono text-[0.8125rem] font-medium uppercase tracking-[.1em] text-ink">
              <span className="text-[0.75rem] text-accent">/</span> Insights
            </h2>
            <div className="flex flex-col gap-9">
              {project.insights.map((ins, i) => (
                <div key={i}>
                  <h3 className="text-[1rem] font-semibold leading-[1.5] tracking-[-.01em] text-ink">
                    {ins.title}
                  </h3>
                  {ins.intro && (
                    <p className="mt-[14px] text-[0.9375rem] font-normal leading-[1.8] text-ink2">
                      {ins.intro}
                    </p>
                  )}
                  <div className="mt-[22px] flex flex-col gap-[14px]">
                    {ins.steps.map((s, j) => (
                      <div
                        className="rounded-[10px] border border-line bg-panel p-6 max-wrap:p-5"
                        key={j}
                      >
                        <div className="flex items-baseline gap-[14px]">
                          <span className="font-mono text-[0.8125rem] text-accent">
                            {String(j + 1).padStart(2, '0')}
                          </span>
                          <h4 className="text-[0.90625rem] font-semibold leading-[1.5] text-ink">
                            {s.title}
                          </h4>
                        </div>
                        <ul className="mt-3 flex flex-col gap-[10px] pl-[30px]">
                          {s.points.map((p, k) => (
                            <li
                              className="relative pl-[18px] text-[0.90625rem] font-normal leading-[1.7] text-ink2 before:absolute before:left-0 before:top-[11px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-line2"
                              key={k}
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {ins.image && (
                    <div className="mt-[18px] flex justify-center">
                      <Image
                        src={ins.image.src}
                        alt={`${ins.title} 다이어그램`}
                        width={ins.image.w}
                        height={ins.image.h}
                        sizes="(max-width: 920px) 100vw, 560px"
                        className="h-auto w-auto max-h-[780px] max-w-full"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-line py-12">
          <h2 className="mb-[26px] flex items-baseline gap-[14px] font-mono text-[0.8125rem] font-medium uppercase tracking-[.1em] text-ink">
            <span className="text-[0.75rem] text-accent">/</span> Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                className="rounded-[5px] border border-line bg-panel px-3 py-1.5 font-mono text-[0.75rem] text-ink"
                key={s}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-line pb-20 pt-10">
          {prev ? (
            <Link
              className="text-[0.8125rem] text-ink transition hover:text-accent"
              href={`/projects/${prev.slug}`}
            >
              Previous project
              <br />
              <span className="font-semibold text-ink">
                <span className="font-mono">←</span> {prev.title.split(' — ')[0]}
              </span>
            </Link>
          ) : (
            <span />
          )}
          <Link
            className="text-right text-[0.8125rem] text-ink transition hover:text-accent"
            href={`/projects/${next.slug}`}
          >
            Next project
            <br />
            <span className="font-semibold text-ink">
              {next.title.split(' — ')[0]} <span className="font-mono">→</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

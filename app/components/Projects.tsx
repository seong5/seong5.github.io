import Link from 'next/link';
import Image from 'next/image';
import { projects, type Project } from '../projects/projects';
import SectionHead from './SectionHead';

/** 카드 대표 이미지 — image 우선, 없으면 gallery 첫 장 */
function cardImage(p: Project): string | undefined {
  return p.image ?? p.gallery?.[0]?.src;
}

function ProjectCard({ p }: { p: Project }) {
  const img = cardImage(p);
  const stack = p.stack.slice(0, 4);
  const org = p.org.split(' · ')[0];

  return (
    <Link href={`/projects/${p.slug}`} className="group flex flex-col">
      {/* product-card-image — soft-cloud 스테이지, 0 radius, 평면 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cloud">
        {img ? (
          <Image
            src={img}
            alt={p.title}
            fill
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

      {/* 메타 — 이미지 바로 아래, 8px 간격 */}
      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-x-2 text-[0.75rem] font-medium text-mute">
          <span>{org}</span>
          <span aria-hidden>·</span>
          <span>{p.period}</span>
        </div>
        <h3 className="text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.01em] text-ink">
          {p.title}
          <span className="ml-1.5 inline-block text-mute transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink">
            →
          </span>
        </h3>
        <p className="line-clamp-2 text-[0.875rem] leading-[1.6] text-mute break-keep">
          {p.summary}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-hairline px-2.5 py-0.5 text-[0.6875rem] font-medium text-mute"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <section
      className="max-w-[1080px] px-[72px] pb-[80px] pt-[80px] max-nav:px-[22px] max-nav:pb-[52px] max-nav:pt-[52px]"
      id="projects"
    >
      <SectionHead idx="02" title="Projects" />
      <div className="grid grid-cols-3 gap-x-5 gap-y-12 max-nav:grid-cols-2 max-wrap:grid-cols-1 max-wrap:gap-y-10">
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

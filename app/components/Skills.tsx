import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';
import { Panel } from './ui';

const SKILLS = [
  { label: 'FRAMEWORK', items: ['React', 'Next.js (App Router)'] },
  { label: 'LANGUAGE', items: ['JavaScript (ES6+)', 'TypeScript'] },
  { label: 'STATE', items: ['Zustand', 'Tanstack Query', 'React Hook Form'] },
  { label: 'STYLING', items: ['Tailwind CSS', 'Styled-components'] },
  { label: 'QUALITY / TEST', items: ['Zod', 'Jest', 'Playwright', 'Storybook'] },
  { label: 'DEPLOY / INFRA', items: ['Vercel', 'GitHub Actions', 'AWS', 'Supabase', 'Docker'] },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead idx="03" title="Skills" className="mb-10" />
      <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
        {SKILLS.map((g) => (
          <RevealItem key={g.label}>
            <Panel className="flex h-full flex-col gap-3.5 p-6">
              <span className="font-mono text-eyebrow tracking-[0.16em] text-muted">{g.label}</span>
              <div className="flex flex-wrap gap-[7px]">
                {g.items.map((i) => (
                  <span
                    key={i}
                    className="rounded-chip bg-surface-2 px-3 py-[7px] text-label font-semibold transition-colors hover:bg-accent hover:text-accent-ink"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

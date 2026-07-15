import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';

const SKILLS = [
  { label: 'Framework', items: ['React', 'Next.js (App Router)'] },
  { label: 'Language', items: ['JavaScript (ES6+)', 'TypeScript'] },
  { label: 'State', items: ['Zustand', 'Tanstack Query', 'React Hook Form'] },
  { label: 'Styling', items: ['Tailwind CSS', 'Styled-components'] },
  { label: 'Quality / Test', items: ['Zod', 'Jest', 'Playwright', 'Storybook'] },
  { label: 'Deploy / Infra', items: ['Vercel', 'GitHub Actions', 'AWS', 'Supabase', 'Docker'] },
];

export default function Skills() {
  return (
    <section
      className="max-w-[1080px] px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="skills"
    >
      <SectionHead idx="03" title="Skills" />
      <RevealGroup className="grid grid-cols-2 gap-x-12 gap-y-7 max-nav:grid-cols-1">
        {SKILLS.map((g) => (
          <RevealItem key={g.label}>
            <div className="mb-3 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-mute">
              {g.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span
                  key={i}
                  className="rounded-full border border-hairline bg-cloud px-3.5 py-1.5 text-[0.8125rem] font-medium text-paper"
                >
                  {i}
                </span>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

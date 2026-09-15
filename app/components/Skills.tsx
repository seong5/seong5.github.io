import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';
import { Eyebrow, Panel } from './primitives';
import { getStackBrand, StackIcon } from './stackIcons';
import { Badge } from './ui/badge';

const SKILLS = [
  // 순서가 곧 무게다 — 주력인 웹을 앞에, 넓혀가는 영역(앱: 다정해·Claude Log)을 뒤에 둔다
  { label: 'FRAMEWORK', items: ['React', 'Next.js (App Router)', 'React Native', 'Expo', 'Electron'] },
  { label: 'LANGUAGE', items: ['JavaScript (ES6+)', 'TypeScript'] },
  { label: 'STATE', items: ['Zustand', 'Tanstack Query', 'React Hook Form'] },
  { label: 'STYLING', items: ['Tailwind CSS', 'Styled-components'] },
  { label: 'QUALITY / TEST', items: ['Zod', 'Jest', 'Playwright', 'Storybook'] },
  { label: 'DEPLOY / INFRA', items: ['Vercel', 'GitHub Actions', 'AWS', 'Supabase', 'Docker'] },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead idx="04" title="Skills" className="mb-10" />
      <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
        {SKILLS.map((g) => (
          <RevealItem key={g.label}>
            {/* 라벨/값 쌍이라 dl로 묶는다 — span이면 칩이 어느 그룹인지 프로그램적으로
                연결되지 않는다. 라벨은 Eyebrow를 써서 자간(0.16em)을 손으로 다시 쓰지 않는다. */}
            <Panel className="h-full p-6">
              <dl className="m-0 flex h-full flex-col gap-3.5">
                <Eyebrow as="dt">{g.label}</Eyebrow>
                <dd className="m-0 flex flex-wrap gap-[7px]">
                  {g.items.map((i) => (
                    <Badge
                      key={i}
                      size="md"
                      // hover 면을 강조색으로 채우면 그 위의 브랜드 색 대비가 들쭉날쭉해진다 —
                      // 면은 두고 로고와 테두리만 브랜드 색으로 바꾼다. 매핑 없는 칩은 기본 구분선색.
                      style={{ '--brand': getStackBrand(i) } as React.CSSProperties}
                      className="gap-1.5 text-label font-semibold text-foreground hover:border-(--brand,var(--border)) [&>svg]:size-3.5 [&>svg]:transition-colors hover:[&>svg]:text-(--brand)"
                    >
                      <StackIcon name={i} />
                      {i}
                    </Badge>
                  ))}
                </dd>
              </dl>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

import SectionHead from './SectionHead';

const EXPERIENCE = [
  {
    period: '2026.03 — 2026.06',
    tag: '3개월',
    org: 'UMUST R&D',
    role: '프론트엔드 인턴 · 사업부 IT팀',
    points: [
      '도봉라이프 어드민 서비스 구축 담당',
      '사내 ERP·CRO 서비스 프론트엔드 구축·통합 진행',
      '초기 2개월 이후 연장되어 총 3개월 근무',
    ],
  },
  {
    period: '2025.12 — 2026.01',
    tag: '1개월',
    org: '똑똑한개발자',
    role: '프론트엔드 인턴 · TF팀',
    points: ['Deckly(AI 사업제안서 자동화 SaaS) 개발 참여', 'Admin 사용자 트래킹 구현'],
  },
  {
    period: '2023.01 — 2025.01',
    tag: '2년',
    org: 'JFounders',
    role: 'F&B 사업부 · 지점장',
    points: [
      '프랜차이즈 카페·자사 샐러드 매장 운영 총괄',
      '인사·재정·마케팅·발주 관리',
      '마케팅 활동으로 월 매출 최대 17% 증가',
      '상황별 매뉴얼 제작으로 운영 자동화',
    ],
  },
  {
    period: '2018.11 — 2019.06',
    tag: '7개월',
    org: '호주 워킹홀리데이',
    role: 'Sydney, AU',
    points: ['다양한 환경에서 근무하며 외국어 소통 능력·다국적 문화 경험'],
  },
];

const SKILLS = [
  { label: 'Core', items: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js (App Router)'] },
  { label: 'State', items: ['Zustand', 'Tanstack Query', 'React Hook Form'] },
  { label: 'Styling', items: ['Tailwind CSS', 'Styled-components'] },
  { label: 'Quality / Test', items: ['Zod', 'Jest', 'ESLint', 'Prettier', 'Storybook'] },
  { label: 'Deploy / Infra', items: ['Vercel', 'GitHub Actions', 'AWS', 'Supabase'] },
];

export default function ExperienceSkills() {
  return (
    <section
      className="max-w-[1080px] px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="experience"
    >
      <div className="grid grid-cols-2 gap-16 max-nav:grid-cols-1 max-nav:gap-[46px]">
        {/* Experience — hairline 카탈로그 행 */}
        <div>
          <SectionHead idx="03" title="Experience" />
          <div className="flex flex-col">
            {EXPERIENCE.map((e) => (
              <div
                key={e.org}
                className="grid grid-cols-[140px_1fr] gap-x-6 border-t border-hairline py-6 first:border-t-0 max-nav:grid-cols-1 max-nav:gap-y-2"
              >
                <div>
                  <div className="text-[0.8125rem] font-medium text-ink">{e.period}</div>
                  <div className="mt-0.5 text-[0.75rem] font-medium text-mute">{e.tag}</div>
                </div>
                <div>
                  <h4 className="text-[1rem] font-medium tracking-[-0.01em] text-ink">{e.org}</h4>
                  <div className="mt-0.5 text-[0.8125rem] font-medium text-mute">{e.role}</div>
                  <ul className="mt-2.5 flex flex-col gap-1.5">
                    {e.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-[15px] text-[0.84375rem] font-normal leading-[1.7] text-charcoal break-keep before:absolute before:left-0 before:top-[9px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-hairline"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills — pill 클러스터 */}
        <div id="skills">
          <SectionHead idx="04" title="Skills" />
          <div className="flex flex-col gap-7">
            {SKILLS.map((g) => (
              <div key={g.label}>
                <div className="mb-3 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-mute">
                  {g.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-hairline bg-cloud px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

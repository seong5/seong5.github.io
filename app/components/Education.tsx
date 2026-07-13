import SectionHead from './SectionHead';

const EDUCATION: {
  period: string;
  status: string;
  name: string;
  desc: string;
  items?: string[];
}[] = [
  {
    period: '2025.02 — 2025.08',
    status: '수료',
    name: '코드잇 스프린트',
    desc: '프론트엔드 엔지니어 15기',
  },
  {
    period: '2025.08 — 현재',
    status: '수강',
    name: '인프런',
    desc: '필요한 지식에 대한 확장',
    items: ['Docker', 'React Native', 'Java · Spring'],
  },
  {
    period: '졸업예정',
    status: '전문학사',
    name: '학점은행제',
    desc: '영어영문학 전공',
  },
];

export default function Education() {
  return (
    <section
      className="max-w-[1080px] px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="education"
    >
      <SectionHead idx="05" title="Education" />
      <div className="grid">
        {EDUCATION.map((e) => (
          <div
            key={e.name}
            className="grid grid-cols-[130px_92px_1fr] items-baseline gap-5 border-t border-hairline py-5 first:border-t-0 max-nav:grid-cols-1 max-nav:gap-[3px] max-nav:py-[18px]"
          >
            <div className="text-[0.8125rem] font-medium tabular-nums text-mute">{e.period}</div>
            <div className="text-[0.8125rem] font-medium text-paper max-nav:order-first">
              {e.status}
            </div>
            <div className="text-[0.90625rem] font-normal leading-[1.6] text-charcoal break-keep">
              <b className="font-medium text-paper">{e.name}</b> — {e.desc}
              {e.items && (
                <ul className="mt-2 flex flex-col gap-1">
                  {e.items.map((it) => (
                    <li
                      key={it}
                      className="relative pl-[16px] before:absolute before:left-0 before:top-[10px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-mute"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

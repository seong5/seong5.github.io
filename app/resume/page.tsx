import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, type Project } from '../projects/projects';
import PrintButton from './PrintButton';
import './print.css';

export const metadata: Metadata = {
  title: '입사지원서 — 신성오 (Shin Seong-oh)',
  description: '신성오 (Shin Seong-oh) — 프론트엔드 개발자 입사지원서 (2026).',
};

const PORTFOLIO_PROJECTS_URL = 'https://seong5.github.io/#projects';

/* ── 데이터 (시안 2 PDF 정본) ─────────────────────────────── */

const STRENGTHS = [
  {
    tag: '주도성',
    title: '맡은 범위를 스스로 넓혀 문제를 해결합니다',
    body: '프론트 담당이지만 배포 장애 해결을 위해 백엔드 레포를 직접 받아 CORS·라우팅 설정을 분석·수정하는 등, 경계에 머무르지 않고 끝까지 파고듭니다.',
  },
  {
    tag: '책임감',
    title: '목표를 끝까지 완수해 성과로 증명합니다',
    body: '하프 마라톤·워킹홀리데이·학위 등 장기 목표를 달성해온 근성을, 복잡한 난제도 임시방편 없이 근본까지 해결하는 인내심과 책임감으로 이어갑니다.',
  },
];

const SKILLS = [
  { label: 'FRAMEWORK', items: ['React', 'Next.js (App Router)'] },
  { label: 'LANGUAGE', items: ['JavaScript (ES6+)', 'TypeScript'] },
  { label: 'STYLING', items: ['Tailwind CSS', 'Styled-components'] },
  { label: 'STATE', items: ['Zustand', 'Tanstack Query'] },
  { label: 'TEST', items: ['Zod', 'Jest', 'Playwright'] },
  { label: 'DEPLOY', items: ['Vercel', 'GitHub Actions', 'AWS', 'Supabase'] },
];

const TOTAL_PAGES = 4;

function toResumePeriod(period: string): string {
  return period
    .replace(/\bcurrent\b/gi, '현재')
    .replace(/(\d{4})\.(\d{2})\.\d{2}/g, '$1.$2')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim();
}

function toResumeTag(p: Project): string | undefined {
  const paren = p.period.match(/\(([^)]+)\)/);
  if (paren) {
    const v = paren[1].toLowerCase();
    if (v === '1m') return p.org.includes('코드잇') ? '1개월 · 코드잇' : '1개월';
    if (v === '3w') return '3주 · 코드잇';
  }
  if (p.active && p.org.includes('개인')) return '개인 · Active';
  if (p.slug === 'deckly') return '1개월 · 인턴';
  if (p.slug === 'umust-erp' || p.slug === 'dobong-admin') return '인턴';
  if (p.scale === '1개월 협업') return '1개월 · 코드잇';
  if (p.scale === '3주 협업') return '3주 · 코드잇';
  return p.scale || undefined;
}

const PROJECTS = projects.map((p) => ({
  slug: p.slug,
  period: toResumePeriod(p.period),
  tag: toResumeTag(p),
  title: p.title,
  org: p.org,
  desc: p.summary,
  points: p.resumeBullets ?? p.highlights.slice(0, 3),
  stack: p.resumeStack ?? p.stack,
}));

const PROJECTS_PAGE_1 = PROJECTS.slice(0, 3);
const PROJECTS_PAGE_2 = PROJECTS.slice(3);

const CAREER = [
  {
    period: '2026.03 — 2026.06',
    tag: '3개월',
    title: 'UMUST R&D',
    org: '프론트엔드 인턴 · 사업부 IT팀',
    points: [
      '사업부 IT팀 소속으로 사내 서비스 프론트엔드 전반 담당',
      '기획·디자인 협업부터 배포까지 풀사이클로 참여',
      '초기 2개월 계약 후 연장되어 총 3개월 근무',
    ],
  },
  {
    period: '2025.12 — 2026.01',
    tag: '1개월',
    title: '똑똑한개발자',
    org: '프론트엔드 인턴 · TF팀',
    points: [
      'TF팀에 프론트엔드로 투입되어 신규 SaaS 제품 기능 개발 기여',
      '단기 온보딩 후 실제 배포 기능을 담당',
    ],
  },
  {
    period: '2023.01 — 2025.01',
    tag: '2년',
    title: 'JFounders',
    org: 'F&B 사업부 · 지점장',
    points: [
      '프랜차이즈 카페·자사 샐러드 매장 운영 총괄',
      '인사·재정·마케팅·발주 관리',
      '근거리 직접 배달로 월 매출 최대 17% 증가',
      '상황별 매뉴얼 제작으로 운영 자동화',
    ],
  },
  {
    period: '2018.11 — 2019.06',
    tag: '7개월',
    title: '호주 워킹홀리데이',
    org: 'Sydney, AU',
    points: [
      '다양한 환경에서 근무하며 외국어 소통 능력·다국적 문화 경험',
      '장기 목표를 계획하고 달성',
    ],
  },
];

const EDUCATION = [
  {
    period: '2025.02 — 2025.08',
    title: '코드잇 스프린트 — 프론트엔드 엔지니어 15기',
    desc: '프론트엔드 기술 스택 교육 및 실무와 유사한 환경의 협업 프로젝트 수행.',
  },
  {
    period: '2025.08 — 현재',
    title: '인프런 — Docker · React Native · Java/Spring',
    desc: '개발환경 일관성(Docker), 앱 개발(React Native), 백엔드 확장(Java·Spring) 목적으로 수강 중.',
  },
  {
    period: '전문학사 · 졸업예정',
    title: '학점은행제 — 영어영문학 전공',
    desc: '학위 취득 이후 방송통신대학교 컴퓨터과학과 편입학 계획 중.',
  },
];

/* ── 공통 빌딩 블록 ───────────────────────────────────────── */

function SectionTitle({
  no,
  en,
  ko,
  action,
}: {
  no: string;
  en: string;
  ko: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-[18px] flex items-end justify-between gap-3 border-b border-hairline pb-[10px]">
      <div className="flex min-w-0 items-baseline gap-3">
        <span className="text-[0.875rem] text-ink">{no}</span>
        <h2 className="text-[0.875rem] font-medium uppercase tracking-[.14em] text-ink">{en}</h2>
        <span className="text-[0.8125rem] text-mute">{ko}</span>
      </div>
      {action}
    </div>
  );
}

function Entry({
  period,
  tag,
  title,
  org,
  desc,
  points = [],
  stack,
}: {
  period: string;
  tag?: string;
  title: string;
  org?: string;
  desc?: string;
  points?: string[];
  stack?: string[];
}) {
  return (
    <div className="avoid-break grid grid-cols-[112px_1fr] gap-x-5">
      <div>
        <div className="whitespace-nowrap text-[0.71875rem] leading-[1.5] text-ink">{period}</div>
        {tag ? <div className="mt-1 text-[0.6875rem] text-mute">{tag}</div> : null}
      </div>
      <div>
        <h3 className="text-[0.96875rem] font-semibold tracking-[-.01em] text-ink">{title}</h3>
        {org ? <div className="mt-[3px] text-[0.71875rem] text-mute">{org}</div> : null}
        {desc ? (
          <p className="mt-[7px] text-[0.8125rem] font-normal leading-[1.6] text-charcoal">{desc}</p>
        ) : null}
        {points.length > 0 ? (
          <ul className="mt-2 flex flex-col gap-[3px]">
            {points.map((p) => (
              <li
                key={p}
                className="grid grid-cols-[10px_1fr] gap-x-2 text-[0.8125rem] font-normal leading-[1.55] text-charcoal"
              >
                <span className="text-mute">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {stack && stack.length > 0 ? (
          <div className="mt-[7px] text-[0.6875rem] leading-[1.5] text-mute">
            {stack.join(' · ')}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PageFooter({ n }: { n: number }) {
  return (
    <div className="mt-auto shrink-0 pt-[22px]">
      <div className="flex justify-end border-t border-hairline pt-[10px] text-[0.6875rem] text-mute">
        <span>
          PAGE <span className="text-ink">{n}</span> / {TOTAL_PAGES}
        </span>
      </div>
    </div>
  );
}

/* ── 페이지 ──────────────────────────────────────────────── */

export default function ResumePage() {
  return (
    <div className="resume-shell min-h-screen bg-white">
      {/* 상단 컨트롤 바 (인쇄 시 숨김) */}
      <div className="no-print fixed inset-x-0 top-0 z-10 flex items-center justify-between border-b border-hairline bg-white/92 px-5 py-3 backdrop-blur-[8px]">
        <Link href="/" className="text-[0.78125rem] text-mute transition-colors hover:text-ink">
          ← 포트폴리오
        </Link>
        <div className="text-[0.75rem] text-mute">입사지원서</div>
        <PrintButton />
      </div>

      {/* ───────── PAGE 1 ───────── */}
      <section className="resume-page flex w-[210mm] h-[297mm] overflow-hidden flex-col bg-white px-[17mm] py-[15mm]">
        <header className="flex items-start justify-between border-b-2 border-ink pb-[18px]">
          <div className="flex items-start gap-[18px]">
            <div className="relative h-[40mm] w-[30mm] shrink-0 overflow-hidden rounded-[3px] border border-hairline bg-white">
              <Image
                src="/profile.png"
                alt="신성오 증명사진"
                fill
                sizes="30mm"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="text-[0.6875rem] tracking-[.1em] text-mute">입사지원서</div>
              <h1 className="mt-[10px] text-[1.75rem] font-semibold leading-[1.15] tracking-[-.01em]">
                신성오 <span className="text-[1.25rem] font-normal text-mute">Shin Seong-oh</span>
              </h1>
              <div className="mt-[6px] text-[0.78125rem] tracking-[.04em] text-ink">
                FRONTEND DEVELOPER
              </div>
            </div>
          </div>
          <div className="pt-[2px] flex flex-col gap-[5px] text-[0.71875rem]">
            {(
              [
                { label: 'PHONE', value: '010-4784-3867', href: 'tel:+821047843867' },
                {
                  label: 'EMAIL',
                  value: 'greenbi0852@gmail.com',
                  href: 'mailto:greenbi0852@gmail.com',
                },
                {
                  label: 'GITHUB',
                  value: 'github.com/seong5',
                  href: 'https://github.com/seong5',
                  external: true,
                },
                { label: 'BIRTH', value: '1995.05.02 (31)', muted: true },
                {
                  label: 'PORTFOLIO',
                  value: 'seong5.github.io',
                  href: 'https://seong5.github.io',
                  external: true,
                  highlight: true,
                },
              ] as const
            ).map(({ label, value, ...rest }) => {
              const href = 'href' in rest ? rest.href : undefined;
              const external = 'external' in rest ? rest.external : false;
              const muted = 'muted' in rest ? rest.muted : false;
              const highlight = 'highlight' in rest ? rest.highlight : false;
              return (
                <div
                  key={label}
                  className={`grid grid-cols-[72px_1fr] items-center gap-x-3 text-right${
                    highlight ? ' mt-[5px]' : ''
                  }`}
                >
                  <span className="text-left uppercase tracking-[.04em] text-mute">{label}</span>
                  {highlight && href ? (
                    <a
                      href={href}
                      className="inline-flex items-center justify-end gap-1.5 rounded-full border border-ink/25 bg-ink/[0.07] px-[9px] py-[3px] font-medium text-ink transition hover:bg-ink/10"
                      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {value}
                      <span aria-hidden>→</span>
                    </a>
                  ) : href ? (
                    <a
                      href={href}
                      className="text-charcoal underline-offset-2 transition hover:text-ink hover:underline"
                      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className={muted ? 'text-mute' : 'text-charcoal'}>{value}</span>
                  )}
                </div>
              );
            })}
          </div>
        </header>

        <div className="mt-[26px]">
          <SectionTitle no="01" en="Strengths" ko="핵심역량" />
          <p className="mb-[18px] text-[0.875rem] font-normal leading-[1.7] text-charcoal">
            탄탄한 기술력뿐만 아니라 협업 시의 소통능력과 책임감 같은 소프트 스킬의 조화가 좋은
            서비스를 만든다고 믿습니다. <br /> 맡은 범위에 한계를 두지 않고 시작한 일을 끝까지
            책임지며 팀과 함께 성과를 만들며 성장하는 것을 지향합니다.
          </p>
          <div className="flex flex-col gap-[15px]">
            {STRENGTHS.map((s) => (
              <div key={s.tag} className="avoid-break grid grid-cols-[56px_1fr] gap-x-4">
                <div className="text-[0.75rem] text-ink">{s.tag}</div>
                <div>
                  <h3 className="text-[0.96875rem] font-semibold tracking-[-.01em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-[5px] text-[0.8125rem] font-normal leading-[1.6] text-charcoal">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[30px]">
          <SectionTitle no="02" en="Skills" ko="기술 스택" />
          <div className="grid grid-cols-2 gap-x-10 gap-y-[14px]">
            {SKILLS.map((s) => (
              <div key={s.label} className="grid grid-cols-[88px_1fr] items-start gap-x-3">
                <div className="pt-[3px] text-[0.6875rem] uppercase tracking-[.06em] text-mute">
                  {s.label}
                </div>
                <div className="flex flex-wrap gap-[6px]">
                  {s.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-hairline bg-white px-[9px] py-[3px] text-[0.75rem] text-ink"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <PageFooter n={1} />
      </section>

      {/* ───────── PAGE 2 ───────── */}
      <section className="resume-page flex w-[210mm] h-[297mm] overflow-hidden flex-col bg-white px-[17mm] py-[15mm]">
        <SectionTitle
          no="03"
          en="Projects"
          ko="프로젝트"
          action={
            <Link
              href={PORTFOLIO_PROJECTS_URL}
              className="portfolio-link inline-flex shrink-0 items-center gap-2 rounded-[5px] border border-ink/15 bg-ink/5 px-4 py-2 text-[0.75rem] text-charcoal"
            >
              포트폴리오에서 자세히 보기
              <span className="text-ink">→</span>
            </Link>
          }
        />
        <div className="flex flex-col gap-[22px]">
          {PROJECTS_PAGE_1.map((p) => (
            <Entry key={p.slug} {...p} />
          ))}
        </div>
        <PageFooter n={2} />
      </section>

      {/* ───────── PAGE 3 ───────── */}
      <section className="resume-page flex w-[210mm] h-[297mm] overflow-hidden flex-col bg-white px-[17mm] py-[15mm]">
        <div className="flex flex-col gap-[22px]">
          {PROJECTS_PAGE_2.map((p) => (
            <Entry key={p.slug} {...p} />
          ))}
        </div>
        <PageFooter n={3} />
      </section>

      {/* ───────── PAGE 4 ───────── */}
      <section className="resume-page flex w-[210mm] h-[297mm] overflow-hidden flex-col bg-white px-[17mm] py-[15mm]">
        <div>
          <SectionTitle no="04" en="Experience" ko="경험" />
          <div className="flex flex-col gap-[18px]">
            {CAREER.map((c) => (
              <Entry key={c.title} {...c} />
            ))}
          </div>
        </div>

        <div className="mt-[30px]">
          <SectionTitle no="05" en="Education" ko="교육 / 학력" />
          <div className="grid">
            {EDUCATION.map((e) => (
              <div
                key={e.title}
                className="avoid-break grid grid-cols-[150px_1fr] items-baseline gap-x-5 border-t border-hairline py-[11px] first:border-t-0"
              >
                <div className="text-[0.71875rem] text-ink">{e.period}</div>
                <div>
                  <span className="text-[0.875rem] font-semibold text-ink">{e.title}</span>
                  {e.desc ? (
                    <p className="mt-[3px] text-[0.8125rem] font-normal leading-[1.55] text-charcoal">
                      {e.desc}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <PageFooter n={4} />
      </section>
    </div>
  );
}

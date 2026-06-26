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

const ABOUT = [
  {
    no: 'A1',
    title: '새로운 시도로 문제를 해결합니다',
    body: '생소한 로직과 기술 스택을 도입할 때도 두려움보다 호기심과 흥미로 빠르게 수용하며, 비즈니스 가치에 따라 우선순위를 정해 업무를 완수합니다.',
  },
  {
    no: 'A2',
    title: '사용자 피드백을 기술적 가치로 전환합니다',
    body: '실사용자 20명 규모의 서비스를 기획부터 배포까지 직접 진행하며, 주기적으로 수집한 피드백을 실제 기능으로 구현해 서비스 완성도를 높입니다.',
  },
  {
    no: 'A3',
    title: '목표를 끝까지 완수해 성과로 증명합니다',
    body: '하프 마라톤 완주, 워킹홀리데이, 학위 등 장기 목표를 달성해온 근성이 복잡한 난제를 끝까지 해결하는 인내심과 책임감으로 이어집니다.',
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
  stack: p.stack,
}));

const PROJECTS_PAGE_1 = PROJECTS.slice(0, 4);
const PROJECTS_PAGE_2 = PROJECTS.slice(4);

const CAREER = [
  {
    period: '2026.03 — 2026.06',
    tag: '3개월',
    title: 'UMUST R&D',
    org: '프론트엔드 인턴 · 사업부 IT팀',
    desc: '도봉라이프 어드민 서비스 구축을 담당하고, 사내 ERP·CRO 서비스의 프론트엔드 구축과 통합까지 진행.',
    points: [],
  },
  {
    period: '2025.12 — 2026.01',
    tag: '1개월',
    title: '똑똑한개발자',
    org: '프론트엔드 인턴 · TF팀',
    desc: 'Deckly(AI 사업제안서 자동화 SaaS) 개발 참여. 응답 데이터·네트워크 요청 최적화, Admin 사용자 트래킹 구현.',
    points: [],
  },
  {
    period: '2023.01 — 2025.01',
    tag: '2년',
    title: 'JFounders',
    org: 'F&B 사업부 · 지점장',
    desc: '프랜차이즈 카페·자사 샐러드 매장 운영 총괄. 인사·재정·마케팅·발주 관리, 근거리 직접 배달로 월 매출 최대 17% 증가, 상황별 매뉴얼 제작으로 운영 자동화.',
    points: [],
  },
  {
    period: '2018.11 — 2019.06',
    tag: '7개월',
    title: '호주 워킹홀리데이',
    org: 'Sydney, AU',
    desc: '시드니 체류 중 다양한 환경에서 근무하며 외국어 소통 능력과 여러 국가의 문화를 경험. 장기 목표를 계획하고 달성.',
    points: [],
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
    desc: '',
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
    <div className="mb-[18px] flex items-end justify-between gap-3 border-b border-line pb-[10px]">
      <div className="flex min-w-0 items-baseline gap-3">
        <span className="font-mono text-[0.875rem] text-accent">{no}</span>
        <h2 className="font-mono text-[0.875rem] font-medium uppercase tracking-[.14em] text-ink">
          {en}
        </h2>
        <span className="text-[0.8125rem] text-muted">{ko}</span>
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
  desc: string;
  points?: string[];
  stack?: string[];
}) {
  return (
    <div className="avoid-break grid grid-cols-[112px_1fr] gap-x-5">
      <div>
        <div className="whitespace-nowrap font-mono text-[0.71875rem] leading-[1.5] text-accent">
          {period}
        </div>
        {tag ? <div className="mt-1 font-mono text-[0.6875rem] text-muted">{tag}</div> : null}
      </div>
      <div>
        <h3 className="text-[0.96875rem] font-semibold tracking-[-.01em] text-ink">{title}</h3>
        {org ? <div className="mt-[3px] font-mono text-[0.71875rem] text-muted">{org}</div> : null}
        <p className="mt-[7px] text-[0.8125rem] font-normal leading-[1.6] text-ink2">{desc}</p>
        {points.length > 0 ? (
          <ul className="mt-2 flex flex-col gap-[3px]">
            {points.map((p) => (
              <li
                key={p}
                className="grid grid-cols-[10px_1fr] gap-x-2 text-[0.8125rem] font-normal leading-[1.55] text-ink2"
              >
                <span className="text-muted">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {stack && stack.length > 0 ? (
          <div className="mt-[9px] flex flex-wrap gap-[5px]">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-[4px] border border-line bg-bg px-[8px] py-[2px] text-[0.6875rem] text-ink"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PageFooter({ n }: { n: number }) {
  return (
    <div className="mt-auto shrink-0 pt-[22px]">
      <div className="flex justify-end border-t border-line pt-[10px] font-mono text-[0.6875rem] text-muted">
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
    <div className="resume-shell min-h-screen">
      {/* 상단 컨트롤 바 (인쇄 시 숨김) */}
      <div className="no-print fixed inset-x-0 top-0 z-10 flex items-center justify-between border-b border-line bg-[rgba(250,250,249,0.92)] px-5 py-3 backdrop-blur-[8px]">
        <Link
          href="/"
          className="font-mono text-[0.78125rem] text-muted transition-colors hover:text-ink"
        >
          ← 포트폴리오
        </Link>
        <div className="font-mono text-[0.75rem] text-muted">입사지원서</div>
        <PrintButton />
      </div>

      {/* ───────── PAGE 1 ───────── */}
      <section className="resume-page flex w-[210mm] min-h-[297mm] flex-col bg-panel px-[17mm] py-[15mm]">
        <header className="flex items-start justify-between border-b-2 border-ink pb-[18px]">
          <div className="flex items-start gap-[18px]">
            <div className="relative h-[40mm] w-[30mm] shrink-0 overflow-hidden rounded-[3px] border border-line2 bg-bg">
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
              <div className="font-mono text-[0.6875rem] tracking-[.1em] text-muted">
                입사지원서
              </div>
              <h1 className="mt-[10px] text-[1.75rem] font-semibold leading-[1.15] tracking-[-.01em]">
                신성오 <span className="text-[1.25rem] font-normal text-muted">Shin Seong-oh</span>
              </h1>
              <div className="mt-[6px] font-mono text-[0.78125rem] tracking-[.04em] text-accent">
                FRONTEND DEVELOPER
              </div>
            </div>
          </div>
          <div className="pt-[2px] flex flex-col gap-[5px] font-mono text-[0.71875rem]">
            {(
              [
                ['PHONE', '010-4784-3867'],
                ['EMAIL', 'greenbi0852@gmail.com'],
                ['GITHUB', 'github.com/seong5'],
                ['BIRTH', '1995.05.02 (31)', true],
              ] as const
            ).map(([label, value, muted]) => (
              <div key={label} className="grid grid-cols-[56px_1fr] gap-x-3 text-right">
                <span className="text-left uppercase tracking-[.04em] text-muted">{label}</span>
                <span className={muted ? 'text-muted' : 'text-ink2'}>{value}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-[26px]">
          <SectionTitle no="01" en="About" ko="핵심역량" />
          <p className="mb-[18px] text-[0.875rem] font-normal leading-[1.7] text-ink2">
            사용자 경험 개선의 우선순위를 읽어내고, 끊임없는 도전으로 서비스의 성장을 증명하는
            프론트엔드 개발자입니다.
          </p>
          <div className="flex flex-col gap-[15px]">
            {ABOUT.map((a) => (
              <div key={a.no} className="avoid-break grid grid-cols-[40px_1fr] gap-x-4">
                <div className="font-mono text-[0.75rem] text-accent">{a.no}</div>
                <div>
                  <h3 className="text-[0.96875rem] font-semibold tracking-[-.01em] text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-[5px] text-[0.8125rem] font-normal leading-[1.6] text-ink2">
                    {a.body}
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
                <div className="pt-[3px] font-mono text-[0.6875rem] uppercase tracking-[.06em] text-muted">
                  {s.label}
                </div>
                <div className="flex flex-wrap gap-[6px]">
                  {s.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-[4px] border border-line bg-bg px-[9px] py-[3px] text-[0.75rem] text-ink"
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
      <section className="resume-page flex w-[210mm] min-h-[297mm] flex-col bg-panel px-[17mm] py-[15mm]">
        <SectionTitle
          no="03"
          en="Projects"
          ko="프로젝트"
          action={
            <Link
              href={PORTFOLIO_PROJECTS_URL}
              className="portfolio-link inline-flex shrink-0 items-center gap-2 rounded-[5px] border border-accent/15 bg-accent/5 px-4 py-2 font-mono text-[0.75rem] text-ink2"
            >
              포트폴리오에서 자세히 보기
              <span className="text-accent">→</span>
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
      <section className="resume-page flex w-[210mm] min-h-[297mm] flex-col bg-panel px-[17mm] py-[15mm]">
        <div className="flex flex-col gap-[22px]">
          {PROJECTS_PAGE_2.map((p) => (
            <Entry key={p.slug} {...p} />
          ))}
        </div>
        <PageFooter n={3} />
      </section>

      {/* ───────── PAGE 4 ───────── */}
      <section className="resume-page flex w-[210mm] min-h-[297mm] flex-col bg-panel px-[17mm] py-[15mm]">
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
                className="avoid-break grid grid-cols-[150px_1fr] items-baseline gap-x-5 border-t border-line py-[11px] first:border-t-0"
              >
                <div className="font-mono text-[0.71875rem] text-accent">{e.period}</div>
                <div>
                  <span className="text-[0.875rem] font-semibold text-ink">{e.title}</span>
                  {e.desc ? (
                    <p className="mt-[3px] text-[0.8125rem] font-normal leading-[1.55] text-ink2">
                      {e.desc}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[40px] avoid-break text-right">
          <p className="text-[0.84375rem] font-normal text-ink2">
            위 기재 사항은 사실과 다름이 없음을 확인합니다.
          </p>
          <p className="mt-[14px] font-mono text-[0.8125rem] text-muted">2026. 06. 26.</p>
          <p className="mt-[6px] text-[1rem] font-semibold text-ink">
            신성오 <span className="font-mono text-[0.75rem] font-normal text-muted">(印)</span>
          </p>
        </div>

        <PageFooter n={4} />
      </section>
    </div>
  );
}

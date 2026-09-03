/* ──────────────────────────────────────────────────────────
   Journey(홈 연대기) 전용 경력 데이터.

   원본은 app/resume/page.tsx의 CAREER·EDUCATION이지만 그쪽은 export되지
   않는 모듈 로컬 상수이고 resume은 동결 라우트라, 바 표시에 필요한 만큼만
   여기에 복제했다. 경력이 바뀌면 두 곳을 함께 고쳐야 한다.

   문구는 전부 resume·projects의 기존 값에서 가져온다 — 여기서 새로 지어내지 않는다.
   ────────────────────────────────────────────────────────── */

export type JourneyKind = 'education' | 'work' | 'project';

export type JourneyNode = {
  id: string;
  period: string;
  org: string;
  role: string;
  kind: JourneyKind;
  /** 이 시기에 나온 프로젝트. projects.ts의 slug와 일치해야 한다 */
  projectSlugs?: string[];
};

/**
 * 개발 전환 이전 6년. 바 좌측에 한 구간으로 압축한다.
 * 실제 기간은 길지만 노드로 펼치면 개발 경력 5건이 오른쪽 끝에 몰린다.
 */
export type JourneyPrologueItem = {
  /** 현재 화면에 렌더되지 않는다. 아는 값만 남겨 나중에 기간을 노출할 때 쓴다. */
  period?: string;
  org: string;
  role: string;
};

export const JOURNEY_PROLOGUE: {
  span: string;
  label: string;
  items: JourneyPrologueItem[];
} = {
  span: '2018.11 — 2025.01',
  label: '서비스업 · 해외 경험',
  items: [
    // 기간 미확인 — 확인되면 period를 채우고, 2018.11 이전이면 위 span도 앞당길 것
    { org: '전통과자 생산 · 와플 판촉행사', role: 'F&B 현장직' },
    { period: '2023.01 — 2025.01', org: 'JFounders', role: 'F&B 사업부 · 지점장' },
    { period: '2018.11 — 2019.06', org: '호주 워킹홀리데이', role: 'Sydney, AU' },
  ],
};

export const JOURNEY: JourneyNode[] = [
  {
    id: 'codeit',
    period: '2025.02 — 2025.08',
    org: '코드잇 스프린트',
    role: '프론트엔드 15기',
    kind: 'education',
    projectSlugs: ['whyne', 'globalnomad'],
  },
  {
    id: 'sub-fc',
    period: '2025.08 — 현재',
    org: 'SUB-FC',
    role: '개인 프로젝트 · 풀사이클',
    kind: 'project',
    projectSlugs: ['sub-fc'],
  },
  {
    id: 'ddd',
    period: '2025.12 — 2026.01',
    org: '똑똑한개발자',
    role: '프론트엔드 인턴 · TF팀',
    kind: 'work',
    projectSlugs: ['deckly'],
  },
  {
    id: 'umust',
    period: '2026.03 — 2026.06',
    org: 'UMUST R&D',
    role: '프론트엔드 인턴 · 사업부 IT팀',
    kind: 'work',
    projectSlugs: ['dobong-admin', 'umust-erp'],
  },
  {
    id: 'claude-log',
    period: '2026.04 — 현재',
    org: 'Claude Log',
    role: '개인 프로젝트 · 1인 개발',
    kind: 'project',
    projectSlugs: ['claude-log'],
  },
  {
    id: 'dajeonghae',
    period: '2026.08 — 현재',
    org: '다정해',
    role: '개인 프로젝트 · 1인 개발',
    kind: 'project',
    projectSlugs: ['dajeonghae'],
  },
];

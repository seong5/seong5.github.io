/* ──────────────────────────────────────────────────────────
   Journey(홈 연대기) 전용 경력 데이터.

   원본은 app/resume/page.tsx의 CAREER·EDUCATION이지만 그쪽은 export되지
   않는 모듈 로컬 상수이고 resume은 동결 라우트라, 바 표시에 필요한 만큼만
   여기에 복제했다. 경력이 바뀌면 두 곳을 함께 고쳐야 한다.

   문구는 전부 resume·projects의 기존 값에서 가져온다 — 여기서 새로 지어내지 않는다.
   ────────────────────────────────────────────────────────── */

/**
 * 섹션 소개 — 기간·소속 나열만으로는 전환의 흐름이 읽히지 않아 한 문단을 둔다.
 * 위 "새로 지어내지 않는다" 규칙의 예외 — 본인이 직접 고른 문구다(2026-09-14).
 * 흐름: 현장 6년 → 교육·인턴 두 번에서 쌓은 경험 → 새로운 기술로 확장.
 * "새로운 기술"의 근거는 진행 중 노드의 스택이다 — Claude Log(Electron)·다정해(Expo)가
 * 웹 밖으로 넓어진 사례. 프로젝트 스택이 바뀌면 이 문장이 여전히 참인지 확인할 것.
 * 문장 단위 배열 — 넓은 화면에서 문장마다 줄을 끊어 구절 중간 줄바꿈을 막는다.
 */
export const JOURNEY_INTRO = [
  '서비스업 현장에서 6년을 보내고 2025년 개발자로 직무를 전환했습니다.',
  '프론트엔드 교육 수료와 두 번의 인턴 경험을 바탕으로, 지금은 새로운 기술까지 영역을 넓혀가고 있습니다.',
];

export type JourneyKind = 'education' | 'work' | 'project';

/**
 * 노드 유형 라벨 — 제목 위 outline 뱃지로 렌더된다.
 * resume의 기존 표현(`인턴`, `개인 · Current`)을 따른다.
 */
export const JOURNEY_KIND_LABEL: Record<JourneyKind, string> = {
  education: '부트캠프',
  work: '인턴',
  project: '개인',
};

export type JourneyNode = {
  id: string;
  period: string;
  org: string;
  /**
   * 한 항목이 한 줄 — 노드 폭이 160px 남짓이라 문장으로 이으면 줄이 제멋대로 접힌다. 항목당 12자 안팎.
   * 유형(kind) 라벨과 겹치는 말은 빼고 쓴다 — 뱃지 바로 아래에서 같은 말이 두 번 나온다.
   */
  role: string[];
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
    { period: '2018.11 — 2019.06', org: '호주 워킹홀리데이', role: 'Sydney, AU' },
    { period: '2023.01 — 2025.01', org: 'JFounders', role: 'F&B 사업부 · 지점장' },
  ],
};

export const JOURNEY: JourneyNode[] = [
  {
    id: 'codeit',
    period: '2025.02 — 2025.08',
    org: '코드잇 스프린트',
    role: ['프론트엔드 15기', '기술 스택 학습', '팀 프로젝트 진행'],
    kind: 'education',
    projectSlugs: ['whyne', 'globalnomad'],
  },
  {
    id: 'sub-fc',
    period: '2025.08 — 현재',
    org: 'SUB-FC',
    role: ['팀 매니지먼트 서비스', '기획·개발·배포', '실사용자 20명 확보'],
    kind: 'project',
    projectSlugs: ['sub-fc'],
  },
  {
    id: 'ddd',
    period: '2025.12 — 2026.01',
    org: '똑똑한개발자',
    role: ['프론트엔드 · TF팀', '사업제안서 생성 자동화', '디자인 시스템 구축'],
    kind: 'work',
    projectSlugs: ['deckly'],
  },
  {
    id: 'umust',
    period: '2026.03 — 2026.06',
    org: 'UMUST R&D',
    role: ['프론트엔드 · IT팀', '어드민 시스템 개발', 'ERP·CRO 서비스 구축'],
    kind: 'work',
    projectSlugs: ['dobong-admin', 'umust-erp'],
  },
  {
    id: 'claude-log',
    period: '2026.04 — 현재',
    org: 'Claude Log',
    // AI 활용 — 설계 대안 비교를 Claude Code로 검증하고 리뷰용 sub-agent를 구성했다(projects.ts claude-log highlights)
    role: ['1인 개발', 'macOS 메뉴바 앱', 'AI 활용 개발'],
    kind: 'project',
    projectSlugs: ['claude-log'],
  },
  {
    id: 'dajeonghae',
    period: '2026.08 — 현재',
    org: '다정해',
    // 심사 — 첫 제출이 지침 2.1로 반려된 뒤 신고·차단을 구현해 통과했다(projects.ts dajeonghae work OPERATION)
    role: ['1인 개발', 'iOS 앱 개발', 'App Store 출시 완료', '심사·배포 과정 경험'],
    kind: 'project',
    projectSlugs: ['dajeonghae'],
  },
];

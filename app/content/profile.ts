/* ──────────────────────────────────────────────────────────
   프로필 단일 출처.
   Hero·SiteNav·Contact에 흩어져 있던 값을 모으는 자리로,
   resume(app/resume/**)는 이 파일을 쓰지 않고 자체 값을 유지한다.
   ────────────────────────────────────────────────────────── */

export type ProfileFact = {
  label: string;
  value: string;
};

export const PROFILE = {
  name: '신성오',
  nameEn: 'Shin Seong-oh',
  role: 'Frontend Developer',
  email: 'greenbi0852@gmail.com',
  github: 'https://github.com/seong5',
  location: 'Seoul, KR',
} as const;

/* Hero 하단 메타 행 — 채용 담당자가 첫 화면에서 확인하는 네 가지.
   프로젝트 상세의 facts 그리드(ROLE/PERIOD/TEAM/CATEGORY)와 같은 언어. */
export const PROFILE_FACTS: ProfileFact[] = [
  { label: 'Status', value: '2026 신입 지원 중' },
  { label: 'Experience', value: '프론트엔드 인턴 2회 · 약 4개월' },
  { label: 'Core', value: 'React · Next.js · TypeScript' },
  { label: 'Location', value: PROFILE.location },
];

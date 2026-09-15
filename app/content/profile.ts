/* ──────────────────────────────────────────────────────────
   프로필 단일 출처.
   Hero·Contact가 참조하는 자리로,
   resume(app/resume/**)는 이 파일을 쓰지 않고 자체 값을 유지한다.
   ────────────────────────────────────────────────────────── */

export const PROFILE = {
  name: '신성오',
  nameEn: 'Shin Seong-oh',
  role: 'Frontend Developer',
  email: 'greenbi0852@gmail.com',
  github: 'https://github.com/seong5',
  location: 'Seoul, KR',
} as const;

import { siGithub } from 'simple-icons';

// 연락 버튼용 아이콘. 옆에 주소 텍스트가 같이 있으니 둘 다 장식이고, 색은 버튼 글자색을 따른다.
// 크기·간격은 Button base([&_svg]:size-4, gap-2.5)가 정한다.

/** 메일 보내기 — Gmail 같은 서비스 로고가 아니라 행위를 뜻하는 봉투 */
export function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

/**
 * 복사 완료 — 강조색으로 채운 원 + 반전색 체크. 이모지(✅)는 OS마다 모양·색이 달라 쓰지 않는다.
 * 원은 currentColor라 호출부가 text-primary-strong을 주면 라이트 녹색·다크 라임을 따른다.
 */
export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="m7.5 12.5 3 3 6-6.5"
        fill="none"
        stroke="var(--primary-foreground)"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 바깥으로 나가는 링크 — 다른 사이트가 새 탭에서 열린다는 약속. 움직임은 호출부가 group-hover로 준다 */
export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d={siGithub.path} />
    </svg>
  );
}

/** 링크 hover 때 화살표만 오른쪽 위로 살짝 — "밖으로 나간다"는 방향을 몸짓으로 한 번 더 */
export const ARROW_NUDGE =
  'transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5';

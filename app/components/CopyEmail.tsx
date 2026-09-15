'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PROFILE } from '../content/profile';
import { CheckIcon, MailIcon } from './icons';
import { cn } from './ui/cn';

type Status = 'idle' | 'copied' | 'failed';

const NOTICE: Record<Exclude<Status, 'idle'>, string> = {
  copied: '복사했습니다',
  failed: '복사하지 못했습니다',
};

/**
 * 누르면 이메일 주소를 복사한다 — mailto를 대신한다.
 * 채용 담당자는 대개 PC에서 웹 메일을 써서 mailto가 아무 일도 하지 않거나 안 쓰는 메일 앱을
 * 띄운다. 링크 전체라 글자를 드래그해 복사할 수도 없어서, 클릭 한 번에 주소를 쥐여 준다.
 * 모양은 자리마다 className으로 주입한다(히어로 버튼 / Contact 행).
 */
export default function CopyEmail({
  className,
  icon = false,
  label,
  valueClassName,
  tooltipAlign = 'center',
}: {
  className?: string;
  icon?: boolean;
  label?: ReactNode;
  valueClassName?: string;
  /** 말풍선 가로 위치 — 버튼(히어로)은 가운데, 폭 전체를 쓰는 행(Contact)은 글자가 시작하는 왼쪽 */
  tooltipAlign?: 'center' | 'start';
}) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setStatus('copied');
    } catch {
      // 권한 거부·비보안 컨텍스트에서는 clipboard API가 거절한다
      setStatus('failed');
    }
    // 알림이 주소를 가리므로 읽힐 만큼만 띄우고 곧바로 주소를 돌려준다
    timer.current = setTimeout(() => setStatus('idle'), 1500);
  }

  const notice = status === 'idle' ? null : NOTICE[status];

  return (
    <button type="button" onClick={copy} className={cn('group relative', className)}>
      {/* 누르면 복사된다는 게 겉으로 안 보여서 hover·키보드 포커스 때 말풍선으로 알린다.
          브라우저 title 툴팁은 1초 가까이 기다려야 뜨고 모양도 사이트와 따로 논다.
          주소를 가리지 않도록 버튼 위에 띄우고, 복사 알림이 떠 있는 동안은 숨긴다.
          버튼 안의 글자라 스크린리더에는 버튼 이름 뒤에 함께 읽힌다. */}
      <span
        className={cn(
          'pointer-events-none absolute bottom-full mb-2.5 rounded-md bg-foreground px-2.5 py-1 font-sans text-meta font-semibold whitespace-nowrap text-background opacity-0 transition-opacity duration-150',
          // 꼬리 — 말풍선 아래 가운데(또는 왼쪽)에 붙는 작은 마름모
          'after:absolute after:top-full after:-mt-1 after:size-2 after:rotate-45 after:bg-foreground',
          tooltipAlign === 'center'
            ? 'left-1/2 -translate-x-1/2 after:left-1/2 after:-translate-x-1/2'
            : 'left-1 after:left-4',
          !notice && 'group-hover:opacity-100 group-focus-visible:opacity-100',
        )}
      >
        클릭하여 복사!
      </span>
      {icon ? status === 'copied' ? <CheckIcon className="text-primary-strong" /> : <MailIcon /> : null}
      {label}
      {/* 알림 문구를 주소와 같은 칸에 겹친다 — 주소는 invisible로 자리만 지켜서
          문구가 바뀌어도 버튼 폭과 줄바꿈이 흔들리지 않는다 */}
      <span className="inline-grid">
        <span className={cn('[grid-area:1/1]', valueClassName, notice && 'invisible')}>
          {PROFILE.email}
        </span>
        {notice ? (
          <span aria-hidden className={cn('[grid-area:1/1]', valueClassName)}>
            {notice}
          </span>
        ) : null}
      </span>
      <span aria-live="polite" className="sr-only">
        {notice ? `이메일 주소를 ${notice}` : ''}
      </span>
    </button>
  );
}

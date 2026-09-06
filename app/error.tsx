'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from './components/ui/button';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-8 text-center">
      <span className="font-display text-[clamp(3rem,10vw,6rem)] leading-none text-primary">!</span>
      <div className="flex flex-col gap-2">
        <h1 className="text-title font-bold text-foreground">문제가 발생했습니다</h1>
        <p className="text-body text-muted-foreground">
          페이지를 표시하는 중 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button size="track" onClick={() => unstable_retry()}>
          다시 시도
        </Button>
        <Button asChild variant="outline" size="track">
          <Link href="/">메인으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}

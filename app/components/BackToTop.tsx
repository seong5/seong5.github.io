'use client';

import { useEffect, useState } from 'react';

import { Button } from './ui/button';

/**
 * 맨 위로 — 상세 페이지 전용 플로팅 버튼.
 *
 * 히어로(#top)가 화면에서 사라진 뒤에만 나타난다. 스크롤 위치를 px로 재는 대신
 * IntersectionObserver로 히어로를 관찰하는 건 이 저장소의 지배적 패턴이고
 * (Reveal·ProjectToc·SiteNav), 매 스크롤 이벤트마다 계산하지 않아도 된다.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      // behavior를 넘기지 않는 게 중요하다 — 기본값 'auto'는 CSS scroll-behavior를
      // 따르므로 globals.css의 smooth와 prefers-reduced-motion 해제가 그대로 적용된다.
      // 앵커(<a href="#top">)가 아니라 버튼인 이유는 URL에 해시를 남기지 않기 위해서다.
      // 이 페이지는 지표 뱃지 딥링크(#insight-1 · #trouble-3)가 해시를 쓰고 있다.
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="맨 위로 이동"
      title="맨 위로"
      // 반투명(bg-fade)은 바탕과 같은 색이라 본문 여백 위에서 사라졌다. 불투명 면 +
      // 리프트 그림자로 띄운다. 다만 그림자는 라이트에서만 먹는다 — 다크의
      // --color-shadow는 rgba(0,0,0,0.8)이고 바탕이 #0C0F12라 검정 위 검정이다.
      // 그래서 테두리를 border(다크 1.38:1)가 아니라 muted(5.5:1 / 7.0:1)로 올려
      // 두 테마 모두에서 형태가 서게 한다.
      className="fade-in fixed right-6 bottom-6 z-70 size-11 border-muted-foreground bg-card font-mono text-body shadow-[0_6px_20px_-4px_var(--color-shadow)] hover:border-primary-strong"
    >
      <span aria-hidden>↑</span>
    </Button>
  );
}

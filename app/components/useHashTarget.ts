'use client';

import { useEffect } from 'react';

/**
 * 같은 해시를 다시 눌렀을 때 쓰는 신호.
 * hashchange는 해시가 실제로 "바뀔" 때만 뜨므로, 이미 가리키고 있는 카드의 뱃지를
 * 또 누르면 아무 일도 일어나지 않는다. 그 경우만 뱃지가 이 이벤트를 직접 쏜다.
 */
export const CARD_TARGET_EVENT = 'track:card-target';

/**
 * URL 해시가 anchors 중 하나를 가리키면 onTarget(해당 anchor)를 부르고
 * 그 요소를 뷰포트로 끌어온다. 지표 뱃지 → 개별 인사이트/트러블 카드 딥링크용.
 *
 * anchors를 배열로 받는 이유 — Radix Accordion은 열림 상태를 루트가 모아 들기
 * 때문에 항목마다 훅을 부를 수 없다. TroubleCard는 원소 하나짜리 배열을 넘긴다.
 *
 * onTarget은 리렌더마다 새로 만들어지면 구독이 매번 다시 걸리므로 useCallback으로
 * 고정해서 넘긴다.
 */
export function useHashTarget(anchors: string[], onTarget: (anchor: string) => void) {
  // 배열은 렌더마다 새 참조라 의존성에 그대로 쓰면 매번 재구독한다
  const key = anchors.join(',');

  useEffect(() => {
    const list = key ? key.split(',') : [];

    const apply = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || !list.includes(hash)) return;
      onTarget(hash);
      // 카드가 펼쳐지고 Reveal의 translateY가 정착한 다음에 위치를 한 번 보정한다.
      // behavior를 넘기지 않는 게 중요하다 — 기본값 'auto'는 CSS scroll-behavior를
      // 따르므로 globals.css의 smooth와 prefers-reduced-motion 해제가 그대로 적용된다.
      // 'smooth'를 명시하면 CSS를 덮어써 "동작 줄이기" 설정이 무시된다.
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ block: 'start' });
      });
    };

    // 외부에서 /projects/claude-log/#insight-1 로 바로 들어온 경우.
    // 브라우저 기본 점프는 하이드레이션 전, 카드가 닫힌 상태에서 일어나 위치가 어긋난다.
    // 마운트 중 동기 setState로 렌더를 한 번 더 유발하지 않도록 다음 프레임에 처리한다.
    const raf = requestAnimationFrame(apply);
    window.addEventListener('hashchange', apply);
    window.addEventListener(CARD_TARGET_EVENT, apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange', apply);
      window.removeEventListener(CARD_TARGET_EVENT, apply);
    };
  }, [key, onTarget]);
}

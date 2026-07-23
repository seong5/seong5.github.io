'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

function useInView<T extends HTMLElement>(amount: number, rootMargin?: string) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: amount, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, rootMargin]);

  return { ref, inView };
}

export function RevealGroup({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div id={id} ref={ref} className={className} data-revealed={inView || undefined}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let index = 0;
    let sibling = el.previousElementSibling;
    while (sibling) {
      index += 1;
      sibling = sibling.previousElementSibling;
    }
    el.style.transitionDelay = `${index * 120}ms`;
  }, []);

  return (
    <div ref={ref} data-reveal-item className={className}>
      {children}
    </div>
  );
}

/**
 * 자기 자신을 감지해 개별적으로 등장하는 리빌 카드.
 * 뷰포트보다 긴 카드에서도 도달 즉시 반응하도록 비율(threshold)이 아닌
 * 위치(rootMargin) 기반으로 감지한다.
 */
export function RevealSelf({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0, '0px 0px -10% 0px');

  return (
    <div ref={ref} data-reveal-self data-revealed={inView || undefined} className={className}>
      {children}
    </div>
  );
}

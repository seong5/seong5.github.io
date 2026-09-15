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

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
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
    // 시안 값 — 40ms 간격, 200ms 상한. 항목이 많아도 마지막이 늦게 오지 않는다
    el.style.transitionDelay = `${Math.min(index * 40, 200)}ms`;
  }, []);

  return (
    <div ref={ref} data-reveal-item className={className}>
      {children}
    </div>
  );
}

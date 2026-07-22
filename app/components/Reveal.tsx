'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

function useInView<T extends HTMLElement>(amount: number) {
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
      { threshold: amount },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

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

'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function WaveText({
  text,
  className,
  delayOffset = 0,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={reduceMotion ? { y: 0 } : { y: [0, -14, 0] }}
            transition={{
              duration: 1.1,
              repeat: reduceMotion ? 0 : Infinity,
              ease: 'easeInOut',
              delay: delayOffset + i * 0.06,
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

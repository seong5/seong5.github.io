import type { CSSProperties } from 'react';

export default function TypewriterText({
  text,
  startDelayMs = 0,
  charDurationMs = 65,
  className,
  caretOnDone = false,
}: {
  text: string;
  startDelayMs?: number;
  charDurationMs?: number;
  className?: string;
  caretOnDone?: boolean;
}) {
  const chars = text.length;
  const typingDurationMs = chars * charDurationMs;

  const animations = [
    `typewriter-reveal ${typingDurationMs}ms steps(${chars}, end) ${startDelayMs}ms both`,
    `typewriter-caret 800ms step-end ${startDelayMs}ms infinite backwards`,
  ];
  if (!caretOnDone) {
    animations.push(
      `typewriter-caret-hide 1ms linear ${startDelayMs + typingDurationMs}ms forwards`,
    );
  }

  return (
    <span className={className}>
      <span
        aria-hidden="true"
        data-typewriter
        className="inline-block overflow-hidden whitespace-nowrap border-r-[0.08em] align-bottom"
        style={
          {
            '--tw-chars': chars,
            animation: animations.join(', '),
          } as CSSProperties
        }
      >
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

'use client';

import { motion, useScroll } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

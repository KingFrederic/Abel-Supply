'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { charReveal } from '@/lib/motion';

interface Props {
  line1: string;
  line2: string;
  className1?: string;
  className2?: string;
}

export default function KineticHeadline({ line1, line2, className1, className2 }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function onComplete() { setReady(true); }

    // If intro already fired (e.g. reduced motion / revisit), show immediately
    if (document.readyState === 'complete' && sessionStorage.getItem('introFired')) {
      setReady(true);
      return;
    }

    window.addEventListener('intro:complete', onComplete, { once: true });
    return () => window.removeEventListener('intro:complete', onComplete);
  }, []);

  useEffect(() => {
    if (ready) sessionStorage.setItem('introFired', '1');
  }, [ready]);

  return (
    <>
      <h1 aria-label={line1} className={className1}>
        {line1.split('').map((char, i) => (
          <span key={i} className="inline-block overflow-hidden leading-[1.05]">
            <motion.span
              className="inline-block"
              custom={i}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              variants={charReveal}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          </span>
        ))}
      </h1>

      <div aria-label={line2} className={className2}>
        {line2.split('').map((char, i) => (
          <span key={i} className="inline-block overflow-hidden leading-[0.95]">
            <motion.span
              className="inline-block"
              custom={line1.length + i}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              variants={charReveal}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          </span>
        ))}
      </div>
    </>
  );
}

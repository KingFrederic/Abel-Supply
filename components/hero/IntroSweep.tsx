'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroSweep() {
  const [phase, setPhase] = useState<'black' | 'sweep' | 'exit' | 'done'>('black');

  useEffect(() => {
    // 400ms black hold
    const t1 = setTimeout(() => setPhase('sweep'), 400);
    // 800ms into sweep → start exit
    const t2 = setTimeout(() => setPhase('exit'), 1200);
    // 400ms exit → done
    const t3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('introFired', '1');
      window.dispatchEvent(new Event('intro:complete'));
    }, 1600);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {/* Black base */}
      <AnimatePresence>
        {phase === 'black' && (
          <motion.div
            key="black"
            className="absolute inset-0 bg-[#080909]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Amber sweep enters from left */}
      <AnimatePresence>
        {(phase === 'sweep' || phase === 'exit') && (
          <motion.div
            key="sweep"
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 40%, #FBBF24 100%)',
              transformOrigin: phase === 'exit' ? 'right center' : 'left center',
            }}
            initial={{ scaleX: 0, transformOrigin: 'left center' }}
            animate={
              phase === 'sweep'
                ? { scaleX: 1, transformOrigin: 'left center' }
                : { scaleX: 0, transformOrigin: 'right center' }
            }
            transition={{
              duration: phase === 'sweep' ? 0.7 : 0.45,
              ease: phase === 'sweep' ? [0.16, 1, 0.3, 1] : [0.4, 0, 1, 1],
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

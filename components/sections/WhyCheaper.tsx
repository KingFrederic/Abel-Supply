'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

const ICONS = [
  <svg key="chain" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>,
  <svg key="margin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>,
  <svg key="group" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>,
];

export default function WhyCheaper() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-24 sm:py-32 bg-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          <motion.p variants={v} className="text-amber text-sm font-display font-medium tracking-widest uppercase mb-4">
            Transparence
          </motion.p>
          <motion.h2 variants={v} className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-white mb-16">
            {t.why.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.why.points.map((point, i) => (
              <motion.div
                key={i}
                variants={v}
                className="relative p-8 rounded-2xl border border-white/6 bg-bg-elev hover:border-amber/20 transition-colors group"
              >
                <div className="text-amber mb-6 w-14 h-14 rounded-xl bg-amber/10 flex items-center justify-center group-hover:bg-amber/15 transition-colors">
                  {ICONS[i]}
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{point.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

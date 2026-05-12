'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

const ICONS = [
  <svg key="home" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>,
  <svg key="hard" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h.01M7 20v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4h4z" />
    <path d="M7 10V6a1 1 0 011-1h2a1 1 0 011 1v4" />
    <path d="M7 15h10" />
    <path d="M22 20h-4v-4a1 1 0 00-1-1h-2a1 1 0 00-1 1v4h4" />
    <path d="M11 10V6a1 1 0 011-1h2a1 1 0 011 1v4" />
    <path d="M14 20v-4" />
  </svg>,
  <svg key="building" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>,
  <svg key="arch" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>,
];

export default function ForWhom() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-24 sm:py-32 bg-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerParent}
          >
            <motion.p variants={v} className="text-amber text-sm font-display font-medium tracking-widest uppercase mb-4">
              Clientèle
            </motion.p>
            <motion.h2 variants={v} className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-white mb-8">
              {t.forWhom.title}
            </motion.h2>
            <motion.p variants={v} className="text-text-muted leading-relaxed mb-4">
              Que vous construisiez votre premier logement ou que vous gérez plusieurs chantiers simultanément, je m&apos;adapte à votre échelle et à votre calendrier.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerParent}
            className="grid grid-cols-1 gap-4"
          >
            {t.forWhom.items.map((item, i) => (
              <motion.div
                key={i}
                variants={v}
                className="flex items-center gap-5 p-5 rounded-xl border border-white/6 bg-bg-elev hover:border-amber/20 hover:bg-bg-elev/80 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber/10 text-amber flex items-center justify-center flex-shrink-0 group-hover:bg-amber/20 transition-colors">
                  {ICONS[i]}
                </div>
                <span className="text-white font-display font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

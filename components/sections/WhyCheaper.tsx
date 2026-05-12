'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

const ACCENT_COLORS = ['#F59E0B', '#10B981', '#6366F1'];

const ICONS = [
  <svg key="chain" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>,
  <svg key="badge" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>,
  <svg key="group" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>,
];

export default function WhyCheaper() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-28 sm:py-36 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-px bg-gradient-to-r from-transparent via-amber/15 to-transparent" />
        <div className="absolute left-1/4 top-1/2 w-[400px] h-[400px] rounded-full bg-green/4 blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
        >
          <div className="text-center mb-20">
            <motion.span variants={v} className="section-label block mb-5">Transparence</motion.span>
            <motion.h2 variants={v} className="display-xl text-white max-w-2xl mx-auto">
              {t.why.title}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.why.points.map((point, i) => (
              <motion.div
                key={i}
                variants={v}
                className="relative p-8 rounded-2xl bg-bg-card border border-white/5 overflow-hidden group hover:border-white/10 transition-all duration-500"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 20% 20%, ${ACCENT_COLORS[i]}08 0%, transparent 60%)` }}
                />

                {/* Top: number + icon */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-display font-bold text-6xl leading-none pointer-events-none select-none"
                    style={{ color: ACCENT_COLORS[i], opacity: 0.1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300"
                    style={{
                      background: `${ACCENT_COLORS[i]}12`,
                      color: ACCENT_COLORS[i],
                      border: `1px solid ${ACCENT_COLORS[i]}20`,
                    }}
                  >
                    {ICONS[i]}
                  </div>
                </div>

                <h3 className="font-display font-bold text-[1.2rem] text-white mb-3 leading-tight">
                  {point.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-[15px]">
                  {point.body}
                </p>

                {/* Bottom bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_COLORS[i]}50, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

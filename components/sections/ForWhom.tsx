'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

const ICONS = [
  <svg key="home" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  <svg key="hard" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>,
  <svg key="building" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
  </svg>,
  <svg key="arch" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>,
];

const ACCENT = ['#F59E0B', '#10B981', '#6366F1', '#EC4899'];

export default function ForWhom() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-28 sm:py-36 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-[500px] h-[500px] rounded-full bg-amber/4 blur-[100px] -translate-x-1/2" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">

          {/* Left — copy */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
          >
            <motion.span variants={v} className="section-label block mb-5">Clientèle</motion.span>
            <motion.h2 variants={v} className="display-xl text-white mb-8">{t.forWhom.title}</motion.h2>
            <motion.p variants={v} className="text-text-muted leading-[1.85] text-[15px] mb-10">
              Que vous construisiez votre premier logement ou que vous gériez plusieurs chantiers simultanément,
              je m&apos;adapte à votre échelle et à votre calendrier. Mon rôle : vous faire économiser sans jamais
              compromettre la qualité.
            </motion.p>

            {/* CTA mini */}
            <motion.a
              variants={v}
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' }); }}
              className="inline-flex items-center gap-2 text-amber font-display font-semibold text-sm hover:gap-4 transition-all"
            >
              Parler de votre projet
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Right — list */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
            className="space-y-3"
          >
            {t.forWhom.items.map((item, i) => (
              <motion.div
                key={i}
                variants={v}
                className="flex items-center gap-5 p-5 rounded-2xl bg-bg-card border border-white/5 hover:border-white/10 group transition-all duration-400"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{
                    background: `${ACCENT[i]}12`,
                    color: ACCENT[i],
                    border: `1px solid ${ACCENT[i]}20`,
                  }}
                >
                  {ICONS[i]}
                </div>
                <span className="text-white font-display font-medium text-[15px] group-hover:text-white/90 transition-colors">
                  {item}
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT[i] }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

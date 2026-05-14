'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function ForWhom() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-32 sm:py-44 bg-bg-elev relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-start">

          {/* ── Left: copy ── */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
            className="lg:sticky lg:top-24"
          >
            <motion.span
              variants={v}
              className="block mb-5 font-display text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#C9A96E' }}
            >
              Clientèle
            </motion.span>

            <motion.h2 variants={v} className="display-xl text-white mb-8">
              {t.forWhom.title}
            </motion.h2>

            <motion.p variants={v} className="text-[#7A7880] leading-[1.85] text-[15px] mb-6">
              Que vous construisiez votre premier logement ou que vous gériez plusieurs chantiers
              simultanément, je m&apos;adapte à votre échelle et à votre calendrier.
            </motion.p>

            <motion.p variants={v} className="text-[#7A7880] leading-[1.85] text-[15px] mb-12">
              Mon rôle&nbsp;: vous faire économiser sans jamais compromettre la qualité.
            </motion.p>

            {/* Arrow CTA in gold */}
            <motion.a
              variants={v}
              href="#contact"
              onClick={e => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' });
              }}
              className="inline-flex items-center gap-3 font-display font-semibold text-sm transition-all hover:gap-5"
              style={{ color: '#C9A96E' }}
            >
              Demandez votre devis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Right: premium numbered list ── */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
          >
            {t.forWhom.items.map((item, i) => (
              <motion.div
                key={i}
                variants={v}
                className="flex items-center gap-6 py-6 border-b border-white/[0.05] group cursor-default"
              >
                {/* Large editorial number */}
                <span
                  className="font-display font-bold text-5xl leading-none select-none flex-shrink-0 transition-all duration-300 group-hover:opacity-60"
                  style={{ color: '#C9A96E', opacity: 0.2 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Item label */}
                <span className="font-display font-medium text-lg text-white leading-snug group-hover:text-white/90 transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

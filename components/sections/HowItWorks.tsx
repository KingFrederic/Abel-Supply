'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function HowItWorks() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="how" className="py-32 sm:py-44 relative" style={{ background: '#FFFFFF' }}>
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          {/* Header */}
          <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <motion.span variants={v} className="block mb-6 font-display text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#C9A96E' }}>
                Processus
              </motion.span>
              <motion.h2 variants={v} className="display-xl max-w-xl" style={{ color: '#111118', fontStyle: 'italic' }}>
                {t.how.title}
              </motion.h2>
            </div>
            <motion.p variants={v} className="text-base max-w-xs leading-relaxed" style={{ color: '#888' }}>
              Trois étapes simples entre vous et des économies concrètes.
            </motion.p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,0,0,0.06)' }}>
            {t.how.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={v}
                className="group bg-white px-10 py-14"
              >
                {/* Large editorial number */}
                <div
                  className="font-display font-light leading-none mb-10 select-none"
                  style={{
                    fontSize: 'clamp(5rem, 10vw, 8rem)',
                    color: 'rgba(201,169,110,0.18)',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                  }}
                  aria-hidden
                >
                  {step.n}
                </div>

                {/* Gold accent */}
                <div className="w-10 h-px mb-8 transition-all duration-500 group-hover:w-16" style={{ background: '#C9A96E' }} />

                <h3
                  className="font-display font-semibold text-2xl mb-5 leading-tight"
                  style={{ color: '#111118' }}
                >
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[1.85]" style={{ color: '#888' }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
    </section>
  );
}

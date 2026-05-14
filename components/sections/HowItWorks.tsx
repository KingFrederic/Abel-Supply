'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function HowItWorks() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="how" className="py-32 sm:py-44 relative overflow-hidden" style={{ background: '#0C0D10' }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }} />

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
              <motion.div variants={v} className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-[#C9A96E]" />
                <span className="section-label">Processus</span>
              </motion.div>
              <motion.h2 variants={v} className="display-xl text-white max-w-xl">
                {t.how.title}
              </motion.h2>
            </div>
            <motion.p variants={v} className="text-text-muted text-base max-w-xs leading-relaxed">
              Trois étapes simples entre vous et des économies concrètes.
            </motion.p>
          </div>

          {/* Steps — 3 columns, editorial */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {t.how.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={v}
                className="group relative md:px-12 first:md:pl-0 last:md:pr-0 py-12 md:py-0"
                style={{
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '3rem',
                }}
              >
                {/* Step number — large watermark */}
                <div
                  className="font-display font-bold text-[100px] leading-none select-none mb-8 transition-colors duration-700"
                  style={{ color: 'rgba(255,255,255,0.03)' }}
                  aria-hidden
                >
                  {step.n}
                </div>

                {/* Gold accent line — grows on hover */}
                <div
                  className="h-px mb-8 transition-all duration-500 group-hover:opacity-100"
                  style={{
                    width: '3rem',
                    background: 'linear-gradient(90deg, #C9A96E, transparent)',
                    opacity: 0.5,
                  }}
                />

                <h3 className="font-display font-bold text-xl text-white mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-[1.85] text-[15px]">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

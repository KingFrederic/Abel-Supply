'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function WhyCheaper() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-32 sm:py-44 bg-bg relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Full-width gold divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent mb-20" />

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
        >
          {/* Header */}
          <div className="mb-20">
            <motion.span
              variants={v}
              className="block mb-5 font-display text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#C9A96E' }}
            >
              Transparence
            </motion.span>
            <motion.h2 variants={v} className="display-xl text-white max-w-3xl">
              {t.why.title}
            </motion.h2>
          </div>

          {/* Three-column editorial layout */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {t.why.points.map((point, i) => (
              <motion.div
                key={i}
                variants={v}
                className={`relative pr-12 ${i < t.why.points.length - 1 ? 'md:border-r border-white/[0.06]' : ''} ${i > 0 ? 'md:pl-12 md:pr-0 mt-12 md:mt-0' : ''} group`}
              >
                {/* Index number */}
                <div
                  className="font-display font-bold leading-none mb-6 select-none"
                  style={{
                    fontSize: '4.5rem',
                    color: 'rgba(255,255,255,0.04)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Thin separator line above title */}
                <div className="w-8 h-px mb-6" style={{ background: '#C9A96E', opacity: 0.4 }} />

                <h3 className="font-display font-bold text-xl text-white mb-4 leading-tight">
                  {point.title}
                </h3>
                <p className="text-[#7A7880] leading-relaxed text-[15px]">
                  {point.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Full-width bottom statement */}
          <motion.div variants={v} className="mt-24 pt-16 border-t border-white/[0.06] text-center">
            <p
              className="font-display font-medium text-xl sm:text-2xl italic leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Aucun intermédiaire entre vous et le prix d&apos;usine.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

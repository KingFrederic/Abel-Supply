'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function WhyCheaper() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />

      {/* Full-width pullquote banner */}
      <div className="border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-2xl font-light italic leading-[1.1] max-w-5xl"
            style={{ color: '#111118', letterSpacing: '-0.01em' }}
          >
            &ldquo;Aucun intermédiaire entre vous et le prix d&apos;usine.&rdquo;
          </motion.p>
        </div>
      </div>

      {/* Three-column breakdown */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          <div className="flex flex-col sm:flex-row gap-px" style={{ background: 'rgba(0,0,0,0.06)' }}>
            {/* Label column */}
            <motion.div variants={v} className="bg-white sm:w-48 shrink-0 px-8 py-12 flex items-start">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#C9A96E' }}>
                {t.why.title}
              </span>
            </motion.div>

            {/* Points */}
            {t.why.points.map((point, i) => (
              <motion.div
                key={i}
                variants={v}
                className="bg-white flex-1 px-8 py-12 group"
              >
                <div
                  className="font-display font-light leading-none mb-8 select-none"
                  style={{ fontSize: '3.5rem', color: 'rgba(201,169,110,0.2)', letterSpacing: '-0.04em' }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-8 h-px mb-8 group-hover:w-14 transition-all duration-500" style={{ background: '#C9A96E' }} />
                <h3 className="font-display font-semibold text-xl mb-4 leading-tight" style={{ color: '#111118' }}>
                  {point.title}
                </h3>
                <p className="text-[15px] leading-[1.85]" style={{ color: '#888' }}>
                  {point.body}
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

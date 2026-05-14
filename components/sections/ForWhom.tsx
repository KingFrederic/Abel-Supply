'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function ForWhom() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden" style={{ background: '#FFFFFF' }}>
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16 xl:gap-32 items-start">

          {/* Left sticky label */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerParent}
            className="lg:sticky lg:top-32"
          >
            <motion.span
              variants={v}
              className="block mb-6 font-display text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{ color: '#C9A96E' }}
            >
              Clientèle
            </motion.span>

            <motion.h2
              variants={v}
              className="display-xl mb-8 leading-[1.0]"
              style={{ color: '#111118', fontStyle: 'italic' }}
            >
              {t.forWhom.title}
            </motion.h2>

            <motion.div variants={v} className="w-12 h-px mb-10" style={{ background: '#C9A96E' }} />

            <motion.p variants={v} className="text-[15px] leading-[1.85] mb-10" style={{ color: '#888' }}>
              Que vous construisiez votre premier logement ou que vous gériez plusieurs chantiers
              simultanément, je m&apos;adapte à votre échelle et à votre calendrier.
            </motion.p>

            <motion.a
              variants={v}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' });
              }}
              className="inline-flex items-center gap-3 font-display font-semibold text-sm transition-all hover:gap-5 group"
              style={{ color: '#111118' }}
            >
              Demandez votre devis
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[#C9A96E]"
                style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#070708]" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </motion.a>
          </motion.div>

          {/* Right: numbered list */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerParent}
          >
            {t.forWhom.items.map((item, i) => (
              <motion.div
                key={i}
                variants={v}
                className="flex items-center gap-8 py-7 border-b group cursor-default"
                style={{ borderColor: 'rgba(0,0,0,0.07)' }}
              >
                {/* Large number */}
                <span
                  className="font-display font-light text-[3.5rem] leading-none select-none flex-shrink-0 transition-all duration-300 group-hover:opacity-40"
                  style={{ color: '#C9A96E', opacity: 0.18, letterSpacing: '-0.04em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Item */}
                <span
                  className="font-display font-medium text-lg leading-snug transition-colors duration-300 group-hover:text-[#111118]"
                  style={{ color: '#444' }}
                >
                  {item}
                </span>

                {/* Arrow on hover */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
    </section>
  );
}

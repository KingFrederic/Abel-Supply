'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function HowItWorks() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="how" className="py-28 sm:py-36 bg-bg-elev relative overflow-hidden">

      {/* Decorative left stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber/20 to-transparent" />

      {/* Ambient blob */}
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-amber/4 blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
            <div>
              <motion.span variants={v} className="section-label block mb-5">Processus</motion.span>
              <motion.h2 variants={v} className="display-xl text-white">
                {t.how.title}
              </motion.h2>
            </div>
            <motion.p variants={v} className="text-text-muted text-base max-w-sm leading-relaxed">
              Aucune démarche compliquée. Trois étapes simples entre vous et des économies réelles.
            </motion.p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {t.how.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={v}
                className="relative group"
              >
                {/* Connector line between cards (desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-amber/30 to-transparent z-10 -translate-x-8" />
                )}

                <div className="relative p-8 rounded-2xl bg-bg-card border border-white/5 hover:border-amber/15 transition-all duration-500 shadow-card hover:shadow-card-hover overflow-hidden h-full">
                  {/* Big step number watermark */}
                  <span className="absolute -top-4 -right-2 font-display font-bold text-[100px] leading-none text-white/[0.03] select-none pointer-events-none">
                    {step.n}
                  </span>

                  {/* Step indicator */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
                      <span className="font-display font-bold text-sm text-amber">{step.n}</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-amber/20 to-transparent" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed text-[15px]">
                    {step.body}
                  </p>

                  {/* Bottom accent on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/0 to-transparent group-hover:via-amber/30 transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function HowItWorks() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="how" className="py-24 sm:py-32 bg-bg-elev relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #F59E0B 0%, transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          <motion.p variants={variants} className="text-amber text-sm font-display font-medium tracking-widest uppercase mb-4">
            Processus
          </motion.p>
          <motion.h2 variants={variants} className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-white mb-16">
            {t.how.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />

            {t.how.steps.map((step, i) => (
              <motion.div key={i} variants={variants} className="relative">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <span className="font-display font-bold text-5xl text-amber/20 leading-none">
                      {step.n}
                    </span>
                  </div>
                  <div className="pt-2">
                    <div className="w-8 h-0.5 bg-amber mb-4" />
                    <h3 className="font-display font-semibold text-xl text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">{step.body}</p>
                  </div>
                </div>
                {i < t.how.steps.length - 1 && (
                  <div className="md:hidden mt-8 ml-8 w-px h-8 bg-gradient-to-b from-amber/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

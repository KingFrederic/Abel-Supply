'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { staggerParent, revealVariants, revealVariantsReduced } from '@/lib/motion';
import TiltCard from './TiltCard';

const ICONS = [
  <svg key="b" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  <svg key="p" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8"/>
  </svg>,
  <svg key="e" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>,
  <svg key="d" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="2" width="18" height="20" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><circle cx="14.5" cy="7" r="1" fill="currentColor"/><circle cx="14.5" cy="17" r="1" fill="currentColor"/>
  </svg>,
];

export default function WhatISupply() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="supply" className="py-28 sm:py-36 bg-bg relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
            <div>
              <motion.span variants={v} className="section-label block mb-5">Catalogue</motion.span>
              <motion.h2 variants={v} className="display-xl text-white">
                {t.supply.title}
              </motion.h2>
            </div>
            <motion.p variants={v} className="text-text-muted text-base max-w-sm leading-relaxed">
              Survolez chaque carte pour découvrir le détail des fournitures disponibles.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.supply.cards.map((card, i) => (
              <TiltCard key={i} title={card.title} items={card.items} icon={ICONS[i]} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

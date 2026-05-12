'use client';

import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { staggerParent, revealVariants } from '@/lib/motion';
import TiltCard from './TiltCard';

const ICONS = [
  // Building materials
  <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="10" width="20" height="12" rx="2" />
    <path d="M12 2l10 8H2l10-8z" />
    <line x1="8" y1="16" x2="8" y2="22" />
    <line x1="16" y1="16" x2="16" y2="22" />
  </svg>,
  // Plumbing
  <svg key="p" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2" />
    <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h2" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Electrical
  <svg key="e" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  // Bathroom & doors
  <svg key="d" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="14.5" cy="7" r="1" />
    <circle cx="14.5" cy="17" r="1" />
  </svg>,
];

export default function WhatISupply() {
  const t = useT();

  return (
    <section id="supply" className="py-24 sm:py-32 bg-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          <motion.p variants={revealVariants} className="text-amber text-sm font-display font-medium tracking-widest uppercase mb-4">
            Catalogue
          </motion.p>
          <motion.h2 variants={revealVariants} className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-white mb-16">
            {t.supply.title}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.supply.cards.map((card, i) => (
              <TiltCard
                key={i}
                title={card.title}
                items={card.items}
                icon={ICONS[i]}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

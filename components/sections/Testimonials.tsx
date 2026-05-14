'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const QUOTES = [
  {
    body: "Abel m'a fait économiser plus de 2 millions sur mon chantier à Cocody. Il a répondu en moins d'une heure et livré dans les délais. Je recommande sans hésiter.",
    name: 'Kouadio M.',
    detail: 'Villa familiale · Cocody, Abidjan',
  },
  {
    body: "En tant qu'entrepreneur, j'ai besoin de prix compétitifs sur chaque commande. Avec Idowu Matériaux, c'est systématiquement 20 à 30% sous le marché. C'est mon fournisseur principal.",
    name: 'Soro B.',
    detail: 'Entrepreneur en bâtiment · Yopougon',
  },
  {
    body: "J'étais sceptique au début, mais le devis était 28% moins cher que ce que j'avais. Même matériel, même qualité. Je l'ai utilisé sur trois chantiers depuis.",
    name: 'Adjoua T.',
    detail: 'Promoteur immobilier · Marcory',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden" style={{ background: '#0A0A0C' }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px" style={{ background: '#C9A96E' }} />
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#C9A96E' }}>
            Témoignages
          </span>
        </div>

        {/* Featured quote */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 lg:gap-24 items-end">

          {/* Quote body */}
          <div>
            {/* Large gold mark */}
            <div
              className="font-display leading-none select-none mb-8"
              style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', color: 'rgba(201,169,110,0.12)', lineHeight: 0.8 }}
              aria-hidden
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? {} : { opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light italic leading-[1.5] mb-10"
                style={{
                  fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                  color: 'rgba(245,244,240,0.85)',
                }}
              >
                {QUOTES[active].body}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                initial={shouldReduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduce ? {} : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-display font-semibold text-white text-base">{QUOTES[active].name}</p>
                <p className="font-display text-sm mt-1" style={{ color: '#666' }}>{QUOTES[active].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex lg:flex-col gap-3 lg:gap-4">
            {QUOTES.map((q, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left transition-all duration-300 group"
              >
                <div
                  className="h-px mb-3 transition-all duration-500"
                  style={{
                    background: i === active ? '#C9A96E' : 'rgba(255,255,255,0.1)',
                    width: i === active ? '48px' : '24px',
                  }}
                />
                <p
                  className="font-display text-sm leading-snug transition-colors duration-300"
                  style={{ color: i === active ? '#F5F4F0' : '#555' }}
                >
                  {q.name}
                </p>
                <p
                  className="font-display text-xs mt-0.5 hidden lg:block"
                  style={{ color: i === active ? '#C9A96E' : '#444' }}
                >
                  {q.detail}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }} />
    </section>
  );
}

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { staggerParent, revealVariants, revealVariantsReduced } from '@/lib/motion';

const QUOTES = [
  {
    body: "Abel m'a fait économiser plus de 2 millions sur mon chantier à Cocody. Il a répondu en moins d'une heure et a tout livré dans les délais. Je recommande sans hésiter.",
    name: 'Kouadio M.',
    detail: 'Villa familiale · Cocody, Abidjan',
  },
  {
    body: "En tant qu'entrepreneur, j'ai besoin de prix compétitifs sur chaque commande. Avec Idowu Matériaux, c'est systématiquement 20 à 30% sous le marché. C'est mon fournisseur principal désormais.",
    name: 'Soro B.',
    detail: 'Entrepreneur en bâtiment · Yopougon',
  },
  {
    body: "J'étais sceptique au début, mais le devis qu'il m'a soumis était 28% moins cher que ce que j'avais. Même matériel, même qualité. Je l'ai utilisé sur trois chantiers depuis.",
    name: 'Adjoua T.',
    detail: 'Promoteur immobilier · Marcory',
  },
];

export default function Testimonials() {
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-32 sm:py-44 relative" style={{ background: '#070708' }}>
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.15), transparent)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          {/* Header */}
          <motion.div variants={v} className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="section-label">Témoignages</span>
          </motion.div>

          <motion.h2 variants={v} className="display-xl text-white mb-20 max-w-lg">
            Ce qu&apos;ils en disent
          </motion.h2>

          {/* Quote grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05]">
            {QUOTES.map((q, i) => (
              <motion.div
                key={i}
                variants={v}
                className="bg-[#070708] p-10 flex flex-col justify-between gap-10 hover:bg-[#0C0D10] transition-colors duration-300"
              >
                {/* Opening mark */}
                <div>
                  <div
                    className="font-display text-[4rem] leading-none mb-6 select-none"
                    style={{ color: 'rgba(201,169,110,0.25)', lineHeight: 1 }}
                  >
                    &ldquo;
                  </div>
                  <p className="text-text-muted text-[15px] leading-[1.85] font-light">
                    {q.body}
                  </p>
                </div>

                {/* Author */}
                <div className="border-t border-white/[0.05] pt-6">
                  <p className="font-display font-semibold text-white text-sm">{q.name}</p>
                  <p className="text-text-dim text-xs mt-1 font-display tracking-wide">{q.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantee line */}
          <motion.p
            variants={v}
            className="mt-16 text-center text-text-dim text-sm italic font-display"
          >
            Témoignages de clients réels · Des photos de chantiers à venir
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

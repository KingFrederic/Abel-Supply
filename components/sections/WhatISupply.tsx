'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

const CDN = 'https://images.unsplash.com';

const PHOTOS = [
  {
    src: `${CDN}/photo-ZFxyH1abdTE?auto=format&fit=crop&w=1200&q=80`,
    fallback: `${CDN}/photo-PlBsJ5MybGc?auto=format&fit=crop&w=1200&q=80`,
    alt: 'Matériaux de bâtisse — ciment, béton, acier',
    span: 'lg:col-span-2 lg:row-span-2',
    height: 'min-h-[420px] lg:min-h-[600px]',
  },
  {
    src: `${CDN}/photo-pxs2yJ6Lb9k?auto=format&fit=crop&w=800&q=80`,
    fallback: `${CDN}/photo-scUBcasSvbE?auto=format&fit=crop&w=800&q=80`,
    alt: 'Plomberie — tuyaux, raccords, citernes',
    span: '',
    height: 'min-h-[280px]',
  },
  {
    src: `${CDN}/photo-DzYT1tfcDq4?auto=format&fit=crop&w=800&q=80`,
    fallback: `${CDN}/photo-bRC0o9MUTh8?auto=format&fit=crop&w=800&q=80`,
    alt: 'Électricité — câbles, disjoncteurs, luminaires',
    span: '',
    height: 'min-h-[280px]',
  },
  {
    src: `${CDN}/photo-vYqFeeM2XPk?auto=format&fit=crop&w=1200&q=80`,
    fallback: `${CDN}/photo-GqlosWVi5zo?auto=format&fit=crop&w=1200&q=80`,
    alt: 'Salles de bain et portes — sanitaires, finitions',
    span: 'sm:col-span-2 lg:col-span-2',
    height: 'min-h-[280px]',
  },
];

export default function WhatISupply() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="supply" className="py-24 sm:py-32 relative" style={{ background: '#070708' }}>
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <motion.span variants={v} className="block mb-6 font-display text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#C9A96E' }}>
                Catalogue
              </motion.span>
              <motion.h2 variants={v} className="display-xl text-white max-w-xl" style={{ fontStyle: 'italic' }}>
                {t.supply.title}
              </motion.h2>
            </div>
            <motion.p variants={v} className="text-text-muted text-base max-w-xs leading-relaxed">
              Envoyez votre devis — je source tout depuis mon réseau d&apos;importateurs directs.
            </motion.p>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {t.supply.cards.map((card, i) => {
              const ph = PHOTOS[i];
              return (
                <motion.div
                  key={i}
                  variants={v}
                  className={`group relative overflow-hidden ${ph.height} ${ph.span}`}
                  style={{ background: '#111' }}
                >
                  {/* Photo */}
                  <Image
                    src={ph.src}
                    alt={ph.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = ph.fallback; }}
                  />

                  {/* Gradient overlay — always */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(7,7,8,0.92) 0%, rgba(7,7,8,0.4) 45%, rgba(7,7,8,0.1) 100%)' }}
                  />

                  {/* Text — always visible at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-text-dim text-[10px] font-display uppercase tracking-[0.22em] mb-2" style={{ color: '#C9A96E', opacity: 0.7 }}>
                      {['Bâtisse', 'Plomberie', 'Électricité', 'Sanitaires'][i]}
                    </p>
                    <h3 className="font-display font-semibold text-white text-lg leading-tight mb-3">
                      {card.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-24 overflow-hidden">
                      {card.items}
                    </p>
                  </div>

                  {/* Bottom gold line on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: '#C9A96E' }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

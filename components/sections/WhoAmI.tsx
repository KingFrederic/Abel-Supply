'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';
import { proxy, picsum } from '@/lib/img';

const GDRIVE_ID = '1lfNuyHcY_q3hD42eMZxcUe6V_R0KsHxA';
const PHOTO = proxy(`https://drive.google.com/uc?export=view&id=${GDRIVE_ID}`);
const PHOTO_FALLBACK = picsum('supplier-pro', 1200, 1600);

export default function WhoAmI({ locale: _locale }: { locale: string }) {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">

        {/* ── Left: full-bleed photo ── */}
        <div className="relative order-2 lg:order-1 min-h-[50vh] lg:min-h-[90vh]">
          <Image
            src={PHOTO}
            alt="Abel Destinée Idowu — fournisseur de matériaux"
            fill
            unoptimized
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PHOTO_FALLBACK;
            }}
          />
          {/* Dark overlay bottom for bleed into text */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)' }}
          />
          {/* Gold bottom line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }}
          />
        </div>

        {/* ── Right: editorial copy on white ── */}
        <motion.div
          className="order-1 lg:order-2 flex flex-col justify-center px-8 sm:px-16 lg:px-20 xl:px-28 py-24 lg:py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          {/* Section label */}
          <motion.span
            variants={v}
            className="block mb-8 font-display text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#C9A96E' }}
          >
            À propos
          </motion.span>

          {/* Big serif headline */}
          <motion.h2
            variants={v}
            className="display-xl mb-4 leading-[1.0]"
            style={{ color: '#111118', fontStyle: 'italic' }}
          >
            {t.about.title}
          </motion.h2>

          <motion.p
            variants={v}
            className="font-display text-lg font-semibold mb-1"
            style={{ color: '#C9A96E' }}
          >
            {t.about.name}
          </motion.p>

          <motion.p
            variants={v}
            className="flex items-center gap-2 text-sm mb-12"
            style={{ color: '#888' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {t.about.location}
          </motion.p>

          {/* Divider */}
          <motion.div variants={v} className="w-12 h-px mb-12" style={{ background: '#C9A96E' }} />

          <motion.p
            variants={v}
            className="text-[15px] leading-[1.9] mb-12"
            style={{ color: '#444' }}
          >
            {t.about.body}
          </motion.p>

          {/* Pull quote */}
          <motion.blockquote
            variants={v}
            className="relative pl-6 py-2 mb-14"
            style={{ borderLeft: '2px solid #C9A96E' }}
          >
            <p
              className="font-display text-lg font-medium italic leading-relaxed"
              style={{ color: '#111118' }}
            >
              &ldquo;{t.about.guarantee}&rdquo;
            </p>
          </motion.blockquote>

          {/* Stats row */}
          <motion.div
            variants={v}
            className="flex items-stretch gap-0 border-t border-b"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            {[
              ['100+', 'Chantiers'],
              ['30%', 'Économies max.'],
              ['24h', 'Réponse garantie'],
            ].map(([val, lbl], i) => (
              <div
                key={lbl}
                className={`flex-1 flex flex-col items-center py-6 ${i < 2 ? 'border-r' : ''}`}
                style={{ borderColor: 'rgba(0,0,0,0.08)' }}
              >
                <span
                  className="font-display font-bold text-2xl leading-none mb-1"
                  style={{ color: '#C9A96E' }}
                >
                  {val}
                </span>
                <span className="text-xs text-gray-400 font-display text-center">{lbl}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

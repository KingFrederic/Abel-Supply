'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';
import PinnedCaseStudy from './PinnedCaseStudy';
import { proxy, picsum } from '@/lib/img';

const CDN = 'https://images.unsplash.com';

const PROJECTS = [
  {
    src: proxy(`${CDN}/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85`),
    fallback: picsum('villa-cocody', 1400, 1100),
    alt: 'Villa R+1 — Cocody, Abidjan',
    label: 'Villa R+1',
    location: 'Cocody',
    tag: 'Bâtisse complète',
    span: 'lg:col-span-2 lg:row-span-2',
    height: 'min-h-[360px] lg:min-h-[560px]',
  },
  {
    src: proxy(`${CDN}/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80`),
    fallback: picsum('residence-yopougon', 900, 700),
    alt: 'Résidence R+2 — Yopougon',
    label: 'Résidence R+2',
    location: 'Yopougon',
    tag: 'Gros œuvre',
    span: '',
    height: 'min-h-[260px]',
  },
  {
    src: proxy(`${CDN}/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=900&q=80`),
    fallback: picsum('immeuble-marcory', 900, 700),
    alt: 'Immeuble R+3 — Marcory',
    label: 'Immeuble R+3',
    location: 'Marcory',
    tag: 'Multi-lots',
    span: '',
    height: 'min-h-[260px]',
  },
  {
    src: proxy(`${CDN}/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80`),
    fallback: picsum('bathroom-plateau', 900, 700),
    alt: 'Salle de bain premium — Plateau',
    label: 'Salle de bain premium',
    location: 'Plateau',
    tag: 'Finitions haut de gamme',
    span: '',
    height: 'min-h-[260px]',
  },
  {
    src: proxy(`${CDN}/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80`),
    fallback: picsum('chantier-abobo', 900, 700),
    alt: 'Chantier mixte — Abobo',
    label: 'Chantier mixte',
    location: 'Abobo',
    tag: 'Lot complet',
    span: '',
    height: 'min-h-[260px]',
  },
];

export default function RecentProjects() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <>
      <section id="projects" className="py-24 sm:py-32 relative" style={{ background: '#070708' }}>
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
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14">
              <div>
                <motion.span variants={v} className="block mb-6 font-display text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#C9A96E' }}>
                  Portfolio
                </motion.span>
                <motion.h2 variants={v} className="display-xl text-white" style={{ fontStyle: 'italic' }}>
                  {t.projects.title}
                </motion.h2>
              </div>
              <motion.p variants={v} className="text-text-muted text-base max-w-xs leading-relaxed">
                Chantiers livrés dans la région d&apos;Abidjan et au-delà. Photos réelles à venir.
              </motion.p>
            </div>

            {/* Photo mosaic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {PROJECTS.map((proj, i) => (
                <motion.div
                  key={i}
                  variants={v}
                  className={`group relative overflow-hidden ${proj.height} ${proj.span}`}
                  style={{ background: '#111' }}
                >
                  {/* Photo */}
                  <Image
                    src={proj.src}
                    alt={proj.alt}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = proj.fallback; }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(7,7,8,0.88) 0%, rgba(7,7,8,0.2) 60%, transparent 100%)' }}
                  />

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <span
                      className="inline-block text-[9px] font-display font-semibold uppercase tracking-[0.2em] px-2.5 py-1 mb-3"
                      style={{
                        background: 'rgba(201,169,110,0.12)',
                        border: '1px solid rgba(201,169,110,0.25)',
                        color: '#C9A96E',
                      }}
                    >
                      {proj.tag}
                    </span>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-text-dim text-[10px] font-display uppercase tracking-[0.18em] mb-1 flex items-center gap-1.5">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          {proj.location}
                        </p>
                        <h3 className="font-display font-bold text-white text-base leading-tight">{proj.label}</h3>
                      </div>
                      {/* Arrow */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom gold line on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: '#C9A96E' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pinned case study */}
      <PinnedCaseStudy caseStudy={t.projects.caseStudy} />
    </>
  );
}

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';
import PinnedCaseStudy from './PinnedCaseStudy';

const PROJECT_CARDS = [
  {
    label: 'Villa R+1',
    location: 'Cocody',
    desc: 'Fondations · Charpente · Plomberie',
    bg: 'linear-gradient(145deg, #18130A 0%, #2D1E0A 60%, #1A1208 100%)',
    accent: '#C9A96E',
    tag: 'Bâtisse complète',
  },
  {
    label: 'Résidence R+2',
    location: 'Yopougon',
    desc: 'Béton armé · Toiture · Électricité',
    bg: 'linear-gradient(145deg, #0A1412 0%, #0F2520 60%, #081510 100%)',
    accent: '#10B981',
    tag: 'Gros œuvre',
  },
  {
    label: 'Immeuble R+3',
    location: 'Marcory',
    desc: 'Structure · Façades · Sanitaires',
    bg: 'linear-gradient(145deg, #0A0A18 0%, #14142A 60%, #0A0A1A 100%)',
    accent: '#818CF8',
    tag: 'Multi-lots',
  },
  {
    label: 'Villa Duplex',
    location: 'Bingerville',
    desc: 'Matériaux complets · Carrelage',
    bg: 'linear-gradient(145deg, #180A10 0%, #2D1018 60%, #1A0A10 100%)',
    accent: '#F472B6',
    tag: 'Finitions haut de gamme',
  },
  {
    label: 'Salle de bain',
    location: 'Plateau',
    desc: 'Marbre · Robinetterie premium',
    bg: 'linear-gradient(145deg, #181008 0%, #28200F 60%, #181208 100%)',
    accent: '#C9A96E',
    tag: 'Sanitaires',
  },
  {
    label: 'Chantier mixte',
    location: 'Abobo',
    desc: 'Électricité · Plomberie · Bâtisse',
    bg: 'linear-gradient(145deg, #081512 0%, #0D2520 60%, #081512 100%)',
    accent: '#10B981',
    tag: 'Lot complet',
  },
];

export default function RecentProjects() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <>
      <section id="projects" className="py-32 sm:py-44 relative overflow-hidden" style={{ background: '#0C0D10' }}>
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }} />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
              <div>
                <motion.div variants={v} className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#C9A96E]" />
                  <span className="section-label">Portfolio</span>
                </motion.div>
                <motion.h2 variants={v} className="display-xl text-white">{t.projects.title}</motion.h2>
              </div>
              <motion.p variants={v} className="text-text-muted text-base max-w-xs leading-relaxed">
                Chantiers livrés dans la région d&apos;Abidjan et au-delà.
              </motion.p>
            </div>

            {/* Project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {PROJECT_CARDS.map((project, i) => (
                <motion.div
                  key={i}
                  variants={v}
                  className="group relative overflow-hidden"
                  style={{ background: '#0C0D10', minHeight: '280px' }}
                >
                  {/* CSS photography bg */}
                  <div
                    className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: project.bg }}
                  />

                  {/* Simulated architectural texture */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 40px)',
                    }}
                  />

                  {/* Accent glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 80% 20%, ${project.accent}10 0%, transparent 60%)` }}
                  />

                  <div className="relative p-8 flex flex-col h-full" style={{ minHeight: '280px' }}>
                    {/* Tag */}
                    <div className="mb-auto">
                      <span
                        className="inline-block text-[10px] font-display font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                        style={{
                          background: `${project.accent}12`,
                          border: `1px solid ${project.accent}25`,
                          color: project.accent,
                        }}
                      >
                        {project.tag}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="mt-16">
                      <p className="text-text-dim text-[11px] font-display uppercase tracking-[0.18em] mb-2 flex items-center gap-2">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {project.location}
                      </p>
                      <h3 className="font-display font-bold text-xl text-white mb-2">{project.label}</h3>
                      <p className="text-text-muted text-sm">{project.desc}</p>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, ${project.accent}60, transparent)` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p variants={v} className="text-center text-text-dim text-sm mt-10 font-display">
              {t.projects.placeholder} · Photos réelles à venir
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pinned case study */}
      <PinnedCaseStudy caseStudy={t.projects.caseStudy} />
    </>
  );
}

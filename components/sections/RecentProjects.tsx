'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

const PROJECT_CARDS = [
  { label: 'Villa R+1', location: 'Cocody', icon: '🏛️', color: '#F59E0B', desc: 'Fondations · Charpente · Plomberie' },
  { label: 'Résidence', location: 'Yopougon', icon: '🏗️', color: '#10B981', desc: 'Béton armé · Toiture · Électricité' },
  { label: 'Immeuble R+3', location: 'Marcory', icon: '🏢', color: '#6366F1', desc: 'Structure · Façades · Sanitaires' },
  { label: 'Villa Duplex', location: 'Bingerville', icon: '🏠', color: '#EC4899', desc: 'Matériaux complets · Carrelage' },
  { label: 'Salle de bain', location: 'Plateau', icon: '🚿', color: '#F59E0B', desc: 'Marbre · Robinetterie premium' },
  { label: 'Chantier mixte', location: 'Abobo', icon: '⚡', color: '#10B981', desc: 'Électricité · Plomberie · Bâtisse' },
];

export default function RecentProjects() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-28 sm:py-36 bg-bg-elev relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute right-1/4 top-1/3 w-[400px] h-[400px] rounded-full bg-amber/3 blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div>
              <motion.span variants={v} className="section-label block mb-5">Portfolio</motion.span>
              <motion.h2 variants={v} className="display-xl text-white">{t.projects.title}</motion.h2>
            </div>
          </div>

          {/* Case study highlight */}
          <motion.div
            variants={v}
            className="relative mb-10 p-8 lg:p-10 rounded-2xl overflow-hidden border border-amber/15 bg-bg-card"
          >
            {/* BG accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber/6 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-amber/60 via-amber/30 to-transparent" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center">
              <div>
                <span className="section-label">{t.projects.caseStudy.label}</span>
                <h3 className="font-display font-bold text-3xl text-white mt-2 mb-1">{t.projects.caseStudy.title}</h3>
                <p className="text-text-muted text-sm">Abidjan, Côte d&apos;Ivoire</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Devis original', value: t.projects.caseStudy.before.split(':')[1]?.trim() || t.projects.caseStudy.before, muted: true },
                  { label: 'Prix négocié', value: t.projects.caseStudy.after.split(':')[1]?.trim() || t.projects.caseStudy.after, muted: false },
                  { label: 'Économie réalisée', value: t.projects.caseStudy.savings.split(':')[1]?.trim() || t.projects.caseStudy.savings, green: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-xl border ${
                      item.green
                        ? 'bg-green/8 border-green/25'
                        : 'bg-bg border-white/6'
                    }`}
                  >
                    <p className="text-text-muted text-xs mb-2 font-display uppercase tracking-wider">{item.label}</p>
                    <p className={`font-display font-bold text-lg leading-tight ${
                      item.green ? 'text-green' : item.muted ? 'text-text-muted line-through text-base' : 'text-white'
                    }`}>{item.value}</p>
                    {item.green && <span className="text-green text-xs mt-1 block">✓ 23% économisés</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECT_CARDS.map((project, i) => (
              <motion.div
                key={i}
                variants={v}
                className="group relative rounded-2xl bg-bg-card border border-white/5 p-6 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default"
              >
                {/* Hover accent */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 80% 20%, ${project.color}08 0%, transparent 60%)` }}
                />

                {/* Icon + location */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${project.color}12`, border: `1px solid ${project.color}20` }}
                  >
                    {project.icon}
                  </div>
                  <span className="text-text-dim text-xs font-display flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {project.location}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2">{project.label}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{project.desc}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${project.color}60, transparent)` }}
                />
              </motion.div>
            ))}
          </div>

          {/* Coming soon note */}
          <motion.p variants={v} className="text-center text-text-dim text-sm mt-8 font-display">
            {t.projects.placeholder} · Photos réelles à venir
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

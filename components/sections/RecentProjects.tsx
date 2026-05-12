'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

const PROJECT_IMAGES = [
  '/images/projects/project-1.jpg',
  '/images/projects/project-2.jpg',
  '/images/projects/project-3.jpg',
  '/images/projects/project-4.jpg',
  '/images/projects/project-5.jpg',
  '/images/projects/project-6.jpg',
];

export default function RecentProjects() {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section className="py-24 sm:py-32 bg-bg-elev relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
        >
          <motion.p variants={v} className="text-amber text-sm font-display font-medium tracking-widest uppercase mb-4">
            Portfolio
          </motion.p>
          <motion.h2 variants={v} className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-white mb-16">
            {t.projects.title}
          </motion.h2>

          {/* Case study highlight */}
          <motion.div
            variants={v}
            className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-amber/10 to-bg-elev border border-amber/20 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <span className="text-amber text-xs font-display tracking-widest uppercase">{t.projects.caseStudy.label}</span>
              <h3 className="font-display font-bold text-2xl text-white mt-1">{t.projects.caseStudy.title}</h3>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-bg-elev border border-white/6">
                <p className="text-text-muted text-xs mb-1">Avant</p>
                <p className="text-white font-display font-semibold">{t.projects.caseStudy.before}</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-elev border border-white/6">
                <p className="text-text-muted text-xs mb-1">Après</p>
                <p className="text-white font-display font-semibold">{t.projects.caseStudy.after}</p>
              </div>
              <div className="p-4 rounded-xl bg-green/10 border border-green/20">
                <p className="text-green text-xs mb-1 font-medium">💰</p>
                <p className="text-green font-display font-bold">{t.projects.caseStudy.savings}</p>
              </div>
            </div>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PROJECT_IMAGES.map((src, i) => (
              <motion.div
                key={i}
                variants={v}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg border border-white/6 group"
              >
                <Image
                  src={src}
                  alt={`Chantier ${i + 1}`}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBBExBRIhQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amu57lLLYdxL8MFKQhtH3WoAKUfJPkk+a0Oze35mBzWVR58N9hUdKWwFJStSSRuB4JP70UUAP/9k="
                />
                {/* Overlay placeholder text */}
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-text-muted text-xs">{t.projects.placeholder}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <span className="text-white text-xs font-display tracking-wider">Photo {i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

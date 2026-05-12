'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function WhoAmI({ locale }: { locale: string }) {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="about" className="py-24 sm:py-32 bg-bg-elev relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 50%, #F59E0B 0%, transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={v}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/abel-portrait.jpg"
                alt={t.about.name}
                fill
                className="object-cover"
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQMEAgMAAAAAAAAAAAAAAQIDBAUREiExQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amq3k2vE6lDrTEhlUdtXCFJJUVJPYg7j6rUdvdX7dKlSm1B2OCppJKkpBJJI2Ge/frRRQf//Z"
              />
              {/* Amber accent border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-amber/20 pointer-events-none" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 lg:right-0 bg-bg-elev border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
              <div className="text-amber font-display font-bold text-2xl">30%</div>
              <div className="text-text-muted text-xs">d&apos;économies max.</div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerParent}
          >
            <motion.p variants={v} className="text-amber text-sm font-display font-medium tracking-widest uppercase mb-4">
              À propos
            </motion.p>
            <motion.h2 variants={v} className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
              {t.about.title}
            </motion.h2>
            <motion.p variants={v} className="font-display text-xl text-amber mb-1">{t.about.name}</motion.p>
            <motion.p variants={v} className="text-text-muted text-sm mb-8 flex items-center gap-1.5">
              <LocationIcon />
              {t.about.location}
            </motion.p>
            <motion.p variants={v} className="text-text-muted leading-relaxed mb-8 text-base">
              {t.about.body}
            </motion.p>
            <motion.blockquote variants={v} className="border-l-2 border-amber pl-5 text-white font-display italic text-lg">
              &ldquo;{t.about.guarantee}&rdquo;
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

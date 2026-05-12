'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { getWhatsAppLink, CALL_NUMBER } from '@/lib/constants';
import { easeExpoOut } from '@/lib/motion';
import HeroFallback from './HeroFallback';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const STATS = [
  { value: '30%', label: 'Économies max.' },
  { value: '24h', label: 'Réponse garantie' },
  { value: '100+', label: 'Chantiers livrés' },
];

export default function Hero({ locale }: { locale: string }) {
  const t = useT();
  const shouldReduce = useReducedMotion();

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const up = shouldReduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeExpoOut } } };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-bg">

      {/* ── Ambient gradient blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-amber/5 blur-[120px]" />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-amber/4 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-green/4 blur-[100px]" />
      </div>

      {/* ── Vertical rule ── */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 min-h-screen">

        {/* ── LEFT — copy ── */}
        <motion.div
          className="flex flex-col justify-center pt-32 pb-20 lg:pt-0 lg:pr-12"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Label */}
          <motion.div variants={up} className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-amber" />
            <span className="section-label">{t.brand.subtitle}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={up} className="display-hero text-white mb-2 text-balance">
            {t.hero.headline}
          </motion.h1>
          <motion.div variants={up} className="display-hero gradient-text mb-10 leading-[0.95]">
            {t.hero.headlineAccent}
          </motion.div>

          {/* Sub */}
          <motion.p
            variants={up}
            className="text-text-muted text-lg leading-relaxed max-w-[520px] mb-12"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={up} className="flex flex-col sm:flex-row gap-4 mb-16">
            <motion.a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-green text-white font-display font-bold text-base px-8 py-4 rounded-xl overflow-hidden shadow-green"
              whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: easeExpoOut } }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <WhatsAppIcon />
              {t.hero.ctaWhatsapp}
            </motion.a>

            <motion.a
              href={`tel:${CALL_NUMBER}`}
              className="inline-flex items-center justify-center gap-3 glass text-white font-display font-medium text-base px-8 py-4 rounded-xl hover:border-white/15 transition-all"
              whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: easeExpoOut } }}
              whileTap={{ scale: 0.98 }}
            >
              <PhoneIcon />
              {t.hero.ctaCall}
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={up} className="flex items-center gap-8 flex-wrap">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display font-bold text-2xl text-amber leading-none">{s.value}</span>
                <span className="text-text-muted text-xs mt-1 tracking-wide">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT — 3D scene ── */}
        <motion.div
          className="relative h-[55vh] lg:h-full lg:min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Vertical amber accent on right edge */}
          <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-amber/30 to-transparent hidden lg:block" />
          <HeroScene />
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-10 left-16 hidden lg:flex items-center gap-3 text-text-dim text-xs tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          className="block w-px h-10 bg-gradient-to-b from-amber/60 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        Scroll
      </motion.div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.13 6.13l1.27-.83a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

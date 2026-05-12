'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { getWhatsAppLink, CALL_NUMBER } from '@/lib/constants';
import { revealVariants, staggerParent, easeExpoOut } from '@/lib/motion';
import HeroFallback from './HeroFallback';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function Hero({ locale }: { locale: string }) {
  const t = useT();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden bg-bg"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a1505] via-bg to-bg opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber to-transparent opacity-30" />

      {/* Left — copy */}
      <motion.div
        className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-32 pb-16 lg:pt-0 lg:w-[52%]"
        initial="hidden"
        animate="show"
        variants={staggerParent}
      >
        <motion.p
          variants={revealVariants}
          className="text-amber text-sm font-display font-medium tracking-widest uppercase mb-5"
        >
          {t.brand.subtitle}
        </motion.p>

        <motion.h1
          variants={revealVariants}
          className="font-display font-bold text-4xl sm:text-5xl xl:text-6xl leading-tight text-white mb-4"
        >
          {t.hero.headline}
          <br />
          <span className="text-amber">{t.hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          variants={revealVariants}
          className="text-text-muted text-base sm:text-lg leading-relaxed max-w-xl mb-10"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          variants={revealVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href={getWhatsAppLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green text-white font-display font-semibold text-base px-7 py-4 rounded-full shadow-lg hover:shadow-green/30 transition-shadow"
            whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.24, ease: easeExpoOut } }}
            whileTap={{ scale: 0.98 }}
          >
            <WhatsAppIcon />
            {t.hero.ctaWhatsapp}
          </motion.a>

          <motion.a
            href={`tel:${CALL_NUMBER}`}
            className="inline-flex items-center gap-3 border border-white/20 text-white font-display font-medium text-base px-7 py-4 rounded-full hover:border-amber/50 hover:bg-white/5 transition-all"
            whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.24, ease: easeExpoOut } }}
            whileTap={{ scale: 0.98 }}
          >
            <PhoneIcon />
            {t.hero.ctaCall}
          </motion.a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={revealVariants}
          className="flex items-center gap-6 mt-12 text-text-muted text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span>Abidjan, Côte d&apos;Ivoire</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div>Réponse sous 24h</div>
        </motion.div>
      </motion.div>

      {/* Right — 3D scene */}
      <div className="relative w-full lg:w-[48%] h-[50vh] lg:h-screen">
        <HeroScene />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-amber/60 to-transparent"
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.13 6.13l1.27-.83a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

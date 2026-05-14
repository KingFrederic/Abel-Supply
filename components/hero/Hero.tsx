'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { getWhatsAppLink, CALL_NUMBER } from '@/lib/constants';
import { easeExpoOut } from '@/lib/motion';
import { heroScrollProgress } from '@/lib/heroScroll';
import HeroFallback from './HeroFallback';
import IntroSweep from './IntroSweep';
import KineticHeadline from './KineticHeadline';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null });

const STATS = [
  { value: '30%', label: 'Économies garanties' },
  { value: '24h', label: 'Délai de réponse' },
  { value: '100+', label: 'Chantiers livrés' },
];

export default function Hero({ locale }: { locale: string }) {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [canvasVisible, setCanvasVisible] = useState(true);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', v => { heroScrollProgress.current = v; });
  }, [scrollYProgress]);

  useEffect(() => {
    if (shouldReduce) { setReady(true); return; }
    const onComplete = () => setReady(true);
    window.addEventListener('intro:complete', onComplete, { once: true });
    const fallback = setTimeout(() => setReady(true), 2200);
    return () => { window.removeEventListener('intro:complete', onComplete); clearTimeout(fallback); };
  }, [shouldReduce]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCanvasVisible(entry.isIntersecting),
      { rootMargin: '120px 0px 120px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easeExpoOut },
  };

  return (
    <>
      {!shouldReduce && <IntroSweep />}

      <div ref={containerRef} className="relative" style={{ height: '200vh' }}>
        {canvasVisible && <HeroScene reduced={!!shouldReduce} />}

        {/* Sticky overlay — sits above the canvas */}
        <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 1 }}>
          {/* Bottom fade so next section blends in */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070708] to-transparent pointer-events-none z-10" />

          <div className="relative h-full flex items-center z-10">
            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="max-w-[700px]">

                {/* Eyebrow label */}
                <AnimatePresence>
                  {ready && (
                    <motion.div
                      {...fadeUp}
                      transition={{ duration: 0.6, ease: easeExpoOut }}
                      className="flex items-center gap-4 mb-10"
                    >
                      <div className="w-8 h-px bg-[#C9A96E]" />
                      <span className="section-label">{t.brand.subtitle}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Kinetic headline */}
                <KineticHeadline
                  line1={t.hero.headline}
                  line2={t.hero.headlineAccent}
                  className1="display-hero text-white mb-3"
                  className2="display-hero gradient-gold mb-12 leading-[0.93]"
                />

                {/* Sub */}
                <AnimatePresence>
                  {ready && (
                    <motion.p
                      {...fadeUp}
                      transition={{ duration: 0.8, ease: easeExpoOut, delay: 0.2 }}
                      className="text-text-muted text-[1.1rem] leading-[1.8] max-w-[520px] mb-12"
                    >
                      {t.hero.sub}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* CTAs */}
                <AnimatePresence>
                  {ready && (
                    <motion.div
                      {...fadeUp}
                      transition={{ duration: 0.8, ease: easeExpoOut, delay: 0.35 }}
                      className="flex flex-col sm:flex-row gap-4 mb-16"
                    >
                      <a
                        href={getWhatsAppLink(locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-green hover:bg-green-600 text-white font-display font-bold text-base px-8 py-4 rounded-xl shadow-green transition-colors"
                      >
                        <WAIcon />
                        {t.hero.ctaWhatsapp}
                      </a>
                      <a
                        href={`tel:${CALL_NUMBER}`}
                        className="inline-flex items-center justify-center gap-3 border border-white/10 hover:border-[#C9A96E]/35 text-white/80 hover:text-white font-display font-medium text-base px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
                      >
                        <PhoneIcon />
                        {t.hero.ctaCall}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stats */}
                <AnimatePresence>
                  {ready && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, ease: easeExpoOut, delay: 0.55 }}
                      className="flex items-center gap-10 flex-wrap"
                    >
                      {STATS.map((s, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="font-display font-bold text-[2.25rem] leading-none" style={{ color: '#C9A96E' }}>
                            {s.value}
                          </span>
                          <span className="text-text-muted text-xs mt-2 tracking-wide">{s.label}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <AnimatePresence>
            {ready && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-text-dim text-[10px] tracking-[0.3em] uppercase"
              >
                <motion.div
                  className="w-px h-12 origin-top"
                  style={{ background: 'linear-gradient(to bottom, #C9A96E80, transparent)' }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                Scroll
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sentinel triggers canvas unmount */}
        <div ref={sentinelRef} className="absolute bottom-0 h-1 w-full" />
      </div>
    </>
  );
}

function WAIcon() {
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

'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { getWhatsAppLink } from '@/lib/constants';

export default function Header({ locale }: { locale: string }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' });
    setMenuOpen(false);
  };

  const NAV = [
    { key: 'how',     id: 'how' },
    { key: 'supply',  id: 'supply' },
    { key: 'about',   id: 'about' },
    { key: 'contact', id: 'contact' },
  ] as const;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#070708]/85 backdrop-blur-2xl border-b border-white/[0.05]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: shouldReduce ? 'auto' : 'smooth' })}
            className="flex items-center gap-3 group"
            aria-label="IDOWU MATÉRIAUX — Retour en haut"
          >
            {/* Monogram badge */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#C9A96E]/25 bg-[#C9A96E]/8">
              <span className="font-display font-bold text-[11px] text-[#C9A96E] tracking-wider">IM</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-[15px] text-white tracking-tight group-hover:text-white/90 transition-colors">
                IDOWU
              </span>
              <span className="font-display font-light text-[15px] text-white/40 tracking-[0.2em] group-hover:text-white/30 transition-colors hidden sm:inline">
                MATÉRIAUX
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Navigation principale">
            {NAV.map(({ key, id }) => (
              <button
                key={key}
                onClick={() => scrollTo(id)}
                className="px-4 py-2 text-text-muted text-[13px] font-display font-medium tracking-wide hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle locale={locale} />

            {/* Devis CTA */}
            <a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-[13px] font-display font-semibold px-4 py-2.5 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(201,169,110,0.08)',
                border: '1px solid rgba(201,169,110,0.2)',
                color: '#C9A96E',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.35)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.08)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.2)';
              }}
            >
              Demander un devis
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex flex-col gap-[5px] items-center justify-center rounded-lg hover:bg-white/[0.04] transition-colors"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span className={`w-[18px] h-px bg-white/70 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`w-[18px] h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`w-[18px] h-px bg-white/70 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-[68px] left-0 right-0 z-40 bg-[#0C0D10]/96 backdrop-blur-2xl border-b border-white/[0.05] px-6 py-4 md:hidden"
        >
          {NAV.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-text-muted hover:text-white hover:bg-white/[0.04] rounded-xl transition-all font-display text-sm tracking-wide"
            >
              {t.nav[key]}
            </button>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.05]">
            <a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-display font-bold px-5 py-3.5 rounded-xl text-[#070708]"
              style={{ background: '#C9A96E' }}
            >
              Demander un devis
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}

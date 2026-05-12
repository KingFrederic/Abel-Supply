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
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' });
    setMenuOpen(false);
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: shouldReduce ? 'auto' : 'smooth' })}
          className="flex items-center gap-2 group"
          aria-label="Retour en haut"
        >
          <span className="font-display font-bold text-lg text-white tracking-tight">IDOWU</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          <span className="font-display font-light text-lg text-white tracking-widest">MATÉRIAUX</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {(
            [
              ['how', 'how'],
              ['supply', 'supply'],
              ['about', 'about'],
              ['contact', 'contact'],
            ] as const
          ).map(([key, id]) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-text-muted text-sm hover:text-white transition-colors font-display"
            >
              {t.nav[key]}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageToggle locale={locale} />
          <a
            href={getWhatsAppLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-green text-white text-sm font-display font-semibold px-4 py-2 rounded-full hover:bg-green/80 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col gap-1.5 items-center justify-center"
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-px bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg/95 backdrop-blur-md border-b border-white/5 px-6 pb-6 pt-2 space-y-4"
        >
          {(
            [
              ['how', 'how'],
              ['supply', 'supply'],
              ['about', 'about'],
              ['contact', 'contact'],
            ] as const
          ).map(([key, id]) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="block w-full text-left text-text-muted hover:text-white transition-colors font-display py-2 text-base"
            >
              {t.nav[key]}
            </button>
          ))}
          <a
            href={getWhatsAppLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green text-white text-sm font-display font-semibold px-5 py-3 rounded-full"
          >
            WhatsApp
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

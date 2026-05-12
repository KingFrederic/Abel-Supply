'use client';

import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { SOCIAL, getWhatsAppLink, CALL_NUMBER, EMAIL } from '@/lib/constants';

export default function Footer({ locale }: { locale: string }) {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-bg border-t border-white/5 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16 items-start mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="font-display font-bold text-xl text-white">IDOWU</span>
              <span className="w-[5px] h-[5px] rounded-full bg-amber" />
              <span className="font-display font-light text-xl text-white/50 tracking-[0.18em]">MATÉRIAUX</span>
            </div>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="flex gap-2">
              {[
                { href: SOCIAL.instagram, label: 'Instagram', Icon: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href: SOCIAL.facebook, label: 'Facebook', Icon: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { href: SOCIAL.telegram, label: 'Telegram', Icon: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg> },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg bg-bg-card border border-white/6 text-text-muted flex items-center justify-center hover:border-amber/30 hover:text-amber transition-all text-xs">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <p className="text-text-dim text-xs font-display uppercase tracking-wider mb-4">Contact</p>
            {[
              { href: getWhatsAppLink(locale), label: 'WhatsApp' },
              { href: `tel:${CALL_NUMBER}`, label: CALL_NUMBER },
              { href: `mailto:${EMAIL}`, label: EMAIL },
            ].map(({ href, label }) => (
              <a key={label} href={href} className="block text-text-muted text-sm hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </div>

          {/* Locale */}
          <div>
            <p className="text-text-dim text-xs font-display uppercase tracking-wider mb-4">Langue</p>
            <LanguageToggle locale={locale} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-dim text-xs">
            &copy; {year} IDOWU MATÉRIAUX · {t.footer.rights}
          </p>
          <p className="text-text-dim text-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            Abidjan, Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}

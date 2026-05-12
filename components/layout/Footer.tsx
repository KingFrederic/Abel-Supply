'use client';

import { useT } from '@/lib/i18n/provider';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { SOCIAL, getWhatsAppLink, CALL_NUMBER, EMAIL } from '@/lib/constants';

export default function Footer({ locale }: { locale: string }) {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-bold text-lg text-white">IDOWU</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              <span className="font-display font-light text-lg text-white tracking-widest">MATÉRIAUX</span>
            </div>
            <p className="text-text-muted text-sm max-w-xs">{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            <a href={getWhatsAppLink(locale)} target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm hover:text-white transition-colors">WhatsApp</a>
            <a href={`tel:${CALL_NUMBER}`} className="text-text-muted text-sm hover:text-white transition-colors">{CALL_NUMBER}</a>
            <a href={`mailto:${EMAIL}`} className="text-text-muted text-sm hover:text-white transition-colors">{EMAIL}</a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm hover:text-white transition-colors">Instagram</a>
          </div>

          {/* Locale toggle */}
          <LanguageToggle locale={locale} />
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-muted text-xs">
            &copy; {year} IDOWU MATÉRIAUX. {t.footer.rights}
          </p>
          <p className="text-text-muted text-xs">Abidjan, Côte d&apos;Ivoire</p>
        </div>
      </div>
    </footer>
  );
}

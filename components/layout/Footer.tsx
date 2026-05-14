'use client';

import { useT } from '@/lib/i18n/provider';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { SOCIAL, getWhatsAppLink, CALL_NUMBER, EMAIL } from '@/lib/constants';

export default function Footer({ locale }: { locale: string }) {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: '#070708', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Top gold hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)' }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-12">

        {/* Brand statement — large editorial */}
        <div className="mb-20 pb-16 border-b border-white/[0.05]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="section-label mb-6">Fournisseur direct · Abidjan, CI</p>
              <div className="flex items-baseline gap-4">
                <span className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] leading-none text-white tracking-tight">
                  IDOWU
                </span>
                <span className="font-display font-light text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  MATÉRIAUX
                </span>
              </div>
              <p className="text-text-muted text-[15px] mt-5 max-w-sm leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>

            {/* CTA */}
            <a
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-display font-bold text-[#070708] text-sm px-7 py-4 rounded-xl self-start lg:self-auto transition-colors"
              style={{ background: '#C9A96E' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8D5A3'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C9A96E'; }}
            >
              Demander un devis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 mb-16">

          {/* Contact */}
          <div>
            <p className="text-text-dim text-[11px] font-display uppercase tracking-[0.2em] mb-6">Contact</p>
            <div className="space-y-3">
              {[
                { href: getWhatsAppLink(locale), label: 'WhatsApp' },
                { href: `tel:${CALL_NUMBER}`, label: CALL_NUMBER },
                { href: `mailto:${EMAIL}`, label: EMAIL },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="block text-text-muted text-sm hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-text-dim text-[11px] font-display uppercase tracking-[0.2em] mb-6">Réseaux</p>
            <div className="flex gap-2">
              {[
                {
                  href: SOCIAL.instagram, label: 'Instagram',
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                },
                {
                  href: SOCIAL.facebook, label: 'Facebook',
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
                },
                {
                  href: SOCIAL.telegram, label: 'Telegram',
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#C9A96E';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <p className="text-text-dim text-[11px] font-display uppercase tracking-[0.2em] mb-6">Langue</p>
            <LanguageToggle locale={locale} />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-dim text-xs font-display">
            &copy; {year} IDOWU MATÉRIAUX · {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-text-dim text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span>Abidjan, Côte d&apos;Ivoire</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

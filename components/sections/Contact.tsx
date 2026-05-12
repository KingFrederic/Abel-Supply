'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';
import { getWhatsAppLink, CALL_NUMBER, EMAIL, ADDRESS, SOCIAL } from '@/lib/constants';
import DevisForm from '@/components/ui/DevisForm';

export default function Contact({ locale }: { locale: string }) {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section id="contact" className="py-28 sm:py-36 bg-bg-elev relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-px bg-gradient-to-r from-transparent via-amber/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-green/5 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
          className="text-center mb-20"
        >
          <motion.span variants={v} className="section-label block mb-5">Contact</motion.span>
          <motion.h2 variants={v} className="display-xl text-white max-w-2xl mx-auto mb-6">
            {t.contact.title}
          </motion.h2>
          <motion.p variants={v} className="text-text-muted text-lg max-w-lg mx-auto">
            {t.contact.sub}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20">

          {/* ── Contact channels ── */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
            className="space-y-4"
          >
            {/* WhatsApp — hero CTA */}
            <motion.a
              variants={v}
              href={getWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-6 rounded-2xl border border-green/20 bg-green/6 hover:bg-green/10 hover:border-green/35 transition-all duration-300"
              whileHover={shouldReduce ? {} : { y: -3 }}
            >
              <div className="w-14 h-14 rounded-xl bg-green/15 text-green flex items-center justify-center flex-shrink-0 group-hover:bg-green/25 transition-colors shadow-green">
                <WhatsAppIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-green font-display font-bold text-base">{t.contact.whatsapp}</p>
                <p className="text-text-muted text-sm truncate">+{CALL_NUMBER.replace('+', '')}</p>
              </div>
              <div className="text-green/50 group-hover:text-green group-hover:translate-x-1 transition-all">
                <ArrowIcon />
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              variants={v}
              href={`tel:${CALL_NUMBER}`}
              className="group flex items-center gap-5 p-5 rounded-2xl bg-bg-card border border-white/6 hover:border-amber/20 transition-all duration-300"
              whileHover={shouldReduce ? {} : { y: -2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 text-text-muted flex items-center justify-center flex-shrink-0 group-hover:bg-amber/10 group-hover:text-amber transition-all">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-white font-display font-semibold text-[15px]">{t.contact.call}</p>
                <p className="text-text-muted text-sm">{CALL_NUMBER}</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              variants={v}
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-5 p-5 rounded-2xl bg-bg-card border border-white/6 hover:border-amber/20 transition-all duration-300"
              whileHover={shouldReduce ? {} : { y: -2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 text-text-muted flex items-center justify-center flex-shrink-0 group-hover:bg-amber/10 group-hover:text-amber transition-all">
                <MailIcon />
              </div>
              <div>
                <p className="text-white font-display font-semibold text-[15px]">{t.contact.email}</p>
                <p className="text-text-muted text-sm truncate">{EMAIL}</p>
              </div>
            </motion.a>

            {/* Address */}
            <motion.div
              variants={v}
              className="flex items-center gap-5 p-5 rounded-2xl bg-bg-card border border-white/6"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 text-text-muted flex items-center justify-center flex-shrink-0">
                <MapIcon />
              </div>
              <div>
                <p className="text-white font-display font-semibold text-[15px]">{t.contact.address}</p>
                <p className="text-text-muted text-sm">{ADDRESS}</p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={v}>
              <p className="text-text-dim text-xs font-display uppercase tracking-wider mb-3">{t.contact.social}</p>
              <div className="flex gap-2.5">
                {[
                  { href: SOCIAL.instagram, label: 'Instagram', Icon: InstagramIcon },
                  { href: SOCIAL.facebook, label: 'Facebook', Icon: FacebookIcon },
                  { href: SOCIAL.telegram, label: 'Telegram', Icon: TelegramIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-bg-card border border-white/6 text-text-muted flex items-center justify-center hover:border-amber/30 hover:text-amber hover:bg-amber/5 transition-all"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={v}
            className="relative p-8 rounded-2xl bg-bg-card border border-white/6"
          >
            {/* Top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent rounded-t-2xl" />
            <h3 className="font-display font-bold text-xl text-white mb-6">Envoyer votre devis</h3>
            <DevisForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}
function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.13 6.13l1.27-.83a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
}
function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function MapIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}
function InstagramIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
}
function FacebookIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>;
}
function TelegramIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>;
}

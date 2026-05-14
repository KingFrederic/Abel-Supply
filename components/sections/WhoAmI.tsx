'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

export default function WhoAmI({ locale: _locale }: { locale: string }) {
  const t = useT();
  const shouldReduce = useReducedMotion();
  const v = shouldReduce ? revealVariantsReduced : revealVariants;

  return (
    <section
      id="about"
      className="py-32 sm:py-44 relative overflow-hidden"
      style={{
        background: '#F5F0E8',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Paper texture overlay at 2% */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.02, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Left: editorial number + portrait ── */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={v}
            className="relative order-2 lg:order-1"
          >
            {/* Editorial statement */}
            <div className="mb-10">
              <div
                className="font-display font-bold leading-none select-none"
                style={{ fontSize: 'clamp(5rem, 14vw, 9rem)', color: '#C9A96E', letterSpacing: '-0.03em' }}
              >
                30%
              </div>
              <p className="font-display font-semibold text-2xl text-[#1A1A1F] -mt-2 leading-tight">
                d&apos;économies garanties
              </p>
            </div>

            {/* Portrait card */}
            <div className="relative max-w-[400px] mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#C9A96E]/20 shadow-xl" style={{ background: '#1A1508' }}>
                {/* SVG Portrait illustration */}
                <svg viewBox="0 0 420 525" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#1A1508"/>
                      <stop offset="100%" stopColor="#080909"/>
                    </radialGradient>
                    <radialGradient id="skinGrad" cx="45%" cy="30%" r="65%">
                      <stop offset="0%" stopColor="#8B5E3C"/>
                      <stop offset="60%" stopColor="#6B4423"/>
                      <stop offset="100%" stopColor="#4A2E14"/>
                    </radialGradient>
                    <radialGradient id="rimLight" cx="80%" cy="20%" r="60%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
                    </radialGradient>
                    <linearGradient id="shirtGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1E2028"/>
                      <stop offset="100%" stopColor="#13151a"/>
                    </linearGradient>
                    <linearGradient id="helmetGrad" x1="0" y1="0" x2="0.3" y2="1">
                      <stop offset="0%" stopColor="#F59E0B"/>
                      <stop offset="100%" stopColor="#D97706"/>
                    </linearGradient>
                    <filter id="portraitShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000" floodOpacity="0.6"/>
                    </filter>
                    <filter id="softBlur">
                      <feGaussianBlur stdDeviation="2"/>
                    </filter>
                  </defs>
                  <rect width="420" height="525" fill="url(#bgGrad)"/>
                  <rect width="420" height="525" fill="url(#rimLight)"/>
                  {[0,30,60,90].map((x,i)=>(
                    <line key={i} x1={340+x} y1="0" x2={310+x} y2="525" stroke="#2A2A2A" strokeWidth="8" opacity="0.4" filter="url(#softBlur)"/>
                  ))}
                  <rect x="0" y="400" width="420" height="125" fill="#0A0A0C" opacity="0.6"/>
                  <line x1="0" y1="480" x2="420" y2="480" stroke="#1C1C1E" strokeWidth="1"/>
                  <path d="M80 525 L80 360 Q90 320 120 310 L180 295 Q210 290 210 290 Q210 290 240 295 L300 310 Q330 320 340 360 L340 525 Z" fill="url(#shirtGrad)" filter="url(#portraitShadow)"/>
                  <path d="M180 295 L200 330 L210 340 L220 330 L240 295 Q225 310 210 315 Q195 310 180 295Z" fill="#0D0F13"/>
                  <rect x="240" y="340" width="30" height="22" rx="2" fill="#18191F" stroke="#222330" strokeWidth="0.5"/>
                  <path d="M192 295 Q210 310 228 295 L228 270 Q210 278 192 270 Z" fill="url(#skinGrad)"/>
                  <ellipse cx="210" cy="205" rx="78" ry="88" fill="url(#skinGrad)" filter="url(#portraitShadow)"/>
                  <path d="M132 200 Q140 138 210 130 Q280 138 288 200 Z" fill="url(#helmetGrad)"/>
                  <path d="M128 202 Q140 135 210 126 Q280 135 292 202 L292 210 L128 210 Z" fill="#F59E0B"/>
                  <rect x="128" y="205" width="164" height="10" rx="5" fill="#D97706"/>
                  <path d="M120 212 Q138 220 210 222 Q282 220 300 212 L296 205 Q278 214 210 216 Q142 214 124 205 Z" fill="#B45309"/>
                  <rect x="184" y="158" width="52" height="28" rx="4" fill="#D97706" opacity="0.6"/>
                  <text x="210" y="178" textAnchor="middle" fontSize="9" fill="#F59E0B" fontFamily="sans-serif" fontWeight="800" letterSpacing="1">IM</text>
                  <ellipse cx="183" cy="210" rx="11" ry="9" fill="#1A0E06"/>
                  <ellipse cx="237" cy="210" rx="11" ry="9" fill="#1A0E06"/>
                  <ellipse cx="183" cy="210" rx="7" ry="7" fill="#3D2010"/>
                  <ellipse cx="237" cy="210" rx="7" ry="7" fill="#3D2010"/>
                  <ellipse cx="185" cy="208" rx="2.5" ry="2.5" fill="#FFF" opacity="0.7"/>
                  <ellipse cx="239" cy="208" rx="2.5" ry="2.5" fill="#FFF" opacity="0.7"/>
                  <path d="M170 196 Q183 190 196 194" stroke="#2A1A08" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M224 194 Q237 190 250 196" stroke="#2A1A08" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M207 220 Q205 238 200 242 Q210 246 220 242 Q215 238 213 220" fill="#5A3620" opacity="0.6"/>
                  <path d="M194 255 Q210 264 226 255" stroke="#3A1F0D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M197 255 Q210 261 223 255" stroke="#5A3020" strokeWidth="1" fill="none" strokeLinecap="round"/>
                  <ellipse cx="132" cy="218" rx="10" ry="14" fill="#6B4423"/>
                  <ellipse cx="288" cy="218" rx="10" ry="14" fill="#5A3A1C"/>
                  <path d="M288 170 Q300 205 285 255 Q278 270 260 280" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round"/>
                  <path d="M195 268 Q210 272 225 268" stroke="#3A1F0D" strokeWidth="1" fill="none" opacity="0.5"/>
                  <ellipse cx="210" cy="292" rx="60" ry="12" fill="#000" opacity="0.35" filter="url(#softBlur)"/>
                  <ellipse cx="210" cy="140" rx="90" ry="30" fill="#F59E0B" opacity="0.06" filter="url(#softBlur)"/>
                </svg>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-[#C9A96E]/15 pointer-events-none" />
              </div>

              {/* Floating guarantee badge — ivory bg, gold border */}
              <motion.div
                className="absolute -bottom-5 -right-5 bg-white border border-[#C9A96E]/40 rounded-2xl px-5 py-4 shadow-lg"
                animate={shouldReduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="font-display font-bold text-2xl leading-none" style={{ color: '#C9A96E' }}>30%</div>
                <div className="text-[#4A4A55] text-[11px] mt-1">d&apos;économies max.</div>
              </motion.div>

              {/* Floating location badge — ivory bg */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white border border-[#C9A96E]/25 rounded-xl px-4 py-2.5 shadow-md"
                animate={shouldReduce ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[#1A1A1F] text-xs font-display font-medium">Abidjan, CI</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: copy ── */}
          <motion.div
            className="order-1 lg:order-2"
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerParent}
          >
            <motion.span
              variants={v}
              className="block mb-5 font-display text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#C9A96E' }}
            >
              À propos
            </motion.span>

            <motion.h2
              variants={v}
              className="display-xl mb-2"
              style={{ color: '#1A1A1F' }}
            >
              {t.about.title}
            </motion.h2>

            <motion.p
              variants={v}
              className="font-display text-xl font-semibold mb-1"
              style={{ color: '#C9A96E' }}
            >
              {t.about.name}
            </motion.p>

            <motion.p
              variants={v}
              className="text-[#4A4A55] text-sm mb-10 flex items-center gap-2"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {t.about.location}
            </motion.p>

            <motion.p
              variants={v}
              className="leading-[1.85] text-[15px] mb-10"
              style={{ color: '#4A4A55' }}
            >
              {t.about.body}
            </motion.p>

            {/* Guarantee quote — dark blockquote on ivory */}
            <motion.div
              variants={v}
              className="relative pl-6 py-5 rounded-r-xl"
              style={{
                borderLeft: '2px solid #C9A96E',
                background: 'rgba(201,169,110,0.06)',
              }}
            >
              <div
                className="absolute -top-2 left-4 font-display leading-none text-5xl"
                style={{ color: '#C9A96E', opacity: 0.3 }}
              >
                &ldquo;
              </div>
              <p
                className="font-display font-medium text-lg italic leading-relaxed"
                style={{ color: '#1A1A1F' }}
              >
                {t.about.guarantee}
              </p>
            </motion.div>

            {/* Trust stats row */}
            <motion.div variants={v} className="flex items-center gap-0 mt-12 border-t border-[#C9A96E]/20 pt-8">
              {[['100+', 'Chantiers'], ['30%', 'Économies'], ['24h', 'Réponse']].map(([val, lbl], i) => (
                <div
                  key={lbl}
                  className={`flex-1 flex flex-col items-center py-2 ${i < 2 ? 'border-r border-[#C9A96E]/20' : ''}`}
                >
                  <span className="font-display font-bold text-2xl leading-none" style={{ color: '#C9A96E' }}>{val}</span>
                  <span className="text-[#4A4A55] text-xs mt-1 font-display">{lbl}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

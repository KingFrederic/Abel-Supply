'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const LOCALE_KEY = 'idowu-locale';

export default function LanguageToggle({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped(true);
    const next = locale === 'fr' ? 'en' : 'fr';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, next);
    }
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    setTimeout(() => {
      router.push(newPath);
    }, 350);
  }

  return (
    <button
      onClick={toggle}
      aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
      className="relative w-14 h-8 rounded-lg overflow-visible"
      style={{ perspective: 600 }}
    >
      <span
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 700ms cubic-bezier(.2,.8,.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          position: 'relative',
        }}
      >
        {/* Front — current locale */}
        <span
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 flex items-center justify-center rounded-lg border border-white/15 bg-bg-elev text-white text-xs font-display font-semibold tracking-wider"
        >
          {locale.toUpperCase()}
        </span>
        {/* Back — target locale */}
        <span
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 flex items-center justify-center rounded-lg border border-amber/30 bg-amber/10 text-amber text-xs font-display font-semibold tracking-wider"
        >
          {locale === 'fr' ? 'EN' : 'FR'}
        </span>
      </span>
    </button>
  );
}

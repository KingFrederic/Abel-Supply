import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Cormorant_Garamond } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { I18nProvider } from '@/lib/i18n/provider';
import fr from '@/lib/i18n/fr.json';
import en from '@/lib/i18n/en.json';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const locales = ['fr', 'en'] as const;
type Locale = (typeof locales)[number];

const translations = { fr, en };

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!locales.includes(locale as Locale)) notFound();

  const t = translations[locale as Locale];

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}>
      <body>
        <I18nProvider translations={t}>{children}</I18nProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fr from '@/lib/i18n/fr.json';
import en from '@/lib/i18n/en.json';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import WhatISupply from '@/components/sections/WhatISupply';
import WhoAmI from '@/components/sections/WhoAmI';
import WhyCheaper from '@/components/sections/WhyCheaper';
import RecentProjects from '@/components/sections/RecentProjects';
import ForWhom from '@/components/sections/ForWhom';
import Contact from '@/components/sections/Contact';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const locales = ['fr', 'en'] as const;
type Locale = (typeof locales)[number];
const translations = { fr, en };

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!locales.includes(locale as Locale)) return {};

  const t = translations[locale as Locale];
  const titles: Record<Locale, string> = {
    fr: 'IDOWU MATÉRIAUX — Matériaux de construction à Abidjan, jusqu\'à 30% d\'économies',
    en: 'IDOWU MATÉRIAUX — Construction materials in Abidjan, save up to 30%',
  };

  return {
    title: titles[locale as Locale],
    description: t.hero.sub,
    openGraph: {
      title: titles[locale as Locale],
      description: t.hero.sub,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
  };
}

export default function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <HowItWorks />
        <WhatISupply />
        <WhoAmI locale={locale} />
        <WhyCheaper />
        <RecentProjects />
        <ForWhom />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </>
  );
}

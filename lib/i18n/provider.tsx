'use client';

import React, { createContext, useContext } from 'react';
import type fr from './fr.json';

type Translations = typeof fr;

const I18nContext = createContext<Translations | null>(null);

export function I18nProvider({
  children,
  translations,
}: {
  children: React.ReactNode;
  translations: Translations;
}) {
  return (
    <I18nContext.Provider value={translations}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT(): Translations {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used within I18nProvider');
  return ctx;
}

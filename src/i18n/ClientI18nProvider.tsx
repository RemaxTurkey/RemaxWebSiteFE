"use client";

import React from 'react';
import { IntlProvider } from 'react-intl';
import { defaultLocale } from './config';

interface ClientI18nProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}

// Client-side bileşen
function ClientI18nProvider({ 
  children, 
  locale, 
  messages 
}: ClientI18nProviderProps) {
  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
}

export default ClientI18nProvider;
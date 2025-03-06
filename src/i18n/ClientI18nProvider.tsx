"use client";

import React from 'react';
import { IntlProvider } from 'react-intl';
import { defaultLocale } from './config';
import dynamic from 'next/dynamic';

interface ClientI18nProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}

// Client-side only bileşen
function ClientOnlyProvider({ 
  children, 
  locale, 
  messages 
}: ClientI18nProviderProps) {
  return (
    <div suppressHydrationWarning>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        {children}
      </IntlProvider>
    </div>
  );
}

// SSR'ı devre dışı bırakarak sadece client-side'da çalışacak şekilde export ediyoruz
const ClientI18nProvider = dynamic(() => Promise.resolve(ClientOnlyProvider), {
  ssr: false,
});

export default ClientI18nProvider;
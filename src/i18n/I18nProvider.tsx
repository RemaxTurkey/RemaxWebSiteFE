import React from 'react';
import { messages as staticMessages, defaultLocale } from './config';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
}

// Client Component olarak işaretliyoruz
"use client";

import { IntlProvider } from 'react-intl';

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const [messages, setMessages] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const loadMessages = async () => {
      try {
        // Dinamik olarak dil dosyasını yükle
        const localeMessages = (await import(`./locales/${locale}.json`)).default;
        setMessages(localeMessages);
      } catch (error) {
        console.error(`Dil dosyası yüklenirken hata oluştu: ${locale}`, error);
        // Varsayılan dil dosyasını yükle
        const defaultMessages = (await import(`./locales/${defaultLocale}.json`)).default;
        setMessages(defaultMessages);
      }
    };

    loadMessages();
  }, [locale]);

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
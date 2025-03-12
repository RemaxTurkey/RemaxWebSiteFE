import { createIntl, createIntlCache } from 'react-intl';

// Dil dosyalarını dinamik olarak import et
import enMessages from './locales/en.json';
import trMessages from './locales/tr.json';

// Desteklenen diller
export const locales = ['en', 'tr'];
export const defaultLocale = 'tr';

// Dil mesajları
export const messages = {
  en: enMessages,
  tr: trMessages,
};

// Ana sayfa URL'si için özel işaretleyici
export const isRootPath = (locale: string) => locale === 'tr';

// IntlCache oluştur
const cache = createIntlCache();

// Belirli bir dil için intl nesnesi oluştur
export function getIntl(locale: string = defaultLocale) {
  return createIntl(
    {
      locale,
      messages: messages[locale as keyof typeof messages],
    },
    cache
  );
} 
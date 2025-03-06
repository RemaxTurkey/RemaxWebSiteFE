import { createIntl, createIntlCache } from 'react-intl';

// Desteklenen diller
export const locales = ['en', 'tr'];
export const defaultLocale = 'tr';

// Dil dosyalarını yükle
export const messages = {
  en: require('./locales/en.json'),
  tr: require('./locales/tr.json'),
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
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Desteklenen tüm dillerin listesi
  locales: ['tr', 'en'],
  
  // Eşleşme olmadığında kullanılacak dil
  defaultLocale: 'tr'
}); 
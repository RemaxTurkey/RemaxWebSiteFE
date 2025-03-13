import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // `/api`, `/trpc`, `/_next` veya `/_vercel` ile başlayanlar ve
  // nokta içerenler (örn. `favicon.ico`) hariç tüm yolları eşleştir
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}; 
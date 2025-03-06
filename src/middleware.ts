import { NextRequest, NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from './i18n/config';

function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  return matchLocale(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // `/_next/` ve `/api/` ile başlayan istekleri kontrol etme
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/')
  ) {
    return;
  }

  // Kök URL ise doğrudan Türkçe içeriğe yönlendir
  if (pathname === '/') {
    return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
  }

  // Mevcut dili kontrol et
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Eğer dil belirtilmemişse, kullanıcının tercih ettiği dile yönlendir
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // URL'yi yeni dil ile oluştur
    return NextResponse.rewrite(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher, tüm yolları kontrol eder
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 
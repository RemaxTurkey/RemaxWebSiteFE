import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Next.js'in navigasyon API'leri etrafında hafif sarmalayıcılar
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing); 
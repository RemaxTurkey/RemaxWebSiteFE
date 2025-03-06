"use client";

import React from 'react';
import Link from 'next/link';
import WelcomeCard from '@/components/WelcomeCard';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Client-side only bileşen
function WelcomePageComponent() {
  // useParams hook'u ile client-side'da params'a erişim
  const params = useParams();
  const lang = params.lang as string;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">
        <FormattedMessage id="app.title" />
      </h1>
      
      <WelcomeCard userName="Remax" />
      
      <div className="mt-8">
        <Link 
          href={`/${lang}`} 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          ← <FormattedMessage id="app.button.back" defaultMessage="Geri Dön" />
        </Link>
      </div>
    </div>
  );
}

// SSR'ı devre dışı bırakarak sadece client-side'da çalışacak şekilde export ediyoruz
const WelcomePage = dynamic(() => Promise.resolve(WelcomePageComponent), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default WelcomePage; 
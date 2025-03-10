"use client";

import React from 'react';
import Link from 'next/link';
import WelcomeCard from '@/components/common/welcomecard';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import './welcome.scss';

// Client-side only bileşen
function WelcomePageComponent() {
  // useParams hook'u ile client-side'da params'a erişim
  const params = useParams();
  const lang = params.lang as string;

  return (
    <div className="welcome-container">
      <h1>
        <FormattedMessage id="app.title" />
      </h1>
      
      <WelcomeCard userName="Remax" />
      
      <div>
        <Link 
          href={`/${lang}`} 
          className="back-link"
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
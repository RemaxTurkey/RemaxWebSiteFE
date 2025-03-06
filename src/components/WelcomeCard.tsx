"use client";

import React from 'react';
import { useTranslations } from '@/i18n/useTranslations';
import dynamic from 'next/dynamic';

interface WelcomeCardProps {
  userName?: string;
}

// Client-side only bileşen
function WelcomeCardComponent({ userName }: WelcomeCardProps) {
  const { t } = useTranslations();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">
        {t('app.welcome')} {userName ? `, ${userName}!` : '!'}
      </h2>
      <p className="text-gray-600">
        {t('app.description')}
      </p>
      <div className="mt-4 flex gap-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {t('app.button.login')}
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          {t('app.button.register')}
        </button>
      </div>
    </div>
  );
}

// SSR'ı devre dışı bırakarak sadece client-side'da çalışacak şekilde export ediyoruz
const WelcomeCard = dynamic(() => Promise.resolve(WelcomeCardComponent), {
  ssr: false,
  loading: () => <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">Loading...</div>
});

export default WelcomeCard; 
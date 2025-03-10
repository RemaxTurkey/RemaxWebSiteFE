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
    <div className="welcome-card">
      <h2 className="welcome-card__title">
        {t('app.welcome')} {userName ? `, ${userName}!` : '!'}
      </h2>
      <p className="welcome-card__description">
        {t('app.description')}
      </p>
      <div className="welcome-card__buttons">
        <button className="btn-login">
          {t('app.button.login')}
        </button>
        <button className="btn-register">
          {t('app.button.register')}
        </button>
      </div>
    </div>
  );
}

// SSR'ı devre dışı bırakarak sadece client-side'da çalışacak şekilde export ediyoruz
const WelcomeCard = dynamic(() => Promise.resolve(WelcomeCardComponent), {
  ssr: false,
  loading: () => <div className="welcome-card">Loading...</div>
});

export default WelcomeCard; 
"use client";

import React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { locales, isRootPath } from "@/i18n/config";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Çeviriler için yeni anahtarları ekleyelim
// Bu normalde i18n/locales içindeki JSON dosyalarına eklenmeli
const counterMessages = {
  tr: {
    "app.link.counter": "Zustand Sayaç Örneğine Git →"
  },
  en: {
    "app.link.counter": "Go to Zustand Counter Example →"
  }
};

// Dil değiştirme bileşeni
function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  // "/" karakterini kaldır (eğer varsa)
  const cleanLang = currentLang.replace("/", "");
  
  return (
    <div className="flex gap-2 mb-4">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={isRootPath(locale) ? "/" : `/${locale}`}
          className={`px-3 py-1 rounded ${
            cleanLang === locale
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

// Client-side only bileşen
function HomePage() {
  // useParams hook'u ile client-side'da params'a erişim
  const params = useParams();
  const lang = (params?.lang || "tr") as string;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <LanguageSwitcher currentLang={lang} />

        <h1 className="text-4xl font-bold mb-4">
          <FormattedMessage id="app.title" />
        </h1>

        <h2 className="text-2xl mb-6">
          <FormattedMessage id="app.welcome" />
        </h2>

        <p className="mb-8 text-center">
          <FormattedMessage id="app.description" />
        </p>

        <div className="flex gap-4 mb-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <FormattedMessage id="app.button.login" />
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <FormattedMessage id="app.button.register" />
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            <FormattedMessage id="app.button.contact" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href={isRootPath(lang) ? "/welcome" : `/${lang}/welcome`}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            <FormattedMessage id="app.link.welcome" />
          </Link>
          
          <Link 
            href={isRootPath(lang) ? "/counter" : `/${lang}/counter`}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            <FormattedMessage 
              id="app.link.counter" 
              defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["app.link.counter"] || "Go to Counter Example →"} 
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

// SSR'ı devre dışı bırakarak sadece client-side'da çalışacak şekilde export ediyoruz
const Home = dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default Home; 
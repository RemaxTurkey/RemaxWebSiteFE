"use client";

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { useCounterStore } from '@/store/counterStore';
import { isRootPath } from '@/i18n/config';

// Çeviriler için yeni anahtarları ekleyelim
// Bu normalde i18n/locales içindeki JSON dosyalarına eklenmeli
// Ancak örnek için burada tanımlıyoruz
const counterMessages = {
  tr: {
    "counter.title": "Zustand Sayaç Örneği",
    "counter.description": "Bu sayfa Zustand state yönetim kütüphanesini kullanarak basit bir sayaç örneği göstermektedir.",
    "counter.value": "Mevcut değer:",
    "counter.increment": "Artır",
    "counter.decrement": "Azalt",
    "counter.reset": "Sıfırla",
    "counter.back": "Ana Sayfaya Dön"
  },
  en: {
    "counter.title": "Zustand Counter Example",
    "counter.description": "This page demonstrates a simple counter example using the Zustand state management library.",
    "counter.value": "Current value:",
    "counter.increment": "Increment",
    "counter.decrement": "Decrement",
    "counter.reset": "Reset",
    "counter.back": "Back to Home"
  }
};

interface CounterClientProps {
  lang: string;
}

export default function CounterClient({ lang }: CounterClientProps) {
  // Zustand store'dan state ve action'ları al
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">
        <FormattedMessage id="counter.title" defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["counter.title"] || "Counter Example"} />
      </h1>
      
      <p className="mb-6">
        <FormattedMessage id="counter.description" defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["counter.description"] || "Counter example using Zustand"} />
      </p>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-md flex items-center justify-between">
        <span className="font-medium">
          <FormattedMessage id="counter.value" defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["counter.value"] || "Current value:"} />
        </span>
        <span className="text-2xl font-bold">{count}</span>
      </div>
      
      <div className="flex gap-2 mb-6">
        <button 
          onClick={increment}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          <FormattedMessage id="counter.increment" defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["counter.increment"] || "Increment"} />
        </button>
        
        <button 
          onClick={decrement}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          <FormattedMessage id="counter.decrement" defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["counter.decrement"] || "Decrement"} />
        </button>
        
        <button 
          onClick={reset}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          <FormattedMessage id="counter.reset" defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["counter.reset"] || "Reset"} />
        </button>
      </div>
      
      <Link 
        href={isRootPath(lang) ? "/" : `/${lang}`}
        className="text-blue-500 hover:text-blue-700 underline"
      >
        ← <FormattedMessage id="counter.back" defaultMessage={counterMessages[lang as keyof typeof counterMessages]?.["counter.back"] || "Back to Home"} />
      </Link>
    </div>
  );
} 
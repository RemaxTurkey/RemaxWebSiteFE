'use client';

import React from 'react';
import HomeFilter from '@/components/HomeFilter';

export default function Home() {
  const handleSearch = (category: string, city: string) => {
    console.log('Arama yapılıyor:', { category, city });
    // Burada arama işlemlerini gerçekleştirebilirsiniz
  };

  const handleMapClick = () => {
    console.log('Harita görünümüne geçiliyor');
    // Burada harita sayfasına yönlendirme yapabilirsiniz
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Hayalinizdeki Evi Bulun
        </h1>
        <HomeFilter 
          onSearch={handleSearch}
          onMapClick={handleMapClick}
        />
      </div>
    </main>
  );
} 
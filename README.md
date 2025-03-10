This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Next.js Veri Çekme Rehberi

Bu rehber, Next.js uygulamasında server-side ve client-side veri çekme işlemlerini açıklar.

## İçindekiler

- [Server-Side Veri Çekme](#server-side-veri-çekme)
  - [Server Components](#server-components)
  - [Server Actions](#server-actions)
  - [Cacheleme Stratejileri](#cacheleme-stratejileri)
  - [Cache Invalidation](#cache-invalidation)
- [Client-Side Veri Çekme](#client-side-veri-çekme)
  - [Fetcher Fonksiyonu](#fetcher-fonksiyonu)
  - [SWR ile Veri Çekme](#swr-ile-veri-çekme)
  - [Birden Fazla Endpoint](#birden-fazla-endpoint)
  - [SWR Yapılandırması](#swr-yapılandırması)
- [Server ve Client Entegrasyonu](#server-ve-client-entegrasyonu)

## Server-Side Veri Çekme

### Server Components

Next.js App Router'da, tüm sayfalar ve layout'lar varsayılan olarak Server Component'tir. Bu bileşenlerde doğrudan `fetch` API'si kullanarak veri çekebilirsiniz.

```typescript
// app/[lang]/server-example/page.tsx
export default async function ServerExamplePage({ params }: { params: { lang: string } }) {
  // Server-side veri çekme
  const res = await fetch('https://api.example.com/data', {
    // Cache seçenekleri
    next: { revalidate: 60 } // 60 saniye cache
  });
  
  const data = await res.json();
  
  return (
    <div>
      <h1>Server-side Veri</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### Server Actions

Server Actions, client component'lerden çağrılabilen server-side fonksiyonlardır.

```typescript
// actions/example-actions.ts
'use server';

import { fetchClient } from "@/lib/fetch-client";

export type ExampleData = {
  id: number;
  createdAt: Date;
  name: string;
  avatar: string;
};

export async function getExampleData(id?: number): Promise<ExampleData> {
  try {
    return await fetchClient<ExampleData>(`/api/data/${id || 1}`, {
      next: { revalidate: 60 }
    });
  } catch (error: any) {
    console.error('Veri çekme hatası:', error);
    throw new Error('Veri çekilemedi');
  }
}
```

### Cacheleme Stratejileri

Next.js'te üç temel cacheleme stratejisi bulunur:

1. **Statik Oluşturma (SSG)**
   ```typescript
   // Sayfa seviyesinde
   export const dynamic = 'force-static';
   
   // Fetch seviyesinde
   fetch('https://api.example.com/data', { cache: 'force-cache' });
   ```

2. **Artımlı Statik Yeniden Oluşturma (ISR)**
   ```typescript
   // Sayfa seviyesinde
   export const revalidate = 60; // 60 saniye
   
   // Fetch seviyesinde
   fetch('https://api.example.com/data', { next: { revalidate: 60 } });
   ```

3. **Dinamik Oluşturma (SSR)**
   ```typescript
   // Sayfa seviyesinde
   export const dynamic = 'force-dynamic';
   
   // Fetch seviyesinde
   fetch('https://api.example.com/data', { cache: 'no-store' });
   ```

### Cache Invalidation

Cache'i manuel olarak geçersiz kılmak için:

```typescript
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  // URL'den token'ı al
  const token = request.nextUrl.searchParams.get('token');
  
  // Güvenlik kontrolü
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
  }
  
  try {
    // Tag ile cache'i geçersiz kıl
    revalidateTag('example-data');
    
    // Veya belirli bir path'i geçersiz kıl
    revalidatePath('/server-example');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Cache geçersiz kılma hatası' }, { status: 500 });
  }
}
```

## Client-Side Veri Çekme

### Fetcher Fonksiyonu

Veri çekme işlemleri için merkezi bir fetcher fonksiyonu oluşturmak, hata yönetimini ve tip güvenliğini sağlamak için önemlidir:

```typescript
// lib/fetch-client.ts
export class FetchError extends Error {
  status: number;
  info: any;
  
  constructor(message: string, status: number, info?: any) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.info = info;
  }
}

// Fetch API için bir wrapper
export async function fetchClient<T>(
  url: string, 
  options?: RequestInit & { next?: { revalidate?: number, tags?: string[] } }
): Promise<T> {
  const res = await fetch(url, options);
  
  if (!res.ok) {
    let errorInfo;
    try {
      errorInfo = await res.json();
    } catch (e) {
      errorInfo = { message: 'API yanıtı ayrıştırılamadı' };
    }
    
    const error = new FetchError(
      errorInfo?.message || 'API isteği başarısız oldu',
      res.status,
      errorInfo
    );
    throw error;
  }
  
  return res.json();
}

// SWR için basit fetcher
export const swrFetcher = async <T>(url: string): Promise<T> => {
  return fetchClient<T>(url);
};
```

### SWR ile Veri Çekme

SWR, client-side veri çekme için React hook'ları sağlayan bir kütüphanedir.

```typescript
// components/ExampleButton.tsx
'use client';

import { Button } from "@/components/ui/button";
import useSWR from 'swr';
import { useState } from "react";
import { getExampleData, ExampleData } from "@/actions/example-actions";
import { swrFetcher } from "@/lib/fetch-client";

export default function ExampleButton() {
  const [id, setId] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(false);
  
  // Server Action ile SWR kullanımı
  const { data, error, isLoading, mutate } = useSWR<ExampleData>(
    shouldFetch ? ['example-data', id] : null,
    async () => await getExampleData(id)
  );
  
  // Alternatif olarak: API endpoint ile SWR kullanımı
  // const { data, error, isLoading, mutate } = useSWR<ExampleData>(
  //   shouldFetch ? `/api/data/${id}` : null,
  //   swrFetcher
  // );
  
  const handleClick = () => {
    setShouldFetch(true);
    if (data) mutate();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button 
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Yükleniyor...' : 'Veriyi Getir'}
      </Button>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
          <h3 className="font-bold">Hata</h3>
          <p>{error.message}</p>
        </div>
      )}
      
      {data && (
        <div className="mt-4 p-4 border rounded-lg">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### Birden Fazla Endpoint

Birden fazla endpoint'e istek atmak için:

```typescript
// components/MultiDataButton.tsx
'use client';

import { Button } from "@/components/ui/button";
import useSWR from 'swr';
import { useState } from "react";
import { getExampleData, getAnotherData } from "@/actions/example-actions";

export default function MultiDataButton() {
  const [id, setId] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(false);
  
  // İlk endpoint için SWR hook'u
  const { 
    data: exampleData, 
    error: exampleError, 
    isLoading: isExampleLoading, 
    mutate: mutateExample 
  } = useSWR(
    shouldFetch ? ['example-data', id] : null,
    async () => await getExampleData(id)
  );
  
  // İkinci endpoint için SWR hook'u
  const { 
    data: anotherData, 
    error: anotherError, 
    isLoading: isAnotherLoading, 
    mutate: mutateAnother 
  } = useSWR(
    shouldFetch ? ['another-data', id] : null,
    async () => await getAnotherData(id)
  );
  
  const handleClick = () => {
    setShouldFetch(true);
    if (exampleData) mutateExample();
    if (anotherData) mutateAnother();
  };

  // İki endpoint'in yükleme durumunu birleştir
  const isLoading = isExampleLoading || isAnotherLoading;

  return (
    <div className="flex flex-col gap-4">
      <Button 
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Yükleniyor...' : 'Verileri Getir'}
      </Button>
      
      {/* Veri gösterimi */}
    </div>
  );
}
```

### SWR Yapılandırması

Global SWR yapılandırması için bir provider oluşturun:

```typescript
// providers/SWRProvider.tsx
'use client';

import { SWRConfig } from 'swr';
import { swrFetcher } from '@/lib/fetch-client';

export default function SWRProvider({ 
  children,
  fallback = {}
}: { 
  children: React.ReactNode,
  fallback?: Record<string, any>
}) {
  return (
    <SWRConfig 
      value={{
        fallback,
        fetcher: swrFetcher,
        // Global yapılandırma
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        onError: (error) => {
          console.error('SWR Error:', error);
        }
      }}
    >
      {children}
    </SWRConfig>
  );
}
```

## Server ve Client Entegrasyonu

Server-side veriyi client-side SWR ile entegre etmek için:

```typescript
// app/[lang]/server-example/page.tsx
import { getExampleData } from "@/actions/example-actions";
import { unstable_serialize } from 'swr';
import SWRProvider from "@/providers/SWRProvider";
import ExampleButton from "@/components/ExampleButton";

export default async function ServerExamplePage({ params }: { params: { lang: string } }) {
  // Server-side veri çekme
  const data = await getExampleData(1);
  
  return (
    <div className="container mx-auto p-4">
      <h1>Server Example Page ({params.lang})</h1>
      
      {/* Server-side çekilen veriyi göster */}
      <div className="mb-8">
        <h2>Server-side Veri:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      
      {/* Client-side SWR için fallback değeri olarak server-side veriyi kullan */}
      <SWRProvider fallback={{
        [unstable_serialize(['example-data', 1])]: data
      }}>
        <ExampleButton />
      </SWRProvider>
    </div>
  );
}
```

## Örnek Kullanım Senaryoları

### 1. Statik Sayfa + Client-side Güncelleme

```typescript
// app/products/page.tsx
import { fetchClient } from "@/lib/fetch-client";
import { unstable_serialize } from 'swr';
import SWRProvider from "@/providers/SWRProvider";
import ProductList from "@/components/ProductList";

// Sayfa statik olarak oluşturulacak
export const revalidate = 3600; // 1 saat

export default async function ProductsPage() {
  // Build zamanında veri çekme
  const products = await fetchClient('/api/products');
  
  return (
    <SWRProvider fallback={{
      [unstable_serialize('/api/products')]: products
    }}>
      <ProductList />
    </SWRProvider>
  );
}
```

### 2. Dinamik Sayfa + Anlık Veri

```typescript
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic'; // Her istekte yeniden oluştur

export default async function DashboardPage() {
  // Her istekte yeni veri çek
  const stats = await fetchClient('/api/stats', { cache: 'no-store' });
  
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsDisplay initialData={stats} />
    </div>
  );
}
```

### 3. Form Gönderimi + Optimistik UI

```typescript
// components/CreateItemForm.tsx
'use client';

import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { createItem } from '@/actions/item-actions';

export default function CreateItemForm() {
  const [title, setTitle] = useState('');
  const { mutate } = useSWRConfig();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Optimistik güncelleme
    mutate('/api/items', async (items) => {
      // Geçici olarak yeni öğeyi ekle
      const optimisticItem = { id: 'temp-id', title, status: 'pending' };
      const newItems = [...items, optimisticItem];
      
      try {
        // Server'a gönder
        const createdItem = await createItem({ title });
        
        // Başarılı olursa, geçici öğeyi gerçek öğe ile değiştir
        return newItems.map(item => 
          item.id === 'temp-id' ? createdItem : item
        );
      } catch (error) {
        // Hata durumunda orijinal listeye geri dön
        return items;
      }
    }, { revalidate: false });
    
    setTitle('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yeni öğe başlığı"
      />
      <button type="submit">Ekle</button>
    </form>
  );
}
```

---

Bu rehber, Next.js uygulamanızda veri çekme işlemlerini yapılandırmanıza yardımcı olacaktır. Daha fazla bilgi için [Next.js Dokümantasyonu](https://nextjs.org/docs/app/building-your-application/data-fetching) ve [SWR Dokümantasyonu](https://swr.vercel.app/docs/with-nextjs)'na başvurabilirsiniz.


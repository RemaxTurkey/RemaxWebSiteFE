'use client';

import { SWRConfig } from 'swr';

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
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: true
      }}
    >
      {children}
    </SWRConfig>
  );
}

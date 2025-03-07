"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import CounterClient from './CounterClient';

export default function CounterPage() {
  const params = useParams();
  const lang = (params?.lang || "tr") as string;

  return (
    <div className="container mx-auto py-8">
      <CounterClient lang={lang} />
    </div>
  );
} 
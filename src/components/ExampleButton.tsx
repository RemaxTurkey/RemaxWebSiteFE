'use client';

import { Button } from "@/components/ui/button";
import useSWR from 'swr';
import { useState } from "react";
import { getExampleData, ExampleData } from "@/data/serverActions/serverActions";

export default function ExampleButton() {
  const [id, setId] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(false);
  
  // SWR hook'u - Server Action ile
  const { data, error, isLoading, mutate } = useSWR<ExampleData>(
    shouldFetch ? ['example-data', id] : null,
    async () => await getExampleData(id)
  );
  
  const handleClick = () => {
    setShouldFetch(true);
    if (data) {
      mutate();
    }
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
          <p>{error.message || 'Veri çekilirken bir hata oluştu'}</p>
        </div>
      )}
      
      {data && (
        <div className="mt-4 p-4 border rounded-lg w-full max-w-md">
          <h3 className="font-bold mb-2">Veri</h3>
          <div className="grid grid-cols-2 gap-2">
            <span className="font-medium">ID:</span>
            <span>{data.id}</span>
            
            <span className="font-medium">İsim:</span>
            <span>{data.name}</span>
            
            <span className="font-medium">Oluşturulma:</span>
            <span>{new Date(data.createdAt).toLocaleString()}</span>
            
            <span className="font-medium">Avatar:</span>
            <span>{data.avatar}</span>
          </div>
        </div>
      )}
    </div>
  );
} 
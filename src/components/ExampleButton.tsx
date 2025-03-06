'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getExample } from "@/data/serverActions/serverActions";

export default function ExampleButton() {
  const [data, setData] = useState<{
    id: number;
    createdAt: Date;
    name: string;
    avatar: string 
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      //NOTE: bu server action client tarafindan cagirilir.
      const result = await getExample();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button 
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Yükleniyor...' : 'Veriyi Getir'}
      </Button>
      
      {data && (
        <div className="mt-4 p-4 border rounded-lg">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 
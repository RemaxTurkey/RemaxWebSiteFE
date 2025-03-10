'use server';

import RemaxService from "@/data/providers/remaxService";

// Veri tipini tanımlayalım
export type ExampleData = {
  id: number;
  createdAt: Date;
  name: string;
  avatar: string;
};

// Server Action
export async function getExampleData(id: number): Promise<ExampleData> {
  try {
    // Burada mevcut data provider'ınızı kullanabilirsiniz
    // Örnek olarak:
    return await RemaxService.getInstance().getExample(id);
    
    
  } catch (error: any) {
    console.error('Veri çekme hatası:', error);
    throw new Error('Veri çekilemedi');
  }
} 
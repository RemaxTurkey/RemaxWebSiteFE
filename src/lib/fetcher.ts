// Fetch API için bir wrapper oluşturalım
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

const baseUrl = "https://67c955c10acf98d07089cef1.mockapi.io";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(`${baseUrl}${url}`);
  
  if (!res.ok) {
    const error = new Error('API isteği başarısız oldu');
    throw error;
  }
  
  return res.json();
} 
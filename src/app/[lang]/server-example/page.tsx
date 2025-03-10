
import { getExampleData } from "@/data/serverActions/serverActions";
import ExampleButton from "@/components/ExampleButton";

// Sayfa bileşeni için cache seçeneklerini tanımlayalım
export const revalidate = 60; // Her 60 saniyede bir yeniden doğrulama (ISR)
// Alternatif olarak: export const dynamic = 'force-static'; // Tamamen statik sayfa (SSG)
// Alternatif olarak: export const dynamic = 'force-dynamic'; // Her istekte yeniden oluşturma (SSR)

export default async function ServerExamplePage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  // Server-side veri çekme (cache'lenecek)
  const data = await getExampleData(1);
  console.log(data);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Server Example Page ({params.lang})</h1>
      
      {/* Server-side çekilen veriyi göster */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Server-side Veri:</h2>
        <pre className="bg-gray-100 p-3 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
        <p className="mt-2 text-sm text-gray-500">
          Bu veri {revalidate} saniye boyunca cachelenir.
        </p>
      </div>
      
      {/* Client-side SWR için fallback değeri olarak server-side veriyi kullan */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Client-side Veri Yönetimi (SWR):</h2>
          <ExampleButton />
      </div>
    </div>
  );
}

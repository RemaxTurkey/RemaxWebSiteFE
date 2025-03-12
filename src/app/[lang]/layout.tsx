import type { Metadata } from "next";
import "../globals.scss";
import { locales, defaultLocale, messages } from "@/i18n/config";
import ClientI18nProvider from "@/i18n/ClientI18nProvider";

export const metadata: Metadata = {
  title: "Remax Website",
  description: "Generated by create next app",
};

// Geçerli dil parametrelerini tanımla
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Next.js 14'te önerilen şekilde params kullanımı
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Params'ı await ediyoruz
  const awaitedParams = await params;
  
  // Geçerli dili al
  const currentLang = String(awaitedParams?.lang || defaultLocale);
  
  // Dil mesajlarını al
  const langMessages = messages[currentLang as keyof typeof messages] || messages[defaultLocale];

  return (
    <ClientI18nProvider locale={currentLang} messages={langMessages}>
      {children}
    </ClientI18nProvider>
  );
} 
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import "../globals.scss";
import "@/styles/main.scss";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Inter fontunu tanımlama
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Remax Web Sitesi",
  description: "Remax Web Sitesi",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Gelen `locale` değerinin geçerli olduğundan emin olun
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Statik render'ı etkinleştir
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${inter.variable}`}>
      <NextIntlClientProvider>
        <body className="bg-[#F8F9FB]">
          <NextTopLoader />
          <Header />
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

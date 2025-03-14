import React from "react";
import HomeFilter from "@/components/HomeFilter/HomeFilter";
import FastCategories from "@/components/FastCategories/FastCategories";
import KesfedinSection from "@/components/Sections/Home/Kesfedin/KesfedinSection";
import { useTranslations } from "next-intl";
import FastCategoriesMobile from "@/components/FastCategories/Mobile/FastCategoriesMobile";

const Page = () => {
  const t = useTranslations();
  const categories = [
    {
      id: '1',
      label: 'Konut',
      propertyCount: '253.211',
    },
    {
      id: '2',
      label: 'İşyeri',
      propertyCount: '253.211',
    },
    {
      id: '3',
      label: 'Arsa & Arazi',
      propertyCount: '253.211',
    },
  ];
  return (
    <div className="container max-w-screen-2xl min-h-screen mx-auto">
      <div className="h-[276px] md:h-[calc(100vh-20px)] bg-white rounded-none md:rounded-3xl mx-0 py-0 mb-0 md:mx-5 mt-0 md:mt-2 md:py-6 md:mb-10">
        <div className="md:bg-cover md:bg-center md:bg-no-repeat flex flex-col items-center gap-6 md:gap-14 w-full justify-center h-full">
          <span className="text-base md:text-2xl text-black font-normal capitalize text-center">
            {t("home.main-title")} <br />
            <span className="font-semibold">{t("home.main-title-second")}</span>
          </span>
          <div className="flex flex-col gap-6 md:gap-14 w-full max-w-4xl justify-center items-center">
            <HomeFilter />
            <FastCategories />
          </div>
        </div>
      </div>
      <div className="w-full md:hidden block mt-3 px-2">
        <FastCategoriesMobile categories={categories} />
      </div>
      <div className="w-full mt-10 px-40">
        <KesfedinSection />
      </div>
    </div>
  );
};

export default Page;

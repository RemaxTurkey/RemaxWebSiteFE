import React from "react";
import HomeFilter from "@/components/HomeFilter/HomeFilter";
import FastCategories from "@/components/FastCategories/FastCategories";

const page = () => {
  return (
    <div className="container min-h-screen mx-auto">
      <div className="md:bg-cover md:bg-center md:bg-no-repeat flex flex-col items-center gap-6 md:gap-14 w-full">
        <span className="text-base md:text-2xl md:text-black font-normal text-white capitalize text-center">
          Sektörün en çok <br />
          <span className="font-semibold">tercih edilen markası</span>
        </span>
        <div className="flex flex-col gap-6 md:gap-14 w-full max-w-3xl mx-auto">
          <HomeFilter />
          <FastCategories />
        </div>
      </div>
    </div>
  );
};

export default page;

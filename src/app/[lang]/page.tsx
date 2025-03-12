import React from "react";
import HomeFilter from "@/components/HomeFilter/HomeFilter";
import FastCategories from "@/components/FastCategories/FastCategories";

const page = () => {
  return (
    <div className="container min-h-screen mx-auto">
      <div className="h-screen bg-white rounded-3xl mx-0 py-0 mb-0 md:mx-5 mt-2 md:py-6 md:mb-10">
        <div className="md:bg-cover md:bg-center md:bg-no-repeat flex flex-col items-center gap-6 md:gap-14 mt-66px md:mt-[215px] w-full">
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
    </div>
  );
};

export default page;

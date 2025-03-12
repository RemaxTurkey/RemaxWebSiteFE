import React from "react";
import HomeFilter from "@/components/HomeFilter/HomeFilter";

const page = () => {
  return (
    <div className="container min-h-screen mx-auto">
      <div className="flex flex-col items-center gap-6 md:bg-[url('/images/home-bg.png')] md:bg-cover md:bg-center md:bg-no-repeat">
        <span className="text-base md:text-2xl md:text-black font-normal text-white capitalize text-center">
            Sektörün en çok <br/>
            <span className="font-semibold">tercih edilen markası</span>
        </span>
        <HomeFilter />
      </div>
    </div>
  );
};

export default page;

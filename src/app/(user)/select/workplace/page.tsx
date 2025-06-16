import React from "react";
import WorkplaceList from "./_components/workplace-list";

const Page = () => {
  return (
    <div className="flex justify-center items-center w-full h-full gap-18 p-12 bg-gradient-to-r from-[var(--primary-color)] to-[#a7774ac7] bg-[length:200%_200%] animate-[var(--animate-gradient-flow)]">
      <WorkplaceList />
    </div>
  );
};

export default Page;

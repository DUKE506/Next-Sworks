import React from "react";
import { LoginForm } from "./_components/form";
//#53c56c
const Page = () => {
  return (
    <div className="flex justify-center items-center w-full h-full gap-18 p-12 bg-gradient-to-r from-[var(--primary-color)] to-[#a7774ac7] bg-[length:200%_200%] animate-[var(--animate-gradient-flow)]">
      <LoginForm />
    </div>
  );
};

export default Page;

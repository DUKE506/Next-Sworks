import React, { useState } from "react";
import { buildings, Tab } from "../_components/tab";
import ButtonTab, { facilities } from "../_components/button-tab";

const Page = () => {
  return (
    <div className="mt-20 px-12 flex flex-col gap-6">
      <span className="text-xl font-bold">설비</span>
      <div className="flex flex-col gap-4">
        <Tab tabs={buildings} />
        <ButtonTab tabs={facilities} />
      </div>
      <div className="w-full h-150 border bg-accent rounded-sm"></div>
    </div>
  );
};

export default Page;

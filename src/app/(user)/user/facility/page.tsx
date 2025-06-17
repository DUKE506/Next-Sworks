"use client";
import React, { useState } from "react";
import { Tab } from "../_components/tab";
import ButtonTab from "../_components/button-tab";
import { Card } from "@/components/ui/card";
import { Bolt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBuildingStore } from "@/store/building/building-store";
import { useRouter } from "next/navigation";

// type Facility = {
//   id: number;
//   name: string;
// };

// const Page = () => {
//   const { buildings } = useBuildingStore();
//   const router = useRouter();

//   return (
//     <div className="flex flex-col gap-6">
//       <span className="text-xl font-bold">설비</span>
//       <div className="flex flex-col gap-4">
//         <Tab tabs={buildings} />
//         <div className="flex justify-between">
//           <ButtonTab tabs={facilities} />
//           <Button
//             className="rounded-sm text-xs bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
//             onClick={() => {
//               router.push("facility/add");
//             }}
//           >
//             생성
//           </Button>
//         </div>
//       </div>
//       <div className="w-full rounded-sm grid grid-cols-5 gap-x-8 gap-y-10">
//         {Array.from({ length: 15 }).map((_, x) => {
//           return <FacCard key={x} />;
//         })}
//       </div>
//     </div>
//   );
// };

// interface FacCard {}

// export default Page;

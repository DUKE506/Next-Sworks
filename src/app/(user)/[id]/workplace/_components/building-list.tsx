import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Building2, Plus } from "lucide-react";
import React, { useEffect } from "react";
import ImageCard from "../../_components/image-card";
import { useRouter } from "next/navigation";
import { useBuildingStore } from "@/store/building-store";

const BuildingList = () => {
  const { buildings } = useBuildingStore();
  const router = useRouter();


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">강남우체국</span>
        <Button
          className="text-xs rounded-sm bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
          onClick={() => router.push("workplace/building/add")}
        >
          <Plus size={24} /> 건물 추가
        </Button>
      </div>
      <div className="overflow-x-auto">
        <ScrollArea>
          <div className="flex gap-8 pb-4">
            {buildings.map((v, i) => {
              return (
                <ImageCard
                  id={v.id}
                  key={i}
                  label={v.name}
                  description={v.address}
                  defaultIcon={Building2}
                />
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default BuildingList;

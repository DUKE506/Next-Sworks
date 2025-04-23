import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Building2, Plus } from "lucide-react";
import React from "react";
import ImageCard from "../../_components/image-card";

const BuildingList = () => {
  return (
    <div className="mt-20 px-12 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">강남우체국</span>
        <Button className="text-xs rounded-sm bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer">
          <Plus size={24} /> 건물 추가
        </Button>
      </div>
      <div className="overflow-x-auto">
        <ScrollArea>
          <div className="flex gap-8 pb-4">
            {Array.from({ length: 6 }).map((_, x) => {
              return (
                <ImageCard
                  key={x}
                  label="강남우체국"
                  description="서울특별시 강남구 개포로 619"
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

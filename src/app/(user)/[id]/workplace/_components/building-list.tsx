import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Building2, Plus } from "lucide-react";
import React, { useEffect } from "react";
import ImageCard from "../../_components/image-card";
import { useRouter } from "next/navigation";
import { useBuildingStore } from "@/store/building-store";
import { Card, CardContent } from "@/components/ui/card";

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
            <AddCard onClick={() => router.push("workplace/building/add")} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

const AddCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <Card
      onClick={onClick}
      className="flex justify-center min-w-80 py-12 hover:cursor-pointer hover:bg-accent hover:border-blue-500 duration-200"
    >
      <CardContent className="w-full flex flex-col items-center gap-4  ">
        <Plus className="text-[var(--description-title-color)]" size={24} />
        <span className="text-[var(--description-title-color)] text-sm">
          신규 건물을 등록해주세요.
        </span>
      </CardContent>
    </Card>
  );
};

export default BuildingList;

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

const Location = () => {
  return (
    <div className="flex flex-col gap-8">
      <span className="text-xl font-bold">위치</span>
      <div className="flex flex-col gap-4">
        <span className="text-md font-bold">층</span>
        <div className="flex gap-4">
          <Floor label="전체" />
          <Floor label="1F" />
          <Floor label="2F" />
          <Floor label="3F" />
          <Floor label="4F" />
          <FloorAddButton />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-md font-bold">위치</span>
        <div className="grid grid-cols-6 gap-x-4 gap-y-6">
          <Room label="1창고" floor="B2" />
          <Room label="기계실" floor="1F" />
          <Room label="경비실" floor="1F" />
          <Room label="기계실" floor="1F" />
          <Room label="기계실" floor="1F" />
          <Room label="기계실" floor="1F" />
          <Room label="기계실" floor="1F" />
        </div>
      </div>
    </div>
  );
};

const Floor = ({ label }: { label: string }) => {
  return (
    <Card className="px-8 py-2 rounded-sm">
      <span className="text-xs ">{label}</span>
    </Card>
  );
};

const FloorAddButton = () => {
  return (
    <Card className="px-8 py-2 rounded-sm hover:cursor-pointer hover:bg-accent duration-200">
      <Plus className="text-[var(--description-title-color)]" size={18} />
    </Card>
  );
};

const Room = ({ label, floor }: { label: string; floor: string }) => {
  return (
    <Card>
      <CardContent className="flex flex-row gap-4">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-[var(--description-value-color)]">
          {floor}
        </span>
      </CardContent>
    </Card>
  );
};

export default Location;

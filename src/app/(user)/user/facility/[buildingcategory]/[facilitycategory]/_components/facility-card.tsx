import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Facility } from "@/types/(user)/facility/facility";
import dayjs from "dayjs";
import { Bolt } from "lucide-react";

interface FacCardProps {
  data: Facility;
}

export const FacCard = ({ data }: FacCardProps) => {
  return (
    <Card className="flex flex-col w-full p-0 gap-0 overflow-hidden rounded-sm h-fit hover:cursor-pointer hover:shadow-lg">
      <div className="flex justify-center items-center w-full h-30 bg-accent ">
        <Bolt className="text-muted-foreground w-6" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex w-full justify-between">
          <span className="text-sm font-bold">{data.name}</span>
          <Badge className="bg-blue-200 text-blue-600 rounded-xs">
            {data.type}
          </Badge>
        </div>
        <FacCardItem label="건물" value={data.room.floor.building.name} />
        <FacCardItem label="위치" value={data.room.name} />
        <FacCardItem label="수량" value={data.count.toString()} />
        <FacCardItem label="규격용량" value={data.standard} />
        <FacCardItem
          label="설치년월"
          value={dayjs(data.setDt).format("YYYY-MM-DD")}
        />
        <FacCardItem
          label="교체년월"
          value={dayjs(data.changeDt).format("YYYY-MM-DD")}
        />
      </div>
      <div className="flex justify-between items-center p-4 bg-accent">
        <div className="flex gap-2">
          <span className="text-xs text-[var(--description-title-color)]">
            내용년수
          </span>
          <span className="text-xs text-blue-600">{data.life}</span>
        </div>
        <Button
          className="rounded-sm px-4 text-xs bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
          size={"sm"}
        >
          QR
        </Button>
      </div>
    </Card>
  );
};

interface FacCardItemProps {
  label: string;
  value: string;
}

const FacCardItem = ({ label, value }: FacCardItemProps) => {
  return (
    <div className="flex justify-between">
      <span className="text-[var(--description-title-color)] text-xs">
        {label}
      </span>
      <span className="text-[var(--description-value-color)] text-xs">
        {value}
      </span>
    </div>
  );
};

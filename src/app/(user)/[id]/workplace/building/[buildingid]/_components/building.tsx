import { Activity, Building2, Layers, LayoutGrid, Monitor } from "lucide-react";
import React from "react";
import { IconAccordion } from "./IconAccordion";
import { Card, CardContent } from "@/components/ui/card";
import { useBuildingDetailStore } from "@/store/building-detail-store";

const Building = () => {
  const { building } = useBuildingDetailStore();
  return building !== null ? (
    <div className="flex flex-col gap-8">
      <span className="text-xl font-bold">건물</span>
      <div className="w-full h-80 flex justify-center items-center rounded-sm bg-accent ">
        <Building2 className="w-10 h-10 text-ring" />
      </div>
      <div className="w-full flex justify-between gap-8">
        <InfoCard label="건물명칭" value={building.name} />
        <InfoCard label="전화번호" value={building.tel} />
        <InfoCard label="주소" value={building.address} />
        <InfoCard label="소방등급" value={building.fireRating} />
      </div>
      <IconAccordion label="기본 정보" icon={Monitor}>
        <AccordionChildren
          label1={"준공년월"}
          value1={building.completionDt.toString()}
        />
        <AccordionChildren label1={"건물용도"} value1={building.usage} />
        <AccordionChildren
          label1={"시공업체"}
          value1={building.constructionCo}
        />
      </IconAccordion>
      <IconAccordion label="면적 및 구조" icon={Layers}>
        <AccordionChildren
          title="구조"
          label1={"건물구조"}
          value1={building.buildingStruct}
          label2={"지붕구조"}
          value2={building.roofStruct}
        />
        <AccordionChildren
          title="연면적"
          label1={"연면적"}
          value1={building.grossFloorArea}
          label2={"대지면적"}
          value2={building.siteArea}
          label3={"건축면적"}
          value3={building.buildingArea}
        />
        <AccordionChildren
          title="층"
          label1={"전체"}
          value1={building.totalFloor}
          label2={"지상"}
          value2={building.groundFloor}
          label3={"지하"}
          value3={building.basementFloor}
        />
        <AccordionChildren
          title="높이"
          label1={"전체"}
          value1={building.totalHeight}
          label2={"지상"}
          value2={building.groundHeight}
          label3={"지하"}
          value3={building.basementHeight}
        />
        <AccordionChildren
          title="조경면적"
          label1={"전체"}
          value1={building.totalLandscapeArea}
          label2={"지상"}
          value2={building.groundLandscapeArea}
          label3={"지하"}
          value3={building.basementLandscapeArea}
        />
      </IconAccordion>
      <IconAccordion label="설비 정보" icon={Activity}>
        <AccordionChildren
          title="전기"
          label1={"전기용량"}
          value1={building.electricalCapacity}
          label2={"수전용량"}
          value2={building.receivingCapacity}
          label3={"발전용량"}
          value3={building.powerCapacity}
        />
        <AccordionChildren
          title="급수"
          label1={"급수용량"}
          value1={building.waterCapacity}
          label2={"고가수조"}
          value2={building.elevatedWaterTankCapacity}
          label3={"저수조"}
          value3={building.waterTankCapacity}
        />
        <AccordionChildren
          title="가스"
          label1={"가스용량"}
          value1={building.gasCapacity}
          label2={"보일러"}
          value2={building.heater}
          label3={"냉·온수기"}
          value3={building.chillerHeater}
        />
        <AccordionChildren
          title="냉·난방"
          label1={"냉·난방용량"}
          value1={building.electricalCapacity}
          label2={"냉방용량"}
          value2={building.coolCapacity}
          label3={"난방용량"}
          value3={building.heatCapacity}
        />
      </IconAccordion>
      <IconAccordion label="부대 시설" icon={LayoutGrid}>
        <AccordionChildren
          title="주차장"
          label1={"전체"}
          value1={building.totalParking}
          label2={"옥내"}
          value2={building.indoorParking}
          label3={"옥외"}
          value3={building.outdoorParking}
        />
        <AccordionChildren
          title="승강기"
          label1={"전체"}
          value1={building.waterCapacity}
          label2={"인승용"}
          value2={building.passengerLift}
          label3={"화물용"}
          value3={building.FreightLift}
        />
        <AccordionChildren
          title="화장실"
          label1={"전체"}
          value1={building.totalRestroom}
          label2={"남성"}
          value2={building.mensRoom}
          label3={"여성"}
          value3={building.ladiesRoom}
        />
      </IconAccordion>
    </div>
  ) : null;
};

interface CardProps {
  label: string;
  value: string;
}

const InfoCard = ({ label, value }: CardProps) => {
  return (
    <Card className="w-full shadow-none">
      <CardContent className="flex flex-col gap-4 ">
        <span className="text-[var(--description-title-color)] text-sm">
          {label}
        </span>
        <span className="font-bold text-sm">{value}</span>
      </CardContent>
    </Card>
  );
};

interface AccordionChildrenProps {
  title?: string;
  label1: string;
  label2?: string;
  label3?: string;
  value1: string;
  value2?: string;
  value3?: string;
}
export const AccordionChildren = ({
  title,
  label1,
  label2,
  label3,
  value1,
  value2,
  value3,
}: AccordionChildrenProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-bold">{title}</span>
      <div className="flex justify-between">
        <span className="text-xs text-[var(--description-title-color)]">
          {label1}
        </span>
        <span className="text-xs">{value1}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-[var(--description-title-color)]">
          {label2}
        </span>
        <span className="text-xs">{value2}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-[var(--description-title-color)]">
          {label3}
        </span>
        <span className="text-xs">{value3}</span>
      </div>
    </div>
  );
};

export default Building;

import React, { useState } from "react";
import { buildings, Tab } from "../_components/tab";
import ButtonTab, { facilities } from "../_components/button-tab";
import { Card } from "@/components/ui/card";
import { Bolt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Facility = {
  id: number;
  name: string;
};

const Page = () => {
  return (
    <div className="mt-20 px-12 flex flex-col gap-6">
      <span className="text-xl font-bold">설비</span>
      <div className="flex flex-col gap-4">
        <Tab tabs={buildings} />
        <ButtonTab tabs={facilities} />
      </div>
      <div className="w-full rounded-sm grid grid-cols-5 gap-x-8 gap-y-10">
        {Array.from({ length: 15 }).map((_, x) => {
          return <FacCard key={x} />;
        })}
      </div>
    </div>
  );
};

interface FacCard {}

const FacCard = () => {
  return (
    <Card className="flex flex-col w-full p-0 gap-0 overflow-hidden rounded-sm h-fit hover:cursor-pointer hover:shadow-lg">
      <div className="flex justify-center items-center w-full h-30 bg-accent ">
        <Bolt className="text-muted-foreground w-6" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex w-full justify-between">
          <span className="text-sm font-bold">냉동기</span>
          <Badge className="bg-blue-200 text-blue-600 rounded-xs">흡수식</Badge>
        </div>
        <FacCardItem label="건물" value="건물A" />
        <FacCardItem label="위치" value="기계실(3층)" />
        <FacCardItem label="수량" value="3EA" />
        <FacCardItem label="규격용량" value="2,110(600) kw(USRT)" />
        <FacCardItem label="설치년월" value="2024-01-05" />
        <FacCardItem label="교체년월" value="2034-01-04" />
      </div>
      <div className="flex justify-between items-center p-4 bg-accent">
        <div className="flex gap-2">
          <span className="text-xs text-[var(--description-title-color)]">
            내용년수
          </span>
          <span className="text-xs text-blue-600">10년</span>
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

export default Page;

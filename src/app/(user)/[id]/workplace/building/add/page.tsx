"use client";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";

import { z } from "zod";
import ProgressBar from "./_components/stat-bar";

import BasicForm, { basicFormType } from "./_components/basic-form";
import StructForm from "./_components/struct-form";
import FacForm from "./_components/fac-form";
import ConvenienceForm from "./_components/convenience-form";
import { CreateBuilding } from "@/types/(user)/building/create-building";

const buildingFormSchema = z.object({
  name: z.string().min(2, { message: "두 글자 이상 입력해주세요" }),
  address: z.string().min(2, { message: "두 글자 이상 입력해주세요" }),
  tel: z.string().nullable(),
  usage: z.string().nullable(),
  constructionCo: z.string().nullable(),
  completionDt: z.date().nullable(),
  buildingStruct: z.string().nullable(),
  roofStruct: z.string().nullable(),
  grossFloorArea: z.string().nullable(),
  siteArea: z.string().nullable(),
  buildingArea: z.string().nullable(),
  totalFloor: z.string().nullable(),
  groundFloor: z.string().nullable(),
  basementFloor: z.string().nullable(),
  totalHeight: z.string().nullable(),
  groundHeight: z.string().nullable(),
  basementHeight: z.string().nullable(),
  totalParking: z.string().nullable(),
  indoorParking: z.string().nullable(),
  outdoorParking: z.string().nullable(),
  electricalCapacity: z.string().nullable(),
  receivingCapacity: z.string().nullable(),
  powerCapacity: z.string().nullable(),
  waterCapacity: z.string().nullable(),
  elevatedWaterTankCapacity: z.string().nullable(),
  waterTankCapacity: z.string().nullable(),
  gasCapacity: z.string().nullable(),
  heater: z.string().nullable(),
  chillerHeater: z.string().nullable(),
  totalLift: z.string().nullable(),
  passengerLift: z.string().nullable(),
  FreightLift: z.string().nullable(),
  coolHeatCapacity: z.string().nullable(),
  heatCapacity: z.string().nullable(),
  coolCapacity: z.string().nullable(),
  totalLandscapeArea: z.string().nullable(),
  groundLandscapeArea: z.string().nullable(),
  basementLandscapeArea: z.string().nullable(),
  totalRestroom: z.string().nullable(),
  mensRoom: z.string().nullable(),
  ladiesRoom: z.string().nullable(),
  fireRating: z.string().nullable(),
  cesspoolCapacity: z.string().nullable(),
});

export type createBuildingFormType = z.infer<typeof buildingFormSchema>;

const Page = () => {
  const [step, setStep] = useState<number>(0);
  const [building, setBuilding] = useState<CreateBuilding>({
    name: "",
    address: "",
    tel: "",
    usage: "",
    constructionCo: "",
    completionDt: new Date(),
    buildingStruct: "",
    roofStruct: "",
    grossFloorArea: "",
    siteArea: "",
    buildingArea: "",
    totalFloor: "",
    groundFloor: "",
    basementFloor: "",
    totalHeight: "",
    groundHeight: "",
    basementHeight: "",
    totalParking: "",
    indoorParking: "",
    outdoorParking: "",
    electricalCapacity: "",
    receivingCapacity: "",
    powerCapacity: "",
    waterCapacity: "",
    elevatedWaterTankCapacity: "",
    waterTankCapacity: "",
    gasCapacity: "",
    heater: "",
    chillerHeater: "",
    totalLift: "",
    passengerLift: "",
    FreightLift: "",
    coolHeatCapacity: "",
    heatCapacity: "",
    coolCapacity: "",
    totalLandscapeArea: "",
    groundLandscapeArea: "",
    basementLandscapeArea: "",
    totalRestroom: "",
    mensRoom: "",
    ladiesRoom: "",
    fireRating: "",
    cesspoolCapacity: "",
  });

  const stepRenders = [
    <BasicForm
      building={building}
      onClick={(data) => {
        setStep((prev) => prev + 1);
        setBuilding((prev) => ({ ...prev, ...data }));
      }}
    />,
    <StructForm
      building={building}
      onNext={(data) => {
        setStep((prev) => prev + 1);
        setBuilding((prev) => ({ ...prev, ...data }));
      }}
      onPrev={() => setStep((prev) => prev - 1)}
    />,
    <FacForm
      building={building}
      onNext={(data) => {
        setStep((prev) => prev + 1);
        setBuilding((prev) => ({ ...prev, ...data }));
      }}
      onPrev={() => setStep((prev) => prev - 1)}
    />,
    <ConvenienceForm
      building={building}
      onCreate={(data) => {
        setStep((prev) => prev + 1);
        setBuilding((prev) => ({ ...prev, ...data }));
      }}
      onPrev={() => setStep((prev) => prev - 1)}
    />,
  ];

  useEffect(() => {
    console.log(building);
  }, [building]);

  return (
    <div className="flex flex-col gap-12 px-12 ">
      <div className="flex flex-col gap-4">
        <span className="text-xl font-bold">건물 생성</span>
        <span className="text-[var(--description-value-color)] text-sm">
          건물 정보를 단계별로 입력해주세요. 필수 항목은*로 표시되어있습니다.
        </span>
      </div>
      <div>
        <ProgressBar currentStep={step} />
      </div>
      <div className="h-full">{stepRenders[step]}</div>
    </div>
  );
};

/**
 * 문자입력 input 폼
 */
export interface TextFormItemProps<T extends FieldValues, K extends keyof T> {
  label: string;
  placeholder: string;
  field: ControllerRenderProps<T, any>;
}

export const TextFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
  placeholder,
}: TextFormItemProps<T, K>) => {
  return (
    <FormItem className="g-2">
      <FormLabel className="text-xs text-[var(--description-value-color)]">
        {label}
      </FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
    </FormItem>
  );
};

export default Page;

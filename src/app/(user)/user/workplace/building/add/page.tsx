"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";

import { z } from "zod";
import ProgressBar, { Step } from "./_components/progress-bar";

import BasicForm from "./_components/basic-form";
import StructForm from "./_components/struct-form";
import FacForm from "./_components/fac-form";
import ConvenienceForm from "./_components/convenience-form";
import { CreateBuilding } from "@/types/(user)/building/create-building";
import { useBuildingStore } from "@/store/building/building-store";

import LottiePlayer from "../../../../../../components/common/lottie-player";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import FormResult from "@/components/ui/form-result/form-result";

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
  const router = useRouter();
  const [result, setResult] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([
    { num: 1, label: "기본정보", status: "incomplete" },
    { num: 2, label: "면적 및 구조", status: "incomplete" },
    { num: 3, label: "설비정보", status: "incomplete" },
    { num: 4, label: "부대시설", status: "incomplete" },
  ]);

  const {
    createBuilding,
    setCreateBuilding,
    postCreateBuilding,
    setInitialBuilding,
  } = useBuildingStore();

  useEffect(() => {
    return () => {
      setInitialBuilding();
    };
  }, []);

  const stepRenders = [
    <BasicForm
      building={createBuilding}
      onClick={(data) => {
        setStep((prev) => prev + 1);
        setCreateBuilding(data);
      }}
    />,
    <StructForm
      building={createBuilding}
      onNext={(data) => {
        setStep((prev) => prev + 1);
        setCreateBuilding(data);
      }}
      onPrev={() => setStep((prev) => prev - 1)}
    />,
    <FacForm
      building={createBuilding}
      onNext={(data) => {
        setStep((prev) => prev + 1);
        setCreateBuilding(data);
      }}
      onPrev={() => setStep((prev) => prev - 1)}
    />,
    <ConvenienceForm
      building={createBuilding}
      onCreate={async (data) => {
        setStep((prev) => prev + 1);
        setCreateBuilding(data);
        const res = await postCreateBuilding();
        setResult(res);
      }}
      onPrev={() => setStep((prev) => prev - 1)}
    />,
    <FormResult
      result={result}
      successTitle="건물 생성 완료!"
      successDescription="건물 정보가 성공적으로 등록되었습니다."
      failTitle="건물 생성 실패!"
      failDescription="건물 정보 등록을 실패했습니다."
      url="/user/workplace"
    />,
  ];

  return (
    <div className="flex flex-col gap-12 px-12 min-h-full">
      <div className="flex flex-col gap-4">
        <span className="text-xl font-bold">건물 생성</span>
        <span className="text-[var(--description-value-color)] text-sm">
          건물 정보를 단계별로 입력해주세요. 필수 항목은*로 표시되어있습니다.
        </span>
      </div>
      <div>
        <ProgressBar currentStep={step} steps={steps} setSteps={setSteps} />
      </div>
      <div className="flex flex-col flex-1">{stepRenders[step]}</div>
    </div>
  );
};

export default Page;

"use client";

import { useWorkplaceStore } from "@/store/workplace-store";
import { CreateWorkplace } from "@/types/(admin)/workplace/create-workplace";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import WorkplaceForm from "./_components/workplace-form";
import PermForm from "./_components/perm-form";
import { Form } from "@/components/ui/form";
import FormLayout from "@/components/ui/layout/form-layout/form-layout";
import { Step } from "@/app/(user)/[id]/workplace/building/add/_components/progress-bar";
import FormResult from "@/components/ui/form-result/form-result";

export const WorkplaceFormSchema = z.object({
  name: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  contractNum: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  address: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  tel: z
    .string()
    .min(9, { message: "자릿수를 확인해주세요." })
    .max(13, { message: "자릿수를 확인해주세요." }),
  contractedAt: z.date(),
  expiredAt: z.date().nullable(),
  state: z.enum(["계약", "해약"]),
  permMachine: z.boolean(),
  permElectronic: z.boolean(),
  permLift: z.boolean(),
  permFire: z.boolean(),
  permConstruct: z.boolean(),
  permNetwork: z.boolean(),
  permBeauty: z.boolean(),
  permSecurity: z.boolean(),
  permVoc: z.boolean(),
});

const Page = () => {
  const [result, setResult] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([
    { num: 1, label: "기본정보", status: "incomplete" },
    { num: 2, label: "권한", status: "incomplete" },
  ]);
  const router = useRouter();
  const { createWorkplace, setCreateWorkplace, postCreateWorkplace } =
    useWorkplaceStore();

  const stepRenders = [
    <WorkplaceForm
      createWorkplace={createWorkplace}
      onClick={(data) => {
        setStep((prev) => prev + 1);
        setCreateWorkplace(data);
      }}
    />,
    <PermForm
      createWorkplace={createWorkplace}
      onPrev={() => {
        setStep((prev) => prev - 1);
      }}
      onCreate={async (data) => {
        setStep((prev) => prev + 1);
        setCreateWorkplace(data);
        const res = await postCreateWorkplace();
        setResult(res);
      }}
    />,
    <FormResult
      result={result}
      successTitle="사업장 생성 완료!"
      successDescription="사업장 정보가 성공적으로 등록되었습니다."
      failTitle="사업장 생성 실패!"
      failDescription="사업장 정보 등록을 실패했습니다."
      url="/manage/workplace"
    />,
  ];

  return (
    <FormLayout
      title="사업장 생성"
      description="사업장 정보를 단계별로 입력해주세요. 필수 항목은*로 표시되어있습니다."
      step={step}
      setStep={setStep}
      steps={steps}
      setSteps={setSteps}
    >
      {stepRenders[step]}
    </FormLayout>
  );
};

export default Page;

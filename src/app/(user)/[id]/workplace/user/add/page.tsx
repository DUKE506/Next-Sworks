"use client";
import React, { useEffect, useState } from "react";
import ProgressBar, { Step } from "../../building/add/_components/progress-bar";
import BasicForm from "./_components/basic-form";
import { useUserStore } from "@/store/user-store";
import PermForm from "./_components/perm-form";
import FormResult from "@/components/ui/form-result/form-result";

const Page = () => {
  const [result, setResult] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([
    { num: 1, label: "기본정보", status: "incomplete" },
    { num: 2, label: "권한", status: "incomplete" },
  ]);
  const { createUser, setCreateUser, setInitialCreateUser, postCreateUser } =
    useUserStore();

  useEffect(() => {
    return () => {
      setInitialCreateUser();
    };
  }, []);

  const stepRenders = [
    <BasicForm
      createUser={createUser}
      onClick={(data) => {
        setStep((prev) => prev + 1);
        setCreateUser(data);
      }}
    />,
    <PermForm
      createUser={createUser}
      onCreate={async (data) => {
        setStep((prev) => prev + 1);
        setCreateUser(data);
        const res = await postCreateUser();
        setResult(res);
      }}
      onPrev={() => {
        setStep((prev) => prev - 1);
      }}
    />,
    <FormResult
      result={result}
      successTitle="사용자 생성 완료!"
      successDescription="사용자 정보가 성공적으로 등록되었습니다."
      failTitle="사용자 생성 실패!"
      failDescription="사용자 정보 등록을 실패했습니다."
      url="/1/workplace"
    />,
  ];

  return (
    <div className="flex flex-col gap-12 px-12 min-h-full">
      <div className="flex flex-col gap-4">
        <span className="text-xl font-bold">사용자 생성</span>
        <span className="text-[var(--description-value-color)] text-sm">
          사용자 정보를 단계별로 입력해주세요. 필수 항목은*로 표시되어있습니다.
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

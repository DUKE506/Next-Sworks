"use client";
import FormLayout from "@/components/ui/layout/form-layout/form-layout";
import React, { useEffect, useState } from "react";
import { Step } from "../../workplace/building/add/_components/progress-bar";
import BasicForm from "./_components/basic-form";
import { useBuildingStore } from "@/store/building/building-store";
import { useFacilityStore } from "@/store/facility-store";
import FormResult from "@/components/ui/form-result/form-result";
import { useAuthStore } from "@/store/auth-store";

const ClientPage = () => {
  const { currentWorkplace } = useAuthStore();
  const { getLocationTree } = useBuildingStore();
  const {
    createFacility,
    setCreateFacility,
    postCreateFacility,
    initialCreateFacility,
  } = useFacilityStore();

  const [result, setResult] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([
    { num: 1, label: "기본정보", status: "incomplete" },
    // { num: 2, label: "추가항목", status: "incomplete" },
  ]);

  useEffect(() => {
    initialCreateFacility();
    getLocationTree();
  }, []);

  const stepRenders = [
    <BasicForm
      createFacility={createFacility}
      onClick={(data) => {
        setResult(true);
        setStep((prev) => prev + 1);
        setCreateFacility(data);
        postCreateFacility();
      }}
    />,
    <FormResult
      result={result}
      successTitle="설비 생성 완료!"
      successDescription="설비 정보가 성공적으로 등록되었습니다."
      failTitle="설비 생성 실패!"
      failDescription="설비 정보 등록을 실패했습니다."
      url={`0/전체`}
    />,
  ];

  return (
    <FormLayout
      title="설비 생성"
      description="설비 정보를 단계"
      step={step}
      setStep={setStep}
      steps={steps}
      setSteps={setSteps}
    >
      {stepRenders[step]}
    </FormLayout>
  );
};

export default ClientPage;

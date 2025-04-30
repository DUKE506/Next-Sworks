"use client";
import FormLayout from "@/components/ui/layout/form-layout/form-layout";
import React, { useEffect, useState } from "react";
import { Step } from "../../workplace/building/add/_components/progress-bar";
import { CreateFacility } from "@/types/(user)/facility/create-facility";
import BasicForm from "./_components/basic-form";
import { useBuildingStore } from "@/store/building-store";

const ClientPage = () => {
  const { getLocationTree } = useBuildingStore();
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([
    { num: 1, label: "기본정보", status: "incomplete" },
    { num: 2, label: "추가항목", status: "incomplete" },
  ]);

  useEffect(() => {
    getLocationTree();
  }, []);

  const fac: CreateFacility = {
    name: "",
    type: "",
    room: { id: 1, name: "기계실" },
    standard: "",
    count: 0,
    life: "",
    setDt: new Date(),
    changeDt: new Date(),
  };

  const stepRenders = [<BasicForm createFacility={fac} onClick={() => {}} />];

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

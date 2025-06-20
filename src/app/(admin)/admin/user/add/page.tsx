"use client";
import { Step } from "@/app/(user)/user/workplace/building/add/_components/progress-bar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { useDeptStore } from "@/store/dept-store";

import { Department } from "@/types/department";
import React, { useEffect, useState } from "react";

import AdminForm from "./_components/admin-form";
import FormResult from "@/components/ui/form-result/form-result";
import FormLayout from "@/components/ui/layout/form-layout/form-layout";
import { useAdminStore } from "@/store/admin/admin-store";

const Page = () => {
  const [result, setResult] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([
    { num: 1, label: "관리자정보", status: "incomplete" },
  ]);
  const { createAdmin, setCreateAdmin, postCreateAdmin, resetCreateAdmin } =
    useAdminStore();

  useEffect(() => {
    return () => {
      resetCreateAdmin();
    };
  }, []);

  const stepRenders = [
    <AdminForm
      onCreate={async (data) => {
        setStep((prev) => prev + 1);
        setCreateAdmin(data);
        const res = await postCreateAdmin();
        setResult(res);
      }}
      createAdmin={createAdmin}
    />,
    <FormResult
      result={result}
      successTitle="관리자 생성 완료!"
      successDescription="관리자 정보가 성공적으로 등록되었습니다."
      failTitle="관리자 생성 실패!"
      failDescription="관리자 정보 등록을 실패했습니다."
      url="/admin/user"
    />,
  ];

  return (
    <FormLayout
      title="관리자 생성"
      description="관리자 정보를 단계별로 입력해주세요. 필수 항목은*로 표시되어있습니다."
      step={step}
      setStep={setStep}
      steps={steps}
      setSteps={setSteps}
    >
      {stepRenders[step]}
    </FormLayout>
  );
};

const PermItem = ({
  title,
  desc,
  value,
  selected,
  onClick,
}: {
  title: string;
  desc: string;
  value?: string;
  selected: string;
  onClick?: () => void;
}) => {
  return (
    <Card
      className={`flex-1 hover:cursor-pointer gap-4 ${
        value === selected
          ? "bg-[var(--primary-light-color)] duration-200"
          : null
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
    </Card>
  );
};

const DeptSelect = ({
  value,
  onChange,
}: {
  value: Department;
  onChange: (dept: Department) => void;
}) => {
  const { departments } = useDeptStore();

  return (
    <Select
      value={value?.name || ""}
      onValueChange={(selectedName) => {
        const selectedDept = departments.find(
          (dept) => dept.name === selectedName
        );
        if (selectedDept) {
          onChange(selectedDept);
        }
      }}
    >
      <SelectTrigger className="w-full hover: cursor-pointer text-sm">
        <SelectValue placeholder="선택" />
      </SelectTrigger>
      <SelectContent>
        {departments.map((v, i) => {
          return (
            <SelectItem
              key={i}
              value={v.name}
              className="text-xs hover:cursor-pointer "
            >
              {v.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default Page;

"use client";
import React, { useEffect, useState } from "react";

type StepStatus = "complete" | "active" | "incomplete";

interface Step {
  num: number;
  label: string;
  status: StepStatus;
}

const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const [steps, setSteps] = useState<Step[]>([
    { num: 1, label: "기본정보", status: "incomplete" },
    { num: 2, label: "면적 및 구조", status: "incomplete" },
    { num: 3, label: "설비정보", status: "incomplete" },
    { num: 4, label: "부대시설", status: "incomplete" },
  ]);

  useEffect(() => {
    console.log("스텝 : ", currentStep);
    //되돌아가는 경우
    const activeNum = steps.find((s) => s.status === "active")?.num;
    if (activeNum !== undefined && activeNum - currentStep > 1) {
      setSteps((prev) =>
        prev.map((s) =>
          s.num === activeNum && activeNum - currentStep > 1
            ? { ...s, status: "incomplete" }
            : s
        )
      );
    }

    //현재 active
    setSteps((prev) =>
      prev.map((s) =>
        s.num === currentStep + 1 ? { ...s, status: "active" } : s
      )
    );
    if (steps[currentStep - 1] === undefined) {
      return;
    }

    //완료 처리
    setSteps((prev) =>
      prev.map((s) =>
        s.num === currentStep - 1 ? { ...s, status: "complete" } : s
      )
    );
    steps[currentStep - 1].status = "complete";
  }, [currentStep]);

  return (
    <div className="flex items-center justify-between ">
      {steps.map((s, i) => {
        return (
          <React.Fragment key={i}>
            <ProgressBarItem {...s} />
            {i < steps.length - 1 && <Bar status={steps[i + 1].status} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Bar = ({ status }: { status: StepStatus }) => {
  const statusStyles = {
    complete: "bg-green-500",
    active: "bg-blue-500",
    incomplete: "bg-[var(--background-light-color)]",
  };
  return <div className={` flex-1 h-[2px] mx-2 ${statusStyles[status]}`} />;
};

const ProgressBarItem = ({
  num,
  label,
  status,
}: {
  num: number;
  label: string;
  status: StepStatus;
}) => {
  const baseStyle =
    "z-2 text-sm font-bold flex justify-center items-center rounded-4xl w-10 h-10";

  const statusStyles = {
    complete: "bg-green-500 text-white",
    active: "bg-blue-500 text-white",
    incomplete:
      "text-[var(--description-title-color)] bg-[var(--background-light-color)]",
  };

  const statusLabelStyles = {
    complete: "text-green-500",
    active: "text-blue-500",
    incomplete: "text-[var(--description-title-color)]",
  };

  return (
    <div className={`flex flex-col gap-4 items-center`}>
      <div className={`${baseStyle} ${statusStyles[status]}`}>{num}</div>
      <span className={`text-sm font-semibold ${statusLabelStyles[status]}`}>
        {label}
      </span>
    </div>
  );
};

export default ProgressBar;

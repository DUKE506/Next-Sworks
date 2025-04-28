"use client";
import React, { useEffect, useState } from "react";

type StepStatus = "complete" | "active" | "incomplete";

export interface Step {
  num: number;
  label: string;
  status: StepStatus;
}

const ProgressBar = ({
  steps,
  setSteps,
  currentStep,
}: {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  currentStep: number;
}) => {
  useEffect(() => {
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
    //완료처리
    steps[currentStep - 1].status = "complete";
    console.log(steps);
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
    active: "animate-progress",
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
    <div className={` flex flex-col gap-4 items-center`}>
      <div className={`${baseStyle} ${statusStyles[status]}`}>{num}</div>
      <span className={`text-sm font-semibold ${statusLabelStyles[status]}`}>
        {label}
      </span>
    </div>
  );
};

export default ProgressBar;

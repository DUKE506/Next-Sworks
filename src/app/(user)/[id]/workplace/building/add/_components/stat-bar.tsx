import React from "react";

type StepStatus = "complete" | "active" | "incomplete";

interface Step {
  num: number;
  label: string;
  status: StepStatus;
}

const ProgressBar = () => {
  const steps: Step[] = [
    { num: 1, label: "기본정보", status: "complete" },
    { num: 2, label: "면적 및 구조", status: "active" },
    { num: 3, label: "설비정보", status: "incomplete" },
    { num: 4, label: "부대시설", status: "incomplete" },
  ];

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

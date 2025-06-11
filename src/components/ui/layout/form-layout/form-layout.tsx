import ProgressBar, {
  Step,
} from "@/app/(user)/[id]/workplace/building/add/_components/progress-bar";
import React from "react";

interface FormLayoutProps {
  title: string;
  description: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  children: React.ReactNode;
}

export const FormLayout = ({
  title,
  description,
  step,
  steps,
  setSteps,
  children,
}: FormLayoutProps) => {
  return (
    <div className="flex flex-col gap-12 px-12 flex-1">
      <div className="flex flex-col gap-4">
        <span className="text-xl font-bold">{title}</span>
        <span className="text-[var(--description-value-color)] text-sm">
          {description}
        </span>
      </div>
      <div>
        <ProgressBar currentStep={step} steps={steps} setSteps={setSteps} />
      </div>
      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
};

export default FormLayout;

import React from "react";

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="border-b py-4">
        <span className="text-lg font-bold ">{title}</span>
      </div>
      {children}
    </div>
  );
};

export default FormLayout;

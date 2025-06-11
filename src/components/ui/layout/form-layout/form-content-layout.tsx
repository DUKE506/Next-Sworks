import React from "react";
import { Form } from "../../form";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FormContentLayoutProps<T extends FieldValues> {
  label: string;
  form: UseFormReturn<T>;
  children: React.ReactNode;
}

const FormContentLayout = <T extends FieldValues>({
  label,
  form,
  children,
}: FormContentLayoutProps<T>) => {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="border-b py-4">
        <span className="text-lg font-bold text-[var(--description-title-color)]">
          {label}
        </span>
      </div>
      <Form {...form}>{children}</Form>
    </div>
  );
};

export default FormContentLayout;

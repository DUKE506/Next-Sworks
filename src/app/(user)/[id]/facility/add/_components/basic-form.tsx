"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import FormContentLayout from "@/components/ui/layout/form-layout/form-content-layout";
import React from "react";

import { z } from "zod";
import { CreateFacility } from "@/types/(user)/facility/create-facility";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import { DateFormItem } from "@/components/ui/form-field-items/date-field";
import RoomSelectFieldFormItem from "@/components/ui/form-field-items/select-field";

const formSchema = z.object({
  name: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  type: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  standard: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  count: z.number(),
  life: z.string().nullable(),
  setDt: z.date(),
  changeDt: z.date().nullable(),
});

type formType = z.infer<typeof formSchema>;

interface basicFormProps {
  createFacility: CreateFacility;
  onClick: (data: Record<string, any>) => void;
}

const BasicForm = ({ createFacility, onClick }: basicFormProps) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: createFacility.name,
      type: createFacility.type,
      standard: createFacility.standard,
      count: createFacility.count,
      life: createFacility.life,
      setDt: createFacility.setDt,
      changeDt: createFacility.changeDt,
    },
  });

  const onSubmit = (values: formType) => {
    onClick(values);
  };

  return (
    <FormContentLayout label="기본정보" form={form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between flex-1"
      >
        <div className="grid grid-cols-2 gap-x-12 gap-y-16">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <TextFormItem label="설비명" placeholder="설비명" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <TextFormItem label="형식" placeholder="형식" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="standard"
            render={({ field }) => (
              <TextFormItem
                label="규격용량"
                placeholder="규격용량"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <TextFormItem label="수량" placeholder="수량" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="life"
            render={({ field }) => (
              <TextFormItem
                label="내용연수"
                placeholder="내용연수"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="setDt"
            render={({ field }) => (
              <DateFormItem label="설치년월" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="changeDt"
            render={({ field }) => (
              <DateFormItem label="교체년월" field={field} />
            )}
          />
          <RoomSelectFieldFormItem label="위치" />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="text-xs bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
          >
            다음 단계
          </Button>
        </div>
      </form>
    </FormContentLayout>
  );
};

export default BasicForm;

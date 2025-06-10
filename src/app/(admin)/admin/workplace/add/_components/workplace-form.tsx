import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormContentLayout from "@/components/ui/layout/form-layout/form-content-layout";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWorkplace } from "@/types/(admin)/workplace/create-workplace";
import { TextFormItem } from "@/components/ui/form-field-items/text-field";
import { DateFormItem } from "@/components/ui/form-field-items/date-field";

const formSchema = z.object({
  name: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  contractNum: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  address: z.string().min(2, { message: "2자 이상으로 입력하세요." }),
  tel: z
    .string()
    .min(9, { message: "자릿수를 확인해주세요." })
    .max(13, { message: "자릿수를 확인해주세요." }),
  contractedAt: z.date(),
  expiredAt: z.date().nullable(),
  state: z.enum(["계약", "해약"]),
});

type formType = z.infer<typeof formSchema>;

interface WorkplaceFormProps {
  createWorkplace: CreateWorkplace;
  onClick: (data: Record<string, any>) => void;
}

const WorkplaceForm = ({ createWorkplace, onClick }: WorkplaceFormProps) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: createWorkplace.name,
      contractNum: createWorkplace.contractNum,
      address: createWorkplace.address,
      tel: createWorkplace.tel,
      contractedAt: createWorkplace.contractedAt,
      expiredAt: createWorkplace.expiredAt,
      state: createWorkplace.state,
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
              <TextFormItem
                label="사업장명"
                placeholder="에스텍시스템"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="contractNum"
            render={({ field }) => (
              <TextFormItem
                label="계약번호"
                placeholder="계약번호"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <TextFormItem
                label="주소"
                placeholder="서울특별시 강남구 개포로 619 8층"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <TextFormItem
                label="전화번호"
                placeholder="( - 제외 )"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="contractedAt"
            render={({ field }) => (
              <DateFormItem label="계약일자" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="expiredAt"
            render={({ field }) => (
              <DateFormItem label="해약일자" field={field} />
            )}
          />
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

export default WorkplaceForm;

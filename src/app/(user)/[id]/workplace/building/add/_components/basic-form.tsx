"use client";
import { Form, FormField } from "@/components/ui/form";
import React from "react";
import { TextFormItem } from "../page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CreateBuilding } from "@/types/(user)/building/create-building";

const basicFormSchema = z.object({
  name: z.string().min(2, { message: "두 글자 이상 입력해주세요" }),
  address: z.string().min(2, { message: "두 글자 이상 입력해주세요" }),
  tel: z.string().nullable(),
  usage: z.string().nullable(),
  constructionCo: z.string().nullable(),
  completionDt: z.date().nullable(),
  fireRating: z.string().nullable(),
});

export type basicFormType = z.infer<typeof basicFormSchema>;

interface BasicFormProps {
  building: CreateBuilding;
  onClick: (data: Record<string, any>) => void;
}

const BasicForm = ({ onClick, building }: BasicFormProps) => {
  const form = useForm<basicFormType>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      name: building.name,
      address: building.address,
      tel: building.tel,
      usage: building.usage,
      constructionCo: building.constructionCo,
      completionDt: building.completionDt,
      fireRating: building.fireRating,
    },
  });

  const onSubmit = (values: basicFormType) => {
    onClick(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b py-4">
        <span className="text-lg font-bold text-[var(--description-title-color)]">
          기본정보
        </span>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-x-12 gap-y-16">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <TextFormItem
                    label="건물명칭 *"
                    placeholder="건물A"
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <TextFormItem
                    label="주소 *"
                    placeholder="서울특별시 강남구 개포로619"
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
                    placeholder="( - 제외 ) 021234567"
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="usage"
                render={({ field }) => (
                  <TextFormItem
                    label="건물용도"
                    placeholder="주거"
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="constructionCo"
                render={({ field }) => (
                  <TextFormItem
                    label="시공업체"
                    placeholder="현대중공업"
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <TextFormItem
                    label="건물명칭 *"
                    placeholder="건물A"
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="fireRating"
                render={({ field }) => (
                  <TextFormItem
                    label="소방등급"
                    placeholder="1급"
                    field={field}
                  />
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="text-xs bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
              >
                다음 단계
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BasicForm;

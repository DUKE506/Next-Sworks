import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import FormLayout from "./form-layout";
import { Form, FormField } from "@/components/ui/form";
import { TextFormItem } from "../page";

import { GroupItemLayout } from "./struct-form";
import { Button } from "@/components/ui/button";
import { CreateBuilding } from "@/types/(user)/building/create-building";

const convenienceFormSchema = z.object({
  totalParking: z.string().nullable(),
  indoorParking: z.string().nullable(),
  outdoorParking: z.string().nullable(),

  totalLift: z.string().nullable(),
  passengerLift: z.string().nullable(),
  FreightLift: z.string().nullable(),

  totalRestroom: z.string().nullable(),
  mensRoom: z.string().nullable(),
  ladiesRoom: z.string().nullable(),
});

type convenienceFormType = z.infer<typeof convenienceFormSchema>;

interface ConvenienceFormProps {
  building: CreateBuilding;
  onCreate: (data: Record<string, any>) => void;
  onPrev: () => void;
}

const ConvenienceForm = ({
  building,
  onCreate,
  onPrev,
}: ConvenienceFormProps) => {
  const form = useForm<convenienceFormType>({
    resolver: zodResolver(convenienceFormSchema),
    defaultValues: {
      totalParking: building.totalParking,
      indoorParking: building.indoorParking,
      outdoorParking: building.outdoorParking,

      totalLift: building.totalLift,
      passengerLift: building.passengerLift,
      FreightLift: building.FreightLift,

      totalRestroom: building.totalRestroom,
      mensRoom: building.mensRoom,
      ladiesRoom: building.ladiesRoom,
    },
  });

  const onSubmit = (values: convenienceFormType) => {
    onCreate(values);
  };

  return (
    <FormLayout title="부대시설">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 justify-between"
        >
          <div className="flex flex-col gap-10">
            <GroupItemLayout label="주차장">
              <FormField
                control={form.control}
                name="totalParking"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "totalParking">
                    label="전체"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="indoorParking"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "indoorParking">
                    label="옥내"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="outdoorParking"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "outdoorParking">
                    label="옥외"
                    placeholder=""
                    field={field}
                  />
                )}
              />
            </GroupItemLayout>

            <div className="w-full h-[1px] bg-border" />

            <GroupItemLayout label="승강기">
              <FormField
                control={form.control}
                name="totalLift"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "totalLift">
                    label="전체"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="passengerLift"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "passengerLift">
                    label="인승용"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="FreightLift"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "FreightLift">
                    label="화물용"
                    placeholder=""
                    field={field}
                  />
                )}
              />
            </GroupItemLayout>
            <div className="w-full h-[1px] bg-border" />
            <GroupItemLayout label="화장실">
              <FormField
                control={form.control}
                name="totalRestroom"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "totalRestroom">
                    label="전체"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="mensRoom"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "mensRoom">
                    label="남성"
                    placeholder=""
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="ladiesRoom"
                render={({ field }) => (
                  <TextFormItem<convenienceFormType, "ladiesRoom">
                    label="여성"
                    placeholder=""
                    field={field}
                  />
                )}
              />
            </GroupItemLayout>
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={onPrev}
              className="text-xs text-[var(--description-title-color)] border bg-accent hover:cursor-pointer hover:bg-[var(--background-light-color)]"
            >
              이전 단계
            </Button>
            <Button
              type="submit"
              className="text-xs bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
            >
              건물 생성
            </Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};

export default ConvenienceForm;

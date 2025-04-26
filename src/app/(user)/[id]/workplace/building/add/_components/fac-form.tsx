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

const facFormSchema = z.object({
  electricalCapacity: z.string().nullable(),
  receivingCapacity: z.string().nullable(),
  powerCapacity: z.string().nullable(),

  waterCapacity: z.string().nullable(),
  elevatedWaterTankCapacity: z.string().nullable(),
  waterTankCapacity: z.string().nullable(),

  gasCapacity: z.string().nullable(),
  heater: z.string().nullable(),
  chillerHeater: z.string().nullable(),

  coolHeatCapacity: z.string().nullable(),
  heatCapacity: z.string().nullable(),
  coolCapacity: z.string().nullable(),
});

type facFormType = z.infer<typeof facFormSchema>;

interface FacFormProps {
  building: CreateBuilding;
  onNext: (data: Record<string, any>) => void;
  onPrev: () => void;
}

const FacForm = ({ building, onNext, onPrev }: FacFormProps) => {
  const form = useForm<facFormType>({
    resolver: zodResolver(facFormSchema),
    defaultValues: {
      electricalCapacity: building.electricalCapacity,
      receivingCapacity: building.receivingCapacity,
      powerCapacity: building.powerCapacity,

      waterCapacity: building.waterCapacity,
      elevatedWaterTankCapacity: building.elevatedWaterTankCapacity,
      waterTankCapacity: building.waterTankCapacity,

      gasCapacity: building.gasCapacity,
      heater: building.heater,
      chillerHeater: building.chillerHeater,

      coolHeatCapacity: building.coolHeatCapacity,
      heatCapacity: building.heatCapacity,
      coolCapacity: building.coolCapacity,
    },
  });

  const onSubmit = (values: facFormType) => {
    onNext(values);
  };

  return (
    <FormLayout title="설비정보">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 h-full"
        >
          <div className="flex flex-col gap-10 h-full">
            <GroupItemLayout label="전기">
              <FormField
                control={form.control}
                name="electricalCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "electricalCapacity">
                    label="전기용량"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="receivingCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "receivingCapacity">
                    label="수전용량"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="powerCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "powerCapacity">
                    label="발전용량"
                    placeholder=""
                    field={field}
                  />
                )}
              />
            </GroupItemLayout>

            <div className="w-full h-[1px] bg-border" />

            <GroupItemLayout label="급수">
              <FormField
                control={form.control}
                name="waterCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "waterCapacity">
                    label="급수용량"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="elevatedWaterTankCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "elevatedWaterTankCapacity">
                    label="고가수조"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="waterTankCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "waterTankCapacity">
                    label="저수조"
                    placeholder=""
                    field={field}
                  />
                )}
              />
            </GroupItemLayout>
            <div className="w-full h-[1px] bg-border" />
            <GroupItemLayout label="가스">
              <FormField
                control={form.control}
                name="gasCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "gasCapacity">
                    label="가스용량"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="heater"
                render={({ field }) => (
                  <TextFormItem<facFormType, "heater">
                    label="보일러"
                    placeholder=""
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="chillerHeater"
                render={({ field }) => (
                  <TextFormItem<facFormType, "chillerHeater">
                    label="냉·온수기"
                    placeholder=""
                    field={field}
                  />
                )}
              />
            </GroupItemLayout>
            <div className="w-full h-[1px] bg-border" />
            <GroupItemLayout label="냉·난방">
              <FormField
                control={form.control}
                name="coolHeatCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "coolHeatCapacity">
                    label="냉·난방용량"
                    placeholder=""
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="heatCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "heatCapacity">
                    label="난방용량"
                    placeholder=""
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="coolCapacity"
                render={({ field }) => (
                  <TextFormItem<facFormType, "coolCapacity">
                    label="냉방용량"
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
              className="text-xs bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
            >
              다음 단계
            </Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
};

export default FacForm;

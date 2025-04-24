import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import FormLayout from "./form-layout";
import { Form, FormField } from "@/components/ui/form";
import { TextFormItem } from "../page";

import { GroupItemLayout } from "./struct-form";

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

const ConvenienceForm = () => {
  const form = useForm<convenienceFormType>({
    resolver: zodResolver(convenienceFormSchema),
    defaultValues: {
      totalParking: "",
      indoorParking: "",
      outdoorParking: "",

      totalLift: "",
      passengerLift: "",
      FreightLift: "",

      totalRestroom: "",
      mensRoom: "",
      ladiesRoom: "",
    },
  });
  return (
    <FormLayout title="부대시설">
      <Form {...form}>
        <form className="flex flex-col gap-10">
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
        </form>
      </Form>
    </FormLayout>
  );
};

export default ConvenienceForm;

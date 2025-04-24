import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormLayout from "./form-layout";
import { Form, FormField } from "@/components/ui/form";
import { TextFormItem } from "../page";
import CustomSeparator from "@/app/(admin)/manage/_components/Separator/custom-separator";
import { Button } from "@/components/ui/button";
import { CreateBuilding } from "@/types/(user)/building/create-building";

const structFormSchema = z.object({
  buildingStruct: z.string().nullable(),
  roofStruct: z.string().nullable(),

  grossFloorArea: z.string().nullable(),
  siteArea: z.string().nullable(),
  buildingArea: z.string().nullable(),

  totalFloor: z.string().nullable(),
  groundFloor: z.string().nullable(),
  basementFloor: z.string().nullable(),

  totalHeight: z.string().nullable(),
  groundHeight: z.string().nullable(),
  basementHeight: z.string().nullable(),

  totalLandscapeArea: z.string().nullable(),
  groundLandscapeArea: z.string().nullable(),
  basementLandscapeArea: z.string().nullable(),
});

type structFormType = z.infer<typeof structFormSchema>;

interface StructFormProps {
  building: CreateBuilding;
  onPrev: () => void;
  onNext: (data: Record<string, any>) => void;
}

const StructForm = ({ building, onNext, onPrev }: StructFormProps) => {
  const form = useForm<structFormType>({
    resolver: zodResolver(structFormSchema),
    defaultValues: {
      buildingStruct: building.buildingStruct,
      roofStruct: building.roofStruct,

      grossFloorArea: building.grossFloorArea,
      siteArea: building.siteArea,
      buildingArea: building.buildingArea,

      totalFloor: building.totalFloor,
      groundFloor: building.groundFloor,
      basementFloor: building.basementFloor,

      totalHeight: building.totalHeight,
      groundHeight: building.groundHeight,
      basementHeight: building.basementHeight,

      totalLandscapeArea: building.totalLandscapeArea,
      groundLandscapeArea: building.groundLandscapeArea,
      basementLandscapeArea: building.basementLandscapeArea,
    },
  });

  const onSubmit = (values: structFormType) => {
    onNext(values);
  };

  return (
    <FormLayout title="면적 및 구조">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-10"></div>
          <GroupItemLayout label="구조">
            <FormField
              control={form.control}
              name="buildingStruct"
              render={({ field }) => (
                <TextFormItem<structFormType, "buildingStruct">
                  label="건물구조"
                  placeholder="철근 콘크리트조"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="roofStruct"
              render={({ field }) => (
                <TextFormItem<structFormType, "roofStruct">
                  label="지붕구조"
                  placeholder="철근 슬라브"
                  field={field}
                />
              )}
            />
          </GroupItemLayout>
          <div className="w-full h-[1px] bg-border" />
          <GroupItemLayout label="연면적">
            <FormField
              control={form.control}
              name="grossFloorArea"
              render={({ field }) => (
                <TextFormItem<structFormType, "grossFloorArea">
                  label="연면적"
                  placeholder=""
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="siteArea"
              render={({ field }) => (
                <TextFormItem<structFormType, "siteArea">
                  label="대지면적"
                  placeholder=""
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="buildingArea"
              render={({ field }) => (
                <TextFormItem<structFormType, "buildingArea">
                  label="건축구조"
                  placeholder=""
                  field={field}
                />
              )}
            />
          </GroupItemLayout>
          <div className="w-full h-[1px] bg-border" />
          <GroupItemLayout label="층">
            <FormField
              control={form.control}
              name="totalFloor"
              render={({ field }) => (
                <TextFormItem<structFormType, "totalFloor">
                  label="전체층"
                  placeholder=""
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="groundFloor"
              render={({ field }) => (
                <TextFormItem<structFormType, "groundFloor">
                  label="지상층"
                  placeholder=""
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="basementFloor"
              render={({ field }) => (
                <TextFormItem<structFormType, "basementFloor">
                  label="지하층"
                  placeholder=""
                  field={field}
                />
              )}
            />
          </GroupItemLayout>
          <div className="w-full h-[1px] bg-border" />
          <GroupItemLayout label="높이">
            <FormField
              control={form.control}
              name="totalHeight"
              render={({ field }) => (
                <TextFormItem<structFormType, "totalHeight">
                  label="높이"
                  placeholder=""
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="groundHeight"
              render={({ field }) => (
                <TextFormItem<structFormType, "groundHeight">
                  label="지상높이"
                  placeholder=""
                  field={field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="basementHeight"
              render={({ field }) => (
                <TextFormItem<structFormType, "basementHeight">
                  label="지하높이"
                  placeholder=""
                  field={field}
                />
              )}
            />
          </GroupItemLayout>
          <div className="w-full h-[1px] bg-border" />
          <GroupItemLayout label="조경면적">
            <FormField
              control={form.control}
              name="totalLandscapeArea"
              render={({ field }) => (
                <TextFormItem<structFormType, "totalLandscapeArea">
                  label="조경면적"
                  placeholder=""
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="groundLandscapeArea"
              render={({ field }) => (
                <TextFormItem<structFormType, "groundLandscapeArea">
                  label="지상면적"
                  placeholder=""
                  field={field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="basementLandscapeArea"
              render={({ field }) => (
                <TextFormItem<structFormType, "basementLandscapeArea">
                  label="지하면적"
                  placeholder="철근 콘크리트조"
                  field={field}
                />
              )}
            />
          </GroupItemLayout>

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

export const GroupItemLayout = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <span className="text-md font-bold ">{label}</span>
      <div className="grid grid-cols-3 gap-12">{children}</div>
    </div>
  );
};

export default StructForm;

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { DualSwitchFormItem } from "@/components/ui/form-field-items/switch-filed";
import { Switch } from "@/components/ui/switch";
import { CreateUser } from "@/types/(user)/user/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { SetStateAction, useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const permFormSchema = z.object({
  basicPerm: z.number(),
  machinePerm: z.number(),
  electricPerm: z.number(),
  firePerm: z.number(),
  buildingPerm: z.number(),
  networkPerm: z.number(),
  beautyPerm: z.number(),
  securityPerm: z.number(),

  userPerm: z.number(),
  vocPerm: z.number(),
});

type permFormType = z.infer<typeof permFormSchema>;

interface PermFormProps {
  createUser: CreateUser;
  onCreate: (data: Record<string, any>) => void;
  onPrev: () => void;
}

const PermForm = ({ createUser, onCreate, onPrev }: PermFormProps) => {
  const form = useForm<permFormType>({
    resolver: zodResolver(permFormSchema),
    defaultValues: {
      basicPerm: createUser.basicPerm,
      machinePerm: createUser.machinePerm,
      electricPerm: createUser.electricPerm,
      firePerm: createUser.firePerm,
      buildingPerm: createUser.buildingPerm,
      networkPerm: createUser.networkPerm,
      beautyPerm: createUser.beautyPerm,
      securityPerm: createUser.securityPerm,
      userPerm: createUser.userPerm,
      vocPerm: createUser.vocPerm,
    },
  });

  const onSubmit = (values: permFormType) => {
    onCreate(values);
  };

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="border-b py-4">
        <span className="text-lg font-bold text-[var(--description-title-color)]">
          권한
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="grid grid-cols-2 gap-x-12 gap-y-16">
            <FormField
              control={form.control}
              name="basicPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="기본" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="machinePerm"
              render={({ field }) => (
                <DualSwitchFormItem label="기계" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="electricPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="전기" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="firePerm"
              render={({ field }) => (
                <DualSwitchFormItem label="소방" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="buildingPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="건축" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="networkPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="통신" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="beautyPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="미화" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="securityPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="보안" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="userPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="직원" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="vocPerm"
              render={({ field }) => (
                <DualSwitchFormItem label="민원" field={field} />
              )}
            />
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
              다음 단계
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PermForm;

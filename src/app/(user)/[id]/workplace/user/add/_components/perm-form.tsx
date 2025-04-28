import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
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

interface DualSwitchFormItemProps<T extends FieldValues, K extends keyof T> {
  label: string;

  field: ControllerRenderProps<T, any>;
}

export const DualSwitchFormItem = <T extends FieldValues, K extends keyof T>({
  label,

  field,
}: DualSwitchFormItemProps<T, K>) => {
  const [read, setRead] = useState<boolean>(field.value >= 1);
  const [write, setWrite] = useState<boolean>(field.value >= 2);

  useEffect(() => {
    let permLevel = 0;
    if (read) permLevel = 1;
    if (write) permLevel = 2;
    field.onChange(permLevel);
    console.log(field.value);
  }, [read, write]);

  return (
    <FormItem className="flex flex-col space-y-2">
      <div className="flex  justify-between items-center">
        <span className="text-sm">{label}</span>
        <div className="flex gap-8">
          <div className="flex gap-4 items-center">
            <span className="text-sm">읽기</span>
            <Switch
              checked={read}
              onCheckedChange={(checked) => setRead(checked)}
              disabled={write ? true : false}
              className="data-[state=checked]:bg-blue-500 hover:cursor-pointer"
            />
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm">쓰기</span>
            <Switch
              checked={write}
              onCheckedChange={(checked) => {
                if (checked) setRead(true);
                setWrite(checked);
              }}
              className="data-[state=checked]:bg-blue-500 hover:cursor-pointer"
            />
          </div>
        </div>
        <FormMessage />
      </div>
    </FormItem>
  );
};

export default PermForm;

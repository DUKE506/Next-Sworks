import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { WorkplaceFormSchema } from "../page";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconToggle } from "@/components/ui/icon-toggle/icon-toggle";
import {
  Building2,
  ChevronsUpDown,
  Drill,
  Flame,
  Megaphone,
  PaintRoller,
  ShieldBan,
  Wifi,
  Zap,
} from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContentLayout from "@/components/ui/layout/form-layout/form-content-layout";
import { TextFormItem } from "@/app/(user)/[id]/workplace/building/add/page";
import DatePicker from "@/components/ui/date-picker.tsx/date-picker";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CreateWorkplace } from "@/types/(admin)/workplace/create-workplace";

const formSchema = z.object({
  permMachine: z.boolean(),
  permElectronic: z.boolean(),
  permLift: z.boolean(),
  permFire: z.boolean(),
  permConstruct: z.boolean(),
  permNetwork: z.boolean(),
  permBeauty: z.boolean(),
  permSecurity: z.boolean(),
  permVoc: z.boolean(),
});

interface PermForm {
  form: UseFormReturn<z.infer<typeof WorkplaceFormSchema>>;
}

type formType = z.infer<typeof formSchema>;

interface PermFormProps {
  createWorkplace: CreateWorkplace;
  onCreate: (data: Record<string, any>) => void;
  onPrev: () => void;
}

const PermForm = ({ createWorkplace, onCreate, onPrev }: PermFormProps) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permMachine: createWorkplace.permMachine,
      permElectronic: createWorkplace.permElectronic,
      permLift: createWorkplace.permLift,
      permFire: createWorkplace.permFire,
      permConstruct: createWorkplace.permConstruct,
      permNetwork: createWorkplace.permNetwork,
      permBeauty: createWorkplace.permBeauty,
      permSecurity: createWorkplace.permSecurity,
      permVoc: createWorkplace.permVoc,
    },
  });

  const onSubmit = (values: formType) => {
    onCreate(values);
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
            name="permMachine"
            render={({ field }) => (
              <SwitchFormItem label="기계권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permElectronic"
            render={({ field }) => (
              <SwitchFormItem label="전기권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permLift"
            render={({ field }) => (
              <SwitchFormItem label="승강권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permFire"
            render={({ field }) => (
              <SwitchFormItem label="소방권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permConstruct"
            render={({ field }) => (
              <SwitchFormItem label="건축권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permNetwork"
            render={({ field }) => (
              <SwitchFormItem label="통신권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permBeauty"
            render={({ field }) => (
              <SwitchFormItem label="미화권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permSecurity"
            render={({ field }) => (
              <SwitchFormItem label="보안권한" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="permVoc"
            render={({ field }) => (
              <SwitchFormItem label="민원권한" field={field} />
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
    </FormContentLayout>
  );
};

interface DateFormItemProps<T extends FieldValues, K extends keyof T> {
  label: string;

  field: ControllerRenderProps<T, any>;
}

export const DateFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
}: DateFormItemProps<T, K>) => {
  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)]">
          {label}
        </FormLabel>
        <FormMessage />
      </div>
      <FormControl>
        <DatePicker field={field} />
      </FormControl>
    </FormItem>
  );
};

interface SwitchFormItemProps<T extends FieldValues, K extends keyof T> {
  label: string;
  description?: string;
  field: ControllerRenderProps<T, any>;
}

export const SwitchFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  description,
  field,
}: SwitchFormItemProps<T, K>) => {
  return (
    <FormItem className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <FormLabel className="text-xs text-[var(--description-value-color)]">
            {label}
          </FormLabel>
          <span>{description}</span>
        </div>
        <FormControl>
          <Switch
            className="data-[state=checked]:bg-[var(--primary-color)] hover:cursor-pointer"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default PermForm;

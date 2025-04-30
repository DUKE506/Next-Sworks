import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { Switch } from "../switch";
import { useEffect, useState } from "react";

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

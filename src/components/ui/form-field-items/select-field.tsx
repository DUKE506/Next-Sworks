import React, { useEffect } from "react";
import { FormControl, FormItem, FormLabel } from "../form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useBuildingStore } from "@/store/building-store";

interface RoomSelectFieldFormItemProps<
  T extends FieldValues,
  K extends keyof T
> {
  label: string;
  field?: ControllerRenderProps<T, any>;
}

const RoomSelectFieldFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
}: RoomSelectFieldFormItemProps<T, K>) => {
  const { locationTree } = useBuildingStore();

  useEffect(() => {}, []);

  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)]">
          {label}
        </FormLabel>
      </div>
      <FormControl>
        <SelectField placeholder="건물을 선택하세요." data={locationTree} />
      </FormControl>
    </FormItem>
  );
};

interface SelectOption {
  id: number;
  name: string;
}

interface SelectFieldProps<T extends SelectOption> {
  placeholder?: string;
  data: T[];
}

const SelectField = <T extends SelectOption>({
  placeholder,
  data,
}: SelectFieldProps<T>) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder ?? "항목을 선택하세요"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((v, i) => (
            <SelectItem value={v.id.toString()}>{v.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RoomSelectFieldFormItem;

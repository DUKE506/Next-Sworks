import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import DatePicker from "../date-picker.tsx/date-picker";

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

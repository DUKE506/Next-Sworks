import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import CustomDatetimePicker from "@/components/common/calendar/custom-datetime-picker";

interface DateFormItemProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

export const DateFormItem = ({ label, value, onChange }: DateFormItemProps) => {
  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)]">
          {label}
        </FormLabel>
        <FormMessage />
      </div>
      <FormControl>
        <CustomDatetimePicker
          value={value}
          onChange={(date) => onChange(date)}
        />
      </FormControl>
    </FormItem>
  );
};

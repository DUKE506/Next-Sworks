import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { PasswordInput } from "../password-input";

/**
 * 문자입력 input 폼
 */
export interface TextFormItemProps<T extends FieldValues, K extends keyof T> {
  label: string;
  placeholder?: string;
  field: ControllerRenderProps<T, any>;
}

export const TextFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
  placeholder,
}: TextFormItemProps<T, K>) => {
  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)]">
          {label}
        </FormLabel>
        <FormMessage />
      </div>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
    </FormItem>
  );
};

/**
 * 비밀번호 input 폼
 */

export const PasswordFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
  placeholder,
}: TextFormItemProps<T, K>) => {
  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)]">
          {label}
        </FormLabel>
        <FormMessage />
      </div>

      <FormControl>
        <PasswordInput placeholder={placeholder} {...field} />
      </FormControl>
    </FormItem>
  );
};

import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { PasswordInput } from "../password-input";
import { Textarea } from "../textarea";

/**
 * 문자입력 input 폼
 */
export interface TextFormItemProps<T extends FieldValues, K extends keyof T> {
  label: string;
  placeholder?: string;
  field: ControllerRenderProps<T, any>;
  required?: boolean;
}

export const TextFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
  placeholder,
  required = false,
}: TextFormItemProps<T, K>) => {
  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)] gap-0">
          {label}
          <span className="text-red-500">{required ? "*" : ""}</span>
        </FormLabel>
        <FormMessage />
      </div>
      <FormControl>
        <Input className="rounded-sm" placeholder={placeholder} {...field} />
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

/**
 * 숫자 input
 */

export interface TextFormItemProps<T extends FieldValues, K extends keyof T> {
  label: string;
  placeholder?: string;
  field: ControllerRenderProps<T, any>;
}

export const NumberFormItem = <T extends FieldValues, K extends keyof T>({
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
        <Input
          className="rounded-sm"
          type="number"
          placeholder={placeholder}
          onChange={(e) => {
            const value = e.target.value;
            // 빈 값은 유지, 숫자일 경우만 변환
            field.onChange(value === "" ? "" : Number(value));
          }}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      </FormControl>
    </FormItem>
  );
};

/**
 * TextArea
 */

export const TextAreaFormItem = <T extends FieldValues, K extends keyof T>({
  label,
  field,
  placeholder,
  required = false,
}: TextFormItemProps<T, K>) => {
  return (
    <FormItem className="g-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)] gap-0">
          {label}
          <span className="text-red-500">{required ? "*" : ""}</span>
        </FormLabel>
        <FormMessage />
      </div>
      <FormControl>
        <Textarea
          className="h-30 resize-none rounded-sm overflow-auto"
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
    </FormItem>
  );
};
